import React, { Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useDeptProjectsStore } from './stores';
import { Button, Breadcrumb, Tabs, message, Drawer, Select, Avatar } from 'antd';
import TableContainer from '../../tool-components/TableContainerStyle';
import EmptyPage from '../../tool-components/EmptyPage';
import Details from './components/details';
import TeamForm from './components/team';
import SearchForm from './components/searchForm';
import { runProjects, getUnsetLists, addProjectMember } from '../../api';


const { TabPane } = Tabs;
const { Option } = Select;


export default observer(() => {
  const {
    projectId, projectName,
    mainStore
  } = useDeptProjectsStore();

  const [selectLists, setLists] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  function loadInfoSelect() {
    getUnsetLists({ projectId: projectId }).then((res) => {
      setLists(res.list);
    })
  }

  const optionsGroup = () => {
    if (selectLists && selectLists.length > 0) {
      return selectLists.map((item, i) =>
        <Option key={item.workNumber} style={{ display: 'flex', alignItems: 'center' }}>
          {
            item.headerImg ? <Avatar src={item.headerImg} /> : <Avatar size="small" className="gradu-avatar">
              {item.userName.split('')[0]}
            </Avatar>
          }
          <span style={{ marginLeft: '7px' }}>
            {item.userName}
          </span>
        </Option>)
    }
  }

  useEffect(() => {
    if (projectId) {
      loadInfoSelect();
    }
  }, [projectId])

  function handleChange(e) {
    setSelectedValue(e);
  }

  const {
    loadProjectInfo,
    loadInfo,
    setActiveKey,
    getActiveKey,
    getSelectRows,
    contentBtnDisbled,
    getBtnDisabled,
    dataSource,
  } = mainStore;

  const [drawerVisible, setDrawerVisible] = useState(false);

  function refresh() {
    const status = getActiveKey === 'details';
    return status ? loadProjectInfo(projectId) : loadInfo(projectId);
  }

  function openProject() {
    runProjects({ projectId: projectId }).then((res) => {
      if (!res.error) {
        message.success(res.message);
        loadProjectInfo(projectId);
      } else {
        message.error(res.message);
      }
    })
  }


  const btnGroup = (
    <Fragment>
      {
        getActiveKey && getActiveKey === 'details' && (dataSource && !dataSource.isOpen && <Button
          icon="play-circle"
          ghost
          type='primary'
          disabled={contentBtnDisbled}
          onClick={openProject}
        >开启项目</Button>)
      }

      {
        getActiveKey && getActiveKey === 'details' && dataSource && dataSource.isOpen && <Button
          icon="close-circle"
          ghost
          type='danger'
          disabled={contentBtnDisbled}
        // onClick={openProject}
        >关闭项目</Button>
      }

      {
        getActiveKey && getActiveKey === 'team' && <Button
          type="primary"
          icon="usergroup-add"
          ghost
          onClick={() => setDrawerVisible(true)}
          disabled={getBtnDisabled}
        >导入项目成员</Button>
      }

      {getActiveKey && getActiveKey === 'team' && <Button
        type="danger"
        icon="delete"
        ghost
        disabled={!getSelectRows.length > 0 || getBtnDisabled}
      // onClick={refresh}
      >删除项目成员</Button>}

      <Button
        type="primary"
        icon="reload"
        ghost
        onClick={refresh}
        disabled={getBtnDisabled || contentBtnDisbled}
      >刷新</Button>

    </Fragment>
  );

  const title = (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>
        项目管理
      </Breadcrumb.Item>
      <Breadcrumb.Item>{projectName}</Breadcrumb.Item>
      <Breadcrumb.Item>
        {getActiveKey === 'details' ? '项目详情' : '项目成员'}
      </Breadcrumb.Item>
    </Breadcrumb>
  )

  function addNewMember() {
    const obj = {
      workNumber: selectedValue,
      projectId,
    }
    addProjectMember(obj).then((res) => {
      if (!res.error) {
        message.success(res.message);
        setDrawerVisible(false);
        loadInfo(projectId);
      } else {
        message.error(res.message);
      }
    })
  }

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
          className="gradu-sprint-tab"
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
      <Drawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        title="添加项目拥有成员"
        width={340}
        closable={false}
        destroyOnClose
      >
        <Select
          style={{ width: '100%' }}
          placeholder="选择项目拥有成员"
          onChange={handleChange}
        >
          {optionsGroup()}
        </Select>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button onClick={addNewMember} type="primary">
            确认添加
          </Button>
          <Button
            style={{
              marginLeft: 8,
            }}
            onClick={() => setDrawerVisible(false)}
          >
            取消
          </Button>
        </div>
      </Drawer>
    </Fragment>
  )
})