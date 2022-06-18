const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("MarketPlace", () => {
  let Marketplace, marketplace, marketplaceAddress;
  let Owner, Addr1, Addr2;
  let NFT, nft, nftContractAddress;
  let auctionPrice = ethers.utils.parseUnits("2", "ether");
  let listingPrice = ethers.utils.parseUnits("0.025", "ether");

  it("should Create and deploy contract and get Signers", async () => {
    let [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    Owner = owner;
    Addr1 = addr1;
    Addr2 = addr2;

    //deploy MarketPalce Contracts now
    Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy();
    await marketplace.deployed();
    marketplaceAddress = marketplace.address;

    //deploy nft contrtacts now
    NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy(marketplaceAddress);
    await nft.deployed();
    nftContractAddress = nft.address;

    // console.log(await Owner.getBalance());
  });

  describe("Basic Functionalities", () => {
    it("returns Onwer", async () => {
      const ownerAddr = await marketplace.getOwner();
      expect(ownerAddr).to.equal(Owner.address);
    });

    it("returns listing price", async () => {
      expect(await marketplace.getListingPrice()).to.equal(listingPrice);
    });

    it("updates Listing Price and Sets it back to Original", async () => {
      const OldListingPrice = "0.025";
      const NewListingPrice = "0.05";
      const wei = ethers.utils.parseEther(NewListingPrice);
      const Owei = ethers.utils.parseEther(OldListingPrice);

      await marketplace.setListingPrice(wei);
      expect(await marketplace.getListingPrice()).to.equal(wei);

      await marketplace.setListingPrice(Owei);
      expect(await marketplace.getListingPrice()).to.equal(Owei);
    });
  });

  describe("createMarketPlaceItem", () => {
    //  1.create an nft
    //  2.check for MarketplaceItemCreated event with appropriate fields
    //  3.check if the balance of owner increases by listing price
    let minted_nft1;
    let market_item1;
    it("Creates nft from nft contract", async () => {
      minted_nft1 = await nft.mint("ipfs://als23aes3a34333z4e.json");
      // console.log(await nft.ownerOf(1));
      // console.log(Owner.address);
      // console.log(await nft.noofnftsminted());
      expect(minted_nft1).to.not.equal(null);
    });

    it("lists the NFT to marketplace", async () => {
      const marketsOriginalBalance = await marketplace.getBalance();
      const marketsFinalBalance = marketsOriginalBalance + listingPrice;
      market_item1 = await marketplace
        // .connect(Addr1)
        .createMarketplaceItem(nftContractAddress, 1, auctionPrice, {
          value: listingPrice,
        });

      const receipt = await market_item1.wait();
      expect(await marketplace.getBalance()).to.equal(marketsFinalBalance);
      const events = receipt.events.find(
        (event) => event.event === "MarketplaceItemCreated"
      ).args;

      expect(events.itemId).to.equal(1);
      expect(events.nftContract).to.equal(nftContractAddress);
      expect(events.tokenId).to.equal(1);
      expect(events.seller).to.equal(Owner.address);
      expect(events.owner).to.equal(ethers.constants.AddressZero);
      expect(events.price).to.equal(auctionPrice);
      expect(events.sold).to.equal(false);
    });
  });

  describe("createMarketplaceItemSale", () => {
    // buy the maket place item from Addr1(user2)
    it("makes a sale in the marketplace", async () => {
      // const marketsOriginalBalance = await marketplace.getBalance();
      // const marketsFinalBalance = Number(marketsOriginalBalance) + listingPrice;
      // console.log(Addr1.)
      const itemsaletrxn = await marketplace
        .connect(Addr1)
        .createMarketplaceItemSale(nftContractAddress, 1, {
          value: auctionPrice,
        });

      //expect the value of marketplace to current value + listing price
      // const marketplaceBalance = await marketplace.getBalance();
      // console.log(marketplaceBalance);
      // expect(marketplaceBalance).to.equal(marketsFinalBalance);
    });
  });
});
