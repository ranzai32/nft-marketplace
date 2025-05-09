import React, {useState} from 'react';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {BsImages} from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';

import Style from './NFTCard.module.css';
import images from '../../img';

const NFTCard = ({NFTData}) => {
  /*const featureArray = [
    images.nft_image_1, images.nft_image_2, images.nft_image_3,
    images.nft_image_1, images.nft_image_2, images.nft_image_3,
  ];*/

  const [like, setLike] = useState(true);

  const likeNft = () => {
    if(!like){
      setLike(true);
    } else {
      setLike(false);
    }
  }

  return (
    <div className={Style.NFTCard}>
      {NFTData.map((element, index) => (
        <Link href={{pathname: "/nft-details", query: element}}>
          <div className={Style.NFTCard_box} key={index + 1}>
            <div className={Style.NFTCard_box_img}>
              <Image src={element.image} alt="NFT images" width={600} height={600} className={Style.NFTCard_box_img_img}/>
            </div>

            <div className={Style.NFTCard_box_update}>
              <div className={Style.NFTCard_box_update_left}>
                <div className={Style.NFTCard_box_update_left_like} onClick={() => likeNft()}>
                  {like ? <AiOutlineHeart/> : <AiFillHeart className={Style.NFTCard_box_update_left_like_icon}/>}
                  {"22"}
                </div>
              </div>

              <div className={Style.NFTCard_box_update_right}>
                <div className={Style.NFTCard_box_update_right_info}>
                  <small>Remaining time:</small>
                  <p>3h: 15m : 20s</p>
                </div>
              </div>
            </div>

            <div className={Style.NFTCard_box_update_details}>
              <div className={Style.NFTCard_box_update_details_price}>
                <div className={Style.NFTCard_box_update_details_price_box}>
                  <h4>{element.name} #{element.tokenId}</h4>
                  <div className={Style.NFTCard_box_update_details_price_box_box}>
                    <div className={Style.NFTCard_box_update_details_price_box_bid}>
                      <small>Current BID</small>
                      <p>{element.price} ETH</p>
                    </div>
                    <div className={Style.NFTCard_box_update_details_price_box_stock}>
                      <small>61 in stock</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className={Style.NFTCard_box_update_details_category}>
                <BsImages />
              </div>
            </div>
          </div>
        </Link>
      ))};
    </div>
  )
}

export default NFTCard