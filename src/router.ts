import { createRouter, createWebHistory } from 'vue-router'
import ViewHome from './views/viewHome.vue'
import ViewInprint from './views/viewInprint.vue'
import ViewPrivacyPolicy from './views/viewPrivacyPolicy.vue'






const routes = [
  { path: '/Impressum', name: 'Inprint', component: ViewInprint },
  { path: '/Impressum', name: 'Inprint', component: ViewHome },
  { path: '/Datenschutz', name: 'PrivacyPolicy', component: ViewPrivacyPolicy },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
