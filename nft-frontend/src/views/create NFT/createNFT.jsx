import React, { useState } from "react";
import { Button, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
const CreateNFT = () => {




  const [formData, setFormData] = useState({
    'image_data': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj4NCiAgICA8c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPg0KICAgIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPg0KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBjbGFzcz0iYmFzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RXBpY0xvcmRIYW1idXJnZXI8L3RleHQ+DQo8L3N2Zz4=',
    'external_url': 'localhost:3000/mcdonalds-nft',
    'description': '',
    'name': '',
    'Discount': '',
    'Expiry': '',
    'Expiry Date': 0,
    'Used Count': 0,
    'category': '',
    'Applicable in': 'world',
    'Maximum Purchase Limit': '',
    'Maximum Purchase duration': '',
    'Maximum Purchase amount': '',
    'Remaining Amount': '',
    'Days': 0,
    'supply limit': '',
    'transferable': '',
    'price': 0,
  });


  const handleForm = (event) => {
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value
    }));
    console.log('form', formData);
  }

  const submitForm = () => {
    console.log('submit form', formData);
  }

  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  return (
    <div className="w-full p-5">

      <div className="w-full pt-10 pl-10 pr-10 shadow-[0_0_5px_0px_#8f808040] dark:shadow-[0_0_5px_0px_#1235ce40] rounded-md">
        <h1 className="text-3xl dark:text-white border-b-2 border-primary-500 w-[full] dark:border-blue">Create NFT</h1>
        <div className="flex justify-around items-start flex-wrap flex-row">

          {/* LEFT */}
          <div className="w-[35rem] md:w-[25rem] m-2">

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Name</p>
              <Input placeholder="Comapny Name" name="name" onChange={handleForm} className="dark:bg-black dark:text-white" />

            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Category </p>
              <select placeholder="Category" name="category" onChange={handleForm} allowClear className="w-full h-[33px] border-[1px] border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px]  text-[14px]"
              >
                <option value="Food & dining">Food & Dining</option>
                <option value="Sports & Activity">Sports & Activity</option>
                <option value="Tranposrtation">Tranposrtation</option>
              </select>
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Applicable in</p>
              <select placeholder="Applicable in" value={formData["Applicable in"]} name="Applicable in" onChange={handleForm} className="w-full h-[33px] border-[1px] border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px] text-[14px]"
              >
                <option value="world">world</option>
              </select>
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Discount </p>
              <select placeholder="Discount" name="Discount" onChange={handleForm} className="w-full h-[33px] border-[1px] border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px] text-[14px]"
              >
                <option value="25%">25%</option>
                <option value="50%">50%</option>
                <option value="75%">75%</option>
                <option value="100%">100%</option>
              </select>
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Supply Limit</p>
              <Input type="number" placeholder="Supply Limit" name="Discound" onChange={handleForm} className="dark:bg-black dark:text-white" />
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Transferable</p>
              <select placeholder="Duration" disabled className="w-full h-[33px] border-[1px] border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px] text-[14px]">
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            </div>
          </div>


          {/* RIGHT */}
          <div className="w-[35rem] md:w-[25rem] m-2">

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Comapny Logo</p>
              <Input placeholder="Company Logo" type="file" className="dark:bg-black dark:text-white w-full" />
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Maximum Purchase Limit (in Dollar)</p>
              <select placeholder="Duration" name="Maximum Purchase duration" onChange={handleForm} allowClear className="w-[49%] md:w-[45%] h-[33px] border-[1px] border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px] text-[14px]"
              >
                <option value="Day">Day</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
              <Input placeholder="Amount" name="Maximum Purchase amount" onChange={handleForm} min={0} type="number" className="dark:bg-black dark:text-white w-[49%] md:w-[45%] ml-2" />
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">Expiry</p>
              <select placeholder="Maximum Purchase Limit" name="Expiry" onChange={handleForm} allowClear className="w-full h-[33px] border-[1px] border-blue-gray-100 rounded-md dark:bg-black dark:text-white pt-[4px] pb-[4px] pl-[11px] pr[11px] text-[14px]"
              >
                <option value="Day">6 Month</option>
                <option value="Year">1 Year</option>
              </select>
            </div>

            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">symbol</p>
              <Input type="text" placeholder="Comapny Symbol" max={5} className="dark:bg-black dark:text-white" />
            </div>


            <div className="w-full h-20 mt-2 mb-2 p-1">
              <p className="dark:text-white">NFT Price (MATIC)</p>
              <Input type="number" placeholder="NFT Price" className="dark:bg-black dark:text-white" />
            </div>
          </div>

        </div>
        {/* Description */}
        <div>
          <div className="w-full mb-2 p-1">
            <p className="dark:text-white">Description</p>
            <TextArea rows={4} placeholder="Description" name="Description" onChange={handleForm} className="dark:bg-black dark:text-white m-2" />
          </div>
        </div>
        <div className="w-full flex flex-row-reverse pb-5">
          <Button className='bg-primary-500 text-white w-24 dark:bg-blue' onClick={submitForm} type="primary">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
