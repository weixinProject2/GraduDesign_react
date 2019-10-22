import React, { useEffect } from 'react';
import { LoginStore } from './stores/index';
import LoginForm from './LoginForm'
import { withRouter } from 'react-router-dom'

import './index.less'

export default withRouter((props) => {
    const { history } = props;
    return (
        <div className="gradu-login">
            <LoginStore>
                <LoginForm history={history} />
            </LoginStore>
        </div>
    );
})