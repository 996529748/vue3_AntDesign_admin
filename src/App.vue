<template>
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>
<script setup lang="ts">
import useMeta from "./hook/useMeta/useMeta";
import "@/plugins/ant-configProvider-config";
useMeta();
</script>
<style lang="scss">
@import "./assets/scss/common.scss";
#app {
  font-family: "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
