const checkAgentLogin = (isLoggedIn, currentAdmin) => {
    const agentAccessToken = JSON.parse(localStorage.getItem('agentAccessToken'));
    console.log(agentAccessToken);
    if (agentAccessToken === null) {
        isLoggedIn(false);
    } else {
        fetch('http://localhost:3500/admin/current-admin',
            {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accessToken: agentAccessToken
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            if (data) {
                isLoggedIn(true);
                localStorage.setItem('agentAccessToken', JSON.stringify(data.accessToken));
                currentAdmin(data);
                console.log('Admin Logged In');
            } else {
                isLoggedIn(false);
                localStorage.removeItem('agentAccessToken')
            }
        })
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1bWFuaXRhcmlhbnNlcnZjYW1wbWFoYXJhc2giLCJpYXQiOjE2Njk1NjEzMjAsImV4cCI6MTY3MDE2NjEyMH0.1flPPKkBNYbJHlOu4njWzzuiabA8rxhWW-rJ0MKgEqI
    }
    return true
}

export default checkAgentLogin;