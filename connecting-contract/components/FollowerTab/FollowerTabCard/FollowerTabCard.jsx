import React, {useState} from 'react';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import {TiTick} from 'react-icons/ti';
import Link from 'next/link';

import Style from './FollowerTabCard.module.css';
import images from '../../../img';

const FollowerTabCard = ({ index, element }) => {
  const [following, setFollowing] = useState(false);

  const followMe = ()=>{
    if(!following){
      setFollowing(true);
    } else{
      setFollowing(false);
    }
  }
  const profileLink = element.seller ? `/author?address=${element.seller}` : '#';
  return (
    <div className={Style.FollowerTabCard}>
      <div className={Style.FollowerTabCard_rank}>
        <p>
          #{index + 1} <span>🥇</span>
        </p>
      </div>

      <div className={Style.FollowerTabCard_box}>
        <div className={Style.FollowerTabCard_box_img}>
          <Image 
            className={Style.FollowerTabCard_box_img_img} 
            src={element.background || images.creatorbackground2} 
            alt='profile background' 
            width={250} height={150} 
            objectFit='cover'
          />
        </div>

        <div className={Style.FollowerTabCard_box_profile}>
          <Image 
            className={Style.FollowerTabCard_box_profile_img} 
            alt='profile picture' 
            width={50} height={50}
            src={element.user || images.user1}
          />
        </div>

        <div className={Style.FollowerTabCard_box_info}>
          <div className={Style.FollowerTabCard_box_info_name}>
            <Link href={profileLink}>
              <h4>
                {element.seller.slice(0, 9)}{""} 
                <span>
                  <MdVerified/>
                </span>
              </h4>
            </Link>
            <p>{element.total || 0} ETH</p>
          </div>

          <div className={Style.FollowerTabCard_box_info_following}>
            {following ? (
              <a onClick={() => followMe()}>
                Follow{""} <span><TiTick/></span>
              </a>
            ): (
              <a onClick={() => followMe()}>Following</a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FollowerTabCard;