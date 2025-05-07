---
sidebar_label: 'NFTDescription.jsx'
title: 'NFTDescription.jsx'
---



# NFTDescription Component Documentation

## Overview

The `NFTDescription` component is a crucial part of the NFT detail view in the Artify Marketplace. It's responsible for displaying the textual metadata, pricing information, creator/owner details, action buttons (like Buy, List, Bid), and potentially related information like bid history or provenance for a specific NFT.

## Purpose

* To display the core details of an NFT, such as its name, token ID, description (implicitly, though not shown in the provided JSX snippet), price, creator, and collection.
* To provide context-aware action buttons:
    * "Buy NFT" if the viewer is not the owner/seller.
    * "List on Marketplace" if the viewer is the owner but not the seller.
    * A message indicating the user cannot buy their own NFT if they are the seller.
* To implement and display functionality for placing bids on the NFT.
* To fetch and display data in tabs, specifically "Bid History", "Provenance", and "Owner" information.
* To offer sharing options and potentially other actions (like reporting) via dropdown menus.

## File Structure

The component is typically located at `NFTDetailsPage/NFTDescription/NFTDescription.jsx` (or similar).

```javascript title="NFTDetailsPage/NFTDescription/NFTDescription.jsx"
import React, { useState, useEffect, useContext } from 'react';
import Image from "next/image";
import { MdVerified, MdCloudUpload, MdTimer, MdReportProblem, MdOutlineDeleteSweep } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaWallet, FaPercentage } from 'react-icons/fa';
import { TiSocialFacebook, TiSocialLinkedin, TiSocialYoutube, TiSocialInstagram, TiArrowSortedDown, TiArrowSortedUp, TiSocialTwitter } from 'react-icons/ti';
import { BiTransferAlt, BiDollar } from "react-icons/bi";
import Link from 'next/link';
import { useRouter } from 'next/router';

import Style from './NFTDescription.module.css';
import formStyle from '../../AccountPage/Form.module.css'; // Check path
import images from '../../img';
import { Button } from '../../components/componentsindex'; // Check path
import { NFTTabs } from '../NFTDetailsIndex'; // Check path

import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext'; // Check path

const NFTDescription = ({ nft }) => {
    // State for UI toggles
    const [social, setSocial] = useState(false);
    const [NFTMenu, setNFTMenu] = useState(false);
    // State for active tab
    const [history, setHistory] = useState(true); // Bid History active by default
    const [provanance, setProvanance] = useState(false);
    const [owner, setOwner] = useState(false);

    // State for tab data
    const [ownerDisplayData, setOwnerDisplayData] = useState([]);
    const [provenanceData, setProvenanceData] = useState([]);
    const [isLoadingProvenance, setIsLoadingProvenance] = useState(false);
    const [bidHistoryData, setBidHistoryData] = useState([]);
    const [isLoadingBids, setIsLoadingBids] = useState(false);

    // State for placing bids
    const [bidAmount, setBidAmount] = useState("");
    const [isPlacingBid, setIsPlacingBid] = useState(false);

    const router = useRouter();

    // Get functions and data from context
    const {
        // Assume these functions exist in the context:
        getBidHistoryForToken,
        placeBidOnNFT,
        fetchProvenanceHistory,
        // ---
        currentAccount,
        buyNFT, // Used for direct buy
        // explorerBaseUrl // Optional: for linking addresses/txs
    } = useContext(NFTMarketplaceContext);

    // --- Functions to toggle UI elements ---
    const openSocial = () => {
        setSocial(!social);
        setNFTMenu(false);
    };

    const openNFTMenu = () => {
        setNFTMenu(!NFTMenu);
        setSocial(false);
    };

    // --- Functions to switch tabs ---
    const openTabs = (e) => {
        const btnText = e.target.innerText;
        setHistory(btnText === "Bid History");
        setProvanance(btnText === "Provanance");
        setOwner(false); // Deactivate owner tab when others are clicked
    };

    const openOwnerTab = () => {
        setOwner(true);
        setHistory(false);
        setProvanance(false);
    };

    // --- Effect to fetch Bid History ---
    useEffect(() => {
        const fetchBids = async () => {
            // Check if history tab is active, NFT data is available, and function exists
            if (nft && nft.tokenId && history && getBidHistoryForToken) {
                setIsLoadingBids(true);
                try {
                    const bids = await getBidHistoryForToken(nft.tokenId);
                    setBidHistoryData(bids || []); // Ensure it's an array
                } catch (error) {
                    console.error("Failed to fetch bid history from component:", error);
                    setBidHistoryData([]);
                } finally {
                    setIsLoadingBids(false);
                }
            } else if (!history) {
                 // Clear data if tab is not active
                setBidHistoryData([]);
            }
        };
        fetchBids();
        // Dependencies ensure this runs when NFT changes or history tab is activated
    }, [nft, nft?.tokenId, history, getBidHistoryForToken]);

    // --- Effect to set Owner Data ---
    useEffect(() => {
        // Check if owner tab is active and NFT data is available
        if (owner && nft && nft.owner) {
            // Format data for the NFTTabs component
            const ownerInfo = [{
                address: nft.owner,
                // Placeholder name generation
                name: `Owner: ${nft.owner.substring(0, 6)}...${nft.owner.substring(nft.owner.length - 4)}`,
                image: images.user1, // Placeholder image
            }];
            setOwnerDisplayData(ownerInfo);
        } else {
            // Clear data if tab is not active or owner info is missing
            setOwnerDisplayData([]);
        }
    }, [owner, nft]); // Dependencies ensure this runs when NFT changes or owner tab is activated

    // --- Effect to fetch Provenance History ---
    useEffect(() => {
        const loadProvenance = async () => {
             // Check if provenance tab is active, NFT data is available, and function exists
            if (provanance && nft && nft.tokenId && fetchProvenanceHistory) {
                setIsLoadingProvenance(true);
                try {
                    const historyData = await fetchProvenanceHistory(nft.tokenId);
                    setProvenanceData(historyData || []); // Ensure it's an array
                } catch (error) {
                    console.error("Failed to fetch provenance history:", error);
                    setProvenanceData([]);
                } finally {
                    setIsLoadingProvenance(false);
                }
            } else if (!provanance) {
                 // Clear data if tab is not active
                setProvenanceData([]);
            }
        };
        loadProvenance();
        // Dependencies ensure this runs when NFT changes or provenance tab is activated
    }, [provanance, nft, nft?.tokenId, fetchProvenanceHistory]);


    // --- Function to handle placing a bid ---
    const handlePlaceBid = async () => {
        // Input validation
        if (!nft || !nft.tokenId) { alert("NFT details are not available."); return; }
        if (!bidAmount || parseFloat(bidAmount) <= 0) { alert("Please enter a valid bid amount greater than 0 ETH."); return; }
        if (!currentAccount) { alert("Please connect your wallet to place a bid."); return; }
        if (nft.seller && nft.seller.toLowerCase() === currentAccount.toLowerCase()) { alert("You cannot bid on an item you are selling."); return; }
        if (!placeBidOnNFT) { alert("Bidding function not available."); console.error("placeBidOnNFT is missing from context."); return; }

        setIsPlacingBid(true);
        try {
            // Call context function to place bid
            const success = await placeBidOnNFT(nft.tokenId, bidAmount);
            if (success) {
                setBidAmount(""); // Clear input on success
                alert("Bid placed successfully! It may take a moment to reflect in the history.");
                // Optionally re-fetch bid history immediately
                if (history && getBidHistoryForToken) {
                    setIsLoadingBids(true);
                    const bids = await getBidHistoryForToken(nft.tokenId);
                    setBidHistoryData(bids || []);
                    setIsLoadingBids(false);
                }
            }
            // If success is false, placeBidOnNFT likely handled the error/alert
        } catch (error) {
            console.error("Error placing bid from component:", error);
            // Alert might be redundant if placeBidOnNFT handles it
            // alert(`Bid Failed: ${error.message || "Unknown error"}`);
        } finally {
            setIsPlacingBid(false);
        }
    };

    // Determine if the current user can place a bid
    const canPlaceBid = nft && currentAccount &&
                        nft.seller?.toLowerCase() !== currentAccount.toLowerCase() &&
                        nft.owner?.toLowerCase() !== currentAccount.toLowerCase();

    // --- Render ---
    return (
        <div className={Style.NFTDescription}>
            <div className={Style.NFTDescription_box}>
                {/* Share and Action Menus */}
                <div className={Style.NFTDescription_box_share}>
                    <p>Virtual World</p> {/* Placeholder Category? */}
                    <div className={Style.NFTDescription_box_share_box}>
                        <MdCloudUpload className={Style.NFTDescription_box_share_box_icon} onClick={openSocial} />
                        {social && ( /* Share Dropdown */ )}
                        <BsThreeDots className={Style.NFTDescription_box_share_box_icon} onClick={openNFTMenu} />
                        {NFTMenu && ( /* More Actions Dropdown */ )}
                    </div>
                </div>

                {/* NFT Title and Creator/Collection Info */}
                <div className={Style.NFTDescription_box_profile}>
                    {/* Use optional chaining for safety */}
                    <h1>{nft?.name || "NFT Name"} #{nft?.tokenId || "N/A"}</h1>
                    <div className={Style.NFTDescription_box_profile_box}>
                        {/* Creator Info */}
                        <div className={Style.NFTDescription_box_profile_box_left}>
                            {/* ... Image, Creator Name/Link ... */}
                        </div>
                        {/* Collection Info */}
                        <div className={Style.NFTDescription_box_profile_box_right}>
                            {/* ... Image, Collection Name ... */}
                        </div>
                    </div>
                </div>

                {/* Bidding/Purchase Section */}
                <div className={Style.NFTDescription_box_profile_biding}>
                    {/* Auction Timer (Placeholder) */}
                    {/* ... Timer display ... */}

                    {/* Price Display */}
                    <div className={Style.NFTDescription_box_profile_biding_box_price}>
                        <div className={Style.NFTDescription_box_profile_biding_box_price_bid}>
                            <small>Price</small>
                            <p>{nft?.price || "0"} ETH</p>
                        </div>
                    </div>

                    {/* Action Buttons (Buy/List) */}
                    <div className={Style.NFTDescription_box_profile_biding_box_button}>
                        {currentAccount === nft?.seller?.toLowerCase() ? (
                            <p>You cannot buy your own NFT if you are the seller.</p>
                        ) : currentAccount === nft?.owner?.toLowerCase() ? (
                            <Button /* List Button */
                                icon={<FaWallet />}
                                btnName="List on Marketplace"
                                handleClick={() => router.push({ /* Resell route */ })}
                                classStyle={Style.button}
                            />
                        ) : nft?.price > 0 ? ( // Only show Buy if price is set
                            <Button /* Buy Button */
                                icon={<FaWallet />}
                                btnName="Buy NFT"
                                handleClick={() => buyNFT(nft)} // Call buyNFT from context
                                classStyle={Style.button}
                            />
                        ) : null /* Don't show Buy button if price is 0 or missing */}
                    </div>

                    {/* Place Bid Section */}
                    {canPlaceBid && (
                        <div className={Style.NFTDescription_box_profile_biding_box_place_bid}>
                            <h4>Place a Bid</h4>
                            <input /* Bid Amount Input */
                                type="number"
                                placeholder="Enter bid amount in ETH"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                disabled={isPlacingBid}
                                className={formStyle.Form_box_input_username}
                            />
                            <Button /* Place Bid Button */
                                btnName={isPlacingBid ? "Placing Bid..." : "Place Bid"}
                                handleClick={handlePlaceBid}
                                classStyle={Style.button}
                                disabled={isPlacingBid || !currentAccount || !bidAmount || parseFloat(bidAmount) <= 0}
                            />
                        </div>
                    )}

                    {/* Tabs Navigation */}
                    <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
                        <button onClick={openTabs}>Bid History</button>
                        <button onClick={openTabs}>Provanance</button>
                        <button onClick={openOwnerTab}>Owner</button>
                    </div>

                    {/* Tab Content Display */}
                    {history && ( /* Bid History Tab Content */ )}
                    {provanance && ( /* Provenance Tab Content */ )}
                    {owner && ( /* Owner Tab Content */ )}
                </div>
            </div>
        </div>
    );
};

export default NFTDescription;
```