import { Button, DatePicker } from 'antd';
import React from 'react'
import { Progress, Space } from 'antd';
import { Link } from 'react-router-dom';
import grendeurLogo from '../../assets/g-logo.png'
import food from '../../assets/foods.png'
import sports from '../../assets/sports.png'
import transportation from '../../assets/transportation.png'
import { BASE_PINATA_URL } from '../../constants';

const Cart = ({ cardData, showBtn, showDetails, eventFire, routeUrl, btnName }) => {
    console.log('aaaaaaaaaa', cardData)
    return (
        <div className='w-80 m-5 mb-10 bg-[#8f808003] shadow-[0_0_5px_0px_#8f808040] rounded-t-xl'>
            <Link to={cardData.routeUrl}>
                <div className='w-80 cursor-pointer bg-white border-blue border-2 flex rounded-xl flex-col justify-start'>
                    <div className='cart-header w-full h-8 flex flex-row justify-between p-2'>
                        <div className='flex flex-row items-start'>
                            <img width={30} src={grendeurLogo} />
                            <p className='ml-1'>rendeur</p>
                        </div>
                        <div className='flex flex-row items-start'>
                            <img width={30} src={BASE_PINATA_URL+cardData?.logo} />
                            <p className='ml-1'>{cardData.companyName}</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='p-4 mt-4 mb-4 rounded-full w-20 border-2 border-blue'>
                            <img src={cardData.category == 0 ? food : cardData.category == 1 ? transportation : sports} />
                        </div>

                        <div className='h-12 p-0 m-0 w-full flex justify-around items-center flex-row rounded-b-[0.55rem] bg-primary-500'>
                            <div></div>
                            <div className='text-white tracking-widest'>{cardData.owner}</div>
                            <div className='rounded-full bg-black w-8 h-8 text-white flex justify-center items-center'>{cardData.useCount}</div>
                        </div>
                    </div>
                </div>
            </Link>
{
    showDetails ? 
<div className='w-full'>
                <Link to={cardData.routeUrl}>
                    <div className='w-full cursor-pointer'>
                        <div className='flex flex-row ml-2 mr-2 dark:text-white'>
                            <p>{cardData.companyName}</p>
                        </div>
                        <div className='w-full flex justify-between pl-2 pr-2'>
                            <div className='flex flex-row justify-around dark:text-white'>
                                <p>Price: </p>
                                <p className='font-semibold'>{cardData.NFT_PRICE}</p>
                            </div>
                            <div className='flex flex-row justify-around dark:text-white'>
                                <p>Total Supply: </p>
                                <p className='font-semibold'>{cardData.TOTAL_SUPPLY}</p>
                            </div>
                        </div>
                    </div>
                </Link>

                <div className='w-full'>
                    {
                        showBtn ?
                                <Button onClick={() => eventFire()} className='bg-primary-500 text-white w-full dark:bg-blue' type="primary">{cardData.btnName}</Button>
                            : null
                    }
                </div>



            </div>
            : 
            null
}
            
        </div>
    )
}

export default Cart;