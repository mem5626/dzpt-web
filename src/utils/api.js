import axios from 'axios'
import {Message} from 'element-ui'
// 拦截请求
axios.interceptors.request.use(config => {
  return config
}, err => {
  Message.error({message: '请求超时!'})
  return Promise.resolve(err)
})
// 拦截回复
// axios.interceptors.response.use(data => {
//   if (data.status && data.status == 200 && data.data.status == 500) {
//     Message.error({message: data.data.msg});
//     return;
//   }
//   if (data.data.msg) {
//     Message.success({message: data.data.msg});
//   }
//   return data;
// }, err => {
//   if (err.response.status == 504 || err.response.status == 404) {
//     Message.error({message: '服务器被吃了⊙﹏⊙∥'});
//   } else if (err.response.status == 403) {
//     Message.error({message: '权限不足,请联系管理员!'});
//   } else if (err.response.status == 401) {
//     Message.error({message: err.response.data.msg});
//   } else {
//     if (err.response.data.msg) {
//       Message.error({message: err.response.data.msg});
//     }else{
//       Message.error({message: '未知错误!'});
//     }
//   }
//   // return Promise.resolve(err);
// })
let base = 'https://mockapi.eolinker.com/rUlUyQ363c2a9790452a95ba6656e403133f0e9b965b72e'
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    // 对uri进行编码
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
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
    });
}
