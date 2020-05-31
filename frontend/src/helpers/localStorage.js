export const MOODS_KEY = 'moods';

export const setItem = (key, item) => {
  // Put the object into storage
  localStorage.setItem(key, JSON.stringify(item));
};

export const getItem = (key) => {
// Retrieve the object from storage
  localStorage.getItem(key);
};
