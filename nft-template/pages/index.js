import React from 'react'
import Style from '../styles/index.module.css'
import { HeroSection,
         Service,
         BigNFTSilder,
         Subscribe,
         Title,
} from '../components/componentsindex'

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
      <Title heading='Browse by category' paragraph='Explore the NFTs in the most featured categories.'/>
      <Subscribe />
    </div>
  )
}
export default Home