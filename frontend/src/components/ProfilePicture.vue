<template>
  <div class="profile">
    <img :src="profilePic?`${require('@/assets/profile-pics/' + profilePic)}`:''" />
    <button class="btn__select" @click="showMoods">
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

.profile .btn__select {
  position: relative;
  bottom: 20px;
  z-index: 1;

  font-size: 20px;
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
