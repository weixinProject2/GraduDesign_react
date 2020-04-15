import React, { useEffect, Fragment } from 'react';
import { Descriptions, Divider, Spin, Modal, } from 'antd';
import { observer } from 'mobx-react-lite';
import { useDeptProjectsStore } from '../../stores';
import './index.less';


export default observer(() => {
  const {
    projectId,
    mainStore,
  } = useDeptProjectsStore();

  const {
    loadProjectInfo, contentLoading, dataSource,
  } = mainStore;

  useEffect(() => {
    loadProjectInfo(projectId);
  }, [projectId]);

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
                {dataSource.isOpen === '1' ? '已开启' : '未开启'}
              </Descriptions.Item>
              <Descriptions.Item label="项目进度">
                <div>
                  {`${dataSource.schedultion}%`}
                  <span
                    className="gradu-project-detail-schedultion"
                  >
                    设置项目进度
                </span>
                </div>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions layout='horizontal' column={2} title="迭代详情">
              <Descriptions.Item label="当前项目迭代数目">12</Descriptions.Item>
              <Descriptions.Item label="当前迭代阶段">Sprint1.1</Descriptions.Item>
            </Descriptions>
          </Spin>
        }
      </div>
      {/* <Modal>

      </Modal> */}
    </Fragment>
  )
})