### 安装
```zsh
    npm install -g @vue/cli
```
### 项目创建
```zsh
    vue create hello-world
```
### 目录结构
> |- /node_modules //依赖包   
> |- /public //  静态资源
> &nbsp;&nbsp;&nbsp;|--  index.html //入口页面
> |- /src //目标文件夹      
> &nbsp;&nbsp;&nbsp;|--  /assets //静态资源
> &nbsp;&nbsp;&nbsp;|--  /components //公共组件        
> &nbsp;&nbsp;&nbsp;|--  App.vue //根页面   
> &nbsp;&nbsp;&nbsp;|--  main.js //根页面js文件   
> |- .env //全局默认配置文件，无论什么环境都会加载合并 
> |- .env.dev //开发环境全局变量    
> |- .env.prod //生产环境全局变量  
> |- .gitignore //Git配置文件  
> |- babel.config.js //webpack配置文件   
> |- package.json //依赖配置文件
> |- package-lock.json  //锁定的依赖配置文件  
> |- vue.config.js  //项目配置文件（可选）

### `Vue.config.js`配置
```js
module.exports = {
    //  基本路径
    publicPath: "./",
    //  构建时的输出目录
    outputDir: "dist",
    //  放置静态资源的目录
    assetsDir: "static",
    //  html 的输出路径
    indexPath: "index.html",
    //文件名哈希
    filenameHashing: true,
    //用于多页配置，默认是 undefined
    pages: {
        index: {
            // page 的入口文件
            entry: 'src/index/main.js',
            // 模板文件
            template: 'public/index.html',
            // 在 dist/index.html 的输出文件
            filename: 'index.html',
            // 当使用页面 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板文件默认是 `public/subpage.html`
        // 如果不存在，就回退到 `public/index.html`。
        // 输出文件默认是 `subpage.html`。
        subpage: 'src/subpage/main.js'
    },
    //  是否在保存的时候使用 `eslint-loader` 进行检查。
    lintOnSave: true,
    //  是否使用带有浏览器内编译器的完整构建版本
    runtimeCompiler: false,
    //  babel-loader 默认会跳过 node_modules 依赖。
    transpileDependencies: [ /* string or regex */ ],
    //  是否为生产环境构建生成 source map？
    productionSourceMap: true,
    //  设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    crossorigin: "",
    //  在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
    integrity: false,
    //  调整内部的 webpack 配置
    configureWebpack: () => {
       if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      } else {
        // 为开发环境修改配置...
      }
    }, 
    chainWebpack: () => {},
    // 配置webpack-dev-server行为(配置代理)。
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                // 代理的API地址
                target: "http://app.rmsdmedia.com",
                // 如果target的地址是一个域名 changeOrigin需要设置成true
                changeOrigin: true,
                // 不适应安全验证，允许本地使用https协议
                secure: false,
                // 打印代理日志
                logLevel: 'debug',
                // 路径重写，将替换api
                pathRewrite: {  
                    "^/api": ""
                },
                ws: true ,//  是否支持websocket协议
            },
            '/foo': {
                target: '<other_url>'
            }
        }, // string | Object
        before: app => {}
    },
    // CSS 相关选项
    css: {
        // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
        extract: true,
        // 是否开启 CSS source map？
        sourceMap: false,
        // 为预处理器的 loader 传递自定义选项。比如传递给
        // Css-loader 时，使用 `{ Css: { ... } }`。
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            }
        },
        // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        modules: false
    },
    // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,
    // PWA 插件的选项。
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
    pwa: {},
    // 三方插件的选项
    pluginOptions: {
    }
}
```
### `package.json`配置
```js
{
  "name": "jaqi.note",// 项目名
  "version": "0.1.0",// 项目版本
  "author":"jaqi.l"// 作者
  "private": true, // 项目是否私有
  "scripts": {  // 快捷脚本
// serve 模式配置
// --open    在服务器启动时打开浏览器
// --copy    在服务器启动时将 URL 复制到剪切版
// --mode    指定环境模式 (默认值：development)
// --host    指定 host (默认值：0.0.0.0)
// --port    指定 port (默认值：8080)
// --https   使用 https (默认值：false)
// build 模式配置
// --mode        指定环境模式 (默认值：production)
// --dest        指定输出目录 (默认值：dist)
// --modern      面向现代浏览器带自动回退地构建应用
// --target      app | lib | wc | wc-async (默认值：app)
// --name        库或 Web Components 模式下的名字 (默认值：package.json 中的 "name" 字段或入口文件名)
// --no-clean    在构建项目之前不清除目标目录
// --report      生成 report.html 以帮助分析包内容
// --report-json 生成 report.json 以帮助分析包内容
// --watch       监听文件变化
   "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": { // 生产依赖
     "vue": "2.6.11",//使用2.6.11版本
    "vue-template-compiler": "~2.6.11",//使用2.6.x版本
    "vuex": "^3.2.0", //使用3.x.x版本
    "jquery": "latest" //使用latest版本
  },
  "devDependencies": { // 开发依赖
  },
  "eslintConfig": { // ESLint 规则配置
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {
      "no-debugger": "off",//debugger 错误提示
      "no-console": "off", //console 错误提示

    }
  },
  "engines": { // 指定node、npm版本（仅起到一个说明的作用）
   "node": ">= 8.16.0",
   "npm": ">= 6.9.0"
  },
  "browserslist": [ // 项目的目标浏览器范围
    "> 1%",   // 兼容使用率大于1%的版本
    "last 2 versions", // 兼容最近的2个版本
    "not dead"
  ]
}
```

[package.json详解](https://zhuanlan.zhihu.com/p/384484213)
### `.env`文件
```js
NODE_ENV = 'development' // 运行模式 是 生产还是开发环境
VUE_APP_BASE_API = '/dev-api' // 基础路径
```
* 获取环境变量
```js
process.env.BASE_URL
```
:::tip npm install、npm i与npm ci的区别 
`npm install`:    
根据package文件安装依赖，根据package-lock确定版本，如果没有package-lock则生成package-lock   
`npm i`:       
根据package文件安装依赖，同时依据`^`或`~`升级相关依赖，并更新package-lock文件，不会生成npm-debug.log文件，卸载时需要使用`npm uninstall i`命令。      
`npm ci`:   
根据package文件安装依赖，根据package-lock确定版本没有则报错，不会更新依赖，也不会更新package-lock文件。    
:::
npm详见[1.1.4 npm（包管理工具）](/backend/node/#_1-1-4-包管理工具-npm)
:::tip
Vue CLI 4.x
:::