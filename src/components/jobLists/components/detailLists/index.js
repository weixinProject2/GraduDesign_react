import React from 'react';
import { observer } from 'mobx-react-lite';
import './index.less';
import { Icon } from 'antd';


const SprintItem = () => {
  return (
    <div className="gradu-sprint-item">
      <header>
        <Icon type="caret-right" />
        <span>Sprint1.1</span>
        <span>20个问题</span>
        <span>活跃中</span>
        <span>完成冲刺</span>
      </header>
      <main>
        
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default observer(() => {
  return (
    <div className="gradu-sprint">
      <SprintItem />
    </div>
  );
})