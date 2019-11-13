import React, { useContext } from 'react';
import { Icon, message } from 'antd';
import { observer } from 'mobx-react-lite';
import history from '../../utils/history';
import { MyContext } from '../../stores/index'
export default observer(({ avater }) => {

    const stores = useContext(MyContext);
    const { getUserinfo: { userName, workNumber } } = stores;

    function linkToInfo() {
        history.push('/main/userInfo')
    }

    function loginOut() {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        history.push('/login');
        message.success('退出登录成功');
    }

    return (
        <div className="gradu-user-options">
            <div className='gradu-user-info'>
                <div className="gradu-header-img">
                    {avater}
                </div>
                <div className="gradu-user-basicInfo">
                    <span>姓名：{userName}</span>
                    <span>工号：{workNumber}</span>
                </div>
            </div>
            <ul>
                <li onClick={linkToInfo}>
                    <Icon type="user" />
                    查看个人信息
                    </li>
                <li onClick={loginOut}>
                    <Icon type="logout" />
                    退出登录
                </li>
            </ul>
        </div>
    )
})