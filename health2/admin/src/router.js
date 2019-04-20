import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect: '/user',
      children: [{
        path: '/user',
        name: 'user',
        component: () => import("./views/user.vue"),
        children: []
      }, {
        path: "/message",
        name: "message",
        component: () => import("./views/message.vue")
      }, {
        path: "/act",
        name: "act",
        component: () => import("./views/act.vue"),
      }, {
        path: "/act/actDetail/:id",
        name: "actDetail",
        component: () => import("./views/actDetail.vue"),
      }, {
        path: "/message/msgDetail/:id",
        name: "msgDetail",
        component: () => import("./views/msgDetail.vue"),
      }],
    }, {
      path: '/login',
      name: 'login',
      component: () => import("./views/login.vue")
    }, {
      path: "*",
      redirect: "/login",
    }
  ]
});
