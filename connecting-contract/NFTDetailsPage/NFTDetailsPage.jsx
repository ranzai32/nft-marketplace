import React from 'react'

import { NFTDescription, NFTDetailsImg, NFTTabs } from './NFTDetailsIndex';
import Style from './NFTDetailsPage.module.css';


const NFTDetails = () => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg />
        <NFTDescription />
      </div>
    </div>

  )
}

export default NFTDetails