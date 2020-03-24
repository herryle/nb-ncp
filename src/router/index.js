import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Patient from '../views/Patient'
import Migrate from '../views/Migrate'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    // chilidren 这边一定要是数组
    children: [
      {
        path: '/home',
        name: 'Home ',
        component: Home
      },
      {
        path: '/patient',
        name: 'Patient',
        component: Patient
      },
      {
        path: '/migrate',
        name: 'Migrate',
        component: Migrate
      }
    ]
  },
  {
    path: '/detail/:name',
    name: 'Detail',
    props: true,
    component: () => import('../views/Detail.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
