import React, { useState, Fragment, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useScrumStore } from './stores';
import TaskCol from './TaskCol';
import TaskItem from './TaskItem';
import { Button, Breadcrumb, Spin } from 'antd';
import TableContainer from '../../tool-components/TableContainerStyle'
import EmptyPage from '../../tool-components/EmptyPage';
import SprintSelect from './components/sprintSelect';
import JobModal from '../../tool-components/JobModal';

export default observer(() => {
    const {
        tasks, STATUS_CODE, projectId, projectName, mainStore,
    } = useScrumStore();

    const [createVisible, setCreateVisible] = useState(false);

    const [activeId, setActiveId] = useState(null);
    const {
        loadMyJob, getSeletSprint, getAllSprint, getAlljobLists, boardLoading, changeJobStatus, editData
    } = mainStore;

    useEffect(() => {
        getSeletSprint && projectId && loadMyJob(projectId);
    }, [projectId, getSeletSprint])

    function onDragStart(id) {
        setActiveId(id);
    }

    function dragTo(status) {
        let task = getAlljobLists && getAlljobLists.filter(item => item.problemId === activeId)[0];
        if (task.status !== status) {
            task.status = status;
            changeJobStatus(task);
        }
        cancelSelect();
    }

    function cancelSelect() {
        setActiveId(null);
    }


    const headerBtns = (
        <Fragment>
            <SprintSelect />
            <Button
                icon="plus"
                ghost type='primary'
                onClick={() => setCreateVisible(true)}
            >
                创建问题
            </Button>
        </Fragment>
    );

    const title = (
        <Breadcrumb separator=">">
            <Breadcrumb.Item>{projectName}</Breadcrumb.Item>
            <Breadcrumb.Item>
                迭代计划
          </Breadcrumb.Item>
        </Breadcrumb>
    )

    const [jobModalVisible, setVisible] = useState(false);

    function callBack() {
        loadMyJob(projectId);
        setVisible(false);
    }

    function createCallBack() {
        loadMyJob(projectId);
        setCreateVisible(false);
    }

    return (
        getAllSprint && getAllSprint.length > 0 ?
            <Spin spinning={boardLoading}>
                <TableContainer headerButtons={headerBtns} title={title}>
                    <div className="task-wrapper">
                        {
                            Object.keys(STATUS_CODE).map(status =>
                                <TaskCol
                                    status={status}
                                    key={status}
                                    dragTo={dragTo}
                                    canDragIn={activeId !== null && getAlljobLists.filter(item => item.problemId === activeId)[0].status !== status}>
                                    {getAlljobLists.filter(t => t.status === status).map(t =>
                                        <Fragment>
                                            <TaskItem
                                                key={t.problemId}
                                                active={t.problemId === activeId}
                                                id={t.problemId}
                                                dataSource={t}
                                                {...t}
                                                onDragStart={onDragStart}
                                                onDragEnd={cancelSelect}
                                                onClick={() => setVisible(true)}
                                            />
                                        </Fragment>
                                    )
                                    }
                                </TaskCol>
                            )
                        }
                    </div>
                    <JobModal
                        visible={createVisible}
                        onClose={() => {
                            setCreateVisible(false)
                        }}
                        callBack={createCallBack}
                        projectId={projectId}
                        defaultSprintId={getSeletSprint || ''}
                        statusNum
                    />
                    <JobModal
                        visible={jobModalVisible}
                        onClose={() => {
                            setVisible(false)
                        }}
                        callBack={callBack}
                        listprops={editData}
                        projectId={projectId}
                        defaultSprintId={editData.sprintId || ''}
                        statusNum
                    />
                </TableContainer>
            </Spin> : <EmptyPage description={'项目下无任何迭代'} style={{ height: '100%' }} />
    )
})