import { storeToRefs } from 'pinia';
import useUserStore from 'src/stores/user';
import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('../pages/Login.vue'),
      props: { redirect: '/profile'}
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('../pages/Profile.vue'),
      meta: { requiresAuth: true },
    },
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated()) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router
