---
sidebar_label: 'NFTCard.jsx'
title: 'NFTCard.jsx'
---

# NFTCard Component Documentation

## Overview

The `NFTCard` component is designed to display a grid or list of Non-Fungible Tokens (NFTs) in a card format. It takes an array of NFT data and renders a card for each item, showing key details and linking to the individual NFT's detail page.

## Purpose

* To render multiple NFTs based on an input data array.
* To display essential information for each NFT, such as its image, name, token ID, and price.
* To provide interactive elements like a "like" button (though currently with shared state).
* To link each card to its corresponding detail page (`/nft-details`).

## File Structure

The component is typically located at `components/NFTCard/NFTCard.jsx`.

```javascript title="components/NFTCard/NFTCard.jsx"
import React, { useState } from 'react';
import Image from 'next/image';
import { BsImages } from 'react-icons/bs'; // Corrected import name
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link'; // Import Link

import Style from './NFTCard.module.css';
// Removed unused import: import images from '../../img';

const NFTCard = ({ NFTData }) => {
    // WARNING: This 'like' state is shared across ALL cards rendered by this component instance.
    // Clicking 'like' on one card will affect the icon on all cards.
    // For individual like state, it should be managed per card, possibly in a child component.
    const [like, setLike] = useState(true); // Initial state might need adjustment

    const likeNft = (e) => {
        // Prevent navigation when clicking heart
        e.stopPropagation();
        e.preventDefault();
        setLike(!like);
        // TODO: Implement actual like logic (e.g., API call, update count)
        console.log("Like toggled!");
    };

    // Basic check: Ensure NFTData is an array before attempting to map
    if (!Array.isArray(NFTData)) {
        console.error("NFTCard Error: NFTData prop is not an array.", NFTData);
        return <div className={Style.NFTCard_error}>Error: Invalid data provided to NFTCard.</div>; // Render error or null
    }

    return (
        <div className={Style.NFTCard}>
            {NFTData.map((element, index) => {
                 // Basic check for required element properties inside the map
                 if (!element || !element.image || !element.name || !element.tokenId || !element.price) {
                    console.warn(`NFTCard Warning: Missing data for element at index ${index}`, element);
                    // Optionally render a placeholder or skip this item
                    return (
                        <div className={Style.NFTCard_box_invalid} key={`invalid-${index}`}>
                            Invalid NFT Data
                        </div>
                    );
                }

                return (
                    // Use a stable, unique key like tokenId
                    // Corrected Link: Pass only tokenId in query
                    <Link href={{ pathname: "/nft-details", query: { tokenId: element.tokenId.toString() } }} key={element.tokenId || index + 1}>
                        {/* Removed unnecessary anchor tag often handled by Link */}
                        <div className={Style.NFTCard_box}>
                            <div className={Style.NFTCard_box_img}>
                                <Image
                                    src={element.image}
                                    alt={element.name || "NFT image"}
                                    width={600} // Consider making these responsive or smaller
                                    height={600}
                                    className={Style.NFTCard_box_img_img}
                                    style={{ objectFit: 'cover' }} // Use style prop
                                    priority={index < 3} // Prioritize loading first few images
                                />
                            </div>

                            <div className={Style.NFTCard_box_update}>
                                <div className={Style.NFTCard_box_update_left}>
                                    {/* Pass event to likeNft */}
                                    <div className={Style.NFTCard_box_update_left_like} onClick={likeNft}>
                                        {like ? <AiOutlineHeart /> : <AiFillHeart className={Style.NFTCard_box_update_left_like_icon} />}
                                        {" 22"} {/* Placeholder like count */}
                                    </div>
                                </div>
                                <div className={Style.NFTCard_box_update_right}>
                                    <div className={Style.NFTCard_box_update_right_info}>
                                        <small>Remaining time:</small>
                                        {/* Placeholder time */}
                                        <p>3h: 15m : 20s</p>
                                    </div>
                                </div>
                            </div>

                            <div className={Style.NFTCard_box_update_details}>
                                <div className={Style.NFTCard_box_update_details_price}>
                                    <div className={Style.NFTCard_box_update_details_price_box}>
                                        <h4>{element.name} #{element.tokenId.toString()}</h4>
                                        <div className={Style.NFTCard_box_update_details_price_box_box}>
                                            <div className={Style.NFTCard_box_update_details_price_box_bid}>
                                                <small>Current BID</small>
                                                <p>{element.price} ETH</p>
                                            </div>
                                            <div className={Style.NFTCard_box_update_details_price_box_stock}>
                                                {/* Placeholder stock */}
                                                <small>61 in stock</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={Style.NFTCard_box_update_details_category}>
                                    <BsImages />
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default NFTCard;
```