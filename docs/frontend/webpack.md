## 7.1 概念：
* 构建工具的作用：    
> 转换ES6语法   
> 转换JSX    
> CSS前缀、预处理器   
> 压缩混淆    
> 图片压缩    

* 常用构建工具的演变    
`ant+YUI Tool` → `grunt` → `fis3/gulp` → `rollup/parcel/webpack`

* `webpack`的原理  
`webpack`是一个现代`JavaScript`应用程序的静态模块打包工具。当`webpack`打包时，它根据`webpack.config.js`中的入口文件和配置，自动识别的规范（`CJS`、`ESM`、`AMD`等），并生成一个依赖图(`dependency graph`)，在根据依赖图进行转换、编译，打包最终的并生成一个或多个`bundle`

* 流程
1. 合并 `webpack.config.js` 和命令行传递的参数，形成最终的配置
2. 解析配置，得到 `entry` 入口
3. 读取入口文件代码，通过 `@babel/parse` 将入口代码转换成 `AST`
4. 通过 `@babel/traverse` 遍历 `AST` 得到模块的各个依赖
5. 通过 `@babel/core`（实际的转换工作是由 `@babel/preset-env` 来完成的）将 `AST` 转换成 `ES5`
6. 通过循环伪递归的方式拿到所有模块的所有依赖并都转换成 `ES5`

* 产物    
`webpack`会将代码编译成一个立即执行函数(`IIFE`)，并通过`__webpack_require__`函数加载和使用模块，它的参数是一个对象，对象的`key`是模块的路径，`value`为模块的可执行函数，异步模块则会单独打包，通过动态创建`script`标签实现异步加载

> 主体结构
>> ```js
>> (function (modules) {
>>   // xxxx
>> })({
>>   // xxx
>> })
>> ```

> 参数
>> ```js
>> {
>>   // src/index.js 模块
>>   "./src/index.js":
>>   (function (module, __webpack_exports__, __webpack_require__) {
>>     // xxx
>>   }),
>> 
>>   // ./src/moduleA.js 模块
>>   "./src/moduleA.js":
>>   (function (module, __webpack_exports__, __webpack_require__) {
>>     // xxx
>>   }),
>> 
>>   // /src/moduleB.js 模块
>>   "./src/moduleB.js":
>>   (function (module, __webpack_exports__, __webpack_require__) {
>>     // xxx
>>   })
>> }
>> ```


