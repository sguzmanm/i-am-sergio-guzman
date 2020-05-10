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
export default {
  name: 'MediaPreview',
  props: {
    media: String,
    alt: String,
  },
};
</script>

<style scoped>
  .media{
    margin:10px;
  }

  .media,video,img{
    max-height:25vh;
    width:auto;
    max-width: 100%;
  }

  .media img{
    border-radius: 20px;
    background: white;
  }
</style>
