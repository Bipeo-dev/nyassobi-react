import React, { useState } from "react"
import styles from './NewMemberButton.module.scss';
import { Link } from "react-router-dom";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function NewMemberButton() {

  return (<div className={`${styles['link']}`}>
    <Link to={`/adhesion`}>
        <div className={`${styles['item']}`}>Devenir Membre</div>
    </Link>
  </div>)
}

export default NewMemberButton