[Webpack 模块打包原理](https://lq782655835.github.io/blogs/project/webpack4-1.module.html) 

:::tip
webpack 4.x
:::
### 7.1.1 安装与使用
#### 安装：
* 5.x
```zsh
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack
```
* 4.x
```zsh
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack-cli
```
#### 目录：
 webpack-demo
> |- package.json //模块描述文件    
> |- webpack.config.js //插件配置文件   
> |- index.html //页面入口    
> |- /dist //打包存储文件夹   
> &nbsp;&nbsp;&nbsp;|--  bundle.js //目标文件   
> |- /src //目标文件夹    
> &nbsp;&nbsp;&nbsp;|-- index.js //目标文件   

#### 使用：
* 直接运行
node_modules/.bin/webpack.cmd 双击运行
* 通过npx命令运行
```zsh
npx webpack
```
* 在package.json中设置
```js
 "scripts": {
    "build":"webpack"
  }
```
```zsh
npm run build
```


## 7.2 配置详解
webpack可以无需使用任何配置文件。webpack会假定项目的入口起点为src/index，然后会在dist/main.js输出结果，并且在生产环境开启压缩和优化。
你的项目还需要继续扩展此能力，为此你可以在项目根目录下创建一个webpack.config.js 文件，webpack会自动使用它。
完整示例：
```js
const path = require('path');
module.exports = {
  mode: "production", // 模块
  entry: { //多入口配置
        index:'./src/index.js', 
        nav:'./src/nav.js',
    }, 
  output: { // 输出
    path: path.resolve(__dirname, "dist"), 
    // 输出目录dirnam表示当前目录，必须是绝对路径（使用Node.js 的path模块）
    filename: "bundle.js", // 入口文件名
    // 「入口分块(entry chunk)」的文件名模板
    publicPath: "/assets/", // 输出解析文件的目录，url 相对于 HTML 页面
    library: "MyLibrary", // 打包出的库名称,import引用时的名称
    libraryTarget: "umd", // 打包出的库类型
    libraryExport: "default",
  },
  module: {
    // 关于模块配置
    rules: [
      // 模块规则（配置 loader、解析器等选项）
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
        // test 和 include 具有相同的作用，都是必须匹配选项
        // exclude 是必不匹配选项（优先于 test 和 include）
        // 最佳实践：
        // - 只在 test 和 文件名匹配 中使用正则表达式
        // - 在 include 和 exclude 中使用绝对路径数组
        // - 尽量避免 exclude，更倾向于使用 include
        issuer: { test, include, exclude },
        // issuer 条件（导入源）
        enforce: "pre",
        enforce: "post",
        // 标识应用这些规则，即使规则覆盖（高级选项）
        loader: "babel-loader",
        // 应该应用的 loader，它相对上下文解析
        // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的
        // 查看 webpack 1 升级指南。
        options: {
          presets: ["es2015"]
        },
        // loader 的可选项
      },
      {
        test: /\.html$/,
        use: [
          // 应用多个 loader 和选项
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      },
      { oneOf: [ /* rules */ ] },
      // 只使用这些嵌套规则之一
      { rules: [ /* rules */ ] },
      // 使用所有这些嵌套规则（合并可用条件）
      { resource: { and: [ /* 条件 */ ] } },
      // 仅当所有条件都匹配时才匹配
      { resource: { or: [ /* 条件 */ ] } },
      { resource: [ /* 条件 */ ] },
      // 任意条件匹配时匹配（默认为数组）
      { resource: { not: /* 条件 */ } }
      // 条件不匹配时匹配
    ],
    /* 高级模块配置（点击展示） */
  },
  resolve: {
    // 解析模块请求的选项
    // （不适用于对 loader 解析）
    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // 用于查找模块的目录
    extensions: [".js", ".json", ".jsx", ".css"],
    // 使用的扩展名
    alias: {
      // 模块别名列表
      "module": "new-module",
      // 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"
      "only-module$": "new-module",
      // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"
      "module": path.resolve(__dirname, "app/third/module.js"),
      // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
      // 模块别名相对于当前上下文导入
    },
    /* 可供选择的别名语法（点击展示） */
    /* 高级解析选项（点击展示） */
  },
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 200000, // 整数类型（以字节为单位）
    maxEntrypointSize: 400000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: "source-map", // enum
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 牺牲了构建速度的 `source-map' 是最详细的。
  context: __dirname, // string（绝对路径！）
  // webpack 的主目录
  // entry 和 module.rules.loader 选项
  // 相对于此目录解析
  target: "web", // 枚举
  // bundle 应该运行的环境
  // 更改 块加载行为(chunk loading behavior) 和 可用模块(available module)
  externals: ["react", /^@angular\//],
  // 不要遵循/打包这些模块，而是在运行时从环境中请求他们
  serve: { //object
    port: 1337,
    content: './dist',
    // ...
  },
  // 构建日志配置
  stats: "errors-only",
  // 精确控制要显示的 bundle 信息
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },
  plugins: [
    // ...
  ],
  // 附加插件列表
  /* 高级配置（点击展示） */
  resolveLoader: { /* 等同于 resolve */ }
  // 独立解析选项的 loader
  parallelism: 1, // number
  // 限制并行处理模块的数量
  profile: true, // boolean
  // 捕获时机信息
  bail: true, //boolean
  // 在第一个错误出错时抛出，而不是无视错误。
  cache: false, // boolean
  // 禁用/启用缓存
  watch: true, // boolean
  // 启用观察
  watchOptions: {
    aggregateTimeout: 1000, // in ms
    // 将多个更改聚合到单个重构建(rebuild)
    poll: true,
    poll: 500, // 间隔单位 ms
    // 启用轮询观察模式
    // 必须用在不通知更改的文件系统中
    // 即 nfs shares（译者注：Network FileSystem，最大的功能就是可以透過網路，讓不同的機器、不同的作業系統、可以彼此分享個別的檔案 ( share file )）
  },
  node: {
    // Polyfills and mocks to run Node.js-
    // environment code in non-Node environments.
    console: false, // boolean | "mock"
    global: true, // boolean | "mock"
    process: true, // boolean
    __filename: "mock", // boolean | "mock"
    __dirname: "mock", // boolean | "mock"
    Buffer: true, // boolean | "mock"
    setImmediate: true // boolean | "mock" | "empty"
  },
  recordsPath: path.resolve(__dirname, "build/records.json"),
  recordsInputPath: path.resolve(__dirname, "build/records.json"),
  recordsOutputPath: path.resolve(__dirname, "build/records.json"),
  // TODO
}
```
### 7.2.1 入口`entry`
指示webpack应该使用哪个模块，来作为构建其内部依赖图(dependency graph) 的开始。
* 单入口    
```js
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
// 单入口可以简写
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```
* 多入口
```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
};
```
### 7.2.2 输出`output`
告诉webpack在哪里输出它所创建的bundle，以及如何命名这些文件。主要输出文件的默认值是`./dist/main.js`，其他生成文件默认放置在`./dist`文件夹中。注意即使可以存在多个entry起点，但只指定一个output配置。

* 单入口输出
```js
const path = require('path'); // node核心模块 path 用于用于处理文件路径

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 设置bundle输出路径
    filename: 'my-first-webpack.bundle.js'// 设置bundle的名称
  }
};
```
* 多入口输出
```js
const path = require('path'); 
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js', // 占位符name为入口文件的名字 例如app、search
    path:path.resolve(__dirname,'dist'),
  }
};
// 输出：./dist/app.js, ./dist/search.js
```
### 7.2.3 加载器`loader`
webpack只能理解JavaScript和JSON文件。loader让webpack能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。   

```zsh
npm install --save-dev raw-loader
npm install --save-dev css-loader
```
```js
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 设置bundle输出路径
    filename: 'my-first-webpack.bundle.js'// 设置bundle的名称
  },
  module: {
    rules: [
      // test属性用于表示那些文件需要转换  use表示需要用哪个loader
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/, use: 'css-loader' }
    ] 
  }
};
```
常用的loader：
> `babel-loader`:转换ES6/ES7等新JS语法    
> `css-loader`:打包css    
> `less-loader`:less转换成css   
> `ts-loader`:ts转换成js    
> `file-loader`:图片和字体等打包    
> `rea-loader`:将文件以字符串的形式打包   
> `thread-loader`:多进程打包js和css   
::: warning
相互依赖的loader，要按依赖顺序书写，上至下，左至右。
:::
#### 其他引用方式
* 内联
使用`!`为整个规则添加前缀，可以覆盖配置中的所有loader定义。
```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```
* CLI 
```js
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```
### 7.2.4 插件`plugins`
loader用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。
```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过npm安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```
常用的plugins：
> `CommonsChunkPlugin`:将chunks相同的模块代码提取成公共js   
> `CleanWebpackPlugin`:清理构建目录   
> `ExtractTextWebpackPlugin`:将css从bundle文件中独立出css文件   
> `CopyWebapckPlugin`:将文件或者文件夹拷贝到输出目录    
> `HtmlWebpackPlugin`:创建html文件去承载输出bundle    
> `UgligyjsWebpackPlugin`:压缩js    
> `ZipWebpackPlugin`:将打包出的资源生成一个zip包    
> `webpack-merge`合并webpack.config配置文件
### 7.2.5 模式`mode`
通过选择development,production或none之中的一个，来设置mode参数，你可以启用webpack内置在相应环境下的优化。其默认值为production。
* webpack.cofig.js文件
```js
module.exports = {
  mode: 'production'
};
```
* 也可以在package.json中设置
```js
 "scripts": {
    "build":"webpack --mode=production"
  }
