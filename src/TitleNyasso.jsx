import React, { useState } from "react"
import styles from './TitleNyasso.module.scss';

import RoundHeader from './assets/RoundHeader.png';

function TitleNyasso(props) {

    return (<>
        {props.title && <div className={styles['NyassoTitle']}>
            <div className={styles['roundHeader']}></div>
            <h1>{props.title}</h1>
        </div>}
        {props.subtitle && <div className={styles['NyassoSubTitle']}><h2>{props.subtitle}</h2></div>}
    </>)
}

export default TitleNyasso