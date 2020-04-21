import React, { Fragment, useEffect, useState } from 'react';
import { Select, message, } from 'antd';
import { observer } from 'mobx-react-lite';
import StatusTag from '../../../../tool-components/StatusTag';
import { getSprintStatus } from '../../../../Constants';
import { useScrumStore } from '../../stores';
const { Option } = Select;

export default observer((props) => {
  const {
    mainStore, projectId,
  } = useScrumStore();

  const {
    getAllSprint, selectLoading, setSelectSprint, getSeletSprint,
  } = mainStore;


  // 渲染所有选项
  function renderAllSprint() {
    return getAllSprint && getAllSprint.map((value, key) => {
      const { sprintId, sprintName, status, } = value;
      const { status: sprintStatus, statusText } = getSprintStatus(status);
      return <Option value={sprintId} key={key}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StatusTag status={sprintStatus} dotted text={statusText} />
          <span style={{ marginLeft: '10px' }}>{sprintName}</span>
        </div>
      </Option>
    })
  }

  function onChange(e){
    setSelectSprint(e);
  }

  return (
    <Fragment>
      <Select
        placeholder="选择冲刺"
        value={getSeletSprint}
        style={{ width: 180 }}
        allowClear={false}
        onChange={onChange}
        showSearch
        loading={selectLoading}
      >
        {renderAllSprint()}
      </Select>
    </Fragment>
  )
})