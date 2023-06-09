import React, { useState, useEffect, useMemo } from 'react';
import { Button, Progress } from 'antd';
import { AiOutlineMenu, AiFillEye, AiOutlineHeart, AiFillGold, AiOutlineBank, AiOutlineRise } from "react-icons/ai";
import { BiBarChartAlt2, BiCalendar, BiFlag, BiStar } from "react-icons/bi";
import * as moment from 'moment';
import { useLocation } from "react-router-dom";
import { ATTRIBUTES, BASE_PINATA_URL, svgBase64 } from "../../constants";
import { useAccount, useContractWrite } from 'wagmi';
import { getNftData, getNftTableId, insertNftData, putSxtTokenToLocalStorage } from '../../helperFunctions/sxt';
import { SvgOnBuy } from '../../membershipCards';
import { postTokenMetaData } from '../../helperFunctions/pinata';
import { buyeNFT } from '../../contractFunctions';
import { MEMBERSHIP_MARKET_ADDRESS } from "../../contracts/Address";
import { MEMBERSHIP_MARKET_ABI } from "../../contracts/ABI/membershipMarketAbi";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import Loader from '../../components/general-components/loader';

const CardDetails = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    const { data, isLoading, isSuccess, write } = useContractWrite({
      address: MEMBERSHIP_MARKET_ADDRESS,
      abi: MEMBERSHIP_MARKET_ABI,
      functionName: 'buyNftWithNative',
    })
    const [showLoader, setshowLoader] = useState(false);
    const [modifiedData, setModifiedData] = useState({
        attribute: '',
        data: [],
    });
    const [cardDetail, setCardDetail] = useState({});
    const searchParams = new URLSearchParams(useLocation().search).get("token");
    console.log('searchParams', searchParams);


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

      
  const notifySuccess = (msg) => {
    toast.success(msg, {
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
  
    const fetchUserData = () => {




        fetch(BASE_PINATA_URL+searchParams)
            .then(response => {
                return response.json()
            })
            .then(data => {
                var changingData = {
                    properties: [],
                    stats: [],
                    boots: [],
                    date: [],
                    countries: [],
                    bankings: []
                };
                console.log('data', data);
                setCardDetail(data);
                data?.attributes?.forEach((data) => {
                    if (data.display_type == null && typeof data.value == 'string') {
                        changingData['properties'].push(data);
                    } else if (data.display_type == null && typeof data.value == 'number') {
                        changingData['bankings'].push(data);
                    } else if (data.display_type == 'number') {
                        changingData['stats'].push(data);
                    } else if (data.display_type == 'boost_percentage') {
                        changingData['boots'].push(data);
                    } else if (data.display_type == 'date') {
                        changingData['date'].push(data);
                    } else if (data.display_type == 'map') {
                        changingData['countries'].push(data);
                    };
                });
                setModifiedData(changingData);
            })
    }





    useEffect(() => {


        fetchUserData();
    }, []);

  
    const NftBuy = async (data) => {


        //getting token id
        setshowLoader(true);
        const token = await putSxtTokenToLocalStorage()
        const nftTableData = await getNftTableId(token)
        if (nftTableData.status !== 200) {
    
          setshowLoader(false);
          notify("get access Token")
          return
        }
    
    
        const tableId = nftTableData.data[0]["count(id)"] + 1
        console.log(tableId)
        const nftCollectionData = await getNftData(data.NFT,token)
    
        if (nftCollectionData.status !== 200) {
          setshowLoader(false);
          notify("get access Token")
          return
        }
        const tokenId = nftCollectionData.data.length
    
    
        // getting company Base MetaData
        const NftJson = await axios.get(BASE_PINATA_URL + data.BASE_META_DATA_URI)
        if (NftJson.status !== 200) {
          setshowLoader(false);
          notify("get access Token")
          return
    
        }
    
    
        console.log(NftJson.data)
    
        // change MetaData from Base to User
    
    
    
        const MintDate = parseInt(new Date().getTime() / 1000);
        var ExpireDate;
    
    
        NftJson.data.attributes[ATTRIBUTES.DAYS].value = NftJson.data.attributes[ATTRIBUTES.DAYS].max_value
        NftJson.data.name = NftJson.data.name + "#" + tokenId
        if (NftJson.data.attributes[ATTRIBUTES.EXPIRY]?.duration === "year") {
          NftJson.data.attributes[ATTRIBUTES.EXPIRY_DATE].value = NftJson.data.attributes[ATTRIBUTES.EXPIRY].value * 31536000 + MintDate
          ExpireDate = NftJson.data.attributes[ATTRIBUTES.EXPIRY].value * 31536000 + MintDate
        }
        else if (NftJson.data.attributes[ATTRIBUTES.EXPIRY]?.duration === "month") {
          NftJson.data.attributes[ATTRIBUTES.EXPIRY_DATE].value = NftJson.data.attributes[ATTRIBUTES.EXPIRY].value * 2592000 + MintDate
          ExpireDate = NftJson.data.attributes[ATTRIBUTES.EXPIRY].value * 31536000 + MintDate
        }
    
    
        const owner = address.substring(0, 5) + "..." + address.substring(35)
        const base64Img = SvgOnBuy(NftJson.data.name, BASE_PINATA_URL + data.logo, data?.category, owner)
    
        NftJson.data.image_data = svgBase64 + base64Img
    
        // post metaData for user
        const newNft = await postTokenMetaData(NftJson.data)
    
    
    
    
        if (newNft.status !== 200) {
          setshowLoader(false);
          notify("something went wrong")
          return
        }
    
        const newCID = newNft.data.IpfsHash
    
        const isSuccess = await buyeNFT({
          "to": address, "nft": data.NFT, "tokenUri": BASE_PINATA_URL + newCID, "price": data.NFT_PRICE
        })
    
    
        if (isSuccess) {
          setshowLoader(false);
          notifySuccess("Congratulations! Your Membership has been Created checkout your Dashboard")
          console.log(BASE_PINATA_URL + newCID)
    
    
        }
        else {
          setshowLoader(false);
          notify("Something went wrong")
          return
        }
    
    
        const isInserted = await insertNftData({ id: tableId, nft: data.NFT, owner: address, used_count: 0, resold_count: 0, total_royalty: 0, mint_date: MintDate, expire_date: ExpireDate, token_id: tokenId },token)
    
        if (isInserted) {
          setshowLoader(false);
          notifySuccess("Data is Inserted into SxT")
        }
        else {
          setshowLoader(false);
          notify("Something went wrong")
          return
        }
    
    
      }
    
    
    

    


    const dateFormat = (secs) => {
        if (!secs || secs == 0) {
            return '__, __, __'
        } else {
            let time = moment(secs).format('MMMM Do YYYY');
            return time;
        }
    }

    return (
        <div className='w-full p-8 flex flex-row justify-start'>
            <ToastContainer />
            {showLoader ? <Loader /> : null}
            {/* LEFT SIDE */}
            <div className='w-[40%]'>
                <div className='border-deep-orange-50 border-2 w-full rounded-xl'>
                    <img
                        className='rounded-xl'
                        alt="example"
                        src={cardDetail.image_data}
                    />
                </div>
                <div className='rounded-xl border-blue-gray-50 border-2 mt-5'>
                    <div className='mt-5 pl-5 border-blue-gray-50 border-b-2 flex flex-row items-center'>
                        <AiOutlineMenu size={'20px'} color='gray' />
                        <p className='ml-2'>Description</p>
                    </div>
                    <div className='w-full h-40 p-5 overflow-y-auto'>
                        <p>{cardDetail.description}</p>
                    </div>
                </div>


                <div className='w-full mt-10'>
                    <div className='flex items-center'>
                        <BiFlag size={'20px'} color='gray' />
                        <h2 className='ml-2'>Countries</h2>
                    </div>
                    <div className='mt-2 pt-5 border-t-2 border-blue-gray-50'>
                        {
                            modifiedData?.countries?.map((data, i) => {
                                return (
                                    data.value == 'world' ?
                                        <div key={i} className='w-80 p-5 pt-2'>
                                            <p>{data.trait_type}</p>
                                            <img className='w-[100px]' src={'https://upload.wikimedia.org/wikipedia/commons/3/31/Earth%27s_rotation_around_its_own_axis.gif'} />
                                            <p>
                                                all over the world
                                            </p>
                                        </div>
                                        : null
                                )
                            })
                        }
                    </div>
                </div>

                <div className='w-full mt-5'>
                    <div className='flex items-center'>
                        <BiCalendar size={'20px'} color='gray' />
                        <h2 className='ml-2'>Date</h2>
                    </div>
                    <div className='mt-2 border-t-2 border-blue-gray-50'>
                        {
                            modifiedData?.date?.map((data, i) => {
                                return (
                                    <div key={i} className='w-80 p-5 pt-2'>
                                        <p>{data.trait_type}: {dateFormat(data.value)}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


            </div>
            <div className='w-[60%] p-2 pl-10'>
                <h2 className='mt-5 font-bold text-2xl '>{cardDetail.name}</h2>
                <p>Owned by <span className='cursor-pointer text-light-blue-700'>Unreal_1</span></p>
                <div className='flex flex-row justify-around mt-5 w-[80%]'>
                    <div className='border-2 border-blue-gray-50 rounded-md flex justify-center w-20'># 1,080</div>
                    <div className='flex flex-row justify-between items-center w-24'>
                        <AiFillEye size={'25px'} color='gray' />
                        <p>59 Views</p>
                    </div>
                    <div>
                        <div className='flex flex-row justify-between items-center w-28'>
                            <AiOutlineHeart size={'25px'} color='gray' />
                            <p>2 favorites</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-row justify-between items-center w-20'>
                            <AiFillGold size={'25px'} color='gray' />
                            <p>PFPs</p>
                        </div>
                    </div>
                </div>
                <Button variant="gradient" fullWidth className="mb-2 mt-5 w-40 bg-primary">
                    <span className='text-white' onClick={() => NftBuy(data)}>Buy Now</span>
                </Button>


                <div className='w-full mt-10'>
                    <div className='flex items-center'>
                        <AiOutlineMenu size={'20px'} color='gray' />
                        <h2 className='ml-2'>PROPERTIES</h2>
                    </div>
                    <div className='mt-2 pt-5 border-t-2 border-blue-gray-50 flex justify-between flex-wrap'>
                        {
                            modifiedData?.properties?.map((data, i) => {
                                return (
                                    <div key={i} className='w-40 p-5 mb-2 min-h-[120px] pt-2 border-2 bg-primary-50 border-primary-500 flex items-center flex-col'>
                                        <p className='text-primary-500'>{data.trait_type}</p>
                                        <p className='text-lg'>{data.value}</p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

                <div className='w-full mt-10'>
                    <div className='flex items-center'>
                        <BiStar size={'20px'} color='gray' />
                        <h2 className='ml-2'>RANKINGS</h2>
                    </div>
                    <div className='mt-2 pt-5 border-t-2 border-blue-gray-50'>
                        {
                            modifiedData?.bankings?.map((data, i) => {
                                return (
                                    <div key={i} className='w-80 p-5 pt-2'>
                                        <p>{data.trait_type}</p>
                                        <Progress percent={data.value} status="active" />
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

                <div className='w-full mt-10'>
                    <div className='flex items-center'>
                        <AiOutlineRise size={'20px'} color='gray' />
                        <h2 className='ml-2'>BOOSTS</h2>
                    </div>
                    <div className='mt-2 pt-5 border-t-2 border-blue-gray-50'>
                        {
                            modifiedData?.boots?.map((data, i) => {
                                return (
                                    <div key={i} className='w-80 p-5 pt-2'>
                                        <p className='mb-2'>{data.trait_type}</p>
                                        <Progress type="circle" percent={data.value} />
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

                <div className='w-full mt-10'>
                    <div className='flex items-center'>
                        <BiBarChartAlt2 size={'20px'} color='gray' />
                        <h2 className='ml-2'>STATS</h2>
                    </div>
                    <div className='mt-2 pt-5 border-t-2 border-blue-gray-50 flex flex-row flex-wrap'>
                        {
                            modifiedData?.stats?.map((data, i) => {
                                return (
                                    <div key={i} className='w-100 ml-2 mr-2 p-5 pt-2'>
                                        <p><span className='text-4xl font-semibold text-primary-500 mr-2'>{data.value}</span><span className='text-2xl'>{data.trait_type}</span></p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardDetails;