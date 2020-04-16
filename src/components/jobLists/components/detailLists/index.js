import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import './index.less';
import { Icon, Collapse, Avatar, Tooltip } from 'antd';

const { Panel } = Collapse;

const SprintItem = () => {
  return (
    <Fragment>
      <div className="gradu-sprint-item">
        <Icon type="caret-right" className="sprint-item-btn" />
        <section>
          <header>
            <span>Sprint1.1</span>
            <span>进行中</span>
            <span className="sprint-btn sprint-end">结束冲刺</span>
            {/* <span className="sprint-btn sprint-begin">开始冲刺</span> */}
          </header>
          <main>

            <div className="gradu-sprint-item-avater">
              <Avatar size='small' className="gradu-avatar">U</Avatar>
              <Avatar size='small'>a</Avatar>
              <Avatar size="small">b</Avatar>
            </div>

            <Icon type="more" />

            <div className="gradu-sprint-item-status">
              <Tooltip title={'代办问题数:10'}>
                <span className="not">10</span>
              </Tooltip>
              <Tooltip title={'进行中问题数:20'}>
                <span className="pending">20</span>
              </Tooltip>
              <Tooltip title={'已完成问题数:'}>
                <span className="finished">12</span>
              </Tooltip>

            </div>

          </main>

          <footer>
            <div className="gradu-sprint-item-createDate">
              2020年4月1日 ~ 2020年4月12日
          </div>
            <div className="gradu-sprint-item-describe">
              冲刺目标：完成项目部署
          </div>
          </footer>
        </section>
      </div>

      <div className="gradu-sprint-lists">
        
      </div>
    </Fragment>
  )
}

function handleChange() {

}

export default observer(() => {
  return (
    <div className="gradu-sprint">
      <SprintItem />
    </div>
  );
})