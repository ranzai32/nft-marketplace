import React, { useState, useEffect, useContext } from 'react';
import Web3modal from 'web3modal';
import { ethers, Contract, parseUnits, formatUnits, JsonRpcProvider, BrowserProvider } from 'ethers';
import Router from 'next/router';
import axios from 'axios';

import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants';

// --- Pinata Configuration ---
const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || "";
const pinataGatewayUrl = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || "https://gateway.pinata.cloud";

// --- Fetching contract ---
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


// --- Connecting with smart contract ---
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
            console.error("Failed to fetch contract instance.");
            return null;
        }
        return contract;

    } catch (error) {
        console.error("Something went wrong while connecting with contract:", error);
        return null;
    }
};


// --- Context ---
export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Discover, collect, and sell NFTs";
    const [currentAccount, setCurrentAccount] = useState("");

    // --- Check if Wallet is Connected ---
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) {
                console.log("Install Metamask");
                return;
            }
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

    // Run check on initial load & listen for changes
    useEffect(() => {
        checkIfWalletConnected();
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                 if (accounts.length > 0) setCurrentAccount(accounts[0]);
                 else setCurrentAccount("");
            };
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            // Cleanup listener on unmount
            return () => {
                if (window.ethereum.removeListener) {
                     window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                }
            };
        }
    }, []);

    // --- Connect Wallet Function ---
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

    // --- Upload File to IPFS (Pinata) Function using API Key/Secret ---
    const uploadToIPFS = async (file) => {
        if (!file) return console.error("No file provided for IPFS upload");
        // Check for API Key/Secret
        if (!pinataApiKey || !pinataSecretApiKey) {
            console.error("Pinata API Key or Secret is missing. Check environment variables.");
            alert("IPFS configuration error (API Key/Secret). Please contact support.");
            return null;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);

            const metadata = JSON.stringify({ name: `NFT File: ${file.name}` });
            formData.append('pinataMetadata', metadata);
            const options = JSON.stringify({ cidVersion: 1 });
            formData.append('pinataOptions', options);

            console.log("Uploading file to Pinata with API Key/Secret..."); // Log method
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: Infinity,
                headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey,
                }
            });
            
            console.log("Pinata API Response (File):", res.data);
            const ipfsHash = res.data.IpfsHash;
            const url = `${pinataGatewayUrl}/ipfs/${ipfsHash}`;
            console.log("IPFS Upload URL:", url);
            return url;
        } catch (error) {
            console.error("Error uploading file to Pinata IPFS:", error);
            alert(`IPFS Upload Error: ${error.response?.data?.error || error.message}`);
            return null;
        }
    };

    // --- Upload JSON Metadata to IPFS (Pinata) using API Key/Secret ---
    const uploadMetadataToIPFS = async (jsonData) => {
        if (!jsonData) return console.error("No JSON data provided for IPFS upload");
         // Check for API Key/Secret
         if (!pinataApiKey || !pinataSecretApiKey) {
            console.error("Pinata API Key or Secret is missing. Check environment variables.");
            alert("IPFS configuration error (API Key/Secret). Please contact support.");
            return null;
        }
        try {
             const pinataData = {
                pinataMetadata: { name: `NFT Metadata: ${jsonData.name || 'Unnamed'}` },
                pinataContent: jsonData
            };
            console.log("Uploading JSON to Pinata with API Key/Secret..."); // Log method
            const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", pinataData, {
                 headers: {
                    // Corrected: Use API Key / Secret API Key headers
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                    // Removed: 'Authorization': `Bearer ${pinataJwt}`
                }
            });
            console.log("Pinata API Response (JSON):", res.data);
            const ipfsHash = res.data.IpfsHash;
            const url = `${pinataGatewayUrl}/ipfs/${ipfsHash}`;
            console.log("Metadata IPFS URL:", url);
            return url;
        } catch (error) {
             console.error("Error uploading JSON to Pinata IPFS:", error);
             alert(`IPFS Metadata Upload Error: ${error.response?.data?.error || error.message}`);
             return null;
        }
    };


    // --- Create NFT Function ---
    // (No changes needed in this function itself, it calls the updated upload function)
    const createNFT = async (formInput, fileUrl, router) => {
        const { name, description, price } = formInput;
        let missingFields = [];
        if (!name) missingFields.push("Name");
        if (!description) missingFields.push("Description");
        if (!price) missingFields.push("Price");
        if (!fileUrl) missingFields.push("Image");

        if (missingFields.length > 0) {
            console.error(`NFT Creation Error: Missing data - ${missingFields.join(", ")}`);
            alert(`Please fill in the following NFT details: ${missingFields.join(", ")}`);
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
            await createSale(metadataUrl, price, false, undefined);
        } catch(error) {
            console.error("Error calling createSale from createNFT:", error);
        }
    };

    // --- Create Sale Function ---
    // (No changes needed in this function)
    const createSale = async (tokenURI, formInputPrice, isReselling, id) => {
        if (!tokenURI || !formInputPrice) {
            console.error("createSale Error: Missing tokenURI or price");
            alert("Missing token URI or price for creating sale.");
            return;
        }
        try {
            const contract = await connectingWithSmartContract();
            if (!contract) throw new Error("Failed to connect to smart contract");
            const price = parseUnits(formInputPrice.toString(), "ether");
            const listingPrice = await contract.getListingPrice();
            const transaction = !isReselling
                ? await contract.createToken(tokenURI, price, { value: listingPrice.toString() })
                : await contract.reSellToken(id, price, { value: listingPrice.toString() });
            alert("Transaction sent! Waiting for confirmation...");
            await transaction.wait();
            alert("NFT Listed Successfully!");
            Router.push('/searchPage');
        } catch (error) {
            console.error("Error during createSale transaction:", error);
            alert(`Transaction Failed: ${error?.reason || error?.message || "Unknown error"}`);
        }
    };

    // --- Fetch NFTs Function ---
    // (No changes needed in this function, but ensure gateway URL is correct)
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
                            const metadataUrl = tokenURI.replace("ipfs://", `${pinataGatewayUrl}/ipfs/`);
                            const { data: { image, name, description } } = await axios.get(metadataUrl);
                            const imageUrl = image && typeof image === 'string' ? image.replace("ipfs://", `${pinataGatewayUrl}/ipfs/`) : null;
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

    // --- Fetch My NFTs or Listed NFTs Function ---
    // (No changes needed in this function, but ensure gateway URL is correct)
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
                        const metadataUrl = tokenURI.replace("ipfs://", `${pinataGatewayUrl}/ipfs/`);
                        const { data: { image, name, description } } = await axios.get(metadataUrl);
                        const imageUrl = image && typeof image === 'string' ? image.replace("ipfs://", `${pinataGatewayUrl}/ipfs/`) : null;
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

    useEffect(()=> {
        fetchMyNFTsOrListedNFTs()
    }, []);

    // --- Buy NFT Function ---
    const buyNFT = async (nft) => {
        if (!nft || !nft.tokenId || !nft.price) { console.error("buyNFT Error: Invalid NFT object provided", nft); alert("Cannot buy NFT: Invalid data provided."); return; }
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

    useEffect(()=>{
        fetchNFTs();
    }, []);

    // --- Provide Context Value ---
    return (
        <NFTMarketplaceContext.Provider
            value={{
                checkIfWalletConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                fetchNFTs,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                currentAccount,
                titleData,
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    );
};
