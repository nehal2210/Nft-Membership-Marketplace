# Grandeur With Hardhat


## Note: 
**If you want to test Use NFT functionality in our smart contract, then after the installation of node_modules please directly run the last command** 

## Install Dependencies

```
npm install
```

## Deploy MembershipContract on Polygon

```
npx hardhat deploy scripts/deploy-MembershipMarket.js
```

## you can Fund your Contract

```
npx hardhat run scripts/functions-sub.js
```

## Change Config
Please go to the config file and change the address of the contract and subscription ID.

## Use Functionality Of Membership Market

if you want to test **Use Functionality** of Membrship market then run
```
npx hardhat run scripts/TestUseNFT.js
```

## Note
All the functionalites are integrated in the dapp, we will write the test cases soon.
