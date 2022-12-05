const checkAdminLogin = (isLoggedIn, currentAdmin, navigateTo, isPageLoading) => {
    isPageLoading(true);
    const adminAccessToken = JSON.parse(localStorage.getItem('adminAccessToken'));
    if (adminAccessToken === null) {
        isLoggedIn(false);
        navigateTo('/admin/login');
    } else {
        fetch('https://ribbons.onrender.com/admin/current-admin',
            {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accessToken: adminAccessToken
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            if (data?.accessToken) {
                isLoggedIn(true);
                localStorage.setItem('adminAccessToken', JSON.stringify(data.accessToken));
                currentAdmin(data);
                isPageLoading(false);
            } else {
                isLoggedIn(false);
                localStorage.removeItem('adminAccessToken');
                navigateTo('/admin/login');
            }
        })
        .catch(err => {
            isPageLoading(false);
        })
    }
}
export default checkAdminLogin;