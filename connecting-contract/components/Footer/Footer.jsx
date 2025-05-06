import React from 'react'
import Image from 'next/image'
import { TiSocialFacebook, TiSocialLinkedin, TiSocialYoutube, TiSocialInstagram, TiArrowSortedDown, TiArrowSortedUp, TiSocialTwitter } from 'react-icons/ti'
import {RiSendPlaneFill} from 'react-icons/ri'

import Style from './Footer.module.css'
import images from '../../img'
import { Discover, HelpCenter} from '../NavBar'

import { useTheme } from '../../Context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={theme === 'light' ? images.logo : images.logoLight} alt="footer logo" height={40} width={100} className={Style.footer_box_social_img}/>
          <p>
            One of the greatest Non Fungible Token (NFT) marketplaces, where you can buy and sell NFTs. Buy, sell, and create exclusive digital items together!
          </p>

          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>  
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>

        <div className={Style.subscribe}>
          <h3>Subscribe</h3>

          <div className={Style.subscribe_box}>
            <input type='email' placeholder='Enter your email'></input>
            <RiSendPlaneFill className={Style.subscribe_box_send}/>
          </div>

          <div className={Style. subscribe_box_info}>
            <p>Discover, Collect, and Sell extraordinary NFTs in the greatest NFT marketplace</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer