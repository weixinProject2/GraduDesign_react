import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import useStore from './useStore';

const Store = createContext(null);

export function useNoticeStore() {
    return useContext(Store);
}

export const StoreProvider = observer((props) => {
    const {
        children,
    } = props;

    const mainStore = useStore();

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




