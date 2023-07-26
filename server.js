const express = require("express");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

const app = express();

const compiler = webpack(webpackConfig);

const devMiddleware = require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
});

app.use(devMiddleware);

app.use("*", (req, res, next) => {
  const filename = path.join(compiler.outputPath, "index.html");
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
