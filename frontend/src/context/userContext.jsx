import React, { createContext, useState } from 'react';

// Create and export the UserDataContext
export const UserDataContext = createContext(); 

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    });

    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext;
