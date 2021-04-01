import axios from "axios";
import { message } from "antd";

axios.defaults.baseURL = "http://127.0.0.1:8080/";

axios.interceptors.response.use(
  (res) => {
    if (res.data.code && res.data.code !== 0) {
      message.error(res.data.msg);
      return Promise.reject(res);
    }
    return res.data.data;
  },
  (err) => {
    message.error("服务器无响应，请检查网络或服务器是否可用！");
    return Promise.reject(err);
  }
);

export default axios;
