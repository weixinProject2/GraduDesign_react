import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { message } from 'antd';

const res = {
    "list": [
        {
            "userName": "翁恺敏",
            "permissions": 1,
            "workNumber": 100001,
            "position": "技术顾问",
            "professional": "前端工程师",
            "departmentId": 741101,
            "email": "765543432@qq.com",
            "telNumber": 2147483647,
            "sex": "男",
            "address": "北京市,市辖区,东城区",
            "entryTime": "2020年04月08日",
            "Id_Card": "430987666576789876",
            "departmentName": "能效中台",
            "positionId": 1200001,
            "professionalId": 10001
        },
        {
            "userName": "王尼玛",
            "permissions": 2,
            "workNumber": 100003,
            "position": "技术顾问",
            "professional": "前端工程师",
            "departmentId": 741101,
            "email": "765543432@qq.com",
            "telNumber": 2147483647,
            "sex": "男",
            "address": "北京市,市辖区,东城区",
            "entryTime": "2020年04月06日",
            "Id_Card": "430987666576789875",
            "departmentName": "能效中台",
            "positionId": 1200001,
            "professionalId": 10001
        }
    ],
    "page": 1,
    "size": 10,
    "totalPage": 1,
    "total": 2
}

export default function useStore() {
    return useLocalStore(() => ({
        params: {
            page: 1,
            size: 10,
            userName: '',
            workNumber: '',
            positionId: '',
            professionalId: '',
        },
        // tabs
        activeKey: 'details',
        setActiveKey(value) {
            this.activeKey = value;
        },
        get getActiveKey() {
            return this.activeKey
        },

        // table------------------------------------------------
        loadInfo() {
            this.setTableLoading(true);
            this.setBtnDisabled(true);
            if (!res.error) {
                setTimeout(() => {
                    this.setTableLoading(false);
                    this.setTableData(res.list);
                    this.setTotalPage(res.total);
                    this.setBtnDisabled(false)
                }, 500);
            }
            // getYourDeptStaff(this.params).then((res) => {
            //     if (!res.error) {
            //         this.setTableLoading(false);
            //         this.setTableData(res.list);
            //         this.setTotalPage(res.total);
            //         this.setBtnDisabled(false)
            //     } else {
            //         message.error(res.mess);
            //         this.setTableLoading(false);
            //         this.setTableData(null);
            //         this.setTotalPage(0);
            //     }
            // });
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
        btnDisabled: true,
        setBtnDisabled(value) {
            this.btnDisabled = value;
        },
        get getBtnDisabled() {
            return this.btnDisabled;
        }


    }))
}