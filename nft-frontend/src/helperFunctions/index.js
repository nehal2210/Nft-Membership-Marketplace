import { SXT_API_BASE_URL,USER_ID, DELETE_URL_PINATA } from "../constants";
import axios from "axios"


//  https://docs.spaceandtime.io/reference/authentication-code
async function request_auth_code(){
   const url = SXT_API_BASE_URL + "auth/code"
    
   const payload = {
        "userId": USER_ID
    }

    // """ joinCode is now optional with SxT Beta Release. If supplied it will connect your account to the relevant subscription
    // payload = {
    //     "userId": USER_ID,
    //     "joinCode": org_code
    // }"""

   const  resp = await axios.post(url, payload, headers=headers)
   
    console.log(resp)    
   const auth_code = resp.authCode

    return auth_code 

}

function getSxTAccessToken(){
    // # 1) Request auth code from SxT API 
 const auth_code = request_auth_code()

    // # 2) Sign the auth code with our private key
    const signed_auth_code = sign_message(auth_code)
    
    // # 3) Request access token using signed_auth_code 
        const token = request_token(auth_code, signed_auth_code)
        console.log(`Authenticaiton to the SxT API has been completed successfully!\n Access token: ${access_token}\n Refresh token: ${refresh_token}`)
        // return token[0]
}


