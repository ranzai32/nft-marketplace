---
sidebar_label: 'resellToken.js'
title: 'resellToken.js'
---

# Resell Token Page (`pages/reSellToken.js`) Documentation

## Overview

The `pages/reSellToken.js` file provides the user interface for listing an owned NFT back onto the Artify Marketplace. Users navigate here typically after clicking a "Resell" or "List for Sale" button on an NFT they own, passing the necessary token information via URL query parameters.

## Purpose

* To provide a dedicated route (e.g., `/reSellToken`) for the reselling functionality.
* To retrieve the `tokenId` and `tokenURI` of the NFT to be resold from the URL query parameters.
* To fetch and display the image of the specific NFT being resold using its `tokenURI`.
* To provide an input field for the user to set the new selling price.
* To retrieve the `createSale` function from the `NFTMarketplaceContext`.
* To handle the submission of the resell transaction by calling the `createSale` function with the appropriate parameters (including marking it as a resell).

## File Structure

The component is located at `pages/reSellToken.js`.

```javascript title="pages/reSellToken.js"
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

// Import styles and components
import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/Form.module.css"; // Corrected path assuming AccountPage exists
import { Button } from "../components/componentsindex";

// Import context
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const reSellTokenPage = () => { // Renamed component to follow convention
  const { createSale } = useContext(NFTMarketplaceContext); // Get createSale function
  const [image, setImage] = useState(""); // State for NFT image URL
  const [price, setPrice] = useState(""); // State for the new price input
  const [loading, setLoading] = useState(false); // State for loading indicator (optional)
  const router = useRouter();
  const { tokenId, tokenURI } = router.query; // Get ID and URI from URL

  // Fetch NFT metadata (specifically image) using the tokenURI
  const fetchNFT = async () => {
    if (!tokenURI || typeof tokenURI !== 'string') return; // Basic validation
    // Replace ipfs:// prefix if present
    const gatewayURL = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || "[https://gateway.pinata.cloud](https://gateway.pinata.cloud)";
    const correctedTokenURI = tokenURI.replace("ipfs://", `${gatewayURL}/ipfs/`);

    try {
      const { data } = await axios.get(correctedTokenURI);
      console.log("Fetched NFT Metadata for Resell:", data);
      if (data.image) {
          const imageUrl = data.image.replace("ipfs://", `${gatewayURL}/ipfs/`);
          setImage(imageUrl); // Set image state
      } else {
          console.warn("Metadata did not contain an image URL");
      }
    } catch (error) {
      console.error("Failed to fetch NFT metadata for resell:", error);
      // Optionally set an error state or show a message
    }
  };

  // Fetch NFT data when tokenURI changes
  useEffect(() => {
    if (tokenURI) {
      fetchNFT();
    }
  }, [tokenURI]); // Dependency array ensures it runs when tokenURI is available

  // Function to handle the resell process
  const resell = async () => {
    // Validate inputs
    if (!price || !tokenId || !tokenURI) {
        alert("Please enter a valid price.");
        console.error("Resell Error: Missing price, tokenId, or tokenURI.");
        return;
    }
     if (!createSale) {
        alert("Resell function not available. Please try again later.");
        console.error("Resell Error: createSale function is missing from context.");
        return;
     }

    setLoading(true); // Indicate loading
    try {
      // Call createSale from context, marking it as a resell (true) and passing tokenId
      await createSale(tokenURI, price, true, tokenId);
      // Navigation is handled within createSale on success
      // router.push("/author"); // Keep navigation logic in createSale
    } catch (error) {
      console.log("Error during resell process:", error);
      // Error alerts are handled within createSale
    } finally {
        setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>Resell Your NFT</h1>
        <p>Set a new price for your NFT to list it back on the marketplace.</p>

        {/* Price Input */}
        <div className={formStyle.Form_box_input}>
          <label htmlFor="price">New Price (ETH)</label>
          <input
            type="number" // Use number type for better input control
            min="0.0001"   // Example minimum price
            step="0.0001"  // Example step
            placeholder="Enter resale price in ETH"
            className={formStyle.Form_box_input_username}
            value={price} // Controlled component
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading} // Disable while loading
          />
        </div>

        {/* Image Preview */}
        <div className={Style.reSellToken_box_image}>
          <p>Preview:</p>
          {image ? (
            <Image src={image} alt="NFT to resell" width={400} height={400} style={{objectFit: 'contain'}} />
          ) : (
            <p>Loading image preview...</p> // Placeholder while image loads
          )}
        </div>

        {/* Button */}
        <div className={Style.reSellToken_box_btn}>
          <Button
             btnName={loading ? "Listing..." : "List NFT for Sale"}
             handleClick={!loading ? resell : () => {}} // Prevent click while loading
             classStyle={Style.button}
             disabled={loading}
           />
        </div>
      </div>
    </div>
  );
};

export default reSellTokenPage; // Use conventional component name casing
```