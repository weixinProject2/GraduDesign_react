import React from 'react';
import { Select } from 'antd';
import StatusTag from '../../tool-components/StatusTag'
const { Option } = Select;

const arr = [
  {
    text: '待处理',
    status: 'create',
    value: 1,
  },
  {
    text: '开发中',
    status: 'pending',
    value: 2,
  },
  {
    text: '测试中',
    status: 'testing',
    value: 3,
  },
  {
    text: '需验收',
    status: 'success',
    value: 4,
  },
  {
    text: '已完成',
    status: 'default',
    value: 5,
  }
]

export default ((props) => {

  const renderOpts = () => (
    arr.map((item, key) => {
      return <Option value={item.value} key={key}>
        <StatusTag size={9} status={item.status} dotted />{item.text}
      </Option>
    })
  )

  return <Select
    placeholder="状态"
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
})