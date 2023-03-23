import { defineStore } from "pinia";

const usetokenStore = defineStore("token", {
  state: () => ({
    token: "",
  }),
  //设置token
  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
  },
});

export { usetokenStore };
