<template>
  <div id="app" :class="{'full-screen':isMainPage}">

    <loading v-show="loading"/>

    <nav-bar
      v-if="!isMainPage && !loading"
      :showMoods="()=>showMoods=true"
      :profilePic="currentMood.profilePic"
      :faIcon="currentMood.faIcon"
    />

    <profile-picture
      v-if="isMainPage && !loading"
      :showMoods="()=>showMoods=true"
      :profilePic="currentMood.profilePic"
      :faIcon="currentMood.faIcon"
    />

    <router-view v-show="!loading" id="router-view" />
    <simple-footer v-if="!isMainPage && !loading"/>

    <social-media v-show="!loading" />
    <mood-modal v-if="showMoods && !loading" :hideModal="()=>showMoods=false"/>
  </div>
</template>

<script>
import useMoods from '@/compositions/useMoods';

import { ref, onMounted } from '@vue/composition-api';

import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import { getCurrentMood } from '@/helpers/moods/moods';

import NavBar from '@/components/Navigation/NavBar.vue';
import Loading from '@/components/Loading.vue';
import ProfilePicture from '@/components/ProfilePicture.vue';
import SocialMedia from '@/components/SocialMedia.vue';
import SimpleFooter from '@/components/SimpleFooter.vue';
import MoodModal from '@/components/MoodModal.vue';

export default {
  setup(props, { root }) {
    const { isMainPage, currentMood, moods } = useMoods(root);

    const { useState, useActions } = createNamespacedHelpers(
      root.$store,
      'moods',
    );

    const { loading } = useState(['loading']);
    const { fetchMoods, setCurrentMood } = useActions(['fetchMoods', 'setCurrentMood']);

    onMounted(async () => {
      await fetchMoods();
      setCurrentMood(getCurrentMood(moods.value));
    });

    const showMoods = ref(false);
    return {
      isMainPage, loading, currentMood, moods, showMoods,
    };
  },
  components: {
    Loading,
    NavBar,
    ProfilePicture,
    SocialMedia,
    SimpleFooter,
    MoodModal,
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
  margin: 0;
}

#app {
  font-family: 'Lato', sans-serif;
  padding: 20px 50px;

  overflow-y: auto;

  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#app.full-screen{
  max-width: 100vw;

  padding:0 50px;
  height: 100vh;
}

#app h1,#app h2,#app h3,#app h4,#app h5,#app h6{
  font-family: 'Roboto Slab', serif;
}

#router-view {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width:100%;
}

@media (max-width: 700px) {
  #app{
    padding:0px;
    max-height: auto;
    height:auto;
  }
}

@media (max-width: 360px) {
  #app, #app.full-screen {
    padding-left:0;
    padding-right:0;
  }

  #app.full-screen {
      height:auto;
  }
}
</style>
