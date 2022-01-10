import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import authRoutes from './auth.routes';

const routes: Array<RouteRecordRaw> = [
  ...authRoutes,
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      layout: AppLayout,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
