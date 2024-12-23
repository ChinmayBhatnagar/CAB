import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});





    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({ email: email, password: password });

        setEmail('');
        setPassword('');
    }


    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div >
                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}  >
                    <h3 className='text-lg font-medium mb-2'>What's your email?</h3>

                    <input
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-4 border w-full text-lg placeholder-base'
                        type="email"
                        placeholder='email@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>What's your password?</h3>

                    <input

                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-4 border w-full text-lg placeholder-base'
                        required type="password"
                        placeholder='password'
                    />

                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-4  w-full text-lg placeholder-base'>Login</button>


                </form>
                <p className='text-center'>New Here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
            </div>


            <div>
                <Link to='/captain-login' className='bg-[#10b461] flex item-center justify-center text-white font-semibold mb-5 rounded px-4 py-4  w-full text-lg placeholder-base'>Sign in as Captain</Link>
            </div>
        </div>
    );
};

export default UserLogin;