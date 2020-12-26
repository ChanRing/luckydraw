import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Demo",
    component: () => import("../views/Demo")
  },
  {
    path: "/draw",
    name: "Draw",
    component: () => import("../views/Draw")
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home")
  }
];

const router = new VueRouter({
  routes
});

export default router;
