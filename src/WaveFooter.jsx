

import React, { useState } from "react"
import styles from './WaveFooter.module.scss';

function WaveFooter() {
  return (
    <svg className={styles['waveFooter']} preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 1920 345" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1920 350L1925 345L1925 84.6037L1918.73 79.7677C1701.38 136.877 1450.66 152.394 1222.21 143.417C993.738 134.439 787.954 100.977 660.518 60.377C532.117 19.4696 428.675 3.09385 326.192 5.17483C223.774 7.25455 122.567 27.7656 -1.27048 60.3047L-4.99998 61.2852L-5 345L-4.37114e-07 350L1920 350Z" fill="#ED5E24" stroke="white" stroke-width="10" stroke-miterlimit="1.36733" stroke-linecap="round"/>
    </svg>
  )
}

export default WaveFooter