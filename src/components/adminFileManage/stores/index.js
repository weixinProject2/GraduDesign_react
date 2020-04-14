import React, { createContext, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useStore from './useStore';

const Store = createContext(null);

export function useFileStore() {
    return useContext(Store);
}

export const StoreProvider = observer((props) => {
    const {
        children,
    } = props;

    const userInfo = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));

    const permissions = userInfo && userInfo.permissions.toString();

    const mainStore = useStore();

    const {
        loadTreeData,
    } = mainStore;

    useEffect(() => {
        loadTreeData();
    }, []);


    const value = {
        ...props,
        mainStore,
        permissions,
    }
    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    );
})




