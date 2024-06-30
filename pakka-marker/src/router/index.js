import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import AddEvent from '../views/AddEvent.vue'
import EditEvent from '../views/EditEvent.vue'
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
      path: '/addEvent',
      name: 'addEvent',
      component: AddEvent
    },
    {
      path: '/editEvent',
      name: 'editEvent',
      component: EditEvent
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
