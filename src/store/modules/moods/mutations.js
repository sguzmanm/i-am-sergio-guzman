const isValidMood = (mood) => mood.faIcon && mood.profilePic;

export const set = (state, mood) => {
  if (!isValidMood(mood)) { return; }
  state.currentMood = mood;
};

export const clear = (state) => {
  delete state.currentMood;
};
