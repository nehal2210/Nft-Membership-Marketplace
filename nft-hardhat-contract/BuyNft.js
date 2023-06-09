const nameOrAddress = args[0]
const tokenId = args[1]
const nft = args[2]
const tokenURI = arg[3] //'https://magenta-distinct-guan-162.mypinata.cloud/ipfs/QmQprRZRMU7vNjh2sbGByrZrtVHhTLx3pboYoWbbpa7rCt'
const newOwner =  args[4]
// sxt credidentials
// const accessToken = secrets.sxtToken
// const biscuit = secrets.biscuit
// need to paas in arg
const accessTokenOfPinata = secrets.pinataToken



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
  "DAYS" : 8,
 }




const NftJson = await Functions.makeHttpRequest({url: tokenURI})
 
 

    if(NftJson.status !== 200){throw "Unable to get token URI"}      
 

// put user address in svg




const MintDate = parseInt(new Date().getTime() / 1000);
var ExpireDate;

NftJson.data.attributes[ATTRIBUTES.DAYS].value = NftJson.data.attributes[ATTRIBUTES.DAYS].max_value
NftJson.data.name = NftJson.data.name+"#"+tokenId
if(NftJson.data.attributes[ATTRIBUTES.EXPIRY].duration === "year") {
        NftJson.data.attributes[ATTRIBUTES.EXPIRY_DATE].value = NftJson.data.attributes[ATTRIBUTES.EXPIRY].value * 31536000 + MintDate 
        ExpireDate = NftJson.data.attributes[ATTRIBUTES.EXPIRY].value * 31536000 + MintDate
}
else if(NftJson.data.attributes[ATTRIBUTES.EXPIRY].duration === "month"){
        NftJson.data.attributes[ATTRIBUTES.EXPIRY_DATE].value = NftJson.data.attributes[ATTRIBUTES.EXPIRY].value * 2592000 + MintDate
        ExpireDate = NftJson.data.attributes[ATTRIBUTES.EXPIRY].value * 31536000 + MintDate}

        


   

    var data = JSON.stringify({
            "pinataOptions": {
              "cidVersion": 1
            },
            "pinataMetadata": {
              "name": NftJson.data.name,
            },
            "pinataContent": NftJson.data
          });



        //post changes  on pinata
    const newNft = await Functions.makeHttpRequest({
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            method: "post",
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': accessTokenOfPinata
              },
              
            data: data

          })

          if(newNft.status !== 200 ){ throw "new Nft not created"}
            
          const  newCID = newNft.data.IpfsHash









return Functions.encodeString(tokenURI.replace(tokenCID,newCID))