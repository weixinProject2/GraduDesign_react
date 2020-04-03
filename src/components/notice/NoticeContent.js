import React, { useEffect, Fragment } from 'react';
import { Button, Table, message } from 'antd';
import { observer } from 'mobx-react-lite';
import TableContainer from '../../tool-components/TableContainerStyle';
import history from '../../utils/history';
import { useNoticeStore } from './stores';
import NoticeTable from './NoticeTable';
import SearchForm from './SearchForm';
import { deleteMoreNotice } from '../../api'

export default observer(() => {
  const {
    mainStore: {
      getBtnDisabled,
      loadInfo,
      getDeleteMoreDisabled,
      getRowSelect,
      setRowSelect,
      setDeleteMoreBtn,
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

  function deleteNotice() {
    deleteMoreNotice({ 'ids': getRowSelect.join(',') }).then((res) => {
      if (!res.error) {
        loadInfo();
        setRowSelect([]);
        setDeleteMoreBtn(false);
        message.success(res.message);
      } else {
        setRowSelect([]);
        setDeleteMoreBtn(false);
        message.error(res.message);
      }
    })
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
      <Button
        ghost
        icon="reload"
        type='danger'
        onClick={deleteNotice}
        disabled={getBtnDisabled || !getDeleteMoreDisabled}
      >
        批量删除
      </Button>
    </Fragment>
  );

  return (
    <TableContainer title="公告列表" headerButtons={headerBtns}>
      <SearchForm />
      <NoticeTable />
    </TableContainer>
  )
})
