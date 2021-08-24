module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = '5 Nuts - BE SAFE, BE HEALTHY'
      return args
    })
  }
}