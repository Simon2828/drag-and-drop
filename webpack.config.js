module.exports = {
  entry: __dirname + '/src/js/main.js',
  output: {
    filename: __dirname + '/public/js/app-bundle.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'sourcemap'
}
