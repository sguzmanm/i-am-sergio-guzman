<template>
  <div class="life-quote"
    :style="{flexDirection:currentDirection}"
    v-animate.repeat.fade="isRight?'slide-from-left':'slide-from-right'">
      <div class="life-quote__image">
        <image-view :src="quote.image" :alt="`Image for ${quote.category} experience`"/>
        <p>{{quote.category}}</p>
      </div>
      <div class="life-quote__quote">
          <p>
            {{quote.quote}}
            <a v-if="quote.link" :href="quote.link.url" target="__blank">
              {{quote.link.name?quote.link.name:quote.link.url}}
            </a>
          </p>
          <div class="life-quote__arrows">
              <button @click="getPreviousQuote">&lt;</button>
              <button @click="getNextQuote">&gt;</button>
          </div>
      </div>
   </div>
</template>

<script>
import ImageView from '@/components/LazyLoading/ImageView.vue';
import { ref, computed } from '@vue/composition-api';

const cardMobileWidth = 700;
export default {
  name: 'LifeQuote',
  props: {
    quote: Object,
    getPreviousQuote: Function,
    getNextQuote: Function,
    isRight: Boolean,
  },
  components: {
    ImageView,
  },
  setup(props) {
    const currentWidth = ref(window.innerWidth);
    window.addEventListener('resize', () => {
      // check width
      currentWidth.value = window.innerWidth;
    });


    const currentDirection = computed(() => {
      if (currentWidth.value <= cardMobileWidth) {
        return 'column';
      }

      if (props.isRight) {
        return 'row';
      }

      return 'row-reverse';
    });
    return { currentWidth, currentDirection };
  },
};
</script>

<style scoped>
.animate {
  transition-delay: .1s;
  transition-duration: .25s;
  transition-timing-function: ease-in;
}

.slide-from-left {
  transform: translateX(-100px);
  opacity:0;
}

.slide-from-right {
  transform: translateX(100px);
  opacity:0;
}

.slide-from-left.animate-active,.slide-from-right.animate-active {
  transform: translateX(0px);
  opacity:1;
}


.life-quote{
  background-color: var(--background-color);
  border: solid 1px var(--text-color);
  border-radius:5px;

  padding: 10px;
  margin: 15px 0;
  display:flex;
  width:95%;
}

.life-quote__image{
  flex:1;
  border-radius: 50%;
  border-collapse: separate;
  margin:5px 20px;

  display:flex;
  flex-direction: column;
  align-items: center;
}

.life-quote__image p{
  background-color: var(--highlight-color);
  color:var(--text-color);
  padding:10px;
  font-weight:bold;
  text-align:center;

  width:100%;
  margin:0;
}

.life-quote__quote{
  flex:4;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-size: 20px;
}

.life-quote__quote p{
  width:100%;
}

.life-quote__quote a,.life-quote__quote a:visited {
  color: var(--highlight-color);
  font-weight: bold;
}

.life-quote__quote a:hover {
  color: var(--highlight-color-2);
}

.life-quote__arrows button{
  margin: 20px;

  color:var(--text-color);
  font-size: 40px;
  font-weight: bold;

  background: none;
  border:none;
  cursor:pointer;
}

@media (max-width: 700px) {
  .life-quote__image{
    border-radius: 50%;
    border-collapse: separate;
    margin:5px 20px;

    flex:1;
  }

  .life-quote__quote{
    flex:1;
    flex-direction: column-reverse;
  }
}
</style>
