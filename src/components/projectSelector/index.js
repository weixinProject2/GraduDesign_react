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
    const { location } = history;

    const [expand, setExpand] = useState(false);
    const [hasProjects, setHasPorjects] = useState(false);
    const [selectProject, setSelectProject] = useState("");

    const { setProjectId, getPath } = useContext(MyContext);

    

    useEffect(() => {
        document.getElementById('ProjectSelectorText').onblur = function () {
            const ulDom = document.getElementById('ProjectLists');
            ulDom.style.maxHeight = "0";
            ulDom.style.top = "93%"
            setExpand(false);
        }
        if (dataSource.length > 0) {
            setHasPorjects(true);
            setSelectProject(dataSource[0].projectName);
            setProjectId(dataSource[0].projectId);
            // history.push(`${getPath}?projectId=${dataSource[0].projectId}`);
        } else {
            setSelectProject("暂无任何项目");
            setProjectId(null);
            setHasPorjects(false);
            // history.push(`${getPath}?projectId=null`);
        }

    }, [])

    function changeProject(item, e) {
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
        history.push(`${getPath}?projectId=${dataSource[0].projectId}`);
    }

    const renderLists = () => {
        return (
            <ul id="ProjectLists">
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

    function handleExpand(e) {
        const ulDom = document.getElementById('ProjectLists');
        if (!expand) {
            ulDom.style.maxHeight = '400px';
            ulDom.style.top = "100%"
            setExpand(true);
        } else {
            ulDom.style.maxHeight = "0";
            ulDom.style.top = "93%"
            setExpand(false);
        }
    }

    function renderIcon() {
        if (!loading) {
            if (hasProjects) {
                return <Icon type="down" />
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
                id="ProjectSelectorText"
                tabIndex="1"
                hidefocus="true"
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