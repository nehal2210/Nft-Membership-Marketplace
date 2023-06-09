const USER_ID = "nehal"
const svgBase64 = 'data:image/svg+xml;base64,'
const SXT_API_DML_URL = "https://hackathon.spaceandtime.dev/v1/sql/dml/"
const SXT_API_DQL_URL = "https://hackathon.spaceandtime.dev/v1/sql/dql/"
const SXT_API_BASE_URL = "https://hackathon.spaceandtime.dev/v1/"
const BASE_PINATA_URL = "https://magenta-distinct-guan-162.mypinata.cloud/ipfs/"
const DELETE_URL_PINATA = "https://api.pinata.cloud/pinning/unpin/"

const DON_PUBLIC_KEY = 'a30264e813edc9927f73e036b7885ee25445b836979cb00ef112bc644bd16de2db866fa74648438b34f52bb196ffa386992e94e0a3dc6913cee52e2e98f1619c';

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



 export {
    SXT_API_BASE_URL,
    SXT_API_DML_URL,
    SXT_API_DQL_URL,
    USER_ID,
    BASE_PINATA_URL,
    DELETE_URL_PINATA,
    CATEGORY,
    svgBase64,
    ATTRIBUTES,
    DON_PUBLIC_KEY
 }