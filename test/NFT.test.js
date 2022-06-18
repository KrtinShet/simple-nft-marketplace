// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("NFT Smart Contract", () => {
//   let NFT, nft, nftContractAddress;
//   let Marketplace, marketplace, marketplaceAddress;

//   describe("NFT Basic tests", () => {
//     it("Should create NFT Smart Contract", async function () {
//       //deploy MarketPalce Contracts now
//       Marketplace = await ethers.getContractFactory("Marketplace");
//       marketplace = await Marketplace.deploy();
//       await marketplace.deployed();
//       marketplaceAddress = marketplace.address;

//       //deploy nft contrtacts now
//       NFT = await ethers.getContractFactory("NFT");
//       nft = await NFT.deploy(marketplaceAddress);
//       await nft.deployed();
//       nftContractAddress = nft.address;
//     });
//     it("should have name and  token name", async () => {
//       const Name = "Amazing Tokens";
//       const tokenName = "AMAZ";
//       expect(await nft.name()).to.equal(Name);
//       expect(await nft.symbol()).to.equal(tokenName);
//     });
//   });

//   describe("NFT Functional Test", () => {
//     describe("getUserNFTs()", () => {
//       it("returns zero initally", async () => {
//         const currentnfts = await nft.getUserNFTs();
//         expect(currentnfts.length).to.equal(0);
//       });
//     });

//     describe("mint()", () => {
//       it("mints first token", async () => {
//         const tokenId1 = await nft.mint("token1");
//         let getusernft = await nft.getUserNFTs();
//         expect(getusernft.length).to.equal(1);
//       });
//       it("mints Second token", async () => {
//         const tokenId2 = await nft.mint("token2");
//         getusernft = await nft.getUserNFTs();
//         expect(getusernft.length).to.equal(2);
//       });
//     });
//   });
// });
