import React, { useState } from "react"

import styles from './MainComponent.module.scss';

import { Outlet } from "react-router-dom";


function MainComponent() {

  return (
    <div className={styles['mainComponent']}>
        <Outlet />
    </div>
  )
}

export default MainComponent