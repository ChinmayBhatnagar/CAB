import React from 'react';
import { Link } from 'react-router-dom';

const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-2 top-2'>
            <i className=" text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex item-center justify-between'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Mohit</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP 04 AB 1234</h4>
                        <p className='text-sm text-gray-600 '>Maruti suzuki Alto </p>
                    </div>
                </div>

                <div className='flex flex-col gap-2 justify-between items-center '>

                    <div className='w-full mt-5'>

                        <div className='flex items-center gap-5 p-2 border-b-2'>
                            <i className="text-lg ri-map-pin-user-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>5/22-Z</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Ramnik chok, Ahemdabad</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-2'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹193.20</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white text-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    );
};

export default Riding;