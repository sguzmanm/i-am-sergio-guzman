<template>
  <div class="profile">
    <img :src="profilePic?`${require('@/assets/profile-pics/' + profilePic)}`:''" />
    <button @click="showMoods">
      <i :class="faIcon"></i> Change my mood
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProfilePicture',
  props: {
    showMoods: Function,
    profilePic: String,
    faIcon: String,
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile img {
  border-radius: 50%;
  max-height: 30vh;
}

.profile button {
  position: relative;
  bottom: 20px;
  z-index: 1;

  padding: 5px 20px;
  font-size: 20px;

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

.profile button:hover {
  -webkit-box-shadow: 10px 10px 31px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 31px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 31px 0px rgba(0, 0, 0, 0.75);

  color: var(--text-color);
  background-color: var(--highlight-color);
}

.profile i{
  margin:0 5px;
}

@media (max-width: 300px) {
  .profile img{
    width:60%;
  }
}
</style>
