import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
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
      component: DashBoard,
      meta:{
        requiresAuth : true
      }
    },
    {
      path: '/addEvent',
      name: 'addEvent',
      component: AddEvent,
      meta:{
        requiresAuth : true
      }
    },
    {
      path: '/editEvent/:id',
      name: 'editEvent',
      component: EditEvent,
      meta:{
        requiresAuth : true
      }
    },
    {
      path: '/signin',
      name : 'signin',
      component: SignIn,
      meta:{
        hideNavbar : true
      }
    },
    {
      path: '/signup',
      name : 'signup',
      component: SignUp,
      meta:{
        hideNavbar : true
      }
    },

    {
      path : '/:catchAll(.*)',
      redirect : '/dashboard' 
    }
  ]
})

router.beforeEach((to, from, next)=>{
  const currentUser = getAuth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if(requiresAuth && !currentUser){
      console.log('You are not authorized to access this area')
      next('signin')
  } else if (!requiresAuth && currentUser){
      console.log('You are authorized to access this area')
      next('dashboard')
  } else {
      next()
  }
})



export default router
