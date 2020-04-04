import { getCurrentMood } from '@/helpers/moods/moods';

export const defaultState = {
  currentMood: {
    title: 'Casual',
    faIcon: 'user-secret',
    textColor: '#e7ecef',
    backgroundColor: '#272932',
    highlightColor1: '#5bc0eb',
    highlightColor2: '#f4d35e',
    profilePic: 'profile-pic.jpg',
    startTime: '18:00',
    endTime: '24:00',
    startDate: '02/04/2020',
    endDate: '04/04/2020',
  },
};

export default {
  ...defaultState,
};
