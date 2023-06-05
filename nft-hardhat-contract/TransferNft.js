
// console.log("h")
// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
// const name = args[0]
const isKeeper = false
const isTransfer = false
// const royalty = 10
// const newOwner = '0xC51115ED40Fb956FBbA1276F2111D0f4C7f7c47d'
const amountUsed = arg[0]
const tokenId = arg[1]
const nft = arg[2]
const tokenURI = arg[3] //'https://magenta-distinct-guan-162.mypinata.cloud/ipfs/QmQprRZRMU7vNjh2sbGByrZrtVHhTLx3pboYoWbbpa7rCt'

//args[1]
// sxt credidentials
const accessToken = secrets.sxtToken
const biscuit = secrets.biscuit
// need to paas in arg
const accessTokenOfPinata = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZTU5MzYzZC01M2ZjLTRjZGMtOGQ5YS1iMmQ1OWM2M2JlMDEiLCJlbWFpbCI6Im5laGFsLnViaXRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImVlNzZlMzg0NDkwYmRlMDI1YmZjIiwic2NvcGVkS2V5U2VjcmV0IjoiYjE4ZWRmYmZmMTMxYWUwNzU3YWMwMWEwZDFlZWU1MTIyY2I4MmVkNWJjZmVlMzZkMTk4NzRiNDBmMGMzNDA2YSIsImlhdCI6MTY4NDQwNTQyNn0.XXXCTHBxAQY1xdfBVRj1b9tiFllluga4nxJKIOYRVP4'
const SXT_API_DML_URL = "https://hackathon.spaceandtime.dev/v1/sql/dml/"
const SXT_API_DQL_URL = "https://hackathon.spaceandtime.dev/v1/sql/dql/"


const tokenCID = tokenURI.split("ipfs/")[1]
var newCID = ''

const ATTRIBUTES = {
  "DISCOUNT" : 0,
  "EXPIRY" : 1,
  "EXPIRY_DATE" : 2,
  "USED_COUNT" : 3,
  "CATEGORY" : 4,
  "APPLICAPBLE_IN" : 5,
  "MAXIMUM_PURCHASE_LIMIT" : 6,
  "REMAINING_AMOUNT" : 7,
  "DAYS_LEFT" : 8,
 }



// 


// new_owner => string
// amountUsed = > number
// isKeeper => bool


// To make an HTTP request, use the Functions.makeHttpRequest function
// Functions.makeHttpRequest function parameters:
// - url
// - method (optional, defaults to 'GET')
// - headers: headers supplied as an object (optional)
// - params: URL query parameters supplied as an object (optional)
// - data: request body supplied as an object (optional)
// - timeout: maximum request duration in ms (optional, defaults to 10000ms)
// - responseType: expected response type (optional, defaults to 'json')


