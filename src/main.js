import Vue from 'vue'
import App from './App.vue'
import './assets/css/style.scss'
import echarts from 'echarts'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)

Vue.prototype.$echarts = echarts

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/json'
  // baseURL: 'http://192.168.0.112:3005/json/'
})

Vue.prototype.$http = http

import router from './router'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
