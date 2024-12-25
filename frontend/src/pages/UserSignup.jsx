import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: { firstname: firstName, lastname: lastName },
            email,
            password
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

            if (response.status === 201) {
                setUser(response.data.user);
                localStorage.setItem('token', response.data.token);
                navigate('/home');
            }
        } catch (error) {
            console.error('Signup failed:', error);
            // You can display an error message to the user here.
        } finally {
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
        }
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="Logo" />
                <form onSubmit={submitHandler}>
                    <h3 className='text-base font-medium mb-2'>What's your Name?</h3>
                    <div className='flex gap-4 mb-5'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-4 border text-base placeholder:text-sm'
                            type="text"
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-4 border text-base placeholder:text-sm'
                            type="text"
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <h3 className='text-base font-medium mb-2'>What's your email?</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-5 rounded px-4 py-4 border w-full text-base placeholder:text-sm'
                        type="email"
                        placeholder='email@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <h3 className='text-base font-medium mb-2'>What's your password?</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-5 rounded px-4 py-4 border w-full text-base placeholder:text-sm'
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-4 w-full text-base placeholder:text-sm'>
                        Create Account
                    </button>
                </form>

                <p className='text-center'>
                    Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link>
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

export default UserSignup;
