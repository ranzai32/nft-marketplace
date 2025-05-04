import React from 'react'
import Image from 'next/image'

import Style from './NFTTabs.module.css'

const NFTTabs = ({ dataTab, icon }) => {
  return (
    <div className={Style.NFTTabs}>
      {dataTab.map((element, index) => (
        <div className={Style.NFTTabs_box} key={index + 1}>
          <Image
            src={element}
            alt='Profile image'
            width={40} height={40}
            className={Style.NFTTabs_box_img}
          />
          <div className={Style.NFTTabs_box_info}>
            <span>
              Offer by $770 by <span>Mels Begenov</span>
              {icon}
            </span>
            <small>Jun 14 - 4:12</small>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NFTTabs