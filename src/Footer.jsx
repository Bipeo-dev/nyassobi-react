import React, { useState } from "react"
import { Link } from "react-router-dom";

import styles from './Footer.module.scss';
import WaveFooter from "./WaveFooter";

import NyassoStand from "./assets/Nyasso_Stand.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter, faTwitch, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons'; 


function Footer() {

  return (
    <footer>
        <img className={styles['standNyasso']} src={NyassoStand} />
        <div style={{overflow:"hidden", marginBottom:"-10px"}}>
          <WaveFooter/>
        </div>
        <div className={`${styles['footer-nav']}`}>
          <div className={styles['footer-social-icons']}>
              <ul className={styles['social-icons']}>
                  <li className={styles['social-icon']}><a href="https://x.com/Nyassobi"  target="_blank"> <FontAwesomeIcon icon={faTwitter} size="2x"/></a></li>
                  <li className={styles['social-icon']}><a href="https://www.twitch.tv/nyassobi"  target="_blank"> <FontAwesomeIcon icon={faTwitch} size="2x"/></a></li>
                  <li className={styles['social-icon']}><a href="https://www.tiktok.com/@nyassobi"  target="_blank"> <FontAwesomeIcon icon={faTiktok} size="2x"/></a></li>
                  <li className={styles['social-icon']}><a href="https://www.youtube.com/@Nyassobi"  target="_blank"> <FontAwesomeIcon icon={faYoutube} size="2x"/></a></li>
                  <li className={styles['social-icon']}><a href="https://www.instagram.com/nyassobi/"  target="_blank"> <FontAwesomeIcon icon={faInstagram} size="2x"/></a></li>
                  <li className={styles['social-icon']}><a href="mailto:nyassobi.association@gmail.com" target="_blank"> <FontAwesomeIcon icon={faEnvelope} size="2x"/></a></li>
              </ul>
          </div>
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