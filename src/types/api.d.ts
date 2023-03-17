//通用config
interface GeneralParametersConfig {
  showLoading:boolean,
}

//接口数据列表类型
interface HotTagList {
  id: number;
  name: string;
  position: number;
  rel: string;
  url: string;
}

// 接口响应类型
interface HotTagListType {
  data: HotTagList[];
  msg: string;
  ret: number;
}


// 注册接口响应类型
interface RegisterResponseType {
  msg: string;
  data:string;
  code: number;
}
//注册接口参数类型
type Sex =  0 | 1; // 男 / 女

interface RegisterParamsType {
  username: string;
  password: string;
  sex: Sex;
}