<template>
  <div class="pagination">
    <button class="page-button" v-show="isBackEnabled" @click="backAction"> &lt; </button>
    <button v-for="page in pages" :key="`Page ${page}`" @click="()=>goToAction(page)"
      class="page-button" :class="{'page-current':page===currentPage}">
      {{page}}
    </button>
    <button class="page-button" v-show="isNextEnabled" @click="nextAction"> &gt; </button>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';

export default {
  name: 'Pagination',
  props: {
    backAction: Function,
    nextAction: Function,
    goToAction: Function,
    currentPage: Number,
    maxPages: Number,
  },
  setup(props) {
    const currentWidth = ref(window.innerWidth);
    window.addEventListener('resize', () => {
      // check width
      currentWidth.value = window.innerWidth;
    });

    const isBackEnabled = computed(() => props.currentPage > 1);
    const isNextEnabled = computed(() => props.currentPage < props.maxPages);
    const pages = computed(() => {
      const [currentPage, maxPages] = [props.currentPage, props.maxPages];
      const resultPages = [currentPage];
      console.log(currentWidth.value > 500);
      const maxNavPages = currentWidth.value > 500 ? 5 : 1;

      let i = 1;
      let isAdded;

      console.log('GET PAGES');

      while (resultPages.length < maxNavPages) {
        isAdded = false;

        console.log(currentPage, i);
        if (currentPage - i > 0) {
          resultPages.unshift(currentPage - i);
          isAdded = true;
        }

        if (currentPage + i <= maxPages) {
          resultPages.push(currentPage + i);
          isAdded = true;
        }

        i += 1;
        if (!isAdded) {
          break;
        }
      }

      return resultPages;
    });

    return {
      isBackEnabled, isNextEnabled, pages,
    };
  },
};
</script>

<style scoped>
  .pagination{
    width:100%;

    display:flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;
  }

  .page-button{
    border-radius:5px;
    padding:20px;
    font-size:20px;

    margin:0 10px;

    background: none;
    cursor:pointer;

    color: var(--text-color);
    background-color: var(--background-color);
  }

  .page-button:hover{
    background-color:var(--highlight-color);
  }

  .page-current{
    background-color:var(--highlight-color);
  }
</style>
