import { BASE_PINATA_URL, DELETE_URL_PINATA } from "../constants"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

async function getTokenData(tokenCID){
    const url = BASE_PINATA_URL + tokenCID
    try{

        const response = await  axios.get(url)
        return response.data
    }
    catch(e){
        console.log("problem in getting data of pinata")
    }
}



async function deleteTokenData(tokenCID){
    const url = DELETE_URL_PINATA + tokenCID
    try{

        const response = await  axios.delete(url,{
            headers: { 
                'Authorization': process.env.ACCESS_TOKEN_PINATA
              },
        })
        return response
    }
    catch(e){
        console.log("problem in deleting data of pinata")
    }
}


async function postTokenMetaData(metaData){
    // post on pinata
    const data = JSON.stringify({
       "pinataOptions": {
         "cidVersion": 1
       },
       "pinataMetadata": {
         "name": metaData.name,
       },
       "pinataContent": metaData
     });

   try{

           const newNft = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS',data,
       { headers: { 
   'Content-Type': 'application/json', 
   'Authorization': process.env.REACT_APP_ACCESS_TOKEN_PINATA
}})
return  ({
  status: newNft.status,
  data: newNft.data
})
}
catch(e){
    console.log("error in posting metadata to pinata",e)
}


return  ({
  status: 401,
  data: ""
})


}


async function postLogoToIPFS (file) {
    const formData = new FormData();
  
    formData.append('file', file)
    
    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 1,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: process.env.REACT_APP_ACCESS_TOKEN_PINATA
        }
      });
      return({
        status: res.status,
        data: res.data
      })
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}


export{
  postLogoToIPFS,
  postTokenMetaData,
  getTokenData
}