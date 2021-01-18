module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/evaluate/'
      : '/',
      pwa: {
        workboxOptions: {
          navigateFallback: '/index.html',
        },
      },
}