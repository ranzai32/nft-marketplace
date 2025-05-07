---
sidebar_position: 1
---

# NFTMarketplace Smart Contract

## Overview

This document describes the `NFTMarketplace.sol` smart contract, which implements a decentralized marketplace for Non-Fungible Tokens (NFTs). It allows users to mint new NFTs, list them for sale, buy listed NFTs, resell NFTs they own, and place bids on items. The contract also includes functionality for managing a listing fee and tracking item sales.

It inherits functionality from OpenZeppelin's `ERC721URIStorage` contract, providing standard ERC721 token features along with the ability to store metadata URIs for each token. It also uses OpenZeppelin's `Counters` library for safely managing token IDs and sold item counts.

## File Location

`connecting-contract/contracts/NFTMarketplace.sol`

## Inherits From

* `@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol`
* `@openzeppelin/contracts/token/ERC721/ERC721.sol`
* `./Counters.sol` (for `Counters.Counter`) originally from openzepellin

## State Variables

* **`_tokenIds`** (`Counters.Counter`): A private counter to safely generate unique sequential token IDs for newly minted NFTs. Starts at 0, so the first token ID will be 1.
* **`_itemsSold`** (`Counters.Counter`): A private counter to track the number of items currently marked as sold.
* **`listingPrice`** (`uint256`): A public variable storing the fee (in wei) required to list an item for sale or resell. Initialized to 0.025 ether. Can be updated by the contract owner.
* **`owner`** (`address payable`): A public variable storing the address of the contract deployer (marketplace owner). This address receives the `listingPrice` when items are sold.
* **`idToMarketItem`** (`mapping(uint256 => MarketItem)`): A private mapping storing details of each market item, keyed by the `tokenId`.
* **`tokenBids`** (`mapping(uint256 => Bid[])`): A private mapping storing an array of bids for each `tokenId`.

## Structs

### `MarketItem`

Stores information about an NFT listed on the marketplace.

* `tokenId` (`uint256`): The unique ID of the NFT.
* `seller` (`address payable`): The address of the user who listed the item for sale. Becomes `address(0)` after a sale.
* `owner` (`address payable`): The current owner of the NFT within the marketplace context. This is `address(this)` (the contract address) when listed, and the buyer's address after a sale.
* `price` (`uint256`): The asking price of the NFT in wei.
* `sold` (`bool`): A flag indicating whether the item has been sold (`true`) or is currently listed (`false`).

### `Bid`

Stores information about a bid placed on an NFT.

* `bidder` (`address`): The address of the user who placed the bid.
* `amount` (`uint256`): The amount of the bid in wei.
* `timestamp` (`uint256`): The block timestamp when the bid was placed.

## Events

### `MarketItemCreated`

Emitted when a new item is listed for sale (either initially or via resell).

* `tokenId` (`uint256`, indexed): The ID of the listed token.
* `seller` (`address`): The address of the seller listing the item.
* `owner` (`address`): The address of the current owner (which is the contract address `address(this)` when listed).
* `price` (`uint256`): The listing price in wei.
* `sold` (`bool`): The status of the item (always `false` when created/listed).

### `BidPlaced`

Emitted when a user successfully places a bid on an item.

* `bidder` (`address`, indexed): The address of the bidder.
* `tokenId` (`uint256`, indexed): The ID of the token being bid on.
* `amount` (`uint256`): The amount of the bid in wei.

## Modifiers

### `onlyOwner`

Restricts function execution to only the address stored in the `owner` state variable (the contract deployer).

## Functions

### `constructor()`

* Initializes the ERC721 contract with the name "Metaverse Tokens" and symbol "METT".
* Sets the `owner` state variable to the address of the deployer (`msg.sender`).

### `updateListingPrice(uint256 _listingPrice)`

* **Visibility:** `external`
* **Modifiers:** `onlyOwner`
* **Description:** Allows the contract owner to change the `listingPrice` required to list items.
* **Parameters:**
    * `_listingPrice` (`uint256`): The new listing price in wei.

