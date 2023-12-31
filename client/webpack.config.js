const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      header: './src/js/header.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', //says doesnt exist?
        filename: 'index.html',
        title: 'Webpack Plugin',
      }),
      new WebpackPwaManifest ({
        inject: true,
        name: 'Text-Editor',
        short_name: 'J.A.T.E',
        description: 'This is a text editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/logo.png' ),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: 'assets/icons',
          }
        ]
      }),
      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'src-sw.js',
      }),
    ],

    module: {
      rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },},
      },
        
      ],
    },
  };
};