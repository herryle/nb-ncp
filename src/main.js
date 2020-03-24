import Vue from 'vue'
import App from './App.vue'
import './assets/css/style.scss'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/'
  //baseURL: 'http://122.51.172.167:3005/'
})

Vue.prototype.$http = http

import router from './router'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
