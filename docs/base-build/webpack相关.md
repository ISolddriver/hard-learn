## webpack 相关总结
webpack 是基于 `bundle` 的模块打包工具，可以将多个模块打包成一个或多个文件。
### question: webpack的基本配置有哪些？
1. entry: 入口文件，指定打包的起点。
2. output: 指定打包文件的输出位置和名称。
3. mode: 指定构建模式（开发或生产）
4. module: module.rules配置各种 Loader，用于处理各种类型的文件。
5. plugins: 配置插件，用于扩展 Webpack 的功能。
6. resolve: 配置模块解析规则，如路径别名、文件扩展名等。
7. devServer: 配置开发服务器，支持热更新等功能。
8. optimization: 配置优化选项，如代码分割、压缩等。
9. sourceMap: 配置 Source Map，用于调试代码。
以下是完整示例：
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
    open: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
  },
  devtool: 'eval-cheap-source-map', // 开发环境推荐
};
```
### question: 如何通过配置提升构建性能？
1. 缩小文件搜索范围，使用`resolve`配置项缩小模块的搜索范围
```js
module.exports = {
  resolve: {
    modules: ['node_modules'], // 指定模块搜索目录
    extensions: ['.js', '.json'], // 指定文件扩展名
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置路径别名
    },
  },
};
```
2. 减少 Loader作用范围，使用include和exclude配置项缩小范围。
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'), // 只处理 src 目录下的文件
        exclude: /node_modules/, // 排除 node_modules
        use: ['babel-loader'],
      },
    ],
  },
};
```
3. 缓存 loader 结果，使用cache-loader 和 babel-loader的缓存功能。
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'cache-loader', // 缓存 Loader 结果
          'babel-loader',
        ],
      },
    ],
  },
};
```
4. 使用 DLLPlugin 预编译依赖。将不常用的三方库提前打包，减少打包时间。
```js
// webpack.dll.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.resolve(__dirname, 'dll/[name]-manifest.json'),
    }),
  ],
};
```
5. 使用 thread-loader 或者 HappyPack 多进程打包。HappyPack 可以将 Loader 的同步执行转换为异步执行，从而提高打包速度。
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 4, // 开启 4 个线程
            },
          },
          'babel-loader',
        ],
      },
    ],
  },
};
```
6. 压缩资源，使用 MiniCssExtractPlugin 和 OptimizeCSSAssetsPlugin 压缩 CSS
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin()],
  },
};
```
7. Tree Shaking，启用 Tree Shaking 移除未使用的代码。
```js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
  },
};
```
8. 代码分割，使用 SplitChunksPlugin 分割代码，减少初始加载时间
```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
```
9. 合理使用 TerserPlugin 压缩代码，多线程压缩代码。
```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        cache: true, // 启用缓存
      }),
    ],
  },
};
```

### question: webpcak的loader和plugin的区别，如何编写一个loader和plugin？
- `Loader`是文件加载器，能够加载资源文件，并对这些文件进行处理，例如编译，压缩，打包等，最终一起打包到指定的文件中。实质是文件转换器，将 A 文件转换成 B 文件，操作的是文件。一个 loader 只能完成一种转换，多个 loader 可以通过 pipeline 的方式链式调用，从右到左执行。
- `Plugin`赋予了 webpack 各种灵活的功能，例如打包优化，资源优化，注入环境变量等，webpack会在整个构建过程中广播出许多事件，插件可以监听这些事件，并在合适的时机介入执行。目的是对构建过程进行扩展。

### question: 介绍一下 Babel的工作流程，以及他是如何将ES6代码转换为ES5代码的？
Babel 是一个 JavaScript 编译器，用于将 ES6+ 代码转换为向后兼容的 JavaScript 代码，以便能够运行在当前和旧版本的浏览器或环境中。Babel 的主要工作流程包括解析、转换和生成三个阶段。

1. 解析：Babel 使用 @babel/parser 将源代码解析成抽象语法树（AST）。抽象语法树是一种树形数据结构，用于表示源代码的结构和语义。
2. 转换：Babel 使用 @babel/traverse 遍历抽象语法树，并对节点进行转换。转换过程中，Babel 会根据预设（preset）或插件（plugin）的配置，对 AST 进行相应的操作，例如将 ES6+ 语法转换为 ES5 语法。
3. 生成：Babel 使用 @babel/generator 将转换后的抽象语法树重新生成源代码。

#### Babel 的配置
Babel 的配置文件，如.babelrc，或者babel.config.js，用于指定 Babel 的行为。配置文件中可以指定预设（preset）和插件（plugin），以及其他选项。
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```