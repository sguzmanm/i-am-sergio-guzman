<template>
  <div id="app">
    <div id="nav" v-if="!isMainPage">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view id="router-view" />
    <div class="profile">
      <button>
        <font-awesome-icon icon="user-secret" size="3x" />
      </button>
      <img :src="`${require('@/assets/' + profilePic)}`" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

export default {
  setup(props, { root }) {
    const profilePic = ref('profile-pic.jpg');
    const isMainPage = computed(() => {
      const { history } = root.$router;
      return history.current && history.current.path === '/';
    });
    const { currentMood } = useState(root.$store, ['currentMood']);
    return { profilePic, isMainPage, currentMood };
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile img {
  border-radius: 50%;
  width: 20%;
}

.profile button {
  position: relative;
  top: 20px;
  z-index: 1;

  padding: 5px 20px;

  background-color: var(--highlight-color-2);
  color: var(--background-color);
  border: none;
  border-radius: 50% 50% 0 0;
  cursor: pointer;
}

.profile button:hover {
  -webkit-box-shadow: 10px 10px 31px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 31px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 31px 0px rgba(0, 0, 0, 0.75);

  color: var(--text-color);
}
</style>
