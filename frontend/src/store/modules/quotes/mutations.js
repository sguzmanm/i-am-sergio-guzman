export const set = (state, lifeQuotes) => {
  state.quotes = lifeQuotes;
  state.currentQuotes = {};
  Object.keys(lifeQuotes).forEach((key) => {
    const quotes = lifeQuotes[key];
    const index = parseInt(Math.random() * quotes.length, 10);
    state.currentQuotes[key] = {
      index,
      content: quotes[index],
    };
  });
};

export const changeCurrent = (state, { category, isNext }) => {
  const currentData = state.currentQuotes[category];
  if (!currentData) { return; }

  let index = isNext ? currentData.index + 1 : currentData.index - 1;
  const categorySize = state.quotes[category].length;

  if (index < 0) { index = categorySize - 1; }
  if (index >= categorySize) { index = 0; }

  const newQuotes = state.currentQuotes;
  newQuotes[category] = {
    index,
    content: state.quotes[category][index],
  };

  state.currentQuotes = { ...newQuotes };
};
