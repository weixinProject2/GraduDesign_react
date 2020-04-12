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
    }
    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    );
})




