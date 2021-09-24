import Vue from 'vue';
import store from './store';
import App from './App.vue';

import '@/assets/icon/iconfont.css';
import '@/assets/icon/iconfont.js';
import '@/assets/style/index.scss';

import '@/plugins';
import '@/hooks';
import '@/common';
import '@/constant';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
