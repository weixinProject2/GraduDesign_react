import React, { createContext } from 'react'
import { useLocalStore, observer } from 'mobx-react-lite'
import { getUserInfoDetail } from '../api';
export const MyContext = createContext(null);

export const AppStore = observer((props) => {
    const { workNumber } = JSON.parse(localStorage.getItem('userInfo'));
    
    const store = useLocalStore(() => {
        return {
            userInfo: {},
            setUserInfo(userInfo) {
                this.userInfo = userInfo;
            },
            get getUserinfo() {
                return this.userInfo;
            },


            // 全局loaing
            contentLoading: true,
            setContentLoading(value) {
                this.contentLoading = value
            },
            get getContentLoading() {
                return this.contentLoading;
            },
        
            loadUserInfo() {
                // 获取个人信息
                getUserInfoDetail({ workNumber }).then((data) => {
                    const userInfo = data.data[0];
                    if (userInfo) {
                        this.setContentLoading(false);
                        this.setUserInfo(userInfo);
                    }
                })
            },

        }
    });
    return (
        <MyContext.Provider value={store}>
            {props.children}
        </MyContext.Provider>
    )
})