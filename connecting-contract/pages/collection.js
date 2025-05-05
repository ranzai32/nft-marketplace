import React from 'react'
import Image from 'next/image'


import Style from '../styles/collection.module.css'
import images from '../img'
import { Banner, CollectionProfile, NFTCardTwo } from '../CollectionPage/collectionindex'
import { Slider, Brand } from '../components/componentsindex'
import Filter from '../components/Filter/Filter'

const collection = () => {
  const collectionArray = [
    { image: images.nft_image_1, name: "Cool NFT #1", price: "0.5 ETH" },
    { image: images.nft_image_2, name: "Abstract Art", price: "1.2 ETH" },
    { image: images.nft_image_3, name: "Music Drop", price: "0.1 ETH" },
    { image: images.nft_image_1, name: "Cool NFT #4", price: "0.6 ETH" },
    { image: images.nft_image_2, name: "Pixel World", price: "0.9 ETH" },
    { image: images.nft_image_3, name: "Sound Wave", price: "0.2 ETH" },
    { image: images.nft_image_1, name: "Cool NFT #7", price: "0.7 ETH" },
    { image: images.nft_image_2, name: "Digital Cat", price: "1.5 ETH" },
    { image: images.nft_image_3, name: "Beat Loop", price: "0.3 ETH" },
  ];
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