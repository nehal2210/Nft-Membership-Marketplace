import { Button, Table, Tag, Tooltip } from 'antd';
import { AiFillGolden, AiFillSignal, AiOutlineRise } from "react-icons/ai";
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ToastContainer, toast } from "react-toastify";
import Loader from '../../components/general-components/loader';
import { getProviderNftData } from '../../helperFunctions/sxt';
import companyLogo from '../../assets/mcdonalds.png'

const ProviderDashboard = () => {



    const { address, isConnected, isDisconnected } = useAccount();
    const [showLoader, setShowLoader] = useState(false);
    const [showErr, setShowErr] = useState('');

    useEffect(() => {

        if (address) {
            getData();
        }
    }, [address]);


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


    const getData = async () => {
        console.log('dataaaa', address);


        try {
            setShowLoader(true);
            const res = await getProviderNftData(address);
            console.log('res', res);
            if (res.status !== 200) {
                setShowLoader(false);
                notify('error in getting provider data')
            } else if (res.data.length <= 0) {
                setShowLoader(false);
                let arr = [];
                notify('error in getting provider data')
                setShowErr('You are not a creator, please create NFT!')

                console.log('card', arr);

            } else {
                setShowLoader(false);
                let arr = [];
                notify('error in getting provider data')
                setShowErr('You are not a creator, please create your NFT!')

                console.log('card', arr);

            }
        } catch (error) {
            setShowLoader(false);

        }



    }



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
        },
        {
            title: 'Notify User',
            key: 'notify',
            dataIndex: 'notify',
            render: (_,) => (


                <Button className='bg-primary-500 text-white w-full dark:bg-blue' type="primary" >
                    {"Notify to Use NFT"}
                </Button>
            ),
        },
    ];
    let data = [
        {
            id: 0,
            token_id: 5,
            owner: '0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623',
            used_count: 5,
            resold_count: 43,
            total_royalty: '100$',
            mint_date: '06/Jun/2023',
            expire_date: 1716828751,
        },
        {
            id: 1,
            token_id: 32,
            owner: '0xbcFA8eAB1fCe576asdgjdgasjgdasdje0ADCsa564',
            used_count: 25,
            resold_count: 10,
            total_royalty: '30$',
            mint_date: '10/Jun/2023',
            expire_date: '06/Jun/2025',
        },
        {
            id: 2,
            token_id: 43,
            owner: '0xbcFA8eAB1fCe576yugsyuas8d6as7862342jasdasd',
            used_count: 54,
            resold_count: 44,
            total_royalty: '67$',
            mint_date: '02/Feb/2023',
            expire_date: '02/Feb/2025',
        },
        {
            id: 3,
            token_id: 23,
            owner: '0xbcFA8eAB1fCe576F1Ef71772E46518898sd9fsd678s',
            used_count: 32,
            resold_count: 34,
            total_royalty: '400$',
            mint_date: '17/Feb/2023',
            expire_date: '17/Feb/2025',
        },
        {
            id: 4,
            token_id: 567,
            owner: '0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623',
            used_count: 75,
            resold_count: 75,
            total_royalty: '300$',
            mint_date: '12/Mar/2023',
            expire_date: '12/Mar/2025',
        },
        {
            id: 5,
            token_id: 55,
            owner: '0xbcFA8eAB1fCe576F1Ef71772E46kkehtjkwe9sdf',
            used_count: 34,
            resold_count: 54,
            total_royalty: '532$',
            mint_date: '03/Nov/2022',
            expire_date: '03/Nov/2024',
        },
        {
            id: 7,
            token_id: 64,
            owner: '0xbcFA8eAB1fCe576F1Ef71772E4kjfkldhfkrwr32',
            used_count: 74,
            resold_count: 45,
            total_royalty: '65$',
            mint_date: '14/Apr/2022',
            expire_date: '14/Apr/2024',
        },
        {
            id: 8,
            token_id: 43,
            owner: '0xbcFA8eAB1fCe576yugsyuas8d6as7862342jasdasd',
            used_count: 54,
            resold_count: 44,
            total_royalty: '67$',
            mint_date: '02/Feb/2023',
            expire_date: '02/Feb/2025',
        },
        {
            id: 9,
            token_id: 23,
            owner: '0xbcFA8eAB1fCe576F1Ef71772E46518898sd9fsd678s',
            used_count: 32,
            resold_count: 34,
            total_royalty: '400$',
            mint_date: '17/Feb/2023',
            expire_date: '17/Feb/2025',
        },
        {
            id: 10,
            token_id: 567,
            owner: '0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623',
            used_count: 75,
            resold_count: 75,
            total_royalty: '300$',
            mint_date: '12/Mar/2023',
            expire_date: '12/Mar/2025',
        },
        {
            id: 11,
            token_id: 55,
            owner: '0xbcFA8eAB1fCe576F1Ef71772E46kkehtjkwe9sdf',
            used_count: 34,
            resold_count: 54,
            total_royalty: '532$',
            mint_date: '03/Nov/2022',
            expire_date: '03/Nov/2024',
        },
        {
            id: 12,
            token_id: 64,
            owner: '0xbcFA8eAB1fCe576F1Ef71772E4kjfkldhfkrwr32',
            used_count: 74,
            resold_count: 45,
            total_royalty: '65$',
            mint_date: '14/Apr/2022',
            expire_date: '14/Aprov/2024',
        }
    ];

    data.forEach((ele, i) => {
        ele['key'] = i;
    })


    return (
        <div className="w-full min-h-[70vh]">
            <ToastContainer />
            {/* <ToastContainer /> */}
            <h1 className="text-3xl dark:text-white border-b-2 border-primary-500 w-[full] dark:border-blue">Provider Dashboard</h1>
            {
                showLoader ?
                    <Loader />
                    :
                    <>
                        {
                            !isConnected ?
                                <div className='h-[80vh] w-full flex justify-center items-center flex-col p-10'>
                                    <ConnectButton />
                                    <p>Please Connect Your Wallet</p>
                                </div>
                                :
                                <div>
                                    {
                                        showErr ?
                                            <div className='h-[80vh] w-full flex justify-center items-center flex-col p-10'>
                                                <p className='text-xl'>{showErr}</p>
                                            </div>
                                            :
                                            <>
                                                <div className='w-full flex justify-between items-center'>

                                                    <div className='m-2 w-[20%] p-1'>
                                                        <div className='flex items-center justify-center flex-col'>
                                                            <div className='w-40'>
                                                                <img className='w-full' src={companyLogo} />
                                                            </div>
                                                            <h2 className='text-2xl font-bold dark:text-white'>Mcdonald's</h2>
                                                        </div>
                                                    </div>

                                                    <div className='w-[60%] flex flex-row justify-between'>
                                                        <div className='m-2 p-1 card-gradient rounded-md'>
                                                            <div className='w-56 bg-white dark:bg-black flex flex-row justify-center rounded-md items-center'>
                                                                <div className='w-full h-24 dark:text-white flex flex-col justify-between items-center'>
                                                                    <p className='text-lg'>Royalties earned</p>
                                                                    <div className='w-full flex justify-around flex-row items-center'>
                                                                        <div></div>
                                                                        <p className='text-3xl font-bold'>500000$</p>
                                                                        <AiFillSignal size={60} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className='m-2 p-1 card-gradient rounded-md'>
                                                            <div className='w-56 bg-white dark:bg-black flex flex-row justify-center rounded-md items-center'>
                                                                <div className='w-full h-24 dark:text-white flex flex-col justify-between items-center'>
                                                                    <p className='text-lg'>NFT sold / NFTs Remain</p>
                                                                    <div className='w-full flex justify-around flex-row items-center'>
                                                                        <div></div>
                                                                        <p className='text-3xl font-bold'>14 / 50</p>
                                                                        <AiFillGolden size={60} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='m-2 p-1 card-gradient rounded-md'>
                                                            <div className='w-56 bg-white dark:bg-black flex flex-row justify-center rounded-md items-center'>
                                                                <div className='w-full h-24 dark:text-white flex flex-col justify-between items-center'>
                                                                    <p className='text-lg'>Revenue</p>
                                                                    <div className='w-full flex justify-around flex-row items-center'>
                                                                        <div></div>
                                                                        <p className='text-3xl font-bold'>490032$</p>
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
                                            </>
                                    }

                                </div>

                        }
                    </>
            }

        </div>

    )
};
export default ProviderDashboard;

// (id, nft, owner, used_count, resold_count, total_royalty, mint_date, expire_date, token_id)
//  (0,'0x07dbC5662442cdD6F7461982D493788FcC70A572', '0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623',0,0,0, 1685206597, 1716828751, 0)"