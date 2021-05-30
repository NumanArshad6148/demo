const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth",
    createProxyMiddleware({
      target: "http://localhost:4000/",
      changeOrigin: true,
    })
  );
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000", //"http://delphidev.uaenorth.cloudapp.azure.com:9080/",
      changeOrigin: true,
    })
  );
  // app.use(
  //   "/user",
  //   createProxyMiddleware({
  //     target: "http://localhost:4000/auth",
  //     changeOrigin: true,
  //     //   pathRewrite: {
  //     //     "^/api2": "/login", // rewrite path
  //     //   },
  //     pathRewrite: {
  //       "^/user": "/login", //remove /service/api
  //     },
  //   })
  // );
};
