import styles from "./NyassoButtonOne.module.scss";


function NyassoButtonOne() {

  return (<div className={styles.nyassoBtn}>

    <a href="https://drive.google.com/file/d/11PtZQckyWmOuyLgU2P0zW-4XhftSlCic/" target="_blank">
      <button className={styles.button}>
        Status associatifs
      </button>
    </a>

    <a href="https://docs.google.com/document/d/1IKJQm1VKrdHKaLktpq2G3O2L9XFkUd2t8zSlVJFrqEQ/" target="_blank">
      <button className={styles.button}>
        Règlement intérieur
      </button>
    </a>

  </div>);
}

export default NyassoButtonOne;
