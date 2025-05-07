---
title: NFTMarketplaceContext.js
---

# NFTMarketplaceContext Documentation

## Table of Contents

1.  [Overview](#overview)
2. [Environment Variables & Constants](#environment-variables--constants)
3. [Internal Helper Functions](#internal-helper-functions)
    * [`WorkspaceContract(signerOrProvider)`](#fetchcontractsignerorprovider)
    * [`connectingWithSmartContract()`](#connectingwithsmartcontract)
4.  [Context Provider: `NFTMarketplaceProvider`](#context-provider-nftmarketplaceprovider)
5.  [Exposed Context Values](#exposed-context-values)
    * [State & Constants](#state--constants)
        * [`currentAccount`](#currentaccount)
        * [`titleData`](#titledata)
        * [`explorerBaseUrl`](#explorerbaseurl)
    * [Wallet Functions](#wallet-functions)
        * [`checkIfWalletConnected()`](#checkifwalletconnected)
        * [`connectWallet()`](#connectwallet)
        * [`disconnectWallet()`](#disconnectwallet)
    * [IPFS Functions](#ipfs-functions)
        * [`uploadToIPFS(file)`](#uploadtoipfsfile)
        * [`uploadMetadataToIPFS(jsonData)`](#uploadmetadatatoipfsjsondata)
    * [NFT Core Functions](#nft-core-functions)
        * [`createNFT(formInput, fileUrl, routerInstance)`](#createnftforminput-fileurl-routerinstance)
        * [`createSale(tokenURI, formInputPrice, isReselling, id, routerInstance)`](#createsaletokenuri-forminputprice-isreselling-id-routerinstance)
        * [`WorkspaceNFTs()`](#fetchnfts)
        * [`WorkspaceMyNFTsOrListedNFTs(type)`](#fetchmynftsorlistednftstype)
        * [`buyNFT(nft)`](#buynftnft)
    * [Bidding Functions](#bidding-functions)
        * [`getBidHistoryForToken(tokenId)`](#getbidhistoryfortokentokenid)
        * [`placeBidOnNFT(tokenId, bidAmount)`](#placebidonnfttokenid-bidamount)
    * [Provenance Functions](#provenance-functions)
        * [`WorkspaceProvenanceHistory(tokenId)`](#fetchprovenancehistorytokenid)

---

## 1. Overview

`NFTMarketplaceContext` is a React Context designed to manage and provide all blockchain-related functionalities for an NFT marketplace application. It handles:

* Wallet connections (MetaMask).
* Interactions with the deployed `NFTMarketplace` smart contract.
* Uploading files and metadata to IPFS via Pinata.
* Fetching NFT data, creating, selling, buying, and bidding on NFTs.
* Fetching NFT provenance (history).

It centralizes Web3 logic, making it accessible throughout the application via the `NFTMarketplaceProvider` and the `useContext(NFTMarketplaceContext)` hook.

## 2. Environment Variables & Constants

The context relies on several external constants and environment variables:

* **`NFTMarketplaceAddress`**: (from `./constants`) The deployed address of your `NFTMarketplace` smart contract.
* **`NFTMarketplaceABI`**: (from `./constants`) The ABI (Application Binary Interface) of your `NFTMarketplace` smart contract.
* **`process.env.NEXT_PUBLIC_PINATA_API_KEY`**: Your Pinata API Key for IPFS uploads.
* **`process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY`**: Your Pinata Secret API Key.
* **`process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL`**: Your preferred Pinata IPFS gateway URL (defaults to `https://gateway.pinata.cloud`).
* **`process.env.NEXT_PUBLIC_EXPLORER_BASE_URL`**: The base URL for the blockchain explorer relevant to your deployed network (e.g., `https://etherscan.io`, `https://sepolia.etherscan.io`). Defaults to `https://etherscan.io`.
* **`process.env.NEXT_PUBLIC_RPC_URL`**: The RPC URL for connecting to the blockchain network, primarily for read-only operations if no wallet is connected (defaults to `http://localhost:8545`).

Ensure these are correctly set up in your project (e.g., in a `.env.local` file for Next.js environment variables).

## 3. Internal Helper Functions

These functions are defined within `NFTMarketplaceContext.js` and used internally by the provider.

### `WorkspaceContract(signerOrProvider)`

* **Purpose**: Creates and returns an ethers.js `Contract` instance for interacting with the `NFTMarketplace` smart contract.
* **Parameters**:
    * `signerOrProvider: ethers.Signer | ethers.Provider` - An ethers.js Signer (for transactions) or Provider (for read-only calls).
* **Returns**: `ethers.Contract | null` - An instance of the smart contract, or `null` if `NFTMarketplaceABI` or `NFTMarketplaceAddress` is missing or an error occurs.

### `connectingWithSmartContract()`

* **Purpose**: Connects to the user's Ethereum wallet (e.g., MetaMask) using Web3Modal, obtains a signer, and returns a contract instance attached to this signer, enabling transaction signing.
* **Parameters**: None.
* **Returns**: `Promise<ethers.Contract | null>` - A contract instance connected to a signer, or `null` if connection fails or MetaMask is not found.

## 4. Context Provider: `NFTMarketplaceProvider`

This is the React component that provides the context values to its children.

```jsx
export const NFTMarketplaceProvider = ({ children }) => {
  // ... state and functions ...
  return (
    <NFTMarketplaceContext.Provider value={{ /* ...exposed values... */ }}>
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
```

## 6. Exposed Context Values

These are the values made available by the `NFTMarketplaceProvider`.

### State & Constants

#### `currentAccount`

* **Type**: `string`
* **Description**: Stores the Ethereum address of the currently connected user. It's an empty string (`""`) if no account is connected.
* **Updated by**: `checkIfWalletConnected()`, `connectWallet()`, `disconnectWallet()`, and MetaMask account change events.

#### `titleData`

* **Type**: `string`
* **Description**: A static string: "Discover, collect, and sell NFTs". Likely used for display purposes.

#### `explorerBaseUrl`

* **Type**: `string`
* **Description**: The base URL for the blockchain explorer (e.g., "https://etherscan.io"). Derived from `process.env.NEXT_PUBLIC_EXPLORER_BASE_URL` or defaults to Etherscan. Used for generating links to addresses and transactions.

### Wallet Functions

#### `checkIfWalletConnected()`

* **Purpose**: Asynchronously checks if an Ethereum wallet (like MetaMask) is already connected to the site and if any accounts are authorized. If an account is found, it updates the `currentAccount` state.
* **Parameters**: None.
* **Returns**: `Promise<void>`

#### `connectWallet()`

* **Purpose**: Initiates a connection to the user's Ethereum wallet. It prompts the user via MetaMask (or a similar provider) to authorize account access. On successful connection, it updates the `currentAccount` state with the selected account.
* **Parameters**: None.
* **Returns**: `Promise<void>`

#### `disconnectWallet()`

* **Purpose**: Clears the `currentAccount` state to an empty string. This effectively "disconnects" the wallet from the application's perspective, though it doesn't disconnect MetaMask from the site.
* **Parameters**: None.
* **Returns**: `void`

### IPFS Functions

#### `uploadToIPFS(file)`

* **Purpose**: Uploads a given file to IPFS using the Pinata service.
* **Parameters**:
    * `file: File` - The JavaScript `File` object to be uploaded.
* **Returns**: `Promise<string | null>` - The IPFS URL (e.g., `https://gateway.pinata.cloud/ipfs/YOUR_CID`) of the uploaded file upon success, or `null` if the upload fails or Pinata keys are missing.

#### `uploadMetadataToIPFS(jsonData)`

* **Purpose**: Uploads a JSON object (typically NFT metadata) to IPFS using Pinata.
* **Parameters**:
    * `jsonData: object` - The JavaScript object to be uploaded as a JSON file. Expected to conform to NFT metadata standards (e.g., containing `name`, `description`, `image` (an IPFS URL)).
* **Returns**: `Promise<string | null>` - The IPFS URL of the uploaded JSON metadata file upon success, or `null` if the upload fails or Pinata keys are missing.

### NFT Core Functions

#### `createNFT(formInput, fileUrl, routerInstance)`

* **Purpose**: Orchestrates the full process of creating a new NFT. This involves:
    1.  Validating `formInput` (name, description, price) and `fileUrl`.
    2.  Creating a metadata JSON object using the form input and the `fileUrl` (which is the IPFS URL of the NFT's image).
    3.  Uploading this metadata JSON to IPFS using `uploadMetadataToIPFS()`.
    4.  Calling `createSale()` with the metadata IPFS URL and price to mint the token and list it on the marketplace.
* **Parameters**:
    * `formInput: object` - An object with NFT details: `{ name: string, description: string, price: string }`. `price` is in ETH.
    * `fileUrl: string` - The IPFS URL of the NFT's image content.
    * `routerInstance: NextRouter` - An instance of the Next.js router, used by `createSale` for navigation.
* **Returns**: `Promise<void>`

#### `createSale(tokenURI, formInputPrice, isReselling, id, routerInstance)`

* **Purpose**: Handles two scenarios:
    1.  **Initial Sale**: If `isReselling` is `false`, it calls the `createToken` function on the smart contract to mint a new NFT with the given `tokenURI` and `formInputPrice`, and lists it for sale.
    2.  **Resell**: If `isReselling` is `true`, it calls the `resellToken` function on the smart contract to relist an existing NFT (identified by `id`) with a new `formInputPrice`.
* **Parameters**:
    * `tokenURI: string` - The IPFS URL of the NFT's metadata.
    * `formInputPrice: string` - The price for the NFT in ETH (as a string).
    * `isReselling: boolean` - A flag indicating whether this is an initial sale or a resell.
    * `id: string | number | undefined` - The `tokenId` of the NFT to be resold. Required and used only if `isReselling` is `true`.
    * `routerInstance: NextRouter` (optional, defaults to `Router`) - The Next.js router instance for navigation.
* **Returns**: `Promise<void>`
* **Notes**:
    * Requires the user's wallet to be connected.
    * Interacts with the smart contract and will prompt for transaction confirmation (and payment of listing fee and potentially gas).
    * Navigates to `/searchPage` on successful listing/reselling.
    * Includes console logs (as per provided code) for debugging the `resellToken` branch.

#### `WorkspaceNFTs()`

* **Purpose**: Fetches all NFTs currently listed on the marketplace by calling the `WorkspaceMarketItems` view function of the smart contract.
* **Parameters**: None.
* **Returns**: `Promise<Array<object> | []>` - An array of NFT item objects. Each object typically contains:
    * `price: string` (in ETH)
    * `tokenId: string`
    * `seller: string` (address)
    * `owner: string` (address, usually the marketplace contract for listed items)
    * `image: string | null` (IPFS URL of the image)
    * `name: string`
    * `description: string`
    * `tokenURI: string` (IPFS URL of the metadata)
      Returns an empty array if no items are found or an error occurs.

#### `WorkspaceMyNFTsOrListedNFTs(type)`

* **Purpose**: Fetches NFTs specific to the `currentAccount`.
    * If `type` is `"fetchItemsListed"`, it calls the `WorkspaceItemsListed` contract function to get NFTs listed by the `currentAccount`.
    * Otherwise (e.g., if `type` is `"fetchMyNFTs"` or any other value), it calls the `WorkspaceMyNFTs` contract function to get NFTs currently owned by the `currentAccount`.
* **Parameters**:
    * `type: string` - Specifies the type of fetch: `"fetchItemsListed"` or another value for owned NFTs.
* **Returns**: `Promise<Array<object> | []>` - An array of NFT item objects, structured similarly to `WorkspaceNFTs()`. Returns an empty array on failure or if no relevant items.
* **Notes**: Requires the user's wallet to be connected to identify the `currentAccount`.

#### `buyNFT(nft)`

* **Purpose**: Allows the `currentAccount` to purchase a listed NFT by calling the `createMarketSale` function on the smart contract.
* **Parameters**:
    * `nft: object` - The NFT object to be purchased. Must contain at least `tokenId` (string or number) and `price` (string, in ETH).
* **Returns**: `Promise<void>`
* **Notes**:
    * Requires the user's wallet to be connected.
    * The user will be prompted to confirm the transaction and pay the `nft.price` plus gas fees.
    * Navigates to `/author` page on successful purchase.

### Bidding Functions

#### `getBidHistoryForToken(tokenId)`

* **Purpose**: Fetches the history of bids placed on a specific NFT by calling the `getBidHistory` view function of the smart contract.
* **Parameters**:
    * `tokenId: string | number` - The ID of the token for which to fetch bid history.
* **Returns**: `Promise<Array<object> | []>` - An array of bid objects, sorted with the most recent bids first. Each bid object contains:
    * `bidder: string` (address)
    * `amount: string` (in ETH)
    * `timestamp: string` (locale-formatted date and time)
      Returns an empty array if no bids are found or an error occurs.

#### `placeBidOnNFT(tokenId, bidAmount)`

* **Purpose**: Allows the `currentAccount` to place a bid on a specific NFT by calling the `placeBid` payable function on the smart contract.
* **Parameters**:
    * `tokenId: string | number` - The ID of the token to bid on.
    * `bidAmount: string` - The amount of the bid in ETH (as a string).
* **Returns**: `Promise<boolean>` - `true` if the bid transaction was successfully sent and confirmed by the user, `false` otherwise (e.g., user rejected, or an error occurred).
* **Notes**:
    * Requires the user's wallet to be connected.
    * The user will be prompted to confirm the transaction and pay the `bidAmount` plus gas fees.

### Provenance Functions

#### `WorkspaceProvenanceHistory(tokenId)`

* **Purpose**: Fetches the transfer history (provenance) for a specific NFT by querying `Transfer` events from the ERC721 contract. It attempts to interpret event types (Mint, Listed, Sale).
* **Parameters**:
    * `tokenId: string | number` - The ID of the token for which to fetch provenance.
* **Returns**: `Promise<Array<object> | []>` - An array of event objects, sorted by block number (most recent first). Each event object contains:
    * `type: string` (e.g., "Mint", "Transfer", "Listed to Marketplace", "Sale (Fulfilled by Marketplace)")
    * `from: string` (address)
    * `to: string` (address)
    * `date: string` (locale-formatted date and time of the block)
    * `transactionHash: string`
    * `blockNumber: number`
      Returns an empty array if no events are found or an error occurs.
* **Notes**:
    * Event type interpretation is a simplification and might need refinement for complex marketplace interactions.
    * Queries events from block 0 to 'latest', which can be resource-intensive on public networks for NFTs with long histories.

---