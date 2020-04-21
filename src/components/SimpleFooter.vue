<template>
    <div class="footer">
      <p>{{message}} <a v-if="isProfessionalRoute"
        :href="`${publicPath}cv_latam.docx`">
        This is is my CV if you need it
      </a></p>

      <img :src="require('@/assets/logo.png')" alt="My webpage logo..."/>
    </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';

const professionalRoutes = ['/work-and-projects'];


const getFooterMessage = (currentRoute) => {
  const defaultFooterMessage = 'Welcome to my awesome webpage';
  if (!currentRoute || !currentRoute.path) {
    return defaultFooterMessage;
  }

  const { path } = currentRoute;
  switch (path) {
    case '/work-and-projects':
      return 'And these are my skills and projects, thank you for looking at them and if you have any doubt be sure to contact me.';
    case '/life-experiences':
      return 'I cherish my life and all I´ve done more than anything. If you wanna talk about any of these things be sure to contact me.';
    default:
      return defaultFooterMessage;
  }
};


export default {
  name: 'SimpleFooter',
  setup(props, { root }) {
    const message = computed(() => getFooterMessage(root.$route));
    const isProfessionalRoute = computed(() => (root.$route ? professionalRoutes.findIndex((el) => el === root.$route.path) !== -1 : false));

    const publicPath = ref(process.env.BASE_URL);

    return { publicPath, message, isProfessionalRoute };
  },

};
</script>

<style scoped>
.footer{
  bottom:0;
  width:90%;

  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  margin-top: 15px;
  padding: 5px 30px;

  background-color: var(--background-color);
  color: var(--text-color);
  font-size:30px;
}

.footer:before {
    content: ""; /* This is necessary for the pseudo element to work. */
    display: block; /* This will put the pseudo element on its own line. */
    margin: 0 auto; /* This will center the border. */
    width: 50%; /* Change this to whatever width you want. */
    border-top: 1px solid var(--text-color);
}

.footer a,
.footer a:visited {
  color: var(--highlight-color);
  font-weight: bold;
}

.footer a:hover {
  color: var(--highlight-color-2);
}
</style>
