import { RouteRecordRaw } from 'vue-router';
import AuthLayout from '../layouts/AuthLayout.vue';

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue'),
    meta: {
      layout: AuthLayout,
      logged: true,
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "reset-password" */ '@/views/auth/ResetPassword.vue'),
    meta: {
      layout: AuthLayout,
      logged: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/auth/Register.vue'),
    meta: {
      layout: AuthLayout,
      logged: true,
    },
  },
];

export default authRoutes;
