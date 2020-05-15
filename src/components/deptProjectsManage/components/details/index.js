import React, { useEffect, Fragment, useState } from 'react';
import { Descriptions, Divider, Spin, Button, Drawer, Progress, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useDeptProjectsStore } from '../../stores';
import { setProjectStep } from '../../../../api';

import './index.less';

const ButtonGroup = Button.Group;


export default observer(() => {
  const {
    projectId,
    mainStore,
  } = useDeptProjectsStore();

  const {
    loadProjectInfo, contentLoading, dataSource,
  } = mainStore;

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    loadProjectInfo(projectId);
  }, [projectId]);

  function handleStepSave() {
    const obj = {
      projectId,
      schedultion: percent,
    };
    setProjectStep(obj).then((res) => {
      if (!res.error) {
        setDrawerVisible(false);
        setPercent(0);
        message.success(res.message);
        loadProjectInfo(projectId);
      } else {
        message.error(res.message);
      }
    })
  }

  function decline() {
    let percentTemp = percent - 10;
    if (percentTemp > 100) {
      percentTemp = 100;
    }
    setPercent(percentTemp);
  }
  function increase() {
    let percentTemp = percent + 10;
    if (percentTemp > 100) {
      percentTemp = 100;
    }
    setPercent(percentTemp);
  }
  return (
    <Fragment>
      <div style={{ padding: '0 10px' }} className="gradu-project-detail">
        {
          dataSource && <Spin spinning={contentLoading}>
            <Descriptions layout='horizontal' column={2}>
              <Descriptions.Item label="项目名称">{dataSource.projectName}</Descriptions.Item>
              <Descriptions.Item label="创建日期">{dataSource.createTime}</Descriptions.Item>
              <Descriptions.Item label="项目编号">{dataSource.projectId}</Descriptions.Item>
              <Descriptions.Item label="项目描述">{dataSource.describtion}</Descriptions.Item>
              <Descriptions.Item label="项目状态">
                {dataSource.isOpen ? '已开启' : '未开启'}
              </Descriptions.Item>
              <Descriptions.Item label="项目进度">
                <div>
                  {`${dataSource.schedultion}%`}
                  {
                    dataSource.isOpen ? <span
                      className="gradu-project-detail-schedultion"
                      onClick={() => { setDrawerVisible(true); setPercent(dataSource && dataSource.schedultion) }}
                    >
                      设置项目进度
                    </span> : null
                  }
                </div>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions layout='horizontal' column={2} title="迭代详情">
              <Descriptions.Item label="当前项目迭代数目">{dataSource.sprintCount}</Descriptions.Item>
              <Descriptions.Item label="当前迭代阶段">{dataSource.sprintOngoingName ? dataSource.sprintOngoingName : '暂无迭代'}</Descriptions.Item>
            </Descriptions>
          </Spin>
        }
      </div>
      <Drawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        title="设置项目进度"
        width={340}
        closable={false}
      >
        <Progress type="circle" percent={percent} />
        <ButtonGroup style={{ marginLeft: '20px' }}>
          <Button
            onClick={decline}
            icon="minus"
            disabled={!(percent > (dataSource && dataSource.schedultion))}
          />
          <Button onClick={increase} icon="plus" />
        </ButtonGroup>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button
            style={{
              marginRight: 8,
            }}
            onClick={() => setDrawerVisible(false)}
          >
            取消
          </Button>
          <Button onClick={handleStepSave} type="primary">
            保存进度
          </Button>
        </div>
      </Drawer>
    </Fragment>
  )
})