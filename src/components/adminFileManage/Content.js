import React, { useEffect, Fragment, useState, createRef } from 'react';

import { Button, message, Pagination, Spin, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import TableContainer from '../../tool-components/TableContainerStyle';
import FileTypeBlock from './components/fileTypeBlock';
import { useFileStore } from './stores';
import { createNewFolder, deleteFolder } from '../../api';
import AddModalForm from './components/addModalForm';
import AddFolderForm from './components/addFolderForm';
import SearchForm from './components/searchForm';
import SiderTree from './components/sideTree';
import EmptyPage from '../../tool-components/EmptyPage';
import axios from 'axios';

const { confirm } = Modal;

export default observer(() => {
  const formRef = createRef();
  const formAddFolderRef = createRef();

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
      getSelectedTreeNode,
      loadTreeData,
      getSideTreeData,
      setAddFolderModalStatus,
      getAddFolderModalStatus,
      getRootTrees,
    },
    permissions,
  } = useFileStore();

  // 当文件树或者文件ID变化得时候就得去重新获取对应得文件数据
  useEffect(() => {
    if (getSelectedTreeNode) {
      loadInfo();
    }
  }, [getSelectedTreeNode, getSideTreeData])

  function openUploadModal() {
    setAddModalStatus(true);
  }
  function openAddFolderModal() {
    setAddFolderModalStatus(true);
  }

  function closeAddModal() {
    setAddModalStatus(false);
  }

  function closeAddFolderModal() {
    setAddFolderModalStatus(false);
  }

  function refresh() {
    loadInfo();
  }

  function checkBtnRight() {
    if (permissions === '1') {
      if (getSelectedTreeNode !== '100000') {
        return true;
      }
      return false
    } else if (permissions === '2') {
      if (getSelectedTreeNode !== '200000' && getSelectedTreeNode !== '100000') {
        return true
      }
      return false
    } else if (permissions === '0') {
      return true;
    }
    return false
  }

  const btnGroup = (
    <Fragment>
      {checkBtnRight() && <Button
        icon="file-add"
        ghost
        type='primary'
        disabled={getBtnDisabled || (!getSelectedTreeNode)}
        onClick={openUploadModal}
      >添加文件</Button>}
      <Button
        type="primary"
        icon="reload"
        ghost
        onClick={refresh}
        disabled={getBtnDisabled || !getSelectedTreeNode}
      >刷新</Button>
      {checkBtnRight() && <Button
        type="primary"
        icon="folder-add"
        ghost
        onClick={openAddFolderModal}
        disabled={getBtnDisabled || !getSelectedTreeNode}
      >新建文件夹</Button>}
      {checkBtnRight() && <Button
        type="danger"
        icon="delete"
        ghost
        onClick={showDeleteConfirm}
        disabled={getBtnDisabled || checkRootFolder()}
      >删除文件夹</Button>}
    </Fragment>
  );

  function checkRootFolder() {
    if (!getSelectedTreeNode) {
      return true;
    }
    return getRootTrees.some(item => item.toString() === getSelectedTreeNode);
  }

  // 添加新文件夹
  function handleFolderCreate() {
    const { form } = formAddFolderRef.current;
    form.validateFields((err, values) => {
      if (!err) {
        values.parentId = getSelectedTreeNode;
        createNewFolder(values).then((res) => {
          if (!res.error) {
            message.success(res.message);
            closeAddFolderModal();
            loadTreeData();
          } else {
            message.error(res.message);
          }
        })
      }
    });
  };

  // 上传新文件
  function handleCreate() {
    const { form } = formRef.current;
    form.validateFields((err, values) => {
      if (!err) {
        values.file = values.file.file;
        values.folderId = getSelectedTreeNode;
        setOkBtnLoading(true);
        postFormData(values).then((res) => {
          if (res.status === 200 && !res.data.error) {
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

  function handleDeleteFolder() {
    const obj = {
      folderId: getSelectedTreeNode,
    }
    deleteFolder(obj).then((res) => {
      if (!res.error) {
        message.success(res.message);
        loadTreeData();
        return true;
      } else {
        message.error(res.message);
      }
    })
  }

  function showDeleteConfirm() {
    confirm({
      title: '你确定要删除此文件夹？',
      content: '删除文件夹将会删除以下所有得文件以及子文件夹，确定这么做吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: handleDeleteFolder
    });
  }

  const renderLists = () => {
    return (
      <div className="gradu-file">
        {getTableData.length > 0 ? getTableData.map((item, index) => <FileTypeBlock {...item} key={index} />) : <EmptyPage description={'此文件夹下暂无文件数据'} />}
      </div>
    )
  }
  const sideTree = (<SiderTree />)

  return (
    <TableContainer headerButtons={btnGroup} title='文件管理' hasSideTree={sideTree}>
      <SearchForm />
      <Spin tip="获取文件列表中..." spinning={getLoading}>
        {renderLists()}
        {getTotalPage ? <Pagination className="gradu-file-pagination" current={getCurrentPage} onChange={changePage} total={getTotalPage} /> : null}
      </Spin>
      <AddModalForm
        onCancel={closeAddModal}
        onCreate={handleCreate}
        visible={getAddModalStatus}
        wrappedComponentRef={formRef}
        confirmLoading={getOkBtnLoading}
      />
      {/* 添加文件夹modal */}
      <AddFolderForm
        onCancel={closeAddFolderModal}
        onCreate={handleFolderCreate}
        visible={getAddFolderModalStatus}
        wrappedComponentRef={formAddFolderRef}
      />

    </TableContainer >
  )
})