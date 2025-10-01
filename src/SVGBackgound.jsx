import React, { useState } from "react"
import styles from './SVGBackground.module.scss';

function SVGBackground() {

  return (
    <svg className={styles['svg']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <rect x="0" y="0" width="100%" height="100%" fill="rgba(255, 123, 66, 1)"></rect>        
    </svg>
  )
}

export default SVGBackground