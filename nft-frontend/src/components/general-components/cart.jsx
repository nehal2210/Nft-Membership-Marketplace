import { Button, DatePicker } from 'antd';
import React from 'react'
import { Progress, Space } from 'antd';


const Cart = ({ cardData }) => {

    return (
        <div className='w-80 m-5 mb-10 bg-[#8f808003] shadow-[0_0_5px_0px_#8f808040] rounded-t-xl'>
            <div className='w-80 bg-white border-blue border-2 flex rounded-xl flex-col justify-start'>
                <div className='cart-header w-full h-8 flex flex-row justify-between p-2'>
                    <div className='flex flex-row items-start'>
                        <img width={23} src={cardData.companyLogo} />
                        <p className='ml-1'>{cardData.companyName} {cardData.id}</p>
                    </div>
                    <div className='flex flex-row items-start'>
                        <img width={23} src={cardData.secondCompanyLogo} />
                        <p className='ml-1'>{cardData.secondCompanyName}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='p-4 mt-2 mb-2 rounded-full w-20 border-2 border-blue'>
                        <img src={cardData.cardLogo} />
                    </div>
                    <div className='w-full pl-2 pr-2'>
                        <Progress percent={50} status="active" />
                    </div>
                    <div className='h-12 p-0 m-0 w-full flex justify-around items-center flex-row rounded-b-[0.55rem] bg-primary-500'>
                        <div></div>
                        <div className='text-white tracking-widest'>Venkatesh Patil</div>
                        <div className='rounded-full bg-black w-8 h-8 text-white flex justify-center items-center'>21</div>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-full'>
                    <div className='flex flex-row ml-2 mr-2'>
                        <p>{cardData.cardName}</p>
                    </div>
                    <div className='w-full flex justify-between pl-2 pr-2'>
                        <div className='flex flex-row justify-around'>
                            <p>Price:</p>
                            <p className='font-semibold'>{cardData.price}</p>
                        </div>
                        <div className='flex flex-row justify-around'>
                            <p>Price:</p>
                            <p className='font-semibold'>200$</p>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <Button className='bg-black text-white w-full' type="primary">Buy Now</Button>
                </div>



            </div>
        </div>
    )
}

export default Cart;