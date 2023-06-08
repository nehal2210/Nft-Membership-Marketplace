import React, { useEffect, useState } from "react";
import { Alert, Button, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Loader from "../../components/general-components/loader";
import { ToastContainer, toast } from "react-toastify";
// import { postLogoToIPFS } from '../../helperFunctions/pinata';
import "react-toastify/dist/ReactToastify.css";
import { postLogoToIPFS, postTokenMetaData } from "../../helperFunctions/pinata";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { BASE_PINATA_URL, CATEGORY } from "../../constants";
import { getFoodBase64Svg } from '../../membershipCards'
import { MEMBERSHIP_MARKET_ADDRESS } from "../../contracts/Address";
import { MEMBERSHIP_MARKET_ABI } from "../../contracts/ABI/membershipMarketAbi";
import {ethers} from "ethers";
import { createNFT, getNftAddress } from "../../contractFunctions";
import { insertProviderData } from "../../helperFunctions/sxt";
import { useAccount } from "wagmi";

const CreateNFT = () => {


  const { address, isConnected, isDisconnected } = useAccount()






  // function createNFT(string memory name, string memory symbol,uint256 _supplyLimit,uint256 priceOfNft,bool _isTransferable,bool _isExpireable, uint256 expiration, nftCategory _category)
 
  const [showLoader, setShowLoader] = useState(false);
  const [pureImg, setPureImg] = useState();
  const [formData, setFormData] = useState({
    'image_data': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj4NCiAgICA8c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPg0KICAgIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPg0KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBjbGFzcz0iYmFzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RXBpY0xvcmRIYW1idXJnZXI8L3RleHQ+DQo8L3N2Zz4=',
    'external_url': 'localhost:3000/mcdonalds-nft',
    'description': '',
    'name': '',
    'Discount': '',
    'Expiry': '',
    'duration' : '',
    'expiryDate': 0,
    'Used Count': 0,
    'category': '',
    'Applicable in': 'world',
    'Maximum Purchase Limit': '',
    'Maximum Purchase duration': '',
    'Maximum Purchase amount': '',
    'Remaining Amount': '',
    'Days': 0,
    'supplyLimit': '',
    'transferable': false,
    'ComapnySymbol': '',
    'nftPrice': ''
  });


  const handleForm = (event) => {
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value
    }));
  }

  const notify = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  /*!formData.name || !formData.description || !formData.Discount || !formData.Expiry || !formData.category || !formData["Applicable in"] || !formData['Maximum Purchase duration'] || !formData["Maximum Purchase amount"] || !formData.price || !formData["nftPrice"] || !formData["Comapny Symbol"]*/
  const submitForm = async () => {
    console.log('form', formData);
    // if (formData.name.length <= 0 || formData.description.length <= 0 || formData.Expiry.length <= 0 || formData.category.length <= 0 || formData["Applicable in"].length <= 0 || formData['Maximum Purchase duration'].length <= 0 || formData["Maximum Purchase amount"].length <= 0 || formData["nftPrice"].length <= 0 || formData["Comapny Symbol"].length <= 0 || !pureImg) {
    if (!formData) {


      notify('Form Invalid, Please Fill Full Form!');
      console.log('Form Invalid');
    } else {
      setShowLoader(true);
      
console.log(formData)
console.log(CATEGORY[formData.category])

      const isCreated = await createNFT(formData)
      // write(formData.name,formData.ComapnySymbol,ethers.utils.parseEther(formData.supplyLimit),ethers.utils.parseEther(formData.nftPrice),false,false,ethers.utils.parseEther("0"), ethers.utils.parseEther(CATEGORY[formData.category]))
      if(!isCreated){
        setShowLoader(false);
        notify("Tx Failed");
        return
      }
      let hashIPFSimg = await postLogoToIPFS(pureImg);
      console.log('BASE_PINATA', BASE_PINATA_URL + hashIPFSimg.data.IpfsHash);
      let img = getFoodBase64Svg(formData.name, BASE_PINATA_URL + hashIPFSimg.data.IpfsHash);
      let modifiedData = {
        "image_data": `data:image/svg+xml;base64,${img}`,
        "external_url": "localhost:3000/mcdonalds-nft",
        "description": formData.description,
        "name": formData.name,
        "attributes": [
          {
            "trait_type": "Discount",
            "value": formData.Discount,
            "display_type": "boost_percentage"
          },
          {
            "trait_type": "Expiry",
            "duration": formData.Expiry === '1Year' ? "year" : "month",  
            "value": formData.Expiry === '1Year' ? '1' : '6',
          },
          {
            "trait_type": "Expiry Date",
            "value": 0,
            "display_type": "date"

          },
          {
            "trait_type": "Used Count",
            "value": 0,
            "display_type": "number"
          },
          {
            "trait_type": "category",
            "value": formData.category,
          },
          {
            "trait_type": "Applicable in",
            "value": formData['Applicable in'],
            "display_type": "map"
          },
          {
            "trait_type": "Maximum Purchase Limit",
            "value": formData['Maximum Purchase amount'] + '/$' + formData['Maximum Purchase duration']
          },
          {
            "trait_type": "Remaining Amount",
            "value": Number(formData["Maximum Purchase amount"]),
            "currency": "dollars",
            "max_value": Number(formData["Maximum Purchase amount"])
          },
          {
            "trait_type": "Days",
            "value": 0,
            "max_value": formData.Expiry == '1Year' ? 365 : 180
          }
        ]
      };
      console.log('modified data', modifiedData);
      let res = await postTokenMetaData(modifiedData);
      if(res.status == 200){

        console.log('resres.data', res.data);
        console.log("log",hashIPFSimg.data.IpfsHash)
        const newNftAddress = await getNftAddress(address)
        if(newNftAddress !== "0x0"){
          console.log("new Address",newNftAddress)
          var isInserted = await insertProviderData({nft:newNftAddress, provider:address, logo:hashIPFSimg.data.IpfsHash, base_meta_data_URI:res.data.IpfsHash, total_supply: formData.supplyLimit , nft_price: formData.nftPrice }) 
        
            if (!isInserted) {
              notify("your access token is expire please refresh your page to get access token")
            }
          
        }

        setShowLoader(false);
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your application has been Submitted',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        setShowLoader(false);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  const handleLogoImg = (event) => {
    setPureImg(event.target.files[0]);
  }

  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  return (
    <div className="w-full p-5">
      <ToastContainer />
      {
        showLoader ? <Loader /> : null
      }
      <div className="w-full pt-10 pl-10 pr-10 shadow-[0_0_5px_0px_#8f808040] dark:shadow-[0_0_5px_0px_#1235ce40] rounded-md">
        <h1 className="text-3xl dark:text-white border-b-2 border-primary-500 w-[full] dark:border-blue">Create NFT</h1>
        <div className="flex justify-around items-start flex-wrap flex-row">

          {/* LEFT */}
          <div className="w-[35rem] md:w-[25rem] m-2">

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Name</p>
              <Input placeholder="Comapny Name" value={formData.name} name="name" onChange={handleForm} className="dark:bg-black dark:text-white" />

            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Category </p>
              <select placeholder="Category" value={formData.category} name="category" onChange={handleForm} allowClear className="w-full h-[33px] border-[1px] focus:border-[1px] outline-none focus:border-light-blue-400 focus-visible:border-[1px] focus-visible:border-light-blue-400 border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px]  text-[14px]"
              >
                <option value="" disabled>Select One</option>
                <option value="Food and dining">Food & Dining</option>
                <option value="Sports and Activity">Sports & Activity</option>
                <option value="Transportation">Transportation</option>
              </select>
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Applicable in</p>
              <select placeholder="Applicable in" disabled value={formData["Applicable in"]} name="Applicable in" onChange={handleForm} className="w-full h-[33px] border-[1px] border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px] text-[14px] focus:border-[1px] outline-none focus:border-light-blue-400 focus-visible:border-[1px] focus-visible:border-light-blue-400"
              >
                <option value="world">world</option>
              </select>
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Discount </p>
              <select placeholder="Discount" value={formData.Discount} name="Discount" onChange={handleForm} className="w-full h-[33px] border-[1px] border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px] text-[14px] focus:border-[1px] outline-none focus:border-light-blue-400 focus-visible:border-[1px] focus-visible:border-light-blue-400"
              >
                <option value="" disabled>Select One</option>
                <option value="25%">25%</option>
                <option value="50%">50%</option>
                <option value="75%">75%</option>
                <option value="100%">100%</option>
              </select>
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Supply Limit</p>
              <Input type="number" placeholder="Supply Limit" name="supplyLimit" onChange={handleForm} className="dark:bg-black dark:text-white" />
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Transferable</p>
              <select placeholder="Transferable" name="transferable" value={formData.transferable} onChange={handleForm} disabled className="w-full h-[33px] border-[1px] border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px] text-[14px]">
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          </div>


          {/* RIGHT */}
          <div className="w-[35rem] md:w-[25rem] m-2">

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Comapny Logo</p>
              <Input placeholder="Company Logo" type="file" onChange={handleLogoImg} className="dark:bg-black dark:text-white w-full" />
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Maximum Purchase Limit (in Dollar)</p>
              <select placeholder="Duration" value={formData["Maximum Purchase duration"]} name="Maximum Purchase duration" onChange={handleForm} allowClear className="w-[49%] md:w-[48%] h-[33px] border-[1px] border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px] text-[14px] focus:border-[1px] outline-none focus:border-light-blue-400 focus-visible:border-[1px] focus-visible:border-light-blue-400"
              >
                <option value="" disabled>Select One</option>
                <option value="Day">Day</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
              <Input placeholder="Amount" value={formData["Maximum Purchase amount"]} name="Maximum Purchase amount" onChange={handleForm} min={0} type="number" className="dark:bg-black dark:text-white w-[49%] md:w-[48%] ml-2" />
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Expiry</p>
              <select placeholder="Maximum Purchase Limit" value={formData.Expiry} name="Expiry" onChange={handleForm} allowClear className="w-full h-[33px] border-[1px] border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px] text-[14px] focus:border-[1px] outline-none focus:border-light-blue-400 focus-visible:border-[1px] focus-visible:border-light-blue-400"
              >
                <option value="" disabled>Select One</option>
                <option value="6Months">6 Month</option>
                <option value="1Year">1 Year</option>
              </select>
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">symbol</p>
              <Input type="text" placeholder="Comapny Symbol" value={formData['ComapnySymbol']} name="ComapnySymbol" onChange={handleForm} maxLength={5} className="dark:bg-black dark:text-white" />
            </div>


            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">NFT Price (MATIC)</p>
              <Input type="number" placeholder="NFT Price" value={formData['nftPrice']} name="nftPrice" onChange={handleForm} className="dark:bg-black dark:text-white" />
            </div>
          </div>

        </div>
        {/* Description */}
        <div>
          <div className="w-full mb-2 p-1">
            <p className="dark:text-white">Description</p>
            <TextArea rows={4} placeholder="Description" value={formData.description} name="description" onChange={handleForm} className="dark:bg-black dark:text-white m-2" />
          </div>
        </div>
        <div className="w-full flex flex-row-reverse pb-5">
          <Button className='bg-primary-500 text-white w-24 dark:bg-blue' onClick={()=>{isConnected?submitForm():notify("Please Connect your Wallet")}} type="primary">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
