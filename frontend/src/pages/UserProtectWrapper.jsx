import React,{useContext, useEffect} from 'react';
import { UserDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';



const UserProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if(!token){
            navigate('/login');
        }
    })

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
        Headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            setUser(response.data.user)
            setIsLoading(false)
        }
            
    }).catch((error) => {
        console.log(error);
        localStorage.removeItem('token');
        navigate('/login');
    }, [token])

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    );
};

export default UserProtectWrapper;