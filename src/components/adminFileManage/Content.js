import React, { useEffect, Fragment, useState, createRef } from 'react';

import { Button, Modal, message } from 'antd';
import { observer } from 'mobx-react-lite';
import TableHeader from '../../tool-components/TableHeader';
import FileTypeBlock from './components/fileTypeBlock';
import { useFileStore } from './stores';
import AddModalForm from './components/addModalForm'

import axios from 'axios';

export default observer(() => {
  const formRef = createRef();
  const {
    mainStore: {
      getAddModalStatus,
      setAddModalStatus,
      getOkBtnLoading,
      setOkBtnLoading,
    }
  } = useFileStore();
  useEffect(() => {

  })

  function openUploadModal() {
    setAddModalStatus(true);
  }

  function closeAddModal() {
    setAddModalStatus(false);
  }

  const btnGroup = (
    <Fragment>
      <Button
        icon="file-add"
        ghost
        type='primary'
        onClick={openUploadModal}
      >新增文件</Button>
      <Button
        type="primary"
        icon="reload"
        ghost
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

  return (
    <Fragment>
      <TableHeader headerButtons={btnGroup} />
      <div className="gradu-form-content">
        <h2>文件管理</h2>
        <div className="gradu-file">
          <FileTypeBlock fileType="pdf" />
          <FileTypeBlock fileType="doc" />
          <FileTypeBlock fileType="png" />
          <FileTypeBlock fileType="gif" />
          <FileTypeBlock fileType="md" />
          <FileTypeBlock fileType="ppt" />
          <FileTypeBlock fileType="xls" />
          <FileTypeBlock fileType="zip" />
        </div>
      </div>
      <AddModalForm
        onCancel={closeAddModal}
        onCreate={handleCreate}
        visible={getAddModalStatus}
        wrappedComponentRef={formRef}
        confirmLoading={getOkBtnLoading}
      />
    </Fragment>
  )
})