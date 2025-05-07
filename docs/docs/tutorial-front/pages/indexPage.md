---
sidebar_label: 'index.js'
title: 'index.js'
---

# Homepage (`pages/index.js`) Documentation

## Overview

The `pages/index.js` file represents the main landing page or homepage of the Artify NFT Marketplace application. According to Next.js file-system routing conventions, this file corresponds to the root route (`/`).

## Purpose

This page serves as the primary entry point for users. Its main goals are:
1.  To present an engaging introduction to the marketplace (via `HeroSection`, `Service`, etc.).
2.  To showcase various categories of NFTs and content available on the platform (e.g., featured NFTs, audio collections, top creators, categories).
3.  To fetch and display a list of NFTs currently available on the marketplace.
4.  To check if the user's wallet is connected when the page loads.

## File Structure

The component is located at `pages/index.js`.

```javascript title="pages/index.js"
import React, { useState, useContext, useEffect } from 'react';

import Style from '../styles/index.module.css';
// Import all visual sections/components used on the homepage
import { HeroSection,
         Service,
         BigNFTSilder,
         Subscribe,
         Title,
         Category,
         Filter,
         NFTCard,
         Collection,
         FollowerTab,
         AudioLive,
         Slider,
         Brand,
         Video,
         Loader, // Import Loader component
} from '../components/componentsindex';
// Import helper function for creator data
import { getTopCreators } from '@/TopCreators/TopCreators'; // Assuming path is correct

// Import context for blockchain interaction
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const Home = () => {
  // Get functions from context
  const { checkIfWalletConnected, fetchNFTs } = useContext(NFTMarketplaceContext);

  // State for storing fetched NFTs
  const [nfts, setNfts] = useState([]);
  // State for storing an unfiltered copy (if Filter component modifies 'nfts')
  const [nftsCopy, setNftsCopy] = useState([]);

  // Calculate top creators based on fetched NFT data
  // Note: This runs on every render. Consider memoizing if 'nfts' is large or updates frequently.
  const creators = getTopCreators(nfts);

  // Check wallet connection status on initial component mount
  useEffect(() => {
    // checkIfWalletConnected might update the 'currentAccount' state in the context
    checkIfWalletConnected();
    // Fetch initial NFT data
    fetchNFTs().then((items) => {
        if (items) { // Check if items were successfully fetched
             // Reverse to show newest first, update main list
            setNfts(items.reverse());
            // Keep an original copy if needed for filtering/resetting
            setNftsCopy(items);
            console.log("Fetched NFTs on Home:", items);
        } else {
            console.log("Failed to fetch NFTs or no NFTs found.");
            // Handle case where fetchNFTs might return null/undefined on error
            setNfts([]);
            setNftsCopy([]);
        }
    }).catch(error => {
        console.error("Error fetching NFTs:", error);
        setNfts([]);
        setNftsCopy([]);
    });
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
      <Title heading='Audio Collection' paragraph='Discover the most outstanding NFTs in all topics of life'/>
      <AudioLive />

      {/* Display Top Creators section, show Loader if data is not ready */}
      <Title heading='Top Creators' paragraph='Meet the top creators on Artify.'/>
      {creators.length === 0 && nfts.length > 0 ? // Show loader only if NFTs loaded but creators calculation resulted in empty (unlikely unless getTopCreators filters heavily)
          <Loader /> :
          <FollowerTab creators={creators}/> // Pass processed creator data
      }
      {/* Note: Consider adding a loading state specifically for creators if getTopCreators is slow */}


      <Slider />
      <Collection />
      <Title heading='Featured NFTs' paragraph='Discover the most outstanding NFTs in all topics of life'/>
      <Filter /> {/* This component might interact with setNfts/setNftsCopy */}

      {/* Display NFT Cards section, show Loader if data is loading/empty */}
      {nfts.length === 0 ? // Simple check: show loader if nfts array is empty
          <Loader /> :
          <NFTCard NFTData={nfts}/> // Pass fetched NFT data
      }

      <Title heading='Browse by category' paragraph='Explore the NFTs in the most featured categories.'/>
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};
export default Home;
```