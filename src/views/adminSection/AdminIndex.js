import React, { useState } from 'react';
import  checkLogin from './functions/checkAdminLogin';

const AdminIndex = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentAdmin, setCurrentAdmin ] = useState({});

    useState(() => {
        checkLogin(setIsLoggedIn, setCurrentAdmin);
    })
    return (
        <div>AdminIndex</div>
    )
}

export default AdminIndex