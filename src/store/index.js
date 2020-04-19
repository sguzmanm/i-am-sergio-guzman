import Vue from 'vue';
import Vuex from 'vuex';

import moods from '@/store/modules/moods';
import quotes from '@/store/modules/quotes';
import works from '@/store/modules/works';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    moods,
    quotes,
    works,
  },
});
