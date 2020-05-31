const isValidMood = (mood) => mood.faIcon && mood.profilePic;

export const set = (state, moods) => {
  state.moods = moods;
};

export const setCurrent = (state, mood) => {
  if (!isValidMood(mood)) { return; }
  state.currentMood = mood;
};

export const clear = (state) => {
  delete state.currentMood;
};
