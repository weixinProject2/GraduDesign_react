import React from 'react';
import { message } from 'antd'
import { useLocalStore } from 'mobx-react-lite';

export default function useStore() {
  return useLocalStore(() => ({

  }))
}