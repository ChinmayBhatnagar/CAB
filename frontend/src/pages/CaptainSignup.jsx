import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from './CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainSignup = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { captain, setCaptain } = useContext(CaptainDataContext); // Proper useContext hook for captain context

    const submitHandler = async (e) => {
        e.preventDefault();

        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
            
            if (response.status === 201) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('captainToken', data.token);
                navigate('/captain-home');
            }
        } catch (error) {
            // Handle any errors here
            if (error.response) {
                // Request was made and the server responded with an error status
                setErrorMessage(error.response.data.message || 'Registration failed. Please try again.');
            } else if (error.request) {
                // Request was made but no response was received
                setErrorMessage('No response from server. Please check your connection and try again.');
            } else {
                // Something went wrong in setting up the request
                setErrorMessage('An error occurred. Please try again.');
            }
        }

        // Clear input fields after form submission
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    };

    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://pngimg.com/d/uber_PNG24.png" alt="Uber Logo" />
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

                    <h3 className='text-base font-medium mb-2'>Vehicle Details</h3>
                    <div className='flex gap-4 mb-5'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-4 border text-base placeholder:text-sm'
                            type="text"
                            placeholder='Vehicle Color'
                            value={vehicleColor}
                            onChange={(e) => { setVehicleColor(e.target.value); }}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-4 border text-base placeholder:text-sm'
                            type="text"
                            placeholder='Vehicle Plate'
                            value={vehiclePlate}
                            onChange={(e) => { setVehiclePlate(e.target.value); }}
                        />
                    </div>

                    <div className='flex gap-4 mb-5'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-4 border text-base placeholder:text-sm'
                            type="number"
                            placeholder='Vehicle Capacity'
                            value={vehicleCapacity}
                            onChange={(e) => { setVehicleCapacity(e.target.value); }}
                        />
                        <select
                            required
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-4 border text-base'
                            value={vehicleType}
                            onChange={(e) => { setVehicleType(e.target.value); }}
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="car">car</option>
                            <option value="auto">auto</option>
                            <option value="moto">moto</option>
                        </select>
                    </div>

                    {errorMessage && <p className="text-red-600 mb-5">{errorMessage}</p>}

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
