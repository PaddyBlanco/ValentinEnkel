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
]

export const router = createRouter({
  history: createWebHistory('/ValentinEnkel/'),
  routes,
})