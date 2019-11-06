import http from '../utils/http'

// 登陆
export const login = (params) => http.get('/login', params);
// 获取侧边menu
export const getMenu = () => http.get('/getMenu');

// 获取个人信息
export const getUserInfo = (workNumber) => http.get('/user/getUserInfo', workNumber)
// 修改个人信息
export const changeUserInfo = (object) => http.post('/user/changeUserInfo', object);
// 修改密码
export const changePassWord = (object) => http.post('/user/changePassword', object);

// 获取所有员工信息
export const getAllStaffInfo = (params) => http.get('/admin/getAllStaffInfo', params);
// 删除员工
export const deleteStaffById = (params) => http.post('/admin/deleteStaffInfo', params);
// 创建新的员工
export const createStaff = (params) => http.post('/admin/createEmployee', params);

// 获取部门opts
export const getDepartment = (params) => http.get('/getDepartment', params);
// 获取职业opts
export const getProfessional = (params) => http.get('/getProfessional', params);
// 获取职位opts
export const getPosition = (params) => http.get('/getPosition', params)