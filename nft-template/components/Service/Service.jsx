import React from 'react'
import Image from 'next/image'


import Style from './Service.module.css'
import images from '../../img'

const Service = () => {
  return (
    <div className={Style.service}>
        <div className={Style.service_box}>
            <div className={Style.service_box_item}>
                <Image src={images.service1} alt="Explore the Marketplace" width={100} height={100}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 1</span>
                </p>
                <h3>Explore the Marketplace</h3>
                <p>Browse through thousands of unique NFTs. Find trending collections, new artists, and rare digital collectibles.</p>
            </div>
            <div className={Style.service_box_item}>
                <Image src={images.service2} alt="Filter & Analyze" width={100} height={100}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 2</span>
                </p>
                <h3>Filter & Analyze</h3>
                <p>Use powerful filters to sort by price, rarity, traits, and more. Analyze item history and properties before you decide.</p>
            </div>
            <div className={Style.service_box_item}>
                <Image src={images.service3} alt="Connect Wallet" width={100} height={100}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 3</span>
                </p>
                <h3>Connect Wallet</h3>
                <p>Securely link your preferred crypto wallet (like MetaMask, Phantom, etc.) to manage your assets and make transactions.</p>
            </div>
            <div className={Style.service_box_item}>
                <Image src={images.service4} alt="Connect Wallet" width={100} height={100}/>
                <p className={Style.service_box_item_step}>
                    <span>Step 4</span>
                </p>
                <h3>Start trading</h3>
                <p>Place bids, make offers, or buy NFTs instantly. List your own digital creations or collectibles for sale on the marketplace.</p>
            </div>
        </div>
    </div>
  )
}

export default Service