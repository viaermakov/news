const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: ['./src/index.tsx'],
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[id].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css', '.svg'],
    alias: {
      src: path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components'),
      model: path.resolve(__dirname, '../src/model'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: ['ts-loader'],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
            minimize: true,
          },
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg|ttf|svg|mp4)$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        type: 'javascript/auto',
        options: {
          name() {
            return '[path][name].[ext]';
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'chulakov test app',
      template: './public/index.html',
      filename: 'index.html',
      jsExtension: '.gz',
    }),
  ],
};
