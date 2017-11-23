const path = require('path');
const express = require('express');
const webpack = require('webpack');
const wepbackDevMiddleware = require('webpack-dev-middleware')
const wepbackHotMiddleware = require('webpack-hot-middleware')
const config = require('./config/webpack.config.dev');
const opn = require('opn');


const app = express();
const compiler = webpack(config);

app.use(wepbackDevMiddleware(compiler, {
  quiet: false,
  noInfo: false,
  publicPath: config.output.publicPath
}));

app.use(wepbackHotMiddleware(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:5000');
  opn('http://localhost:5000', {app: ['google chrome']});
});