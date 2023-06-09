import axios from "axios";
import { SXT, SXT_API_BASE_URL, SXT_API_DML_URL, SXT_API_DQL_URL, USER_ID } from "../constants";
import SpaceAndTimeSDK from "./SpaceAndTimeSDK.js";
import dotenv from "dotenv"
dotenv.config()
const initSDK = SpaceAndTimeSDK.init();

const REACT_APP_SXT_ACCESS_TOKEN = "Bearer eyJ0eXBlIjoiYWNjZXNzIiwia2lkIjoiNGE2NTUwNjYtZTMyMS00NWFjLThiZWMtZDViYzg4ZWUzYTIzIiwiYWxnIjoiRVMyNTYifQ.eyJpYXQiOjE2ODYzMTA4NDYsIm5iZiI6MTY4NjMxMDg0NiwiZXhwIjoxNjg2MzEyMzQ2LCJ0eXBlIjoiYWNjZXNzIiwidXNlciI6Im5laGFsIiwic3Vic2NyaXB0aW9uIjoiMzMwNWM4ZDctYTRlOC00MWM1LWI5OGUtYjVhZmI5OTFkNjhkIiwic2Vzc2lvbiI6IjdjYjdhYjZmNTQ2MjNkMmJmMmRhYTUzMCIsInNzbl9leHAiOjE2ODYzOTcyNDYwNTUsIml0ZXJhdGlvbiI6Ijc1NTc5OGI2MjViZTBiOWQ2M2Y5YzllMCJ9.RxPMVaHSaIZAeSFMYL3-sy-KHdLti-A4naZ7-uMXL6X8DanexMuj7fkBjYvfGPKGQ-zF23C9ZYD4hN5CaslHNA"


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
        "authorization": REACT_APP_SXT_ACCESS_TOKEN
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
        "authorization": REACT_APP_SXT_ACCESS_TOKEN
        // "authorization": REACT_APP_SXT_ACCESS_TOKEN
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
        "authorization": REACT_APP_SXT_ACCESS_TOKEN
   
    }

    
    try{
        var res = await axios.post(url,payload,{headers:headers})
        console.log(res.data);
        return({
            status: res.status,
            data: res.data
        })
    } 
    catch(e){
        console.log("error in getting provider data")
    }

    return({
        status: 401,
        data: {}
    })

}


async function getAllNftData(){

    const url = SXT_API_DQL_URL

   const payload = { 
        "resourceId": "MARKET.NEWTOKEN",
        "sqlText": "SELECT * FROM MARKET.NEWTOKEN"
        
    }

    var headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        let res = await axios.post(url,payload,{headers:headers})
        return {
            status: res.status,
            data:res.data
        }
    } 
    catch(e){
        console.log("error in getting provider data")
    }

    return {
        status: 404,
        data:''
    }

}




async function getNftTableId(){

    const url = SXT_API_DQL_URL

   const payload = { 
        "resourceId": "MARKET.NEWTOKEN",
        "sqlText": "SELECT COUNT(id) FROM MARKET.NEWTOKEN"
        
    }

    var headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        let res = await axios.post(url,payload,{headers:headers})
        return {
            status: res.status,
            data:res.data
        }
    } 
    catch(e){
        console.log("error in getting provider data")
    }

    return {
        status: 401 ,
        data:""
    }

}




async function getProviderNftData(creator){

    const url = SXT_API_DQL_URL

   const payload = { 
        "resourceId": "MARKET.NEWPROVIDER",
        "sqlText": `SELECT * FROM MARKET.NEWPROVIDER INNER JOIN MARKET.NEWTOKEN ON MARKET.NEWTOKEN.nft=MARKET.NEWPROVIDER.nft WHERE MARKET.NEWPROVIDER.provider = ${creator}`
        
    }

    var headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        let res = await axios.post(url,payload,{headers:headers})
        console.log(res.data)
        return {
            status: res.status,
            data:res.data
        }
    } 
    catch(e){
        console.log("error in getting provider data")   
        
    }

    return {
        status: 401 ,
        data:""
    }


}


async function getProviderNftOwner(owner){

    const url = SXT_API_DQL_URL

   const payload = { 
        "resourceId": "MARKET.NEWPROVIDER",
        "sqlText": `SELECT * FROM MARKET.NEWPROVIDER INNER JOIN MARKET.NEWTOKEN ON MARKET.NEWTOKEN.nft=MARKET.NEWPROVIDER.nft WHERE MARKET.NEWTOKEN.owner = '${owner}' `
        
    }

    var headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        let res = await axios.post(url,payload,{headers:headers})
        return {
            status: res.status,
            data:res.data
        }
    } 
    catch(e){
        console.log("error in getting provider data")
    }
    return {
        status: 401,
        data:''
    }

}