const NftJson = await Functions.makeHttpRequest({
  url: tokenURI,

})
 
 console.log("Runninng........")
 

    if(NftJson.status === 200){
      
 
    if(isTransfer){
        // when we transfer Ownership
        // get svg
        // change the name of the owner from svg
        // include the royalty of provider in sxt => done
        // change the ownership in sxt => done
        // get resold count from sxt and add 1 on it and update the raw in sxt => done

        // post the new json
        // delete the previous json
        // return the new url of json

// get token data        
 const get_payload = { 
      "resourceId": "MARKET.TOKEN",
      "sqlText": `SELECT * FROM MARKET.TOKEN WHERE token_id = ${tokenId} AND nft = '${nft}'`
}
  
 const get_headers = {
    "accept": "application/json",
    "biscuit": biscuit,
    "content-type": "application/json",
    "authorization": `Bearer ${accessToken}`
}


const sxtGet = await Functions.makeHttpRequest({
  url: SXT_API_DQL_URL,
  method: 'POST',
  headers: get_headers,
  timeout: 9000,
  data: get_payload
})

console.log(sxtGet)

if (sxtGet?.status !== 200) {
    throw "problem occur in sxt update"
}


 // updating owner, total_royalty and resold_count in sxt
const sqlText = `UPDATE MARKET.TOKEN SET owner = '${newOwner}', total_royalty = ${sxtGet.data[0]["TOTAL_ROYALTY"] + royalty}, resold_count=${sxtGet.data[0]["RESOLD_COUNT"] + 1} WHERE token_id = ${tokenId} AND nft = '${nft}' `
    

const  update_payload = {
  "resourceId": "MARKET.TOKEN",
  "sqlText": sqlText
}
    
const  update_headers = {
      "accept": "application/json",
      "biscuit": biscuit,
      "content-type": "application/json",
      "authorization": `Bearer ${accessToken}`
  }

        
  const sxtUpdate = await Functions.makeHttpRequest({
          url: SXT_API_DML_URL,
          method: 'POST',
          headers: update_headers,
          timeout: 9000,
          data: update_payload})

        console.log(sxtUpdate)
if (sxtUpdate.status !== 200) {
          throw "problem occur in sxt update"
}
        


      }
      else if(isKeeper){
          // get json
          // get svg from json
          // calculate today time inn second const exactDateTimestamp = parseInt(new Date().getTime() / 1000);
          // calculate days left by 
          // nftJson.attributes[4].value = nftJson.attributes[1]?.value - exactDateTimestamp
          // replace the days left in svg and json and sxt
          // if the maximum purchase limit duration is day then do this value 0
          // if duration is month then you need to chek the today date if it is day 1 of any month then do this value 0
          // if the duration is years, then dont need to do anything

          // post new json 
          // delete previous json
          // return new url
          
          exactDateTimestamp = parseInt(new Date().getTime() / 1000);
          NftJson.attributes[ATTRIBUTES.DAYS_LEFT].value = NftJson.attributes[ATTRIBUTES.EXPIRY_DATE].value - exactDateTimestamp
  
          if(NftJson.attributes[ATTRIBUTES.MAXIMUM_PURCHASE_LIMIT].duration === 'day'){
            NftJson.attributes[ATTRIBUTES.REMAINING_AMOUNT].value = NftJson.attributes[ATTRIBUTES.MAXIMUM_PURCHASE_LIMIT].value
          }
          
          // In Future we apply month and years
      }
      else{
        // use NFT
        
        // get the previous count use of nft from sxt
      // increase the count in json -> done, svg and sxt
      // change the remaining amount in json -> done
        // post the new json to pinata 
        // delete the previous json 
        // return the usrl of new json
        console.log("chlaa")
        // console.log(NftJson.data)
        if(NftJson.data.attributes[ATTRIBUTES.REMAINING_AMOUNT].value - amountUsed < 0){
          throw "unsufficient balance limit"
        }

        NftJson.data.attributes[ATTRIBUTES.USED_COUNT].value = NftJson.data.attributes[ATTRIBUTES.USED_COUNT].value + 1
        NftJson.data.attributes[ATTRIBUTES.REMAINING_AMOUNT].value = NftJson.data.attributes[ATTRIBUTES.REMAINING_AMOUNT].value - amountUsed

        // updating used count in sxt
       const sqlText = `UPDATE MARKET.TOKEN SET used_count = ${NftJson.data.attributes[ATTRIBUTES.USED_COUNT].value} WHERE token_id = ${tokenId} AND nft = '${nft}' `
    

       const  payload = {
            "resourceId": "MARKET.TOKEN",
            "sqlText": sqlText
        }
    
      const  headers = {
            "accept": "application/json",
            "biscuit": biscuit,
            "content-type": "application/json",
            "authorization": `Bearer ${accessToken}`
        }

        
        const sxtUpdate = await Functions.makeHttpRequest({
          url: SXT_API_DML_URL,
          method: 'POST',
          headers: headers,
          timeout: 9000,
          data: payload})

        console.log("Running qu")
        if (sxtUpdate.status !== 200) {
          throw "problem occur in sxt update"
        }
        
     
     
      }

        // //  do changes here
        // NftJson.data.name = "Blue Air Line"
        
        // console.log("get Data from",tokenCID)



        var data = JSON.stringify({
            "pinataOptions": {
              "cidVersion": 1
            },
            "pinataMetadata": {
              "name": "testing",
            },
            "pinataContent": NftJson.data
          });



        // //post changes
        const newNft = await Functions.makeHttpRequest({
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            method: "post",
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': accessTokenOfPinata
              },
              
            data: data

          })

          if(newNft.status == 200 ){
            
           newCID = newNft.data.IpfsHash
            console.log("new CID",newCID)

// delete previous NFT URI

const deleteNft = await Functions.makeHttpRequest({
    url: `https://api.pinata.cloud/pinning/unpin/${tokenCID}`,
    method: "delete",
    headers: { 
        'Authorization': accessTokenOfPinata
      },
      
  })

    if (deleteNft.status === 200) {
    
        console.log(deleteNft.data)
    }
    else{
        throw "Unable to delete previous token URI"
    }

   } 
   else{
        throw "Unable to make new token URI"
    }
    
}
    else{
        
        throw "Unable to get token URI"
    }    



    // img_base64 = NftJson.data.image.replace("data:image/svg+xml;base64,","")
    // img_svg = Buffer.from(img_base64 , 'base64').toString()




// The source code MUST return a Buffer or the request will return an error message
// Use one of the following functions to convert to a Buffer representing the response bytes that are returned to the client smart contract:
// - Functions.encodeUint256
// - Functions.encodeInt256
// - Functions.encodeString
// Or return a custom Buffer for a custom byte encoding

return Functions.encodeString(tokenURI.replace(tokenCID,newCID))
// return "hello"