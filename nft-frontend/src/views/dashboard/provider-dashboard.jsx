import { Table } from 'antd';
import { AiFillSignal } from "react-icons/ai";
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
        owner: '0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623',
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
            <div className='flex items-center'>
                <div className='w-20'>
                    <img className='object-fill' src='https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x300' />
                </div>
                <h2 className='text-4xl font-bold ml-2'>COMPANY NAME</h2>
            </div>
            <div className='w-full mt-2 border-2 flex justify-between items-center'>
                <div className='m-2 w-60 h-32 border-2 flex flex-row justify-center items-start'>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-xl'>Royalties earned</p>
                        <div>
                            <p className='text-2xl font-bold'>50</p>
                            <AiFillSignal style={{ position: 'relative', fontSize: '80px', left: '73px', bottom: '20px' }} />
                        </div>
                    </div>
                </div>
                <div className='m-2 w-40 h-20 border-2'></div>
                <div className='m-2 w-40 h-20 border-2'></div>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
};
export default ProviderDashboard;

// (id, nft, owner, used_count, resold_count, total_royalty, mint_date, expire_date, token_id)
//  (0,'0x07dbC5662442cdD6F7461982D493788FcC70A572', '0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623',0,0,0, 1685206597, 1716828751, 0)"