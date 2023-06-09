import { createApp } from "vue";
import router from "./router/intercept";
import App from "./App.vue";
import store from "./store";
import directive from "@/utils/directive";
import "ant-design-vue/dist/antd.variable.min.css";
import Antd from "ant-design-vue";
import "virtual:svg-icons-register";
const app = createApp(App);
app.use(router).use(store).use(Antd).use(directive).mount("#app");

// Vue3 全局挂载示例
//app.config.globalProperties.$utils = utils; //没有install方法，vue3的use()会警告,全局挂载
