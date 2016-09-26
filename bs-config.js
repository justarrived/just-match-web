module.exports = {
  port: 8000,
  files: [
    'build/**/*.{html,htm,css,js}'
  ],
  server: {
    baseDir: 'build',
    middleware: {
      0: null // removes default 'connect-logger' middleware
    }
  },
  logLevel: 'silent'
};
