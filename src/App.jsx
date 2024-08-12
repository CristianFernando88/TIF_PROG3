import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
/* import './App.css' */
import HeaderNav from './components/HeaderNav'
import FooterBar from './components/FooterBar'
import CardCategory from './components/Categories/CardCategory'
import HeroBody from './components/HeroBody';
import CardCategories from './components/CardCategories';
import Recipe from './components/Recipes/Recipe'

function App() {

  return (
    <>
      <HeaderNav/>
      
      
      <HeroBody>
        {/* <CardCategories/> */}
        <Recipe/>
      </HeroBody>
      
      <FooterBar/>
    </>
  )
}

export default App
