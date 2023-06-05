const amountUsed = parseInt(args[0])
const tokenId = parseInt(args[1])
const nft = args[2]
const tokenURI = args[3]

// sxt credidentials
// const accessToken = secrets.sxtToken
const accessTokenOfPinata = secrets.pinataToken
// const biscuit = secrets.biscuit

// need to paas in arg
// const SXT_API_DML_URL = "https://hackathon.spaceandtime.dev/v1/sql/dml/"
// const SXT_API_DQL_URL = "https://hackathon.spaceandtime.dev/v1/sql/dql/"


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
        


      

        // use NFT
        
        // get the previous count use of nft from sxt
      // increase the count in json -> done, svg and sxt
      // change the remaining amount in json -> done
        // post the new json to pinata 
        // delete the previous json 
        // return the usrl of new json

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




return Functions.encodeString(tokenURI.replace(tokenCID,newCID))

