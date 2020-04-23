import React, { Fragment, useEffect, useState } from 'react';
import { Select, message, Spin, Avatar } from 'antd';
import { observer } from 'mobx-react-lite';
import { getProjectMembers } from '../../api'

const { Option } = Select;

export default observer((props) => {
  const [allMember, setAllMember] = useState([]);

  const [loading, setLoading] = useState(false);

  const { projectId } = props;

  // 渲染所有选项
  function renderAllMember() {
    return allMember && allMember.length > 0 && allMember.map((value, key) => {
      const { headerImg, workNumber, userName } = value;
      return <Option value={workNumber} key={key}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {
            headerImg ? <Avatar src={headerImg} size="small" /> : <Avatar size="small" className="gradu-avatar">
              {userName.split('')[0]}
            </Avatar>
          }
          <span style={{ marginLeft: '10px' }}>{userName}</span>
        </div>
      </Option>
    })
  }

  function loadProfs() {
    setLoading(true);
    const obj = {
      projectId,
      size: 20,
    }
    getProjectMembers(obj).then(async (res) => {
      if (!res.error) {
        setLoading(false);
        setAllMember(res.list);
      } else {
        message.error(res.message);
      }
    })
  }

  useEffect(() => {
    loadProfs();
  }, [])

  return (
    <Fragment>
      {
        <Select
          placeholder="选择成员"
          // style={{ width: 180 }}
          allowClear
          showSearch
          loading={loading}
          filterOption={(input, option) =>
            option.props.children.indexOf(input) >= 0
          }
          {...props}
        >
          {renderAllMember()}
        </Select>
      }
    </Fragment>
  )
})