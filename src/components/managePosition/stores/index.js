import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import useMainStore from "./useMainStore";

const Store = createContext(null);

export function usePositionsStore() {
    return useContext(Store);
}

export const StoreProvider = observer((props) => {
    const {
        children,
    } = props;

    const mainStore = useMainStore();

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