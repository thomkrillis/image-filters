const path = require('path');

module.exports = {
  entry: './src/runner.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    __dirname: true,
    fs: "empty"
  },
  externals: {
    fs: "require('fs')"
  }
};
