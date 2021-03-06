import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import useStore from './useStore';
import { withRouter } from 'react-router-dom';
import { MyContext } from '../../../stores';
const Store = createContext(null);

export function useJobStore() {
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

  const permissions = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).permissions;

  const value = {
    ...props,
    ...appStore,
    mainStore,
    projectId,
    projectName,
    permissions,
  }
  return (
    <Store.Provider value={value}>
      {children}
    </Store.Provider>
  );
}))




