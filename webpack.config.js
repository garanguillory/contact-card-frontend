var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],

  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },

  plugins: [
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          },
      })
  ],

  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
