import Vue from 'vue';
import Vuex from 'vuex';

import moods from '@/store/modules/moods';
import quotes from '@/store/modules/quotes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    moods,
    quotes,
  },
});
