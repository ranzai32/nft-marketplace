import React from 'react'
import Style from '../styles/index.module.css'
import { HeroSection,
         Service,
         BigNFTSilder,
         Subscribe,
         Title,
         Category,
         Filter,
} from '../components/componentsindex'

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
      <Title heading='Featurerd NFTs' paragraph='Discover the most outstanding NFTs in all topics of life'/>
      <Filter />
      <Title heading='Browse by category' paragraph='Explore the NFTs in the most featured categories.'/>
      <Category />
      <Subscribe />
    </div>
  )
}
export default Home