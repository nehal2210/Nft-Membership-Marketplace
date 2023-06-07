import React, { useState, useEffect } from "react";
import Cart from "../../components/general-components/cart";
import { getAllProviderData } from "../../helperFunctions/sxt";
import { getTokenData } from "../../helperFunctions/pinata";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/general-components/loader";

const Explore = () => {

  const [mockData, setMockData] = useState();

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
      console.log('getAllProviderData', allProviders);
      var arr = [];
      if (allProviders.status == 200) {
        allProviders.data.forEach(async (data) => {
          var nftDetail = await getTokenData(data.BASE_META_DATA_URI);
          arr.push(nftDetail);
          console.log('nftDetail', nftDetail);
        });
        if (allProviders.data && allProviders.data.length > 0) {
          console.log('Arr', arr);
          setMockData(arr);
          console.log('mock', mockData);
        }

      }
    } catch (error) {
      notify('Something went wrong');
    };
  };




  return (
    <div>
      <ToastContainer />
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
                        <Loader />
                    }
                  </div>
                </div>
              )
            })
            :
            <Loader />
        }

      </div>

    </div>
  );
};

export default Explore;
