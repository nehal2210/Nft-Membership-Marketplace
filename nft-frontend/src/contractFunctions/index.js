import { MEMBERSHIP_MARKET_ADDRESS } from "../contracts/Address";
import { MEMBERSHIP_MARKET_ABI } from "../contracts/ABI/membershipMarketAbi";
import { ethers } from "ethers";
import { CATEGORY } from "../constants";




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
    getNftPrice
}