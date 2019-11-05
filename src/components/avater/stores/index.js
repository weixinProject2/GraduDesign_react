import React, { createContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';

export const MyAvatarContext = createContext(null);

export const AvaterStore = observer((props) => {
  const store = useLocalStore(() => {
    return {
      name:'weng'
    }
  })
  return (
    <MyAvatarContext.Provider value={store}>
      {props.children}
    </MyAvatarContext.Provider>
  );
});