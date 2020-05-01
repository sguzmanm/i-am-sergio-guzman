// vue.config.js
module.exports = {
  lintOnSave: true,
  publicPath: '/i-am-sergio-guzman/',
  devServer: {
    disableHostCheck: true,
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = 'Sergio Guzmán portfolio';
        return args;
      });
  },

};
