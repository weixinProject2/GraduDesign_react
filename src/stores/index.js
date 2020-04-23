import React, { createContext } from 'react'
import { useLocalStore, observer } from 'mobx-react-lite'
import { getUserInfoDetail, getMenu } from '../api';
import history from '../utils/history';
import { message } from 'antd';

export const MyContext = createContext(null);

export const AppStore = observer((props) => {
    const store = useLocalStore(() => {
        return {
            // 个人信息
            userInfo: {},
            setUserInfo(userInfo) {
                this.userInfo = userInfo;
            },
            get getUserinfo() {
                return this.userInfo;
            },


            // 菜单数据
            menuData: [],
            setMenuData(value) {
                this.menuData = value
            },
            get getMenuData() {
                return this.menuData.slice();
            },
            loadMenu() {
                getMenu().then((res) => {
                    if (!res.error) {
                        this.setMenuData(res.menuList);
                    } else {
                        message.error(res.message);
                    }
                })
            },
            // 路由
            path: history.location.pathname,
            setPath(value) {
                this.path = value;
            },
            get getPath() {
                return this.path;
            },
            // 全局loaing
            contentLoading: true,
            setContentLoading(value) {
                this.contentLoading = value
            },
            get getContentLoading() {
                return this.contentLoading;
            },

            // 项目选择框loading
            selectorLoading: true,
            setSelectorLoading(value) {
                this.selectorLoading = value
            },
            get getSelectorLoading() {
                return this.selectorLoading;
            },

            loadUserInfo() {
                this.setSelectorLoading(true);
                // 获取个人信息
                getUserInfoDetail().then((data) => {
                    const userInfo = data.data[0];
                    if (userInfo) {
                        this.setSelectorLoading(false);
                        this.setContentLoading(false);
                        this.setUserInfo(userInfo);
                    }
                })
            },

            projectId: '',
            get getProjectId() {
                return this.projectId;
            },
            setProjectId(value) {
                this.projectId = value;
            },
            projectName: '',
            get getProjectName() {
                return this.projectName;
            },
            setProjectName(name) {
                this.projectName = name;
            },

        }
    });
    return (
        <MyContext.Provider value={store}>
            {props.children}
        </MyContext.Provider>
    )
})