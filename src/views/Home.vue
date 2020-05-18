<template>
  <div class="home">
    <div class="panel">
      <h1>
        Hello, I am Sergio Guzmán Mayorga.
      </h1>
      <p>
        I am a passionate SW Developer currently working at <a href="https://www.truora.com" target="_blank">{{ 'TRUORA' }}</a> who loves comic books and videogames and is a child at heart.
        I love creating stuff and learning new things everyday and above all my family and friends.
      </p>
      <p> With this page I wanna show you who I am,
        some of my <router-link to="/work-and-projects">finest works to date</router-link> from the last couple of years, and
        <router-link to="/life-experiences">my life experiences</router-link>.
        I´m usually available from {{currentWorkingHours}} but
        be sure to check my current mood if you are not sure.
      </p>
    </div>
    <div class="links">
        <router-link class="link" to="/work-and-projects" exact>Checks my finest projects</router-link>
        <router-link class="link" to="/life-experiences" exact>Look at my life experiences</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
  name: 'Home',
  setup() {
    const publicPath = ref(process.env.BASE_URL);

    const fromHours = new Date();
    fromHours.setUTCHours(13, 0, 0);

    const toHours = new Date();
    toHours.setUTCHours(22, 0, 0);

    const currentWorkingHours = ref(`${fromHours.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to ${toHours.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    return { publicPath, currentWorkingHours };
  },
};
</script>

<style scoped>
.panel {
  margin: auto;
  padding: 0px 150px;
}

.panel h1,.panel p {
  text-align: center;
}

.panel h1{
  font-size: 30px;
}

.panel p{
  font-size:20px;
}

.panel a,
.panel a:visited {
  color: var(--highlight-color);
  font-weight: bold;
}

.panel a:hover {
  color: var(--highlight-color-2);
}

.links{
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.links > .link{
  cursor:pointer;
  padding:10px 20px;
  margin:0 30px;

  text-decoration: none;
  font-weight: bold;

  background-color: var(--highlight-color-2);
  color: var(--background-color);
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

.links > .link:hover{
  -webkit-box-shadow: 10px 10px 31px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 31px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 31px 0px rgba(0, 0, 0, 0.75);

  color: var(--text-color);
  background-color: var(--highlight-color);
}

@media (max-width: 700px) {
  .panel{
    padding:0;
  }
}

@media (max-width: 380px) {
  .panel{
    padding:0;
  }
}
</style>
