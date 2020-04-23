import React, { Fragment, useEffect, useState } from 'react';
import { Select, message, } from 'antd';
import { observer } from 'mobx-react-lite';
import { getAllSprintSelect } from '../../api'
import StatusTag from '../StatusTag';
import { getSprintStatus } from '../../Constants';

const { Option } = Select;

export default observer((props) => {
  const [allSprint, setAll] = useState([]);

  const [loading, setLoading] = useState(false);

  const { projectId, width, nodropLoad } = props

  // 渲染所有选项
  function renderAllSprint() {
    return allSprint && allSprint.length > 0 && allSprint.map((value, key) => {
      const { sprintId, sprintName, status, } = value;
      const { status: sprintStatus, statusText } = getSprintStatus(status);
      return <Option value={sprintId} key={key}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StatusTag status={sprintStatus} dotted text={statusText} />
          <span >{sprintName}</span>
        </div>
      </Option>
    })
  }

  function loadProfs() {
    setLoading(true);
    const obj = {
      projectId,
    }
    getAllSprintSelect(obj).then(async (res) => {
      if (!res.error) {
        setLoading(false);
        setAll(res.list);
      } else {
        message.error(res.message);
      }
    })
  }

  useEffect(() => {
    projectId && loadProfs();
  }, [projectId])


  return (
    <Fragment>
      {allSprint && <Select
        placeholder="选择冲刺"
        style={{ width: width || 180 }}
        allowClear
        showSearch
        loading={loading}
        onDropdownVisibleChange={!nodropLoad && loadProfs}
        filterOption={(input, option) =>
          option.props.children.indexOf(input) >= 0
        }
        {...props}
      >
        {renderAllSprint()}
      </Select>
      }
    </Fragment>
  )
})