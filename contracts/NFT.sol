// SPDX-License-Identifier: MIT
// @author: Krtin Shet
// @github: https://github.com/krtinshet

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    address _marketPlaceAddress;

    /*
        @type   Counter
        @desc   Hold the current Number of NFT's in this contract 
     */
    Counters.Counter private _tokenIds;

    /*
        @type   Mapping
        @desc   maps the user addresss to the number of NFT's held by that user 
     */
    mapping(address => uint256[]) private balance;

    // constructor(address marketPlaceAddress) ERC721("Amazing Tokens", "AMAZ") {
    //     _marketPlaceAddress = marketPlaceAddress;
    // }
    constructor(address marketPlaceAddress) ERC721("Amazing Tokens", "AMAZ") {
        _marketPlaceAddress = marketPlaceAddress;
    }

    /*
        @input: tokenId
        @desc   Updates the user's current number of held nft's 
     */
    function updateUsersNFTs(uint256 tokenId) public {
        balance[msg.sender].push(tokenId);
    }

    /*
        @input: msg.sender
        @desc   return all the tokens that belongs to the user 
        @output list of tokenId's 
     */
    function getUserNFTs() public view returns (uint256[] memory) {
        return balance[msg.sender];
    }

    /*
        @input: Token URI
        @output Token ID 
        @desc   Mints the NFT  
     */
    function mint(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        setApprovalForAll(_marketPlaceAddress, true);
        updateUsersNFTs(tokenId);

        return tokenId;
    }

    function noofnftsminted() public view returns (uint256) {
        return _tokenIds.current();
    }
}
