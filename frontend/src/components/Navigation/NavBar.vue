<template>
    <div class="nav">
      <div class="nav__container right">
        <router-link class="nav__regular" to="/work-and-projects" exact>Work and projects</router-link>
      </div>
      <div class="nav__profile">
          <router-link to="/">
            <img :src="profilePic?`${require('@/assets/profile-pics/' + profilePic)}`:''" />
          </router-link>
          <button @click="showMoods">
            <i :class="faIcon"></i> Change my mood
          </button>
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
    showMoods: Function,
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

  width:100%;
}

.nav__container{
  flex:3;
}

.nav__regular {
  padding:20px;
  border-radius:10%;
  border: 1px solid var(--highlight-color);

  color: var(--highlight-color);
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
  width:100%;
}

.nav__profile img {
  border-radius: 50%;
  width: 100%;
}

.nav__profile button {
  position: relative;
  bottom: 20px;
  z-index: 1;

  padding: 5px 20px;
  font-size: 15px;

  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: var(--highlight-color-2);
  color: var(--background-color);
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

.nav__profile button:hover {
  color: var(--text-color);
  background-color: var(--highlight-color);
}

.nav__profile i{
  margin:0 5px;
}

.right{
    text-align: right;
}

.left{
    text-align: left;
}

@media (max-width: 700px) {
  .nav__container{
    flex:1;
    font-size: 15px;
  }

  .nav__profile{
    flex:1;
  }

  .nav__regular{
    padding: 10px;
  }
}

@media (max-width: 360px) {
  .nav{
    position:fixed;
    bottom:0;
    left:0;
    margin:auto;
    text-align:center;

    z-index:1;
    background-color:var(--background-color);
  }

  .nav__container{
    flex:1;
    font-size: 15px;
  }

  .nav__profile{
    flex:1;
  }

  .nav__regular{
    display:block;
    padding: 5px;
  }
}

</style>
