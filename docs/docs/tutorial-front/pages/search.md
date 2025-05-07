---
sidebar_label: 'searchPage.js'
title: 'searchPage.js'
---


# Search Page (`pages/searchPage.js`) Documentation

## Overview

The `pages/searchPage.js` file provides the main interface for users to search, filter, and browse through the NFTs available on the Artify Marketplace. It fetches all available NFTs and allows users to narrow down the results using a search bar and potentially other filtering components.

## Purpose

* To display a comprehensive list or grid of NFTs available on the marketplace.
* To provide a search functionality (`SearchBar`) allowing users to find NFTs by name.
* To potentially integrate with filtering components (`Filter`) for more advanced refinement (e.g., by price, category - although filter logic implementation is not shown in this specific file).
* To handle the loading state while NFTs are being fetched.

## File Structure

The component is located at `pages/searchPage.js`.

```javascript title="pages/searchPage.js"
import React, { useState, useEffect, useContext } from 'react';

import Style from "../styles/searchPage.module.css";
// Import required components
import { Slider, Brand, Loader } from '@/components/componentsindex'; // Assuming path
import { SearchBar } from '../SearchPage/searchBarindex'; // Assuming path
import { Filter } from "../components/componentsindex"; // Assuming path
import { NFTCardTwo, Banner } from '../CollectionPage/collectionindex'; // Assuming path
import images from '../img'; // Assuming path

// Import context
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const searchPage = () => {
    // Get functions from context
    const { fetchNFTs } = useContext(NFTMarketplaceContext);
    // State for NFTs list (displayed/filtered)
    const [nfts, setNfts] = useState([]);
    // State for the original, unfiltered list
    const [nftsCopy, setNftsCopy] = useState([]);

    // Fetch all NFTs on component mount
    useEffect(() => {
        fetchNFTs().then((items) => {
            if (items) {
                setNfts(items.reverse()); // Show newest first
                setNftsCopy(items); // Keep original order copy
            } else {
                 setNfts([]);
                 setNftsCopy([]);
            }
        }).catch(error => {
             console.error("Error fetching NFTs for search page:", error);
             setNfts([]);
             setNftsCopy([]);
        });
    }, [fetchNFTs]); // Dependency array

    // Function to handle search input changes (passed to SearchBar)
    const onHandleSearch = (searchValue) => {
        console.log("Search triggered with:", searchValue);
        // Filter the original list based on name
        const filteredNFTs = nftsCopy.filter((nft) => {
            // Use optional chaining and nullish coalescing for safety
            return nft?.name?.toLowerCase().includes(searchValue.toLowerCase());
        });
        console.log("Filtered NFTs:", filteredNFTs);

        // If search is empty or no results, show original list, otherwise show filtered
        if (searchValue === "" || filteredNFTs.length === 0) {
             // Show original (reversed) list if search is cleared or yields no results
             // Note: nftsCopy holds the original order, nfts holds the reversed one initially.
             // Maybe reset to nftsCopy.reverse() or manage initial reversal differently.
             // For now, resetting to nftsCopy (original order):
             setNfts(nftsCopy);
        } else {
            setNfts(filteredNFTs);
        }
    };

    // Function to clear search results (passed to SearchBar)
    const onClearSearch = () => {
        console.log("Clearing search...");
        // Reset to the original fetched list (consider reversed order if needed)
        if (nftsCopy.length) {
             setNfts(nftsCopy); // Resetting to original order for now
        }
    };


    return (
        <div className={Style.searchPage}>
            <Banner bannerImage={images.creatorbackground2} />
            {/* Pass search handlers to the SearchBar component */}
            <SearchBar
                onHandleSearch={onHandleSearch}
                onClearSearch={onClearSearch}
            />
            {/* Filter component (functionality might be external or passed via props/context) */}
            <Filter />
            {/* Conditional rendering: Show Loader or NFT cards */}
            {nfts.length === 0 ?
                <Loader /> :
                <NFTCardTwo NFTData={nfts} /> // Display the NFTs
            }
            <Slider />
            <Brand />
        </div>
    );
};

export default searchPage;
```