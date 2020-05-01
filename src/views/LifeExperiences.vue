<template>
 <div class="life-experiences" ref="experiencesRef">

  <life-quote v-for="(quoteGroup,index) in state.filteredQuotes"
    :key="`${quoteGroup}_${index}`" :quote="state.reactiveQuotes[quoteGroup].content"
    :isRight="index%2===0"
    :getPreviousQuote="()=>previousQuote(quoteGroup)"
    :getNextQuote="()=>nextQuote(quoteGroup)"/>
  <pagination :backAction="getPrevPage" :nextAction="getNextPage" :goToAction="goToPage"
    :currentPage="state.currentPage" :maxPages="Object.keys(state.reactiveQuotes).length/maxQuotes"/>
 </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import { ref, computed, reactive } from '@vue/composition-api';

import LifeQuote from '@/components/LifeExperiences/LifeQuote.vue';
import Pagination from '@/components/Navigation/Pagination.vue';

export default {
  name: 'LifeExperiences',
  components: {
    LifeQuote,
    Pagination,
  },
  setup(props, { root }) {
    const { useState, useActions } = createNamespacedHelpers(
      root.$store,
      'quotes',
    );
    const { currentQuotes } = useState(['currentQuotes']);

    const { fetchQuotes, changeCurrentQuote } = useActions(['fetchQuotes', 'changeCurrentQuote']);
    fetchQuotes();

    const nextQuote = (category) => {
      changeCurrentQuote({ category, isNext: true });
    };
    const previousQuote = (category) => {
      changeCurrentQuote({ category, isNext: false });
    };

    const maxQuotes = 6;
    const state = reactive({
      currentPage: 1,
      reactiveQuotes: currentQuotes,
      filteredQuotes: computed(() => {
        const startIndex = maxQuotes * (state.currentPage - 1);
        return Object.keys(state.reactiveQuotes).slice(startIndex, startIndex + maxQuotes);
      }),
    });

    const experiencesRef = ref(null);

    const getPrevPage = () => {
      window.scrollTo(experiencesRef.value.offsetLeft, experiencesRef.value.offsetTop);
      state.currentPage -= 1;
    };

    const getNextPage = () => {
      window.scrollTo(experiencesRef.value.offsetLeft, experiencesRef.value.offsetTop);
      state.currentPage += 1;
    };

    const goToPage = (page) => {
      window.scrollTo(experiencesRef.value.offsetLeft, experiencesRef.value.offsetTop);
      state.currentPage = page;
    };

    return {
      state, getPrevPage, getNextPage, goToPage, experiencesRef, maxQuotes, fetchQuotes, previousQuote, nextQuote,
    };
  },
};
</script>

<style scoped>
.life-experiences{
  padding:30px;
  overflow-x:hidden;
}

@media (max-width: 700px) {
  .life-experiences{
      padding:0px;
  }
}
</style>
