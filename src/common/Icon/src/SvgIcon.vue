<template>
  <svg :class="[spin && 'svg-icon-spin']" :style="getStyle">
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script lang="ts" setup>
import type { CSSProperties } from "vue";
import { computed } from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  size: {
    type: [Number, String],
    default: 16,
  },
  spin: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
});
console.log(props);

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
//获取样式
const getStyle = computed((): CSSProperties => {
  const { size } = props;
  let s = `${size}`;
  s = `${s.replace("px", "")}px`;
  return {
    width: s,
    height: s,
  };
});
</script>
<style lang="scss" scoped>
.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
