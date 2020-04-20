import React, { useEffect, useState, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Breadcrumb, Button, Tabs, Drawer } from 'antd';
import { useJobStore } from './stores';
import TableContainer from '../../tool-components/TableContainerStyle';
import EmptyPage from '../../tool-components/EmptyPage';
import DetailLists from './components/detailLists';
import AddSprintForm from './components/addSprintForm';
import JobsTable from './components/jobsTable';
import SearchForm from './components/searchForm';
import JobMdal from '../../tool-components/JobModal';

const { TabPane } = Tabs;

export default observer(() => {
  const {
    projectId, projectName, mainStore,
  } = useJobStore();

  const [jobModalVisible, setJobModalVisible] = useState(false);

  const {
    setActiveKey,
    getActiveKey,
    addSprintModal,
    setAddSprintModal,
    loadTableData,
    loadSprintData,
    tableBtnDiabled,
    sprintBtnDisabled,
  } = mainStore;

  function refresh() {
    return getActiveKey === 'details' ? loadSprintData(projectId) : loadTableData(projectId);
  }

  function jobCreateCallBack() {
    loadTableData(projectId);
    setJobModalVisible(false);
  }

  const title = (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>{projectName}</Breadcrumb.Item>
      <Breadcrumb.Item>
        工作列表
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        {getActiveKey === 'details' ? '待办事项' : '全部问题'}
      </Breadcrumb.Item>
    </Breadcrumb>
  )

  const btnGroup = (
    <Fragment>
      {
        getActiveKey !== 'details' && <Button
          type="primary"
          icon="form"
          ghost
          onClick={() => setJobModalVisible(true)}
        >
          创建问题
        </Button>
      }
      {
        getActiveKey === 'details' && <Button
          type="primary"
          icon="interaction"
          disabled={sprintBtnDisabled}
          ghost
          onClick={() => setAddSprintModal(true)}
        >
          创建冲刺
        </Button>
      }
      <Button
        type="primary"
        icon="reload"
        ghost
        onClick={refresh}
        disabled={tableBtnDiabled || sprintBtnDisabled}
      >
        刷新
      </Button>
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
          onChange={(e) => setActiveKey(e)}
          size="small"
          defaultActiveKey={getActiveKey}
        >
          <TabPane tab="待办事项" key="details">
            <DetailLists />
          </TabPane>
          <TabPane tab="所有问题" key="all">
            {/* 
            <TeamForm /> */}
            <SearchForm />
            <JobsTable />
          </TabPane>
        </Tabs>
      </TableContainer> : <EmptyPage description="部门下暂无项目" style={{ height: '100%' }} />}

      <Drawer
        visible={addSprintModal}
        destroyOnClose
        width={500}
        title='创建冲刺'
        onClose={() => setAddSprintModal(false)}
      >
        <AddSprintForm />
      </Drawer>

      <JobMdal
        visible={jobModalVisible}
        onClose={() => setJobModalVisible(false)}
        projectId={projectId}
        callBack={jobCreateCallBack}
      />

    </Fragment>
  )
})