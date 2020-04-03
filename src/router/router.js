import React, { Fragment, useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// import ProtectedRoute from '../components/ProtectedRoute'
import { observer } from 'mobx-react-lite';
import { Button, Icon, Menu, Spin } from 'antd'

import { MyContext } from '../stores/index'

// import { getMenu } from '../api/index'

import history from '../utils/history';
import Avater from '../components/avater/index';
import Bell from '../components/userMessage/Bell';

import UserInfoContent from '../components/userInfo';
import ManageStaffForm from '../components/manageStaff';
import ManangeDeptsForm from '../components/manageDepts';
import Scrumboard from '../components/scrumboard';
import MangeDeptsStaff from '../components/manageDeptsStaff';
import ManagePosition from '../components/managePosition';
import ManageProf from '../components/manageProf';
import ProjectSelector from '../components/projectSelector';
import ManageProject from '../components/manageProject';
import Notice from '../components/notice';
import NoticeEditor from '../components/notice/noticeEditor';
import NoticeDetail from '../components/notice/noticeDetail';
import AdminFile from '../components/adminFileManage'
import FileManage from '../components/fileManage';

const SubMenu = Menu.SubMenu;

export default observer(() => {
    const stores = useContext(MyContext);
    const {
        getContentLoading,
        loadUserInfo,
        getProjectId,
        getUserinfo: { projectList },
        getSelectorLoading,
        getPath,
        setPath,
    } = stores;

    useEffect(() => {
        loadUserInfo();
        console.log(getPath);
    }, [])

    let [collapse, setCollapse] = useState(false);

    function toggleMenu() {
        let tempCollapse = collapse;
        setCollapse(!tempCollapse);
    }

    function linkToHome() {
        history.push(`/main?projectId=${getProjectId}`);
        setPath('/main')
    }


    return (
        <Fragment>
            <Spin spinning={getContentLoading} >
                <header className='gradu-header'>
                    <div className="gradu-header-left">
                        <Button shape="circle" icon="menu" type='primary' onClick={toggleMenu} />Gradu <Icon type='deployment-unit' />&nbsp;员工系统
                    </div>
                    <div className="gradu-header-middle">
                        <Button shape='circle' icon="home" type="primary" onClick={linkToHome} />
                    </div>
                    <div className="gradu-header-right">
                        <Bell />
                        <Avater />
                    </div>
                    <div className="gradu-header-project">
                        {
                            projectList && <ProjectSelector dataSource={projectList.slice()} loading={getSelectorLoading} />
                        }
                    </div>
                </header>
                <main id='mainContainer'>
                    <div className="gradu-side-menu">
                        <Menu
                            mode="inline"
                            inlineCollapsed={collapse}
                        // inlineCollapsed={this.state.collapsed}
                        // openKeys={this.state.openKeys}
                        // onOpenChange={this.onOpenChange}
                        // selectedKeys={[this.state.curentKey]}
                        >

                            <Menu.Item key="manageStaffs"><NavLink to='/main/manageStaffs' onClick={() => setPath('/main/manageStaffs')}><Icon type="team" /><span>公司员工管理</span></NavLink></Menu.Item>
                            <Menu.Item key="manageDepts"><NavLink to='/main/manageDepts'><Icon type="team" /><span>所有部门管理</span></NavLink></Menu.Item>
                            <Menu.Item key="managePos"><NavLink to='/main/managePos'><Icon type='solution' /><span>职位管理</span></NavLink></Menu.Item>
                            <Menu.Item key="manageProf"><NavLink to='/main/manageProf'><Icon type='solution' /><span>职业管理</span></NavLink></Menu.Item>
                            <Menu.Item key="manageProject"><NavLink to={`/main/manageProject?projectId=${getProjectId}`}><Icon type='solution' /><span>项目管理</span></NavLink></Menu.Item>
                            <Menu.Item key="deptsStaffManage"><NavLink to={`/main/deptsStaffManage?projectId=${getProjectId}`} onClick={() => setPath('/main/deptsStaffManage')}><Icon type="team" /><span>部门员工管理</span></NavLink></Menu.Item>
                            <Menu.Item key="taskPanel"><NavLink to='/main/taskLists'><Icon type='ordered-list' /><span>工作列表</span></NavLink></Menu.Item>
                            <Menu.Item key="scrumboard"><NavLink to='/main/scrumboard'><Icon type='snippets' /><span>迭代计划</span></NavLink></Menu.Item>
                            <Menu.Item key='notice'><NavLink to='/main/notice'><Icon type='solution' /><span>公告</span></NavLink></Menu.Item>
                            <Menu.Item key='adminFileManage'><NavLink to='/main/adminFileManage'><Icon type='solution' /><span>文件管理</span></NavLink></Menu.Item>
                            <Menu.Item key='fileManage'><NavLink to='/main/fileManage'><Icon type='solution' /><span>文件管理</span></NavLink></Menu.Item>
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
                        <Route path='/main/userInfo' component={UserInfoContent} />
                        <Route path='/main/manageStaffs' component={ManageStaffForm} />
                        <Route path='/main/manageDepts' component={ManangeDeptsForm} />
                        <Route path='/main/scrumboard' component={Scrumboard} />
                        <Route path='/main/deptsStaffManage' component={MangeDeptsStaff} />
                        <Route path='/main/managePos' component={ManagePosition} />
                        <Route path='/main/manageProf' component={ManageProf} />
                        <Route path='/main/manageProject' component={ManageProject} />
                        <Route path='/main/notice' component={Notice} exact />
                        <Route path='/main/notice/editor' component={NoticeEditor} />
                        <Route path='/main/notice/detail' component={NoticeDetail} />
                        <Route path='/main/adminFileManage' component={AdminFile} />
                        <Route path='/main/fileManage' component={FileManage} />
                    </div>
                </main>
            </Spin>
        </Fragment >
    )
})