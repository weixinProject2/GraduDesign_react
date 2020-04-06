import React, { useState, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Tree, Icon, Input } from 'antd';

const { TreeNode, DirectoryTree } = Tree;
const { Search } = Input;

const treeData = [
    {
        title: '公司公开文件',
        key: '0-0',
        children: [
            {
                title: '2020年1月',
                key: '0-0-3',
            },
            {
                title: '2019年2月',
                key: '0-0-0',
            },
            {
                title: '2019年1月',
                key: '0-0-1',
            },
            {
                title: '2018年12月',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '部门文件',
        key: '0-1',
        children: [
            { title: '2020年3月', key: '0-1-0-0' },
            { title: '2020年2月', key: '0-1-0-1' },
            { title: '2020年1月', key: '0-1-0-2' },
        ],
    },
    {
        title: '个人文件',
        key: '0-2',
    },
];

const sideTree = observer(() => {

    function handleSelect(e) {
        console.log(e);
    }

    function renderTreeNodes(data) {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });
    }

    function onSearch(e){
        const { value } = e.target;
        console.log(value);
    }

    return (
        <Fragment>
            <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onSearch} />
            <DirectoryTree
                checkable={false}
                onSelect={handleSelect}
            // autoExpandParent={this.state.autoExpandParent}
            // selectedKeys={this.state.selectedKeys}
            >
                {renderTreeNodes(treeData)}
            </DirectoryTree >
        </Fragment>
    )
})

export default sideTree;