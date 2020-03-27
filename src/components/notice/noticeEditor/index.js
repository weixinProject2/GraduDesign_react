import React from 'react';
import { StoreProvider } from './stores';
import EditeNotice from './EditeNotice'

import './index.less'

export default ((props) => {
  return (
    <StoreProvider {...props}>
      <EditeNotice />
    </StoreProvider>
  );
})