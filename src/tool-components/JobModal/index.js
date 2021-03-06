import React, { useEffect } from 'react';
import { Drawer, Form, Button, Input, Col, Row, InputNumber, message, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import AllJobTypeSelect from '../AlljobTypeSelect';
import AllJobStatusSelect from '../AllJobStatusSelect';
import AllprojectMemberSelect from '../AllprojectMemberSelect';
import "./index.less"
import AllSprintSelect from '../AllSprintSelect';
import { changeProblemDetail, newProblem, deleteProblem } from '../../api';
import { parseStatusCode } from '../../Constants';

const { TextArea } = Input;



const itemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16
  },
};

const JobModal = observer((props) => {
  const { form, onClose, listprops, projectId, callBack, defaultSprintId } = props;

  const { getFieldDecorator } = form;

  function handleProblemSubmit(params) {
    return listprops ? changeProblemDetail(params) : newProblem(params);
  }

  const {
    problemName,
    agentRoleId,
    reporterRoleId,
    kinds,
    status,
    statusNum,
    problemDesc,
    sprintId,
    remainTime,
    problemId,
    updateTime,
  } = listprops || {};

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        values.projectId = projectId;
        if (typeof values.status !== 'number') {
          values.status = parseStatusCode(values.status);
        }
        if (listprops) {
          values.problemId = problemId;
        }
        handleProblemSubmit(values).then((res) => {
          if (!res.error) {
            callBack && callBack();
            message.success(res.message);
          } else {
            message.error(res.message);
          }
        })
      }
    })
  }

  function handleDeleteProblem() {
    deleteProblem({ problemId }).then((res) => {
      if (!res.error) {
        callBack();
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    })
  }

  function openDeleteModal() {
    Modal.confirm({
      title: '确认删除此任务？',
      content: '删除之后将清楚所有数据',
      okText: '确认',
      okType: 'danger',
      zIndex: 9999,
      cancelText: '取消',
      onOk: handleDeleteProblem,
    })
  }

  function checkStatusType() {
    if (typeof status === 'string') {
      return parseStatusCode(status);
    }
    return status;
  }

  return (
    <Drawer
      {...props}
      destroyOnClose
      width={600}
      closable={false}
      title={listprops ? `编辑问题详情(最后更新时间:${updateTime})` : '创建新问题'}
    >
      <Form className={`sprint-problem-form ${listprops && 'sprint-problem-form-eidt'}`} labelAlign="left">
        <Row gutter={6}>
          <Col span={16}>
            <Form.Item
              label="问题名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
            >
              {getFieldDecorator('problemName', {
                rules: [{ required: true, message: '请输入问题名称' }],
                initialValue: problemName || ''
              })(
                <Input placeholder="输入问题名称" />,
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={6}>
          {
            listprops && <Col span={12}>
              <Form.Item
                label="报告人"
                {...itemLayout}
              >
                {getFieldDecorator('agentRoleId', {
                  rules: [{ required: true, message: '请选择报告人' }],
                  initialValue: agentRoleId,
                })(
                  <AllprojectMemberSelect
                    disabled
                    allowClear={false} projectId={projectId} />
                )}
              </Form.Item>
            </Col>
          }

          <Col span={12}>
            <Form.Item
              label="经办人"
              {...itemLayout}
            >
              {getFieldDecorator('reporterRoleId', {
                rules: [{ required: false }],
                initialValue: reporterRoleId,
              })(
                <AllprojectMemberSelect allowClear projectId={projectId} />
              )}
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={6}>
          <Col span={12}>
            <Form.Item
              label="问题类型"
              {...itemLayout}
            >
              {getFieldDecorator('kinds', {
                rules: [{ required: true, message: '请选择问题类型' }],
                initialValue: kinds || 1
              })(
                <AllJobTypeSelect allowClear={false} />
              )}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="问题状态"
              {...itemLayout}
            >
              {getFieldDecorator('status', {
                rules: [{ required: true, message: '请选择状态' }],
                initialValue: checkStatusType() || 1
              })(
                <AllJobStatusSelect allowClear={false} />
              )}
            </Form.Item>
          </Col>
        </Row>


        <Row gutter={8}>
          <Col
            span={12}
          >
            <Form.Item
              label="预估时间"
              {...itemLayout}
            >
              {getFieldDecorator('remainTime', {
                rules: [{ required: false }],
                initialValue: remainTime || 0
              })(
                <InputNumber placeholder="预估时间" min={0} />
              )}
            </Form.Item>
          </Col>
          <Col
            span={12}
          >
            <Form.Item
              label="选择冲刺"
              {...itemLayout}
            >
              {getFieldDecorator('sprintId', {
                rules: [{ required: false }],
                initialValue: sprintId || defaultSprintId,
              })(
                <AllSprintSelect
                  disabled={defaultSprintId}
                  allowClear projectId={projectId} />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="问题描述"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
        >
          {getFieldDecorator('problemDesc', {
            rules: [{ required: true, message: '请输入问题描述' }],
            initialValue: problemDesc || ''
          })(
            <TextArea placeholder="输入问题描述" />,
          )}
        </Form.Item>

      </Form>

      <div className="gradu-drawer-footer">
        <Button onClick={handleSubmit} type="primary">
          {listprops ? '保存' : '创建'}
        </Button>
        {
          listprops && <Button
            style={{
              marginLeft: 8,
            }}
            type="danger"
            onClick={openDeleteModal}
          >
            删除
        </Button>
        }
        <Button
          style={{
            marginLeft: 8,
          }}
          onClick={onClose}
        >
          取消
        </Button>
      </div>
    </Drawer >
  )
})

const FileCreateForm = Form.create({ name: 'form_in_modal_addFolder' })(JobModal);

export default FileCreateForm;