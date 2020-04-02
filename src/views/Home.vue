<template>
  <div class="home">
    <div class="panel">
      <p>
        Hello, I am <a href="../assets/home/cv_latam.docx">Sergio Guzmán Mayorga</a>, SW Developer
        currently at {{ "TRUORA INC" }}. You can find a lot of
        <router-link to="/">interesting projects</router-link> I´ve been involved with last couple
        of years, alongside my <router-link to="/">experience</router-link> and
        <router-link to="/">contact</router-link> whenever you require it. Also feel free to visit
        this page for updates at any time, my moods may change ;)
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.panel {
  margin: auto;
  padding: 0px 150px;
}

.panel p {
  font-size: 30px;
  line-height: 150%;
  text-align: center;
}
</style>
