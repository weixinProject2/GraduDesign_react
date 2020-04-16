import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './index.less';
import { Icon, Collapse, Avatar, Tooltip } from 'antd';
import StatusTag from '../../../../tool-components/StatusTag';


const { Panel } = Collapse;

const SprintItem = () => {
  const [expand, setEpand] = useState(true);

  return (
    <Fragment>
      <div className="gradu-sprint-item">
        <Icon
          type={expand ? "caret-down" : "caret-right"}
          className="sprint-item-btn"
          onClick={() => setEpand(!expand)}
        />
        <section>
          <header>
            <span>Sprint1.1</span>
            <StatusTag text="进行中" status="pending" size={10}/>
            <span className="sprint-btn sprint-end">结束冲刺</span>
            {/* <span className="sprint-btn sprint-begin">开始冲刺</span> */}
          </header>
          <main>

            <div className="gradu-sprint-item-avater">
              <Avatar size='small' className="gradu-avatar">U</Avatar>
              <Avatar size='small' className="gradu-avatar">a</Avatar>
              <Avatar size="small" className="gradu-avatar">b</Avatar>
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

      <div className="gradu-sprint-lists" style={{ display: expand ? 'block' : 'none' }}>
        <div className="gradu-sprint-lists-item">

          <div className="gradu-sprint-lists-item-left">
            <Icon type="bug" theme="filled" />
            <span>流水线页面构建</span>
          </div>

          <div className="gradu-sprint-lists-item-right">
            <div className="gradu-sprint-lists-item-right-user">
              <Avatar size="small" className="gradu-avatar">U</Avatar>
              <span>张硕</span>
            </div>
            <StatusTag text="待处理" size={12} status="create" />
          </div>

        </div>

        <div className="gradu-sprint-lists-item">

          <div className="gradu-sprint-lists-item-left">
            <Icon type="check" />
            <span>创建流水线模块构建</span>
          </div>

          <div className="gradu-sprint-lists-item-right">
            <div className="gradu-sprint-lists-item-right-user">
              <Avatar size="small" className="gradu-avatar">U</Avatar>
              <span>张硕</span>
            </div>
            <StatusTag text="开发中" size={12} status="pending" />
          </div>

        </div>

        <div className="gradu-sprint-lists-item">

          <div className="gradu-sprint-lists-item-left">
            <Icon type="check" />
            <span>部署构建</span>
          </div>

          <div className="gradu-sprint-lists-item-right">
            <div className="gradu-sprint-lists-item-right-user">
              <Avatar size="small" className="gradu-avatar">翁</Avatar>
              <span>翁恺敏</span>
            </div>
            <StatusTag text="已完成" size={12} status="success" />
          </div>

        </div>
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