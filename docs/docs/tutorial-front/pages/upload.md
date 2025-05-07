---
sidebar_label: 'uploadNFT.js'
title: 'uploadNFT.js'
---

# Upload NFT Page (`pages/uploadNFT.js`) Documentation

## Overview

The `pages/uploadNFT.js` file provides the user interface for creating and minting new Non-Fungible Tokens (NFTs) within the Artify Marketplace. It acts as a container page that renders the main form and logic component (`<UploadNFT />`) for this process.

## Purpose

* To provide a dedicated route (`/uploadNFT`) for users to access the NFT creation functionality.
* To fetch the necessary functions (`uploadToIPFS`, `createNFT`) from the `NFTMarketplaceContext`.
* To pass these context functions down as props to the actual form component (`<UploadNFT />`) which handles the user input and upload logic.
* To display introductory text and titles related to the NFT creation process.

## File Structure

The component is located at `pages/uploadNFT.js`.

```javascript title="pages/uploadNFT.js"
import React, { useEffect, useState, useContext } from 'react'; // Import React hooks

import Style from '../styles/uploadNFT.module.css'; // Import page-specific styles
// Import the main UploadNFT component which contains the form logic
import { UploadNFT } from '../UploadNFT/uploadNFTindex'; // Assuming path is correct

// Import the context to get upload and create functions
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

// Define the page component
const uploadNFTPage = () => { // Renamed component function to follow convention (uppercase)
    // Get necessary functions from the context
    const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);

    return (
        <div className={Style.uploadNFT}>
            <div className={Style.uploadNFT_box}>
                {/* Heading Section */}
                <div className={Style.uploadNFT_box_heading}>
                    <h1>Create New NFT</h1>
                    <p>You can set preferred display name, create your profile URL and manage other personal settings.</p>
                </div>

                {/* Title/Instructions Section */}
                <div className={Style.uploadNFT_box_title}>
                    <h2>Image, Video, Audio, or 3D model.</h2>
                    <p>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF, Max size: 100 MB</p>
                </div>

                {/* Form Section - Renders the actual UploadNFT component */}
                <div className={Style.uploadNFT_box_form}>
                    {/* Pass the context functions as props */}
                    <UploadNFT
                        uploadToIPFS={uploadToIPFS}
                        createNFT={createNFT}
                    />
                </div>
            </div>
        </div>
    );
};

// Export the page component
export default uploadNFTPage; // Use the corrected component name
```