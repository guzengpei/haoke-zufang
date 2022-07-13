import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://liufusong.top:8080',
  timeout: 100000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // console.log(config)
  // 在发送请求之前做些什么
  if (store.state.token) {
    config.headers = { authorization: store.state.token }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default request
