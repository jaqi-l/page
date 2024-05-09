## 6.16.1 概述

`Vite` 基于 `Rollup`(打包和模块化) 和 `esbuild`(预构建) 实现的构建工具

### 安装
```zsh
    npm install vite
```
### 项目创建
```zsh
    pnpm create vite
```

## 6.16.2 功能

### ES Modules

### CSS Modules
`Vite` 可以导入以`.module.css`为后缀的 `CSS` 文件

```css
/* example.module.css */
.red {
  color: red;
}
```

```js
import classes from './example.module.css'
document.getElementById('foo').className = classes.red
```

::: tip
导入的`CSS Modules`样式会自动注入到页面中，可以通过 `?inline` 参数来关闭
```js
import './foo.css' // 样式将会注入页面
import otherStyles from './bar.css?inline' // 样式不会注入页面
```
:::

### 静态资源处理

#### 图片
```js
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl

// 显式加载资源为一个 URL
import assetAsURL from './asset.js?url'

// 以字符串形式加载资源
import assetAsString from './shader.glsl?raw'

// 加载为 Web Worker
import Worker from './worker.js?worker'

// 在构建时 Web Worker 内联为 base64 字符串
import InlineWorker from './worker.js?worker&inline'
```

#### JSON
```js
// 导入整个对象
import json from './example.json'
// 对一个根字段使用具名导入 —— 有效帮助 treeshaking！
import { field } from './example.json'
```

#### Glob
`Vite` 支持使用特殊的 `import.meta.glob` 函数从文件系统导入多个模块

```js
const modules = import.meta.glob('./dir/*.js')

// 使用
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod)
  })
}


// vite 编译后的代码
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js'),
}
```
* 默认导入的文件是懒加载的，如果想直接导入通过附加参数设置
```js
const modules = import.meta.glob('./dir/*.js', { eager: true })

// vite 编译后的代码
import * as __glob__0_0 from './dir/foo.js'
import * as __glob__0_1 from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1,
}
```

* 多个匹配模式
```js
// { as: 'url' } 还支持将资源作为 URL 加载。
const modules = import.meta.glob('./dir/*.js', { as: 'raw', eager: true }) 

// vite 编译后的代码
const modules = {
  './dir/foo.js': 'export default "foo"\n',
  './dir/bar.js': 'export default "bar"\n',
}
```
* 多个匹配模式
```js
const modules = import.meta.glob(['./dir/*.js', './another/*.js'])
```
* 反面匹配模式
```js
const modules = import.meta.glob(['./dir/*.js', '!**/bar.js'])
```
* 具名导入
```js
const modules = import.meta.glob('./dir/*.js', { import: 'setup' })
```

* 自定义查询
```js
const modules = import.meta.glob('./dir/*.js', {
  query: { foo: 'bar', bar: true },
})

// vite 编译后的代码
const modules = {
  './dir/foo.js': () => import('./dir/foo.js?foo=bar&bar=true'),
  './dir/bar.js': () => import('./dir/bar.js?foo=bar&bar=true'),
}
```

#### 动态导入

```js
const module = await import(`./dir/${file}.js`)
```

#### WebAssembly

#### Web Workers

* 通过构造器导入
```js
const worker = new Worker(new URL('./worker.js', import.meta.url))
```
* 带有查询后缀的导入
```js
import MyWorker from './worker?worker'

const worker = new MyWorker()
```

## 6.16.3 配置

* 基础场景
```js
// command 命令mode 模式 ssrBuild是否是ssr
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
    }
  }
})

// 与vue/cli不同的是，vite默认不加载.env ,所以不能通过process.env.NODE_ENV获取环境，如果确实需要可以使用loadEnv加载指定.env文件

import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 配置
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})
```

* 异步场景
```js
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // vite 配置
  }
})
```

