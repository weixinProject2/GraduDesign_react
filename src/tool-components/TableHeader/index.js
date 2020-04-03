import React, { Fragment } from 'react';

import { Button } from 'antd'

import { withRouter } from 'react-router-dom';

import './index.less';

import history from '../../utils/history';

const tableHeader = withRouter(({ headerButtons, hasBack }) => {
  const { location } = history;

  function goBack() {
    const state = location.state
    if (state) {
      history.push(state.oldPathname);
    }
  }

  return (
    <Fragment>
      {
        (headerButtons || location.state) ? <header className="page-content-header">
          {hasBack && location.state && <Button ghost type="primary" shape="circle" icon="arrow-left" onClick={goBack} />}
          {headerButtons}
        </header> : null
      }
    </Fragment>
  )
})
export default tableHeader;