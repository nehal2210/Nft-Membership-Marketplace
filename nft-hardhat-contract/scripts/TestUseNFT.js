const hre = require("hardhat");
const {MembershipMarketAddress} = require("../config") 
const {callUseNft} = require("./request")


async function main() {

    const accounts = await hre.ethers.getSigners();
    const MarketCreator = accounts[1]
    const buyer  = accounts[0]
    const NftCreator = accounts[2]


    console.log("Market Creator address ",MarketCreator.address)
    console.log("Macdonald NftCreator address ",NftCreator.address)
    console.log("buyer address ",buyer.address)
    
    const MembershipMarket = await hre.ethers.getContractAt("MembershipMarket", MembershipMarketAddress, MarketCreator);
    

      // put your nft from the url of your nft
    const nft = "0xa285ea87943dbDfd5f657faB79FcD4304b60014b"
      // you can copy the metadata url from your browser in your nft detail page and put it here
    const tokenUri = "https://magenta-distinct-guan-162.mypinata.cloud/ipfs/bafkreigj43lv7oqwbbh7ghoeikk4kwdoatayf3ndcqfwygmabr55fb7hfq"
    
    // put your nft token from the url of your nft
    const tokenId = "0"
    //amount is in the metaData but we missed it in the UI
    const amountUsed = "10"
    
    console.log("Now Buyer is using NFT by calling use NFt (it is simple now but will make it in a way in which company and buyer both mutually agrred on it)")
console.log("It will change metaData Details according to buyer usecase like how much amount buyer used")

    await callUseNft(amountUsed, tokenId,tokenUri,nft,"","");
  
    const nftContract = await hre.ethers.getContractAt("NFT", nft, buyer);
    const new_tUri = await nftContract.tokenURI(hre.ethers.utils.parseEther(tokenId));
    console.log("token URI is changed Now you can look into this ",new_tUri)





    //Conversions are not going to work
    // const usdPerMatic = await MembershipMarket.getMatictoUSD(hre.ethers.utils.parseEther("1"));
    // console.log("usd per matic is ",hre.ethers.utils.formatEther(usdPerMatic))
    

    // console.log("Macdonald Creating his  Nft Memberships of price 0.01 Matic each ")
    // console.log("total supply of Nft is 100")
    // const createNftTx = await MembershipMarket.connect(NftCreator).createNFT("Macdonald", "MC", hre.ethers.utils.parseEther("100") ,hre.ethers.utils.parseEther("0.01"), false,false,hre.ethers.utils.parseEther("0"), hre.ethers.utils.parseEther("0"));
    // await createNftTx.wait();
    
    // const nft = await MembershipMarket.getNftAddress(NftCreator.address)
    
    // console.log("Mcdonald nft created at address: ",nft)
    
    // const nftContract = await hre.ethers.getContractAt("NFT", nft, buyer);
    
    // const supplyLimit = await nftContract.supplyLimit();
    
    // console.log("After creating NFT Contract of specific Company platform will save his details on Pinata ")

    
    // const nftMaticPrice = hre.ethers.utils.formatEther(await MembershipMarket.getNftPrice(nft))


    // console.log("Now Buyer comes to our platform to Buy Mcdonald membership")
    // console.log("First He look Matic Price")
    // maticPriceInUsd = (nftUsdPrice * hre.ethers.utils.formatEther(usdPerMatic))
    // console.log("matic price of NFt ",nftMaticPrice)

    // console.log("Buyer can see all details of company base MetaData")
    // console.log("Buyer MetaData")
    
    
    // console.log("getting token URI")
    // const tokenUri = await nftContract.tokenURI(hre.ethers.utils.parseEther(tokenId));
    // console.log(tokenUri)
    
    // // console.log("Now Buyer is satisfied and he is buying NFT")
    // const buyNftTx = await MembershipMarket.connect(buyer).buyNftWithNative(buyer.address,nft,tokenUri,{value:hre.ethers.utils.parseEther(nftMaticPrice)})
    // await buyNftTx.wait()
    
    // console.log("we set the above URI to buyer tokenId")
    
    // const balanceOfBuyer = await nftContract.balanceOf(buyer.address)
    // console.log("balance of buyer nft ",balanceOfBuyer);
    
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
