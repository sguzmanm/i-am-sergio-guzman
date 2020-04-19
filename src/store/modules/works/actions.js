
const SET = 'set';

const works = require('@/helpers/works/works.json');

// eslint-disable-next-line import/prefer-default-export
export const fetchWorks = (context) => {
  context.commit(SET, works);
};
