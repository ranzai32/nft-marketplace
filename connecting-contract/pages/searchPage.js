import React, {useEffect, useState, useContext } from 'react'
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from '@/components/componentsindex';
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
    }, []);

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
      console.log("Search triggered with:", searchValue);
      const filteredNFTs = nftsCopy.filter((nft) => {
          console.log("Checking NFT:", nft.name);
          return nft.name?.toLowerCase().includes(searchValue.toLowerCase());
      });
  
      console.log("Filtered NFTs:", filteredNFTs);
  
      if (filteredNFTs.length === 0) {
          setNfts(nftsCopy);
      } else {
          setNfts(filteredNFTs);
      }
  };
  
  const onClearSearch = () => {
      console.log("Clearing search...");
      if (nftsCopy.length) setNfts(nftsCopy);
  };
  

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2}/>
      <SearchBar onHandleSearch={onHandleSearch}
                 onClearSearch={onClearSearch}/>
      <Filter />
      {nfts.length == 0 ? 
        <Loader /> :
        <NFTCardTwo NFTData={nfts}/>
      }
      <Slider />
      <Brand />

    </div>
  )
}

export default searchPage;