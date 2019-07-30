import axios from 'axios'
import {Message} from 'element-ui'
// 拦截请求
axios.interceptors.request.use(config => {
  return config
}, err => {
  Message.error({message: '请求超时!'})
  return Promise.resolve(err)
})

// let base = 'https://mockapi.eolinker.com/rUlUyQ363c2a9790452a95ba6656e403133f0e9b965b72e'
let base = 'http://10.2.2.50:8080'
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,

    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
