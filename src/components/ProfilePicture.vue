<template>
    <div class="profile">
      <button>
        <i :class="faIcon"></i>
        <!-- uses solid style -->
      </button>
      <img :src="`${require('@/assets/' + profilePic)}`" />
    </div>
</template>

<script>
export default {
  name: 'ProfilePicture',
  props: {
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
  width: 20%;
}

.profile button {
  position: relative;
  top: 20px;
  z-index: 1;

  padding: 5px 20px;
  font-size: 30px;

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
  background-color: var(--highlight-color);
}
</style>
