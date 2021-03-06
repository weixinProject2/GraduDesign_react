import React from 'react';
import { message } from 'antd'
import { useLocalStore } from 'mobx-react-lite';
import { getAllProjects } from '../../../api';

export default function useStore() {
    return useLocalStore(() => ({
        params: {
            page: 1,
            size: 10,
            bToDepartmentID: '',
            projectName: '',
        },
        setQueryFileds(value) {
            this.params.bToDepartmentID = value && value.bToDepartmentID ? value.bToDepartmentID : '';
            this.params.projectName = value && value.projectName ? value.projectName : '';
        },
        get getCurrentPage() {
            return this.params.page;
        },
        setCurrentPage(pageNumber) {
            this.params.page = pageNumber;
        },
        // tableLoading
        tableLoading: false,
        get getTableLoading() {
            return this.tableLoading;
        },
        setTableLoading(value) {
            this.tableLoading = value;
        },
        // 加载数据
        loadInfo() {
            this.setTableLoading(true);
            this.setBtnDisabled(true);
            getAllProjects(this.params).then((res) => {
                if (!res.error) {
                    this.setTableLoading(false);
                    this.setTableData(res.data);
                    this.setTotalPage(res.total);
                    this.setBtnDisabled(false);
                } else {
                    message.error(res.mess);
                }
            })
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
        btnDisabled: true,
        setBtnDisabled(value) {
            this.btnDisabled = value;
        },
        get getBtnDisabled() {
            return this.btnDisabled;
        },
        addModalVisble: false,
        get getAddModalVisble() {
            return this.addModalVisble;
        },
        setAddModalVisble(value) {
            this.addModalVisble = value;
        },
        // 分配项目的框
        distributeVisible: false,
        setDistributeVisible(value) {
            this.distributeVisible = value;
        },
        get getDistributeModalVisible() {
            return this.distributeVisible;
        },
        projectId: '',
        setProjectId(value) {
            this.projectId = value;
        },
        get getProjectId() {
            return this.projectId
        }
    }));
}
