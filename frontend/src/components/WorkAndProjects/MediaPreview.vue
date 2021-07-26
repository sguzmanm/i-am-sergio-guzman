<template>
  <div class="media">
    <video v-if="media.includes('.mp4')" muted loop autoplay>
        <source loading="lazy" :src="`${require('@/assets/' + media)}`"
                type="video/mp4">

        Sorry, your browser doesn't support embedded videos.
    </video>
    <img v-else loading="lazy" :src="`${require('@/assets/' + media)}`" :alt="'Demo image for '+alt"/>
  </div>


</template>

<script>
import ImageView from '@/components/LazyLoading/ImageView.vue';

export default {
  name: 'MediaPreview',
  props: {
    media: String,
    alt: String,
  },
  components: {
    ImageView,
  },
};
</script>

<style scoped>
  .media{
    width:100%;
  }

  .media,video,img{
    max-height:40vh;
    width:auto;
    max-width: 100%;
    border-radius: 20px 20px 0 0;
  }

  .media img{
    background: white;
  }
</style>
