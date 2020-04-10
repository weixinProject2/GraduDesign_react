import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { getAllAdminFile, getFolderTree } from '../../../api';
import { message } from 'antd';

export default function useStore() {
    return useLocalStore(() => ({
        params: {
            size: 10,
            page: 1,
            kinds: null,
            filename: null,
            isPublic: null,
            endTime: null,
            startTime: null,
        },

        sideTreeData: [],
        get getSideTreeData() {
            return this.sideTreeData.slice();
        },
        setSideTree(value) {
            this.sideTreeData = value;
        },

        treeLoading: false,
        setTreeLoading(value) {
            this.treeLoading = value;
        },
        get getTreeLoading() {
            return this.treeLoading;
        },

        loadTreeData() {
            this.setTreeLoading(true);
            getFolderTree().then((res) => {
                if (!res.error) {
                    this.setSideTree(res.tree);
                    this.setTreeLoading(false);
                }
            })
        },

        setQueryFileds(value) {
            this.params.isPublic = value && value.isPublic ? value.isPublic : null;
            this.params.kinds = value && value.kinds ? value.kinds : null;
            this.params.filename = value && value.filename ? value.filename : null;
            this.params.endTime = value && value.endTime ? value.endTime : null;
            this.params.startTime = value && value.startTime ? value.startTime : null;
        },

        get getCurrentPage() {
            return this.params.page;
        },
        setCurrentPage(pageNumber) {
            this.params.page = pageNumber;
        },

        // 所有数据量
        totalPage: 0,
        get getTotalPage() {
            return this.totalPage;
        },
        setTotalPage(value) {
            this.totalPage = value;
        },

        // 每一页的数据
        tableData: [],
        get getTableData() {
            return this.tableData.slice();
        },
        setTableData(value) {
            this.tableData = value;
        },

        btnDisabled: true,
        setBtnDisabled(value) {
            this.btnDisabled = value;
        },
        get getBtnDisabled() {
            return this.btnDisabled;
        },

        // 加载数据
        loadInfo() {
            this.setLoading(true);
            this.setBtnDisabled(true);
            getAllAdminFile(this.params).then((res) => {
                if (!res.error) {
                    this.setLoading(false);
                    this.setTableData(res.list);
                    this.setTotalPage(res.total);
                    this.setBtnDisabled(false);
                } else {
                    message.error(res.mess);
                }
            })
        },

        loading: true,
        setLoading(value) {
            this.loading = value;
        },
        get getLoading() {
            return this.loading;
        },

        addModalStatus: false,
        setAddModalStatus(value) {
            this.addModalStatus = value;
        },
        get getAddModalStatus() {
            return this.addModalStatus;
        },

        addModalBtnLoading: false,
        addModalDisabled: true,
        setOkBtnLoading(value) {
            this.addModalBtnLoading = value;
        },
        get getOkBtnLoading() {
            return this.addModalBtnLoading;
        },
        setOkBtnDisabled(value) {
            this.addModalDisabled = value;
        },
        get getOkBtnDisabled() {
            return this.addModalDisabled;
        }
    }))
}