import React, { Fragment, useContext, useEffect } from 'react';
import { Form, Input, Icon, Button } from 'antd'
// import { MyContext } from '../../stores/index';

const FormItem = Form.Item;

function Login({ form, history}) {
    const { getFieldDecorator } = form;

    useEffect(() => {

    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            let subValue = values;
            subValue.userName= '翁恺敏'
            if (!err) {
                localStorage.setItem('userInfo', JSON.stringify(subValue));
                history.push('/')
            }
        })
    }

    return (
        <Fragment>
            <div className="gradu-login-content">
                <div className="gradu-login-logo">
                    <h1>Gradu 员工系统</h1>
                    <h2>登陆</h2>
                </div>
                <Form className="gradu-login-form" onSubmit={handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '工号不能为空!' }],
                            // initialValue: this.state.loginname,
                        })(
                            <Input label='工号' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="工号" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                            // initialValue: this.state.password,
                        })(
                            <Input label='密码' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <div className='gradu-login-opts'>
                        <Button type="primary" htmlType="submit" >
                            登陆
                        </Button>
                        {/* loading={this.state.isLogin} onClick={this.enterLoading} */}
                    </div>
                </Form>
            </div>
        </Fragment>
    )
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;