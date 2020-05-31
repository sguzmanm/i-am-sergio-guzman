
const { setCurrentStyle } = require('@/helpers/layout/styles');
const moods = require('@/helpers/moods/moods.json');

const SET = 'set';
const SET_CURRENT = 'setCurrent';
const CLEAR = 'clear';

// register check start action
export const setCurrentMood = (context, mood) => {
  context.commit(SET_CURRENT, mood);
  setCurrentStyle(mood);
};

export const clearCurrentMood = (context) => {
  context.commit(CLEAR);
};

export const fetchMoods = (context) => {
  context.commit(SET, moods);
};
