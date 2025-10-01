import React, { useState } from "react"

import styles from './DonationPage.module.scss';
import styles2 from './HomePage.module.scss';

import Footer from '../Footer'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faEnvelope, faFilePdf, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter, faTwitch, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons' 
import Header from "../Header";

import { motion } from "motion/react"

import TitleNyasso from "../TitleNyasso";

function DonationPage() {

  return (<motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <div className={styles2['mainContent']}>
            <div className={styles2['mainContent']}>
                <div className={styles2['homePage']}>
                  <TitleNyasso title="Faire un Don" subtitle="Soutenez-nous!"/>
                  
                  <div className={styles['donationPageWrapper']}>
                    <span style={{paddingTop: "15px", paddingBottom: "15px"}}>
                      ℹ️ Article 894 - Version en vigueur depuis le 01 janvier 2007

                      <br/><br/>

                      <a href="https://www.legifrance.gouv.fr/loda/id/LEGIARTI000006284843/2007-01-01/">Modifié par Loi n°2006-728 du 23 juin 2006 - art. 9 () JORF 24 juin 2006 en vigueur le 1er janvier 2007</a>

                      <br/><br/>

                      La donation entre vifs est un acte par lequel le donateur se dépouille actuellement et irrévocablement de la chose donnée en faveur du donataire qui l'accepte.
                      En application de l'article 6 de la loi du 1er juillet 1901, toutes les associations déclarées sont en mesure de recevoir des dons manuels. Et ce, sans qu'elles aient besoin qu'une quelconque autorisation spéciale au préalable. Autrement dit, l'établissement d'un acte notarié ne se révèle pas nécessaire.
                    </span>

                    {/* <img className={styles['standNyasso']} src={NyassoStand} /> */}
                  </div>

                  <iframe id="haWidget" scrolling="auto" src="https://www.helloasso.com/associations/nyassobi/formulaires/1/widget" style={{height:"700px", width:"75%", background: "#fff", border:"none", fontSize: "16px/26px", overflow:"auto", marginLeft: "auto", marginRight: "auto", padding: "10px", marginTop: "15px", marginBottom: "15px", display: "flex", borderRadius: "25px"}}></iframe>
                </div>
            </div>
        </div>

        <Footer/>
    
    </motion.div>)
}

export default DonationPage