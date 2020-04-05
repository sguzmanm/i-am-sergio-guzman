export const cssVars = {
  textColor: '--text-color',
  backgroundColor: '--background-color',
  highlightColor1: '--highlight-color',
  highlightColor2: '--highlight-color-2',
};

export const setCurrentStyle = (mood) => {
  const root = document.documentElement;
  Object.keys(mood).forEach((key) => {
    if (cssVars[key]) {
      root.style.setProperty(cssVars[key], mood[key]);
    }
  });
};
