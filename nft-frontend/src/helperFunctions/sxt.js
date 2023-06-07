import axios from "axios";
import { SXT_API_BASE_URL, SXT_API_DML_URL, SXT_API_DQL_URL, USER_ID } from "../constants";
import ed25519  from "ed25519";
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



async function requestAuthCode(){


    const url = SXT_API_BASE_URL + "auth/code"
     const user_id = "nehal"
     // const org_code = ""

     payload = {
         "userId": user_id
     }
     
     headers = {"accept": "application/json"}
    
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
 
 
 
 
 
  async function signMessage(authCode) {
     // Convert the auth code to bytes for signing
     const bytesMessage = Buffer.from(authCode, 'utf-8');
     // console.log(bytesMessage);
   
     // Decode the private key for signing
     const privateKey = Buffer.from(process.env.REACT_APP_SXT_USER_PRIVATE_KEY, 'base64');
     // console.log(privateKey);
   
     // Generate the signature
     const signature = ed25519.Sign(Buffer.from(bytesMessage), privateKey).toString('hex');
   
   
 
   
     return signature;
   }
 
 
 
 
 
 
 
 
 async function requestToken(auth_code, signed_auth_code){
  
 
     const url = SXT_API_BASE_URL + "auth/token"
     payload = {
         "userId": USER_ID,
         "authCode": auth_code,
         "signature": signed_auth_code,
         "key": process.env.REACT_APP_SXT_USER_PUBLIC_KEY,
     }
     headers = {"accept": "application/json"}
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
    headers = {
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
    getNftData

}