import React, { useState } from "react"

import styles from './PresentationPage.module.scss';
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

import PhotoPresentationMembre from "../assets/presentation_membres.png";

function PresentationPage() {

    return (<motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <div className={styles2['mainContent']}>
            <div className={styles2['LineScrolling']}>
                <LineScrolling/>
                <img className={styles2['actuallyCat']} src={Nyasso_Actually} />
            </div>
            <div className={styles2['mainContent']}>
                <div className={styles2['homePage']}>
                    <TitleNyasso title="C'est quoi Nyassobi" subtitle="Quelques explications rapides !"/>
                    
                    <span style={{paddingTop: "15px", paddingBottom: "15px"}}>
                        L'association Nyassobi est une association qui cherche à mettre en avant la communauté des vtubers francophones. Avec des actions en ligne comme en convention, nous voulons permettre à un plus large public de prendre connaissance de ce milieu. 

                        Nous souhaitons également aider les créateurs et les créatrices en leur proposant des ateliers pour être mieux armés face à la création de contenus sur internet.

                        Toutes nos actions seront diffusées sur nos réseaux sociaux et les activités, qu'elles soient ouvertes au public ou bien réservées à nos membres, permettront à toutes et tous de pouvoir découvrir ou redécouvrir les vtubers francophones !
                    </span>

                    <TitleNyasso title="Membres du CA" subtitle="Présentation"/>
                    <span style={{paddingTop: "15px", paddingBottom: "15px"}}>
                        Le CA ou plus communément appelé Conseil d’administration est constitué de plusieurs rôles. 
                        Blabla y’a le bureau administratif blabla dans le bureau y’a les rôles clés blabla 
                        balblablablablabla CA On est 6 blabla (8 soon).
                    </span>

                    <img className={styles['photoPrestationConvention']} src={PhotoPresentationMembre} />

                    <TitleNyasso title="Mais concrètement, ça fais quoi ?" subtitle="Évènements en conventions"/>
                    <span style={{paddingTop: "15px", paddingBottom: "15px"}}>
                       L'association participe régulièrement à des conventions pour mettre en avant la culture du vtubing auprès du public francophone. 

                        À travers une variété d'activités interactives et divertissantes, nous permettons aux participants de découvrir, d'explorer et d'en apprendre davantage sur cet univers en pleine expansion. Voici les activités proposées lors de nos événements en convention :

                        &gt; Concerts, jeux, conférences, expositions, meet & greet, ateliersChaque événement est une opportunité pour nous de promouvoir et de célébrer le vtubing en francophonie, en créant des moments de partage et d’interaction entre créateurs, fans et curieux de ce phénomène.
                    </span>

                    <TitleNyasso subtitle="Évènements en ligne"/>

                    <span style={{paddingTop: "15px", paddingBottom: "15px"}}>
                        En complément de nos activités en convention, l'association organise régulièrement des événements en ligne spécialement réservés pour les membres uniquement, afin de renforcer la communauté et de permettre des échanges réguliers autour du vtubing francophone. 

                        Ces événements offrent des moments de convivialité, de compétition amicale, et d’apprentissage, le tout dans un cadre virtuel. Voici un aperçu des activités en ligne que nous proposons :
                        &gt; Serveurs de jeu, tournois, supports de contenu, etc.
                    </span>

                    <TitleNyasso subtitle="Entraide communautaire en ligne"/>

                    <span style={{paddingTop: "15px", paddingBottom: "15px"}}>
                        L’association met un point d’honneur à favoriser l’entraide et la collaboration entre ses membres. À cet effet, nous avons créé un espace d'entraide communautaire sur notre serveur Discord, spécialement conçu pour accompagner ceux qui souhaitent progresser dans l’univers du vtubing et partager leurs connaissances. 

                        Ce cadre convivial et bienveillant est un lieu central d’échanges, où chaque membre peut à la fois apprendre et contribuer à la communauté. Nous travaillons aussi étroitement avec des structures déjà existantes et ouvertes à tous comme FRVtubers. 

                        Voici ce que vous y trouverez :
                        &gt; Assistance technique, partage de ressources, feedback et critiques constructives, collaboration entre membres, discussions thématiques
                    </span>

                </div>
            </div>

            
        </div>
        <Footer/>
    </motion.div>)
}

export default PresentationPage