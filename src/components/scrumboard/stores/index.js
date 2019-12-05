import React, { createContext, useContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';

const Store = createContext(null);

export function useScrumStore() {
    return useContext(Store);
}

export const StoreProvider = observer((props) => {
    const {
        children,
    } = props;

    const value = {
        ...props,

        // SearchFormStore,
    }
    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    );
})




