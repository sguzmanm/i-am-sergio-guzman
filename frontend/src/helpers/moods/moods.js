const { MOODS_KEY, getItem, setItem } = require('../localStorage');

const getMinutes = (hours, minutes) => hours * 60 + minutes;


const getStartDateDifference = (mood, currentDate) => {
  if (!mood.startTime || !mood.endTime) {
    return;
  }

  const startDate = mood.startDate ? new Date(mood.startDate) : currentDate;
  const endDate = mood.endDate ? new Date(mood.endDate) : currentDate;

  if (startDate > currentDate || endDate < currentDate) {
    return;
  }

  const startTime = getMinutes(mood.startTime.hour, mood.startTime.minute);
  const endTime = getMinutes(mood.endTime.hour, mood.endTime.minute);
  const currentTime = getMinutes(currentDate.getHours(), currentDate.getMinutes());

  if (startTime > currentTime || endTime < currentTime) {
    return;
  }

  return Math.abs(startTime - currentTime);
};

module.exports.getCurrentMood = (moods) => {
  // Check local storage
  let currentMood = getItem(MOODS_KEY);
  if (currentMood) {
    return currentMood;
  }

  // Look in file
  currentMood = moods[0];
  const currentDate = new Date();
  let minDiff = currentDate.getDate();
  moods.forEach((mood) => {
    console.log(mood);
    const time = getStartDateDifference(mood, currentDate);
    if (time && time < minDiff) {
      console.log("Replace");
      minDiff = time;
      currentMood = mood;
    }
  });

  setItem(MOODS_KEY, currentMood);

  return currentMood;
};
