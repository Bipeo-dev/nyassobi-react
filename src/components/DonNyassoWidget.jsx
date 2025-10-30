import styles from "./DonNyassoWidget.module.scss";


function DonNyassoWidget() {

  return (<div className={styles.nyassoBtn}>

    <iframe id="haWidget" scrolling="auto" src="https://www.helloasso.com/associations/nyassobi/formulaires/1/widget" style={{height:"700px", width:"75%", background: "#fff", border:"none", fontSize: "16px/26px", overflow:"auto", marginLeft: "auto", marginRight: "auto", padding: "10px", marginTop: "15px", marginBottom: "15px", display: "flex", borderRadius: "25px"}}></iframe>

  </div>);
}

export default DonNyassoWidget;