```
### 7.2.6 浏览器兼容性`browser compatibility`
webpack 支持所有符合 ES5 标准 的浏览器（不支持 IE8 及以下版本）。webpack 的 import() 和 require.ensure() 需要 Promise。如果你想要支持旧版本浏览器，在使用这些表达式之前，还需要提前加载polyfill。
### 7.2.7 文件监听watch及
源代码发生变化是，自动重新构建打包。
* webpack.cofig.js文件
```js
module.exports = {
  watch: 'true'，
  watchOptions:{
    ignored:/node_modules/,// 忽略文件，支持正则
    aggregateTimeout:300, // 监听到变化后的延时时间
    poll:1000 //监听时间间隔
  }

};
```
* 也可以在package.json中设置
```js
 "scripts": {
    "build":"webpack --watch webpack-dev-server"
  }
```
### 7.2.8 文件指纹
`Hash`：和整个项目的构建相关，主要项目有文件修改，整个项目构建的hash值就会更改。
`Chunkhash`：和webpack打包的chunk有关，不同的entry会产生不同的chunkhash值
`Contenthash`：根据文件内容来定义hash，文件内容不变，则contenthash不变
```js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  output: {
      path: path.resolve(__dirname, 'dist'), 
      filename: '[name]_[chunkhash8].bundle.js' // js文件建议使用chunkhash，:8表示8位hash
  },
  module: {
    rules: [
      {test: /\.(png|svg|jpg|gif)$/,
          use: [{
                loader: 'file-loader',
                options: 
                {name:'img/[name]_[hash:8].[ext]'} // 图片字体等建议使用hash
              }
          ]
      }, 
      {
        test: /\.css|less$/,
        // 单独打包css文件时候要使用MiniCssExtractPlugin.loader去替换style-loader
        use: [MiniCssExtractPlugin.loader,'css-loader']  
      }
    ]
  }，
  plugins:[
    // 通过mini-css-extract-plugin插件将css文件单独提取出来
    new MiniCssExtractPlugin({ 
      filename:`[name]_[contenthash:8].css` //css文件建议使用contenthash
    })
  ],
}
```
### 7.2.9 摇树优化tree shaking
概念：一个模块的多个方法，只要有一个被使用了，整个模块就会被打包。`tree shaking`就是只打包用到的，没用到的，在`uglify`阶段去除掉。
使用：webpack默认支持，只需要在.babelrc里设置modules:false即可。
要求：必须是ES6的语法，CJS的方法不支持。
> 1. 去除无用的css文件：`purgecss-webpack-plugin`
### 7.4.10 ScopeHoisting
概念：将所有模块的代码根据引用的顺序，适当重命名后放在一个函数作用域里，以减少函数声明代码和内存的开销。
使用：mode为production时默认开启。
要求：必须是ES6的语法，CJS的方法不支持。
### 7.4.11 代码分割
概念：将代码分割，当相应的代码运行时再进行代码加载。
使用：
> CJS:require.ensure
> ES6:动态import（ES2020、需要babel转译）
>> babel转译:
>>> 安装：`npm i @babel/plugin-syntax-dynamic-import --save-dev`
>>> 使用：
>>>> .babelrc
>>> `js
>>> {
>>> "plugins":["@babel/plugin-syntax-dynamic-import"]
>>> }
>>> `
### 7.4.12 构建日志、构建异常和中断处理
`stats`参数：
> `errors-only`:只在发生错误时输出
> `minimal`:只在发生错误或有新的编译时输出。
> `none`:没有输出
> `normal`:标准输出
> `verbose`:全部输出
```js
module.exports = {
    stats:'errors-only' // 构建日志配置
}
```
查看构建错误码：
> 0表示成功,非0失败
> ```zsh
> ECHO $?
> ```
::: tip
`friendly-errors-webpack-plugin`构建日志优化工具
:::

## 7.3 常用lader指南
### 7.3.1 打包ES6
插件：`npm i babel-loader @babel/core  @babel/preset-env -D`
配置：    
webpack.cofig.js文件：
```js
const path = require('path')
module.exports = {
    entry: {
        app: './src/index.js',
      },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    mode:'production',
    module: {
      rules: [
        { test: /\.js$/, use: 'babel-loader' }
      ] 
  }
}
```
.babelrc：文件
```js
{
  "presets":[
    "@babel/preser-env"，
     "@vue/app"
  ],
  "plugins":[
    "@babel/proposal-class-properties"
  ]
}
```
### 7.3.2 打包css
插件：`npm i style-loader，css-loader -D`

配置：    
webpack.cofig.js
```js
module: {
 rules:[{
  test: /\.css$/,//正则表达式以css为结尾
  use: ['style-loader','css-loader']  //按顺序从右往左
 }]
}
```
### 7.3.3 打包less
插件：`npm i style-loader css-loader less less-loader -D`

配置：    
webpack.cofig.js
```js
module: {
 rules:[
  {
  test: /\.less$/,
  use: ['style-loader','css-loader','less-loader']  //按顺序从右往左
 }]
}
```
### 7.3.4 打包图片/字体
* 通过`file-loader`打包
插件：`npm i file-loader -D`

配置：    
webpack.cofig.js
```js
module: {
 rules:[
  {test: /\.(png|svg|jpg|gif)$/,use:'file-loader'}, //打包图片
  {test: /\.(ttf|woff|woff2|otf|eot)$/,use:'file-loader'} //打包字体
  ]
}
```
* 通过`url-loader`转成base64，用于打包较小的资源，
插件：`npm i url-loader -D`

配置：    
webpack.cofig.js
```js
module: {
    rules: [
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1024
                    }
                }
            ]
        }, //打包图片
        {
            test: /\.(ttf|woff|woff2|otf|eot)$/, use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1024
                    }
                }
            ]
        } //打包字体
    ]
}
```

:::tip 哈希文件名的好处
* 如果发布新版本，发现用户正在浏览老网页，需要刷新一次才能看见新版本。发布新版时会把老目录删除，然后覆盖新文件。
* 增量覆盖：保留原来的文件，避免旧文件被覆盖无法访问。
:::
### 7.3.5 自动补齐浏览器前缀
插件：`npm i postcss-loader autoprefixer -D`
配置：

webpack.cofig.js文件：
```js
module: {
 rules:[
  {
  test: /\.css$/,
  use: ['style-loader',{
    loader:'postcss-loader',
    options:{
      plugins:()=>[
        require('autoprefixer')({
          browsers:['last 2 version', '>1%','ios 7'] // 兼容最近的2个版本，兼容使用率大于2%，兼容 ios7 的版本
        })
      ]
    }
  }]
 }]
}
```
### 7.3.6 rem转换px2rem-loader、lib-flexible库
插件：`npm i px2rem-loader -D`/`npm i lib-flexible -S`

配置：    
webpack.cofig.js
```js
module: {
 rules:[
  {
  test: /\.css$/,
  use: ['style-loader','css-loader',{
    loader:'px2rem-loader',
    options:{
      remUnit:75,  // 转换系数，1rem = 75px
      remPrecesion:8 // 转换时的精准度，小数点后8位
    }
  }]
 }]
}
```
main.js
```js
import 'lib-flexible'
```
viewprot设置
```js
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1.0,maximum=scale=1.0">
```
:::tip
`lib-flexible`库制度根据设备计算font-size
:::
### 7.3.7 资源的内联raw-loader
插件：`npm i raw-loader@0.5.1 -D`
优点：减少http请求，避免页面闪动。
* html内联：
```html
<head>${require('raw-loader!babel-loader!./meta.html')}</head>
```
* js内联：
```js
<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>
```
* css内联：
1. 通过`style-loader`
2. `html-inline-css-webpack-plugin`
### 7.3.8 ESLint规范eslint-loader
插件：`npm i eslint-loader babel-eslint --save-dev`
配置：    
webpack.cofig.js文件：
```js
module.exports = {
    module: {
      rules: [
        { test: /\.js$/, use: ['babel-loader','eslint-loader']}
      ] 
  }
}
```
.eslintrc.js：文件
```js
module.exports = {
   "parser": "babel-eslint"
    "extends": [ // 继承基础配置规则
        'plugin:vue/essential',
    ],
    "env":{  // 配置环境变量
      "browser":true,
      "node":true,
    }
    "rules": { // 配置规则
      "indent":["error",4] //配置缩进规则为4个空格
    },
}
```
* 进行eslint检查：
在package.json中设置
```js
 "scripts": {
    "eslint":"eslint --fix"
  }
