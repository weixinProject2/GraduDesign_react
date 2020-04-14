import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import useStore from './useStore';
import { withRouter } from 'react-router-dom';
import { MyContext } from '../../../stores';
const Store = createContext(null);

export function useDeptProjectsStore() {
  return useContext(Store);
}

export const StoreProvider = withRouter(observer((props) => {
  const {
    children,
    location: { search }
  } = props;

  const appStore = useContext(MyContext);

  const {
    getProjectId: projectId, getProjectName: projectName,
  } = appStore;

  const mainStore = useStore();

  const value = {
    ...props,
    ...appStore,
    mainStore,
    projectId,
    projectName,
  }
  return (
    <Store.Provider value={value}>
      {children}
    </Store.Provider>
  );
}))




