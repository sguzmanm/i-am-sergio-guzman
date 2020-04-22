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
    <div class="modal" v-if="showMoods">
      <div class="modal__backdrop"/>
      <div class="modal__content">
        <div class="modal__close">
          <button @click="()=>showMoods=false">&times;</button>
        </div>
        <div class="modal__header">
          Select my mood
        </div>
        <div class="modal__body">
          <div class="mood" v-for="(mood,index) in moods" :key="index">
            <p>{{mood.title}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';
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
    const { currentMood, moods } = useState(['currentMood', 'moods']);

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
    padding-bottom:200px;
  }
}

.modal{
  z-index:1;

  top:0;
  left:0;
  position:fixed;
}

.modal__backdrop{
  background-color:black;
  opacity:0.6;

  width:100vw;
  height:100vh;
  display:flex;
  align-items: center;
  justify-content: center;
}

.modal__content{
  margin:auto;
  z-index:2;

  width: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -150px;
  border-radius: 5px;
  text-align: center;

  background-color:var(--background-color);

}

.modal__header{
  font-size:30px;
  font-weight: bold;
  text-align: center;
  padding: 30px;

  margin:0;
}

.modal__close {
  width:100%;
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
}

.modal__close button{
  background: none;
  border:none;

  font-size:30px;
  color:var(--text-color);

  cursor:pointer;
}

.modal__body{
  background-color: var(--text-color);
  color:var(--background-color);
  margin:0;

}


</style>
