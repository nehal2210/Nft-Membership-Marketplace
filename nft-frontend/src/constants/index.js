const SXT_API_DML_URL = "https://hackathon.spaceandtime.dev/v1/sql/dml/"
const SXT_API_DQL_URL = "https://hackathon.spaceandtime.dev/v1/sql/dql/"
const SXT_API_BASE_URL = "https://hackathon.spaceandtime.dev/v1/"
const BASE_PINATA_URL = "https://magenta-distinct-guan-162.mypinata.cloud/ipfs/"
const DELETE_URL_PINATA = "https://api.pinata.cloud/pinning/unpin/"
const USER_ID = "nehal"
const CATEGORY = {
   "Food and dining":"0",
   "Transportation":"1",
   "Sports and Activity":"2"
}
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


const svgBase64 = 'data:image/svg+xml;base64,'

 export {
    SXT_API_BASE_URL,
    SXT_API_DML_URL,
    SXT_API_DQL_URL,
    USER_ID,
    BASE_PINATA_URL,
    DELETE_URL_PINATA,
    CATEGORY,
    svgBase64,
    ATTRIBUTES
 }