### `getListingPrice()`

* **Visibility:** `external view`
* **Description:** Returns the current `listingPrice`.
* **Returns:** (`uint256`) - The current listing price in wei.

### `getBidHistory(uint256 tokenId)`

* **Visibility:** `external view`
* **Description:** Returns the array of all bids placed for a specific `tokenId`.
* **Parameters:**
    * `tokenId` (`uint256`): The ID of the token to fetch bid history for.
* **Returns:** (`Bid[] memory`) - An array containing all `Bid` structs for the given token.

### `placeBid(uint256 tokenId)`

* **Visibility:** `external payable`
* **Description:** Allows a user to place a bid on a listed NFT. The bid amount is sent with the transaction (`msg.value`).
* **Parameters:**
    * `tokenId` (`uint256`): The ID of the token to bid on.
* **Requirements:**
    * The item must still be for sale (owner must be the contract address).
    * The bid amount (`msg.value`) must be greater than 0.
* **Actions:**
    * Adds a new `Bid` struct to the `tokenBids` mapping for the `tokenId`.
    * Emits a `BidPlaced` event.
* **Note:** This function only records bids; it does not handle accepting bids or transferring the NFT. Additional logic would be needed for that.

### `createToken(string memory tokenURI, uint256 price)`

* **Visibility:** `external payable`
* **Description:** Mints a new NFT, sets its metadata URI, and lists it for sale on the marketplace in a single transaction.
* **Parameters:**
    * `tokenURI` (`string memory`): The URI pointing to the NFT's metadata (usually an IPFS URL).
    * `price` (`uint256`): The initial selling price for the NFT in wei.
* **Requirements:**
    * The transaction value (`msg.value`) must be equal to the current `listingPrice`.
    * The `price` must be greater than 0.
* **Actions:**
    * Increments the `_tokenIds` counter to get a new ID.
    * Mints the new token to the caller (`msg.sender`).
    * Sets the token's metadata URI using `_setTokenURI`.
    * Calls the internal `_createMarketItem` function to list the item.
* **Returns:** (`uint256`) - The `tokenId` of the newly created and listed NFT.

### `_createMarketItem(uint256 tokenId, uint256 price)`

* **Visibility:** `private`
* **Description:** Internal function called by `createToken` to handle the marketplace listing logic.
* **Parameters:**
    * `tokenId` (`uint256`): The ID of the token being listed.
    * `price` (`uint256`): The listing price in wei.
* **Requirements:**
    * `price` > 0.
    * `msg.value` == `listingPrice` (inherited from `createToken`).
* **Actions:**
    * Creates a new `MarketItem` struct in the `idToMarketItem` mapping.
        * Sets `seller` to `msg.sender`.
        * Sets `owner` to `address(this)` (the contract).
        * Sets `sold` to `false`.
    * Transfers the NFT from the creator (`msg.sender`) to the contract (`address(this)`).
    * Emits a `MarketItemCreated` event.

### `resellToken(uint256 tokenId, uint256 price)`

* **Visibility:** `external payable`
* **Description:** Allows the current owner of a purchased NFT to list it back on the marketplace for sale at a new price.
* **Parameters:**
    * `tokenId` (`uint256`): The ID of the token to resell.
    * `price` (`uint256`): The new selling price in wei.
* **Requirements:**
    * The caller (`msg.sender`) must be the current `owner` of the `MarketItem` (meaning they previously bought it).
    * The transaction value (`msg.value`) must be equal to the current `listingPrice`.
    * The new `price` must be greater than 0 (implicitly required by `createMarketSale` later, good to add explicit check here too).
* **Actions:**
    * Updates the existing `MarketItem` struct:
        * Sets `sold` back to `false`.
        * Sets the new `price`.
        * Sets `seller` to `msg.sender`.
        * Sets `owner` back to `address(this)` (the contract).
    * Decrements the `_itemsSold` counter.
    * Transfers the NFT from the current owner (`msg.sender`) back to the contract (`address(this)`).
    * (Implicitly emits `MarketItemCreated` again via the transfer hook if implemented, or should emit manually if not).

