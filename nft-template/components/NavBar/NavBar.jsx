import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
//IPMORT ICON
import {MdNotifications} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'
import {CgMenuLeft, CgMenuRight} from 'react-icons/cg'

//INTERNAL
import Style from './NavBar.module.css'
import {Discover, HelpCenter, Notification, Profile, Sidebar} from './index'
import {Button} from '../componentsindex'
import images from '../../img'

const NavBar = () => {
  //USESTATE
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image src={images.logo} alt="NFT Marketplace" width={100} height={100}/>
          </div>
          <div className={Style.navbar_container_left_input}>
            <div className={Style.navbar_container_left_input_box}>
              <input type="text" placeholder='Search NFT'/>
              <BsSearch onClick={() => {}} className={Style.search_icon}/>
            </div>
          </div>
        </div>
        {/* // End of left section*/}
        
        <div className={Style.navbar_container_right}>
          
        </div>
      </div>
    </div>
  )
}

export default NavBar