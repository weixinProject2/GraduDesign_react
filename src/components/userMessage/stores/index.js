import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import useStore from './useStore';

const Store = createContext(null);

export function useMessageStore() {
  return useContext(Store);
}

export const MessageStore = observer((props) => {
  
  const mainStore = useStore();

  const value = {
    ...props,
    mainStore,
  }

  return (
    <Store.Provider value={value}>
      {props.children}
    </Store.Provider>
  );
});