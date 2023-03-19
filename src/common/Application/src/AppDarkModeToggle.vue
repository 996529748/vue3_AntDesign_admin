<template>
  <div
    :class="[
      theme === 'light'
        ? 'vben-dark-switch'
        : 'vben-dark-switch vben-dark-switch--dark',
    ]"
    @click="toggleDarkMode"
  >
    <div class="vben-dark-switch-inner"></div>
    <SvgIcon size="14" name="sun" />
    <SvgIcon size="14" name="moon" />
  </div>
</template>

<script lang="ts" setup>
import { SvgIcon } from "@/common/Icon";
import { ref } from "vue";
//主题
const theme = ref("light");
//模式切换
const toggleDarkMode = (): void => {
  if (theme.value === "light") {
    theme.value = "dark";
  } else {
    theme.value = "light";
  }
};
</script>
<style lang="scss" scoped>
.vben-dark-switch {
  position: relative;
  display: flex;
  width: 50px;
  height: 26px;
  padding: 0 6px;
  margin-left: auto;
  cursor: pointer;
  background-color: #151515;
  border-radius: 30px;
  justify-content: space-between;
  align-items: center;
}
.vben-dark-switch-inner {
  position: absolute;
  z-index: 1;
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.5s, background-color 0.5s;
  will-change: transform;
}
.vben-dark-switch--dark {
  .vben-dark-switch-inner {
    transform: translateX(calc(100% + 2px));
    background-color: #fff;
  }
}
</style>
