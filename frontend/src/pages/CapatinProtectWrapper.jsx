import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext); // Ensure 'setCaptain' is defined in the context
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        } else {
            // Fetch captain profile only if token exists
            axios
                .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        setCaptain(response.data.captain); // Make sure setCaptain is a function in the context
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    navigate('/captain-login');
                });
        }
    }, [token, navigate, setCaptain]); // Add navigate and setCaptain as dependencies to avoid stale closures

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;
