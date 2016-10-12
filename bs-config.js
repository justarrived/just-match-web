module.exports = {
  port: 8000,
  files: [
    './**/*.{html,htm,css,js,png,jpg,pdf}'
  ],
  server: {
    baseDir: './',
    middleware: {
      0: null // removes default 'connect-logger' middleware
    }
  },
  logLevel: 'silent'
};
