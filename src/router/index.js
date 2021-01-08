import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recruiter',
    name: 'Recruiter',
    component: () => import('../views/Recruiter.vue')
  }
  ,
  {
    path: '/evaluate',
    name: 'Evaluate',
    component: () => import('../views/Evaluate.vue')
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('../views/Student.vue')
  },
  {
    path: '/works',
    name: 'Works',
    component: () => import('../views/Works.vue')
  },
  {
    path: '/login',
    name: 'StudentLogin',
    component: () => import('../views/Studentlogin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