### `createMarketSale(uint256 tokenId)`

* **Visibility:** `external payable`
* **Description:** Allows a user to purchase a listed NFT.
* **Parameters:**
    * `tokenId` (`uint256`): The ID of the token to purchase.
* **Requirements:**
    * The transaction value (`msg.value`) must be exactly equal to the `price` set in the `MarketItem`.
* **Actions:**
    * Updates the `MarketItem` struct:
        * Sets `owner` to the buyer (`msg.sender`).
        * Sets `sold` to `true`.
        * Sets `seller` to `address(0)` (indicating it's sold and previous seller info isn't directly needed here).
    * Increments the `_itemsSold` counter.
    * Transfers the NFT from the contract (`address(this)`) to the buyer (`msg.sender`).
    * Transfers the `listingPrice` to the contract `owner`.
    * Transfers the full purchase amount (`msg.value`) to the original `seller` (retrieved from the `MarketItem` struct *before* it was potentially zeroed out - **potential issue here, see notes**).

### `fetchMarketItems()`

* **Visibility:** `external view`
* **Description:** Returns an array of all `MarketItem` structs that are currently listed for sale (i.e., not marked as sold and owned by the contract).
* **Returns:** (`MarketItem[] memory`) - An array of unsold market items.

### `fetchMyNFTs()`

* **Visibility:** `external view`
* **Description:** Returns an array of all `MarketItem` structs for NFTs currently owned by the caller (`msg.sender`). These are items they have purchased.
* **Returns:** (`MarketItem[] memory`) - An array of market items owned by the caller.

### `fetchItemsListed()`

* **Visibility:** `external view`
* **Description:** Returns an array of all `MarketItem` structs for NFTs listed by the caller (`msg.sender`), regardless of whether they are sold or unsold.
* **Returns:** (`MarketItem[] memory`) - An array of market items listed by the caller.

## Potential Issues / Areas for Improvement in Contract Code

* **Seller Payment in `createMarketSale`:** The line `payable(item.seller).transfer(msg.value);` attempts to pay the seller *after* `item.seller` has been set to `address(0)`. This will fail. You need to store the seller's address in a temporary variable *before* modifying `item.seller`.
    ```solidity
    // Inside createMarketSale, before modifying item:
    address payable sellerAddress = item.seller;
    // ... modify item ...
    // Transfer to the stored address:
    payable(sellerAddress).transfer(msg.value);
    ```
* **Resell Event:** The `resellToken` function modifies the market item state but doesn't explicitly emit a `MarketItemCreated` or similar event to signal the relisting. While the `_transfer` might trigger an ERC721 `Transfer` event, a dedicated marketplace event is clearer.
* **Bidding Logic:** The current `placeBid` function only records bids. There's no mechanism to accept a bid, end an auction, or handle the transfer/payment based on a bid. This would require significant additional logic.
* **Price > 0 in Resell:** Add `require(price > 0, "Price must be > 0");` in `resellToken` for clarity.
* **Gas Optimization in Fetches:** The loops in `fetchMarketItems`, `fetchMyNFTs`, and `fetchItemsListed` iterate through all possible token IDs. This can become very gas-intensive as the number of NFTs grows. For production, consider alternative patterns like maintaining separate lists/mappings of active listings, owned tokens, etc., or using off-chain indexing.
* **Error Messages:** Some `require` messages could be more descriptive (e.g., "Price > 0" -> "Price must be greater than zero").
* **Visibility:** Functions like `getListingPrice`, `fetchMarketItems`, etc., could potentially be `public` instead of `external` if needed for internal contract calls, but `external` is generally more gas-efficient if only called from outside. `updateListingPrice` and the state-changing functions (`createToken`, `resellToken`, `createMarketSale`, `placeBid`) are correctly `external` or `public`.

This documentation provides a comprehensive overview of your contract's structure and functionality.

