import React, { useEffect, Fragment } from 'react';

import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import TableHeader from '../../tool-components/TableHeader';


export default observer(() => {
  useEffect(() => {

  })

  const btnGroup = (
    <Fragment>
      <Button
        icon="file-add"
        ghost 
        type='primary'
      >新增文件</Button>
      <Button
        type="primary"
        icon="reload"
        ghost
      >刷新</Button>
    </Fragment>
  );

  return (
    <Fragment>
      <TableHeader headerButtons={btnGroup} />
      <div className="gradu-form-content">
        <h2>文件管理</h2>
        <div className="gradu-file">

        </div>
      </div>
    </Fragment>
  )
})