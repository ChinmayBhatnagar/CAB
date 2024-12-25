import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from './CaptainContext';

const CaptainSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [userData, setUserData] = useState({});
    const { captain, setCaptain } = useContext(CaptainDataContext); // Proper useContext hook for captain context

    const submitHandler = (e) => {
        e.preventDefault();

        setUserData({
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password
        });

        // You may want to save the userData in the context
        setCaptain(userData);

        // Clear input fields after form submission
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    };

    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
                <form onSubmit={submitHandler}>
                    <h3 className='text-base font-medium mb-2'>What's your Name?</h3>
                    <div className='flex gap-4 mb-5'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-4 border text-base placeholder:text-sm'
                            type="text"
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => { setFirstName(e.target.value); }}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-4 border text-base placeholder:text-sm'
                            type="text"
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => { setLastName(e.target.value); }}
                        />
                    </div>

                    <h3 className='text-base font-medium mb-2'>What's your email?</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-5 rounded px-4 py-4 border w-full text-base placeholder:text-sm'
                        type="email"
                        placeholder='email@example.com'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }}
                    />

                    <h3 className='text-base font-medium mb-2'>What's your password?</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-5 rounded px-4 py-4 border w-full text-base placeholder:text-sm'
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); }}
                    />

                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-4 w-full text-base placeholder:text-sm'>
                        Create Account
                    </button>
                </form>
                <p className='text-center'>
                    Already Have an Account? <Link to='/captain-login' className='text-blue-600'>Login here</Link>
                </p>
            </div>

            <div>
                <p className='text-xs leading-tight'>
                    This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>terms of service apply.</span>
                </p>
            </div>
        </div>
    );
};

export default CaptainSignup;
