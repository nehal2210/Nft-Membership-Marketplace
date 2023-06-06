import axios from "axios";
import { SXT_API_DQL_URL } from "../constants";
import dotenv from "dotenv"
dotenv.config()

async function getProviderData(providerAddress){
    const url = SXT_API_DQL_URL

   const payload = { 
        "resourceId": "MARKET.NEWPROVIDER",
        "sqlText": `SELECT * FROM MARKET.NEWPROVIDER WHERE provider = '${providerAddress}' `
        
    }

    headers = {
        "accept": "application/json",
        "biscuit": process.env.BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.SXT_ACCESS_TOKEN
    }

    
    try{
        res = await axios.post(url,payload,{headers:headers})
        console.log(res.data)
    } 
    catch(e){
        console.log("error in getting provider data")
    }
       
    
}


async function getAllProviderData(){

    const url = SXT_API_DQL_URL

   const payload = { 
        "resourceId": "MARKET.NEWPROVIDER",
        "sqlText": "SELECT * FROM MARKET.NEWPROVIDER"
        
    }

    headers = {
        "accept": "application/json",
        "biscuit": process.env.BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.SXT_ACCESS_TOKEN
    }

    
    try{
        res = await axios.post(url,payload,{headers:headers})
        console.log(res.data)
    } 
    catch(e){
        console.log("error in getting provider data")
    }

}


async function getNftData(nftAddress){

    const url = SXT_API_DQL_URL

   const payload = { 
        "resourceId": "MARKET.NEWTOKEN",
        "sqlText": `SELECT * FROM MARKET.NEWTOKEN WHERE nft = '${nftAddress}'`
        
    }

    headers = {
        "accept": "application/json",
        "biscuit": process.env.BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.SXT_ACCESS_TOKEN
    }

    
    try{
        res = await axios.post(url,payload,{headers:headers})
        console.log(res.data)
    } 
    catch(e){
        console.log("error in getting provider data")
    }



}


async function getAllNftData(){

    const url = SXT_API_DQL_URL

   const payload = { 
        "resourceId": "MARKET.NEWTOEKN",
        "sqlText": "SELECT * FROM MARKET.NEWTOEKN"
        
    }

    headers = {
        "accept": "application/json",
        "biscuit": process.env.BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.SXT_ACCESS_TOKEN
    }

    
    try{
        res = await axios.post(url,payload,{headers:headers})
        console.log(res.data)
    } 
    catch(e){
        console.log("error in getting provider data")
    }


}

async function getProviderNftData(){

    const url = SXT_API_DQL_URL

   const payload = { 
        "resourceId": "MARKET.NEWPROVIDER",
        "sqlText": "SELECT * FROM MARKET.NEWPROVIDER INNER JOIN MARKET.NEWTOKEN ON MARKET.NEWTOKEN.nft=MARKET.NEWPROVIDER.nft"
        
    }

    headers = {
        "accept": "application/json",
        "biscuit": process.env.BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.SXT_ACCESS_TOKEN
    }

    
    try{
        res = await axios.post(url,payload,{headers:headers})
        console.log(res.data)
    } 
    catch(e){
        console.log("error in getting provider data")
    }


}



async function insertProviderData(providerData){

    const url = SXT_API_DQL_URL

   const payload = { 
        "resourceId": "MARKET.NEWPROVIDER",
        "sqlText": `INSERT INTO  MARKET.NEWPROVIDER (nft, provider, logo,base_meta_data_URI, total_supply, nft_price) VALUES ('0x07dbC5662442cdD6F7461982D493788FcC70A572','0x8167c75B006819DCE12E106344b1849c7144B623', 'QmZhYbUgzQNjJHiAmEjNzChY4hoRLmheyyHAJAh8BUuGPt','QmQprRZRMU7vNjh2sbGByrZrtVHhTLx3pboYoWbbpa7rCt',100,0.01)`
        
    }

    headers = {
        "accept": "application/json",
        "biscuit": process.env.BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.SXT_ACCESS_TOKEN
    }

    
    try{
        res = await axios.post(url,payload,{headers:headers})
        console.log(res.data)
    } 
    catch(e){
        console.log("error in getting provider data")
    }


}





export {
    getProviderData,
    getAllProviderData,
    getProviderNftData,
    getAllNftData,
    getNftData,

}