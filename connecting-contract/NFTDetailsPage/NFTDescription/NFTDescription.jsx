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
import formStyle from '../../AccountPage/Form.module.css';
import images from '../../img';
import { Button } from '../../components/componentsindex';
import { NFTTabs } from '../NFTDetailsIndex';

import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';

const NFTDescription = ({ nft }) => {
    const [social, setSocial] = useState(false);
    const [NFTMenu, setNFTMenu] = useState(false);
    const [history, setHistory] = useState(true);
    const [provanance, setProvanance] = useState(false);
    const [owner, setOwner] = useState(false);
    
    const [ownerDisplayData, setOwnerDisplayData] = useState([]);
    const [provenanceData, setProvenanceData] = useState([]);
    const [isLoadingProvenance, setIsLoadingProvenance] = useState(false);

    const router = useRouter();

    const [bidHistoryData, setBidHistoryData] = useState([]);
    const [isLoadingBids, setIsLoadingBids] = useState(false);

    const [bidAmount, setBidAmount] = useState("");
    const [isPlacingBid, setIsPlacingBid] = useState(false);

    const {
        getBidHistoryForToken,
        placeBidOnNFT,
        fetchProvenanceHistory,
        currentAccount,
        buyNFT,
        explorerBaseUrl
    } = useContext(NFTMarketplaceContext);

    const openSocial = () => {
        setSocial(!social);
        setNFTMenu(false);
    };

    const openNFTMenu = () => {
        setNFTMenu(!NFTMenu);
        setSocial(false);
    };

    const openTabs = (e) => {
        const btnText = e.target.innerText;
        setHistory(btnText === "Bid History");
        setProvanance(btnText === "Provanance");
        setOwner(false);
    };

    const openOwnerTab = () => {
        setOwner(true);
        setHistory(false);
        setProvanance(false);
    };

    useEffect(() => {
        const fetchBids = async () => {
            if (nft && nft.tokenId && history && getBidHistoryForToken) {
                setIsLoadingBids(true);
                try {
                    const bids = await getBidHistoryForToken(nft.tokenId);
                    setBidHistoryData(bids);
                } catch (error) {
                    console.error("Failed to fetch bid history from component:", error);
                    setBidHistoryData([]);
                } finally {
                    setIsLoadingBids(false);
                }
            } else if (!history) {
                setBidHistoryData([]);
            }
        };
        fetchBids();
    }, [nft, nft?.tokenId, history, getBidHistoryForToken]);

    useEffect(() => {
        if (owner && nft && nft.owner) {
            const ownerInfo = [{
                address: nft.owner,
                name: `Owner: ${nft.owner.substring(0, 6)}...${nft.owner.substring(nft.owner.length - 4)}`,
                image: images.user1, 
            }];
            setOwnerDisplayData(ownerInfo);
        } else {
            setOwnerDisplayData([]);
        }
    }, [owner, nft]);

    useEffect(() => {
        const loadProvenance = async () => {
            if (provanance && nft && nft.tokenId && fetchProvenanceHistory) {
                setIsLoadingProvenance(true);
                try {
                    const historyData = await fetchProvenanceHistory(nft.tokenId);
                    setProvenanceData(historyData);
                } catch (error) {
                    console.error("Failed to fetch provenance history:", error);
                    setProvenanceData([]);
                } finally {
                    setIsLoadingProvenance(false);
                }
            } else if (!provanance) {
                setProvenanceData([]);
            }
        };
        loadProvenance();
    }, [provanance, nft, nft?.tokenId, fetchProvenanceHistory]);


    const handlePlaceBid = async () => {
        if (!nft || !nft.tokenId) {
            alert("NFT details are not available.");
            return;
        }
        if (!bidAmount || parseFloat(bidAmount) <= 0) {
            alert("Please enter a valid bid amount greater than 0 ETH.");
            return;
        }
        if (!currentAccount) {
            alert("Please connect your wallet to place a bid.");
            return;
        }
        if (nft.seller && nft.seller.toLowerCase() === currentAccount.toLowerCase()) {
            alert("You cannot bid on an item you are selling.");
            return;
        }

        setIsPlacingBid(true);
        try {
            const success = await placeBidOnNFT(nft.tokenId, bidAmount);
            if (success) {
                setBidAmount("");
                alert("Bid placed successfully! It may take a moment to reflect in the history.");
                if (history && getBidHistoryForToken) {
                    setIsLoadingBids(true);
                    const bids = await getBidHistoryForToken(nft.tokenId);
                    setBidHistoryData(bids);
                    setIsLoadingBids(false);
                }
            }
        } catch (error) {
            console.error("Error placing bid from component:", error);
        } finally {
            setIsPlacingBid(false);
        }
    };
    
    const canPlaceBid = nft && currentAccount && 
                        nft.seller?.toLowerCase() !== currentAccount.toLowerCase() &&
                        nft.owner?.toLowerCase() !== currentAccount.toLowerCase();

    return (
        <div className={Style.NFTDescription}>
            <div className={Style.NFTDescription_box}>
                <div className={Style.NFTDescription_box_share}>
                    <p>Virtual World</p>
                    <div className={Style.NFTDescription_box_share_box}>
                        <MdCloudUpload
                            className={Style.NFTDescription_box_share_box_icon}
                            onClick={openSocial}
                        />
                        {social && (
                            <div className={Style.NFTDescription_box_share_box_social}>
                                <a href="#"><TiSocialFacebook /> Facebook</a>
                                <a href="#"><TiSocialInstagram /> Instagram</a>
                                <a href="#"><TiSocialLinkedin /> Linkedin</a>
                                <a href="#"><TiSocialTwitter /> X</a>
                                <a href="#"><TiSocialYoutube /> YouTube</a>
                            </div>
                        )}
                        <BsThreeDots
                            className={Style.NFTDescription_box_share_box_icon}
                            onClick={openNFTMenu}
                        />
                        {NFTMenu && (
                            <div className={Style.NFTDescription_box_share_box_social}>
                                <a href="#"><BiDollar /> Change price</a>
                                <a href="#"><BiTransferAlt /> Transfer</a>
                                <a href="#"><MdReportProblem /> Report abouse</a>
                                <a href="#"><MdOutlineDeleteSweep /> Delete item</a>
                            </div>
                        )}
                    </div>
                </div>

                <div className={Style.NFTDescription_box_profile}>
                    <h1>{nft?.name || "NFT Name"} #{nft?.tokenId || "N/A"}</h1>
                    <div className={Style.NFTDescription_box_profile_box}>
                        <div className={Style.NFTDescription_box_profile_box_left}>
                            <Image
                                src={nft?.creatorImage || images.user1}
                                alt="creator"
                                width={40}
                                height={40}
                                className={Style.NFTDescription_box_profile_box_left_img}
                            />
                            <div className={Style.NFTDescription_box_profile_box_left_info}>
                                <small>Creator</small> <br />
                                {nft?.seller ? (
                                    <Link href={{ pathname: "/author", query: { authorAddress: nft.seller } }}>
                                        <span>
                                            {nft.sellerName || `${nft.seller.substring(0,6)}...${nft.seller.substring(nft.seller.length - 4)}`} <MdVerified />
                                        </span>
                                    </Link>
                                ) : (
                                    <span>Seller Address <MdVerified /></span>
                                )}
                            </div>
                        </div>
                        <div className={Style.NFTDescription_box_profile_box_right}>
                            <Image
                                src={nft?.collectionImage || images.creatorbackground1}
                                alt="collection"
                                width={40}
                                height={40}
                                className={Style.NFTDescription_box_profile_box_left_img}
                            />
                            <div className={Style.NFTDescription_box_profile_box_right_info}>
                                <small>Collection</small> <br />
                                <span>
                                    {nft?.collectionName || "Photography"} <MdVerified />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={Style.NFTDescription_box_profile_biding}>
                     <p>
                        <MdTimer/> <span> Auction ending in: </span>
                     </p>
                     <div className={Style.NFTDescription_box_profile_biding_box_timer}>
                        <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                            <p>2</p><span>Days</span>
                        </div>
                        <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                            <p>22</p><span>Hours</span>
                        </div>
                        <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                            <p>14</p><span>mins</span>
                        </div>
                        <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                            <p>22</p><span>secs</span>
                        </div>
                     </div>
                     <div className={Style.NFTDescription_box_profile_biding_box_price}>
                        <div className={Style.NFTDescription_box_profile_biding_box_price_bid}>
                            <small>Price</small>
                            <p>{nft?.price || "0"} ETH</p>
                        </div>
                     </div>

                    <div className={Style.NFTDescription_box_profile_biding_box_button}>
                        {currentAccount === nft?.seller?.toLowerCase() ? (
                            <p>You cannot buy your own NFT if you are the seller.</p>
                        ) : currentAccount === nft?.owner?.toLowerCase() ? (
                            <Button
                                icon={<FaWallet />}
                                btnName="List on Marketplace"
                                handleClick={() =>
                                    router.push({
                                        pathname: "/reSellToken",
                                        query: { tokenId: nft.tokenId, tokenURI: nft.tokenURI, currentPrice: nft.price },
                                    })
                                }
                                classStyle={Style.button}
                            />
                        ) : nft?.price > 0 ? (
                            <Button
                                icon={<FaWallet />}
                                btnName="Buy NFT"
                                handleClick={() => buyNFT(nft)}
                                classStyle={Style.button}
                            />
                        ) : null}
                    </div>

                    {canPlaceBid && (
                        <div className={Style.NFTDescription_box_profile_biding_box_place_bid} style={{marginTop: "2rem", borderTop: "1px solid var(--icons-color)", paddingTop: "1rem"}}>
                            <h4>Place a Bid</h4>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Enter bid amount in ETH"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                disabled={isPlacingBid}
                                className={formStyle.Form_box_input_username}
                            />
                            <Button
                                btnName={isPlacingBid ? "Placing Bid..." : "Place Bid"}
                                handleClick={handlePlaceBid}
                                classStyle={Style.button}
                                disabled={isPlacingBid || !currentAccount || !bidAmount || parseFloat(bidAmount) <= 0}
                            />
                        </div>
                    )}

                    <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
                        <button onClick={(e) => openTabs(e)}>Bid History</button>
                        <button onClick={(e) => openTabs(e)}>Provanance</button>
                        <button onClick={(e) => openOwnerTab()}>Owner</button>
                    </div>

                    {history && (
                        <div className={Style.NFTDescription_box_profile_biding_box_card}>
                            {isLoadingBids ? (
                                <p>Loading bid history...</p>
                            ) : bidHistoryData.length > 0 ? (
                                <NFTTabs dataTab={bidHistoryData} type="bid" explorerBaseUrl={explorerBaseUrl} />
                            ) : (
                                <p>No bids yet for this item.</p>
                            )}
                        </div>
                    )}
                    {provanance && (
                        <div className={Style.NFTDescription_box_profile_biding_box_card}>
                            {isLoadingProvenance ? (
                                <p>Loading provenance history...</p>
                            ) : provenanceData.length > 0 ? (
                                <NFTTabs dataTab={provenanceData} type="provenance" explorerBaseUrl={explorerBaseUrl} />
                            ) : (
                                <p>No provenance history found for this item.</p>
                            )}
                        </div>
                    )}
                    {owner && (
                        <div className={Style.NFTDescription_box_profile_biding_box_card}>
                            {ownerDisplayData.length > 0 ? (
                                <NFTTabs dataTab={ownerDisplayData} icon={<MdVerified />} type="owner" explorerBaseUrl={explorerBaseUrl} />
                            ) : (
                                <p>Owner information is currently unavailable.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NFTDescription;