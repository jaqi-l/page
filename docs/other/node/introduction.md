# 7.1 node.js概述
`Node.js`是`JavaScript`服务器端运行时环境，`Node.js` 建立在 `Google Chrome V8 JavaScript` 引擎之上，不依赖第三方应用（`Apache`）,可以基于`Api`自己实现。    
`Node.js`应用在单个进程中运行，在其标准库中提供了一组异步 `I/O` 原语，以防止 JavaScript 代码阻塞。    

* 优势：前端入手、性能高、利于与前端代码整合。
* 劣势：安全和稳定性没有传统语言高。

`node.js`一般做中间层(更安全)：
> 客户端-------->服务器端客户端------>node.js-----服务器 

* 主流`JavaScript`运行时对比

| 功能                     | `Node`                    | `Deno`          | `Bun`                   |
| ------------------------ | ------------------------- | --------------- | ----------------------- |
| 底层语言                 | C++                       | Rust            | Zig                     |
| JS引擎                   | V8（Google）              | V8（Google）    | JavaScriptCore（Apple） |
| 版本号                   | 20.5.1                    | 1.36            | 0.7.3                   |
| Web API                  | ✅（正在支持中）           | ✅               | ✅                       |
| TypeScript/JSX           | ❌                         | ✅               | ✅                       |
| Bundle                   | ❌                         | ✅（准备放弃）   | ✅                       |
| Compile（可执行文件）    | ✅（实验性质，正在支持中） | ✅               | ✅                       |
| 本地ESM                  | ✅                         | ✅               | ✅                       |
| 远程ESM（URL导入）       | ❌                         | ✅               | ❌                       |
| CommonJS                 | ✅                         | ✅               | ✅                       |
| package.json             | ✅                         | ✅（部分支持）   | ✅                       |
| .npmrc                   | ✅                         | ❌（可能会支持） | ❌（好像不准备支持）     |
| 安全校验（权限）         | ✅（正在支持中）           | ✅               | ❌                       |
| 代码校验、格式化         | ❌                         | ✅               | ❌                       |
| 内置测试库               | ✅                         | ✅               | ✅                       |
| 宏                       | ❌                         | ❌               | ✅                       |
| 插件（转换其它类型文件） | ❌                         | ❌               | ✅                       |

