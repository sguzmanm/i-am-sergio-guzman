
const SET = 'set';
const CHANGE_CURRENT_QUOTE = 'changeCurrent';

const quotes = require('@/helpers/quotes/quotes.json');

export const fetchQuotes = (context) => {
  console.log(quotes);
  const lifeQuotes = {};
  quotes.forEach((el) => {
    if (!lifeQuotes[el.category]) { lifeQuotes[el.category] = []; }
    lifeQuotes[el.category].push({ ...el });
  });

  console.log(lifeQuotes);
  context.commit(SET, lifeQuotes);
};

export const changeCurrentQuote = (context, { category, isNext }) => {
  console.log('Commt', context, category, isNext);
  context.commit(CHANGE_CURRENT_QUOTE, { category, isNext });
};
