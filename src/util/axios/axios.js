// 引入 axios 模板

import axios from 'axios';

// 重新创建一个实例
let http = axios.create({
    baseURL:"http://localhost:3000"
})

// axios 拦截器
// 请求拦截
http.interceptors.request.use(req=>{
    return req
})
// 响应拦截
http.interceptors.response.use(res=>{
    return res.data
})

// 导出当前模块

export default http