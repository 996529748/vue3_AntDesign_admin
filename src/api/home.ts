import request from "../axios/axios";
import { domain } from "./baseUrlConfig";

//用户注册
export function register(
  data: RegisterParamsType
): Promise<RegisterResponseType> {
  return request.httpRequest<RegisterResponseType>({
    url: `${domain}/v1/user/register`,
    method: "POST",
    data,
  });
}
