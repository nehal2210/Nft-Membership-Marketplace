import React, { useState } from "react";
import Cart from "../../components/general-components/cart";
import { useAccount, useContractWrite } from 'wagmi'
import { MEMBERSHIP_MARKET_ADDRESS } from "../../contracts/Address";
import { MEMBERSHIP_MARKET_ABI } from "../../contracts/ABI/membershipMarketAbi";
const Explore = () => {



  const { address, isConnected, isDisconnected } = useAccount()
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: MEMBERSHIP_MARKET_ADDRESS,
    abi: MEMBERSHIP_MARKET_ABI,
    functionName: 'buyNftWithNative',
  })

  // buyNftWithNative(address to, address _nft, string memory tokenUri)

  const [mockData, setMockData] = useState([
    {
      category: 'Dining',
      data: [
        {
          id: 1,
          cardName: 'NFT Famous Monkey',
          cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
          companyName: 'GRANDEUR',
          companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
          secondCompanyName: 'Mcdonalds',
          secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
          price: '250$'
        },
        {
          id: 2,
          cardName: 'NFT Famous Monkey',
          cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
          companyName: 'GRANDEUR',
          companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
          secondCompanyName: 'Mcdonalds',
          secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
          price: '250$'
        },
        {
          id: 3,
          cardName: 'NFT Famous Monkey',
          cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
          companyName: 'GRANDEUR',
          companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
          secondCompanyName: 'Mcdonalds',
          secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
          price: '250$'
        },
      ]
    },
    {
      category: 'Delivery',
      data: [
        {
          id: 4,
          cardName: 'NFT Famous Monkey',
          cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
          companyName: 'GRANDEUR',
          companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
          secondCompanyName: 'Mcdonalds',
          secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
          price: '250$'
        },
        {
          id: 5,
          cardName: 'NFT Famous Monkey',
          cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
          companyName: 'GRANDEUR',
          companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
          secondCompanyName: 'Mcdonalds',
          secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
          price: '250$'
        },
        {
          id: 6,
          cardName: 'NFT Famous Monkey',
          cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
          companyName: 'GRANDEUR',
          companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
          secondCompanyName: 'Mcdonalds',
          secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
          price: '250$'
        },
        {
          id: 7,
          cardName: 'NFT Famous Monkey',
          cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
          companyName: 'GRANDEUR',
          companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
          secondCompanyName: 'Mcdonalds',
          secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
          price: '250$'
        },
        {
          id: 8,
          cardName: 'NFT Famous Monkey',
          cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
          companyName: 'GRANDEUR',
          companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
          secondCompanyName: 'Mcdonalds',
          secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
          price: '250$'
        },
        {
          id: 9,
          cardName: 'NFT Famous Monkey',
          cardLogo: 'https://i.pinimg.com/736x/4a/d8/4c/4ad84c52bc3d5e190ae480070a78f909--vector-photo-free-icon.jpg',
          companyName: 'GRANDEUR',
          companyLogo: 'https://logoeps.com/wp-content/uploads/2013/07/apple-mac-vector-logo.png',
          secondCompanyName: 'Mcdonalds',
          secondCompanyLogo: 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.svg',
          price: '250$'
        },
      ]
    }
  ]);

  return (
    <div>
      <div className="w-full pt-10 pl-10 pr-10 mb-5 shadow-[0_0_5px_0px_#8f808040] dark:shadow-[0_0_5px_0px_#1235ce40] rounded-md">
        <h1 className="text-3xl dark:text-white mb-5 border-b-2 border-primary-500 w-[full] dark:border-blue">Explore</h1>

        {
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
                            <Cart key={i} cardData={card} showBtn={true}></Cart>
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
        }

      </div>

    </div>
  );
};

export default Explore;
