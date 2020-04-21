import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import useStore from './useScrumStore';
import { MyContext } from '../../../stores';

const Store = createContext(null);

export function useScrumStore() {
    return useContext(Store);
}

export const StoreProvider = observer((props) => {
    const {
        children,
    } = props;

    const appStore = useContext(MyContext);

    const {
        getProjectId: projectId, getProjectName: projectName,
    } = appStore;

    const STATUS_TODO = 'STATUS_TODO';
    const STATUS_DOING = 'STATUS_DOING';
    const STATUS_DONE = 'STATUS_DONE';
    const STATUS_TESTING = 'STATUS_TESTING';
    const STATUS_CHECK = 'STATUS_CHECK';

    let tasks = [{
        id: 0,
        status: STATUS_TODO,
        title: '每周七天阅读五次，每次阅读完要做100字的读书笔记',
        username: '小夏',
        point: 10
    }, {
        id: 1,
        status: STATUS_TODO,
        title: '每周七天健身4次，每次健身时间需要大于20分钟',
        username: '橘子🍊',
        point: 5
    }, {
        id: 2,
        status: STATUS_CHECK,
        title: '单词*100',
        username: '┑(￣Д ￣)┍',
        point: 2
    }, {
        id: 3,
        status: STATUS_TODO,
        title: '单词*150',
        username: '┑(￣Д ￣)┍',
        point: 2
    }, {
        id: 4,
        status: STATUS_TESTING,
        title: '单词*200',
        username: '┑(￣Д ￣)┍',
        point: 2
    }, {
        id: 5,
        status: STATUS_TODO,
        title: '单词*250',
        username: '┑(￣Д ￣)┍',
        point: 2
    },
    {
        id: 6,
        status: STATUS_TESTING,
        title: '单词*250',
        username: '┑(￣Д ￣)┍',
        point: 2
    },
    {
        id: 7,
        status: STATUS_DOING,
        title: '单词*250',
        username: '┑(￣Д ￣)┍',
        point: 2
    }
    ]

    const STATUS_CODE = {
        STATUS_TODO: '待处理',
        STATUS_DOING: '开发中',
        STATUS_TESTING: '测试中',
        STATUS_CHECK: '需验收',
        STATUS_DONE: '已完成',
    }

    const mainStore = useStore()

    const value = {
        ...props,
        mainStore,
        STATUS_TODO,
        STATUS_DOING,
        STATUS_DONE,
        STATUS_CODE,
        tasks,
        projectId,
        projectName
    }

    const {
        loadProfs, setSelectSprint,
    } = mainStore;

    useEffect(() => {
        if (projectId) {
            setSelectSprint('');
            loadProfs(projectId);
        }
    }, [projectId]);

    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    );
})




