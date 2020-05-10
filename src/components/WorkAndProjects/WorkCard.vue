<template>
  <div class="card">
      <div class="card__header">
          <h3>{{work.title}} ( {{workDate}} )</h3>
          <div class="card__status" :style="{backgroundColor:`var(${statusColor})`}">
              {{work.status}}
          </div>
      </div>
      <div class="card__item card__org"
        v-for="organization in work.organizations" :key="`${work.title}_${organization.name}`">
          <div :class="{card__img:!organization.isTrademarkSensitive, card__full_img: organization.isTrademarkSensitive}">
            <img :src="organization.logo" loading="lazy" :alt="`Company logo for ${organization.name}`"/>
          </div>
          <p v-show="!organization.isTrademarkSensitive">{{organization.name}}</p>
      </div>
      <media-preview :media="`work-and-projects/${work.media?work.media:placeholder}`"
        :alt="work.title"/>
      <div class="card__content">
        <p>{{work.description}} </p>
        <p v-if="!work.links">I don´t have a link to show you here :/</p>
        <a v-if="work.links && work.links.demo"
            :href="work.links.demo" target="_blank">Check it out here</a><br>
        <a v-if="work.links && work.links.code"
            :href="work.links.code" target="_blank">This is the code</a>
        <a v-if="work.links && work.links.company"
            :href="work.links.company" target="_blank">In any case this is the company link</a><br>

      </div>

  </div>
</template>

<script>
import MediaPreview from '@/components/WorkAndProjects/MediaPreview.vue';
import { ref, computed } from '@vue/composition-api';

const finalStates = ['college', 'work', 'work open source', 'personal'];
const [successStyleVariable, failedStyleVariable] = ['--highlight-color-2', '--highlight-color'];

const areDatesEqual = (firstDate, secondDate) => firstDate.getMonth() === secondDate.getMonth();

export default {
  name: 'WorkCard',
  props: {
    work: Object,
  },
  components: {
    MediaPreview,
  },
  setup({ work }) {
    const orgs = ['Truora'];
    const isTrademarkSensitive = (organizationName) => {
      if (!organizationName) { return false; }

      return orgs.includes(organizationName);
    };

    const workDate = computed(() => {
      const options = { year: 'numeric', month: 'long' };
      const startDate = new Date(work.startDate);
      const endDate = work.endDate ? new Date(work.endDate) : new Date();

      if (endDate !== null && areDatesEqual(startDate, endDate)) {
        return startDate.toLocaleDateString('en-US', options);
      }

      return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
    });

    const statusColor = computed(() => {
      if (finalStates.find((el) => el === work.status)) {
        return successStyleVariable;
      }

      return failedStyleVariable;
    });

    const placeholder = ref('placeholder.jpeg');

    return {
      isTrademarkSensitive, workDate, statusColor, placeholder,
    };
  },
};
</script>

<style scoped>
.card{
  display:flex;
  flex-direction: column;
  text-align: justify;
  align-items: center;
  justify-content: center;

  flex: 1 0 calc(25% - 10px);
  background-color: var(--card-color);
  border-radius:15px;
  color: var(--background-color);

  margin: 20px;
  padding:20px;
  max-width: 80%;
}

.card__item{
  display:flex;
  flex-direction: row;
  width: 100%;
  align-items: center;

  font-size: 20px;
}

.card__item p{
  padding: 0 20px;
  font-weight: bold;
}

.card__header{
  display:flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  text-align: center;
}

.card__header h3{
  font-size:25px;
}

.card__org{
  justify-content: flex-start;
}

.card__img{
  border-radius: 50%;
  background-color: white;
  width: 10%;
  padding:10px;
  margin:10px;

  display:flex;
  justify-content: center;
  align-items: center;
}

.card__full_img{
  background-color: white;
  border-radius: 20px;
  width: 100%;
  padding:10px;
  margin:10px;

  display:flex;
  justify-content: center;
  align-items: center;
}

.card__img img,.card__full_img img{
  width: 70%;
}

.card__status{
  border-radius:5px;
  font: bold 15px Sans-Serif;
  text-align: center;
  text-shadow: rgba(255,255,255,0.5) 0px 1px 0px;

  position: relative;
  padding: 7px 35px;

  -webkit-box-shadow: 0px 0px 3px rgba(0,0,0,0.3);
  -moz-box-shadow: 0px 0px 3px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 3px rgba(0,0,0,0.3);

  color: var(--background-color);
  background-color: var(--highlight-color-2);
}

.card__content{
  font-size: 20px;
}

.card__content a,a:visited{
  color: var(--highlight-color);
}

.card__content a:hover{
  color: var(--highlight-color-2)
}

@media (max-width: 700px) {
  .card{
    margin: 20px 0px;
    flex: 1;
    max-width: none;
  }

  .card__item{
    flex-direction: column-reverse;
  }
}

</style>
