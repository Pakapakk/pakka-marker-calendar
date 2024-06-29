import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard
    },
    {
      path: '/signin',
      name : 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name : 'signup',
      component: SignUp
    },

    {
      path : '/:catchAll(.*)',
      redirect : '/dashboard' 
    }
  ]
})

export default router
