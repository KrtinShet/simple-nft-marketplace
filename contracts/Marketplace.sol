// SPDX-License-Identifier: MIT
// @author: Krtin Shet
// @github: https://github.com/krtinshet
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _items;
    Counters.Counter private _soldItems;

    address payable owner;

    uint256 listingPrice = 0.025 ether; // minimum price, change for what you want

    // interface to marketplace item
    struct MarketplaceItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    mapping(uint256 => MarketplaceItem) private idToMarketplaceItem;
    // declare a event for when a item is created on marketplace
    event MarketplaceItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() {
        owner = payable(msg.sender);
        console.log(
            "constructor - MarketPlace Balance: ",
            address(this).balance
        );
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    // returns the listing price of the contract
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function setListingPrice(uint256 newListingPrice) public payable {
        require(msg.sender == owner, "error: you are not the owner ");
        listingPrice = newListingPrice;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // 1.lists the created nft to the marketplace
    function createMarketplaceItem(
        address nftContractAddress,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Error: Price must be atleat 1 wei");
        require(
            msg.value >= listingPrice,
            "Error: Price must be equal to listing price"
        );

        _items.increment();
        uint256 itemId = _items.current();
        //add newly minted NFT to the Marketplace Item Array
        idToMarketplaceItem[itemId] = MarketplaceItem(
            itemId,
            nftContractAddress,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );
        //nft ownership is beging transfered from Marketplace owner to the contract
        IERC721(nftContractAddress).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );
        // Emit the MarketplaceItemCreated Event
        emit MarketplaceItemCreated(
            itemId,
            nftContractAddress,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
        console.log(
            "createMarketPlaceItem() - MarketPlace Balance: ",
            address(this).balance
        );
    }

    // 2. creates the sale of the listed NFT
    // transfers ownership of the NFT and value from marketplace to buyer
    // marketplace owner gets the listing price as a sale is made
    function createMarketplaceItemSale(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToMarketplaceItem[itemId].price;
        uint256 tokenId = idToMarketplaceItem[itemId].tokenId;
        require(msg.value >= price, "Error: Insufficient value sent");
        //transfer the fund(i.e the valueof NFT) from buyer to seller
        idToMarketplaceItem[itemId].seller.transfer(msg.value);
        //transfer the Ownership of the NFT from buyer to seller
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        //Set the msg.sender as the owner in the marketplaceItem
        idToMarketplaceItem[itemId].owner = payable(msg.sender);
        idToMarketplaceItem[itemId].sold = true;
        _soldItems.increment();
        payable(owner).transfer(listingPrice);
    }



    //3. relists the NFT's to the marketplace(have to pay listing fee)
    // and the usual sale procedure will take place
    function resellNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Error: price must be atleat 1 wei");
        require(
            msg.value >= listingPrice,
            "Error: Price must be equal to listing price"
        );
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        MarketplaceItem storage nft = idToMarketplaceItem[tokenId];
        nft.seller = payable(msg.sender);
        nft.owner = payable(address(this));
        nft.sold = false;
        nft.price = price;
        _soldItems.decrement();
    }


    // returns all the unsold listed nft's of the current msg.sender
    function getMyListedNFTs() public view returns (MarketplaceItem[] memory) {
        uint256 currentNFTs = _items.current();
        MarketplaceItem[] memory nfts = new MarketplaceItem[](myListedNFTCount);
        uint256 listedNFTs = 0, i, index;
        for (i = 0; i < currentNFTs; i++) {
            address seller = idToMarketplaceItem[i + 1].seller;
            bool sold = idToMarketplaceItem[i + 1].sold;
            if (seller === msg.sender && !sold) listedNFTs += 1;
        }
        for (i = 0; i < currentNFTs; i++) {
            address seller = idToMarketplaceItem[i + 1].seller;
            bool sold = idToMarketplaceItem[i + 1].sold;
            if (seller === msg.sender && !sold) {
                nfts[index] = idToMarketplaceItem[i+1];
                index += 1;
            }
        }
        return nfts;
    }



    //returns all the unsold listed NFT's in the marketplace
    function getListedNFTs() public view returns(MarketplaceItem[] memory) {
        uint256 itemCount = _items.current();
        uint256 unsoldItemCount = _items.current() - _soldItems.current();
        uint256 index = 0;
        MarketplaceItem[] memory items = new MarketplaceItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketplaceItem[i + 1].owner == address(0)) {
                uint256 currentId = i + 1;
                MarketplaceItem storage currentItem = idToMarketplaceItem[
                    currentId
                ];
                items[index] = currentItem;
                index += 1;
            }
        }
        return items;
        
    }

    // retuns all the owne NFT's of the current msg.sender
    function getOwnedNFTs() public view returns(MarketplaceItem[] memory){
        uint256 NFTCount = _items.current();
        uint256 itemCount = 0;
        uint256 index = 0;

        for (uint256 i = 0; i < NFTCount; i++) {
            if (idToMarketplaceItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketplaceItem[] memory items = new MarketplaceItem[](itemCount);
        for (uint256 i = 0; i < NFTCount; i++) {
            if (idToMarketplaceItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketplaceItem storage currentItem = idToMarketplaceItem[
                    currentId
                ];
                items[index] = currentItem;
                index += 1;
            }
        }
        return items;
    }

}
