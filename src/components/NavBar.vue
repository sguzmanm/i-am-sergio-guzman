<template>
    <div class="nav" v-if="!isMainPage">
      <div class="nav__container right">
        <router-link class="nav__regular" to="/work-and-projects" exact>Work and projects</router-link>
      </div>
      <div class="nav__profile">
          <button>
            <i :class="faIcon"></i>
          </button>
          <router-link to="/">
            <img :src="`${require('@/assets/' + profilePic)}`" />
          </router-link>
      </div>
      <div class="nav__container left">
        <router-link class="nav__regular" to="/life-experiences" exact>Life experiences</router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    profilePic: String,
    faIcon: String,
  },
};
</script>

<style scoped>

.nav {
  padding: 0;
  margin: 0;
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.nav__container{
  flex:3;
}

.nav__regular {
  font-weight: bold;
  padding: 20px;
  border-radius:10%;

  color: var(--highlight-color);
  text-decoration: none;
}

.nav__regular:hover {
  color: var(--text-color);
  background-color: var(--highlight-color);
}

.nav__regular.router-link-active,.nav__regular.router-link-exact-active{
  color: var(--text-color);
  background-color: var(--highlight-color);
}

.nav__profile {
  padding:0;
  margin:0;

  flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nav__profile img {
  border-radius: 50%;
  width: 100%;
}

.nav__profile button {
  position: relative;
  top: 20px;
  z-index: 1;

  padding: 5px 20px;
  font-size: 20px;

  background-color: var(--highlight-color-2);
  color: var(--background-color);
  border: none;
  border-radius: 50% 50% 0 0;
  cursor: pointer;
}

.nav__profile button:hover {
  color: var(--text-color);
  background-color: var(--highlight-color);
}

.right{
    text-align: right;
}

.left{
    text-align: left;
}

</style>
