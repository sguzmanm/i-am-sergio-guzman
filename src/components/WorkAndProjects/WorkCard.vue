<template>
  <div class="card">
      <div class="card__header">
        <media-preview :media="`work-and-projects/${work.media?work.media:placeholder}`"
          :alt="work.title"/>
      </div>

      <div class="card__body">
        <h3>{{work.title}}</h3>

        <div class="card__content">
          <p>
            {{work.description}}. I worked this on <strong>{{workDate}}</strong>
            <span v-show="work.organizations && work.organizations.length>0"> with:</span> </p>
          <ul v-show="work.organizations && work.organizations.length>0">
            <li v-for="organization in work.organizations" :key="`${work.title}_${organization.name}`">
              {{organization.name}}
            </li>
          </ul>

          <p v-if="!work.links">I don´t have a link to show you here :/</p>
          <a v-if="work.links && work.links.demo"
              :href="work.links.demo" target="_blank">Check it out here</a><br>
          <a v-if="work.links && work.links.code"
              :href="work.links.code" target="_blank">This is the code</a>
          <a v-if="work.links && work.links.company"
              :href="work.links.company" target="_blank">In any case this is the company link</a><br>
        </div>

        <div class="card__tags">
            <div class="card__tag" v-for="(tag,index) in work.tags" :key="index">
                {{tag}}
            </div>
        </div>

      </div>
  </div>
</template>

<script>
import MediaPreview from '@/components/WorkAndProjects/MediaPreview.vue';
import { ref, computed } from '@vue/composition-api';

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

      return `${startDate.toLocaleDateString('en-US', options)} to ${endDate.toLocaleDateString('en-US', options)}`;
    });

    const placeholder = ref('placeholder.jpeg');

    return {
      isTrademarkSensitive, workDate, placeholder,
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
  justify-content: flex-start;

  flex: 1 0 calc(25% - 10px);
  background-color: var(--card-color);
  border-radius:15px;
  color: var(--background-color);

  margin: 20px;
  max-width: 30%;
  border-radius: 20px;
}

.card__item{
  display:flex;
  flex-direction: row;
  width: 100%;
  align-items: center;

  font-size: 1rem;
}

.card__header{
  width:100%;
}

.card__body {
  padding:20px;
}

.card__item p{
  padding: 0 20px;
  font-weight: bold;
}

.card__tags{
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  justify-content: start;
}

.card__tag{
  flex:1;
  width: auto;
  max-width:50%;

  margin:5px;
  background-color:var(--highlight-color-2);
  border-radius:1rem;

  white-space: nowrap;
  text-align: center;
  font-size:0.9rem;
  text-shadow: rgba(255,255,255,0.5) 0px 1px 0px;

  position: relative;
  padding: 7px 35px;

  -webkit-box-shadow: 0px 0px 3px rgba(0,0,0,0.3);
  -moz-box-shadow: 0px 0px 3px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 3px rgba(0,0,0,0.3);

  color: var(--card-color);
  background-color: var(--highlight-color);
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

.card__content{
  font-size: 1rem;
}

.card__content a,a:visited{
  color: var(--highlight-color);
}

.card__content a:hover{
  color: var(--highlight-color-2)
}

@media (max-width: 900px) {
  .card{
    margin: 20px 0px;
    flex: 1 0 calc(100% - 10px);
    max-width: 100%;
  }

  .card__item{
    flex-direction: column-reverse;
  }

  .card__tag{
    max-width: none;
  }
}

</style>
