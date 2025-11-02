import styles from "./NyassoButtonOne.module.scss";
import { useNyassobiSettings } from "../hooks/useNyassobiSettings";

function NyassoButtonOne() {
  const { settings } = useNyassobiSettings();

  return (
    <div className={styles.nyassoBtn}>
      <a href={settings.associationStatusUrl} target="_blank" rel="noopener noreferrer">
        <button className={styles.button}>
          Statuts associatifs
        </button>
      </a>

      <a href={settings.internalRulesUrl} target="_blank" rel="noopener noreferrer">
        <button className={styles.button}>
          Règlement intérieur
        </button>
      </a>
    </div>
  );
}

export default NyassoButtonOne;
