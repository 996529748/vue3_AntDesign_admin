<template>
  <h1>全局颜色样式</h1>
  <div>
    <img src="@/assets/images/logo.png" alt="" />
  </div>
  <div>
    <a-button type="primary" @click="registerFn">获取</a-button>
  </div>
  <div>
    <a-button
      v-debounce="{ fn: registerFn, event: 'click', delay: 500 }"
      type="primary"
    >
      防抖请求
    </a-button>
  </div>
</template>
<script setup lang="ts">
import { register } from "api/home";

// 用户注册
const registerFn = (): void => {
  const params: RegisterParamsType = {
    username: "陈冰棵",
    password: "000001",
    sex: 0,
  };
  register(params).then((res) => {
    console.log(res);
  });
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px; //自动按比例编译为rem
  font-weight: bold;
  color: $orange; //全局配置的主题色
}
div {
  margin-bottom: 10px;
}
</style>
