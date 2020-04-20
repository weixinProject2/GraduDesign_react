import React, { Fragment, useEffect, useState } from 'react';
import { Select, message, Spin, Avatar } from 'antd';
import { observer } from 'mobx-react-lite';
import { getAllSprintSelect } from '../../api'

const { Option } = Select;

export default observer((props) => {
  const [allSprint, setAll] = useState([]);

  const [loading, setLoading] = useState(false);

  const { projectId, width } = props

  // 渲染所有选项
  function renderAllSprint() {
    return allSprint && allSprint.length > 0 && allSprint.map((value, key) => {
      const { sprintId, sprintName } = value;
      return <Option value={sprintId} key={key}>
        {sprintName}
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
    loadProfs();
  }, [projectId])

  return (
    <Fragment>
      <Select
        placeholder="选择冲刺"
        style={{ width: width || 180 }}
        allowClear
        showSearch
        loading={loading}
        onDropdownVisibleChange={loadProfs}
        filterOption={(input, option) =>
          option.props.children.indexOf(input) >= 0
        }
        {...props}
      >
        {renderAllSprint()}
      </Select>
    </Fragment>
  )
})