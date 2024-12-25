import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

            if (response.status === 200) {
                const { user, token } = response.data;
                setUser(user);
                localStorage.setItem('token', token);
                navigate('/home');
            }
        } catch (error) {
            console.error('Login failed:', error);
            // You can display an error message to the user here.
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="Logo" />
                <form onSubmit={submitHandler}>
                    <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-4 border w-full text-lg placeholder-base'
                        type="email"
                        placeholder='email@example.com'
                    />
                    <h3 className='text-lg font-medium mb-2'>What's your password?</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-4 border w-full text-lg placeholder-base'
                        type="password"
                        placeholder='password'
                    />
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-4 w-full text-lg placeholder-base'>
                        Login
                    </button>
                </form>
                <p className='text-center'>New Here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
            </div>

            <div>
                <Link to='/captain-login' className='bg-[#10b461] flex item-center justify-center text-white font-semibold mb-5 rounded px-4 py-4 w-full text-lg placeholder-base'>
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;
