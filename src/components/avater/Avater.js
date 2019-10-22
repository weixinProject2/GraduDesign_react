import React, { Fragment, useContext, useEffect } from 'react';
import { Popover ,Avatar} from 'antd';
import UserOpts from './UserOpts'
export default (({ userInfo }) => {
    /**
     *  有图片地址时候渲染图片，无图片时候渲染员工的姓，无用户信息的时候渲染‘无’
     * @param {用户信息} userInfo 
     */
    function renderAvater() {
        const { userName, imgUrl } = userInfo;
        if(imgUrl){
            return <Avatar src={imgUrl} />
        }else if(userName){
            const nameArray = userName.split('');
            return nameArray[0].toString();
        }else{
            return '无'
        }
    }

    return (
        <Popover
            content={'hello'
                // <UserOpts
                //     userInfo={userInfo && userInfo}
                //     avater={userInfo ? this.renderAvater(userInfo.username) : '无'}
                // />
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
