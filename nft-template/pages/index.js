import React from 'react'
import Style from '../styles/index.module.css'
import { HeroSection,
         Service,
         BigNFTSilder,
} from '../components/componentsindex'

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
    </div>
  )
}
export default Home