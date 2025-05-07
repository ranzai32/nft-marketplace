// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 public listingPrice = 0.025 ether;
    address payable public owner;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // --- Новые структуры для ставок
    struct Bid {
        address bidder;
        uint256 amount;
        uint256 timestamp;
    }

    // каждая ставка — в массиве по tokenId
    mapping(uint256 => Bid[]) private tokenBids;

    // уже существующие маппинги
    mapping(uint256 => MarketItem) private idToMarketItem;

    // --- События
    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );
    // Новое событие для ставок
    event BidPlaced(
        address indexed bidder,
        uint256 indexed tokenId,
        uint256 amount
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only marketplace owner");
        _;
    }

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    /* обновление стоимости листинга */
    function updateListingPrice(uint256 _listingPrice) external onlyOwner {
        listingPrice = _listingPrice;
    }

    /* возвращает цену листинга */
    function getListingPrice() external view returns (uint256) {
        return listingPrice;
    }

    /* чек истории ставок для токена */
    function getBidHistory(uint256 tokenId) external view returns (Bid[] memory) {
        return tokenBids[tokenId];
    }

    /* --- Новый метод: сделать ставку по токену */
    function placeBid(uint256 tokenId) external payable {
        // проверьте, что лот ещё выставлен
        MarketItem storage item = idToMarketItem[tokenId];
        require(item.owner == address(this), "Item not for sale");
        require(msg.value > 0, "Bid must be > 0");

        // сохраняем ставку
        tokenBids[tokenId].push(Bid({
            bidder: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        }));

        emit BidPlaced(msg.sender, tokenId, msg.value);
    }

    /* mint + листинг */
    function createToken(string memory tokenURI, uint256 price)
        external
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _createMarketItem(newTokenId, price);
        return newTokenId;
    }

    function _createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price > 0");
        require(msg.value == listingPrice, "Send listing price");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);
    }

    /* реселл */
    function resellToken(uint256 tokenId, uint256 price) external payable {
        MarketItem storage item = idToMarketItem[tokenId];
        require(item.owner == msg.sender, "Not item owner");
        require(msg.value == listingPrice, "Send listing price");

        item.sold = false;
        item.price = price;
        item.seller = payable(msg.sender);
        item.owner = payable(address(this));
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    /* покупка */
    function createMarketSale(uint256 tokenId) external payable {
        MarketItem storage item = idToMarketItem[tokenId];
        require(msg.value == item.price, "Send asking price");

        item.owner = payable(msg.sender);
        item.sold = true;
        item.seller = payable(address(0));
        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        // комиссия маркетплейса
        payable(owner).transfer(listingPrice);
        // перевод продавцу
        payable(item.seller).transfer(msg.value);
    }

    /* fetchMarketItems, fetchMyNFTs, fetchItemsListed — без изменений */
    function fetchMarketItems() external view returns (MarketItem[] memory) {
        uint256 total = _tokenIds.current();
        uint256 unsold = total - _itemsSold.current();
        uint256 idx = 0;
        MarketItem[] memory items = new MarketItem[](unsold);
        for (uint256 i = 1; i <= total; i++) {
            if (idToMarketItem[i].owner == address(this)) {
                items[idx++] = idToMarketItem[i];
            }
        }
        return items;
    }

    function fetchMyNFTs() external view returns (MarketItem[] memory) {
        uint256 total = _tokenIds.current();
        uint256 count = 0;
        for (uint256 i = 1; i <= total; i++) {
            if (idToMarketItem[i].owner == msg.sender) count++;
        }
        MarketItem[] memory items = new MarketItem[](count);
        uint256 idx = 0;
        for (uint256 i = 1; i <= total; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                items[idx++] = idToMarketItem[i];
            }
        }
        return items;
    }

    function fetchItemsListed() external view returns (MarketItem[] memory) {
        uint256 total = _tokenIds.current();
        uint256 count = 0;
        for (uint256 i = 1; i <= total; i++) {
            if (idToMarketItem[i].seller == msg.sender) count++;
        }
        MarketItem[] memory items = new MarketItem[](count);
        uint256 idx = 0;
        for (uint256 i = 1; i <= total; i++) {
            if (idToMarketItem[i].seller == msg.sender) {
                items[idx++] = idToMarketItem[i];
            }
        }
        return items;
    }
}

