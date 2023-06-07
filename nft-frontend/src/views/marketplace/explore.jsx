import React, { useState, useEffect } from "react";
import { getAllProviderData } from "../../helperFunctions/sxt";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/general-components/loader";
import { getFoodBase64Svg } from "../../membershipCards";
import { BASE_PINATA_URL, svgBase64 } from "../../constants";
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

  const [nftCardData, setNftCardData] = useState([]);

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


  useEffect(() => {
    getDate();
  }, []);


  const getDate = async () => {
    try {
      let allProviders = await getAllProviderData();
      const arr = []
      if (allProviders.status == 200) {
        console.log('allProviders', allProviders);
        allProviders.data.forEach((d) => {
          let modifiedSvg = getFoodBase64Svg('asc', BASE_PINATA_URL + d.LOGO, 'https://www.freeiconspng.com/thumbs/travel-icon/travel-guide-icon-map-ticket-travel-icon-17.png');

          arr.push({
            img: svgBase64 + modifiedSvg,
            companyName: 'asc',
            NFT_PRICE: d.NFT_PRICE,
            PROVIDER: d.PROVIDER,
            NFT: d.NFT,
            TOTAL_SUPPLY: d.TOTAL_SUPPLY,
            category: 'Food & Dining'
          },
            {
              img: svgBase64 + modifiedSvg,
              companyName: 'asc',
              NFT_PRICE: d.NFT_PRICE,
              PROVIDER: d.PROVIDER,
              NFT: d.NFT,
              TOTAL_SUPPLY: d.TOTAL_SUPPLY,
              category: 'Transportation'
            },
            {
              img: svgBase64 + modifiedSvg,
              companyName: 'asc',
              NFT_PRICE: d.NFT_PRICE,
              PROVIDER: d.PROVIDER,
              NFT: d.NFT,
              TOTAL_SUPPLY: d.TOTAL_SUPPLY,
              category: 'Food & Dining'
            },
            {
              img: svgBase64 + modifiedSvg,
              companyName: 'asc',
              NFT_PRICE: d.NFT_PRICE,
              PROVIDER: d.PROVIDER,
              NFT: d.NFT,
              TOTAL_SUPPLY: d.TOTAL_SUPPLY,
              category: 'Sports & Activity'
            });
        });
        console.log("arr", arr);
        setNftCardData(arr);
        console.log('nftCardData', nftCardData);

      }
    } catch (error) {
      notify('Something went wrong');
    };
  };




  // buyNftWithNative(address to, address _nft, string memory tokenUri)

  return (
    <div>
      <ToastContainer />
      <div className="w-full pt-10 pl-10 pr-10 mb-5 shadow-[0_0_5px_0px_#8f808040] dark:shadow-[0_0_5px_0px_#1235ce40] rounded-md">
        <h1 className="text-3xl dark:text-white mb-5 border-b-2 border-primary-500 w-[full] dark:border-blue">Explore</h1>
        {
          nftCardData.some(data => { return data.category == 'Transportation' }) ?
            <h1 className="text-2xl ml-5 mt-10 dark:text-white">Transportation</h1> : null

        }
        <div className="flex justify-aroun w-full flex-row flex-wrap pointer">
          {
            nftCardData.length > 0 ?
              nftCardData.map((data, i) => {
                return (
                  <>
                    {
                      data.category == 'Transportation' ?
                        <div className="w-[300px] m-2" key={i}>
                          <img src={data.img} />

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
                        <div className="w-[300px] m-2" key={i}>
                          <img src={data.img} />

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
                        <div className="w-[300px] m-2" key={i}>
                          <img src={data.img} />

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
