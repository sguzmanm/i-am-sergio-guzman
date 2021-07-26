
const axios = require('axios');

const { setCurrentStyle } = require('@/helpers/layout/styles');
const moods = require('@/helpers/moods/moods.json');

const SET = 'set';
const SET_CURRENT = 'setCurrent';
const SET_ERROR = 'setError';
const LOADING = 'loading';

const CLEAR = 'clear';

// register check start action
export const setCurrentMood = (context, mood) => {
  context.commit(SET_CURRENT, mood);
  setCurrentStyle(mood);
};

export const clearCurrentMood = (context) => {
  context.commit(CLEAR);
};

export const fetchMoods = async (context) => {
  const backendURL = process.env.VUE_APP_BACKEND ? process.env.VUE_APP_BACKEND : 'http://localhost:8080';
  context.commit(LOADING);

  try {
    const fetchedMoods = await axios.get(`${backendURL}/moods`);

    context.commit(SET, fetchedMoods.data);
    context.commit(SET_ERROR, '');
  } catch (e) {
    console.error('Failed to connect with backend', e);
    context.commit(SET, moods);
    context.commit(SET_ERROR, e.message); // TODO: Do something with this error
  }
};
