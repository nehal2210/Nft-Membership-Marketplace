const amountUsed = parseInt(args[0])
const tokenId = parseInt(args[1])
const nft = args[2]
const tokenURI = args[3]

const accessTokenOfPinata = secrets.pinataToken
const biscuit = secrets.biscuit
const accessToken = secrets.sxtToken

// SXT_API_DML_UR = "https://hackathon.spaceandtime.dev/v1/sql/dml/"


const tokenCID = tokenURI.split("ipfs/")[1]

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



 



const NftJson = await Functions.makeHttpRequest({
  url: tokenURI,

})
    if(NftJson.status !== 200){throw "Unable to get token URI"}
        


        if(NftJson.data.attributes[ATTRIBUTES.REMAINING_AMOUNT].value - amountUsed < 0){
          throw "unsufficient balance limit"
        }

        NftJson.data.attributes[ATTRIBUTES.USED_COUNT].value = NftJson.data.attributes[ATTRIBUTES.USED_COUNT].value + 1
        NftJson.data.attributes[ATTRIBUTES.REMAINING_AMOUNT].value = NftJson.data.attributes[ATTRIBUTES.REMAINING_AMOUNT].value - amountUsed

        
        // postin new data on pinata

        const data = JSON.stringify({
            "pinataOptions": {
              "cidVersion": 1
            },
            "pinataMetadata": {
              "name": NftJson.data.name,
            },
            "pinataContent": NftJson.data
          });



        // post changes to pinata
            const newNft = await Functions.makeHttpRequest({
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            method: "post",
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': accessTokenOfPinata
              },
              
            data: data

          })

          if(newNft.status !== 200 ){throw "new Nft not created"}

       const newCID = newNft.data.IpfsHash


       // comment it chainlink does not fullfill the request, because you need table creator access token to chanfe it
 
      //  const sqlText = `UPDATE MARKET.NEWTOKEN SET used_count = ${NftJson.data.attributes[ATTRIBUTES.USED_COUNT].value} WHERE token_id = ${tokenId} AND nft = '${nft}' `
    

      //  const  payload = {
      //       "resourceId": "MARKET.NEWTOKEN",
      //       "sqlText": sqlText
      //   }
    
      // const  headers = {
      //       "accept": "application/json",
      //       "biscuit": biscuit,
      //       "content-type": "application/json",
      //       "authorization": `Bearer ${accessToken}`
      //   }

        
      //   const sxtUpdate = await Functions.makeHttpRequest({
      //     url: SXT_API_DML_URL,
      //     method: 'POST',
      //     headers: headers,
      //     timeout: 9000,
      //     data: payload})

      //   console.log("Running qu")
      //   if (sxtUpdate.status !== 200) {
      //     throw "problem occur in sxt update"
      //   }


return Functions.encodeString(tokenURI.replace(tokenCID,newCID))