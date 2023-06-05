import { Spin } from 'antd';
import React from 'react';
import '../../App.css';



const Loader = () => {
    return (
        <div className='fixed w-full h-[100vh] top-0 bottom-0 left-0 right-0 bg-[#ffcce826] dark:bg-[#016fff28] z-10 flex justify-center items-center'>
            <Spin size="large" style={{ background: 'red' }}>
                <div className="content" />
            </Spin>
        </div>
    )
}

export default Loader;