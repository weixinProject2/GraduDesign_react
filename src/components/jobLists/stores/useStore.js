import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { message } from 'antd';


export default function useStore() {
  return useLocalStore(() => ({
    activeKey: 'details',
    setActiveKey(value) {
      this.activeKey = value;
    },
    get getActiveKey() {
      return this.activeKey;
    },
  }))
}