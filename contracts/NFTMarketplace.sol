// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// --- Imports ---
import "@openzeppelin/contracts/utils/Counters.sol"; // For safe counters
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // ERC721 with URI storage
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // Base ERC721
import "hardhat/console.sol"; // Hardhat logging utility

/**
 * @title NFTMarketplace
 * @dev Contract for minting, selling, and managing NFTs (ERC721).
 * Acts as both the NFT collection and the marketplace.
 */
contract NFTMarketplace is ERC721URIStorage {
    // --- State Variables ---
    using Counters for Counters.Counter;

    Counters.Counter private _tokensIds; // Counter for generating sequential token IDs.
    Counters.Counter private _itemsSold; // Counter for tracking total items sold.

    uint256 public listingPrice = 0.0025 ether; // Fee to list an NFT (in Wei).
    address payable public owner; // Marketplace owner, receives listing fees.

    // Mapping from token ID to its market data.
    mapping(uint256 => MarketItem) private idMarketItem;

    // --- Structs ---
    /**
     * @dev Stores data about an NFT listed on the marketplace.
     */
    struct MarketItem {
        uint256 tokenId;       // NFT ID.
        address payable seller; // Address that listed the item.
        address payable owner;  // Current NFT owner (contract if listed, buyer if sold).
        uint256 price;         // Sale price in Wei.
        bool sold;             // True if sold, false if listed for sale.
    }

    // --- Events ---
    /**
     * @dev Emitted when an NFT is listed (a MarketItem is created).
     */
    event idMarketItemCreated(
        uint indexed tokenId, // The token ID.
        address seller,      // Who listed it.
        address owner,       // Initial owner (the contract).
        uint256 price,       // Listing price.
        bool sold            // Initial state (false).
    );

    // --- Modifiers ---
    /**
     * @dev Restricts access to the contract owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }

    // --- Constructor ---
    /**
     * @dev Sets up the NFT name/symbol and owner.
     * @notice BUG: `owner == payable(msg.sender)` is a comparison.
     */
    constructor() ERC721("TODAY THE GAME", "MYNFT") {
        owner == payable(msg.sender); 
    }

    // --- Functions ---

    /**
     * @dev Updates the listing fee. Only callable by the owner.
     * @param _ListingPrice New listing fee in Wei.
     */
    function updateListingPrice(uint256 _ListingPrice) public payable onlyOwner {
        listingPrice = _ListingPrice;
    }

    /**
     * @dev Returns the current listing fee.
     * @return uint256 The listing fee in Wei.
     */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /**
     * @dev Mints a new NFT, sets its metadata URI, and lists it for sale.
     * @notice Caller must send `listingPrice` as msg.value.
     * @param tokenURI URI for NFT metadata.
     * @param price Sale price for the NFT (in Wei, must be > 0).
     * @return uint256 ID of the newly minted and listed token.
     */
    function createToken(string memory tokenURI, uint256 price) public payable returns (uint256) {
        _tokensIds.increment();
        uint256 newTokenId = _tokensIds.current();

        _mint(msg.sender, newTokenId); // Mint token to caller.
        _setTokenURI(newTokenId, tokenURI); // Set metadata link.
        createMarketItem(newTokenId, price); // List the item for sale.

        return newTokenId;
    }

    /**
     * @dev Internal function to create the market item listing.
     * @notice Transfers NFT from `msg.sender` to this contract. Requires `msg.value == listingPrice`.
     * @param tokenId ID of the token to list.
     * @param price Sale price (in Wei, must be > 0).
     */
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be > 0");
        require(msg.value == listingPrice, "Must pay listing fee");

        // Create and store market item data.
        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),    // Seller is caller.
            payable(address(this)), // Contract owns NFT while listed.
            price,
            false                   // Not sold yet.
        );

        // Transfer NFT from seller to contract.
        _transfer(msg.sender, address(this), tokenId);

        // Emit event for listing.
        emit idMarketItemCreated(tokenId, msg.sender, address(this), price, false);
    }

    /**
     * @dev Relists an NFT that the caller currently owns.
     * @notice Caller must be the current owner and pay the `listingPrice`.
     * @param tokenId ID of the token to relist.
     * @param price New sale price (in Wei).
     */
    function reSellToken(uint256 tokenId, uint256 price) public payable {
        require(idMarketItem[tokenId].owner == msg.sender, "Not owner");
        require(msg.value == listingPrice, "Must pay listing fee");

        // Update market item for relisting.
        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this)); // Contract holds NFT again.
        _itemsSold.decrement(); // Reduce sold count as it's back on market.

        // Transfer NFT from seller back to contract.
        _transfer(msg.sender, address(this), tokenId);
    }

    /**
     * @dev Executes the purchase of a listed NFT.
     * @notice Caller must send Ether equal to the item's `price`.
     * Transfers NFT to buyer, price to seller, and listing fee to owner.
     * @param tokenId ID of the token to buy.
     * @notice Payment logic: Transfers full `price` (msg.value) to seller AND `listingPrice` to owner.
     * The listing fee is paid from the buyer's funds.
     */
    function createMarketSale(uint256 tokenId) public payable {
        uint price = idMarketItem[tokenId].price;
        require(msg.value == price, "Incorrect price paid");

        // Update item state: mark as sold, set new owner.
        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].seller = payable(address(0)); // Clear seller field.
        _itemsSold.increment();

        // Transfer NFT from contract to buyer.
        _transfer(address(this), msg.sender, tokenId);

        // Transfer listing fee to contract owner.
        payable(owner).transfer(listingPrice);
        // Transfer purchase price to the original seller.
        payable(idMarketItem[tokenId].seller).transfer(msg.value); // Seller gets full price.
    }

    /**
     * @dev Fetches all items currently listed for sale (unsold).
     * @return MarketItem[] Array of unsold market items.
     */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokensIds.current();
        uint unsoldItemCount = totalItemCount - _itemsSold.current();
        uint currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        // Iterate through all tokens created.
        for (uint i = 0; i < totalItemCount; i++) {
            // If the contract owns the token, it's listed and unsold.
            if (idMarketItem[i + 1].owner == address(this)) {
                items[currentIndex] = idMarketItem[i + 1];
                currentIndex++;
            }
        }
        return items;
    }

    /**
     * @dev Fetches all NFTs owned by the caller.
     * @return MarketItem[] Array of market items representing NFTs owned by `msg.sender`.
     */
    function fetchMyNFT() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokensIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        // Count items owned by caller.
        for (uint i = 0; i < totalItemCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                itemCount++;
            }
        }

        // Populate array with items owned by caller.
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                items[currentIndex] = idMarketItem[i + 1];
                currentIndex++;
            }
        }
        return items;
    }

    /**
     * @dev Fetches all items that were listed by the caller.
     * @return MarketItem[] Array of market items where `msg.sender` is the seller.
     * @notice This fetches items *ever* listed by the sender, not just currently listed ones.
     */
    function fetchItemsListed() public view returns (MarketItem[] memory) { // Corrected typo
        uint totalCount = _tokensIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        // Count items where caller is the seller.
        for (uint i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                itemCount++;
            }
        }

        // Populate array with items listed by caller.
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                items[currentIndex] = idMarketItem[i + 1];
                currentIndex++;
            }
        }
        return items;
    }
}