const isValidMood = (mood) => mood.faIcon && mood.profilePic;

export const loading = (state) => {
  state.loading = true;
};

export const setError = (state, message) => {
  state.error = message;
  state.loading = false;
};

export const set = (state, moods) => {
  state.moods = moods;
  state.loading = false;
};

export const setCurrent = (state, mood) => {
  if (!isValidMood(mood)) { return; }
  state.currentMood = mood;
};

export const clear = (state) => {
  delete state.currentMood;
};
