/* eslint-disable indent */
import { computed } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

export default (root) => {
    const isMainPage = computed(() => {
        const currentRoute = root.$route;
        return currentRoute && currentRoute.path === '/';
    });

    const { useState } = createNamespacedHelpers(
        root.$store,
        'moods',
    );
    const { currentMood, moods } = useState(['currentMood', 'moods']);

    return {
        isMainPage, currentMood, moods,
    };
};
