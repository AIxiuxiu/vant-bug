<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive :include="state.includeRoutes">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const state = reactive({
  active: '/home',
  includeRoutes: ['ABOUT']
});
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
