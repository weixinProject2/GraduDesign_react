import React, { createContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';

export const MyContext = createContext(null);

export const MessageStore = observer((props) => {
  const store = useLocalStore(() => (
    {
      
    }
  ));
  return (
    <MyContext.Provider value={store}>
      {props.children}
    </MyContext.Provider>
  );
});