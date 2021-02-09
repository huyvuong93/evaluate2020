import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {title: '評価システム | HOME'}
  },
  {
    path: '/recruiter',
    name: 'Recruiter',
    component: () => import('../views/Recruiter.vue'),
    meta: {title: '評価システム | 来場者登録'}
  }
  ,
  {
    path: '/evaluate',
    name: 'Evaluate',
    component: () => import('../views/Evaluate.vue'),
    meta: {title: '評価システム | 評価ページ'}
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('../views/Student.vue'),
    meta: {title: '評価システム | 学生ページ'}
  },
  {
    path: '/works',
    name: 'Works',
    component: () => import('../views/Works.vue'),
    meta: {title: '評価システム | 作品一覧'}
  },
  {
    path: '/login',
    name: 'StudentLogin',
    component: () => import('../views/Studentlogin.vue'),
    meta: {title: '評価システム | 学生入口'}
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
})
router.afterEach((to) => {
  document.title = to.matched[0].meta.title;
  window.scrollTo(0,0);
})
export default router
