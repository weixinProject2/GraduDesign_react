import React, { useState, useEffect, Fragment } from 'react';
import { Table, Tooltip, Modal, Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
import { useMessageStore } from './stores';
import AnnounceDetail from './AnnounceDetail';

export default observer(() => {

  const {
    mainStore,
  } = useMessageStore();

  const {
    getCurrentPage,
    getTotalPage, loadInfo, setCurrentPage, getTableLoading, getTableData, setAnnounceId,
    detailModal, setDetailModal,
  } = mainStore;

  useEffect(() => {
    loadInfo();
  }, [])


  function changePage(page) {
    setCurrentPage(page);
    loadInfo();
  }

  const renderLink = (text, record) => (
    <Tooltip title={`查看${text}公告详情`}>
      <span className="gradu-notice-link" onClick={openDetailModal.bind(this, record)}>{text}</span>
    </Tooltip>
  )
  // onClick={goDetail.bind(this, record.anmountId)}

  function openDetailModal(record) {
    const anmountId = record && record.anmountId;
    setAnnounceId(anmountId);
    setDetailModal(true);
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: renderLink,
    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
    },
  ];

  const pageSet = {
    pageSize: 10,
    current: getCurrentPage,
    total: getTotalPage,
    onChange: changePage,
  }

  function onCancel() {
    setDetailModal(false);
    setAnnounceId(null);
  }

  return (
    <Fragment>
      <Drawer
        title={null}
        visible={detailModal}
        onClose={onCancel}
        closable
        width={560}
        mask={false}
        // confirmLoading={confirmLoading}
        destroyOnClose={true}
      >
        <AnnounceDetail />
      </Drawer>
      <Table
        tableLayout='inline'
        size='small'
        columns={columns}
        rowKey='anmountId'
        loading={getTableLoading}
        dataSource={getTableData}
        pagination={pageSet}
      />
    </Fragment>
  )
})