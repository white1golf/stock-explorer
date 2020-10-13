import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../templates/Home.vue';
import Loginsignup from '../templates/Loginsignup.vue';

import { afterEachGlobal } from './guards';
//import routes from '@/data/routes';

Vue.use(VueRouter);

function route(path, component) {
  return {
    path,
    name: path,
    // meta: routes[path],
    component: () => import(`@/${component}`),
  };
}

// TODO: Template 또는 Layout

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '/',
      component: Home,
    },
    {
      path: '/',
      component: Loginsignup,
      children: [
        {
          path: '/login',
          component: () => import(`@/components/Logincard`),
        },
        {
          path: '/signup',
          component: () => import('@/components/Signupcard'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
});

router.afterEach(afterEachGlobal);

export default router;
