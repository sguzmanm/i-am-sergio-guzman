const { MOODS_KEY, getItem, setItem } = require('../localStorage');

const HOUR_SPLIT = ':';

const getMinutes = (timeString) => parseInt(timeString[0], 10) * 60 + parseInt(timeString[1], 10);

const dateIsInCurrentMood = (mood, currentDate) => {
  const startDate = mood.startDate ? new Date(mood.startDate) : currentDate;
  const endDate = mood.endDate ? new Date(mood.endDate) : currentDate;

  if (startDate > currentDate || endDate < currentDate) {
    return false;
  }

  const startTime = mood.startTime.split(HOUR_SPLIT);
  const endTime = mood.endTime.split(HOUR_SPLIT);
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

  if (
    getMinutes(startTime) > currentTime
    || getMinutes(endTime) < currentTime
  ) {
    return false;
  }

  return true;
};

module.exports.getCurrentMood = (moods) => {
  // Check local storage
  let currentMood = getItem(MOODS_KEY);
  if (currentMood) {
    return currentMood;
  }

  // Look in file
  const currentDate = new Date();
  currentMood = moods.find((el) => dateIsInCurrentMood(el, currentDate)) || moods[0];
  setItem(MOODS_KEY, currentMood);

  return currentMood;
};
