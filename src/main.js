import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';

const app = createApp(App);

app.use(router);
app.component('pulse-loader', PulseLoader );
app.use(VueChartkick);
app.mount('#app');
