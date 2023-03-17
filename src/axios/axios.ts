import customInterceptors from "./customInterceptors";

const requestInstance = new customInterceptors({
  // baseURL: '',
  timeout: 10000,
  showLoading: true, //默认接口都有Loading动画效果，不需要的额外传入
  // 携带凭证
  // withCredentials: true,
  //自定义 token
  // headers: { "X-token": "22222" },
});

export default requestInstance;
