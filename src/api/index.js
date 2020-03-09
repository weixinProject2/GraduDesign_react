import http from '../utils/http'

// 登陆
export const login = (params) => http.get('/login', params);
// 获取侧边menu
export const getMenu = () => http.get('/getMenu');

// 获取个人信息
export const getUserInfoDetail = (workNumber) => http.get('/user/getUserInfo', workNumber)
// 修改个人信息
export const changeUserInfo = (object) => http.post('/user/changeUserInfo', object);
// 修改密码
export const changePassWord = (object) => http.post('/user/changePassword', object);
export const upLoadUserImg = (object) => http.post('/user/postHeaderImg', object);

// 获取所有员工信息
export const getAllStaffInfo = (params) => http.get('/admin/getAllStuffInfo', params);
// 删除员工
export const deleteStaffById = (params) => http.post('/admin/deleteStaffInfo', params);
// 创建新的员工
export const createStaff = (params) => http.post('/admin/createEmployee', params);
// 修改员工信息
export const modifyStaff = (params) => http.post('/admin/changeStuffInfo', params);

// 获取部门opts
export const getDepartment = (params) => http.get('/getDepartment', params);
// 获取职业opts
export const getProfessional = (params) => http.get('/getProfessional', params);
// 获取职位opts
export const getPosition = (params) => http.get('/getPosition', params);

// 获取所有部门信息
export const getAllDeptsInfo = (params) => http.get('/getAllDepartmentInfo', params);
// 增加部门
export const addNewDept = (params) => http.post('/admin/addDepartment', params);
// 删除部门
export const deleteDepts = (params) => http.post('/admin/deleteDepartment', params);
// 修改部门信息
export const modifyDepts = (params) => http.post('/admin/changeDepartmentinfo', params);


// 获取当前部门管理员下的部门所有员工信息
export const getYourDeptStaff = (params) => http.get('/department/getAllStuffInfo', params);
// 删除部门下的员工
export const deleteDeptStaff = (params) => http.post('/department/deleteStuff', params);

// 获取所有职位信息
export const getAllPosDeatil = (params) => http.get('/getAllPositionInfo', params);
// 添加职位
export const addNewPos = (params) => http.post('/admin/addPosition', params);
// 删除职位
export const deletePosition = (params) => http.delete('/admin/deletePosition', params);

// 获取所有职业信息
export const getAllProfDeatil = (params) => http.get('/getAllProfessionalInfo', params);
// 添加新职业
export const addNewProf = (params) => http.post('/admin/addProfessional', params);
// 删除职业
export const deleteProfessional = (params) =>http.delete('/admin/deleteProfessional',params);