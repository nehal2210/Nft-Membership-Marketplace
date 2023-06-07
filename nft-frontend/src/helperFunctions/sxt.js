import axios from "axios";
import { SXT_API_BASE_URL, SXT_API_DML_URL, SXT_API_DQL_URL, USER_ID } from "../constants";
import nacl from "tweetnacl";
import { decodeUTF8, encodeUTF8, encodeBase64,decodeBase64 } from "tweetnacl-util";
import dotenv from "dotenv"
dotenv.config()

async function getProviderData(providerAddress){
    const url = SXT_API_DQL_URL

   const payload = { 
        "resourceId": "MARKET.NEWPROVIDER",
        "sqlText": `SELECT * FROM MARKET.NEWPROVIDER WHERE provider = '${providerAddress}' `
        
    }

    const headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        const res = await axios.post(url,payload,{headers:headers})
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

    const headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        const res = await axios.post(url,payload,{headers:headers})
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

    const headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        const res = await axios.post(url,payload,{headers:headers})
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

    const headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        const res = await axios.post(url,payload,{headers:headers})
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

    const headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        const res = await axios.post(url,payload,{headers:headers})
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

    const headers = {
        "accept": "application/json",
        "biscuit": process.env.REACT_APP_BISCUIT,
        "content-type": "application/json",
        "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
    }

    
    try{
        const res = await axios.post(url,payload,{headers:headers})
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
    
        const headers = {
            "accept": "application/json",
            "biscuit": process.env.REACT_APP_BISCUIT,
            "content-type": "application/json",
            "authorization": process.env.REACT_APP_SXT_ACCESS_TOKEN
        }
    
        
        try{
            const res = await axios.post(url,payload,{headers:headers})
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
 
 
 
 
 
  async function signMessage() {

    const authCode = "6f32191db0b3fbd0e4bb9aec"
     // Convert the auth code to bytes for signing

     const bytesMessage = Buffer.from(authCode, 'utf-8');
     console.log(bytesMessage);
   
     // Decode the private key for signing
     const privateKey = Buffer.from(process.env.REACT_APP_SXT_USER_PRIVATE_KEY,"base64");
     // console.log(privateKey);
   
     // Generate the signature
     const signature = nacl.sign(bytesMessage, privateKey).toString('hex');
   
        console.log(signature)
 
   
     return signature;
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
    validateToken,
    authenticate,
    signMessage

}