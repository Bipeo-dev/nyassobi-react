import styles from "./NyassoButtonTwo.module.scss";


function NyassoButtonTwo() {

  return (<div className={styles.nyassoBtn}>

    <a href="https://framaforms.org/adhesion-a-lassociation-nyassobi-1744015994" target="_blank">
      <button className={styles.button}>
        Formulaire d'adhesion
      </button>
    </a>

    <a href="https://drive.google.com/file/d/1KJ-kZrnKLHoA9AM3qO4qKPcNdBudSwXJ/" target="_blank">
      <button className={styles.button}>
        Autorisation parentale
      </button>
    </a>

  </div>);
}

export default NyassoButtonTwo;
