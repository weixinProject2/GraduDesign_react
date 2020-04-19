import React, { useEffect, Fragment, useState } from 'react';

import { Table, Avatar } from 'antd';
import { observer } from 'mobx-react-lite';
import { useJobStore } from '../../stores';
import JobTypeIcon from '../../../../tool-components/jobTypeIcon';
import StatusTag from '../../../../tool-components/StatusTag';
import "./index.less";
import { renderStatusType } from '../../../../Constants';
import JobModal from '../../../../tool-components/JobModal';

export default observer(() => {
  const {
    projectId, mainStore,
  } = useJobStore();

  const [jobModalVisible, setCreateModal] = useState(false);
  const [listData, setListData] = useState([]);


  const {
    setCurrentPage, getCurrentPage, getTotalPage,
    tableLoading, getTableData, loadTableData,
  } = mainStore;

  function changePage(page) {
    setCurrentPage(page);
    loadTableData(projectId);
  }

  const pageSet = {
    pageSize: 10,
    current: getCurrentPage,
    total: getTotalPage,
    onChange: changePage,
  }

  const renderName = (text, record) => {

    return (
      <Fragment>
        <span
          className="gradu-sprint-table-name"
          onClick={() => {
            setListData(record);
            setCreateModal(true);
          }}
        >
          {text}
        </span>
      </Fragment>
    )
  }


  const renderSprintName = (text, record) => (
    text ? <StatusTag
      status="default"
      text={text}
      size={14}
    /> : '暂无设置冲刺'
  );

  const renderType = (text, record) => {
    const problemType = record.kinds === 1 ? "job" : 'bug';
    const problemTypeName = record.kinds === 1 ? '任务' : '缺陷';
    return <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <JobTypeIcon
        type={problemType}
        size={10}
      />
      <span>{problemTypeName}</span>
    </div>
  }

  const renderStatus = (text, record) => {
    const { statusText, status } = renderStatusType(text);
    return <StatusTag status={status} text={statusText} />
  }

  const renderAgentRole = (text, record) => {
    if (text) {
      const { agentRoleHeaderImg } = record;
      return <div style={{ display: 'flex', alignItems: 'center' }}>
        {agentRoleHeaderImg ?
          <Avatar size="small" src={agentRoleHeaderImg} /> :
          <Avatar size="small" className="gradu-avatar">{text.split('')[0]}</Avatar>
        }
        <span style={{ marginLeft: '5px' }}>{text}</span>
      </div>
    } else {
      return '暂无报告人';
    }
  }

  const renderReporter = (text, record) => {
    if (text) {
      const { reporterRoleHeaderImg } = record;
      return <div style={{ display: 'flex', alignItems: 'center' }}>
        {reporterRoleHeaderImg ?
          <Avatar size="small" src={reporterRoleHeaderImg} /> :
          <Avatar size="small" className="gradu-avatar">{text.split('')[0]}</Avatar>
        }
        <span style={{ marginLeft: '5px' }}>{text}</span>
      </div>
    } else {
      return '暂无报告人'
    }
  }

  const renderLeftTime = (text, record) => {
    return text ? <span>{text}小时</span> : '暂未设置任务所需时间'
  }

  const columns = [
    {
      title: '问题',
      dataIndex: 'problemName',
      render: renderName,
    },
    {
      title: '问题编号',
      dataIndex: 'problemId',
      render: (text) => (<span>{`#${text}`}</span>)
    },
    {
      title: '问题类别',
      dataIndex: 'kinds',
      render: renderType,
    },
    {
      title: '最后更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '所需时间',
      dataIndex: 'remainTime',
      render: renderLeftTime,
    },

    {
      title: '所在冲刺',
      dataIndex: 'sprintName',
      render: renderSprintName,
    },
    {
      title: '报告人',
      dataIndex: 'agentRoleName',
      render: renderAgentRole,
    },
    {
      title: '经办人',
      dataIndex: 'reporterRoleName',
      render: renderReporter,
    },

    {
      title: '状态',
      dataIndex: 'status',
      render: renderStatus,
    },
  ];

  useEffect(() => {
    loadTableData(projectId);
  }, [projectId])

  function jobModalCallBack() {
    setCreateModal(false);
    loadTableData(projectId);
  }

  return (
    <Fragment>
      <Table
        className="gradu-sprint-table"
        columns={columns}
        tablelayout='inline'
        rowKey='problemId'
        size='small'
        loading={tableLoading}
        dataSource={getTableData}
        pagination={pageSet}
      />
      <JobModal
        visible={jobModalVisible}
        onClose={() => setCreateModal(false)}
        projectId={projectId}
        listprops={listData}
        callBack={jobModalCallBack}
      />
    </Fragment>
  )
})