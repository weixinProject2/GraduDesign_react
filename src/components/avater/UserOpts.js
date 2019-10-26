import React from 'react'
import { Icon } from 'antd'
import history from '../../utils/history'
export default (({ userInfo, avater }) => {

    function linkToInfo() {
        history.push('/main/userInfo')
    }

    function loginOut() {

    }

    return (
        <div className="gradu-user-options">
            <div className='gradu-user-info'>
                <div className="gradu-header-img">
                    {avater}
                </div>
                <div className="gradu-user-basicInfo">
                    <span>姓名：{userInfo && userInfo.username}</span>
                    <span>工号：{userInfo && userInfo.workNumber}</span>
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