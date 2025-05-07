---
sidebar_label: 'nftDetails.js'
title: 'nftDetails.js'
---

# NFT Details Page (`pages/nft-details.js`) Documentation

## Overview

The `pages/nft-details.js` file is intended to display the detailed information for a single Non-Fungible Token (NFT) selected by the user from a list or gallery (e.g., from the homepage or search page). It uses dynamic routing based on information passed from the previous page.

## Purpose

* To provide a dedicated route (e.g., `/nft-details`) for viewing the specifics of one NFT.
* To receive information about the selected NFT, typically via URL query parameters.
* To display the NFT's image, name, description, price, owner, seller, and other relevant details.
* To offer actions related to the NFT, such as "Buy NFT", "Make Offer", or "List for Sale" (handled within the child component).
* To potentially show related NFTs or collections (`Category`, `Brand` components).

## File Structure

The component is located at `pages/nft-details.js`.

```javascript title="pages/nft-details.js"
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

// Import necessary components
import { Button, Category, Brand } from '../components/componentsindex'; // Assuming paths
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage"; // The component that displays the details

// Import context (if needed, e.g., for currentAccount or buyNFT function)
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const NFTDetails = () => {
    // Get context values (only currentAccount is used here, others are likely used in NFTDetailsPage)
    const { currentAccount } = useContext(NFTMarketplaceContext);

    // State to hold the NFT data received from router query
    const [nft, setNft] = useState({
        image: "",
        tokenId: "",
        name: "",
        owner: "",
        price: "",
        seller: "",
        tokenURI: "", // Added tokenURI as it's often needed
        // Add other potential fields if passed via query
    });

    const router = useRouter();

    // Effect to get NFT data from router query when router is ready
    useEffect(() => {
        // router.isReady ensures query parameters are available
        if (!router.isReady) return;

        // Directly set the nft state from the query object
        console.log("Router Query Received:", router.query);
        setNft(router.query);

    }, [router.isReady, router.query]); // Re-run if query params change

    return (
        <div>
            {/* Pass the fetched/received NFT data to the display component */}
            <NFTDetailsPage nft={nft} />
            {/* Display related components */}
            <Category />
            <Brand />
        </div>
    );
};

export default NFTDetails;
```