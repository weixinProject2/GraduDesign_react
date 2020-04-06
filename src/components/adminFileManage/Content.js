import React, { useEffect, Fragment, useState, createRef } from 'react';

import { Button, message, Pagination, Spin, Empty } from 'antd';
import { observer } from 'mobx-react-lite';
import TableContainer from '../../tool-components/TableContainerStyle';
import FileTypeBlock from './components/fileTypeBlock';
import { useFileStore } from './stores';
import AddModalForm from './components/addModalForm';
import SearchForm from './components/searchForm';

import axios from 'axios';

export default observer(() => {
  const formRef = createRef();
  const {
    mainStore: {
      getAddModalStatus,
      setAddModalStatus,
      getOkBtnLoading,
      setOkBtnLoading,
      loadInfo,
      getBtnDisabled,
      getTableData,
      getLoading,
      getTotalPage,
      setCurrentPage,
      getCurrentPage,
    }
  } = useFileStore();

  useEffect(() => {
    loadInfo();
  }, [])

  function openUploadModal() {
    setAddModalStatus(true);
  }

  function closeAddModal() {
    setAddModalStatus(false);
  }

  function refresh() {
    loadInfo();
  }

  const btnGroup = (
    <Fragment>
      <Button
        icon="file-add"
        ghost
        type='primary'
        disabled={getBtnDisabled}
        onClick={openUploadModal}
      >新增文件</Button>
      <Button
        type="primary"
        icon="reload"
        ghost
        onClick={refresh}
        disabled={getBtnDisabled}
      >刷新</Button>
    </Fragment>
  );

  function handleCreate() {
    const { form } = formRef.current;
    form.validateFields((err, values) => {
      if (!err) {
        values.file = values.file.file;
        setOkBtnLoading(true);
        postFormData(values).then((res) => {
          if (res.status === 200) {
            message.success(res.data.message);
            setOkBtnLoading(false);
            closeAddModal();
            loadInfo();
          } else {
            message.error(res.data.message);
            setOkBtnLoading(false);
          }
        })
      }
    });
  };

  function postFormData(obj) {
    var formData = new FormData();
    for (var key in obj) {
      formData.append(key, obj[key]);
    }
    const TOKEN = localStorage.getItem('token');
    return axios({
      method: 'post',
      url: 'http://106.54.206.102:3000/admin/postFile',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${TOKEN}`,
      },
      data: formData,
    })
  }

  function changePage(currentPage) {
    setCurrentPage(currentPage);
    loadInfo();
  }

  const renderLists = () => {
    if (getTableData.length > 0) {
      return <div className="gradu-file">
        {getTableData.map((item, index) => <FileTypeBlock {...item} key={index} />)}
      </div>
    } else {
      return <div className="gradu-file"><Empty description="暂无文件数据" /></div>
    }
  }

  return (
    <TableContainer headerButtons={btnGroup} title='文件管理'>
      <SearchForm />
      <Spin tip="获取文件列表中..." spinning={getLoading}>
        {renderLists()}
        {getTotalPage && <Pagination className="gradu-file-pagination" current={getCurrentPage} onChange={changePage} total={getTotalPage} />}
      </Spin>
      <AddModalForm
        onCancel={closeAddModal}
        onCreate={handleCreate}
        visible={getAddModalStatus}
        wrappedComponentRef={formRef}
        confirmLoading={getOkBtnLoading}
      />
    </TableContainer >
  )
})