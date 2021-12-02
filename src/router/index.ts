import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import routes from './routes';

/**
 * 添加主页路由
 */
const mainRoute: RouteRecordRaw[] = [];

const mainContext = import.meta.globEager('./modules/*.ts');
Object.keys(mainContext).forEach((v) => {
  const route = mainContext[v].default;
  route.children &&
    route.children.forEach((r, index) => {
      r.meta && (r.meta.level = index);
    });
  mainRoute.push(route);
});

routes.push(...mainRoute);

// 创建路由
const router: Router = createRouter({
  history: createWebHistory(),
  routes: routes.flat(),
  // 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to: any, from, next) => {
  useDocumentTitle(to.meta.title);
  next();
});

router.afterEach(() => {
  //
});

export default router;