async function insertProviderData(providerData){
    console.log("token",REACT_APP_SXT_ACCESS_TOKEN)
    const url = SXT_API_DML_URL

   const payload = { 
        "resourceId": "MARKET.NEWPROVIDER",
        "sqlText": `INSERT INTO  MARKET.NEWPROVIDER (nft, provider, logo,base_meta_data_URI, total_supply, nft_price) VALUES ('${providerData.nft}','${providerData.provider}', '${providerData.logo}','${providerData.base_meta_data_URI}',${providerData.total_supply},${providerData.nft_price})`
        
    }

    var headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        const res = await axios.post(url,payload,{headers:headers})
        return true
    } 
    catch(e){
        console.log("error in Insertingprovider data")
    }
    return false
}


    async function insertNftData(nftData){

        const url = SXT_API_DML_URL
    
       const payload = { 
            "resourceId": "MARKET.NEWTOKEN",
            "sqlText": `INSERT INTO MARKET.NEWTOKEN (id, nft, owner, used_count, resold_count, total_royalty, mint_date, expire_date, token_id) VALUES (${nftData.id},'${nftData.nft}', '${nftData.owner}',${nftData.used_count},${nftData.resold_count},${nftData.total_royalty}, ${nftData.mint_date}, ${nftData.expire_date}, ${nftData.token_id})`
            
        }
    
        var headers = {
            "accept": "application/json",
            "biscuit": process.env.REACT_APP_BISCUIT,
            "content-type": "application/json",
            "authorization": REACT_APP_SXT_ACCESS_TOKEN
        }
    
        
        try{
            let res = await axios.post(url,payload,{headers:headers})
           return true
        } 
        catch(e){
            console.log("error in getting provider data")
        }
    
        return false


}



// async function requestAuthCode(){


//     const url = SXT_API_BASE_URL + "auth/code"
//      const user_id = "nehal"
//      // const org_code = ""

//      const payload = {
//          "userId": user_id
//      }
     
//      const headers = {"accept": "application/json"}
    
//      // """ joinCode is now optional with SxT Beta Release. If supplied it will connect your account to the relevant subscription
//      // payload = {
//      //     "userId": user_id,
//      //     "joinCode": org_code
//      // }"""
 
//      try{
         
//          const res = await axios.post(url, payload, {headers:headers})
 
//          if (res.status === 200) {
//              return res.data.authCode
//          }
         
//      }
//     catch(e){
//      console.log(e)
//     }
 
//      return null
 
  
//  }
 
 
 
 
 
//   const signMessage = async () => {

//     // const authCode = "6f32191db0b3fbd0e4bb9aec"
//      // Convert the auth code to bytes for signing
//     // Get bytes of the auth code for signing

//     // const bytesMessage = (decodeUTF8(authCode));
//     // console.log(bytesMessage);

//     // // Decode the private key for signing
//     // const userPrivateKey = process.env.REACT_APP_SXT_USER_PRIVATE_KEY;
//     // const privateKey = decodeBase64(userPrivateKey);
//     // console.log(privateKey);

//     // // Generate the signature
//     // const signatureBytes = nacl.sign.detached(bytesMessage, privateKey);
//     // const signature = encodeBase64(signatureBytes);

//     // console.log("Signature | hashed message, base64:", signature);
//     // console.log("Signature, base64:", signature.slice(0, 88));


//     // console.log("Signature | hashed message, hex:", signedMessage);
//     // console.log("Signature, hex:", signedMessage.slice(0, 64));
    
//     // return signedMessage.slice(0, 64);
   
     
 
   
//    }
 
 
 
 
 
 
 
 
//  async function requestToken(auth_code, signed_auth_code){
  
 
//      const url = SXT_API_BASE_URL + "auth/token"
//      const payload = {
//          "userId": USER_ID,
//          "authCode": auth_code,
//          "signature": signed_auth_code,
//          "key": process.env.REACT_APP_SXT_USER_PUBLIC_KEY,
//      }
//      const headers = {"accept": "application/json"}
//      try{
 
//          const res = await axios.post(url, payload,{headers:headers})
//          return {accessToken: res.data["accessToken"],refreshToken:res.data["refreshToken"]}
//      }catch(e){
//          console.log(e)
//      }
 
     
//      return null
     
     
 
    
//  }
 
 
 
//  async function authenticate(){
   
  
 
//      // # 1) Request auth code from SxT API 
//      var auth_code = await requestAuthCode()
//      if (auth_code === null){
//          // use previous authCode
 
 
//      }
//      // console.log("authCode",auth_code)
//      // # 2) Sign the auth code with our private key
//      const signed_auth_code = await signMessage(auth_code)
     
//      // // # 3) Request access token using signed_auth_code 
//      const token = await requestToken(auth_code, signed_auth_code)
//      if (token !== null){
//          return token?.accessToken
//      }
 
//      return null
 
//  }
 

// async  function validateToken(token){
//     const url = SXT_API_BASE_URL + "auth/validtoken"
//     const headers = {
//         "accept": "*/*",
//         "authorization": `Bearer ${token}`
//     }  

//     const res = await axios.get(url,{headers:headers});
//     console.log(res);
//  }

async function getSxTAccessToken(){

    let [ tokenResponse, tokenError ] = await initSDK.AuthenticateUser(process.env.REACT_APP_SXT_USER_PRIVATE_KEY,process.env.REACT_APP_SXT_USER_PUBLIC_KEY);
if(!tokenError){ 
    console.log(tokenResponse.accessToken)
return tokenResponse.accessToken

} 
else {
console.log('Invalid User Tokens Provided');
console.log(tokenError);
return ""
}

}


export {
    getProviderData,
    getAllProviderData,
    getProviderNftData,
    getAllNftData,
    getNftData,
    insertProviderData,
    insertNftData,
    getNftTableId,
    getProviderNftOwner,
    getSxTAccessToken

}

// https://magenta-distinct-guan-162.mypinata.cloud/ipfs/bafkreih53vgianmjgkayvtkmfkqy7tke5bqlsio6pfh4d4w22u5yrjhxgq