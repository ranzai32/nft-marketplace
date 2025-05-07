import React, { useState, useEffect, useContext } from 'react';
import Web3modal from 'web3modal';
import { ethers, Contract, parseUnits, formatUnits, JsonRpcProvider, BrowserProvider, ZeroAddress } from 'ethers';
import Router from 'next/router';
import axios from 'axios';

import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants';

const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || "";
const pinataGatewayUrl = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || "https://gateway.pinata.cloud";
const explorerBaseUrl = process.env.NEXT_PUBLIC_EXPLORER_BASE_URL || "https://etherscan.io"; // Пример, замените на эксплорер вашей сети

const fetchContract = (signerOrProvider) => {
    if (!NFTMarketplaceABI || !NFTMarketplaceAddress) {
        console.error("ABI or Address is missing");
        return null;
    }
    try {
        return new Contract(
            NFTMarketplaceAddress,
            NFTMarketplaceABI,
            signerOrProvider
        );
    } catch (error) {
        console.error("Error creating contract instance:", error);
        return null;
    }
};

const connectingWithSmartContract = async () => {
    try {
        if (typeof window.ethereum === 'undefined') {
            console.error("MetaMask or similar provider not found.");
            alert("Please install MetaMask or another Ethereum wallet provider.");
            return null;
        }
        const web3modal = new Web3modal();
        const connection = await web3modal.connect();
        const provider = new BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        if (!contract) {
            console.error("Failed to fetch contract instance with signer.");
            return null;
        }
        return contract;
    } catch (error) {
        console.error("Something went wrong while connecting with contract (signer):", error);
        return null;
    }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Discover, collect, and sell NFTs";
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return;
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account found");
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                if (accounts.length > 0) setCurrentAccount(accounts[0]);
                else setCurrentAccount("");
            };
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            return () => {
                if (window.ethereum.removeListener) {
                    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                }
            };
        }
    }, []);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("Please install MetaMask!");
                return;
            }
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error("Error while connecting wallet:", error);
        }
    };

    const disconnectWallet = () => {
        setCurrentAccount('');
    };
    
    const uploadToIPFS = async (file) => {
        if (!file) return console.error("No file provided for IPFS upload");
        if (!pinataApiKey || !pinataSecretApiKey) {
            console.error("Pinata API Key or Secret is missing.");
            alert("IPFS configuration error (API Key/Secret).");
            return null;
        }
        try {
            const formData = new FormData();
            formData.append("file", file);
            const metadata = JSON.stringify({ name: `NFT File: ${file.name}` });
            formData.append('pinataMetadata', metadata);
            const options = JSON.stringify({ cidVersion: 1 });
            formData.append('pinataOptions', options);
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: Infinity,
                headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey,
                }
            });
            const ipfsHash = res.data.IpfsHash;
            return `${pinataGatewayUrl}/ipfs/${ipfsHash}`;
        } catch (error) {
            console.error("Error uploading file to Pinata IPFS:", error);
            alert(`IPFS Upload Error: ${error.response?.data?.error || error.message}`);
            return null;
        }
    };

    const uploadMetadataToIPFS = async (jsonData) => {
        if (!jsonData) return console.error("No JSON data provided for IPFS upload");
        if (!pinataApiKey || !pinataSecretApiKey) {
            console.error("Pinata API Key or Secret is missing.");
            alert("IPFS configuration error (API Key/Secret).");
            return null;
        }
        try {
            const pinataData = {
                pinataMetadata: { name: `NFT Metadata: ${jsonData.name || 'Unnamed'}` },
                pinataContent: jsonData
            };
            const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", pinataData, {
                headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                }
            });
            const ipfsHash = res.data.IpfsHash;
            return `${pinataGatewayUrl}/ipfs/${ipfsHash}`;
        } catch (error) {
            console.error("Error uploading JSON to Pinata IPFS:", error);
            alert(`IPFS Metadata Upload Error: ${error.response?.data?.error || error.message}`);
            return null;
        }
    };

    const createNFT = async (formInput, fileUrl, routerInstance) => {
        const { name, description, price } = formInput;
        let missingFields = [];
        if (!name) missingFields.push("Name");
        if (!description) missingFields.push("Description");
        if (!price) missingFields.push("Price");
        if (!fileUrl) missingFields.push("Image");

        if (missingFields.length > 0) {
            alert(`Please fill in: ${missingFields.join(", ")}`);
            return;
        }
        const metadata = { name, description, image: fileUrl };
        let metadataUrl = '';
        try {
            metadataUrl = await uploadMetadataToIPFS(metadata);
            if (!metadataUrl) throw new Error("Failed to upload metadata to IPFS");
        } catch (error) {
            console.error("Error uploading metadata in createNFT:", error);
            return;
        }
        try {
            await createSale(metadataUrl, price, false, undefined, routerInstance);
        } catch(error) {
            console.error("Error calling createSale from createNFT:", error);
        }
    };

    const createSale = async (tokenURI, formInputPrice, isReselling, id, routerInstance = Router) => {
        if (!tokenURI || !formInputPrice) {
            alert("Missing token URI or price for creating sale.");
            return;
        }
        try {
            const contract = await connectingWithSmartContract();
            if (!contract) throw new Error("Failed to connect to smart contract");
            const price = parseUnits(formInputPrice.toString(), "ether");
            const listingPrice = await contract.getListingPrice();
            console.log("--- Debugging createSale (resellToken branch) ---");
            console.log("Is 'isReselling' true?", isReselling);
            console.log("Contract object instance:", contract); // Посмотреть весь объект контракта
            console.log("Contract address being used by ethers:", contract.target); // или contract.address для ethers v5
            console.log("Does contract object have resellToken?", contract.resellToken); // Посмотреть саму функцию
            console.log("Type of contract.resellToken:", typeof contract.resellToken); // Должно быть "function"
            console.log("Parameters for resellToken - id:", id, "(type:", typeof id, ")");
            console.log("Parameters for resellToken - price (BigNumber):", price.toString(), "(type: BigNumber)");
            console.log("Parameters for resellToken - listingPrice (BigNumber for value):", listingPrice.toString(), "(type: BigNumber)");
            const transaction = !isReselling
                ? await contract.createToken(tokenURI, price, { value: listingPrice.toString() })
                : await contract.resellToken(id, price, { value: listingPrice.toString() });
            alert("Transaction sent! Waiting for confirmation...");
            await transaction.wait();
            alert("NFT Listed Successfully!");
            routerInstance.push('/searchPage');
        } catch (error) {
            console.error("Error during createSale transaction:", error);
            alert(`Transaction Failed: ${error?.reason || error?.message || "Unknown error"}`);
        }
    };

    const fetchNFTs = async () => {
        try {
            const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545";
            const provider = new JsonRpcProvider(rpcUrl);
            const contract = fetchContract(provider);
            if (!contract) throw new Error("Failed to fetch contract for fetching NFTs");
            const data = await contract.fetchMarketItems();
            const items = await Promise.all(
                data.map(
                    async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                        try {
                            const tokenURI = await contract.tokenURI(tokenId);
                            if (!tokenURI || typeof tokenURI !== 'string') return null;
                            const metadataUrl = tokenURI.startsWith("ipfs://") ? tokenURI.replace("ipfs://", `${pinataGatewayUrl}/ipfs/`) : tokenURI;
                            const { data: { image, name, description } } = await axios.get(metadataUrl);
                            const imageUrl = image && typeof image === 'string' ? (image.startsWith("ipfs://") ? image.replace("ipfs://", `${pinataGatewayUrl}/ipfs/`) : image) : null;
                            const price = formatUnits(unformattedPrice.toString(), "ether");
                            return { price, tokenId: tokenId.toString(), seller, owner, image: imageUrl, name, description, tokenURI: metadataUrl };
                        } catch (mapError) {
                            console.error(`Error processing tokenId ${tokenId} in fetchNFTs:`, mapError); return null;
                        }
                    }
                )
            );
            return items.filter(item => item !== null);
        } catch (error) { console.error("Error fetching NFTs:", error); return []; }
    };
    
    const fetchMyNFTsOrListedNFTs = async (type) => {
        try {
            const contract = await connectingWithSmartContract();
            if (!contract) throw new Error("Failed to connect to smart contract");
            const data = type === "fetchItemsListed" ? await contract.fetchItemsListed() : await contract.fetchMyNFTs();
            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    try {
                        const tokenURI = await contract.tokenURI(tokenId);
                        if (!tokenURI || typeof tokenURI !== 'string') return null;
                        const metadataUrl = tokenURI.startsWith("ipfs://") ? tokenURI.replace("ipfs://", `${pinataGatewayUrl}/ipfs/`) : tokenURI;
                        const { data: { image, name, description } } = await axios.get(metadataUrl);
                        const imageUrl = image && typeof image === 'string' ? (image.startsWith("ipfs://") ? image.replace("ipfs://", `${pinataGatewayUrl}/ipfs/`) : image) : null;
                        const price = formatUnits(unformattedPrice.toString(), "ether");
                        return { price, tokenId: tokenId.toString(), seller, owner, image: imageUrl, name, description, tokenURI: metadataUrl };
                    } catch (mapError) {
                        console.error(`Error processing tokenId ${tokenId} in fetchMyNFTsOrListedNFTs:`, mapError); return null;
                    }
                })
            );
            return items.filter(item => item !== null);
        } catch (error) { console.error("Error fetching my/listed NFTs:", error); return []; }
    };

    const buyNFT = async (nft) => {
        if (!nft || !nft.tokenId || !nft.price) { alert("Cannot buy NFT: Invalid data provided."); return; }
        try {
            const contract = await connectingWithSmartContract();
            if (!contract) throw new Error("Failed to connect to smart contract");
            const price = parseUnits(nft.price.toString(), "ether");
            const transaction = await contract.createMarketSale(nft.tokenId, { value: price });
            alert("Purchase transaction sent! Waiting for confirmation...");
            await transaction.wait();
            alert("NFT Purchased Successfully!");
            Router.push('/author');
        } catch (error) { console.error("Error buying NFT:", error); alert(`Purchase Failed: ${error?.reason || error?.message || "Unknown error"}`); }
    };

    const getBidHistoryForToken = async (tokenId) => {
        if (!tokenId) return [];
        try {
            const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545";
            const provider = new JsonRpcProvider(rpcUrl);
            const contract = fetchContract(provider); 
            if (!contract) throw new Error("Failed to fetch contract for getting bid history");
            const bids = await contract.getBidHistory(tokenId);
            const formattedBids = bids.map((bid) => ({
                bidder: bid.bidder,
                amount: formatUnits(bid.amount.toString(), "ether"),
                timestamp: new Date(Number(bid.timestamp) * 1000).toLocaleString(),
            })).reverse();
            return formattedBids;
        } catch (error) {
            console.error("Error fetching bid history from contract:", error);
            return [];
        }
    };

    const placeBidOnNFT = async (tokenId, bidAmount) => {
        if (!tokenId || !bidAmount) {
            alert("Token ID and Bid Amount are required to place a bid.");
            return false;
        }
        const numericBidAmount = parseFloat(bidAmount);
        if (isNaN(numericBidAmount) || numericBidAmount <= 0) {
            alert("Bid amount must be a positive number.");
            return false;
        }
        try {
            const contract = await connectingWithSmartContract(); 
            if (!contract) throw new Error("Failed to connect to smart contract for placing bid");
            const amountInWei = parseUnits(bidAmount.toString(), "ether");
            const transaction = await contract.placeBid(tokenId, { value: amountInWei });
            alert("Placing your bid... Please wait for transaction confirmation.");
            await transaction.wait(); 
            alert("Bid placed successfully!");
            return true; 
        } catch (error) {
            console.error("Error placing bid:", error);
            alert(`Failed to place bid: ${error?.reason || error?.message || "Unknown error"}`);
            return false;
        }
    };

    const fetchProvenanceHistory = async (tokenId) => {
        if (!tokenId) {
            console.error("fetchProvenanceHistory: tokenId is required");
            return [];
        }
        try {
            const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545";
            const provider = new JsonRpcProvider(rpcUrl);
            const contract = fetchContract(provider);
    
            if (!contract) throw new Error("Failed to fetch contract for provenance history");
    
            const transferFilter = contract.filters.Transfer(null, null, tokenId);
            const transferEvents = await contract.queryFilter(transferFilter, 0, 'latest');
    
            const formattedEvents = await Promise.all(
                transferEvents.map(async (event) => {
                    const block = await provider.getBlock(event.blockNumber);
                    let eventType = "Transfer";

                    const fromAddress = event.args.from;
                    const toAddress = event.args.to;
    
                    if (fromAddress === ZeroAddress) {
                        eventType = "Mint";
                    } else if (toAddress?.toLowerCase() === NFTMarketplaceAddress.toLowerCase()) {
                        eventType = "Listed to Marketplace";
                    } else if (fromAddress?.toLowerCase() === NFTMarketplaceAddress.toLowerCase()) {
                        eventType = "Sale (Fulfilled by Marketplace)";
                    }
    
                    return {
                        type: eventType,
                        from: fromAddress,
                        to: toAddress,
                        date: new Date(block.timestamp * 1000).toLocaleString(),
                        transactionHash: event.transactionHash,
                        blockNumber: event.blockNumber,
                    };
                })
            );
            return formattedEvents.sort((a, b) => b.blockNumber - a.blockNumber);
        } catch (error) {
            console.error("Error fetching provenance history:", error);
            return [];
        }
    };

    return (
        <NFTMarketplaceContext.Provider
            value={{
                checkIfWalletConnected,
                connectWallet,
                disconnectWallet,
                uploadToIPFS,
                createNFT,
                createSale,
                fetchNFTs,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                currentAccount,
                titleData,
                getBidHistoryForToken,
                placeBidOnNFT,
                fetchProvenanceHistory,
                explorerBaseUrl,
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    );
};