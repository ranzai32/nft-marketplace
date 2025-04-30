import React, { useState } from 'react';
import Image from "next/image";
import { MdVerified,
         MdCloud,
         MdTimer,
         MdReportProblem,
         MdOutlineDeleteSweep,
         MdCloudUpload,
       } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaWallet, FaPercentage } from 'react-icons/fa';
import { TiSocialFacebook, TiSocialLinkedin, TiSocialYoutube, TiSocialInstagram, TiArrowSortedDown, TiArrowSortedUp, TiSocialTwitter } from 'react-icons/ti'
import { BiTransferAlt, BiDollar } from "react-icons/bi";

import Style from './NFTDescription.module.css';
import images from '../../img';
import { Button } from '../../components/componentsindex';
import { NFTTabs } from '../NFTDetailsIndex';

const NFTDescription = () => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);

  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ]

  const provananceArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ]

  const ownerArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ]

  const openSocial = ()=> {
    if(!social){
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = ()=> {
    if(!NFTMenu){
      setNFTMenu(true)
      setSocial(false)
    } else {
      setNFTMenu(false)
    }
  };

  const openTabs = (e)=> {
    const btnText = e.target.innerText;

    if(btnText == "Bid History"){
      setHistory(true);
      setProvanance(false);
      setOwner(false);
    } else if(btnText == "Provanance"){
      setHistory(false);
      setProvanance(true);
      setOwner(false);    
    }
  };

  const openOwner = ()=> {
    if(!owner){
      setHistory(false);
      setProvanance(false);
      setOwner(true);
    } else {
      setOwner(false);
    }
  };

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual World</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload 
              className={Style.NFTDescription_box_share_box_icon} 
              onClick={() => openSocial()}
            />

            {social &&(
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook/> Facebook
                </a>
                <a href="#">
                  <TiSocialInstagram/> Instagram
                </a>
                <a href="#">
                  <TiSocialLinkedin/> Linkedin
                </a>
                <a href="#">
                  <TiSocialTwitter/> X
                </a>
                <a href="#">
                  <TiSocialYoutube/> YouTube
                </a>
              </div>
            )}

            <BsThreeDots 
              className={Style.NFTDescription_box_share_box_icon} 
              onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <BiDollar/> Change price
                </a>
                <a href="#">
                  <BiTransferAlt/> Transfer
                </a>
                <a href="#">
                  <MdReportProblem/> Report abouse
                </a>
                <a href="#">
                  <MdOutlineDeleteSweep/> Delete item
                </a>
              </div>
            )}
          </div>
        </div>

        <div className={Style.NFTDescription_box_profile}>
            <h1>BearX #23453</h1>
            <div className={Style.NFTDescription_box_profile_box}>
              <div className={Style.NFTDescription_box_profile_box_left}>
                <Image 
                  src={images.user2} 
                  alt="profile" 
                  width={40} 
                  height={40}
                  className={Style.NFTDescription_box_profile_box_left_img}
                />

                <div className={Style.NFTDescription_box_profile_box_right_info}>
                  <small>Creator</small> <br/>
                  <span>
                    Karli Costa <MdVerified />
                  </span>
                </div>
              </div>
            </div>
              

        

        <div className={Style.NFTDescription_box_profile_bidding}>
          <p>
            <MdVerified/> <span> Auction ending in: </span>
          </p>

          <div className={Style.NFTDescription_box_profile_bidding_box_timer}>
            <div className={Style.NFTDescription_box_profile_bidding_box_timer_item}>
              <p>2</p>
              <span>Days</span>
            </div>
            <div className={Style.NFTDescription_box_profile_bidding_box_timer_item}>
              <p>22</p>
              <span>Hours</span>
            </div>
            <div className={Style.NFTDescription_box_profile_bidding_box_timer_item}>
              <p>14</p>
              <span>mins</span>
            </div>
            <div className={Style.NFTDescription_box_profile_bidding_box_timer_item}>
              <p>22</p>
              <span>secs</span>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_biding_box_price}>
            <div className={Style.NFTDescription_box_profile_bidding_box_price_bid}>
              <small>Current Bid</small>
              <p> 
                1.000 ETH <span> ( = $1,900,00) </span>
              </p>
            </div>

            <span>[96 in stock]</span>
          </div>

          <div className={Style.NFTDescription_box_profile_bidding_box_button}>
            <Button 
              icon=<FaWallet /> 
              btnName="Place a bid" 
              handleClick={() => {}}
              classStyle={Style.button}  
            />
            <Button 
              icon=<FaPercentage /> 
              btnName="Make Offer" 
              handleClick={() => {}}
              classStyle={Style.button}  
            />
          </div>

          <div className={Style.NFTDescription_box_profile_bidding_box_tabs}>
            <button onClick={(e) => openTabs(e)}>Bid History</button>
            <button onClick={(e) => openTabs(e)}>Provanance</button>
            <button onClick={(e) => openOwner()}>Owner</button>
          </div>

          {history && (
            <div className={Style.NFTDescription_box_profile_bidding_box_card}>
              <NFTTabs dataTab={historyArray}/>
            </div>
          )}
          {provanance && (
            <div className={Style.NFTDescription_box_profile_bidding_box_card}>
              <NFTTabs dataTab={provananceArray}/>
            </div>
          )}
          {ownerArray && (
            <div className={Style.NFTDescription_box_profile_bidding_box_card}>
              <NFTTabs dataTab={ownerArray}/>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default NFTDescription;