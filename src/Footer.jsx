import React, { useState } from "react"
import { Link } from "react-router-dom";

import styles from './Footer.module.scss';
import WaveFooter from "./WaveFooter";

import NyassoStand from "./assets/Nyasso_Stand.png";

import FooterSocialWidget from "./components/FooterSocialWidget";


function Footer() {

  return (
    <footer>
        <img className={styles['standNyasso']} src={NyassoStand} />
        <div style={{overflow:"hidden", marginBottom:"-10px"}}>
          <WaveFooter/>
        </div>
        <div className={`${styles['footer-nav']}`}>
          <FooterSocialWidget />
          <div className={`${styles['nav']}`}>
              <Link to={`/mentions-legales`}>
                  <div className={`${styles['footer-tagline']} ${styles['footer-tagline-right']}`} id="footer-tagline-right">Mentions légales</div>
              </Link>
          </div>
          <div className={`${styles['nav-2']}`}>
              <div className={`${styles['footer-tagline-right']}`} id="footer-tagline">Fièrement propulsé par <a target="_blank" rel="nofollow noreferrer noopener" className="external text" href="https://www.startingames.org/en/">Startingames</a>™ pour la communauté ❤</div>
          </div>
        </div>
    </footer>
  )

}

export default Footer
