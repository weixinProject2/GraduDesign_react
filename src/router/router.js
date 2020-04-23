import React, { Fragment, useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Icon, Menu, Spin } from 'antd'
import { MyContext } from '../stores/index'

import history from '../utils/history';
import Avater from '../components/avater/index';
import Bell from '../components/userMessage/Bell';
import Home from './Home';
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
import DeptProjectsManage from '../components/deptProjectsManage';
import JobLists from '../components/jobLists';

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
        getMenuData,
        loadMenu,
    } = stores;

    useEffect(() => {
        loadMenu();
        loadUserInfo();
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

    function renderSelectedKey() {
        const {
            location
        } = history;
        const keyUrl = location && location.pathname;
        const key = keyUrl.split('/')[2];
        if (key === undefined) {
            return '';
        } else {
            const arr = [].concat(key);
            return arr;
        }

    }

    const renderMenu = () => (
        <Menu
            mode="inline"
            inlineCollapsed={collapse}
            defaultSelectedKeys={renderSelectedKey()}
        >
            {
                getMenuData && getMenuData.map((item, i) => {
                    const { menu_key, menu_icon, menu_path, menu_text } = item;
                    return (
                        <Menu.Item key={menu_key}>
                            <NavLink to={`${menu_path}?projectId=${getProjectId}`} onClick={() => setPath(menu_path)}>
                                <Icon type={menu_icon} />
                                <span style={{ width: '185px', display: 'inline-block' }}>{menu_text}</span>
                            </NavLink>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    )

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
                        {renderMenu()}
                    </div>

                    <div className="gradu-container">
                        <Route path='/main' component={Home} exact />
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
                        <Route path='/main/fileManage' component={AdminFile} />
                        <Route path='/main/deptProjectsManage' component={DeptProjectsManage} />
                        <Route path='/main/taskLists' component={JobLists} />
                    </div>
                </main>
            </Spin>
        </Fragment >
    )
})