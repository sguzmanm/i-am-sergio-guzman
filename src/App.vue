<template>
  <div id="app" :class="{'full-screen':isMainPage}">
    <nav-bar
      v-if="!isMainPage"
      :showMoods="()=>showMoods=true"
      :profilePic="currentMood.profilePic"
      :faIcon="currentMood.faIcon"
    />

    <profile-picture
      v-if="isMainPage"
      :showMoods="()=>showMoods=true"
      :profilePic="currentMood.profilePic"
      :faIcon="currentMood.faIcon"
    />
    <router-view id="router-view" />
    <!--Bottom Components-->
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

import NavBar from '@/components/Navigation/NavBar.vue';
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
  }
}

@media (max-width: 360px) {
  #app, #app.full-screen {
    padding-left:0;
    padding-right:0;
    max-height: auto;
    height:auto;
  }
}
</style>
