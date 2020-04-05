import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import VueTypedJs from 'vue-typed-js';

import App from './App.vue';

import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(VueTypedJs);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
