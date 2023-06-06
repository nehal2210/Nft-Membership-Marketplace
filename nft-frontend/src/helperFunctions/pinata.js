import { BASE_PINATA_URL, DELETE_URL_PINATA } from "../constants"
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
   'Authorization': process.env.ACCESS_TOKEN_PINATA
}})
    
return  newNft.data.IpfsHash

}
catch(e){
    console.log("error in posting metadata to pinata")
}

}


async function postLogoToIPFS () {
    const formData = new FormData();
    const src = "path/to/file.png";
    
    const file = fs.createReadStream(src)
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
          Authorization: process.env.ACCESS_TOKEN_PINATA
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}


