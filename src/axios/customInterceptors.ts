import type { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import type { customRequestConfig, TokenConfigType } from "./type";
// import { getErrMessage } from "./errCode";//根据状态码返回对应报错
import { createLoading } from "@/common/loading";
import { TokenConfig } from "./config";
// import { Toast } from "vant";

type loadingInstance = ReturnType<typeof createLoading>; //取 Toast.loading 值的返回值，既  var Toast.loading: (options: string | ToastOptions) => ComponentInstance

const DEFAULT_LOADING = true; //默认loading显示 or 隐藏的变量

class customInterceptors {
  instance: AxiosInstance;
  showLoading: boolean;
  loadingInstance: loadingInstance | undefined;

  constructor(config: customRequestConfig) {
    this.instance = axios.create(config); //根据传入配置手动创建实例
    this.showLoading = config.showLoading ?? DEFAULT_LOADING; //当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数
    this.init();
  }

  //设置请求头
  setHeaderConfig = (
    TokenConfig: TokenConfigType,
    config: AxiosRequestConfig
  ): TokenConfigType => {
    const tokenKey = TokenConfig.tokenKey;

    //配置token
    config.headers![tokenKey] = TokenConfig.tokenValue;
    return TokenConfig;
  };

  init(): void {
    this.instance.interceptors.request.use(
      //全局请求拦截器
      (config) => {
        //设置token
        if (TokenConfig) {
          this.setHeaderConfig(TokenConfig, config);
        }

        if (this.showLoading) {
          //创建loading实例
          this.loadingInstance = createLoading();
          this.loadingInstance.showLoading();
        }
        return config;
      },

      (err) => {
        this.loadingInstance?.hideLoading();
        console.log(err);
      }
    );

    this.instance.interceptors.response.use(
      //全局响应拦截器
      (res) => {
        setTimeout(() => {
          this.loadingInstance?.hideLoading();
        }, 1000);
        //TODO
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return res.data;
      },

      (error: AxiosError) => {
        this.loadingInstance?.hideLoading();

        return error.response?.data;
      }
    );
  }

  //自定义请求
  httpRequest<T>(config: customRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 定制该请求是否加loading。当为传入该参数时，默认为true
      if (config.showLoading && config.showLoading) {
        this.showLoading = true;
      }
      this.instance.request<unknown, T>(config).then(
        (res) => {
          resolve(res);
        },

        (err) => {
          this.showLoading = DEFAULT_LOADING;
          return reject(err);
        }
      );
    });
  }

  //jsonp自行扩展封装
  jsonpRequest<T>(config: customRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 定制该请求是否加loading。当为传入该参数时，默认为true
      if (config.showLoading && config.showLoading) {
        this.showLoading = true;
      }

      // 根据时间戳生 + 随机数成一个callback回调名
      const callbackName =
        `jsonp_${new Date().getTime()}` +
        `${Math.random().toString().replace(/\D/g, "")}`;

      // 字符串拼接生成基本url
      const baseUrl =
        config.url &&
        `${config.url}${
          config.url.indexOf("?") === -1 ? "?" : "&"
        }jsonpcallback=${callbackName}`;
      const jsonp = document.createElement("script");
      jsonp.type = "text/javascript";
      jsonp.src = baseUrl as string;
      document.getElementsByTagName("head")[0].appendChild(jsonp);
      // 给window添加属性，用于获取jsonp结果
      window[callbackName] = (res: T): void => {
        if (res) {
          resolve(res);
        } else {
          reject(`请求失败`);
        }
        // 删除window下属性
        delete window[callbackName];
        // 得到结果后删除创建的script
        setTimeout(() => {
          document.getElementsByTagName("head")[0].removeChild(jsonp);
        }, 500);
      };
    });
  }
}

export default customInterceptors;
