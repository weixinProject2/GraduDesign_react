import React from 'react';
import { StoreProvider } from './stores';
import NoticeContent from './NoticeContent'

import './index.less'

export default ((props) => {
  return (
    <StoreProvider {...props}>
      <NoticeContent />
    </StoreProvider>
  );
})