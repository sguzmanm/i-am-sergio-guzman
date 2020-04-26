<template>
  <div id="app">
    <nav-bar
      v-if="!isMainPage"
      :showMoods="()=>showMoods=true"
      :profilePic="currentMood.profilePic"
      :faIcon="currentMood.faIcon"
    />
    <router-view id="router-view" />
    <!--Bottom Components-->
    <profile-picture
      v-if="isMainPage"
      :showMoods="()=>showMoods=true"
      :profilePic="currentMood.profilePic"
      :faIcon="currentMood.faIcon"
    />
    <social-media />
    <simple-footer v-if="!isMainPage"/>

    <mood-modal v-if="showMoods" :hideModal="()=>showMoods=false"/>
  </div>
</template>

<script>
import useMoods from '@/compositions/useMoods';
import { ref } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import { getCurrentMood } from '@/helpers/moods/moods';

import NavBar from '@/components/NavBar.vue';
import ProfilePicture from '@/components/ProfilePicture.vue';
import SocialMedia from '@/components/SocialMedia.vue';
import SimpleFooter from '@/components/SimpleFooter.vue';
import MoodModal from '@/components/MoodModal.vue';

export default {
  setup(props, { root }) {
    const { isMainPage, currentMood, moods } = useMoods(root);

    const { useActions } = createNamespacedHelpers(
      root.$store,
      'moods',
    );

    const { fetchMoods, setCurrentMood } = useActions(['fetchMoods', 'setCurrentMood']);
    fetchMoods();
    setCurrentMood(getCurrentMood(moods.value));

    const showMoods = ref(false);
    return {
      isMainPage, currentMood, moods, showMoods,
    };
  },
  components: {
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

@media (max-width: 700px) {
  #app{
    padding-right:0px;
  }
}

@media (max-width: 500px) {
  #app {
    padding-bottom:150px;
  }
}
</style>
