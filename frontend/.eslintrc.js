module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'linebreak-style': ['error'],
    'max-len': [1, {'code': 120, 'tabWidth': 4, 'ignoreUrls': true}]
  },
};
