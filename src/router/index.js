import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Error from '../views/Error.vue';
import CoinDetail from '../views/CoinDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/coin/:id',
    name: 'CoinDetail',
    component: CoinDetail,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
