const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin')
const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname, '../../dist/apps/demo-js'),
  },
  devServer: {
    port: 4200,
  },
  plugins: [
    new NxAppWebpackPlugin({
      tsConfig: './tsconfig.app.json',
      compiler: 'swc',
      main: './src/main.ts',
      index: './src/index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.css'],
      outputHashing: process.env.NODE_ENV === 'production' ? 'all' : 'none',
      optimization: process.env.NODE_ENV === 'production',
    }),
  ],
}
