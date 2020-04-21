import React, { Fragment, useContext, useState } from 'react';
import { parseStatusCode, renderStatusType } from '../../Constants';
import JobTypeIcon from '../../tool-components/jobTypeIcon';
import StatusTag from '../../tool-components/StatusTag';
import JobModal from '../../tool-components/JobModal';

import { Tooltip } from 'antd';
import { useScrumStore } from './stores';
import { observer } from 'mobx-react-lite';

export default observer((props) => {
    const {
        id, problemName, problemDesc, active, onDragEnd, onDragStart, onClick, kinds, createTime, status,
    } = props;

    const {
        mainStore, projectId,
    } = useScrumStore();


    function handleDragStart() {
        onDragStart(id);
    }

    const renderKinds = () => {
        const type = kinds === 1 ? 'job' : 'bug';
        return <JobTypeIcon type={type} />
    }

    const renderStatusTag = () => {
        const { status: pStatus, statusText } = renderStatusType(parseStatusCode(status));
        return (
            <StatusTag status={pStatus} text={statusText} />
        );
    }

    return (
        <div
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
            id={`item-${id}`}
            className={'item' + (active ? ' active' : '')}
            draggable="true"
            onClick={onClick}
        >
            <header className="item-header">
                {renderKinds()}
                <Tooltip title={problemName}>
                    <span className="item-header-username">{problemName}</span>
                </Tooltip>
            </header>
            <footer>
                {renderStatusTag()}
                <Tooltip title={createTime}>
                    <span>{createTime}</span>
                </Tooltip>
            </footer>
            <main className="item-main">{problemDesc}</main>

            
        </div>
    )
})