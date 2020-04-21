import React from 'react';
import { observer } from 'mobx-react-lite';
import {Icon} from 'antd';
export default observer(() => {
  return <div className="home-page">
    <Icon type='deployment-unit' />
    <div className="page-title">欢迎使用Gradu系统</div>
  </div>
})