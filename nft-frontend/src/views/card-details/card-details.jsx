import React, { useState, useEffect, useMemo } from 'react';
import { Button, Progress } from 'antd';
import { AiOutlineMenu, AiFillEye, AiOutlineHeart, AiFillGold, AiOutlineBank, AiOutlineRise } from "react-icons/ai";
import { BiBarChartAlt2, BiCalendar, BiFlag, BiStar } from "react-icons/bi";
import * as moment from 'moment'

const CardDetails = () => {

    const [modifiedData, setModifiedData] = useState({
        attribute: '',
        data: [],
    });
    const [cardDetail, setCardDetail] = useState({});

    const fetchUserData = () => {
        fetch("https://magenta-distinct-guan-162.mypinata.cloud/ipfs/QmQprRZRMU7vNjh2sbGByrZrtVHhTLx3pboYoWbbpa7rCt")
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
                    <span className='text-white'>Buy Now</span>
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