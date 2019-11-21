import React, { createContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';


export const MyStaffContext = createContext(null);

export const StaffStore = observer((props) => {
  const TableAttrStore = useLocalStore(() => ({
    loading: false,   // 表格loading
    get getLoading() {
      return this.loading
    },
    setLoading(data) {
      this.loading = data;
    },

    deleteMoreBtnDisabled: true,
    setBtnDisabled(data) {
      this.deleteMoreBtnDisabled = data;
    },
    get getBtnDisabled() {
      return this.deleteMoreBtnDisabled
    },

    addBtnDisabled: true,
    setAddDisabled(data) {
      this.addBtnDisabled = data;
    },
    get getAddDisabled() {
      return this.addBtnDisabled
    },

    rowselection: [], // 选中的数据
    setRowSelection(data) {
      this.rowselection = data
    },
    get getRowSelection() {
      return this.rowselection.slice();
    },

    allStaffInfo: [],  //表格数据
    setStaffInfo(data) {
      this.allStaffInfo = data;
    },
    get getAllStaff() {
      return this.allStaffInfo.slice();
    },

    currentPage: 1, // 当前页码
    setPage(data) {
      this.currentPage = data
    },
    get getCurrentPage() {
      return this.currentPage
    },

    totalPages: 0, // 总共所有的页码数
    get getTotalPages() {
      return this.totalPages
    },
    setTotalPages(data) {
      this.totalPages = data
    },

    staffVisble: false,  // 增加员工的模态框显隐
    get getStaffVisble() {
      return this.staffVisble;
    },
    setStaffVisible(data) {
      this.staffVisble = data;
    },

    addBtnLoading: false,  // 增加员工模态框按钮的loading
    setAddBtnLoading(data) {
      this.addBtnLoading = data;
    },
    get getAddBtnLoading() {
      return this.addBtnLoading;
    },

    allDeptsOpts: [],  // 获取所有部门选项的
    setDeptsOpts(data) {
      this.allDeptsOpts = data;
    },
    get getAllDeptsOpts() {
      return this.allDeptsOpts.slice();
    },

    allProfession: [], //所有的职业选项
    get getAllPf() {
      return this.allProfession.slice();
    },
    setPf(data) {
      this.allProfession = data;
    },

    allPostions: [], // 所有的职位选项
    get getAllPos() {
      return this.allPostions.slice();
    },
    setPosition(data) {
      this.allPostions = data;
    },

    queryFields: {},  // 搜索框的query
    setQueryFields(data) {
      this.queryFields = data;
    },
    get getQueryFields() {
      return this.queryFields;
    },

    staffModifyVisible: false, // 修改员工信息模态框显隐
    get getModifyVisible() {
      return this.staffModifyVisible;
    },
    setModifyVisible(data) {
      this.staffModifyVisible = data;
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
    // SearchFormStore,
  }
  return (
    <MyStaffContext.Provider value={value}>
      {props.children}
    </MyStaffContext.Provider>
  );
});