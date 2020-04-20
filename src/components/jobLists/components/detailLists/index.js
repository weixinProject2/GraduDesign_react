import React, { Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './index.less';
import { Icon, Avatar, Tooltip, Spin, Button, Drawer, Switch, Modal, message } from 'antd';
import StatusTag from '../../../../tool-components/StatusTag';
import { useJobStore } from '../../stores';
import EmptyPage from '../../../../tool-components/EmptyPage';
import JobItem from '../listsJobItem';
import JobMdal from '../../../../tool-components/JobModal';
import WorkLists from '../workLists';
import { deleteSprint } from '../../../../api';

function getSprintStatus(num) {
  let status;
  let statusText;
  switch (num) {
    case 0:
      status = 'create';
      statusText = "未开启";
      break;
    case 1:
      status = 'pending';
      statusText = '进行中';
      break;
    case 2:
      status = 'success';
      statusText = '已结束';
      break;
    default:
      break;
  }
  return {
    status, statusText
  }
}


const SprintItem = (props) => {

  const {
    sprintId,
    sprintName,
    index,
    createTime,
    endTime,
    status,
    sprintDesc,
    dealtWith,
    development,
    InTest,
    needCheck,
    workList,
    complate,
    problemList,
  } = props;

  const {
    projectId, mainStore,
  } = useJobStore();

  const {
    loadSprintData,
  } = mainStore;

  const [expand, setEpand] = useState(index === 0);
  const [jobModalVisible, setCreateModal] = useState(false);

  function jobModalCallBack() {
    setCreateModal(false);
    loadSprintData(projectId);
  }

  const renderSprintStatus = () => {
    const { statusText, status: sprintStatus } = getSprintStatus(status);
    return <StatusTag text={statusText} status={sprintStatus} size={10} />
  }

  const renderSrintBtn = () => {
    const show = status !== 2;
    const title = !status ? '开启冲刺' : '结束冲刺';
    return show && <Tooltip title={title}>
      <Switch
        size="small"
        checked={status}
        style={{
          marginLeft: 'auto', marginRight: '10px'
        }}
      />
    </Tooltip>

  }

  const renderListItem = () => (
    problemList.map((item, index) => {
      return <JobItem key={index} {...item} />
    })
  )

  const renderAvatarLists = () => {
    return (
      workList && workList.length > 0 && workList.map((item, index) => {
        const { userName, headerImg } = item;
        return <Tooltip title={userName}>
          {headerImg ? <Avatar src={headerImg} /> :
            <Avatar size='small' className="gradu-avatar">{userName.split('')[0]}</Avatar>}
        </Tooltip>
      })
    )
  }

  const [workListModal, setWorkListsModal] = useState(false);

  function handleDeleteSprint() {
    deleteSprint({ sprintId }).then((res) => {
      if (!res.error) {
        message.success(res.message);
        loadSprintData(projectId);
      } else {
        message.error(res.message);
      }
    })
  }

  function openDeleteSprintModal() {
    Modal.confirm({
      title: '确认删除此冲刺？',
      content: '删除这个迭代将清空所有数据',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: handleDeleteSprint,
    })
  }

  return (
    <Fragment>
      <div className="gradu-sprint-item">
        {
          problemList && problemList.length > 0 && <Icon
            type={expand ? "caret-down" : "caret-right"}
            className="sprint-item-btn"
            onClick={() => setEpand(!expand)}
          />
        }
        <section>
          <header>
            <span>{sprintName}</span>
            {renderSprintStatus()}
            <span
              className="sprint-btn sprint-create"
              onClick={() => setCreateModal(true)}
            >
              <Icon type="plus" />
              创建问题
            </span>
            {renderSrintBtn()}
            {status !== 1 && <Tooltip title="删除冲刺">
              <Icon type="close"
                style={{ color: '#ccc' }}
                onClick={openDeleteSprintModal}
              />
            </Tooltip>}
            <JobMdal
              visible={jobModalVisible}
              onClose={() => setCreateModal(false)}
              projectId={projectId}
              callBack={jobModalCallBack}
              defaultSprintId={sprintId}
            />
          </header>
          <main>

            <div className="gradu-sprint-item-avater">
              {renderAvatarLists()}
            </div>

            {workList && workList.length > 0 && <Icon type="more"
              onClick={() => setWorkListsModal(true)}
            />}
            <Drawer
              destroyOnClose
              title='工作量'
              width='calc(100% - 380px)'
              visible={workListModal}
              onClose={() => setWorkListsModal(false)}
            >
              <WorkLists dataSource={workList} />
            </Drawer>

            <div className="gradu-sprint-item-status">
              <Tooltip title={`代办问题数:${dealtWith}`}>
                <span className="not">{dealtWith}</span>
              </Tooltip>
              <Tooltip title={`开发中问题数:${development}`}>
                <span className="pending">{development}</span>
              </Tooltip>
              <Tooltip title={`已完成问题数:${complate}`}>
                <span className="finished">{complate}</span>
              </Tooltip>

            </div>

          </main>

          <footer>
            <div className="gradu-sprint-item-createDate">
              {createTime} ~ {endTime}
            </div>
            <div className="gradu-sprint-item-describe">
              冲刺目标：{sprintDesc}
            </div>
          </footer>
        </section>
      </div>

      {problemList && problemList.length > 0 && <div className="gradu-sprint-lists" style={{ display: expand ? 'block' : 'none' }}>
        {renderListItem()}
      </div>
      }
    </Fragment>
  )
}


export default observer(() => {
  const {
    mainStore,
    projectId,
  } = useJobStore()

  const {
    sprintLoading,
    loadSprintData,
    getSprintData,
  } = mainStore;

  useEffect(() => {
    loadSprintData(projectId);
  }, [projectId]);


  const renderSprint = () => (
    getSprintData && getSprintData.length > 0 ?
      getSprintData.map((item, index) => <SprintItem {...item} key={item.problemId} index={index} projectId={projectId} />) :
      <EmptyPage description="本项目暂无冲刺，点击上方按钮创建" />
  );

  return (
    <Spin spinning={sprintLoading}>
      <div className="gradu-sprint">
        {renderSprint()}
      </div>
    </Spin>
  );
})