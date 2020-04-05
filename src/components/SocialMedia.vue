<template>
  <div class="social">
      <a :href="item.link" v-for="(item, index) in socialMedia" :key="index">
        <button class="social__icon">
          <i :class="item.icon"></i>
        </button>
      </a>
    </div>
</template>

<script>
import { ref } from '@vue/composition-api';

const socialData = require('@/helpers/layout/social.json');

export default {
  name: 'SocialMedia',
  setup() {
    const socialMedia = ref(socialData);
    return { socialMedia };
  },
};
</script>

<style scoped>

.social {
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

button.social__icon {
  padding: 20px 10px;
  margin: 0px 1px;
  font-size: 30px;

  background-color: var(--highlight-color-2);
  color: var(--background-color);
  border: none;
  cursor: pointer;
}

button.social__icon:hover {
  color: var(--text-color);
  background-color: var(--highlight-color);
}
</style>
