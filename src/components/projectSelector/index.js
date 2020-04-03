import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from 'antd';
import './index.less';
import { withRouter, NavLink } from 'react-router-dom';
import { MyContext } from '../../stores';
import history from '../../utils/history';

/**
 * dataSource: 项目数组
 * loading：是否在加载阶段
 */
export default observer(withRouter((props) => {
    const {
        dataSource,
        loading,
    } = props;
    // const { location } = history;

    const [expand, setExpand] = useState(false);
    const [hasProjects, setHasPorjects] = useState(false);
    const [selectProject, setSelectProject] = useState("");

    const { setProjectId, getPath } = useContext(MyContext);

    useEffect(() => {
        if (dataSource.length > 0) {
            const search = history.location.search;
            if (search) {
                const checkSearch = dataSource.some((item) => item.projectId === search.split('=')[1]);
                const checkSearchItem = dataSource.filter((item) => item.projectId === search.split('=')[1]);
                if (checkSearch) {
                    setSelectProject(checkSearchItem[0].projectName);
                    setProjectId(search.split('=')[1]);
                    setProject(checkSearchItem[0].projectName);
                    history.push(`${getPath}?projectId=${search.split('=')[1]}`);
                } else {
                    setSelectProject(dataSource[0].projectName);
                    setProjectId(dataSource[0].projectId);
                    history.push(`${getPath}?projectId=${dataSource[0].projectId}`);
                }
            } else {
                history.push(`${getPath}?projectId=${dataSource[0].projectId}`);
                setSelectProject(dataSource[0].projectName);
                setProjectId(dataSource[0].projectId);
            }
            setHasPorjects(true);
        } else {
            setSelectProject("暂无任何项目");
            setProjectId(null);
            setHasPorjects(false);
            history.push(`${getPath}?projectId=null`);
        }

    }, []);

    function setProject(name) {
        const allLi = document.getElementById("ProjectLists") && document.getElementById("ProjectLists").childNodes;
        if (allLi) {
            allLi.forEach((liItem) => {
                const classVal = liItem.getAttribute("class");
                if (classVal === "active") {
                    liItem.setAttribute('class', '');
                }
                if (liItem.innerHTML === name) {
                    liItem.setAttribute('class', 'active');
                }
            })
        }
    }

    function changeProject(item, e) {
        e.stopPropagation();
        const dom = e.currentTarget;
        const allLi = dom.parentNode.childNodes;
        allLi.forEach((liItem) => {
            const classVal = liItem.getAttribute("class");
            if (classVal === "active") {
                liItem.setAttribute('class', '');
            }
        })
        dom.setAttribute("class", "active");
        setProjectId(item.projectId);
        setSelectProject(item.projectName);
        setExpand(false);
        history.push(`${getPath}?projectId=${item.projectId}`);
    }

    const renderLists = () => {
        return (
            <ul
                id="ProjectLists"
                style={{ maxHeight: expand ? '400px' : '0px', top: expand ? '100%' : '93%' }}
            >
                {dataSource.map((item, index) => (
                    <li
                        key={item.projectId}
                        onClick={changeProject.bind(this, item)}
                        className={index === 0 ? "active" : null}>
                        {item.projectName}
                    </li>
                ))}
            </ul>
        )
    }

    function handleExpand() {
        setExpand(!expand);
    }

    function renderIcon() {
        if (!loading) {
            if (hasProjects) {
                return <Icon type={!expand ? "down" : "up"} />
            }
        } else {
            return <Icon type="loading" />
        }
    }

    return (
        <div
            className="project-selector"
            style={{ pointerEvents: loading ? 'none' : null }}
        >
            <div
                className="project-selector-text"
                onClick={handleExpand}
            >
                <div className="project-selector-text-detail">
                    <span>项目</span>
                    <span>{selectProject}</span>
                </div>
                {renderIcon()}
            </div>
            {renderLists()}
        </div>
    )
}));