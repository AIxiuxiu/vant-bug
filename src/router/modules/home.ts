/**
 * 测试路由
 */
export default {
  path: '/home',
  component: () => import('@/views/home/index.vue'),
  meta: {
    title: '首页'
  }
};
