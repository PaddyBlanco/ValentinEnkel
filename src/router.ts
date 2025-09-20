import { createRouter, createWebHistory } from 'vue-router'
import View_home from './views/view_home.vue'
import View_Inprint from './views/view_inprint.vue'
import View_privacy_policy from './views/view_privacy_policy.vue'


const routes = [
  { path: '/', name: 'Home', component: View_home },
  { path: '/Impressum', name: 'Inprint', component: View_Inprint },
  { path: '/Datenschutz', name: 'PrivacyPolicy', component: View_privacy_policy },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
