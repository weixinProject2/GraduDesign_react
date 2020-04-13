import React, { useState, Fragment, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tree, Icon, Input, Spin } from 'antd';
import { useFileStore } from '../../stores';

const { TreeNode, DirectoryTree } = Tree;
const { Search } = Input;


const sideTree = observer(() => {
    const {
        mainStore: {
            getSideTreeData,
            getTreeLoading,
            setExpandTreeNodes,
            getSelectedTreeNode,
            setSelectedTreeNode,
        },
    } = useFileStore();


    function handleExpand(e, { expanded }) {
        setExpandTreeNodes(e);
    }

    function handleSelect(seletedKey, e) {
        setSelectedTreeNode(seletedKey[0]);
    }

    function renderTreeNodes(data) {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode
                        icon={<Icon type="folder" />}
                        title={item.folderName}
                        key={item.folderId}
                        dataRef={item}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode
                key={item.folderId}
                title={item.folderName}
                {...item}
                icon={<Icon type="folder" />}
            />;
        });
    }

    function onSearch(e) {
        const { value } = e.target;
        console.log(value);
    }

    return (
        <Spin spinning={getTreeLoading}>
            {
                getSideTreeData && getSideTreeData.length > 0 && <Fragment>
                    {/* <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onSearch} /> */}
                    <Tree
                        onSelect={handleSelect}
                        // showLine
                        onExpand={handleExpand}
                        showIcon={true}
                        switcherIcon={<Icon type='down' />}
                        defaultExpandAll
                        selectedKeys={[getSelectedTreeNode]}
                    >
                        {renderTreeNodes(getSideTreeData)}
                    </Tree >
                </Fragment>
            }
        </Spin>
    )
})

export default sideTree;