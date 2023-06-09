import React, { useState, useEffect } from "react";
import { getAllNftData, getAllProviderData, getNftData, getNftTableId, getSxTAccessToken, insertNftData, validateAccessToken } from "../../helperFunctions/sxt";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/general-components/loader";
import { SvgOnBuy, getFoodBase64Svg } from "../../membershipCards";
import { ATTRIBUTES, BASE_PINATA_URL, svgBase64 } from "../../constants";
import { useAccount, useContractWrite } from 'wagmi'
import { MEMBERSHIP_MARKET_ADDRESS } from "../../contracts/Address";
import { MEMBERSHIP_MARKET_ABI } from "../../contracts/ABI/membershipMarketAbi";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { buyeNFT } from "../../contractFunctions";
import axios from "axios";
import { postTokenMetaData } from "../../helperFunctions/pinata";
const Explore = () => {



  const { address, isConnected, isDisconnected } = useAccount()
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: MEMBERSHIP_MARKET_ADDRESS,
    abi: MEMBERSHIP_MARKET_ABI,
    functionName: 'buyNftWithNative',
  })

  const [nftCardData, setNftCardData] = useState([]);
  const [showLoader, setshowLoader] = useState(false);

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


  useEffect(() => {
    getDate();
  }, []);


  const NftBuy = async (data) => {


    //getting token id
    setshowLoader(true);
    const nftTableData = await getNftTableId()
    if (nftTableData.status !== 200) {

      setshowLoader(false);
      notify("get access Token")
      return
    }


    const tableId = nftTableData.data[0]["count(id)"]

    const nftCollectionData = await getNftData(data.NFT)

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


    const isInserted = await insertNftData({ id: tableId, nft: data.NFT, owner: address, used_count: 0, resold_count: 0, total_royalty: 0, mint_date: MintDate, expire_date: ExpireDate, token_id: tokenId })

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













  const getDate = async () => {
    setshowLoader(true);
    try {

      let sxtToken = localStorage.getItem('sxt-token');
      console.log('sxtToken', sxtToken);
      if(sxtToken){
        let validateToken = await validateAccessToken(sxtToken);
        console.log('vvvvvvvvvvvv', validateToken);
        if(validateToken.userId == process.env.REACT_APP_SXT_USERID){
          console.log('aaaaaaaaaaaaaaaa', validateToken);
          return
        }else{
          let sxtToken = await getSxTAccessToken();
        }
      }
      let allProviders = await getAllProviderData();
      const arr = []
      if (allProviders.status == 200) {
        setshowLoader(false);
        console.log('allProviders', allProviders);
        allProviders.data.forEach((d) => {
          let modifiedSvg = getFoodBase64Svg('asc', BASE_PINATA_URL + d.LOGO, "Food and Dining");

          arr.push({
            img: svgBase64 + modifiedSvg,
            companyName: 'asc',
            NFT_PRICE: d.NFT_PRICE,
            PROVIDER: d.PROVIDER,
            NFT: d.NFT,
            TOTAL_SUPPLY: d.TOTAL_SUPPLY,
            category: 'Food & Dining',
            BASE_META_DATA_URI: d.BASE_META_DATA_URI,
            logo: d.LOGO
          });
        });
        console.log("arr", arr);
        setNftCardData(arr);
        console.log('nftCardData', nftCardData);

      }
    } catch (error) {
      setshowLoader(false);
      notify('Something went wrong');
    };
  };






  return (
    <div>
  
            {showLoader ? <Loader /> : null}
            <ToastContainer />
            <div className="w-full pt-10 pl-10 pr-10 mb-5 shadow-[0_0_5px_0px_#8f808040] dark:shadow-[0_0_5px_0px_#1235ce40] rounded-md">
              <h1 className="text-3xl dark:text-white mb-5 border-b-2 border-primary-500 w-[full] dark:border-blue">Explore</h1>
              {
                nftCardData.some(data => { return data.category == 'Transportation' }) ?
                  <h1 className="text-2xl ml-5 mt-10 dark:text-white">Transportation</h1> : null

              }
              <div className="flex justify-around w-full flex-row flex-wrap pointer">
                {
                  nftCardData.length > 0 ?
                    nftCardData.map((data, i) => {
                      return (
                        <>
                          {
                            data.category == 'Transportation' ?
                              <div className="w-[300px] m-2 cursor-pointer" key={i}>
                                <Link to={`/card-detail?token=${data.BASE_META_DATA_URI}&?NFTAddress=${data.NFT}`}>
                                  <img src={data.img} />
                                </Link>
                                <div className='w-full'>
                                  <div className='w-full cursor-pointer'>
                                    <div className='flex flex-row ml-2 mr-2 dark:text-white'>
                                      <p>{data.companyName}</p>
                                    </div>
                                    <div className='w-full flex justify-between pl-2 pr-2'>
                                      <div className='flex flex-row justify-around dark:text-white'>
                                        <p>Price:</p>
                                        <p className='font-semibold'>{data.NFT_PRICE}</p>
                                      </div>
                                      <div className='flex flex-row justify-around dark:text-white'>
                                        <p>TOTAL SUPPLY:</p>
                                        <p className='font-semibold'>{data.TOTAL_SUPPLY}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className='w-full'>
                                    <Button className='bg-primary-500 text-white w-full dark:bg-blue' type="primary" onClick={() => NftBuy(data)}>Buy Now</Button>
                                  </div>
                                </div>
                              </div>
                              : null
                          }

                        </>
                      )
                    })
                    :
                    <Loader />
                }
              </div>
              {
                nftCardData.some(data => { return data.category == 'Sports & Activity' }) ?
                  <h1 className="text-2xl ml-5 mt-10 dark:text-white">Sports & Activity</h1> : null

              }
              <div className="flex justify-aroun w-full flex-row flex-wrap">
                {
                  nftCardData.length > 0 ?
                    nftCardData.map((data, i) => {
                      return (
                        <>
                          {
                            data.category == 'Sports & Activity' ?
                              <div className="w-[300px] m-2 cursor-pointer" key={i}>
                                <Link to={`/card-detail?token=${data.BASE_META_DATA_URI}&?NFTAddress=${data.NFT}`}>
                                  <img src={data.img} />
                                </Link>
                                <div className='w-full'>
                                  <div className='w-full cursor-pointer'>
                                    <div className='flex flex-row ml-2 mr-2 dark:text-white'>
                                      <p>{data.companyName}</p>
                                    </div>
                                    <div className='w-full flex justify-between pl-2 pr-2'>
                                      <div className='flex flex-row justify-around dark:text-white'>
                                        <p>Price:</p>
                                        <p className='font-semibold'>{data.NFT_PRICE}</p>
                                      </div>
                                      <div className='flex flex-row justify-around dark:text-white'>
                                        <p>TOTAL SUPPLY:</p>
                                        <p className='font-semibold'>{data.TOTAL_SUPPLY}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className='w-full'>
                                    <Button className='bg-primary-500 text-white w-full dark:bg-blue' type="primary" onClick={() => NftBuy(data)}  >Buy Now</Button>
                                  </div>
                                </div>
                              </div>
                              : null
                          }

                        </>
                      )
                    })
                    :
                    <Loader />
                }
              </div>
              {
                nftCardData.some(data => { return data.category == 'Food & Dining' }) ?
                  <h1 className="text-2xl ml-5 mt-10 dark:text-white">Food & Dining</h1> : null

              }
              <div className="flex justify-aroun w-full flex-row flex-wrap mb-20">
                {
                  nftCardData.length > 0 ?
                    nftCardData.map((data, i) => {
                      return (
                        <>
                          {
                            data.category == 'Food & Dining' ?
                              <div className="w-[300px] m-2 cursor-pointer" key={i}>
                                <Link to={`/card-detail?token=${data.BASE_META_DATA_URI}&?NFTAddress=${data.NFT}`}>
                                  <img src={data.img} />
                                </Link>
                                <div className='w-full'>
                                  <div className='w-full cursor-pointer'>
                                    <div className='flex flex-row ml-2 mr-2 dark:text-white'>
                                      <p>{data.companyName}</p>
                                    </div>
                                    <div className='w-full flex justify-between pl-2 pr-2'>
                                      <div className='flex flex-row justify-around dark:text-white'>
                                        <p>Price:</p>
                                        <p className='font-semibold'>{data.NFT_PRICE}</p>
                                      </div>
                                      <div className='flex flex-row justify-around dark:text-white'>
                                        <p>TOTAL SUPPLY:</p>
                                        <p className='font-semibold'>{data.TOTAL_SUPPLY}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className='w-full'>
                                    <Button className='bg-primary-500 text-white w-full dark:bg-blue' type="primary" onClick={() => NftBuy(data)} >Buy Now</Button>
                                  </div>
                                </div>

                              </div>
                              : null
                          }

                        </>
                      )
                    })
                    :
                    <Loader />
                }
              </div>
              {/* {
          !mockData1 && mockData1.length <= 0 ?
          <Loader />
            
            :
            mockData1.map((data, i) => {
              console.log("data", data);
              return (
                <div key={i}>
                  <h1 className="text-2xl ml-10 dark:text-white">{data.category}</h1>
                  <div className="flex flex-row flex-wrap justify-around w-full">
                    {
                      data.data && data.data.length > 0 ?
                        data.data.map((card, i) => {
                          return (
                            <Cart key={i} cardData={card} showBtn={true}></Cart>
                          )
                        })
                        :
                        <p>Error</p>
                    }
                  </div>
                </div>
              )
            })
        } */}

            </div>

    </div>
  );
};

export default Explore;
