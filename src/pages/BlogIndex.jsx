import { Link } from "react-router-dom";
import { useWordPressPosts } from "../hooks/useWordPressContent";

const ensureLeadingSlash = (value) => {
  if (!value) {
    return "/";
  }

  return value.startsWith("/") ? value : `/${value}`;
};

function BlogIndex() {
  const { items: posts, loading, error } = useWordPressPosts({ first: 20 });

  if (loading) {
    return <div>Chargement des articles...</div>;
  }

  if (error) {
    const routedError = Object.assign(
      new Error("Impossible de récupérer les articles."),
      {
        status: 500,
        statusText: "Erreur de chargement des articles",
      },
    );

    throw routedError;
  }

  if (!posts.length) {
    const routedError = Object.assign(new Error("Aucun article trouvé."), {
      status: 404,
      statusText: "Aucun article pour le moment",
    });

    throw routedError;
  }

  return (
    <section>
      <h1>Blog</h1>
      <ul style={{ listStyle: "none", padding: 0, margin: "2rem 0", display: "grid", gap: "2rem" }}>
        {posts.map((post) => {
          const targetUri = ensureLeadingSlash(post.uri);
          const publicationDate = post.date
            ? new Date(post.date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : null;

          return (
            <li key={post.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "1.5rem" }}>
              <h2>
                <Link to={targetUri} style={{ color: "inherit" }}>
                  <span dangerouslySetInnerHTML={{ __html: post.title }} />
                </Link>
              </h2>
              {publicationDate && (
                <p style={{ fontStyle: "italic", margin: "0.5rem 0" }}>{publicationDate}</p>
              )}
              {post.excerpt && (
                <div
                  style={{ marginTop: "0.75rem" }}
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              )}
              <Link to={targetUri} style={{ display: "inline-block", marginTop: "0.75rem" }}>
                Lire la suite →
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default BlogIndex;