```
### 7.3.9 SSR打包
webpack.ssr.js
```js
if(typeof window === 'undefined'){
    global.window = {}
}
const path = require('path')
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    entry: {
        app: './src/index.js',
      },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name]-server.js',
        libraryTarget: "umd", // 打包出的库类型
    },
    mode:'production',
    module: {
      rules: [
        { test: /\.js$/, use: 'babel-loader' }
      ] 
  }
}
```
在package.json中设置
```js
 "scripts": {
    "build:ssr":"webpack --config webpack.ssr.js"
  }
```
::: warning  打包SSR存在的问题：
node.js中没有document,window
fetch或ajax请求要改写成isomorphic-fetch或axios
`style-loader`替换成`isomorphic-style-loader`或直接忽略css的解析
:::
### 7.3.10 打包Vue
插件：vuevue-loadervue-template-compiler

配置：

index.js文件:
```js
import Vue from "vue";

import App from "./App.vue";

new Vue({

el:"#app",

render:c=>c(App)

});

```

App.vue文件:
```html

<template>

<div>

我是App组件

</div>

</template>

<script>

export default {

data(){

return {

}

}

}

</script>

<style>
</style>
```
webpack.config.js文件:
```js
const VueLoaderPlugin = require("vue-loader/lib/plugin");

