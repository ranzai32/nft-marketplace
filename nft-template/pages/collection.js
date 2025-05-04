import React from 'react'
import Image from 'next/image'


import Style from '../styles/collection.module.css'
import images from '../img'
import { Banner, CollectionProfile, NFTCardTwo } from '../CollectionPage/collectionindex'
import { Slider, Brand } from '../components/componentsindex'
import Filter from '../components/Filter/Filter'

const collection = () => {
  const collectionArray = [
    images.nft_image_1, images.nft_image_2, images.nft_image_3,
    images.nft_image_1, images.nft_image_2, images.nft_image_3,
    images.nft_image_1, images.nft_image_2, images.nft_image_3,
  ]
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1}/>
      <CollectionProfile />
      <NFTCardTwo NFTData={collectionArray}/>
      <Filter />
      <Slider />
      <Brand />
    </div>
  )
}

export default collection