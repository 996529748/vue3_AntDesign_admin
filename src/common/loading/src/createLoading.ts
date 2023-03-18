import LoadingCompontent from "./loading.vue";
import { createApp } from "vue";

//创建实例方法
function createLoading(): createLoadingType {
  const LoadingApp = createApp(LoadingCompontent);
  const dom = document.createElement("div");

  //关闭loading
  const hideLoading = (): void => {
    document.body.removeChild(dom);
    LoadingApp.unmount();
  };

  //打开laoding
  const showLoading = (): void => {
    document.body.appendChild(dom);
    LoadingApp.mount(dom);
  };

  return { showLoading, hideLoading };
}

export default createLoading;
