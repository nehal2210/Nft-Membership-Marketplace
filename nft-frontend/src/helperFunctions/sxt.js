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


export {
    getProviderData,
    getAllProviderData,
    getProviderNftData,
    getAllNftData,
    getNftData,

}