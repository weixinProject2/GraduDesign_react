import React from 'react';
import { StoreProvider } from './stores';
import Content from './Content'

import './index.less'

export default ((props) => {
  return (
    <StoreProvider {...props}>
      <Content />
    </StoreProvider>
  );
})