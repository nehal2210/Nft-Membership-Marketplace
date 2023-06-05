const hre = require("hardhat");
const {MembershipMarketAddress} = require("../config") 
const {callUseNft} = require("./request")




// async function processingAfterTokenURISet(tokenCID,nft,tokenId){
  
// // call pinata API

//   try{

//     // updating used count in sxt
//     const sqlText = `UPDATE MARKET.NEWTOKEN SET used_count = ${NftJson.data.attributes[ATTRIBUTES.USED_COUNT].value} WHERE token_id = ${tokenId} AND nft = '${nft}' `
//     const  payload = {
//           "resourceId": "MARKET.NEWTOKEN",
//           "sqlText": sqlText
//       }
     
//        const  headers = {
//              "accept": "application/json",
//              "biscuit": biscuit,
//              "content-type": "application/json",
//              "authorization": `Bearer ${accessToken}`
//          }
 
         
//          const sxtUpdate = await axios.post({
//            url: SXT_API_DML_URL,
//            method: 'POST',
//            headers: headers,
//            timeout: 9000,
//            data: payload})
 
//          console.log("Running qu")
//          if (sxtUpdate.status !== 200) {
//            throw "problem occur in sxt update"
//          }
//         }
//         catch(e){
//           console.log("error in updating in sxt")
//         }
// try{
//   const deleteNft = await axios.delete(
//     `https://api.pinata.cloud/pinning/unpin/${tokenCID}`,
//       { 
//         headers: { 
//           'Authorization': accessTokenOfPinata
//       }
//     })
    
//       console.log("delete NFt")
//       // console.log(deleteNft)

//  }

// catch (e) {
//     console.log("error in deleting")
//     }

    
// }



// async function BuyNft(){
//    // updating owner, total_royalty and resold_count in sxt
// const sqlText = `INSERT INTO MARKET.TOKEN (id, nft, owner, used_count, resold_count, total_royalty, mint_date, expire_date, token_id) VALUES (${id},'${nft}', '${newOwner}',0,0,0, ${MintDate}, ${ExpireDate}, ${tokenId})`
    

// const  insert_payload = {
//   "resourceId": "MARKET.TOKEN",
//   "sqlText": sqlText
// }
    
// const  insert_headers = {
//       "accept": "application/json",
//       "biscuit": biscuit,
//       "content-type": "application/json",
//       "authorization": `Bearer ${accessToken}`
//   }

        
//     const sxtInsert = await Functions.makeHttpRequest({
//           url: SXT_API_DML_URL,
//           method: 'POST',
//           headers: insert_headers,
//           timeout: 9000,
//           data: insert_payload})

//     if(sxtInsert.status !== 200) {throw "problem occur in sxt insert"}

// }



async function main() {

    const accounts = await hre.ethers.getSigners();
    const MarketCreator = accounts[2]
    const buyer  = accounts[0]
    const NftCreator = accounts[1]


    console.log("Market Creator address ",MarketCreator.address)
    console.log("NftCreator address ",NftCreator.address)
    console.log("buyer address ",buyer.address)
    
    const MembershipMarket = await hre.ethers.getContractAt("MembershipMarket", MembershipMarketAddress, MarketCreator);
    
    //Conversions are not going to work
    // const usdPerMatic = await MembershipMarket.getMatictoUSD(hre.ethers.utils.parseEther("1"));
    // console.log("usd per matic is ",hre.ethers.utils.formatEther(usdPerMatic))
    
    
    const createNftTx = await MembershipMarket.connect(NftCreator).createNFT("Macdonald", "MC", hre.ethers.utils.parseEther("100") ,hre.ethers.utils.parseEther("0.01"), false,false,hre.ethers.utils.parseEther("0"), hre.ethers.utils.parseEther("0"));
    await createNftTx.wait();
    
    const nft = await MembershipMarket.getNftAddress(NftCreator.address)
    
    console.log("nft address: ",nft)

    const nftContract = await hre.ethers.getContractAt("NFT", nft, buyer);

    const supplyLimit = await nftContract.supplyLimit();

    console.log(ethers.utils.formatEther(supplyLimit))
    
    const nftMaticPrice = hre.ethers.utils.formatEther(await MembershipMarket.getNftPrice(nft))
    
    // maticPriceInUsd = (nftUsdPrice * hre.ethers.utils.formatEther(usdPerMatic))
    console.log("matic price of NFt ",nftMaticPrice)


    const tokenUri = "https://magenta-distinct-guan-162.mypinata.cloud/ipfs/bafkreifyhdvkwvcavjhxgibb7yk7tnhimd75qqglspncj5hun5oi47yxae"
    const buyNftTx = await MembershipMarket.connect(buyer).buyNftWithNative(buyer.address,nft,tokenUri,{value:hre.ethers.utils.parseEther(nftMaticPrice)})
    await buyNftTx.wait()


    const balanceOfBuyer = await nftContract.balanceOf(buyer.address)
    console.log("balance of buyer nft",balanceOfBuyer);

    
    const tokenId = "0"
    // const tUri = await nftContract.tokenURI(hre.ethers.utils.parseEther(tokenId));
    // console.log("token uri ",tUri)
  
    console.log("calling use NFt")

    // let tx = await MembershipMarket.connect(buyer).settokenURI("Hello",tokenId,nft)
    // await tx.wait()

    await callUseNft(tokenId,tokenUri,nft,"","");
  
    const new_tUri = await nftContract.tokenURI(hre.ethers.utils.parseEther(tokenId));
    console.log("token uri ",new_tUri)
  


    //   console.log("Before WithDraw Balance",await ToDo.getBalance())
//   const tx  = await ToDo.withDraw()
//   await tx.wait()

//   console.log("after WithDraw Balance",await ToDo.getBalance())


  //   const todo = await ToDo.deploy();

//   await todo.deployed();

//   console.log("ToDo is deployed at",todo.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
