import React from 'react';
import { Descriptions, Divider } from 'antd';
import { observer } from 'mobx-react-lite';
import { useDeptProjectsStore } from '../../stores';
import './index.less';

export default observer(() => {
  const {
    projectId, projectName,
    mainStore,
  } = useDeptProjectsStore();
  return (
    <div style={{ padding: '0 10px' }}>
      <Descriptions layout='horizontal' column={2}>
        <Descriptions.Item label="项目名称">{projectName}</Descriptions.Item>
        <Descriptions.Item label="创建日期">2019-2-28</Descriptions.Item>
        <Descriptions.Item label="项目编号">{projectId}</Descriptions.Item>
        <Descriptions.Item label="项目描述">empty</Descriptions.Item>
        <Descriptions.Item label="项目状态">
          已开启
        </Descriptions.Item>
        <Descriptions.Item label="项目进度">
            30%
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions layout='horizontal' column={2} title="迭代详情">
        <Descriptions.Item label="当前项目迭代数目">12</Descriptions.Item>
        <Descriptions.Item label="当前迭代阶段">Sprint1.1</Descriptions.Item>
      </Descriptions>
    </div>
  )
})