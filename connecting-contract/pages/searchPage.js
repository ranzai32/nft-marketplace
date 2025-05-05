import React, {useEffect, useState, useContext } from 'react'
import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from '@/components/componentsindex';
import { SearchBar } from '../SearchPage/searchBarindex';
import {Filter} from "../components/componentsindex";
import { NFTCardTwo, Banner } from '../CollectionPage/collectionindex';
import images from '../img';

import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const searchPage = () => {
    const { fetchNFTs } = useContext(NFTMarketplaceContext);
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);
    
    useEffect(() => {
        fetchNFTs().then((item) => {
            setNfts(item.reverse());
            setNftsCopy(item);
        })
    })  

    // const collectionArray = [
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    // ];

    const onHandleSearch = (searchValue) => {
        const filteredNFTs = nftsCopy.filter((nft) => {
            return nft.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        if (filteredNFTs.length === 0) {
            setNfts(nftsCopy);
        } else {
            setNfts(filteredNFTs);
        }
    };

    const onClearSearch = () => {
      if(nfts.length && nftsCopy.length)
        setNfts(nftsCopy);
    };

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2}/>
      <SearchBar onHandleSearch={onHandleSearch}
                 onClearSearch={onClearSearch}/>
      <Filter />
      <NFTCardTwo NFTData={nfts}/>
      <Slider />
      <Brand />

    </div>
  )
}

export default searchPage