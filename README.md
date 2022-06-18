# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## NFT MarketPlace Smart Contract

A marketplace to for Creators to come and mint thier own NFT / NFT Collections and sell them to users

#### User Flow and Commission Explained

#### _Creation of NFT_

    1. user will first mint an nft and then lists the nft to the marketplace by paying a listing fee which will
       be held by nft marketplace contract
    2. when someone buys that listed nft the Owner will recieve the listing price, and the buyer will get the nft

#### _Selling an NFT which is already brought_

    1. user will call resell() function by paying the listing fee and specifing the nft
       and then when someone buys that listed nft the Owner will recieve the listing price, and the buyer will get the nft
