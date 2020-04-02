<template>
  <div id="app">
    <div id="nav" v-if="!isMainPage">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view id="router-view" />
    <img class="profile" :src="`${require('@/assets/' + profilePic)}`" />
  </div>
</template>

<script>

import { ref, computed } from '@vue/composition-api';

export default {
  setup(props, ctx) {
    const profilePic = ref('profile-pic.jpg');
    const isMainPage = computed(() => {
      const { history } = ctx.root.$router;
      return history.current && history.current.path === '/';
    });
    return { profilePic, isMainPage };
  },
};
</script>

<style>
:root {
  --background-color: #272932;
  --text-color: #e7ecef;
  --highlight-color: #5bc0eb;
  --highlight-color-2: #f4d35e;
}

body {
  color: var(--text-color);
  background-color: var(--background-color);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
}

#app a {
  color: var(--highlight-color);
  text-decoration: none;
  font-weight: bold;
}

#app a:hover,
a:visited {
  color: var(--highlight-color-2);
  text-decoration: none;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#router-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

.profile {
  display: block;
  border-radius: 50%;
  width: 20%;
  margin: auto;
}
</style>
