import type { AxiosRequestConfig } from "axios";

//自定义参数类型
interface customRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
}
//请求头参数类型
interface TokenConfigType extends AxiosRequestConfig {
  tokenKey: string;
  tokenValue: string;
}

export { customRequestConfig, TokenConfigType };
