import React from 'react';
import { message } from 'antd'
import { useLocalStore } from 'mobx-react-lite';

export default function useStore() {
  return useLocalStore(() => ({
    params: {
      content: '',
      title: '',
    },
    get getNoticeTitle() {
      return this.params.title;
    },
    setNoticeTitle(value) {
      this.params.title = value;
    },
    get getMarkValue() {
      return this.params.content;
    },
    setMarkValue(value) {
      this.params.content = value;
    },

  }))
}