import styles from "./NyassoButtonTwo.module.scss";
import { useNyassobiSettings } from "../hooks/useNyassobiSettings";

function NyassoButtonTwo() {
  const { settings } = useNyassobiSettings();

  return (
    <div className={styles.nyassoBtn}>
      <a href={settings.signupFormUrl} target="_blank" rel="noopener noreferrer">
        <button className={styles.button}>
          Formulaire d'adhésion
        </button>
      </a>

      <a href={settings.parentalAgreementUrl} target="_blank" rel="noopener noreferrer">
        <button className={styles.button}>
          Autorisation parentale
        </button>
      </a>
    </div>
  );
}

export default NyassoButtonTwo;
