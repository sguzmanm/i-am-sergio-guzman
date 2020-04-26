<template>
 <div class="life-experiences">
  <life-quote v-for="(quoteGroup,index) in Object.keys(reactiveQuotes)"
    :key="`${quoteGroup}_${index}`" :quote="reactiveQuotes[quoteGroup].content"
    :isRight="index%2===0"
    :getPreviousQuote="()=>previousQuote(quoteGroup)"
    :getNextQuote="()=>nextQuote(quoteGroup)"/>
 </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import { reactive } from '@vue/composition-api';

import LifeQuote from '@/components/LifeExperiences/LifeQuote.vue';

export default {
  name: 'LifeExperiences',
  components: {
    LifeQuote,
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

    const reactiveQuotes = reactive(currentQuotes);
    return {
      reactiveQuotes, fetchQuotes, previousQuote, nextQuote,
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
