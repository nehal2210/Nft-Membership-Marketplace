import React, { useEffect, useState } from 'react';
import Cart from '../../components/general-components/cart';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Loader from '../../components/general-components/loader';
import { getProviderNftOwner } from '../../helperFunctions/sxt';
import { ToastContainer, toast } from "react-toastify";
import { SvgOnBuy } from '../../membershipCards';
import { BASE_PINATA_URL, svgBase64 } from '../../constants';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const UserDashboard = () => {



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


    const [showLoader, setshowLoader] = useState(false);
    const [cards, setcards] = useState([]);
    const { address, isConnected, isDisconnected } = useAccount();


    useEffect(() => {

        if (address) {
            getData();
        }
    }, [address])

    const getData = async () => {
        console.log('gettt', address);


        try {
            setshowLoader(true);
            const res = await getProviderNftOwner(address);
            console.log('res', res);
            if (res.status !== 200) {
                setshowLoader(false);
                notify('error in getting provider data')
            } else {
                setshowLoader(false);
                let arr = [];

                res.data.forEach((d) => {
                    const owner = address.substring(0, 5) + "..." + address.substring(35)
                    const base64Img = SvgOnBuy(d.companyName ? d.companyName : 'ASC', BASE_PINATA_URL + d.logo, d?.category ? d.category : 'Food and dining', owner)
                    let img = svgBase64 + base64Img;

                    arr.push({
                        img: img,
                        owner: owner,
                        companyName: 'asc',
                        NFT_PRICE: d.NFT_PRICE,
                        PROVIDER: d.PROVIDER,
                        NFT: d.NFT,
                        TOTAL_SUPPLY: d.TOTAL_SUPPLY,
                        category: 'Food and dining',
                        BASE_META_DATA_URI: d.BASE_META_DATA_URI,
                        logo: d.LOGO,
                    });
                });

                setcards(arr);
                console.log('card', arr);

            }
        } catch (error) {
            setshowLoader(false);

        }



    }

    // const [mockData, setMockData] = useState([
    //     {
    //         category: 'Dining',
    //         data: [
    //             {
    //                 id: 1,
    //                 cardName: 'NFT Famous Monkey',
    //                 cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
    //                 companyName: 'GRANDEUR',
    //                 companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
    //                 secondCompanyName: 'Mcdonalds',
    //                 secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
    //                 price: '250$'
    //             },
    //             {
    //                 id: 2,
    //                 cardName: 'NFT Famous Monkey',
    //                 cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
    //                 companyName: 'GRANDEUR',
    //                 companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
    //                 secondCompanyName: 'Mcdonalds',
    //                 secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
    //                 price: '250$'
    //             },
    //             {
    //                 id: 3,
    //                 cardName: 'NFT Famous Monkey',
    //                 cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
    //                 companyName: 'GRANDEUR',
    //                 companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
    //                 secondCompanyName: 'Mcdonalds',
    //                 secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
    //                 price: '250$'
    //             },
    //         ]
    //     },
    //     {
    //         category: 'Delivery',
    //         data: [
    //             {
    //                 id: 4,
    //                 cardName: 'NFT Famous Monkey',
    //                 cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
    //                 companyName: 'GRANDEUR',
    //                 companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
    //                 secondCompanyName: 'Mcdonalds',
    //                 secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
    //                 price: '250$'
    //             },
    //             {
    //                 id: 5,
    //                 cardName: 'NFT Famous Monkey',
    //                 cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
    //                 companyName: 'GRANDEUR',
    //                 companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
    //                 secondCompanyName: 'Mcdonalds',
    //                 secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
    //                 price: '250$'
    //             },
    //             {
    //                 id: 6,
    //                 cardName: 'NFT Famous Monkey',
    //                 cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
    //                 companyName: 'GRANDEUR',
    //                 companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
    //                 secondCompanyName: 'Mcdonalds',
    //                 secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
    //                 price: '250$'
    //             },
    //             {
    //                 id: 7,
    //                 cardName: 'NFT Famous Monkey',
    //                 cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
    //                 companyName: 'GRANDEUR',
    //                 companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
    //                 secondCompanyName: 'Mcdonalds',
    //                 secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
    //                 price: '250$'
    //             },
    //             {
    //                 id: 8,
    //                 cardName: 'NFT Famous Monkey',
    //                 cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
    //                 companyName: 'GRANDEUR',
    //                 companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
    //                 secondCompanyName: 'Mcdonalds',
    //                 secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
    //                 price: '250$'
    //             },
    //             {
    //                 id: 9,
    //                 cardName: 'NFT Famous Monkey',
    //                 cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
    //                 companyName: 'GRANDEUR',
    //                 companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
    //                 secondCompanyName: 'Mcdonalds',
    //                 secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
    //                 price: '250$'
    //             },
    //         ]
    //     }
    // ]);

    return (
        <div className="w-full">
            {
                showLoader ?
                    <Loader />
                    :
                    <>
                        <ToastContainer />
                        <h1 className="text-3xl dark:text-white border-b-2 border-primary-500 w-[full] dark:border-blue">User Dashboard</h1>

                        {
                            !isConnected ?
                                <div className='h-[80vh] w-full flex justify-center items-center flex-col p-10'>
                                    <ConnectButton />
                                    <p>Please Connect Your Wallet</p>
                                </div>
                                :
                                <div className='flex justify-around w-full flex-row flex-wrap pointer mt-10 mb-20'>
                                    {
                                        cards ?
                                            cards.map((data, i) => {
                                                return (
                                                    <div className="w-[300px] m-2 cursor-pointer" key={i}>
                                                        <Link to={`/my-card-detail?token=${data.BASE_META_DATA_URI}&?NFTAddress=${data.NFT}`}>
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
                                                                <Button className='bg-black text-white w-full dark:bg-blue' type="primary">Use NFT</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <Loader />
                                    }
                                </div>

                        }

                        {/* {
    mockData && mockData.length > 0 ?
        mockData.map((data, i) => {
            return (
                <div key={i}>
                    <h1 className="text-2xl ml-10 dark:text-white">{data.category}</h1>
                    <div className="flex flex-row flex-wrap justify-around w-full">
                        {
                            data.data && data.data.length > 0 ?
                                data.data.map((card, i) => {
                                    return (
                                        <Cart key={i} cardData={card} showBtn={false}></Cart>
                                    )
                                })
                                :
                                'Loading...'
                        }
                    </div>
                </div>
            )
        })
        :
        'Loading...'
} */}
                    </>
            }

        </div>
    )
}

export default UserDashboard;