import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
import AppLayout from '../layouts/AppLayout.vue';
import authRoutes from './authRoutes';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue'),
    meta: {
      auth: true,
      logged: true,
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
  ...authRoutes,
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      layout: AppLayout,
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const validateSession = (): boolean => !!store.state.email;
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !validateSession() && to.matched.some((record) => record.meta.auth)) {
    next({ name: 'login' });
  } else if (validateSession() && to.matched.some((record) => record.meta.logged)) {
    next({ name: 'home' });
  } else next();
});

export default router;
