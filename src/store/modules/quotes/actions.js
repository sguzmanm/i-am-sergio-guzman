
const SET = 'set';
const CHANGE_CURRENT_QUOTE = 'changeCurrent';

const quotes = require('@/helpers/quotes/quotes.json');

export const fetchQuotes = (context) => {
  const lifeQuotes = {};
  quotes.forEach((el) => {
    if (!lifeQuotes[el.category]) { lifeQuotes[el.category] = []; }
    lifeQuotes[el.category].push({ ...el });
  });

  context.commit(SET, lifeQuotes);
};

export const changeCurrentQuote = (context, { category, isNext }) => {
  context.commit(CHANGE_CURRENT_QUOTE, { category, isNext });
};
