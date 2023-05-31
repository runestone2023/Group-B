import { message } from "antd";
import axios, { AxiosInstance } from "axios";
interface MyAxiosInstance extends AxiosInstance {
  setToken: (token: string) => void;
}
const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 5 * 1000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
}) as MyAxiosInstance;
instance.setToken = (token) => {
  instance.defaults.headers.common.Authorization = token;
  localStorage.setItem("token", token);
};
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("token");
    return config;
  },
  (err) => {
    console.log(err);
    return err;
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response) {
      const { status } = err.response;
      if (status === 401 || status === 403) {
        message.error("You need to login first");
      }
    }
  }
);
export default instance;
