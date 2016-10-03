module.exports = {
  port: 8000,
  files: [
    'dist/**/*.{html,htm,css,js}'
  ],
  server: {
    baseDir: 'dist/',
    middleware: {
      0: null // removes default 'connect-logger' middleware
    }
  },
  logLevel: 'silent'
};
