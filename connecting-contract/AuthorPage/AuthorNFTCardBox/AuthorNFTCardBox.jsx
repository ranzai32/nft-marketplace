import React, {useState} from 'react'

import Style from './AuthorNFTCardBox.module.css'
import images from '../../img'
import { NFTCardTwo } from '../../CollectionPage/collectionindex'
import FollowerTabCard from '../../components/FollowerTab/FollowerTabCard/FollowerTabCard'
import { Loader } from '@/components/componentsindex'

const AuthorNFTCardBox = ({collectiables, created, like, follower, following, nfts, myNFTs}) => {
    //const collectiablesArray = [
    //    images.nft_image_1,
    //    images.nft_image_2,
    //    images.nft_image_3,
    //    images.nft_image_1,
    //    images.nft_image_2,
    //    images.nft_image_3,
    //    images.nft_image_1,
    //    images.nft_image_2,
    //];
    //const createdArray = [
    //    images.nft_image_1,
    //    images.nft_image_2,
    //    images.nft_image_3,
    //    images.nft_image_1,
    //    images.nft_image_2,
    //];
    //const likeArray = [
    //    images.nft_image_1,
    //    images.nft_image_2,
     //   images.nft_image_3,
    //    images.nft_image_1
    //];

    const followerArray = [
        { background: images.creatorbackground1, user: images.user1, seller: "sfdsdfsdfsdf" },
        { background: images.creatorbackground5, user: images.user5, seller: "sfdsdfsdfsdf" },
        { background: images.creatorbackground3, user: images.user3, seller: "sfdsdfsdfsdf" },
        { background: images.creatorbackground4, user: images.user4, seller: "sfdsdfsdfsdf" },
        { background: images.creatorbackground2, user: images.user2, seller: "sfdsdfsdfsdf" },
    ];
    const followingArray = [
        { background: images.creatorbackground1, user: images.user1, seller: "sfdsdfsdfsdf" },
        { background: images.creatorbackground2, user: images.user2, seller: "sfdsdfsdfsdf" },
        { background: images.creatorbackground3, user: images.user3, seller: "sfdsdfsdfsdf" },
        { background: images.creatorbackground4, user: images.user4, seller: "sfdsdfsdfsdf" },
        { background: images.creatorbackground5, user: images.user5, seller: "sfdsdfsdfsdf" },
        { background: images.creatorbackground6, user: images.user6, seller: "sfdsdfsdfsdf" },
        { background: images.creatorbackground7, user: images.user7, seller: "sfdsdfsdfsdf" },
        { background: images.creatorbackground8, user: images.user8, seller: "sfdsdfsdfsdf" },
    ];

    return (
        <div className={Style.AuthorNFTCardBox}>
            {collectiables && (
                (!nfts || nfts.length === 0) ?
                    <Loader /> :
                    <NFTCardTwo NFTData={nfts} />
                )
            }
            {created && (
                <NFTCardTwo NFTData={myNFTs || []}/>
            )}
            {like && (
                <NFTCardTwo NFTData={nfts || []}/>
            )}
            {follower && (
                <div className={Style.AuthorNFTCardBox_box}>
                    {followerArray.map((element, index) => (
                        <FollowerTabCard key={index + 1} index={index} element={element}/>
                    ))}
                </div>
            )}
            {following && (
                <div className={Style.AuthorNFTCardBox_box}>
                    {followingArray.map((element, index) => (
                        <FollowerTabCard key={index + 1} index={index} element={element}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AuthorNFTCardBox