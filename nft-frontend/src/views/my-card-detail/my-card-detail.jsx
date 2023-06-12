import React, { useState, useEffect, useMemo } from 'react';
import { Button, Progress } from 'antd';
import { AiOutlineMenu, AiFillEye, AiOutlineHeart, AiFillGold, AiOutlineBank, AiOutlineRise, AiOutlinePartition } from "react-icons/ai";
import { BiBarChartAlt2, BiCalendar, BiFlag, BiStar } from "react-icons/bi";
import * as moment from 'moment';
import { useLocation } from "react-router-dom";
import { BASE_PINATA_URL, CATEGORY_NAME, svgBase64 } from '../../constants';
import cardSVG from '../../assets/card.PNG'
import { getTokenURI } from '../../contractFunctions';
import { useAccount } from 'wagmi';
import { SvgOnBuy } from '../../membershipCards';
import Cart from '../../components/general-components/cart';
import { ToastContainer } from 'react-toastify';
import Loader from '../../components/general-components/loader';

const MyCardDetail = () => {

    const { address, isConnected, isDisconnected } = useAccount();
    const [showLoader, setshowLoader] = useState(false);
    const [modifiedData, setModifiedData] = useState({
        attribute: '',
        data: [],
    });
    const [cardDetail, setCardDetail] = useState({});
    const tokenId = new URLSearchParams(useLocation().search).get("tokenId");
    const NFTAddress = new URLSearchParams(useLocation().search).get("NFTAddress");
    const category = new URLSearchParams(useLocation().search).get("cat");
    const companyLogo = new URLSearchParams(useLocation().search).get("logo");
    const uri = new URLSearchParams(useLocation().search).get("uri");

    console.log('tokenId', tokenId);
    console.log('NFTAddress', NFTAddress);

    const fetchUserData = async () => {

        setshowLoader(true);
        const tokenURI = await getTokenURI(NFTAddress, tokenId);
        console.log('tokenURI', tokenURI);

        // https://magenta-distinct-guan-162.mypinata.cloud/ipfs/bafkreih53vgianmjgkayvtkmfkqy7tke5bqlsio6pfh4d4w22u5yrjhxgq
        fetch(tokenURI)
            .then(response => {
                setshowLoader(false);
                return response.json()
            })
            .then(data => {
                 setshowLoader(false);
                var changingData = {
                    properties: [],
                    stats: [],
                    boots: [],
                    date: [],
                    countries: [],
                    remaining: [],
                    bankings: [],
                    category: "",
                    usedCount: 0                    
                };
                console.log('data', data);
                const owner = address.substring(0, 5) + "..." + address.substring(35)
                // const base64Img = SvgOnBuy(data.name, BASE_PINATA_URL + data.LOGO, category, owner)
                // let img = svgBase64 + base64Img;
                // data.image_data = img;
                setCardDetail(data);
                data?.attributes?.forEach((data) => {
                    if (data.display_type == null && typeof data.value == 'string') {
                        changingData['properties'].push(data);
                    } else if (data.display_type == null && typeof data.value == 'number' && data.trait_type == 'Remaining Amount') {
                        changingData['remaining'].push(data);
                    }
                    

                    
                    else if (data.display_type == null && typeof data.value == 'number') {
                        changingData['bankings'].push(data);

                    } 

                    else if (data.trait_type === "Used Count") {
                        console.log("aaaaaaaaaaaaaaaaa",data.value)
                        changingData["usedCount"] = data.value;
                        changingData['stats'].push(data);
                    }
                    
                    else if (data.display_type == 'boost_percentage') {
                        changingData['boots'].push(data);
                    } else if (data.display_type == 'date') {
                        changingData['date'].push(data);
                    } else if (data.display_type == 'map') {
                        changingData['countries'].push(data);
                    } else if (data.display_type == 'category') {
                        changingData['category'] = data.value;
                    }
              
                });
                setModifiedData(changingData);
                console.log('deeeeee', modifiedData);
            })
    }





    useEffect(() => {


        fetchUserData();
    }, []);


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
            {/* LEFT SIDE */}
            <ToastContainer />
            {showLoader ? <Loader /> : null}
            <div className='w-[40%]'>
                <div className='border-deep-orange-50 w-full rounded-xl'>
                    {/* <img
                        className='rounded-xl ml-6'
                        alt="example"
                        src={cardDetail.image_data}
                    /> */}
                      <Cart cardData={{
                        companyName: cardDetail.name,
                        NFT: '',
                        TOTAL_SUPPLY: '',
                        category: category,
                        BASE_META_DATA_URI: '',
                        logo: companyLogo,
                        owner: address.substring(0, 5) + "..." + address.substring(35),
                        useCount: modifiedData["usedCount"],
                        routeUrl: '',
                        btnName: 'Use NFT'
                    }} showBtn={false} showDetails={false} />
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

                <div className='w-full mt-5'>
                    <div className='flex items-center'>
                        <AiOutlinePartition size={'20px'} color='gray' />
                        <h2 className='ml-2'>Remaining Amount</h2>
                    </div>
                    <div className='mt-2 border-t-2 border-blue-gray-50'>
                        {
                            modifiedData?.remaining?.map((data, i) => {
                                return (
                                    <div key={i} className='w-80 p-5 pt-2'>
                                        <p><span className='text-4xl font-semibold text-primary-500 mr-2'>{data.value}</span>/{data.max_value}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


            </div>
            <div className='w-[60%] p-2 pl-10'>
                <h2 className='mt-5 font-bold text-2xl '>{cardDetail.name}</h2>
                <p>Owned by <span className='cursor-pointer text-light-blue-700'>{address}</span></p>
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
                    <span className='text-white'>Use NFT</span>
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
                                        <p className='text-lg'>{data.trait_type == 'Expiry' ? `${data.value} ${data.duration}` : data.value}</p>
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

export default MyCardDetail;