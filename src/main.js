import Vue from 'vue';
import ElementUI from 'element-ui';
import store from './store';
import App from './App.vue';

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/icon/iconfont.css';
import '@/assets/icon/iconfont.js';

import '@/hooks';
import '@/common';
import '@/constant';
import '@/common/index.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
