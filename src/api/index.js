import http from '../utils/http'

// 登陆
export const login = (params) => http.get('/login', params);
// 获取侧边menu
export const getMenu = () => http.get('/menu/getSiderMenu');

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
export const deleteProfessional = (params) => http.delete('/admin/deleteProfessional', params);


// 获取所有的项目
export const getAllProjects = (params) => http.get('/admin/queryAllProject', params);
// 增加项目
export const addNewProject = (params) => http.post('/admin/addProject', params);
// 删除项目
export const deleteProject = (params) => http.delete('/admin/deleteProject', params);
// 分配项目到部门
export const distributeProject = (params) => http.post('/admin/distribeProject', params);

// 创建公告
export const newNotice = (params) => http.put('/releaseAnnoun', params);
// 获取整个公司的公告
export const getSysNotice = (params) => http.get('/getAllAnnouncement', params);
// 根据id查询公告详细信息
export const getNoticeDetail = (params) => http.get('/getAnnounceDetail', params);
// 批量删除公告
export const deleteMoreNotice = (params) => http.delete('/deleteAnouncement', params);
// markdown图片上传
export const uploadNoticeImg = (params) => http.post('/postImg', params);

// 获取所有公司文件
export const getAllAdminFile = (params) => http.get('/file/queryfileList', params);
// 删除文件
export const deleteAdminFile = (params) => http.delete('/file/deleteFile', params);
// 改变查看范围
export const changeFilePublic = (params) => http.put('/file/changeFilePublic', params);

// 获取文件树
export const getFolderTree = () => http.get('/folderTree/getFolderTree');
// 创建文件夹
export const createNewFolder = (params) => http.post('/folderTree/createFolder', params);
// 删除文件夹
export const deleteFolder = (params) => http.delete('/folderTree/deleteFolder', params);


//  获取项目详细信息
export const getDeptProjectDetails = (params) => http.get('/project/getProjectDetailInfo', params);
// 获取项目成员信息
export const getProjectMembers = (params) => http.get('/project/queryListInfo', params);
// 开启项目
export const runProjects = (params) => http.put('/project/openProject', params);
// 设置项目进度
export const setProjectStep = (params) => http.post('/project/setProjectSchedultion', params);
// 获取未被分配项目得成员
export const getUnsetLists = (params) => http.get('/project/queryUndistributedList', params);
// 添加新员工到这个项目上
export const addProjectMember = (params) => http.post('/project/distribeProject', params);
// 关闭项目
export const closeDeptProject = (params) => http.put('/project/closeProject', params);
// 删除项目成员
export const removeProjectMember = (params) => http.post('/project/deleteProjectStuff', params);


// 获取所有问题
export const getAllJobs = (params) => http.get('/project/sprint/problem/getAllProblem', params);
// 获取冲刺列表
export const getSprintList = (params) => http.get('/project/sprint/queryAllSprint', params);
// 获取冲刺下拉框
export const getAllSprintSelect = (params) => http.get('/project/sprint/selectSprintInfo', params);
// 创建冲刺
export const createNewSprint = (params) => http.post('/project/sprint/createSprint', params);
// 修改问题
export const changeProblemDetail = (params) => http.post('/project/sprint/problem/changeProblem', params);
// 创建问题
export const newProblem = (params) => http.post('/project/sprint/problem/createProblem', params);
// 删除冲刺
export const deleteSprint = (params) => http.delete('/project/sprint/deleteSprint', params);
// 删除问题
export const deleteProblem = (params) => http.delete('/project/sprint/problem/deleteProblem', params);
// 获取个人得所有问题
export const getAllMyjobs = (params) => http.get('/project/sprint/problem/getMyProblem', params);
// 开启或关闭冲刺
export const switchSprint = (params) => http.post('/project/sprint/startOrEndSprint', params);