import React from 'react';
import { Button, Avatar } from 'antd'

export default (({ userInfo }) => {
    const { username, imgUrl, workNumber, professional } = userInfo;

    function renderAvater() {
        if (imgUrl) {
            return <Avatar src={imgUrl} />
        } else if (username) {
            const nameArray = username.split('');
            return nameArray[0].toString();
        } else {
            return '无'
        }
    }

    return (
        <div className="gradu-userInfo">
            <header>
                <Button type='primary' ghost icon='edit'>修改信息</Button>
            </header>
            <div className="gradu-userInfo-content">
                <h2>个人信息</h2>
                <div className='gradu-userInfo-top'>
                    <div className='gradu-userInfo-avatar'>
                        <div className="gradu-userInfo-avatar-content">
                            <div className="gradu-userInfo-avatar-img">
                                {renderAvater()}
                            </div>
                        </div>
                    </div>
                    <div className='gradu-userInfo-basic'>
                        <div className='gradu-userInfo-basic-lists'>
                            <span>{username}</span>
                            <span>工号：{workNumber}</span>
                        </div>
                    </div>
                </div>
                <div className='gradu-userInfo-lists'>
                    <div className='gradu-userInfo-lists-content'>
                        <h3>基本信息</h3>
                        <ul>
                            <li>
                                <span>邮箱地址：</span>
                                <span>www.baidu.com</span>
                            </li>
                            <li>
                                <span>电话：</span>
                                <span>19989897654</span>
                            </li>
                            <li>
                                <span>地址：</span>
                                <span>福建福州</span>
                            </li>
                        </ul>
                    </div>
                    <div className='gradu-userInfo-lists-content'>
                        <h3>身份信息</h3>
                        <ul>
                            <li>
                                <span>职位：</span>
                                <span>我是猪</span>
                            </li>
                            <li>
                                <span>层级：</span>
                                <span>普通员工</span>
                            </li>
                            <li>
                                <span>所属部门</span>
                                <span>我是猪部门</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
})