plugins:[new VueLoaderPlugin()]
```
### 7.3.11 自定义插件
#### 引用方法一：
webpack.cofig.js文件：
```js
module: {

rules:[{

test: /\.js$/,

use:[path.resolve('./src/loader/myloader')],}

}]
```
#### 引用方法二：
将自定义插件的文件放入node_modules文件中

webpack.cofig.js文件：
```js
module: {

rules:[{

test: /\.js$/,

use:['myloader']

}]}
```
#### 引用方法三：
webpack.cofig.js文件：
```js
resolveLoader:{
  modules:[path.resolve("./src/loader"),path.resolve("./node_modules")],
}

module: {
  rules:[{
    test: /\.js$/,
    use:['myloader']
  }]
}
```
### 7.3.12 常用插件

## 7.4 常用plugins指南
### 7.4.1 热更新webpack-dev-server
插件：`npm i webpack-dev-server -g`
* webpack.cofig.js文件
```js
  plugins: [
      new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    contentBase:'./dist',
    hot:true
  }
```
在package.json中设置
```js
 "scripts": {
    "dev":"webpack-dev-server --open"
  }
```
* 远程热更新webpack-dev-middleware
### 7.4.2 html文件的编译、压缩Html-webpack-plugin
插件：`npm i html-webpack-plugin --save-dev`
作用：根据配置的html产生一个引入打包后文件的html
配置：

webpack.cofig.js文件：
```js
const Htmlwebpackplugin = require("html-webpack-plugin");//引入插件
plugins: [
	new Htmlwebpackplugin({
		template: "./src/index.html", //模板
		filename: "index.html", // 打包出来的文件名
		inject: 'body', // 路径放置位置 head/body 
		title: 'this is index', //打包后的htmltitle
		minify: {  //html设置压缩参数
      html5:true,
      collapseWhitespace: true,
			preserveLineBreaks:false,
      minifyCSS:true,
      minifyJS:true,
      removeComments: true,
		},
		chunks: ['index'],// 指定chunks
		excludeChunks: [],//排除chunks
	}),
]
```
Index.html文件：
```html
<%= htmlWebpackPlugin.options.title%> //获取htmlWebpackPlugin下的title的数据 
<script src="<%= htmlWebpackPlugin.files.chunks.index.entry%>"></script>
```
### 7.4.3 多页面打包html-webpack-plugin、glob
一个页面对应一个`entry`、一个`html-webpack-plugin`    
优势：利于SEO   
缺点：每次新增或删除页面都需要配置webpack,利用`glob-sync`可以解决这个问题   
`npm i  glob -D`
```js
'use strict'
const path = require('path')
const glob = require('glob')
const htmlWebpackPlugin = require('html-webpack-plugin');
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    console.log(pageName,1111,entryFile)
    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        template: path.join(__dirname,`src/${pageName}/index.html`), //模板
        filename: `${pageName}.html`, // 打包出来的文件名
        inject: 'body', // 路径放置位置 head/body 
        minify: {  //html设置压缩参数
        chunks: [pageName],// 指定chunks
          html5: true, 
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
        },
      }),
    );
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}
const {entry,htmlWebpackPlugins} = setMPA(); 
module.exports = {
  entry:entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash:8].js'
  },
  mode: 'production',
  plugins: [].concat(htmlWebpackPlugins)
}
```
### 7.4.4 js文件压缩terser-webpack-plugin
`uglifyjs-webpack-plugin:webpack`4.x已内置，不支持ES6语法,不建议新项目使用。
`terser-webpack-plugin`5.x已内置,4.x需要单独安装。
插件：`npm i terser-webpack-plugin --save-dev`
```js
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
       new TerserPlugin({    
        test: /\.js(\?.*)?$/i, // 通过正则匹配要压缩的文件
        include: /\/includes/, // 指定要压缩的文件
         exclude: /\/excludes/, // 排除文件
      }),
    ],
  },
};
```
### 7.4.5 css文件压缩optimize-css-assets-webpack-plugin/cssnano
插件：`npm i optimize-css-assets-webpack-plugin --save-dev`/`npm i cssnano --save-dev`
```js
const Htmlwebpackplugin = require("optimize-css-assets-webpack-plugin");
const Htmlwebpackplugin = require("cssnano");
module.exports={
	entry:{
		app:'./src/app.js',
		search:'./src/search.js'
	},
	output:{
		filename:'[name][chunkhash:8].js',
		path:__dirname+'./dist'
	},
	Plugins:[
		new OptimizeCssAssetsPlugin({
			assetNameRegExp:/\.css$/g,
			cssProcessor:require('cssnano')
		})
	]
}
```
### 7.4.6 自动清理构建目录clean-webpack-plugin
插件：`npm i clean-webpack-plugin -D`
```js
const Htmlwebpackplugin = require("clean-webpack-plugin");
module.exports={
	entry:{
		app:'./src/app.js',
		search:'./src/search.js'
	},
	output:{
		filename:'[name][chunkhash:8].js',
		path:__dirname+'./dist'
	},
	Plugins:[
		new CleanWebpackPlugin()
	]
}
```
也可以使用`rimraf`插件清理构建目录
### 7.4.7 source map
作用：通过source map定位到源代码。
source map关键字：
> `eval`：使用`eval`包裹模块代码。
> `source map`产生.map文件
> `cheap`不包含代码的所在列信息
> `inline`将.map做为DataURI嵌入，不单独生成.map文件
> `module`包含loader的sourcemap
source map类型：
```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过npm安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  entry: {
      app: './src/index.js',
  },
  output:{
      path:path.resolve(__dirname,'dist'),
      filename:'[name].js'
  },
  mode:'production',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ] 
  },
  devtool:'eval' // eval\source-map\inline-source-map\cheap-source-map
};
```

:::warning
线上环境排查问题时可以开启，否则要关闭source map，否则会暴露源代码。
:::
### 7.4.8 基础库的分离html-webpack-externals-plugin/SplitChunksPlugin
* `html-webpack-externals-plugin`
插件：`npm i html-webpack-externals-plugin -D`
```js
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
module.exports={
	Plugins:[
		new HtmlWebpackExternalsPlugin({
      externals:[
        {
          module:'react',
          entry:'dist/jquery.min.js', //可以是本地也可以是cdn文件
          global:'React',
        },
        {
          module:'react-dom',
          entry:'dist/jquery.min.js',//可以是本地也可以是cdn文件
          global:'ReactDom',
        }
      ]
    })
	]
}
```
* `SplitChunksPlugin`
```js
module.exports={
optimization: {
    splitChunks: {
      chunks: 'async', //三选一："initial" 初始化，"all"(默认就是all)，"async"（动态加载） 
      minSize: 30000,  // 形成一个新代码块最小的体积,只有 >= minSize 的bundle会被拆分出来
      maxSize: 0, //拆分之前最大的数值，默认为0，即不做限制
      minChunks: 1, //引入次数，如果为2 那么一个资源最少被引用两次才可以被拆分出来
      maxAsyncRequests: 5,// 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
```

## 7.5 进阶用法

### 7.5.1 构建配置抽离成npm包
意义：统一构建脚本，开发者无需在关注构建配置。合理的抽离拆分，编辑维护管理。
通过多个配置文件管理不同环境的配置文件。
> `webpack.base.js`:基础包
> `webpack.dev.js`开发环境包
> `webpack.prod.js`生成环境包
> `webpack.ssr.js`ssr环境包
合并配置包`webpack-merge`
```js
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');.
const prodConfig = require('./webpack.prod');
module.exports = merge(baseConfig,prodConfig)
```
### 7.5.2 构建测试
* 冒烟测试
指提交测试之前开发人员进行的预测试。主要排查基本功能是否可用。
> 构建是否成功。
> 构建目录是否有js、css、html等文件输出。
单元测试工具：`mocha`+`chai`
1. 安装:`npm i mocha chai -D`
2. 创建test目录，增加test.js测试文件
3. 在package.json中设置
```js
 "scripts": {
    "test":"node_modules/mocha/bin/_mocha"
  }
```
4. 执行测试`npm run test`
* 持续集成
代码在合并主干之前，根据测试用例进行自动化测试，主要有一个测试用例失败，就不能集成。
优点：快速发现错误，防止分支大幅偏离主干。
持续集成工具：`Travis CI`
1. https://travis-ci.org/ 使用github账号登陆
2. 在github创建项目、将项目同步到travis-ci。
3. 项目的根目录下创建.travis.yml,内容如下：
```js
language:node_js  // 语音
sudo:false  // 管理员权限
cache:
  app:true // 是否需要缓存
  directories:
    -node_modules

node_js:stable  // node版本

install:
  - npm install -D // 安装构建依赖
  - cd /test/template-project
  - npm install -D  // 安装模板项目依赖
script:
 - npm test
```
4. 提交代码，travis-ci会自动根据测试用例进行测试。
### 7.5.3 构建优化
* 构建统计`stats`（颗粒度比较粗，不容易看出问题）
在package.json中使用`stats`
```js
 "scripts": {
    "build:stats":"webpack--env production --json > stats.json"
  }
```
* 构建速度分析`speed-measure-webpack-plugin`
`npm i speed-measure-webpack-plugin`
```js
const speedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new speedMeasureWebpackPlugin();
module.exports= smp.wrap({
	entry:{
		app:'./src/app.js',
		search:'./src/search.js'
	},
	output:{
		filename:'[name][chunkhash:8].js',
		path:__dirname+'./dist'
	},
})
```
* 构建体积分析`webpack-bundle-analyzer`
`npm i webpack-bundle-analyzer -D`
```js
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const smp = new speedMeasureWebpackPlugin();
module.exports={
		Plugins:[
		new BundleAnalyzerPlugin()
	]
}
```

* 速度优化
1. 使用高版本的webpack和node.js
2. 多进程多实例构建`thread-loader`(webpack 4.x内置)/`paraller-webpack`/`HappyPack`（不维护了）
> `thread-loader`:
> ```js
> module.exports = {
>     module: {
>       rules: [
>         { test: /\.js$/, use: 'thread-loader' }
>       ] 
>   }
> }
> ```
3. 多进程多实例并行压缩`parallel-uglify-plugin`/`uglifyjs-webpack-plugin`(不支持压缩ES6语法)/`terser-webpack-plugin`(webpack 4.x内置)
> `terser-webpack-plugin`:详见[7.8.4](/frontend/webpack#_7-4-4-js文件压缩terser-webpack-plugin)
4. 分包`html-webpack-externals-plugin`（对业务包不友善）/`DLLPlugin`预编译资源模块（将基础包和业务包打包成一个文件）
> `html-webpack-externals-plugin`:详见[7.4.8](/frontend/webpack#_7-4-8-基础库的分离html-webpack-externals-plugin-splitchunksplugin)
> `DLLPlugin`:
> webpack.config.dll.js文件：
> ```js
> const webpack = require('webpack')
> module.exports = {
>   entry:{
>     library:[
>       'react',
>       `react-dom`
>     ]
>   },
>   output:{
>     filename:'[name]-[chunkhash].dll.js',
>     path:path.join(__dirname,'build/library'),
>     library:'[name]'
>   }
>   plugins:[
>     new webpack.DLLPlugin({
>       name:'[name]_[hash]',
>        path:path.join(__dirname,'build/library/[name].json'),
>     })
>   ]
> }
> ```
> webpack.config.js文件：
> ```js
> module.exports = {
>   plugins:[
>     new webpack.DLLReferencePlugin({
>        manifest:require('./build/library/library.json'),
>     })
>   ]
> }
> ```
5. 缓存：提升二次构建速度`babel-loader`/`terser-webpack-plugin`/`cache-loader`或`hard-source-webpack-plugin`
> `babel-loader`:
> ```js
> module.exports = {
>     module: {
>       rules: [
>         { test: /\.js$/, use: 'babel-loader?cacheDirectory=true' }
>       ] 
>   }
> }
> ```
> `terser-webpack-plugin`:
> ```js
>module.exports = {
>  optimization: {
>    minimize: true,
>    minimizer: [
>       new TerserPlugin({    
>        test: /\.js(\?.*)?$/i, // 通过正则匹配要压缩的文件
>        include: /\/includes/, // 指定要压缩的文件
>        exclude: /\/excludes/, // 排除文件
>        paraller:true, // 开启多进程多实例并行压缩
>        cache:true // 开启缓存
>      }),
>    ],
>  },
>};
> ```
> 缓存文件存放在`node_modules/.cache`
6. 缩小构建目标
> 利用`alias`优化路径，减少文件查找。

* 体积优化
1. 图片压缩基于node库的`imagemin`或tinypng API
> `imagemin`优点：定制配置丰富，可以引入第三方插件（例如：pngquant），可以处理多种格式。
> ```js
> rules: [{
>   test: /\.(gif|png|jpe?g|svg)$/i,
>   use: [
>     'file-loader',
>     {
>       loader: 'image-webpack-loader',
>       options: {
>         mozjpeg: { //jpeg格式
>           progressive: true,
>         },
>         optipng: { //png格式
>           enabled: false,
>         },
>         pngquant: {  //png格式
>           quality: [0.65, 0.90],
>           speed: 4
>         },
>         gifsicle: {  //gif格式
>           interlaced: false,
>         },
>         webp: {  //webp格式
>           quality: 75
>         }
>       }
>     },
>   ],
> }]
> ```
2. 摇树优化tree shaking详见[7.2.9](/frontend/webpack#_7-2-9-摇树优化tree-shaking)
3. 动态Polyfill服务
> polyfill服务原理：识别浏览器User Agent下发不同的polyfill。[polyfill在线识别服务](https://polyfill.io/v3/polyfill.min.js)
4. ScopeHoisting[7.4.10](/frontend/webpack#_7-4-10-scopehoisting) 