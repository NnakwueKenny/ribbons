const checkAdminLogin = (isLoggedIn, currentAgent, navigateTo, isPageLoading) => {
    isPageLoading(true);
    const agentAccessToken = JSON.parse(localStorage.getItem('agentAccessToken'));
    if (agentAccessToken === null) {
        isLoggedIn(false);
        navigateTo('/agent/login');
    } else {
        fetch('https://ribbons.onrender.com/agent/current-agent',
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
            if (data?.accessToken) {
                isLoggedIn(true);
                localStorage.setItem('agentAccessToken', JSON.stringify(data.accessToken));
                currentAgent(data);
                isPageLoading(false);
            } else {
                isLoggedIn(false);
                localStorage.removeItem('agentAccessToken');
                navigateTo('/agent/login');
            }
        })
        .catch(err => {
            isPageLoading(false);
        })
    }
}
export default checkAdminLogin;