# 9.1 基本介绍
`React` 由 `Meta` 公司研发，用于构建Web和原生交互界面的库

## 9.1.1 创建项目
```zsh
// create-react-app 核心包  react-demo 项目名称
npx create-react-app react-demo
```

## 9.1.2 项目结构
* 入口文件
```js
// index.js

// React的核心包
import React from 'react';
import ReactDOM from 'react-dom/client';

// 导入项目的根组件
import App from './App';

// 把App根组件渲染到id为root的容器中
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
```

* 根组件
```js
// App.js
// App -> index.js -> public/index.html(root)
function App() {
  return (
    <div className="App">
      this is a react app
    </div>
  );
}

export default App;
```

## 9.1.3 JSX

`JSX` 是 `JavaScript` 和 `XML`（ `HTML` ）的缩写，表示在 `JavaScript` 代码中便携写html模板结构，它是 `React` 中编写UI模板的方式。

`JSX` 并不是标准的`JavaScript`语法、它是`JavaScript`的语法扩展，浏览器本身不能识别，需要通过解析工具解析后才能在浏览器中运行。

```js
const message = 'hello world'
function App() {
  return (
    <div className="App">
      {message}
    </div>
  );
}
```

## 9.1.4 表达式

在 `JSX` 中可以通过大括号 `{}` 识别 `JavaScript` 中的表达式，比如场景的变量、函数调用、方法调用等等

1. 使用引号传递字符串
2. 使用 `JavaScript` 变量
3. 函数调用和方法调用
4. 使用 `JavaScript` 对象

```js
let count = 0;
function add() {
  count++;
  return count
}
function App() {
  return (
    <div className="App">
      {/* 使用引号传递字符串 */}
      <div> {'this is message'}</div>
      {/* 使用javascript变量 */}
      <div>  {count}</div>
      {/* 函数调用和方法调用 */}
      <div>{add()}</div>
      <div>  {new Date().toLocaleString()}</div>
      {/* 使用javascript对象 */}
      <div style={{color:'red'}}></div>
    </div>
  );
}

export default App;
```

## 9.1.5 列表渲染

```js
const list = [
  { id: 1001, name: 'Vue' },
  { id: 1002, name: 'React' },
  { id: 1003, name: 'Angular' },
  { id: 1004, name: 'Ember' },
  { id: 1005, name: 'Backbone' },
]
function App() {
  return (
    <div className="App">
      {/* 列表渲染 */}
      <ul>
        {
          list.map(item => {
            return <li key={item.id}>{item.name}</li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
```

## 9.1.6 条件渲染

```js
let islogin = false

let user = 'admin'

function showUserInfo() {
  if(islogin && user){
    return <div>{user}</div>
  }else if(islogin && !user){
    return <div>匿名</div>
  }else{
    return <div>登录后查看</div>
  }
}

function App() {
  return (
    <div className="App">
      {/* 逻辑与 */}
      {!islogin && <button>登录</button>}
      {/* 三元运算 */}
      {islogin ? <div>已登录</div> : <div>未登录</div>}
      {/* 通过自定义函数条件渲染 */}
      用户信息：{showUserInfo()}
    </div>
  );
}

export default App;
```

## 9.1.7 事件绑定

```js
function handClick(e) {
  alert('点击了:'+e)
}
function App() {
  return (
    <div className="App">
      <button onClick={handClick}>无参</button>
      {/* 有入参数的时候，不能直接写函数调用 */}
      <button onClick={()=> handClick('有参数')}>有参</button>
  </div >
);
}

export default App;
```

<!-- https://www.bilibili.com/video/BV1ZB4y1Z7o8?spm_id_from=333.788.player.switch&vd_source=21e371c1bffc1d55378da343e016464a&p=29 -->