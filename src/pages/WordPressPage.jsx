import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { wpquery } from "../api/wordPressQuery";
import Loader from "../components/Loader";

import styles2 from './HomePage.module.scss';

const NODE_BY_URI_QUERY = `
  query GetNodeByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on ContentNode {
        id
        databaseId
        slug
        date
        modified
      }
      ... on UniformResourceIdentifiable {
        uri
      }
      ... on NodeWithTitle {
        title
      }
      ... on NodeWithContentEditor {
        content
      }
      ... on NodeWithExcerpt {
        excerpt
      }
      ... on NodeWithFeaturedImage {
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

const normaliseUriForWordPress = (value) => {
  if (!value) {
    return "/";
  }

  const trimmed = value.trim();

  if (trimmed === "/") {
    return "/";
  }

  const withoutLeading = trimmed.replace(/^\/+/, "");
  const withoutTrailing = withoutLeading.replace(/\/+$/, "");

  return withoutTrailing || "/";
};

const initialState = {
  loading: true,
  error: null,
  node: null,
};

function WordPressPage() {
  const location = useLocation();
  const [{ loading, error, node }, setState] = useState(initialState);

  const uri = useMemo(
    () => normaliseUriForWordPress(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchNode() {
      setState({ loading: true, error: null, node: null });

      try {
        const data = await wpquery({
          query: NODE_BY_URI_QUERY,
          variables: { uri },
        });

        if (!isMounted) {
          return;
        }

        const fetchedNode = data?.nodeByUri ?? null;

        if (!fetchedNode) {
          setState({
            loading: false,
            error: new Error("Contenu introuvable."),
            node: null,
          });
          return;
        }

        setState({
          loading: false,
          error: null,
          node: fetchedNode,
        });
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setState({
          loading: false,
          error: err instanceof Error ? err : new Error("Erreur inattendue."),
          node: null,
        });
      }
    }

    fetchNode();

    return () => {
      isMounted = false;
    };
  }, [uri]);

  if (loading) {
    return <Loader label="Chargement du contenu..." />;
  }

  if (error) {
    const status = error.message === "Contenu introuvable." ? 404 : 500;
    const statusText = status === 404 ? "Page introuvable" : "Erreur de contenu";
    const routedError = Object.assign(new Error(error.message), {
      status,
      statusText,
    });

    throw routedError;
  }

  if (!node) {
    const routedError = Object.assign(new Error("Contenu introuvable."), {
      status: 404,
      statusText: "Page introuvable",
    });

    throw routedError;
  }

  return (
    <div className={styles2['mainContent']}>
      <div className={styles2['mainContent']}>
        <div className={styles2['homePage']}>
          <article>
            {node.title && <h1 dangerouslySetInnerHTML={{ __html: node.title }} />}
            {node.featuredImage?.node?.sourceUrl ? (
              <figure>
                <img
                  src={node.featuredImage.node.sourceUrl}
                  alt={node.featuredImage.node.altText ?? ""}
                  style={{ maxWidth: "100%" }}
                />
              </figure>
            ) : null}
            <div dangerouslySetInnerHTML={{ __html: node.content ?? node.excerpt ?? "" }} />
          </article>
        </div>
      </div>
    </div>
  );
}

export default WordPressPage;
