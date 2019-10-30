import React from 'react'
import axios from 'axios';

import { message } from 'antd'
import history from '../utils/history'

let instance = axios.create({
    baseURL: 'http://122.51.41.28:3000',  // 基础domain
    timeout: 5000,   // 超时5秒
});


instance.interceptors.request.use(config => {
    const TOKEN = localStorage.getItem('token');
    if (TOKEN) {
        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${TOKEN}`; // token
    }
    return config;
}, (error) => {
    message.error('请求错误啦~');
    return Promise.reject(error);
})


instance.interceptors.response.use((response) => {
    if (response.status === 200) { // status为200说明请求成功把数据扔出去
        return Promise.resolve(response.data); //把数据抛出去
    } else {
        return Promise.reject(response)
    }
}, (error) => {
    if (error.response.status) {  // 判断状态码
        switch (error.response.status) {
            case 401:
                history.push({
                    pathname: '/login',
                    state: {
                        oldHistory: history.location.pathname
                    }
                })
                message.error('token不存在，请重新登陆')
                break;
            case 403:
                history.push({
                    pathname: '/login',
                    state: {
                        oldHistory: history.location.pathname
                    }
                })
                message.error('token过期，请重新登陆')
                break;
            case 404:
                message.error('404 not found')
                break;
            default:
                message.error('发生未知错误！')
        }
        return Promise.reject(error.response);
    }
})

// 封装get post
class http {

    static async get(url, params) { //封装get方法
        return await instance.get(url, { params })
    }

    static async post(url, rawData) { // 封装post方法
        return await instance.post(url, rawData)
    }

    // ....其他方法
    // ..............
}

export default http