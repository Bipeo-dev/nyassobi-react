// hooks/useMenu.ts
import { useEffect, useMemo, useState } from "react";
import { wpquery } from "../api/wordPressQuery";

const DEFAULT_MENU_SLUG = "main-menu";

const MENU_QUERY = `
  query GetMenu($slug: ID!) {
    menu(id: $slug, idType: SLUG) {
      databaseId
      name
      menuItems(first: 100) {
        nodes {
          id
          databaseId
          parentId
          label
          path
          uri
          url
          childItems {
            nodes {
              id
              databaseId
              parentId
              label
              path
              uri
              url
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
  path?: string | null;
  uri?: string | null;
  url?: string | null;
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
  menu?: {
    menuItems?: {
      nodes?: RawMenuItem[];
    };
  };
}

const normalisePath = (uri?: string | null, url?: string | null, path?: string | null) => {
  const candidate = uri ?? path ?? url ?? "/";

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
      label: node.label,
      path: normalisePath(node.uri, node.url, node.path),
      children: (node.childItems?.nodes ?? []).map((child) => ({
        id: child.id,
        label: child.label,
        path: normalisePath(child.uri, child.url, child.path),
        children: [],
      })),
    }));

export function useMenu(slug: string = DEFAULT_MENU_SLUG) {
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
          variables: { slug },
        });

        if (!isMounted) {
          return;
        }

        const items: RawMenuItem[] = data?.menu?.menuItems?.nodes ?? [];
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
  }, [slug]);

  const menuItems = useMemo(() => normaliseMenu(rawMenuItems), [rawMenuItems]);

  return { menuItems, loading, error };
}
