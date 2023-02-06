// vue.config.js
module.exports = {
  lintOnSave: true,
  devServer: {
    disableHostCheck: true,
  },
  publicPath:
    process.env.NODE_ENV === "production"
      ? `/${process.env.GH_PAGES_PATH}/`
      : "/",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      // eslint-disable-next-line no-param-reassign
      args[0].title = "Sergio Guzmán portfolio"
      return args
    })
  },
}
