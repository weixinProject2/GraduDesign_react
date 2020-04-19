import React, { useState, Fragment } from 'react';

import JobTypeIcon from '../../../../tool-components/jobTypeIcon';
import StatusTag from '../../../../tool-components/StatusTag';
import { renderStatusType } from '../../../../Constants';
import JobMdal from '../../../../tool-components/JobModal';

import { Avatar } from 'antd';
import { useJobStore } from '../../stores';

const JobItem = (props) => {
  const {
    kinds,
    problemName,
    agentRoleHeaderImg,
    agentRoleName,
    status,
    reporterRoleId,
    reporterRoleHeaderImg,
    reporterRoleName
  } = props;

  const [visible, setModalVisible] = useState(false);

  const {
    mainStore, projectId,
  } = useJobStore();

  const {
    loadSprintData,
  } = mainStore;

  const renderStatus = () => {
    const { status: jobStatus, statusText, } = renderStatusType(status);
    return <StatusTag text={statusText} size={12} status={jobStatus} />
  }

  function jobEditCallBack() {
    loadSprintData(projectId);
    setModalVisible(false);
  }

  return (
    <Fragment>
      <div className="gradu-sprint-lists-item"
        onClick={() => setModalVisible(true)}
      >

        <div className="gradu-sprint-lists-item-left">
          <JobTypeIcon type={kinds === 1 ? 'job' : 'bug'} />
          <span>{problemName}</span>
        </div>

        <div className="gradu-sprint-lists-item-right">
          <div className="gradu-sprint-lists-item-right-user">
            {reporterRoleName ?
              reporterRoleHeaderImg ? <Avatar size="small" src={reporterRoleHeaderImg} /> :
                <Avatar size="small" className="gradu-avatar">{reporterRoleName.split('')[0]}</Avatar>
              : null
            }
            <span>{reporterRoleName}</span>
          </div>
          {renderStatus()}
        </div>

      </div>
      <JobMdal
        visible={visible}
        onClose={() => setModalVisible(false)}
        listprops={props}
        projectId={projectId}
        callBack={jobEditCallBack}
      />
    </Fragment>
  )
}

export default JobItem;