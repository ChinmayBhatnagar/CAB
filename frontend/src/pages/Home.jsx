import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className='bg-cover bg-center bg-[url(https://media.istockphoto.com/id/869995028/photo/traffic-stop-signal.jpg?s=1024x1024&w=is&k=20&c=FwFh9SSVI0hk3EKRW5r9q3mp_QW6a7Xs-_FwJLrT6SU=)] h-screen pt-8 flex justify-between flex-col w-full '>
                <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
                <div className='bg-white pb-7 py-4 px-4' >
                    <h2 className='text-3xl font-bold'>Get started with uber</h2>
                    <Link to='/login' className='flex item-center justify-center w-full bg-black text-white py-3 rounded mt-5 '>Continue</Link>
                </div>

            </div>
        </div>
    );
};

export default Home;