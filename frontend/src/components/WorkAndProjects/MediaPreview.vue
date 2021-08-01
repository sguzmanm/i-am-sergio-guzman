<template>
  <div class="media">
    <video v-if="media.includes('.mp4')" muted loop autoplay>
        <source ref="videoMedia" loading="lazy" :src="`${require('@/assets/' + media)}`"
                type="video/mp4">

        Sorry, your browser doesn't support embedded videos.
    </video>
    <img ref="imageMedia" v-else loading="lazy" :src="`${require('@/assets/' + media)}`" :alt="'Demo image for '+alt"/>

    <button class="btn__select" @click="watchInNewWindow(media.includes('.mp4'))">Watch in new window</button>
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
  methods: {
    watchInNewWindow(isVideo) {
      let media = isVideo ? this.$refs.videoMedia : this.$refs.imageMedia;
      let url=media.getAttribute('src');

      if(isVideo){
        window.open(url,'Video','resizable=1');
        return
      }
      window.open(url,'Image','resizable=1');
    }
  }
};
</script>

<style scoped>
  .media{
    display: flex;
    flex-direction: column;
  }

  .media:hover{
    cursor: pointer;
  }

  .media video,.media img{
    max-height:40vh;
    width:auto;
    max-width: 100%;
    border-radius: 20px 20px 0 0;
  }

  .media img{
    background: white;
  }

  .media .btn__select{
    font-size: 1rem;
  }
</style>
