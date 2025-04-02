import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "../store/modules/user";
//创建axios实例


let request = axios.create({
    baseURL: 'https://adminlearn.reiko.lol/prod_api', //请求地址
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use(config => {
    const userStore = useUserStore();
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    //处理网络错误
    console.log(error)
    let msg = error.message
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;