import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';

import { Button } from 'antd'

import { withRouter } from 'react-router-dom';

import './index.less';

import history from '../../utils/history';

export default withRouter(observer(({ headerButtons, hasBack }) => {
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
        (headerButtons || location.state) ? <header className="gradu-content-header">
          {hasBack && location.state && <Button ghost type="primary" shape="circle" icon="arrow-left" onClick={goBack} />}
          {headerButtons}
        </header> : null
      }
    </Fragment>
  )
}))