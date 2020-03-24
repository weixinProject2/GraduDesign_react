import React from 'react';
import { message } from 'antd'
import { useLocalStore } from 'mobx-react-lite';
import { getYourDeptStaff, deleteDeptStaff } from '../../../api';

export default function useStore() {
    // const { workNumber } = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));
    return useLocalStore(() => ({
        params: {
            workNumber: localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).workNumber, // 从localstorage里面拿的
            page: 1,
            size: 10,
            queryFiled: {
                userName: '',
                workNumber: '',
                positionId: '',
                professionalId: '',
            },
        },
        setQueryFiled(value) {
            this.params.queryFiled.userName = value && value.userName ? value.userName : '';
            this.params.queryFiled.workNumber = value && value.workNumber ? value.workNumber : '';
            this.params.queryFiled.positionId = value && value.positionId ? value.positionId : '';
            this.params.queryFiled.professionalId = value && value.professionalId ? value.professionalId : '';
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
        // 加载数据函数，用来处理各种状态，把他提到这层就是为了让很多组建都能用这个函数，从而操控顶层状态数据
        loadInfo() {
            this.setTableLoading(true);
            this.setBtnDisabled(true);
            getYourDeptStaff(this.params).then((res) => {
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
        btnDisabled: true,
        setBtnDisabled(value) {
            this.btnDisabled = value;
        },
        get getBtnDisabled() {
            return this.btnDisabled;
        }
    }))
}