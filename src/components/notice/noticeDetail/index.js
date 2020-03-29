import React from 'react';
import { StoreProvider } from './stores';
import NoticeDetail from './NoticeDetail'

import './index.less'

export default ((props) => {
  return (
    <StoreProvider {...props}>
      <NoticeDetail />
    </StoreProvider>
  );
})