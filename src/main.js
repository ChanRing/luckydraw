import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "@/utils/rem";
import "@/styles/index.less";

import LuckDraw from "vue-luck-draw";

Vue.use(LuckDraw);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
