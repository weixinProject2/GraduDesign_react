import React, { Fragment, useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// import ProtectedRoute from '../components/ProtectedRoute'
import { MyContext } from '../stores/index'
import { observer, Observer } from 'mobx-react-lite';
import { Button, Popover, Icon, Menu } from 'antd'

import Avater from '../components/avater/index';

import UserInfoContent from '../components/userInfo/index'


const SubMenu = Menu.SubMenu;

export default observer(() => {
    const store = useContext(MyContext);

    let [collapse, setCollapse] = useState(false);

    useEffect(() => {

    }, [])

    function toggleMenu() {
        let tempCollapse = collapse;
        setCollapse(!tempCollapse);
    }
    return (
        <Fragment>
            <header className='gradu-header'>
                <div className="gradu-header-left">
                    <Button shape="circle" icon="menu" type='primary' onClick={toggleMenu} />Gradu <Icon type='deployment-unit' />&nbsp;员工系统
                </div>
                <div className="gradu-header-right">
                    <Avater />
                </div>
            </header>
            <main>
                <div className="gradu-side-menu">
                    <Menu
                        mode="inline"
                        inlineCollapsed={collapse}
                    // inlineCollapsed={this.state.collapsed}
                    // openKeys={this.state.openKeys}
                    // onOpenChange={this.onOpenChange}
                    // selectedKeys={[this.state.curentKey]}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="user" /><span>用户管理</span></span>}>
                            <Menu.Item key="searchUser"><NavLink to='/user/searchUser'><Icon type="database" />用户数据管理</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="user" /><span>部门管理</span></span>}>
                            <Menu.Item key="manageDep"><NavLink to='/user/manageDep'><Icon type='project_program' />部门数据管理</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="user" /><span>职位管理</span></span>}>
                            <Menu.Item key="managePos"><NavLink to='/user/managePos'><Icon type='sync_records' />职位数据管理</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="user" /><span>员工管理</span></span>}>
                            <Menu.Item key="manageStaff"><NavLink to='/user/manageStaff'><Icon type="contacts" />员工数据管理</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5" title={<span><Icon type="user" /><span>公告管理</span></span>}>
                            <Menu.Item key="manageMsg"><NavLink to='/user/manageMsg'><Icon type="rate_review1" />公告数据管理</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub6" title={<span><Icon type="user" /><span>文档管理</span></span>}>
                            <Menu.Item key="manageTxt"><NavLink to='/user/manageTxt'><Icon type="record_test" />文档数据管理</NavLink></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>

                <div className="gradu-container">
                    <Route path='/main/userInfo' component={UserInfoContent}/>
                    {/* <Route path='/management' component={UserInfoContent}/> */}
                </div>
            </main>
        </Fragment>
    )
})