import React, {useState} from 'react'
import Image from 'next/image'
import { MdVerified, MdCloudUpload, MdOutlineReportProblem } from 'react-icons/md'
import { FiCopy } from 'react-icons/fi'
import { TiSocialFacebook, TiSocialTwitter, TiSocialInstagram, TiSocialYoutube, TiSocialLinkedin } from 'react-icons/ti'
import { BsThreeDots } from 'react-icons/bs'

import Style from './AuthorProfileCard.module.css'
import images from '../../img'
import { Button } from '../../components/componentsindex'

const AuthorProfileCard = () => {
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);

  const copyAddress = () => {
    const copyText = document.getElementById("myInput");
    
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  }

  const openShare = () => {
    if(!share){
      setShare(true);
      setReport(false);
    } else{
      setShare(false);
    }
  }
  const openReport = () => {
    if(!report){
      setShare(false);
      setReport(true);
    } else{
      setReport(false);
    }
  }
  return (
    <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
        <div className={Style.AuthorProfileCard_box_img}>
          <Image 
            src={images.nft_image_1} 
            className={Style.AuthorProfileCard_box_img_img}
            alt='NFT Image'
            width={220}
            height={220}
          />
        </div>

        <div className={Style.AuthorProfileCard_box_info}>
          <h2>
            Bobur Kurwa{""} <span><MdVerified/></span>{""}
          </h2>

          <div className={Style.AuthorProfileCard_box_info_address}>
            <input type='text' value="0x7c851C11774bBa80b1286C9bfcd781DB863DDE1a" id="myInput"></input>
            <FiCopy 
              onClick={() => copyAddress()} 
              className={Style.AuthorProfileCard_box_info_address_icon}
            />
          </div>

          <p> 
            Punk #4786 / An OG Cryptopunk Collector, hoarder of NFTS. 
            Contributing to @ether_cards, an NFT Monetization Platform.
          </p>

          <div className={Style.AuthorProfileCard_box_info_social}>
            <a href='#'>
              <TiSocialFacebook />
            </a>
            <a href='#'>
              <TiSocialInstagram />
            </a>
            <a href='#'>
              <TiSocialLinkedin />
            </a>
            <a href='#'>
              <TiSocialTwitter />
            </a>
          </div>
        </div>

        <div className={Style.AuthorProfileCard_box_share}>
          <Button btnName="Follow" handleClick={() => {}}/>
          <MdCloudUpload onClick={() => openShare()} className={Style.AuthorProfileCard_box_share_icon}/>

          {share && (
            <div className={Style.AuthorProfileCard_box_share_upload}>
              <p>
                <span><TiSocialFacebook/></span>{""}
                Facebook
              </p>
              <p>
                <span><TiSocialInstagram/></span>{""}
                Instagram
              </p>
              <p>
                <span><TiSocialLinkedin/></span>{""}
                Linkedin
              </p>
              <p>
                <span><TiSocialTwitter/></span>{""}
                Twitter
              </p>
            </div>
          )}

          <BsThreeDots onClick={() => openReport()} className={Style.AuthorProfileCard_box_share_icon}/>
        
          {report && (
            <div className={Style.AuthorProfileCard_box_share_report}>
              <p>
                <span><MdOutlineReportProblem/></span>{""}
                Report abuse
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthorProfileCard