
const SET = 'set';
const CLEAR = 'clear';

// register check start action
export const setCurrentMood = (context, item) => {
  context.commit(SET, item);
};

export const clearCurrentMood = (context) => {
  context.commit(CLEAR);
};
