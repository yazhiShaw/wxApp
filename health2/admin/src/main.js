import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./common/stylus/index.less";
 // 引入element-ui
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 引入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts; // 引入组件

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
