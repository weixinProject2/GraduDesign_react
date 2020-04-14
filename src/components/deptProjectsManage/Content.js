import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { useDeptProjectsStore } from './stores';
import { Button, Breadcrumb, Tabs } from 'antd';
import TableContainer from '../../tool-components/TableContainerStyle';
import EmptyPage from '../../tool-components/EmptyPage';
import Details from './components/details';
import TeamForm from './components/team';
import SearchForm from './components/searchForm';

const { TabPane } = Tabs;

export default observer(() => {
  const {
    projectId, projectName,
    mainStore: {
      setActiveKey, getActiveKey, getSelectRows,
    }
  } = useDeptProjectsStore();

  const btnGroup = (
    <Fragment>
      {getActiveKey && getActiveKey === 'details' && <Button
        icon="play-circle"
        ghost
        type='primary'
      // disabled={getBtnDisabled || !getSelectedTreeNode}
      // onClick={openUploadModal}
      >开启项目</Button>}

      {getActiveKey && getActiveKey === 'team' && <Button
        type="primary"
        icon="usergroup-add"
        ghost
      // onClick={refresh}
      // disabled={getBtnDisabled || !getSelectedTreeNode}
      >导入项目成员</Button>}

      {getActiveKey && getActiveKey === 'team' && <Button
        type="danger"
        icon="delete"
        ghost
        disabled={!getSelectRows.length > 0}
      // onClick={refresh}
      // disabled={getBtnDisabled || !getSelectedTreeNode}
      >删除项目成员</Button>}

      <Button
        type="primary"
        icon="reload"
        ghost
      // onClick={refresh}
      // disabled={getBtnDisabled || !getSelectedTreeNode}
      >刷新</Button>

    </Fragment>
  );

  const title = (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>{projectName}</Breadcrumb.Item>
      <Breadcrumb.Item>
        项目管理
      </Breadcrumb.Item>
    </Breadcrumb>
  )

  return (
    <Fragment>
      {projectId && projectName ? <TableContainer
        titleStyle={{
          border: 'none',
          paddingBottom: 0
        }}
        title={title}
        headerButtons={btnGroup}
      >
        <Tabs
          onChange={setActiveKey}
          size="small"
          defaultActiveKey={getActiveKey}
        >
          <TabPane tab="项目详情" key="details">
            <Details />
          </TabPane>
          <TabPane tab="项目成员" key="team">
            <SearchForm />
            <TeamForm />
          </TabPane>
        </Tabs>
      </TableContainer> : <EmptyPage description="部门下暂无项目" style={{ height: '100%' }} />}
    </Fragment>
  )
})