### 通用配置项
* `root`:项目根目录
* `base`:公共基础路径
* `mode`:构建模式(默认 development)
* `define`
* `plugins`:需要用到的插件数组
* `publicDir`:静态资源服务、目录
* `cacheDir`:预构建缓存文件的目录
* `resolve.alias`:别名
* `resolve.dedupe:`:
* `resolve.conditions`:
* `resolve.mainFields`:
* `resolve.browserField`:
* `resolve.extensions`:
* `resolve.preserveSymlinks`:
* `css.modules`:
* `css.postcss`:
* `css.preprocessorOptions`:
* `css.devSourcemap`:
* `css.transformer`:
* `css.lightningcss`:
* `json.namedExports`:
* `json.stringify`:
* `esbuild`: esbuild转换选项
* `assetsInclude`:
* `logLevel`:调整控制台输出的级别
* `customLogger`:
* `clearScreen`:设置项目重载的时候是否清空终端中打印的信息
* `envDir`:.env 文件的目录
* `envPrefix`:设置将环境变量暴雷给客户端源码(默认 VITE_)
* `appType`应用类型
> `spa`:单页应用    
> `mpa`:多页应用    
> `custom`:无页面应用
### 服务配置项
* `server.host`:服务器IP地址(默认 localhost)
* `server.port`:服务器端口
* `server.strictPort`:端口被占用后的行为
* `server.https`:启用 TLS + HTTP/2
* `server.open`:服务器启动自动打开浏览器
* `server.proxy`:自定义代理
* `server.cors`:跨域资源访问
* `server.headers`:服务器headers
* `server.hmr`:
* `server.watch`:监听文件的修改自动编译
* `server.middlewareMode`:
* `server.fs.strict`:限制访问工作区root意外的文件
* `server.fs.allow`:
* `server.fs.deny`:
* `server.origin`:
* `server.sourcemapIgnoreList`:
### 构建配置项
* `build.target`:设置构建物的浏览器兼容目标
* `build.modulePreload`:模块预加载
* `build.outDir`:指定输出路径
* `build.assetsDir`:指定静态资源输出路径
* `build.assetsInlineLimit`:根据此阈值判断导入资源是否转译为base64 编码，以避免额外的 http 请求。0表示禁用此项。
* `build.cssCodeSplit`:是否开启CSS 代码拆分功能
* `build.cssTarget`:设置css的浏览器兼容目标
* `build.cssMinify`:
* `build.sourcemap`:是否生成 source map 文件
* `build.rollupOptions`:Rollup转换选项
* `build.commonjsOptions`:
* `build.dynamicImportVarsOptions`:
* `build.lib`:
* `build.manifest`:是否生成 manifest.json 文件
* `build.ssrManifest`:是否生成 SSR 的 manifest.json 文件
* `build.ssr`:面向 SSR 进行构建
* `build.minify`:
* `build.terserOptions`:
* `build.write`:
* `build.emptyOutDir`:
* `build.copyPublicDir`:
* `build.reportCompressedSize`:
* `build.chunkSizeWarningLimit`:
* `build.watch`:是否开启 rollup 监听器
### 预判配置项

* `preview.host`:
* `preview.port`:
* `preview.strictPort`:
* `preview.https`:
* `preview.open`:
* `preview.proxy`:
* `preview.cors`:
* `preview.headers`:


### 优化配置项
* `optimizeDeps.entries`:
* `optimizeDeps.exclude`:
* `optimizeDeps.include`:
* `optimizeDeps.esbuildOptions`:
* `optimizeDeps.force`:
* `optimizeDeps.disabled`:
* `optimizeDeps.needsInterop`:
### SSR配置项
### Worker配置项

