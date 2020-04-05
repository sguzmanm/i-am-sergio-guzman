
const { setCurrentStyle } = require('@/helpers/layout/styles');

const SET = 'set';
const CLEAR = 'clear';

// register check start action
export const setCurrentMood = (context, mood) => {
  context.commit(SET, mood);
  setCurrentStyle(mood);
};

export const clearCurrentMood = (context) => {
  context.commit(CLEAR);
};
