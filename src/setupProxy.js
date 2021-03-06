// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
// https://github.com/chimurai/http-proxy-middleware

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://localhost:2335',
      changeOrigin: true,
      pathRewrite: {
        '^/api': 'http://139.159.226.244:8000'
      }
    })
  );
  // app.use(
  //   proxy('/api', {
  //     target: 'http://aaa:1000',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': ''
  //     }
  //   })
  // );
  // app.use(
  //   proxy('/xxx', {
  //     target: 'http://bbb:2000',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/xxx': ''
  //     }
  //   })
  // );
};
