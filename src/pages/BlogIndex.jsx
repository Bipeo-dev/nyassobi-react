import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useWordPressPosts } from "../hooks/useWordPressContent";
import Loader from "../components/Loader";

import styles2 from "./HomePage.module.scss";
import TitleNyasso from "../TitleNyasso";

const ensureLeadingSlash = (value) => {
  if (!value) {
    return "/";
  }

  return value.startsWith("/") ? value : `/${value}`;
};

const stripHtml = (value) => {
  if (!value) {
    return "";
  }

  return value.replace(/<[^>]+>/g, "").trim();
};

const filtersContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
  margin: "1rem 0 2rem",
};

const filterButtonBaseStyle = {
  borderRadius: "999px",
  border: "1px solid #ED5E24",
  background: "transparent",
  color: "inherit",
  padding: "0.5rem 1rem",
  fontSize: "0.95rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const tagListStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
};

const tagItemStyle = {
  borderRadius: "999px",
  background: "rgba(237, 94, 36, 0.15)",
  color: "#ED5E24",
  padding: "0.35rem 0.85rem",
  fontSize: "0.85rem",
  fontWeight: 600,
};

const metaRowStyle = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "0.75rem",
  marginTop: "0.5rem",
};

const paginationContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
  justifyContent: "center",
  marginTop: "2rem",
};

const paginationButtonStyle = {
  minWidth: "2.5rem",
  padding: "0.5rem 1rem",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.35)",
  background: "transparent",
  color: "inherit",
  cursor: "pointer",
  fontWeight: 600,
  transition: "all 0.2s ease",
};

const paginationActiveButtonStyle = {
  background: "linear-gradient(135deg, #ED5E24, #F38B4A)",
  borderColor: "#ED5E24",
  color: "#fff",
};

const paginationDisabledStyle = {
  opacity: 0.4,
  cursor: "not-allowed",
};

const postImageWrapperStyle = {
  marginTop: "1rem",
  borderRadius: "16px",
  overflow: "hidden",
  background: "rgba(255,255,255,0.08)",
  width: "400px",
  maxWidth: "100%",
  height: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: "auto",
};

const postImageStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
  width: "500px",
  height: "500px",
  objectFit: "contain",
  display: "block",
  background: "#111",
};

const dividerStyle = {
  marginTop: "1.5rem",
  width: "100%",
  height: "0",
  border: "0",
  borderTop: "1px dashed rgba(255,255,255,0.45)",
};

const PAGE_SIZE = 5;

function BlogIndex() {
  const { items: posts, loading, error } = useWordPressPosts({ first: 20 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const allCategories = useMemo(() => {
    const map = new Map();

    posts.forEach((post) => {
      (post.categories ?? []).forEach((category) => {
        if (category.slug && !map.has(category.slug)) {
          map.set(category.slug, {
            slug: category.slug,
            name: category.name || category.slug,
          });
        }
      });
    });

    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, "fr-FR"));
  }, [posts]);

  const toggleCategory = useCallback((slug) => {
    setSelectedCategories((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }
      return [...current, slug];
    });
    setCurrentPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedCategories([]);
    setCurrentPage(1);
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return posts;
    }

    return posts.filter((post) =>
      selectedCategories.every((slug) => post.categories.some((category) => category.slug === slug)),
    );
  }, [posts, selectedCategories]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [posts.length]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, currentPage]);

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        setCurrentPage(page);
      }
    },
    [totalPages, currentPage],
  );

  if (loading) {
    return <Loader label="Chargement des articles..." />;
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
    <div className={styles2['mainContent']}>
      <div className={styles2['mainContent']}>
        <div className={styles2['homePage']}>
          <section>
            <TitleNyasso title="News" subtitle="Les dernières actualités" />

            {allCategories.length > 0 ? (
              <div style={filtersContainerStyle}>
                {allCategories.map((category) => {
                  const isSelected = selectedCategories.includes(category.slug);
                  const isDimmed = selectedCategories.length > 0 && !isSelected;

                  return (
                    <button
                      key={category.slug}
                      type="button"
                      onClick={() => toggleCategory(category.slug)}
                      style={{
                        ...filterButtonBaseStyle,
                        background: isSelected ? "linear-gradient(135deg, #ED5E24, #F38B4A)" : "transparent",
                        color: isSelected ? "#fff" : "inherit",
                        opacity: isDimmed ? 0.35 : 1,
                      }}
                    >
                      {category.name}
                    </button>
                  );
                })}
                {selectedCategories.length > 0 ? (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    style={{
                      ...filterButtonBaseStyle,
                      borderColor: "rgba(255,255,255,0.35)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    Réinitialiser
                  </button>
                ) : null}
              </div>
            ) : null}

            {filteredPosts.length === 0 ? (
              <p>Aucun article ne correspond à ces catégories pour le moment.</p>
            ) : (
              <>
                <ul style={{ listStyle: "none", padding: 0, margin: "2rem 0", display: "grid", gap: "2rem" }}>
                  {paginatedPosts.map((post, index) => {
                    const targetUri = ensureLeadingSlash(post.uri);
                    const publicationDate = post.date
                      ? new Date(post.date).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : null;
                    const isLastItem = index === paginatedPosts.length - 1;
                    const imageSrc = post.featuredImage?.sourceUrl || null;
                    const imageAlt = post.featuredImage?.altText || stripHtml(post.title);

                    return (
                      <li key={post.id} style={{ paddingBottom: "1.5rem" }}>
                        <div>
                          <h2>
                            <Link to={targetUri}>
                              <TitleNyasso subtitle={ post?.title }/>
                            </Link>
                          </h2>
                          <div style={metaRowStyle}>
                            {publicationDate ? (
                              <p style={{ fontStyle: "italic", margin: 0 }}>Le {publicationDate}</p>
                            ) : null}
                            {post.categories.length > 0 ? (
                              <div style={tagListStyle}>
                                {post.categories.map((category) => (
                                  <span key={`${post.id}-${category.slug}`} style={tagItemStyle}>
                                    {category.name}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {imageSrc ? (
                          <Link to={targetUri} style={{ display: "block" }}>
                            <div style={postImageWrapperStyle}>
                              <img src={imageSrc} alt={imageAlt} style={postImageStyle} loading="lazy" />
                            </div>
                          </Link>
                        ) : null}
                        {post.excerpt && (
                          <div
                            style={{ marginTop: "0.75rem" }}
                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                          />
                        )}
                        <Link to={targetUri} style={{ display: "inline-block", marginTop: "0.75rem" }}>
                          Lire la suite →
                        </Link>
                        {!isLastItem ? <div style={dividerStyle} aria-hidden="true" /> : null}
                      </li>
                    );
                  })}
                </ul>

                {totalPages > 1 ? (
                  <div style={paginationContainerStyle}>
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      style={{
                        ...paginationButtonStyle,
                        ...(currentPage === 1 ? paginationDisabledStyle : null),
                      }}
                    >
                      Précédent
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1;
                      const isActive = pageNumber === currentPage;

                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() => handlePageChange(pageNumber)}
                          style={{
                            ...paginationButtonStyle,
                            ...(isActive ? paginationActiveButtonStyle : null),
                          }}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      style={{
                        ...paginationButtonStyle,
                        ...(currentPage === totalPages ? paginationDisabledStyle : null),
                      }}
                    >
                      Suivant
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default BlogIndex;
