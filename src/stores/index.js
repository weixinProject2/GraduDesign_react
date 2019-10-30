import React, { createContext } from 'react'
import { useLocalStore, observer } from 'mobx-react-lite'
export const MyContext = createContext(null);
export const AppStore = observer((props) => {
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
            }

        }
    });
    return (
        <MyContext.Provider value={store}>
            {props.children}
        </MyContext.Provider>
    )
})