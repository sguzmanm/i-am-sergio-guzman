<template>
  <figure v-lazyload class="image__wrapper">
    <image-spinner/>
    <img
      class="image__item"
      :data-url="src"
      :alt="alt"
    >
  </figure>
</template>

<script>
import LazyLoadDirective from '@/directives/LazyLoadDirective';
import ImageSpinner from './ImageSpinner.vue';

export default {
  name: 'ImageView',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    maxHeight: Number,
  },
  directives: {
    lazyload: LazyLoadDirective,
  },
  components: {
    ImageSpinner,
  },

};

</script>

<style scoped>
.image__wrapper{
  margin:0;

  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.image__item{
  max-height: 200px;
  margin:0;
}

@media (max-width: 700px) {
  .image__item{
    max-height: 300px;
    max-width: 100%;
  }
}

@media (max-width: 380px) {
  .image__item{
    max-height:200px;
    max-width:100%;
  }
}

</style>
