import React, { createContext, useContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import useStore from './useDeptStaffStore';
import useSearchStore from './useSearchFormStore';
import { MyContext } from '../../../stores';

const Store = createContext(null);

export function useDeptsStaffStore() {
    return useContext(Store);
}

export const StoreProvider = observer((props) => {
    const {
        children,
    } = props;

    const stores = useContext(MyContext);
    const { getUserinfo: { departmentName, departmentId } } = stores;

    const mainStore = useStore();
    const searchStore = useSearchStore();

    const value = {
        ...props,
        mainStore,
        searchStore,
        departmentName,
        departmentId,
    }
    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    );
})




