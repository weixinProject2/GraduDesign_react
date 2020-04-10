import React, { useState, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Tree, Icon, Input, Spin } from 'antd';
import { useFileStore } from '../../stores';

const { TreeNode, DirectoryTree } = Tree;
const { Search } = Input;


const sideTree = observer(() => {
    const {
        mainStore: {
            getSideTreeData, getTreeLoading,
        },
    } = useFileStore();


    function handleSelect(e) {
        console.log(e);
    }

    function renderTreeNodes(data) {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.folderName} key={item.folderId} dataRef={item}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.folderId} title={item.folderName} {...item} />;
        });
    }

    function onSearch(e) {
        const { value } = e.target;
        console.log(value);
    }

    return (
        <Spin spinning={getTreeLoading}>
            <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onSearch} />
            <DirectoryTree
                checkable={false}
                onSelect={handleSelect}
            // autoExpandParent={this.state.autoExpandParent}
            // selectedKeys={this.state.selectedKeys}
            >
                {renderTreeNodes(getSideTreeData)}
            </DirectoryTree >
        </Spin>
    )
})

export default sideTree;