import useUserStore from 'src/stores/user';
import { createRouter, createWebHistory } from 'vue-router'
import Storage from "../utils/storage"
import {User } from 'src/services/dto'
import useNavStore from 'src/stores/nav';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('../pages/Login.vue'),
      meta: {
        hideNavbar: true,
       }
    },
    {
      name: 'resetPassword',
      path: '/reset-password',
      component: () => import('../pages/ResetPassword.vue'),
      meta: {
        hideNavbar: true,
       }
    },
    {
      name: 'signup',
      path: '/signup',
      component: () => import('../pages/Register.vue'),
      meta: {
        hideNavbar: true,
       }
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('../pages/Profile.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'home',
      path: '/',
      component: () => import('../pages/Surveys.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'surveys',
      path: '/surveys',
      component: () => import('../pages/Surveys.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'edit',
      path: '/user/survey/:id',
      component: () => import('../pages/SurveyEdit.vue'),
      props: { editMode: true },
      meta: { requiresAuth: true },
    },
    {
      name: 'survey',
      path: '/survey/:id',
      component: () => import('../pages/SurveyView.vue'),
      props: { editMode: false },
      meta: {
        hideNavbar: true,
      }
    },
    {
      name: 'surveyError',
      path: '/survey/error',
      component: () => import('../pages/SurveyError.vue'),
      props: { editMode: false },
      meta: {
        hideNavbar: true,
      }
    },
    {
      name: 'templates',
      path: '/templates',
      component: () => import('../pages/Templates.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'results',
      path: '/user/survey/:id/results',
      component: () => import('../pages/Results.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/:notFound",
      component: () => import('../pages/Login.vue'),
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        try{
          const userStorage = new Storage<User>('user')
          userStorage.remove()
          next()
        }catch(e){
          next()
        }
      }
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