[华山论剑：Node.js、Deno与将要发布1.0的Bun](https://zhuanlan.zhihu.com/p/651166037)

## 7.1.1 安装：
下载安装包双击安装即可。[node.js官网](https://nodejs.org/en/)

## 7.1.2 卸载：
* window:
1. 从卸载程序卸载程序和功能
2. `C:\Program Files (x86)\Nodejs`   
3. `C:\Program Files\Nodejs`   
4. `C:\Users\{User}\AppData\Roaming\npm（或%appdata%\npm）`    
5. `C:\Users\{User}\AppData\Roaming\npm-cache（或%appdata%\npm-cache）` 
6. 重启，检查环节变量是否还有node、npm

* MacOS:
1. 按`shift+command+G`，打开前往文件夹的窗口，分别输入下列目录    
> `/usr/local/lib`，删除node和node_modules相关的文件和文件夹    
> `/usr/local/include`，删除node和 node_modules 相关的文件和文件夹
> `/usr/local/bin`，删除node可执行文件
2. 如果使用`brew`安装的还需要执行`brew uninstall node`    
3. 个人文件夹下面的所有的local、lib以及include文件夹，删除node和node_modules相关的文件和文件夹
4. 可能还需要如下指令   
> `sudo rm /usr/local/bin/npm`    
> `sudo rm /usr/local/share/man/man1/node.1`    
> `sudo rm /usr/local/lib/dtrace/node.d`    
> `sudo rm -rf ~/.npm`    
> `sudo rm -rf ~/.node-gyp`   
> `sudo rm /opt/local/bin/node`   
> `sudo rm /opt/local/include/node`   
> `sudo rm -rf /opt/local/lib/node_modules`     

## 7.1.3 运行与使用
* `node -v`查看node版本

* `npm -v`查看npm版本

* `node server.js`运行谁就node谁
## 7.1.4 包管理工具(npm)
NPM是随同NodeJS一起安装的包管理工具。

* `npm init`项目初始化（生成package.json文件）

* `npm init-y`快速初始化（生成package.json文件）

* `npm install`、`npm i`、 `npm ci`安装

:::tip 安装命令的修饰符 
`-g`:全局安装   
`-D`:安装开发依赖（devDependencies）      
`-S`:安装生产依赖（dependencies）    
:::

:::tip npm install、npm i 与 npm ci 的区别 
`npm install`:    
根据package文件安装依赖，根据package-lock确定版本，如果没有package-lock则生成package-lock   
`npm i`:       
根据package文件安装依赖，同时依据`^`或`~`升级相关依赖，并更新package-lock文件，不会生成npm-debug.log文件，卸载时需要使用`npm uninstall i`命令。      
`npm ci`:   
根据package文件安装依赖，根据package-lock确定版本没有则报错，不会更新依赖，也不会更新package-lock文件。    
:::

:::tip `npm` 与 `npx` 的区别 
`npm`：`Node` 包管理器，在执行的时候必须本地安装依赖，无法执行远程包    
`npx`：`Node` 包执行器，在执行的时候不安装依赖，因此可以执行远程包        
:::

* `npm unistall`卸载

* `npm get registry`:查看安装源

* `npm install 包 -registry=https://`:指定安装源

* `npm install --userconfig .npmrc`:根据指定的.npmrc文件安装

* `npm install el-components https://gitee.com/jaqi/component.git`:从本地或远程地址安装

* `npm config set registry http://`:修改安装源
> `npm install -g cnpm --registry=https://registry.npm.taobao.org`:全局安装cnpm

* `npm login`:登录
> `npm login --auth-type=legacy`:npm >= 9

* `npm publish`:发布npm包
> `npm publish --registry=<registry>`:发布到指定仓库

* `npm list`:查看当前项目安装的依赖的模块

* `npm list --global`:查看全局安装的依赖模块

* `npm update 包名`:更新包

* `npm view(v/info/show) 包`:查看包详情 

* `npm config get userconfig`:查看当前使用的 .npmrc 配置文件路径

* `npm config get prefix`:获取 .npmrc 全局配置文件路径 $PREFIX

* `which npm`:npm 安装路径

* `npm  –help`:帮助

#### `package.json`文件
```js
{
  "name": "jaqi.note",//项目名
  "version": "0.1.0",//项目版本
  "author":"jaqi.l"//作者
  "private": true, //项目是否私有
  "scripts": { 
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
  "browserslist": [ // 项目的目标浏览器范围
    "> 1%",   // 兼容使用率大于1%的版本
    "last 2 versions", // 兼容最近的2个版本
    "not dead"
  ]
}
```
详见：[package.json指南](https://dev.nodejs.cn/learn/the-package-json-guide/)

#### `.npmrc`文件
```npmrc
# 设置 npm 包的下载地址
registry = https://registry.npm.taobao.org/:_authToken=yourAuthToken

#设置以 @test 开头的包的下载地址
@test:registry = https://registry.npm.taobao.org/:_authToken=yourAuthToken

#是否授权
always-auth=true
```
### pnpm
`node >16.13`内置pnpm
* 开启实验性功能`corepack`
```zsh
corepack enable
```
* 更新最新的 pnpm
```zsh
corepack prepare pnpm@<version> --activate
```

#### 常用命令
* `pnpm istall`安装

* `pnpm install -- no-frozen-lockfile`安装（等效`npm ci`）

* `pnpm uninstall`卸载

## 7.1.5 使用`nvm`、`nvmw`安装并管理`node.js`   
#### 安装：
* window:
[nvmw镜像仓库](https://github.com/coreybutler/nvm-windows/releases)
1. 下载最新的安装包。
2. 安装：安装的目录不能有中文和空格。
3. 修改安装源：打开根目录的settings.txt文件，最后面添加上下面的源地址   
> `node_mirror: https://npm.taobao.org/mirrors/node/`   
> `npm_mirror: https://npm.taobao.org/mirrors/npm/`   

* MacOS:
[nvm镜像地址](https://github.com/nvm-sh/nvm#install-script)
1. 复制最新的下载指令
2. 在终端执行复制的镜像下载指令：`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
3. 复制环境变量代码


::: tip
通过homebrew安装nvm
1. 首先安装homebrew 
```zsh
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```
2. 安装nvm
```zsh
brew install nvm
```
:::
``` js 
// 案例：
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```
4. 创建启动脚本
```bash
# 创建文件
touch .bash_profile
# 打开创建的文件
open -e .bash_profile
# 将启动命令放入文件
```
5. 使脚本开机自启
```bash
# 切换到 ~ 目录下
$ cd ~
# 编辑 .zshrc 文件，若是没有则自动建立
$ vi .zshrc
# 在最后一行写入下面内容
source ~/.bash_profile
```
::: tip 安装oh-my-zsh
* 安装oh-my-zsh
```zsh 
curl	sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 国内镜像
git clone https://gitee.com/mirrors/oh-my-zsh.git ~/.oh-my-zsh
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
``` 

* 确保以下文件都有环境变量代码（环境变量代码如上nvm）   
`~/.bash_profile`、`~/.zshrc`、`~/.profile`

* 设置为默认的`Shell`
```zsh
chsh -s $(which zsh)
```

* 依次重载配置文件
```zsh
source ~/.bash_profile
source ~/.zshrc
source ~/.profile
```
:::
::: tip raw.githubusercontent.com host
[search host](https://site.ip138.com/raw.githubusercontent.com/)    
199.232.68.133 raw.githubusercontent.com

* `.zshrc`推荐配置
```zsh
export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="robbyrussell"

plugins=(
  git
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh

# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# pnpm
export PNPM_HOME="/Users/jaqi.l/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"

# pyenv
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```
:::
#### 卸载：
* window:同node.js卸载一样

* MacOS:
1. `cd ~`
2. `rm -rf .nvm`

#### 使用：
* `nvm list` 列出已经安装的node版本，可以简写为nvm ls命令

* `nvm on` 启用node版本管理

* `nvm off` 禁用node版本，并不会卸载任何东西

* `nvm uninstall version` 卸载指定版本的node

* `nvm install version` 安装指定版本的node

* `nvm install latest` 安装最新版本

* `nvm use version` 使用指定版本的node

* `nvm alias default version` 给指定版本添加别名

* `nvm run version index.js` 使用指定版本运行node

* `nvm exec version npm install` 使用指定版本运行npm
## 7.1.6 使用`nrm`安装并管理`npm`
* 安装
```zsh
npm install -g nrm
```
* 查看可选源，星号代表当前使用源
```zsh
nrm ls
```

* 查看当前使用的源
```zsh
nrm current
```

* 切换源
```zsh
nrm use <registry>
```

* 添加源
```zsh
nrm add <registry> <url>
```

* 测试源速度
```zsh
nrm test <registry>
```

* 删除源
```zsh
nrm del <registry>
```
## 7.1.7 模块系统

一个js文件就是一个模块，通常放在node_modules文件夹中。

node.js使用`CommonJS`模块规范，`CommonJS`加载的是一个对象该对象只有在脚本运行完才会生成。（自 `Node.js` v12 起支持ESM规范[3.16.20 Module](/frontend/javascript/ECMAScript#_3-16-20-es6-module) ）

* 模块分类：
1. 系统核心模块（`http`、`fs`、`url`...）
2. 第三方模块
3. 自定义模块

* 模块的引用
```js
const http = require("http");// 系统模块或第三方模块（node_modules下的模块）
const mod = require("./mod");// 自定义模块（引用时需要写相对路径）
```
* 自定义模块的导出

1. 每个模块都有`module`对象
2. `module`对象有一个`exports`对象
3. 需要导出的成员需要挂载到`module.exports`对象中，`exports`是它的别名
4. 导出单个成员`module.exports == xxx`，不能使用别名的方式
```js
// 单个导出  
module.exports.fn = fn 
module.exports = funciton fn(){}

// 多个导出 接收时是一个对象
exports.fn = fn
exports.a = 10
exports.b = 20

module.exports = {fn,a:10,b:20} 
```
