import React, { createContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';


export const MyDeptsContext = createContext(null);

export const DeptsStore = observer((props) => {
  const TableAttrStore = useLocalStore(() => ({
    // 总页码数量，每次请求都要重新加载一遍
    totalPage: 0,
    get getAllPage() {
      return this.totalPage
    },
    setTotalPage(pageSize) {
      this.totalPage = pageSize;
    },

    // 请求的参数
    searchParams: {
      size: 10,
      page: 1,
      queryparams: {
        departmentName: null,
        departmentId: null,
        departmentMangerName: null,
      }
    },
    get getSearchParams() {
      return this.searchParams;
    },
    setSearchParams(value) {
      const { size, page, queryparams } = value;
      this.searchParams.size = size;
      this.searchParams.page = page;
      this.searchParams.queryparams = queryparams;
    },
    setQueryParams(value) {
      this.searchParams.queryparams.departmentId = value.departmentId ? value.departmentId : null;
      this.searchParams.queryparams.departmentName = value.departmentName ? value.departmentName : null;
      this.searchParams.queryparams.departmentMangerName = value.departmentMangerName ? value.departmentMangerName : null;
    },
    setCurrentPage(value) {
      this.searchParams.page = value;
    },

    // tableloading
    tableLoading: true,
    get getTableLoading() {
      return this.tableLoading;
    },
    setTableLoading(value) {
      this.tableLoading = value;
    },

    // table的数据
    tableData: [],
    get getTableData() {
      return this.tableData;
    },
    setTableData(value) {
      this.tableData = value;
    },

    // btns 状态
    btnDisabled: true,
    setBtnDisabled(value) {
      this.btnDisabled = value;
    },
    get getBtnDisabled() {
      return this.btnDisabled
    },

    // 新增部门弹框
    deptAddModalVisble: false,
    setDeptAddModalVisble(value) {
      this.deptAddModalVisble = value;
    },
    get getDeptAddModalVisble() {
      return this.deptAddModalVisble;
    },

    modifyFormVisible: false,
    get getModifyVisible() {
      return this.modifyFormVisible;
    },
    setModifyVisible(value) {
      this.modifyFormVisible = value;
    },

    modifyRecord: [],
    setModifyRecord(data) {
      this.modifyRecord = data;
    },
    get getModifyRecord() {
      return this.modifyRecord;
    }
  }));

  const value = {
    ...props,
    TableAttrStore,
  }
  return (
    <MyDeptsContext.Provider value={value}>
      {props.children}
    </MyDeptsContext.Provider>
  );
});