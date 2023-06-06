import { Table, Tooltip } from 'antd';
import { AiFillGolden, AiFillSignal, AiOutlineRise } from "react-icons/ai";
import React, { useState } from 'react';
const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'Token Id',
        dataIndex: 'token_id',
    },
    {
        title: 'Owner',
        dataIndex: 'owner',
    },
    {
        title: 'Used Count',
        dataIndex: 'used_count',
    },
    {
        title: 'Resold Count',
        dataIndex: 'resold_count',
    },
    {
        title: 'Total Royalty',
        dataIndex: 'total_royalty',
    },
    {
        title: 'Mint Date',
        dataIndex: 'mint_date',
    },
    {
        title: 'Expire Date',
        dataIndex: 'expire_date',
    }
];
let data = [
    {
        id: 0,
        token_id: 0,
        owner: '0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623',
        used_count: 0,
        resold_count: 0,
        total_royalty: 0,
        mint_date: 0,
        expire_date: 1716828751
    },
    {
        id: 0,
        token_id: 0,
        dataIndex: '0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623',
        owner: '0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623',
        ellipsis: {
            showTitle: false,
        },
        render: (address) => (
            <Tooltip placement="topLeft" title={address}>
                {address}
            </Tooltip>
        ),
        used_count: 0,
        resold_count: 0,
        total_royalty: 0,
        mint_date: 0,
        expire_date: 1716828751
    }
];

data.forEach((ele, i) => {
    ele['key'] = i;
})
const ProviderDashboard = () => {
    return (
        <div>

            <div className='w-full flex justify-between items-center'>

                <div className='m-2 w-[20%] p-1'>
                    <div className='flex items-center justify-center flex-col'>
                        <div className='w-40'>
                            <img className='object-fill' src='https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x300' />
                        </div>
                        <h2 className='text-2xl font-bold ml-2 dark:text-white'>COMPANY NAME</h2>
                    </div>
                </div>

                <div className='w-[60%] flex flex-row justify-between'>
                    <div className='m-2 p-1 card-gradient rounded-md'>
                        <div className='w-52 bg-white dark:bg-black flex flex-row justify-center rounded-md items-center'>
                            <div className='w-full h-24 dark:text-white flex flex-col justify-between items-center'>
                                <p className='text-lg'>Royalties earned</p>
                                <div className='w-full flex justify-around flex-row items-center'>
                                    <div></div>
                                    <p className='text-3xl font-bold'>50</p>
                                    <AiFillSignal size={60} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='m-2 p-1 card-gradient rounded-md'>
                        <div className='w-52 bg-white dark:bg-black flex flex-row justify-center rounded-md items-center'>
                            <div className='w-full h-24 dark:text-white flex flex-col justify-between items-center'>
                                <p className='text-lg'>NFT sold / NFTs Remain</p>
                                <div className='w-full flex justify-around flex-row items-center'>
                                    <div></div>
                                    <p className='text-3xl font-bold'>50 / 50</p>
                                    <AiFillGolden size={60} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='m-2 p-1 card-gradient rounded-md'>
                        <div className='w-52 bg-white dark:bg-black flex flex-row justify-center rounded-md items-center'>
                            <div className='w-full h-24 dark:text-white flex flex-col justify-between items-center'>
                                <p className='text-lg'>Revenue</p>
                                <div className='w-full flex justify-around flex-row items-center'>
                                    <div></div>
                                    <p className='text-3xl font-bold'>50</p>
                                    <AiOutlineRise size={60} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5 mb-10'>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
};
export default ProviderDashboard;

// (id, nft, owner, used_count, resold_count, total_royalty, mint_date, expire_date, token_id)
//  (0,'0x07dbC5662442cdD6F7461982D493788FcC70A572', '0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623',0,0,0, 1685206597, 1716828751, 0)"