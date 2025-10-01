import React, { useState } from "react"
import styles from './WaveHeader.module.scss';

function WaveHeader() {
  return (
    <svg className={styles['waveHeader']} width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1920 175" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1920 -23L1925 -18V122.479L1919.3 127.43C1483.89 65.709 946.861 88.5767 659.847 137.907C371.639 187.443 247.018 173.045 -0.702148 137.93L-5 137.32V-18L0 -23H1920Z" fill="#ED5E24" stroke="white" stroke-width="10" stroke-miterlimit="1.36733" stroke-linecap="round"/>
    </svg>
  )
}

export default WaveHeader