/**
 * Axios请求库封装
 * Created by LaiChangRon on 20/03/11
 */
import axios from "axios";
import Qs from "qs";
import { Toast } from "vant";

// axios 配置
const options = {
  baseURL: "https://thc.lubiao9.cn/tianhecheng",
  timeout: 5 * 1000,
  transformRequest: [data => Qs.stringify(data)]
  // transformResponse: [data => data]
};

const service = axios.create(options);

// let requestList = [];

// 请求拦截 处理要发送的参数
service.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    // 添加cancelToken
    // config.cancelToken = new axios.CancelToken(cancel => {
    //   // 如果存在相同请求则过滤，这里为[取消后面的请求]
    //   const currentUrl = `${config.url}?${Qs.stringify(config.data)}`;
    //   if (requestList.includes(currentUrl)) {
    //     cancel(`过滤请求: ${Date.now()}`);
    //   } else {
    //     requestList.push(currentUrl);
    //   }
    // });
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截 处理响应内容
service.interceptors.response.use(
  response => {
    // 将已完成的请求在队列中去除
    // const { config } = response;
    // const currentUrl = `${config.url}?${Qs.stringify(config.data)}`;
    // requestList.splice(requestList.findIndex(item => item === currentUrl));
    // todo 根据服务器返回的状态码，给予错误提示

    if (response.data.code === 10000) {
      return response.data.data;
    } else {
      Toast.fail({ message: response.data.msg });
      return Promise.reject(new Error(response.data.msg));
    }
    // return response.data;
  },
  error => {
    Toast.fail({ message: "请求失败" });
    return Promise.reject(error);
  }
);

export default service;
