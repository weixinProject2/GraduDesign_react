import React from 'react';
import { Select } from 'antd';
import JobTypeIcon from '../jobTypeIcon';

const { Option } = Select;

const arr = [
  {
    text: '缺陷',
    value: 2,
    type: 'bug',
  },
  {
    text: '任务',
    value: 1,
    type: 'job',
  }
];

const JobTypeSelect = (props) => {

  const renderOpts = () => (
    arr.map((item, key) => {
      return <Option value={item.value} key={key}>
        <JobTypeIcon size={9} type={item.type} />{item.text}
      </Option>
    })
  )

  return <Select
    placeholder="问题类型"
    style={{ width: 180 }}
    allowClear
    showSearch
    filterOption={(input, option) =>
      option.props.children.indexOf(input) >= 0
    }
    {...props}
  >
    {renderOpts()}
  </Select>
}

export default JobTypeSelect;