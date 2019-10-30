import React, { createContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';

export const MyInfoContext = createContext(null);

export const UserInfoFormStore = observer((props) => {
  const store = useLocalStore(() => {
    return {
      // 修改密码模态框状态
      ps_visible: false,
      setPsVisible(value) {
        this.ps_visible = value
      },
      get getPsVisible() {
        return this.ps_visible
      },

      // 修改个人信息模态框状态、
      info_visible: false,
      setInfoVisible(value) {
        this.info_visible = value
      },
      get getInfoVisible() {
        return this.info_visible
      },
      
      // loading
      loading:true,
    }
  });

  return (
    <MyInfoContext.Provider value={store}>
      {props.children}
    </MyInfoContext.Provider>
  );
});