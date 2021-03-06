import React, { Fragment, useContext, useEffect } from 'react';
import { Popover, Avatar } from 'antd';
import { observer } from 'mobx-react-lite'

import { MyContext } from '../../stores/index'

import UserOpts from './UserOpts'

export default observer(() => {
    const stores = useContext(MyContext);
    const { getUserinfo: { userName, headerImg } } = stores;
    /**
     *  有图片地址时候渲染图片，无图片时候渲染员工的姓，无用户信息的时候渲染‘无’
     * @param {用户信息} userInfo 
     */

    function renderAvater() {
        if (headerImg) {
            return <img src={headerImg} />
        } else if (userName) {
            const nameArray = userName.split('');
            return <span>{nameArray[0].toString()}</span>;
        } else {
            return '无'
        }
    }

    return (
        <Popover
            content={
                <UserOpts
                    avater={renderAvater()}
                />
            }
            placement='bottomRight'
            trigger="click"
        >
            <div className="gradu-header-img">
                {renderAvater()}
            </div>
        </Popover>
    )
})
