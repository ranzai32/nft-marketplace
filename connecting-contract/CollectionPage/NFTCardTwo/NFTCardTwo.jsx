import React, {useState} from 'react';
import Image from 'next/image';
import {BsImage} from 'react-icons/bs';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import { MdVerified, MdTimer } from 'react-icons/md';
import Link from 'next/link';

import Style from './NFTCardTwo.module.css';
import { LikeProfile } from '../../components/componentsindex';

const NFTCardTwo = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(21);

  const likeNFT = () => {
    if(!like) {
      setLike(true);
      setLikeInc(23);
    } else{
      setLike(false);
      setLikeInc(23 + 1);
    }
  } 
  return (
    <div className={Style.NFTCardTwo}>
      {NFTData.map((element, index) => (
        <Link href={{pathname: "/nft-details", query: element}} key={index + 1}>
          <div className={Style.NFTCardTwo_box} key={index + 1}>
            <div className={Style.NFTCardTwo_box_like}>
              <div className={Style.NFTCardTwo_box_like_box}>
                <div className={Style.NFTCardTwo_box_like_box_box}>
                  <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
                  <p onClick={() => likeNFT()}>
                    {like ? 
                      <AiOutlineHeart /> : <AiFillHeart />
                    }{""}
                    <span>{likeInc + 1}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={Style.NFTCardTwo_box_img}>
              <Image className={Style.NFTCardTwo_box_img_img} src={element.image} alt='NFT' width={265} height={265} objectFit='cover'/>
            </div>

            <div className={Style.NFTCardTwo_box_info}>
              <div className={Style.NFTCardTwo_box_info_left}>
                <LikeProfile />
                <p>{element.name}</p>
              </div>
              <small>4{index + 2}</small>
            </div>

            <div className={Style.NFTCardTwo_box_price}>
              <div className={Style.NFTCardTwo_box_price_box}>
                <small>Current BID</small>
                <p>{element.price}</p>
              </div>
              <p className={Style.NFTCardTwo_box_price_stock}>
                <MdTimer />
                <span>{index + 1} hours left</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
      
    </div>
  )
}

export default NFTCardTwo