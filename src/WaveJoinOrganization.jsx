import React, { useState } from "react"
import styles from './WaveJoinOrganization.module.scss';
import NyassoIdol from "./assets/Nyasso_Idol.png";

import { Link } from "react-router-dom";

function WaveJoinOrganization() {
  return (<Link to={`/adhesion`}>
    <div style={{position: "relative"}}>
        {/* <svg className={styles['waveJoinOrganization-1']} width="0" height="0">
            <defs>
                <mask id="waveMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="272">
                    <rect width="1920" height="272" fill="black" />
                    <path
                        d="M697 120C372.782 112.617 72 161.5 -38 191L-40.5 202L-51.5 0.5H1996.5V191C1578.5 379.5 1202 131.5 697 120Z"
                        fill="white"
                    />
                </mask>
            </defs>
        </svg> */}

        <div className={styles['waveJoinOrganization-clip']}>
            <img className={styles['idolCat']} src={NyassoIdol} />
        </div>
        <svg className={styles['waveJoinOrganization-2']} preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 1920 272" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M697 125C372.782 117.617 72 166.5 -38 196L-40.5 207L-51.5 5.5H1996.5V196C1578.5 384.5 1202 136.5 697 125Z" fill="#83DBD3" stroke="white" stroke-width="10"/>
        </svg>

        <img className={styles['adhesion-text']} src={"./adhesion_text_fr.png"} />


        

    </div>

  </Link>)
}

export default WaveJoinOrganization