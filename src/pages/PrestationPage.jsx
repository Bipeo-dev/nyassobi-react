import React, { useState } from "react"

import styles from './PrestationPage.module.scss';
import styles2 from './HomePage.module.scss';

import Footer from '../Footer'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter, faTwitch, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons' 

import { motion } from "motion/react"
import WaveHeader from "../WaveHeader";
import WaveJoinOrganization from "../WaveJoinOrganization";
import LineScrolling from "../LineScrolling";

import Nyasso_Actually from "../assets/Nyasso_Actually.png";
import TitleNyasso from "../TitleNyasso";
import SVGSplash from "../SvgSplash";

import CatGirl from "../assets/CatGirl.svg";
import NyassoCarousel from "../NyassoCarousel";

import PhotoPrestationConvention from "../assets/Photos_Prestation_Convention.png";

function PrestationPage() {

    return (<motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <div className={styles2['mainContent']}>
            <div className={styles2['LineScrolling']}>
                <LineScrolling/>
                <img className={styles2['actuallyCat']} src={Nyasso_Actually} />
            </div>
            <div className={styles2['mainContent']}>
                <div className={styles2['homePage']}>
                    <TitleNyasso title="Prestations en Conventions"/>
                    
                    <span style={{paddingTop: "15px", paddingBottom: "15px"}}>
                        Toutes les activités seront présentées par des vtubers de la communauté francophones avec le soutien du staff Nyassobi sur place. <br/><br/>

                        Les vtubers invités par Nyassobi sont en live depuis chez eux sur nos écrans.Nous avons donc besoin d’un accès à internet et d’electricité.
                    </span>

                    <TitleNyasso subtitle="Activités sur stand"/>
                    <span style={{paddingTop: "15px", paddingBottom: "15px"}}>
                        Meet & Great,  Live Drawing, Jeux interactifs, mini concerts, Ateliers... 
                    </span>

                    <TitleNyasso subtitle="Activités sur scène"/>
                    <span style={{paddingTop: "15px", paddingBottom: "15px"}}>
                        Conférences, Concert, Table ronde, Jeux interactifs... 
                    </span>

                    <img className={styles['photoPrestationConvention']} src={PhotoPrestationConvention} />
                </div>
            </div>

            
        </div>
        <Footer/>
    </motion.div>)
}

export default PrestationPage