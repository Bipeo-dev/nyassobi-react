import React, { useState } from "react"
import styles from './WaveComponent.module.scss';

function WaveComponent() {

  return (
    <svg className={styles['svg']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ff8a5b" fillOpacity="1" d="M0,32L60,42.7C120,53,240,75,360,112C480,149,600,203,720,240C840,277,960,299,1080,293.3C1200,288,1320,256,1380,240L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
    </svg>
  )
}

export default WaveComponent