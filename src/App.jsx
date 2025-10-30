import { useState } from 'react'
import WaveComponent from './WaveComponent';
import MainComponent from './MainComponent';
import Header from './Header';
import ScrollToTopButton from './components/ScrollToTopButton';

import './App.scss'

function App() {

  return (
    <>
      <Header/>
      {/* <WaveComponent/> */}
      <MainComponent/>
      <ScrollToTopButton />
    </>
  )
}

export default App
