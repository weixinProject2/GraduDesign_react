import React, { useEffect, useState, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Breadcrumb, Button, Tabs } from 'antd';
import { useJobStore } from './stores';
import TableContainer from '../../tool-components/TableContainerStyle';
import EmptyPage from '../../tool-components/EmptyPage';
import DetailLists from './components/detailLists';

const { TabPane } = Tabs;

export default observer(() => {
  const {
    projectId, projectName, mainStore,
  } = useJobStore();

  const {
    setActiveKey,
    getActiveKey,
  } = mainStore;

  const title = (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>{projectName}</Breadcrumb.Item>
      <Breadcrumb.Item>
        工作列表
      </Breadcrumb.Item>
    </Breadcrumb>
  )

  const btnGroup = (
    <Fragment>
      {
        getActiveKey === 'details' && <Button
          type="primary"
          icon="form"
          ghost
        >
          创建问题
        </Button>
      }
      {
        getActiveKey === 'details' && <Button
          type="primary"
          icon="interaction"
          ghost
        >
          创建冲刺
        </Button>
      }
      <Button
        type="primary"
        icon="reload"
        ghost
      // onClick={refresh}
      // disabled={getBtnDisabled || !getSelectedTreeNode}
      >刷新</Button>
    </Fragment>
  );

  return (
    <Fragment>
      {projectId && projectName ? <TableContainer
        titleStyle={{
          border: 'none',
          padding: '13px 0 0 17px'
        }}
        title={title}
        headerButtons={btnGroup}
      >
        <Tabs
          onChange={setActiveKey}
          size="small"
          defaultActiveKey={getActiveKey}
        >
          <TabPane tab="待办事项" key="details">
            <DetailLists />
          </TabPane>
          <TabPane tab="所有问题" key="all">
            {/* <SearchForm />
            <TeamForm /> */}
          </TabPane>
        </Tabs>
      </TableContainer> : <EmptyPage description="部门下暂无项目" style={{ height: '100%' }} />}
    </Fragment>
  )
})