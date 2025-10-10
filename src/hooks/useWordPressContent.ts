import { useEffect, useMemo, useState } from "react";
import { wpquery } from "../api/wordPressQuery";

const POSTS_QUERY = `
  query GetPosts($first: Int = 10) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        slug
        uri
        title
        content
        excerpt
        date
        modified
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

const PAGES_QUERY = `
  query GetPages($first: Int = 10) {
    pages(first: $first) {
      nodes {
        id
        databaseId
        slug
        uri
        title
        content
        excerpt
        date
        modified
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

interface RawWordPressNode {
  id: string;
  databaseId: number;
  slug: string;
  uri?: string | null;
  title?: string | null;
  content?: string | null;
  excerpt?: string | null;
  date?: string | null;
  modified?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
}

export interface WordPressContentNode {
  id: string;
  databaseId: number;
  slug: string;
  uri: string;
  title: string;
  content: string;
  excerpt: string;
  date: string | null;
  modified: string | null;
  featuredImage: {
    sourceUrl: string;
    altText: string;
  } | null;
}

interface UseWordPressContentState {
  loading: boolean;
  error: Error | null;
  items: WordPressContentNode[];
}

interface UseWordPressContentOptions {
  first?: number;
}

const normaliseNode = (node: RawWordPressNode): WordPressContentNode => {
  const featuredImageNode = node.featuredImage?.node;

  return {
    id: node.id,
    databaseId: node.databaseId,
    slug: node.slug,
    uri: node.uri ?? `/${node.slug}`,
    title: node.title ?? "",
    content: node.content ?? "",
    excerpt: node.excerpt ?? "",
    date: node.date ?? null,
    modified: node.modified ?? null,
    featuredImage: featuredImageNode?.sourceUrl
      ? {
          sourceUrl: featuredImageNode.sourceUrl,
          altText: featuredImageNode.altText ?? "",
        }
      : null,
  };
};

const useWordPressContent = (
  type: "posts" | "pages",
  options: UseWordPressContentOptions = {},
): UseWordPressContentState => {
  const [state, setState] = useState<UseWordPressContentState>({
    loading: true,
    error: null,
    items: [],
  });

  const variables = useMemo(() => {
    if (typeof options.first === "number") {
      return { first: options.first };
    }
    return {};
  }, [options.first]);

  const variablesKey = useMemo(() => JSON.stringify(variables), [variables]);

  useEffect(() => {
    let isMounted = true;

    async function fetchContent() {
      setState((previous) => ({
        ...previous,
        loading: true,
        error: null,
      }));

      try {
        const query = type === "posts" ? POSTS_QUERY : PAGES_QUERY;
        const data = await wpquery<Record<string, { nodes?: RawWordPressNode[] }> | null>({
          query,
          variables,
        });

        if (!isMounted) {
          return;
        }

        const rawNodes = data?.[type]?.nodes ?? [];
        const items = rawNodes.map(normaliseNode);

        setState({
          loading: false,
          error: null,
          items,
        });
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setState({
          loading: false,
          error: err instanceof Error ? err : new Error("Erreur inattendue."),
          items: [],
        });
      }
    }

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [type, variablesKey]);

  return state;
};

export const useWordPressPosts = (options: UseWordPressContentOptions = {}) =>
  useWordPressContent("posts", options);

export const useWordPressPages = (options: UseWordPressContentOptions = {}) =>
  useWordPressContent("pages", options);
