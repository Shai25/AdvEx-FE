import Vue from "vue";
import App from "./App";
import router from "./router/index";

import VueSession from 'vue-session'
Vue.use(VueSession);

import PaperDashboard from "./plugins/paperDashboard";
Vue.use(PaperDashboard);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
