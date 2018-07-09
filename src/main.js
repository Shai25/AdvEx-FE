import Vue from "vue";
import App from "./App";
import router from "./router/index";

import axios from 'axios';
global.axios = axios;
// axios.defaults.withCredentials = true;

var apiPrefix = (process.env.NODE_ENV === 'production' ? 'https://api.advex.org' : 'http://localhost:5000');
global.apiPrefix = apiPrefix;

import VueSession from 'vue-session';
Vue.use(VueSession);

import PaperDashboard from "./plugins/paperDashboard";
Vue.use(PaperDashboard);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
