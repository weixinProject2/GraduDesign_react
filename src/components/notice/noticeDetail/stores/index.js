import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';

const Store = createContext(null);

export function useNoticeDetailStore() {
    return useContext(Store);
}

export const StoreProvider = observer((props) => {
    const {
        children,
    } = props;


    const value = {
        ...props,
        
    }
    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    );
})




