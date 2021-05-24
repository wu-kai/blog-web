// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from 'src/js/router'
import store from 'src/js/store'
import axios from 'axios'
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
import AV from 'leancloud-storage'
import { APP_ID, APP_KEY, SERVER_URL } from 'constant/leadCloud'
import 'js/directives'

require('./css/font-awesome.css');
require('./css/common.css');

Vue.use(VueBlu);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  serverURL: SERVER_URL
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
