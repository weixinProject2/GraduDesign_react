import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { message } from 'antd';
import { getDeptProjectDetails, getProjectMembers } from '../../../api';

export default function useStore() {
    return useLocalStore(() => ({
        params: {
            page: 1,
            size: 10,
            userName: null,
            workNumber: null,
            professionalId: null,
        },
        // tabs
        activeKey: 'details',
        setActiveKey(value) {
            this.activeKey = value;
        },
        get getActiveKey() {
            return this.activeKey
        },

        // 项目对应操作 -----------------------------------------------
        dataSource: null,
        setDataSource(value) {
            this.dataSource = value;
        },
        contentLoading: false,
        setContentLoading(value) {
            this.contentLoading = value;
        },
        contentBtnDisbled: false,
        setContentBtnDisabled(value) {
            this.contentBtnDisbled = value;
        },
        loadProjectInfo(projectId) {
            this.setContentLoading(true);
            this.setContentBtnDisabled(true);
            getDeptProjectDetails({ projectId: projectId }).then((res) => {
                if (!res.error) {
                    this.setContentLoading(false);
                    this.setContentBtnDisabled(false);
                    this.setDataSource(res.data);
                } else {
                    message.error(res.message);
                    this.setContentLoading(true);
                    this.setContentBtnDisabled(true);
                }
            })
        },

        // table------------------------------------------------
        loadInfo(projectId) {
            this.setTableLoading(true);
            this.setBtnDisabled(true);
            this.params.projectId = projectId;
            getProjectMembers(this.params).then((res) => {
                if (!res.error) {
                    this.setTableLoading(false);
                    this.setTableData(res.list);
                    this.setTotalPage(res.total);
                    this.setBtnDisabled(false)
                } else {
                    message.error(res.mess);
                    this.setTableLoading(false);
                    this.setTableData(null);
                    this.setTotalPage(0);
                }
            });
        },

        setQueryFiled(value) {
            this.params.userName = value && value.userName ? value.userName : null;
            this.params.workNumber = value && value.workNumber ? value.workNumber : null;
            this.params.positionId = value && value.positionId ? value.positionId : null;
            this.params.professionalId = value && value.professionalId ? value.professionalId : null;
        },

        // 每一页的数据
        tableData: [],
        get getTableData() {
            return this.tableData;
        },
        setTableData(value) {
            this.tableData = value;
        },

        // 所有数据量
        totalPage: 0,
        get getTotalPage() {
            return this.totalPage;
        },
        setTotalPage(value) {
            this.totalPage = value;
        },
        // 选中的数据
        selectRows: [],
        get getSelectRows() {
            return this.selectRows.slice();
        },
        setSelectRows(value) {
            this.selectRows = value;
        },
        // 当前页码
        get getCurrentPage() {
            return this.params.page;
        },
        setCurrentPage(value) {
            this.params.page = value;
        },
        // tableLoading
        tableLoading: false,
        get getTableLoading() {
            return this.tableLoading;
        },
        setTableLoading(value) {
            this.tableLoading = value;
        },
        btnDisabled: false,
        setBtnDisabled(value) {
            this.btnDisabled = value;
        },
        get getBtnDisabled() {
            return this.btnDisabled;
        }


    }))
}