import axios from "axios";

// axios.defaults.baseURL =
//   process.env.NODE_ENV === "production"
//     ? "/"
//     : "https://api.itooi.cn/music/netease";
axios.defaults.baseURL = "https://api.itooi.cn/music/netease";
axios.defaults.timeout = 6000;

axios.interceptors.request.use(
  cfg => {
    return cfg;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios;
