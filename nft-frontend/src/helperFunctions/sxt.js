import axios from "axios";
import { SXT, SXT_API_BASE_URL, SXT_API_DML_URL, SXT_API_DQL_URL, USER_ID } from "../constants";
import nacl from "tweetnacl";
import { decodeUTF8, encodeUTF8, encodeBase64,decodeBase64 } from "tweetnacl-util";
import crypto from"crypto"
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
        "authorization": 'Bearer eyJ0eXBlIjoiYWNjZXNzIiwia2lkIjoiNGE2NTUwNjYtZTMyMS00NWFjLThiZWMtZDViYzg4ZWUzYTIzIiwiYWxnIjoiRVMyNTYifQ.eyJpYXQiOjE2ODYxNzY1MDQsIm5iZiI6MTY4NjE3NjUwNCwiZXhwIjoxNjg2MTc4MDA0LCJ0eXBlIjoiYWNjZXNzIiwidXNlciI6Im5laGFsIiwic3Vic2NyaXB0aW9uIjoiMzMwNWM4ZDctYTRlOC00MWM1LWI5OGUtYjVhZmI5OTFkNjhkIiwic2Vzc2lvbiI6ImY3YmY1NmUyYjA3M2VmMmEwM2VlZWExMyIsInNzbl9leHAiOjE2ODYyNjI5MDQ1NTYsIml0ZXJhdGlvbiI6ImY4MjM4YzgzMGQxZjU0MTI4OTM1NTZjZiJ9.irdEbJgC5q1M0ge0dqFRW9gKRH0ab4kecqM3Kj4UteZJh7ewcoc7pAWXFSoOpXTPyjj8nqf_kOiHnPaSMppHGA'
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



async function requestAuthCode(){


    const url = SXT_API_BASE_URL + "auth/code"
     const user_id = "nehal"
     // const org_code = ""

     const payload = {
         "userId": user_id
     }
     
     const headers = {"accept": "application/json"}
    
     // """ joinCode is now optional with SxT Beta Release. If supplied it will connect your account to the relevant subscription
     // payload = {
     //     "userId": user_id,
     //     "joinCode": org_code
     // }"""
 
     try{
         
         const res = await axios.post(url, payload, {headers:headers})
 
         if (res.status === 200) {
             return res.data.authCode
         }
         
     }
    catch(e){
     console.log(e)
    }
 
     return null
 
  
 }
 
 
 
 
 
  const signMessage = async () => {

    // const authCode = "6f32191db0b3fbd0e4bb9aec"
     // Convert the auth code to bytes for signing
    // Get bytes of the auth code for signing

    // const bytesMessage = (decodeUTF8(authCode));
    // console.log(bytesMessage);

    // // Decode the private key for signing
    // const userPrivateKey = process.env.REACT_APP_SXT_USER_PRIVATE_KEY;
    // const privateKey = decodeBase64(userPrivateKey);
    // console.log(privateKey);

    // // Generate the signature
    // const signatureBytes = nacl.sign.detached(bytesMessage, privateKey);
    // const signature = encodeBase64(signatureBytes);

    // console.log("Signature | hashed message, base64:", signature);
    // console.log("Signature, base64:", signature.slice(0, 88));


    // console.log("Signature | hashed message, hex:", signedMessage);
    // console.log("Signature, hex:", signedMessage.slice(0, 64));
    
    // return signedMessage.slice(0, 64);
   
     
 
   
   }
 
 
 
 
 
 
 
 
 async function requestToken(auth_code, signed_auth_code){
  
 
     const url = SXT_API_BASE_URL + "auth/token"
     const payload = {
         "userId": USER_ID,
         "authCode": auth_code,
         "signature": signed_auth_code,
         "key": process.env.REACT_APP_SXT_USER_PUBLIC_KEY,
     }
     const headers = {"accept": "application/json"}
     try{
 
         const res = await axios.post(url, payload,{headers:headers})
         return {accessToken: res.data["accessToken"],refreshToken:res.data["refreshToken"]}
     }catch(e){
         console.log(e)
     }
 
     
     return null
     
     
 
    
 }
 
 
 
 async function authenticate(){
   
  
 
     // # 1) Request auth code from SxT API 
     var auth_code = await requestAuthCode()
     if (auth_code === null){
         // use previous authCode
 
 
     }
     // console.log("authCode",auth_code)
     // # 2) Sign the auth code with our private key
     const signed_auth_code = await signMessage(auth_code)
     
     // // # 3) Request access token using signed_auth_code 
     const token = await requestToken(auth_code, signed_auth_code)
     if (token !== null){
         return token?.accessToken
     }
 
     return null
 
 }
 

async  function validateToken(token){
    const url = SXT_API_BASE_URL + "auth/validtoken"
    const headers = {
        "accept": "*/*",
        "authorization": `Bearer ${token}`
    }  

    const res = await axios.get(url,{headers:headers});
    console.log(res);
 }


export {
    getProviderData,
    getAllProviderData,
    getProviderNftData,
    getAllNftData,
    getNftData,
    insertProviderData,
    signMessage

}