import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
   
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    axios.post(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token');
            navigate('/captain-login');
        }
    });

    return (
       <div>Captain Logout</div>
    )
};

export default CaptainLogout;

