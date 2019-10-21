import React, { useEffect } from 'react';
import { LoginStore } from './stores/index';
import LoginForm from './LoginForm'
export default ((props) => {
    return (
        <div className="gradu-login-content">
            <LoginStore>
                <LoginForm />
            </LoginStore>
        </div>
    );
})