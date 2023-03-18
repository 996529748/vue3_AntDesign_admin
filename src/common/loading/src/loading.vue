<template>
  <section class="loading">
    <a-spin :spinning="loading"></a-spin>
  </section>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
const state = reactive({
  loading: true,
});

const { loading } = toRefs(state);
</script>
<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgb(240 242 245 / 40%);
}
</style>
