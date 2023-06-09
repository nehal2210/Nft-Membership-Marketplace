// const { network, ethers } = require("hardhat");
// const { verify } = require("../utils/verify");
const fs = require("fs");
const hre = require("hardhat");

async function main() {
  
  // const mockUsdAddress = fs
    // .readFileSync("deployedAddress.txt")
    // .toString()
    // .split("\n")[0]
    // .split("=")[1];
//   console.log(mockUsdAddress);

  // const mockV3AggregatorAddress = fs
  //   .readFileSync("deployedAddress.txt")
  //   .toString()
  //   .split("\n")[1]
  //   .split("=")[1];
  // console.log("priceFeed Address",mockV3AggregatorAddress);
 

    // The oracle address on Polygon Mumbai
    // See https://docs.chain.link/chainlink-functions/supported-networks
    // for a list of supported networks and addresses.
    const oracleAddress = "0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4";
    const  AggregatorV3Address = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada";

    // Set your contract name.
    const contractName = "MembershipMarket";
    //const contractName = "MyFirstContract"
  
    const [deployer] = await ethers.getSigners();
  
    console.log("Account address:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const consumerContract = await hre.ethers.getContractFactory(contractName);
  
    const deployedContract = await consumerContract.deploy(AggregatorV3Address ,oracleAddress);
  
    await deployedContract.deployed();

    console.log("Deployed Functions Consumer address:", deployedContract.address);


  

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
