import styles from "./Loader.module.scss";

function Loader({ label = "Chargement...", fullHeight = true }) {
  return (
    <div className={`${styles.loader} ${fullHeight ? styles["loader--full"] : ""}`}>
      <div className={styles.spinner} aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

export default Loader;
