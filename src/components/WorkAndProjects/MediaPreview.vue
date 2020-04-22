<template>
  <div class="media">
      <video v-if="media.includes('.mp4')" muted loop autoplay>
            <source :src="`${require('@/assets/' + media)}`"
                    type="video/mp4">

            Sorry, your browser doesn't support embedded videos.
        </video>
        <img v-else :src="`${require('@/assets/' + media)}`" :alt="'Demo image for '+alt"/>
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
    }
</style>
