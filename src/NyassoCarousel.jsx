import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./NyassoCarousel.css";

import { Pagination } from "swiper/modules";
import Loader from "./components/Loader";

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

function NyassoCarousel({ posts = [], loading = false, error = null, onSlideChange = () => {} }) {
  if (loading) {
    return (
      <div className="carousel-loader">
        <Loader label="Chargement des actualités..." />
      </div>
    );
  }

  if (error) {
    return <div>Impossible de charger les actualités.</div>;
  }

  if (!posts.length) {
    return <div>Aucune actualité disponible pour le moment.</div>;
  }

  const safePosts = useMemo(() => posts.slice(0, 9), [posts]);

  useEffect(() => {
    if (safePosts.length > 0) {
      onSlideChange(0);
    }
  }, [safePosts, onSlideChange]);

  const paginationConfig = useMemo(
    () => ({
      el: ".custom-pagination",
      clickable: true,
      renderBullet(index, className) {
        const title = stripHtml(safePosts[index]?.title) || `Slide ${index + 1}`;
        return `<span class="${className}"></span>`;
      },
    }),
    [safePosts],
  );

  const handleSlideChange = (swiper) => {
    const { activeIndex = 0 } = swiper ?? {};

    if (safePosts[activeIndex]) {
      onSlideChange(activeIndex);
    }
  };

  return (
    <div className="swiper-row">
      <div className="custom-pagination"></div>
      <Swiper
        direction="vertical"
        pagination={paginationConfig}
        modules={[Pagination]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >
        {safePosts.map((post) => {
          const hasImage = Boolean(post.featuredImage?.sourceUrl);
          const targetUri = ensureLeadingSlash(post.uri);
          const titleText = stripHtml(post.title) || "Actualité Nyassobi";

          return (
            <SwiperSlide key={post.id}>
              <Link
                to={targetUri}
                className={`carousel-slide ${hasImage ? "carousel-slide--image" : "carousel-slide--text"}`}
              >
                {hasImage ? (
                  <img
                    src={post.featuredImage.sourceUrl}
                    alt={post.featuredImage.altText || titleText}
                  />
                ) : (
                  <span>{titleText}</span>
                )}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default NyassoCarousel;
