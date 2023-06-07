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

    var headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        var res = await axios.post(url,payload,{headers:headers})
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

    var headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": 'Bearer eyJ0eXBlIjoiYWNjZXNzIiwia2lkIjoiNGE2NTUwNjYtZTMyMS00NWFjLThiZWMtZDViYzg4ZWUzYTIzIiwiYWxnIjoiRVMyNTYifQ.eyJpYXQiOjE2ODYwOTU4NjUsIm5iZiI6MTY4NjA5NTg2NSwiZXhwIjoxNjg2MDk3MzY1LCJ0eXBlIjoiYWNjZXNzIiwidXNlciI6Im5laGFsIiwic3Vic2NyaXB0aW9uIjoiMzMwNWM4ZDctYTRlOC00MWM1LWI5OGUtYjVhZmI5OTFkNjhkIiwic2Vzc2lvbiI6IjEyZWFkZGM4NjhiOThjMDU0OTM1M2RmZiIsInNzbl9leHAiOjE2ODYxODIyNjU1OTAsIml0ZXJhdGlvbiI6ImNhMzdlODVlYzk0OGI5MGM0YjRlZjY0OSJ9.IWNpjA-zxrpt185uirZrbM5xOufhZPzsyZ2NLN4yA4FSomJiVMMPMEFcgIYjR1Oai9TTpCZuxlffsMRTAuwF6w'
        // "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        let res = await axios.post(url,payload,{headers:headers})
        console.log(res.data);
        return({
            status: 200,
            data: res.data
        })
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

    var headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": 'Bearer eyJ0eXBlIjoiYWNjZXNzIiwia2lkIjoiNGE2NTUwNjYtZTMyMS00NWFjLThiZWMtZDViYzg4ZWUzYTIzIiwiYWxnIjoiRVMyNTYifQ.eyJpYXQiOjE2ODYwODk0MDYsIm5iZiI6MTY4NjA4OTQwNiwiZXhwIjoxNjg2MDkwOTA2LCJ0eXBlIjoiYWNjZXNzIiwidXNlciI6Im5laGFsIiwic3Vic2NyaXB0aW9uIjoiMzMwNWM4ZDctYTRlOC00MWM1LWI5OGUtYjVhZmI5OTFkNjhkIiwic2Vzc2lvbiI6ImMxYjI2OGE2NzY4OGRjN2I2ZGQwMWIxMCIsInNzbl9leHAiOjE2ODYxNzU4MDYwMjUsIml0ZXJhdGlvbiI6ImE4NjhiOTk5NmFkODQ2MGMxODhiNmQwNCJ9.fRBC78xFaI37Xz4hw-DxerUo2SR5_TcNxhnr3Bbrlq3iUaS4XJFqduIlSpbNLKLwQJXZf5jbXiZzhAjuB9SQnQ'
        // "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        let res = await axios.post(url,payload,{headers:headers})
        console.log(res.data);
        return({
            status: res.status,
            data: res.data
        })
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

    var headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        let res = await axios.post(url,payload,{headers:headers})
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

    var headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        let res = await axios.post(url,payload,{headers:headers})
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
        "sqlText": `INSERT INTO  MARKET.NEWPROVIDER (nft, provider, logo,base_meta_data_URI, total_supply, nft_price) VALUES ('${providerData.nft}','${providerData.provider}', '${providerData.logo}','${providerData.base_meta_data_URI}',${providerData.total_supply},${providerData.nft_price})`
        
    }

    var headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        let res = await axios.post(url,payload,{headers:headers})
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
    
        var headers = {
            "accept": "application/json",
            "biscuit": process.env.REACT_APP_BISCUIT,
            "content-type": "application/json",
            "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
        }
    
        
        try{
            let res = await axios.post(url,payload,{headers:headers})
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
    insertProviderData

}