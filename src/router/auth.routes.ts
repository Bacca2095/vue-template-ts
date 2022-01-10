import { RouteRecordRaw } from 'vue-router';
import AuthLayout from '../layouts/AuthLayout.vue';

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue'),
    meta: {
      layout: AuthLayout,
    },
  },
];

export default authRoutes;
