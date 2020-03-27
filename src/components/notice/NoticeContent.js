import React, { useEffect, Fragment } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import TableHeader from '../../tool-components/TableHeader';
import history from '../../utils/history';

export default observer(() => {
  useEffect(() => {

  }, [])

  function goEditor() {
    history.push({
      pathname: '/main/notice/editor',
      state: {
        oldPathname: '/main/notice'
      }
    });
  }

  const headerBtns = (
    <Button icon="user-add" ghost type='primary' onClick={goEditor}>
      新增公告
    </Button>
  );

  return (
    <Fragment>
      <TableHeader headerButtons={headerBtns} />
    </Fragment>
  )
})
