import Vue from "vue";
import App from "./App";
import router from "./router/index";

import config from "./config";
import axios from 'axios';
global.axios = axios;
// axios.defaults.withCredentials = true;
global.API_PREFIX = config.API_PREFIX;

import VueSession from 'vue-session';
Vue.use(VueSession);

import VTooltip from 'v-tooltip';
Vue.use(VTooltip);

import PaperDashboard from "./plugins/paperDashboard";
Vue.use(PaperDashboard);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
