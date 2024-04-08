import { storeToRefs } from 'pinia';
import useUserStore from 'src/stores/user';
import { createRouter, createWebHistory } from 'vue-router'

/* const {
  isAuthenticated,
} = storeToRefs(
  useUserStore()
); */


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('../pages/Login.vue'),
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('../pages/Profile.vue'),
      beforeEnter: () =>false,
    },
  ]
})

export default router
