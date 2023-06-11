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

if you want to test **Use Functionality** of Membrship market then you first need to fill all the fields in .envsample and save it as .env.
the update table command of space and time will not work in the UseNft.js file because you did not have my private key so you to comment all the lines related to update table ib the UseNFT.js file.
after that you have to put your NFT metadata url given by dapp to TestUseNFT.js file in tokenURI variable also put your tokenID as well.
Both things you can get from your dashboard details nft page url.
 run this command to use your NFT
 
```
npx hardhat run scripts/TestUseNFT.js
```

## Note
All the functionalites are integrated in the dapp, we will write the test cases soon.
