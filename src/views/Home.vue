<template>
  <div class="home">
    <div class="panel">
      <p>
        Hello, I am
        <a :href="`${publicPath}cv_latam.docx`">Sergio Guzmán Mayorga</a>,
        passionate SW Developer currently at {{ 'TRUORA INC' }}. You can find a
        lot of
        <router-link to="/work-and-projects">interesting projects</router-link>
        I´ve worked on the last couple of years, and
        <router-link to="/life-experiences">my life experiences</router-link> if
        you wanna know me better. Also feel free to visit this page for updates
        at any time, my moods may change ;)
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
  name: 'Home',
  setup() {
    const publicPath = ref(process.env.BASE_URL);

    return { publicPath };
  },
};
</script>

<style scoped>
.panel {
  margin: auto;
  padding: 0px 150px;
}

.panel p {
  font-size: 30px;
  line-height: 150%;
  text-align: center;
}
</style>
