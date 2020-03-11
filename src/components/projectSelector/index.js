import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from 'antd';
import './index.less';
import { withRouter, NavLink } from 'react-router-dom';
import { MyContext } from '../../stores';
/**
 * dataSource: 项目数组
 * loading：是否在加载阶段
 */
export default observer(withRouter((props) => {
    const {
        dataSource,
        loading,
        location,
    } = props;
    const [expand, setExpand] = useState(false);
    const [selectProject, setSelectProject] = useState("");
    const { setProjectId } = useContext(MyContext);

    useEffect(() => {
        document.getElementById('ProjectSelectorText').onblur = function () {
            const ulDom = document.getElementById('ProjectLists');
            ulDom.style.maxHeight = "0";
            ulDom.style.top = "93%"
            setExpand(false);
        }
        setSelectProject(dataSource[0].name);
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
        setProjectId(item.id);
        setSelectProject(item.name);
    }

    const renderLists = () => {
        return (
            <ul id="ProjectLists">
                {dataSource.map((item, index) => (
                    <li
                        key={item.id}
                        onClick={changeProject.bind(this, item)}
                        className={index === 0 ? "active" : null}>
                        <NavLink to={`${location.pathname}?projectId=${item.id}`}>{item.name}</NavLink>
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
                {
                    !loading ? <Icon type="down" /> : <Icon type="loading" />
                }
            </div>
            {renderLists()}
        </div>
    )
}));