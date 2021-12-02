<template>
  <!-- 开启顶部安全区适配 -->
  <van-nav-bar safe-area-inset-top />
  <Layout />
  <!-- 开启底部安全区适配 -->
  <van-number-keyboard safe-area-inset-bottom />
</template>

<script setup lang="ts">
import Layout from '@/layout/index.vue';
</script>
