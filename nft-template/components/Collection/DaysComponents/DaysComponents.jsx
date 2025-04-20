import React from 'react';
import Style from './DaysComponents.module.css';
import Image from "next/image";
import { MdVerified } from 'react-icons/md';
import images from '../../../img';
const DaysComponents = () => {
    return (
<div className={Style.daysComponent_wrapper}>
  <div className={Style.daysComponent}>
    <div className={Style.daysComponent_box_img}>
      <div className={Style.imageTop}>
        <Image
          src={images.creatorbackground1}
          alt="Top Image"
          width={500}
          height={300}
          className={Style.image}
          style={{ objectFit: 'cover', width: '100%', borderRadius: '1rem 1rem 0 0' }}
        />
      </div>
      <div className={Style.imageBottom}>
        <Image
          src={images.creatorbackground2}
          alt="Bottom Left"
          width={200}
          height={200}
          className={Style.image}
          style={{ objectFit: 'cover', width: '50%' }}
        />
        <Image
          src={images.creatorbackground2}
          alt="Bottom Right"
          width={200}
          height={200}
          className={Style.image}
          style={{ objectFit: 'cover', width: '50%' }}
        />
      </div>
    </div>

    <div className={Style.daysComponent_box_title}>
      <h2>Amazing Collection</h2>
      <div className={Style.daysComponent_box_title_info}>
        <div className={Style.daysComponent_box_title_info_profile}>
          <Image
            src={images.user1}
            alt="profile"
            width={30}
            height={30}
            className={Style.daysComponent_box_title_info_profile_img}
            style={{ objectFit: 'cover' }}
          />
          <p>
            Creator
            <span>
              Maksim
              <small><MdVerified /></small>
            </span>
          </p>
        </div>
        <div className={Style.daysComponent_box_title_info_price}>
          <small>1.255 ETH</small>
        </div>
      </div>
    </div>
  </div>
</div>
        )
};

export default DaysComponents;