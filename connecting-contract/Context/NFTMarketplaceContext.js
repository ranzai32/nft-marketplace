import React, { useState, useEffect, useContext } from 'react';
import Web3modal from 'web3modal';
import { ethers } from 'ethers';
import Router from 'next/router';
import axios from 'axios';
import {create as ipfsHttpClient} from 'ipfs-http-client';

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
        } catch (error) {
            console.log("Something wrong while connecting to wallet")
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    //connect walleet function
    const collectWallet = async() => {
        try {
            if(!window.ethereum) return  console.log("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccount",
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
        try {
            const {name, description, price} = formInput;
            if(!name || !description|| !price || !fileUrl || !router){
                return console.log("Data is missing");
            }
        } catch (error) {
            console.log("Error while creating NFT");
        }
    };

    return (
        <NFTMarketplaceContext.Provider value={{ 
            collectWallet, 
            uploadToIPFS,
            titleData 
        }}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
});