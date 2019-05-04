import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("./views/home.vue")
    },
    {
      path: "/home",
      component: () => import("./views/home.vue")
    },
    {
      path: "/play",
      component: () => import("./views/play.vue")
    },
    {
      path: "*",
      component: () => import("./views/404.vue")
    }
  ]
});
