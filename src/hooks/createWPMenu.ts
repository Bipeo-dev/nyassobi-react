// hooks/useMenu.ts
import { useEffect, useMemo, useState } from "react";
import { wpquery, wordpressBaseUrl } from "../api/wordPressQuery";

const DEFAULT_MENU_LOCATION = "PRIMARY";

type MenuLocation = string;

const MENU_QUERY = `
  query GetMenu($location: MenuLocationEnum!) {
    menus(where: { location: $location }) {
      nodes {
        count
        id
        databaseId
        name
        slug
        menuItems(first: 100) {
          nodes {
            id
            databaseId
            title
            label
            description
            url
            uri
            path
            cssClasses
            linkRelationship
            target
            parentId
            childItems(first: 100) {
              nodes {
                id
                databaseId
                title
                label
                description
                url
                uri
                path
                cssClasses
                linkRelationship
                target
                parentId
              }
            }
          }
        }
      }
    }
  }
`;

interface RawMenuItem {
  id: string;
  databaseId: number;
  parentId: string | null;
  label: string;
  title?: string | null;
  path?: string | null;
  uri?: string | null;
  url?: string | null;
  description?: string | null;
  cssClasses?: string[] | null;
  linkRelationship?: string | null;
  target?: string | null;
  childItems?: {
    nodes: RawMenuItem[];
  } | null;
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  children: MenuItem[];
}

interface MenuQueryResponse {
  menus?: {
    nodes?: Array<{
      menuItems?: {
        nodes?: RawMenuItem[];
      };
    }>;
  };
}

const wordpressBase = (() => {
  if (!wordpressBaseUrl) {
    return null;
  }

  try {
    return new URL(wordpressBaseUrl);
  } catch {
    return null;
  }
})();

const stripWordPressDomain = (candidate: string): string => {
  if (!candidate || !wordpressBaseUrl || !wordpressBase) {
    return candidate;
  }

  if (/^https?:\/\//i.test(candidate)) {
    try {
      const candidateUrl = new URL(candidate);

      if (candidateUrl.host === wordpressBase.host) {
        let relativePath = candidateUrl.pathname;

        if (wordpressBase.pathname && wordpressBase.pathname !== "/") {
          if (relativePath.startsWith(wordpressBase.pathname)) {
            relativePath = relativePath.slice(wordpressBase.pathname.length) || "/";
          }
        }

        const ensuredLeadingSlash = relativePath.startsWith("/")
          ? relativePath
          : `/${relativePath}`;

        const combined = `${ensuredLeadingSlash}${candidateUrl.search}${candidateUrl.hash}`;
        return combined || "/";
      }

      return candidate;
    } catch {
      return candidate;
    }
  }

  if (candidate.startsWith(wordpressBaseUrl)) {
    const remainder = candidate.slice(wordpressBaseUrl.length);
    if (!remainder) {
      return "/";
    }

    return remainder.startsWith("/") ? remainder : `/${remainder}`;
  }

  return candidate || "/";
};

const normalisePath = (uri?: string | null, url?: string | null, path?: string | null) => {
  const candidate = stripWordPressDomain(uri ?? path ?? url ?? "/");

  if (!candidate) {
    return "/";
  }

  if (candidate.startsWith("http") || candidate.startsWith("mailto:")) {
    return candidate;
  }

  const cleaned = candidate.replace(/\s+/g, "").replace(/\/+/g, "/");
  if (!cleaned.startsWith("/")) {
    return `/${cleaned.replace(/\/+$/, "")}` || "/";
  }

  const trimmed = cleaned.replace(/\/+$/, "");
  return trimmed || "/";
};

const normaliseMenu = (nodes: RawMenuItem[] = []): MenuItem[] =>
  nodes
    .filter((node) => !node.parentId)
    .map((node) => ({
      id: node.id,
      label: node.label ?? node.title ?? "",
      path: normalisePath(node.uri, node.url, node.path),
      children: (node.childItems?.nodes ?? []).map((child) => ({
        id: child.id,
        label: child.label ?? child.title ?? "",
        path: normalisePath(child.uri, child.url, child.path),
        children: [],
      })),
    }));

export function useMenu(location: MenuLocation = DEFAULT_MENU_LOCATION) {
  const [rawMenuItems, setRawMenuItems] = useState<RawMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchMenu() {
      setLoading(true);
      setError(null);

      try {
        const data = await wpquery<MenuQueryResponse>({
          query: MENU_QUERY,
          variables: { location },
        });

        if (!isMounted) {
          return;
        }

        const menuNodes = data?.menus?.nodes ?? [];
        const items: RawMenuItem[] = menuNodes[0]?.menuItems?.nodes ?? [];
        setRawMenuItems(items);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err as Error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMenu();

    return () => {
      isMounted = false;
    };
  }, [location]);

  const menuItems = useMemo(() => normaliseMenu(rawMenuItems), [rawMenuItems]);

  return { menuItems, loading, error };
}
