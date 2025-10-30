import { useEffect, useState } from "react";

import styles from "./ScrollToTopButton.module.scss";

const SCROLL_THRESHOLD = 320;

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Remonter en haut de la page"
      className={`${styles.button} ${isVisible ? styles.visible : ""}`}
      onClick={handleClick}
    >
      <span className={styles.chevron} aria-hidden="true" />
    </button>
  );
}

export default ScrollToTopButton;

