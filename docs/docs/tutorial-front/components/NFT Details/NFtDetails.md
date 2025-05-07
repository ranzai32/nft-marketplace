---
sidebar_label: 'NFTDetailsPage.jsx'
title: 'NFTDetailsPage.jsx'
---


# NFTDetailsPage Component Documentation

## Overview

The `NFTDetailsPage` component is the core presentation component responsible for displaying the detailed information of a single NFT. It receives the NFT data as a prop and arranges the display using specialized sub-components for the image and the textual/interactive description.

## Purpose

* To render the main layout for the NFT detail view.
* To display the NFT's image using the `NFTDetailsImg` component.
* To display the NFT's metadata (name, description, owner, seller, price), action buttons (Buy, Make Offer, List), and potentially other details like properties or history using the `NFTDescription` component.
* To act as a container that organizes the different parts of the NFT detail presentation.

## File Structure

The component is typically located at `NFTDetailsPage/NFTDetailsPage.jsx` (or similar).

```javascript title="NFTDetailsPage/NFTDetailsPage.jsx"
import React from 'react'; // Import React

// Import sub-components for displaying parts of the details
import { NFTDescription, NFTDetailsImg, NFTTabs } from './NFTDetailsIndex'; // Assuming NFTTabs might be used here too
import Style from './NFTDetailsPage.module.css'; // Import component-specific styles

// Component receives the NFT data object as a prop
const NFTDetailsPage = ({ nft }) => {
    // Basic check for nft data
    if (!nft || !nft.tokenId) {
         // Optionally render a loading state or error message if nft data is not ready
         // This depends on how the parent page handles loading
         return <div className={Style.NFTDetailsPage_loading}>Loading NFT details...</div>;
    }

    return (
        <div className={Style.NFTDetailsPage}>
            <div className={Style.NFTDetailsPage_box}>
                {/* Render the image component, passing the nft data */}
                <NFTDetailsImg nft={nft} />
                {/* Render the description/action component, passing the nft data */}
                <NFTDescription nft={nft} />
                {/* Optionally render NFTTabs here if it's part of this layout */}
                {/* <NFTTabs /> */}
            </div>
            {/* You might add related items or other sections below */}
        </div>
    );
};

export default NFTDetailsPage;
```