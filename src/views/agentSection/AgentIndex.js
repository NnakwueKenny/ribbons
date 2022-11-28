import React, { useState } from 'react';
import  checkLogin from './functions/checkAgentLogin';

const AgentIndex = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentAgent, setCurrentAgent ] = useState({});

    useState(() => {
        checkLogin(setIsLoggedIn, currentAgent);
        console.log(isLoggedIn)
    })
    return (
        <div>AgentIndex</div>
    )
}

export default AgentIndex