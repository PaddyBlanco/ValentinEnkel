import { createRouter, createWebHistory } from 'vue-router'
import ViewHome from './views/viewHome.vue'
import ViewInprint from './views/viewInprint.vue'
import ViewPrivacyPolicy from './views/viewPrivacyPolicy.vue'
import ViewServices from './views/viewServices.vue'

const routes = [
  { path: '/', name: 'Home', component: ViewHome },
  { path: '/Services', name: 'Services', component: ViewServices },
  { path: '/Impressum', name: 'Inprint', component: ViewInprint },
  { path: '/Datenschutz', name: 'PrivacyPolicy', component: ViewPrivacyPolicy },
  {path: '/:catchAll(.*)',redirect: '/'}
]

export const router = createRouter({
  history: 
  createWebHistory(import.meta.env.BASE_URL),
   scrollBehavior(to, _ , savedPosition){
    if(to.hash){
       return {el: to.hash, left:0,top:0};
    }else{
       return savedPosition || {top:0};
    }
  },
  routes,
})