import React from 'react';

import { Table, Avatar } from 'antd';
import { observer } from 'mobx-react-lite';

export default observer(({ dataSource }) => {

  const renderWorker = (text, record) => {
    const { headerImg, } = record;
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        {
          headerImg ? <Avatar size='small' src={headerImg} /> : <Avatar size='small' className="gradu-avatar">
            {text.split('')[0]}
          </Avatar>
        }
        <span style={{ marginLeft: '10px' }}>{text}</span>
      </div>
    )
  }

  const columns = [
    {
      title: '经办人',
      dataIndex: 'userName',
      render: renderWorker
    },
    {
      title: '工号',
      dataIndex: 'workNumber',
      render: (text) => (<span>#{text}</span>)
    },
    {
      title: '总问题数目',
      dataIndex: 'problemTotal'
    },
    {
      title: '已完成问题数目',
      dataIndex: 'problemComplateCount',
    },
    {
      title: '剩余问题数目',
      dataIndex: 'problemPendingCount',
    },
    {
      title: '剩余问题总时间',
      dataIndex: 'remainingEstimatedTime',
      render: (text) => (<span>{text}h</span>)
    },
  ]

  return (
    <Table
      columns={columns}
      // size="small"
      dataSource={dataSource}
      pagination={false}
    />
  )

})