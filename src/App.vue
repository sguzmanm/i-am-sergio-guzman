<template>
  <div id="app">
    <nav-bar
      v-if="!isMainPage"
      :profilePic="currentMood.profilePic"
      :faIcon="currentMood.faIcon"
    />
    <router-view id="router-view" />
    <!--Bottom Components-->
    <profile-picture
      v-if="isMainPage"
      :profilePic="currentMood.profilePic"
      :faIcon="currentMood.faIcon"
    />
    <social-media />
    <simple-footer v-if="!isMainPage"/>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import { getCurrentMood } from '@/helpers/moods/moods';

import NavBar from '@/components/NavBar.vue';
import ProfilePicture from '@/components/ProfilePicture.vue';
import SocialMedia from '@/components/SocialMedia.vue';
import SimpleFooter from '@/components/SimpleFooter.vue';

export default {
  setup(props, { root }) {
    const isMainPage = computed(() => {
      const currentRoute = root.$route;
      return currentRoute && currentRoute.path === '/';
    });

    const { useState, useActions } = createNamespacedHelpers(
      root.$store,
      'moods',
    );
    const { currentMood } = useState(['currentMood']);

    const { setCurrentMood } = useActions(['setCurrentMood']);
    setCurrentMood(getCurrentMood());

    return { isMainPage, currentMood };
  },
  components: {
    NavBar,
    ProfilePicture,
    SocialMedia,
    SimpleFooter,
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
  padding: 20px 50px;
}

#router-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}
</style>
