import http from '../utils/http'

// 登陆
export const login = (params) => http.get('/getUserInfo', params);

