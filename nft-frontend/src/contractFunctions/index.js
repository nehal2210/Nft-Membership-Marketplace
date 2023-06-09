// import EthCrypto from 'eth-crypto';
import { MEMBERSHIP_MARKET_ADDRESS } from "../contracts/Address";
import { MEMBERSHIP_MARKET_ABI } from "../contracts/ABI/membershipMarketAbi";
import { ethers } from "ethers";
import { CATEGORY, DON_PUBLIC_KEY } from "../constants";
import { UseNft } from "../ChainlinkFunctionScripts/UseNft";




function getContract(){

    if(window.ethereum){
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
 return new ethers.Contract(MEMBERSHIP_MARKET_ADDRESS,MEMBERSHIP_MARKET_ABI,signer);
}
console.log("PLease Connect your wallet")

}


async function createNFT(data){
    const contract = getContract()
    try{

        let tx  = await contract.createNFT(data.name,data.ComapnySymbol,ethers.utils.parseEther(data.supplyLimit),ethers.utils.parseEther(data.nftPrice),false,false,ethers.utils.parseEther("0"), ethers.utils.parseEther(CATEGORY[data.category]))
        await tx.wait()
    return true
    }
    catch(e){

        console.log(e)
    }
    return false
}

async function buyeNFT(data){
    const contract = getContract()
    try{

        let tx  = await contract.buyNftWithNative(data.to, data.nft, data.tokenUri,{value:ethers.utils.parseEther(data.price.toString())})
        await tx.wait()
    return true
    }
    catch(e){

        console.log(e)
    }
    return false
}







// async function generateOffChainSecrets() {
//     const message = { BEARER_TOKEN: process.env.BEARER_TOKEN };
//     const signature = EthCrypto.sign(
//         process.env.PRIVATE_KEY,
//         EthCrypto.hash.keccak256(JSON.stringify(message))
//     );
//     const payload = { message, signature };
//     const encrypted = await EthCrypto.encryptWithPublicKey(DON_PUBLIC_KEY, JSON.stringify(payload));

//     console.log({
//         '0x0': Buffer.from(EthCrypto.cipher.stringify(encrypted), 'hex').toString('base64')
//     });
// }

// generateOffChainSecrets();

// async function useNFT(data){


//     const contract = getContract()
//     try{

//         const source = UseNft
//         const args = [data?.amountUsed,data?.tokenId,data?.nft,data?.tokenURI]
//         const nft = data?.nft
//         const tokenId = data?.tokenId
//         const gasLimit = 300000; // Transaction gas limit
//         const requestGas = 5500000;
//         const subscriptionId = "1710"

//         let tx  =  await consumerContract.useNft(
//             source,
//             encryptedSecrets ?? "0x",
//             args ?? [], // Chainlink Functions request args
//             subscriptionId, // Subscription ID
//             gasLimit, // Gas limit for the transaction
//             nft,
//             tokenId,
      
//             (overrides = {
//               //Gas limit for the Chainlink Functions request
//               gasLimit: requestGas,
//             })
//           );


//         await tx.wait()


//     return true
    

// }
//     catch(e){

//         console.log(e)
//     }
//     return false
// }




async function getNftAddress(creator){
    const contract = getContract()
    try{

        let address  = await contract.getNftAddress(creator)
    return address
    }
    catch(e){

        console.log(e)
    }
    return "0x0"
}



async function getNftPrice(nft){
    const contract = getContract()
    try{

        let address  = await contract.getNftPrice(nft)
    return address
    }
    catch(e){

        console.log(e)
    }
    return "00"
}




export {
    createNFT,
    getNftAddress,
    getNftPrice,
    buyeNFT
}