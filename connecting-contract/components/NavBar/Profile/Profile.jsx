import React, {useContext, useState, useEffect} from 'react';
import Image from 'next/image';
import { FaUserAlt, FaRegImage, FaUserEdit } from 'react-icons/fa';
import { MdHelpCenter } from 'react-icons/md';
import { TbDownloadOff } from 'react-icons/tb';

import Style from './Profile.module.css';
import images from '../../../img';
import Link from 'next/link';

{/*import { NFTMarketplaceContext } from '../../../Context/NFTMarketplaceContext';*/}

const Profile = ({ currentAccount }) => {
  {/*const { disconnectWallet } = useContext(NFTMarketplaceContext);*/}
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image 
          src={images.user1} 
          alt="user profile" 
          width={50} height={50} 
          className={Style.profile_account_img} 
        />

        <div className={Style.profile_account_info}>
          <p>Ruslan Zhulduzbayev</p>
          <small>{currentAccount.slice(0, 18)}...</small>
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt/>
            <p>
              <Link href={{pathname: '/author'}}>My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage/>
            <p>
              <Link href={{pathname: '/author'}}>My Items</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit/>
            <p>
              <Link href={{pathname: '/account'}}>Edit Profile</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter/>
            <p>
              <Link href={{pathname: '/contactUs'}}>Help</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>{/*onClick={disconnectWallet}*/}
            <TbDownloadOff/>
            <p>
              <Link href={{pathname: '/disconnect'}}>Disconnect</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;