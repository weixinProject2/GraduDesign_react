import React, { useEffect, Fragment } from 'react';
import { Button, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import TableHeader from '../../tool-components/TableHeader';
import history from '../../utils/history';
import { useNoticeStore } from './stores';
import NoticeTable from './NoticeTable';
import SearchForm from './SearchForm';

export default observer(() => {
  const {
    mainStore: {
      getBtnDisabled,
      loadInfo,
    }
  } = useNoticeStore();

  useEffect(() => {

  }, [])

  function refresh() {
    loadInfo();
  }

  function goEditor() {
    history.push({
      pathname: '/main/notice/editor',
      state: {
        oldPathname: '/main/notice'
      }
    });
  }

  const headerBtns = (
    <Fragment>
      <Button
        icon="user-add" ghost
        type='primary'
        onClick={goEditor}
        disabled={getBtnDisabled}
      >
        新增公告
    </Button>
      <Button
        ghost
        icon="reload"
        type='primary'
        onClick={refresh}
        disabled={getBtnDisabled}
      >
        刷新
      </Button>
    </Fragment>
  );

  return (
    <Fragment>
      <TableHeader headerButtons={headerBtns} />
      <div className="gradu-form-content">
        <h2>公告列表</h2>
        <SearchForm />
        <NoticeTable />
      </div>
    </Fragment>
  )
})
