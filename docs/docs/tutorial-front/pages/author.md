---
sidebar_label: 'authorPage.js'
title: 'authorPage.js'
---

# Author Page (`pages/author.js`) Documentation

## Overview

The `pages/author.js` file represents the user's profile page within the Artify NFT Marketplace. It serves as a central hub for users to view their own NFT collections (created and owned), manage followers/following (if implemented), and potentially see NFTs they have liked. It combines profile information with different views of associated NFTs, controlled by a tab system.

**Note:** This page likely needs logic to handle viewing *other* users' profiles as well, typically by accepting an address from the URL query parameters. The current implementation primarily focuses on the *connected* user's data.

## Purpose

* Display the profile information of the currently connected user (or potentially another user based on URL).
* Fetch and display NFTs owned by the user.
* Fetch and display NFTs created/listed by the user (although the current code fetches *all* marketplace NFTs into the `nfts` state, which might not be the intended use for the "Collectiables" tab).
* Provide tabs (`AuthorTaps`) to switch between different views (e.g., Collectibles/Owned, Created, Liked, Followers, Following).
* Display lists of NFTs or user cards based on the selected tab.

## File Structure

The component is located at `pages/author.js`.

```javascript title="pages/author.js"
import React, { useState, useEffect, useContext } from 'react';

import Style from '../styles/author.module.css';
// Import necessary components
import { Banner } from '../CollectionPage/collectionindex'; // Assuming path
import { Brand, Title } from '../components/componentsindex';
import images from '../img';
import { AuthorProfileCard, AuthorTaps, AuthorNFTCardBox } from '../AuthorPage/authorIndex'; // Assuming path
import FollowerTabCard from '../components/FollowerTab/FollowerTabCard/FollowerTabCard'; // Assuming path

// Import context
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const author = () => {
    // Static data for "Popular Creators"
    const popularArray = [
        { background: images.creatorbackground1, user: images.user1, seller: "PLACEHOLDER_ADDRESS_1" },
        { background: images.creatorbackground2, user: images.user2, seller: "PLACEHOLDER_ADDRESS_2" },
        // ... (Add actual seller data if this section remains)
    ];

    // State for controlling which tab content is visible
    const [collectiables, setCollectiables] = useState(true);
    const [created, setCreated] = useState(false);
    const [like, setLike] = useState(false);
    const [follower, setFollower] = useState(false);
    const [following, setFollowing] = useState(false);

    // Get data and functions from context
    const { fetchMyNFTsOrListedNFTs, fetchNFTs, currentAccount } = useContext(NFTMarketplaceContext);

    // State to store fetched NFT data
    const [nfts, setNfts] = useState([]); // Holds NFTs fetched by fetchNFTs (currently ALL market items)
    const [myNFTs, setMyNFTs] = useState([]); // Holds NFTs owned by the current user

    // Effect to fetch ALL marketplace NFTs on mount (Consider if this is needed here)
    useEffect(() => {
        const loadNFTs = async () => {
            const items = await fetchNFTs(); // Fetches all items
            console.log("Fetched All NFTs (for author page):", items);
            if (items) {
                setNfts(items); // Stores all market items
            } else {
                 setNfts([]);
            }
        };
        loadNFTs();
    }, [fetchNFTs]); // Dependency array includes fetchNFTs

    // Effect to fetch NFTs owned by the current user on mount
    useEffect(() => {
        // Only fetch if currentAccount is available
        if (currentAccount) {
             fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items) => {
                console.log("Fetched My NFTs:", items);
                if (items) {
                    setMyNFTs(items);
                } else {
                    setMyNFTs([]);
                }
            }).catch(error => {
                 console.error("Error fetching My NFTs:", error);
                 setMyNFTs([]);
            });
        } else {
            // Clear myNFTs if account disconnects
            setMyNFTs([]);
        }
    }, [currentAccount, fetchMyNFTsOrListedNFTs]); // Re-run if account or function changes

    return (
        <div className={Style.author}>
            <Banner bannerImage={images.creatorbackground3} />
            {/* Pass the connected account to the profile card */}
            <AuthorProfileCard currentAccount={currentAccount} />
            {/* Pass state setters to the tabs component */}
            <AuthorTaps
                setCollectiables={setCollectiables}
                setCreated={setCreated}
                setLike={setLike}
                setFollower={setFollower}
                setFollowing={setFollowing}
            />

            {/* This component handles displaying NFTs based on active tab */}
            <AuthorNFTCardBox
                collectiables={collectiables} // Pass tab state
                created={created}
                like={like}
                follower={follower}
                following={following}
                nfts={nfts} // Pass all fetched NFTs (maybe rename prop?)
                myNFTs={myNFTs} // Pass user's owned NFTs
            />

            {/* This "Popular Creators" section seems out of place on a specific author's page */}
            {/* It also uses static data and FollowerTabCard incorrectly */}
            <Title heading="Popular Creators" paragraph="Click on NFT music or audio" />
            <div className={Style.author_box}>
                {popularArray.map((element, index) => (
                    // FollowerTabCard expects { seller, total, background, user }
                    // Passing { background, user, seller } will cause errors/missing data
                    <FollowerTabCard key={`pop-${index}`} index={index} element={element} />
                ))}
            </div>

            <Brand />
        </div>
    );
};

export default author;
```