<template>
  <div class="social" :class="{open:isOpen}">
      <div class="social__icons" :class="{open:isOpen}">
        <a v-for="(item, index) in socialMedia" :key="index"
          :href="item.link" target="__black">
          <button class="social__icon">
            <i :class="item.icon"></i>
          </button>
        </a>
      </div>
      <button class="arrow social__icon" @click="()=>isOpen=!isOpen">
        <i :class="{'fas fa-times':isOpen,'fas fa-comment':!isOpen }"/>
      </button>
    </div>
</template>

<script>
import { ref } from '@vue/composition-api';

const socialData = require('@/helpers/layout/social.json');

export default {
  name: 'SocialMedia',
  setup() {
    const socialMedia = ref(socialData);
    const isOpen = ref(false);

    return { socialMedia, isOpen };
  },
};
</script>

<style scoped>
.social {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position:fixed;
  left:0px;
  top:calc(50vh - 100px);
  z-index:1;

  margin:auto;
}

.social__icons {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.social__icons.open{
  opacity: 1;
}

.arrow{
  display:none;
}

button.social__icon {
  width:50px;
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

.animate {
  transition-delay: .1s;
  transition-duration: .25s;
  transition-timing-function: ease-in;
}

.slide-from-left {
  transform: translateX(-50px);
  opacity:0;
}

.slide-from-left.animate-active,.slide-from-right.animate-active {
  transform: translateX(0px);
  opacity:1;
}

@media (max-width: 700px) {
  .social {
    top:calc(33vh - 100px);

    transform: translateX(-50px);
    transition-property: transform;
    transition-duration: 1s;
  }

  .social.open{
    transform: translateX(0px);
  }

  .social__icons{
    opacity: 1;
    transition-property: opacity;
    transition-duration: 1s;
  }

  .social__icons.open{
    opacity: 1;
  }

  .arrow {
    display:inline;
  }
}
</style>
