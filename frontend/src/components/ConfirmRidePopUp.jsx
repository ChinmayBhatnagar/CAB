import React from 'react';

const ConfirmRidePopUp = (props) => {
    return (
        <div>
            <h5
                className="p-1 text-center w-[93%] absolute top-0 "
                onClick={() => {
                    props.setRidePopUpPanel(false)
                }} 
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Ride Available!</h3>

            <div className='flex items-center justify-between mt-4 p-5 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/originals/8d/fe/2c/8dfe2c8ddc4b7df7bbf77b01c365974d.jpg" alt="" />
                    <h2 className='text-lg font-semibold'>Eloni Muski</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.8 kM</h5>
            </div>


            <div className='flex flex-col gap-2 justify-between items-center '>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>kankariya Talab, Ahemdabad</p>
                        </div>
                    </div>
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
                <button onClick={() => {
                   

                }} className='w-full mt-5 bg-green-600 text-white text-semibold p-2 rounded-lg'>Confirm</button>

                <button onClick={() => {
                    props.setRidePopUpPanel(false)

                }} className='w-full mt-1 bg-gray-300 text-gray-700 text-semibold p-2 rounded-lg'>Ignore</button>
            </div>
        </div>
    );
};

export default ConfirmRidePopUp;