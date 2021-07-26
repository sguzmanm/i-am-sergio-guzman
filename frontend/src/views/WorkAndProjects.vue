<template>
  <div class="work">
    <div class="skills">
      <chart :addTag="addTag" />
    </div>

    <div class="tags" ref="tagsRef">
      <div v-for="(tag,index) in state.currentTags" :key="`${tag}_${index}`" class="tag">
        <p>{{tag}}</p>
        <button @click="removeTag(tag)">&times;</button>
      </div>
    </div>

    <div class="cards">
        <div v-if="!state.filteredWorks || state.filteredWorks.length===0" class="cards__empty">
          Remember I love learning new skills; it doesn´t mean that
          I always have works to show you where I use them.
        </div>
        <work-card v-for="(work,index) in state.filteredWorks" :key="`${work.title}_${index}`"
          :work="work"/>
    </div>
    <pagination :backAction="getPrevPage" :nextAction="getNextPage" :goToAction="goToPage"
      :currentPage="state.currentPage" :maxPages="state.currentWorks.length/maxWorks"/>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import {
  reactive, computed, ref,
} from '@vue/composition-api';

import Chart from '@/components/WorkAndProjects/Chart.vue';
import WorkCard from '@/components/WorkAndProjects/WorkCard.vue';
import Pagination from '@/components/Navigation/Pagination.vue';

const compareWorks = (a, b) => {
  const dateA = a.endDate ? new Date(a.endDate) : new Date();
  const dateB = b.endDate ? new Date(b.startDate) : new Date();
  return dateB - dateA;
};

export default {
  components: {
    Chart,
    WorkCard,
    Pagination,
  },
  setup(props, { root }) {
    const { useState, useActions } = createNamespacedHelpers(
      root.$store,
      'works',
    );
    const { works } = useState(['works']);

    const { fetchWorks } = useActions(['fetchWorks']);
    fetchWorks();

    const maxWorks = 6;

    const state = reactive({
      currentPage: 1,
      currentTags: [],
      currentWorks: computed(() => {
        const sortedWorks = works.value.sort(compareWorks);
        if (state.currentTags.length === 0) {
          return sortedWorks;
        }

        const filteredWorks = sortedWorks.filter((e) => {
          for (let i = 0; i < state.currentTags.length; i += 1) {
            const currentTag = state.currentTags[i];
            if (!e.tags.find((element) => element === currentTag)) { return false; }
          }
          return true;
        });

        return filteredWorks;
      }),
      filteredWorks: computed(() => {
        const startIndex = maxWorks * (state.currentPage - 1);
        return state.currentWorks.slice(startIndex, startIndex + maxWorks);
      }),
      maxPages: computed(() => state.currentWorks.length),
    });

    const tagsRef = ref(null);

    const getPrevPage = () => {
      window.scrollTo(tagsRef.value.offsetLeft, tagsRef.value.offsetTop);
      state.currentPage -= 1;
    };

    const getNextPage = () => {
      window.scrollTo(tagsRef.value.offsetLeft, tagsRef.value.offsetTop);
      state.currentPage += 1;
    };

    const goToPage = (page) => {
      window.scrollTo(tagsRef.value.offsetLeft, tagsRef.value.offsetTop);
      state.currentPage = page;
    };

    const addTag = (tag) => {
      const index = state.currentTags.indexOf(tag);
      if (index !== -1) { return; }

      state.currentPage = 1;
      state.currentTags.push(tag);
    };

    const removeTag = (tag) => {
      const index = state.currentTags.indexOf(tag);
      state.currentTags.splice(index, 1);
    };

    return {
      state, tagsRef, addTag, removeTag, getPrevPage, getNextPage, goToPage, maxWorks,
    };
  },
};
</script>

<style scoped>
  .skills,.tags{
    max-width:100%;
  }

  .cards{
    margin-top:10px;
    display:flex;
    flex-wrap:wrap;

    overflow: hidden;
  }

  .cards__empty{
    font-size:30px;
    color:var(--text-color);
    margin:30px;
  }

  .tags{
    display:flex;
    flex-wrap:wrap;
    margin-top:15px;
  }

  .tag{
    background-color:var(--highlight-color);
    color:var(--text-color);
    padding:5px;

    flex:1;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    min-width:50px;
    max-width:100px;

    margin:10px;
  }

  .tag:hover{
    background-color:var(--highlight-color-2);
  }

  .tag button{
    background: none;
    border:none;

    color:var(--text-color);
    cursor:pointer;

    font-size:20px;
    font-weight:bold;
  }

  @media (max-width: 700px) {
    .cards{
      flex-wrap: nowrap;
      flex-direction: column;

      width: 100%;
    }

    .tag{
      min-width:auto;
      max-width:auto;
      flex: 1 0 calc(40% - 10px);

    }
  }

</style>
