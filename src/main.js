import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import VueTypedJs from 'vue-typed-js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';

library.add(faUserSecret);

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(VueTypedJs);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
