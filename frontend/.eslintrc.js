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
    'max-len': [
      'warn', 
      {
        'limit': 120, 
        'ignore-pattern': "^import [^,]+ from |^export | implements"
      }
    ],
  },
};
