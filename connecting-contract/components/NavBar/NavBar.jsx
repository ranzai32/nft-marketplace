import React, {useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {MdNotifications} from 'react-icons/md';
import {BsSearch} from 'react-icons/bs';
import {CgMenuLeft, CgMenuRight} from 'react-icons/cg';
import {useRouter} from 'next/router'

import Style from './NavBar.module.css';
import {Discover, HelpCenter, Notification, Profile, Sidebar} from './index';
import {Button} from '../componentsindex';
import images from '../../img';

import {NFTMarketplaceContext} from '../../Context/NFTMarketplaceContext';
import { useTheme } from '../../Context/ThemeContext';

const NavBar = () => {
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const router = useRouter();

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if(btnText == 'Discover') {
      if(!discover) {
        setDiscover(true);
        setHelp(false);
        setNotification(false);
        setProfile(false);
      } else {
        setDiscover(false);
      }
    } else if(btnText == 'Help Center') {
      if(!help) {
        setHelp(true);
        setDiscover(false);
        setNotification(false);
        setProfile(false);
      } else {
        setHelp(false);
      }
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  }

  const openNotification = () => {
    if(!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  }

  const openProfile = () => {
    if(!profile) {
      setProfile(true);
      setDiscover(false);
      setHelp(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  }

  const OpenSideBar = () => {
    if(!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  }

  const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);
  const { theme } = useTheme();

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo} onClick={() => {router.push("/")}}>
            <Image src={theme === 'light' ? images.logo : images.logoLight} alt="NFT Marketplace" width={120} height={48} className={Style.logo_img}/>
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
          {/* Discover Menu*/}
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>
          {/*Help Center Menu*/}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/*Notification*/}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications className={Style.notify} onClick={() => openNotification()}/>
            {notification && <Notification />}
          </div>

          {/*Create button section*/}
          <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? 
              <Button btnName="Connect" handleClick={() => connectWallet()}/> 
              : 
              <Button btnName='Create' handleClick={() => {router.push("/uploadNFT")}} />
            }
          </div>

          {/*Profile section*/}
          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image 
                src={images.user1} 
                alt="Profile" 
                width={40} 
                height={40} 
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />
              {profile && <Profile currentAccount={currentAccount}/>}
            </div>
          </div>

          {/*Hamburger menu(Mobile)*/}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight  
              className={Style.menuIcon}
              onClick={() => OpenSideBar()} 
            />
          </div>

          {/*Sidebar*/}
          {openSideMenu && (
            <div className={Style.sideBar}>
              <Sidebar setOpenSideMenu={setOpenSideMenu} connectWallet={connectWallet} currentAccount={currentAccount}/>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar