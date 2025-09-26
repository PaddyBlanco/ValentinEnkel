import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { inview } from './directives/v-invuew';

import './assets/CSS/main.css';
import './assets/CSS/inputs.css';
import './assets/CSS/spacing.css';
import './assets/CSS/stucture.css';
import './assets/CSS/reveal.css'; 


const app = createApp(App);
app.directive('inview', inview);
app.use(router);
app.mount('#app');