<template>
  <div class="work">
    <div class="skills">
      <chart/>
    </div>
    <div class="cards">
        <work-card v-for="(work,index) in currentWorks" :key="index" :work="work"/>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/WorkAndProjects/Chart.vue';
import WorkCard from '@/components/WorkAndProjects/WorkCard.vue';
import { ref } from '@vue/composition-api';

const works = require('@/helpers/works/works.json');

export default {
  components: {
    Chart,
    WorkCard,
  },
  setup() {
    const currentWorks = ref(works.sort((a, b) => {
      const dateA = a.endDate ? new Date(a.endDate) : new Date();
      const dateB = b.endDate ? new Date(b.startDate) : new Date();
      return dateB - dateA;
    }));
    return { currentWorks };
  },
};
</script>

<style scoped>
  .cards{
    margin-top:10px;
    display:flex;
    flex-wrap:wrap;

    overflow: hidden;
  }
</style>
