import React, { useState, useEffect, useContext } from 'react';
import Web3modal from 'web3modal';
import { ethers } from 'ethers';
import Router from 'next/router';
import axios from 'axios';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import Link from 'next/link';
import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants';

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

//fecting contract
const fetchContract = (signerOrProvider)=> new ethers.Contract(
    NFTMarketplaceAddress, NFTMarketplaceABI, signerOrProvider
);

//abstracting for all functions(connecting with samrt contract)
const connectingWithSmartContract = async() => {
    try {
        const web3modal  = new Web3modal();
        const connection  = await web3modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong while connecting with contract")
    }
}



export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = (({children}) => {
    const titleData = "Discover, collect, and sell NFTs";

    const [currentAccount, setCurrentAccount] = useState("");

    //check wallet connection
    const checkIfWalletConnected = async() => {
        try {
            if(!window.ethereum) return  console.log("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if(accounts.length){
                setCurrentAccount(accounts[0]);
            } else{
                console.log("No account found");
            }
            console.log(currentAccount);
        } catch (error) {
            console.log("Something wrong while connecting to wallet")
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    //connect walleet function
    const connectWallet = async() => {
        try {
            if(!window.ethereum) return  console.log("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log("Error while connecting to wallet")
        }
    };

    //upload to ipfs function
    const uploadToIPFS = async(file) => {
        try {
            const added = await client.add({content: file});
            const url = `http://ipfs.infura.io/ipfs/${added.path}`;
            return url;
        } catch (error) {
            console.log("Error while uploading to IPFS");
        }
    };

    //create nft
    const createNFT = async(formInput, fileUrl, router) => {
        
            const {name, description, price} = formInput;
            if(!name || !description|| !price || !fileUrl)
                return console.log("Data is missing");

                const data = JSSON.stringify({name, description, image: fileUrl});

                try {
                    const added = await client.add(data);

                    const url ='http://ipfs.infura.io/ipfs/${added.path}'

                    await createSale(url, price) 
                } catch (error) {
                    console.log(error);
                }
    };

    //create sale func
    const createSale = async(url, formInputPrice, isReselling, id) => {
        try {
            
            const price = ethers.utils.parseUnits(formInputPrice, "ether");
            const contract = await connectingWithSmartContract()

            const listingPrice = await contract.getListingPrice();

            const transaction = !isReselling 
                ? await contract.createToken(url, price, {
                    value: listingPrice.toString(),
                })
                : await contract.reSellToken(url, price, {
                    value: listingPrice.toString(),
                });

            await transaction.wait();

        } catch (error) {
            console.log("error while creating sale")
        }
    };

    // fetch nfts
    const fetchNFTs = async ()=> {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItem();

            const items = await Promise.all(
                data.map(
                    async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                      const tokenURI = await contract.tokenURI(tokenId);
                  
                      const {
                        data: { image, name, description },
                      } = await axios.get(tokenURI);
                  
                      const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                      );

                      return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                      }
                    }
                )
            );

            return items;

        } catch (error) {
            console.log("Error while fetching NFTs");
        }
    };

    // fetch my nft or listed nfts
    const fetchMyNFTsOrListedNFTs = async(type)=>{
        try {
            const contract = await connectingWithSmartContract();

            const data = type == "fetchItemsListed" 
                ? await contract.fetchItemsListed()
                : await contract.fetchMyNFT();

                const items = await Promise.all(
                    data.map(async ({tokenId, seller, owner, price: unformattedPrice})=>{
                        const tokenURI = await contract.tokenURI(tokenId);
                        const {
                            data: {image, name, description}
                        } = await axios.get(tokenURI);
                        const price = ethers.utils.formatUnits(
                            unformattedPrice.toString(),
                            "ether"
                        );

                        return {
                            price,
                            tokenId: tokenId.toNumber(),
                            seller,
                            owner,
                            image, 
                            name,
                            description,
                            tokenURI,
                        };
                    }
                )
            );
            return items;
        } catch (error) {
            console.log("Error while fetching NFT's")
        }
    };

    const buyNFT = async (nft) => {
        try {
          const contract = await connectingWithSmartContract();
          const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      
          const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price,
          });

          await transaction.wait();
        } catch (error) {
          console.log("Error While buying NFT");
        }
    };      

    return (
        <NFTMarketplaceContext.Provider value={{ 
            checkIfWalletConnected,
            connectWallet: connectWallet, 
            uploadToIPFS,
            createNFT,
            fetchNFTs,
            fetchMyNFTsOrListedNFTs,
            buyNFT,
            currentAccount,
            titleData,
        }}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
});