### 环境变量和模式
```js
// .env
NODE_ENV='development'  // 运行模式 是 生产还是开发环境，默认是通过.env.development区分环境，也可以在这里修改
VITE_APP_BASE_URL='/dev-api'  // 基础路径
VITE_APP_BASE_NAME='vite测试项目' // 基础名称
```
* 获取环境变量
```js
import.meta.env 
// 响应
// {
//     "VITE_APP_BASE_URL": "/api",
//     "VITE_APP_BASE_NAME": "'vite测试项目'  // 基础名称",
//     "VITE_USER_NODE_ENV": "development",
//     "BASE_URL": "/",
//     "MODE": "development",
//     "DEV": true,
//     "PROD": false,
//     "SSR": false
// }
```
### 配置案例
* `vite.config.js`,基于`ElementPlus`
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: './',
   //  构建
  build: {
    outDir: 'dist', //指定打包输出路径
    assetsDir: 'assets', //指定静态资源存放路径
    cssCodeSplit: true, //css代码拆分,禁用则所有样式保存在一个css里面
    sourcemap: false, //是否构建source map 文件

    // 生产环境取消 console
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },

    //会打包出 css js 等文件夹 目录显得清晰
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 9090,
    strictPort: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'https://jaqi.gitee.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'database_json')
      },
    },
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, 'src'),
      '@views':path.resolve(__dirname, "src/views"),
      '@router': path.resolve(__dirname, "src/router"),
      '@store': path.resolve(__dirname, "src/store")
    }
  },
  css: {
    devSourcemap: true,
  },
})
```
* `package.json`
```js
{
  "name": "vite-project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "serve:dev": "vite --mode development",
    "serve:prod": "vite --mode production",
    // serve 模式配置
    // --host [host]	指定主机名称 (string)
    // --port <port>	指定端口 (number)
    // --https	使用 TLS + HTTP/2 (boolean)
    // --open [path]	启动时打开浏览器 (boolean | string)
    // --cors	启用 CORS (boolean)
    // --strictPort	如果指定的端口已在使用中，则退出 (boolean)
    // --force	强制优化器忽略缓存并重新构建 (boolean)
    // -c, --config <file>	使用指定的配置文件 (string)
    // --base <path>	公共基础路径（默认为：/）(string)
    // -l, --logLevel <level>	Info | warn | error | silent (string)
    // --clearScreen	允许或禁用打印日志时清除屏幕 (boolean)
    // -d, --debug [feat]	显示调试日志 (string | boolean)
    // -f, --filter <filter>	过滤调试日志 (string)
    // -m, --mode <mode>	设置环境模式 (string)
    // -h, --help	显示可用的 CLI 选项
    // -v, --version	显示版本号
    "build": "vite build --mode production",
    // build 模式配置
    // --target <target>	编译目标（默认为："modules"）(string)
    // --outDir <dir>	输出目录（默认为：dist）(string)
    // --assetsDir <dir>	在输出目录下放置资源的目录（默认为："assets"）(string)
    // --assetsInlineLimit <number>	静态资源内联为 base64 编码的阈值，以字节为单位（默认为：4096）(number)
    // --ssr [entry]	为服务端渲染配置指定入口文件 (string)
    // --sourcemap [output]	构建后输出 source map 文件（默认为：false）(boolean | "inline" | "hidden")
    // --minify [minifier]	允许或禁用最小化混淆，或指定使用哪种混淆器（默认为："esbuild"）(boolean | "terser" | "esbuild")
    // --manifest [name]	构建后生成 manifest.json 文件 (boolean | string)
    // --ssrManifest [name]	构建后生成 SSR manifest.json 文件 (boolean | string)
    // --force	强制优化器忽略缓存并重新构建（实验性）(boolean)
    // --emptyOutDir	若输出目录在根目录外，强制清空输出目录 (boolean)
    // -w, --watch	在磁盘中模块发生变化时，重新构建 (boolean)
    // -c, --config <file>	使用指定的配置文件 (string)
    // --base <path>	公共基础路径（默认为：/）(string)
    // -l, --logLevel <level>	Info | warn | error | silent (string)
    // --clearScreen	允许或禁用打印日志时清除屏幕 (boolean)
    // -d, --debug [feat]	显示调试日志 (string | boolean)
    // -f, --filter <filter>	过滤调试日志 (string)
    // -m, --mode <mode>	设置环境模式 (string)
    // -h, --help	显示可用的 CLI 选项
    "preview": "vite preview"
    //  preview 模式配置
    // --host [host]	指定主机名称 (string)
    // --port <port>	指定端口 (number)
    // --strictPort	如果指定的端口已在使用中，则退出 (boolean)
    // --https	使用 TLS + HTTP/2 (boolean)
    // --open [path]	启动时打开浏览器 (boolean | string)
    // --outDir <dir>	输出目录（默认为：dist)(string)
    // -c, --config <file>	使用指定的配置文件 (string)
    // --base <path>	公共基础路径（默认为：/）(string)
    // -l, --logLevel <level>	Info | warn | error | silent (string)
    // --clearScreen	允许或禁用打印日志时清除屏幕 (boolean)
    // -d, --debug [feat]	显示调试日志 (string | boolean)
    // -f, --filter <filter>	过滤调试日志 (string)
    // -m, --mode <mode>	设置环境模式 (string)
    // -h, --help	显示可用的 CLI 选项
  },
  "dependencies": {
  },
  "devDependencies": {
  }
}
```

## 6.16.4 TypeScript

* 安装依赖：
```zsh
pnpm install typescript -D
pnpm install vue-tsc -D
```

* 配置`tsconfig.json`：   

详见：[3.17.4 vite项目配置案例](/frontend/javascript/TypeScript#vite项目配置案例)

* * 配置`package.json`：
```json
  "main": "src/main.ts",
  "module": "src/main.ts",
  "scripts": {
    "dev": "vue-tsc && vite", // 运行时进行类型检查
    "build": "vue-tsc && vite build " // 打包时进行类型检查
  },
```

:::tip
Vite 4.x
:::