import axios from "axios";
import { SXT_API_DML_URL, SXT_API_DQL_URL } from "../constants";
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
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
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
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
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
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
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
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
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
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
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

    const url = SXT_API_DML_URL

   const payload = { 
        "resourceId": "MARKET.NEWPROVIDER",
        "sqlText": `INSERT INTO  MARKET.NEWPROVIDER (nft, provider, logo,base_meta_data_URI, total_supply, nft_price) VALUES ('0x07dbC5662442cdD6F7461982D493788FcC70A572','0x8167c75B006819DCE12E106344b1849c7144B623', 'QmZhYbUgzQNjJHiAmEjNzChY4hoRLmheyyHAJAh8BUuGPt','QmQprRZRMU7vNjh2sbGByrZrtVHhTLx3pboYoWbbpa7rCt',100,0.01)`
        
    }

    headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        res = await axios.post(url,payload,{headers:headers})
        console.log(res.data)
    } 
    catch(e){
        console.log("error in getting provider data")
    }
}


    async function insertNftData(nftData){

        const url = SXT_API_DML_URL
    
       const payload = { 
            "resourceId": "MARKET.NEWTOKEN",
            "sqlText": `INSERT INTO MARKET.NEWTOKEN (id, nft, owner, used_count, resold_count, total_royalty, mint_date, expire_date, token_id) VALUES (0,'0x07dbC5662442cdD6F7461982D493788FcC70A572', '0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623',0,0,0, 1685206597, 1716828751, 0)`
            
        }
    
        headers = {
            "accept": "application/json",
            "biscuit": process.env.REACT_APP_BISCUIT,
            "content-type": "application/json",
            "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
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
    getNftData

}