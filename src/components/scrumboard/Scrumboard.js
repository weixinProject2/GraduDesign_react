import React, { useState, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { useScrumStore } from './stores';
import TaskCol from './TaskCol';
import TaskItem from './TaskItem';
import { Button } from 'antd';

export default observer(() => {
    const {
        tasks, STATUS_CODE,
    } = useScrumStore();

    const [myTasks, setTasks] = useState(tasks);
    const [activeId, setActiveId] = useState(null);

    function onDragStart(id) {
        setActiveId(id);
    }

    function dragTo(status) {
        let task = tasks[activeId];
        if (task.status !== status) {
            task.status = status;
            setTasks(tasks);
        }
        cancelSelect();
    }

    function cancelSelect() {
        setActiveId(null);
    }

    return (
        <Fragment>
            <header className="gradu-content-header">
                <Button icon="clock-circle" ghost type='primary'>完成本次迭代</Button>
            </header>
            <div className="gradu-form-content">
                <div className="task-wrapper">
                    {
                        Object.keys(STATUS_CODE).map(status =>
                            <TaskCol
                                status={status}
                                key={status}
                                dragTo={dragTo}
                                canDragIn={activeId !== null && tasks[activeId].status !== status}>
                                {tasks.filter(t => t.status === status).map(t =>
                                    <TaskItem
                                        key={t.id}
                                        active={t.id === activeId}
                                        id={t.id}
                                        title={t.title}
                                        point={t.point}
                                        username={t.username}
                                        onDragStart={onDragStart}
                                        onDragEnd={cancelSelect}
                                    />)
                                }
                            </TaskCol>
                        )
                    }
                </div>
            </div>
        </Fragment>
    )
})