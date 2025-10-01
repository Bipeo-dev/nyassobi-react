import React, { useState } from "react"

import styles2 from './HomePage.module.scss';

import styles from './AdhesionPage.module.scss';

import Footer from '../Footer'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faEnvelope, faFilePdf, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter, faTwitch, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons' 
import Header from "../Header";

import TitleNyasso from "../TitleNyasso";

import { motion } from "motion/react"

function AdhesionPage() {

  return (<motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <div className={styles2['mainContent']}>
            <div className={styles2['mainContent']}>
                <div className={styles2['homePage']}>
                    <TitleNyasso title="Rejoindre Nyassobi" subtitle="Avant d'adhérer :"/>

                    <span>
                        L'adhésion à l'association Nyassobi est ouverte à toutes et à tous. <br/><br/>

                        La période d'adhésion s'étend du 1er septembre au 31 août de l'année suivante, alignée sur le calendrier universitaire en raison de la présence importante d'étudiants parmi les membres. <br/>
                        Le montant de la cotisation annuelle est fixé à 20 €. <br/>
                        Toutefois, une cotisation réduite à 15 € est proposée pour les mineurs, les étudiants, les demandeurs d'emploi et les personnes bénéficiant d'aides sociales, selon les critères définis par l'assemblée générale.
                    </span>

                    <TitleNyasso title="RGPD"/>

                    <div className={styles2['homeScroller']}>
                        La section RDPG/CNIL était un point important pour nous lors de la création de l'association.  Nous avons réfléchi à plusieurs choses et lu beaucoup de documentation pour être dans les règles en même temps qu'essayer de garantir votre anonymat au mieux !
                        
                        <TitleNyasso subtitle="Collecte des données:"/> <br/>
                        - L’association collecte vos données personnelles: nom, prénom et date de naissance afin de garantir sa bonne gestion sur le plan légal.,<br/>
                        - Le pseudonyme du membre ne sera pas conservé dans la base de données après l’inscription afin d'éviter tout rapprochement en cas de fuite de celles-ci.,<br/>
                        - Vous devez fournir ces informations demandées pour valider votre inscription.,<br/>
                        - Nyassobi s’appuie sur la Base Légale d’accord libre, spécifique, éclairé et univoque des personnes.
                    </div>

                    <TitleNyasso title="Formulaire d'Adhésion" subtitle="Adhérer à l'association"/>

                    <span>
                        Le présent formulaire sert à s'inscrire en tant que membre dans l'association Nyassobi. <br/>
                        Nyassobi est une association ayant pour but de promouvoir la création de contenu virtuelle en France par divers biais. 
                        <br/><br/>
                        Merci de lire attentivement les Statuts ainsi que le Règlement intérieur :
                    </span>

                    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent:"center", gap: "10px"}}>
                        <a href="https://drive.google.com/file/d/11PtZQckyWmOuyLgU2P0zW-4XhftSlCic/" target="_blank"><button className={styles['btn']}><FontAwesomeIcon icon={faFilePdf}/> Status de l'association</button></a>
                        <a href="https://docs.google.com/document/d/1IKJQm1VKrdHKaLktpq2G3O2L9XFkUd2t8zSlVJFrqEQ/" target="_blank"><button className={styles['btn']}><FontAwesomeIcon icon={faBuilding}/> Règlement intérieur</button></a>
                        <a href="https://drive.google.com/file/d/1KJ-kZrnKLHoA9AM3qO4qKPcNdBudSwXJ/" target="_blank"><button className={styles['btn']}><FontAwesomeIcon icon={faPeopleGroup}/> Autorisation parentale</button></a>
                    </div>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <a href="https://framaforms.org/adhesion-a-lassociation-nyassobi-1744015994" target="_blank" style={{width: "50%"}}><button className={styles['btn-2']}>Rejoindre l'association</button></a>
                    </div>

                    <span>
                        Merci de votre intérêt pour notre initiative !
                    </span>
                </div>
            </div>
        </div>
        
        <Footer/>
    
    </motion.div>)
}

export default AdhesionPage