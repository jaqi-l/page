# 9.3 组件 

在 `React` 中，组件就是首字母大写的函数。内部存放了组件的逻辑和视图，渲染组件只需要把组件当成标签书写

```js
// 定义组件
function Button() {
  // 内部逻辑、视图
  return <button>click me</button>
}

function App() {
  return (
    {/* 使用组件 */}
    {/* 单标签 */}
    <Button />
    {/* 双标签 */}
    <Button></Button>
  )
}
```

## 9.3.1 样式

1. 行内样式
2. 类

```js
import './index.css'

const style= {
  color: 'red',
  fontSize: '30px'
}
function App() {

  return (
    <div className="App">
      <div style={{color:'red',fontSize:'30px'}}>行内样式</div>
      <div style={style}>行内样式</div>
      <div className='foo'>类 样式</div>
    </div >
  );
}

export default App;
```

```css
.foo{
  color: red;
  font-size: 30px;
}
```
## 9.3.1 组件通讯
### 1. 父传子
> `props`    
>> * 只读对象，只能由父组件修改，可以是任意的数据类型（数字、函数、字符串、布尔值、数组、对象、JSX）   
>> * `children`:`props` 的特殊属性,当我们把内容嵌套到子组件标签内时，`children` 返回嵌套的内容
```js
// 定义子组件
function Son(props) {
  // 子组件通过 props 获取数据
  return <div>这是父组件传递的内容“{props.parentData}”，这是子组件嵌套的内容"{props.children}"</div>
}

const data = 'this is parentData'

function App() {
  return (
    <div className="App">
      {/* 通过子组件的标签传递数据 */}
      <Son Son parentData={data} > This is the nested content</Son>
    </div>
  )
}
export default App;
```
### 2. 子传父   
在子组件中调用父组件中的番薯饼传递参数
```js
import { useState } from 'react'
// 定义子组件
function Son({ onGetSonMsg }) {
  // 子组件的数据
  const data = 'this is sonData'
  return <div>this is son <button onClick={() => onGetSonMsg(data)}>sendMsg</button></div>
}


function App() {

  const [msg, setMsg] = useState('')
  const getMsg = (data) => {
    setMsg(data)
  }
  return (
    <div className="App">
      {/* 通过子组件的标签传递函数，子组件调用改函数，传递数据 */}
      <Son onGetSonMsg={getMsg}></Son>
      {msg}
    </div>
  )
}
export default App;
```

### 3. 兄弟传值
```js
import { useState } from 'react'

// 定义子组件
function BrotherA({ onGetSonMsg }) {
  // 子组件的数据
  const data = 'this is brotherA`Data'
  return <div>this is son <button onClick={() => onGetSonMsg(data)}>sendMsg</button></div>
}

function BrotherB(props) {
  return <div>brotherB:{props.msg}</div>
}


function App() {
  const [msg, setMsg] = useState('')
  const getMsg = (data) => {
    setMsg(data)
  }
  return (
    <div className="App">
      {/* 通过子组件的标签传递数据 */}
      <BrotherA onGetSonMsg={getMsg}></BrotherA>
     <div>parent:{msg}</div>
      {/* 父组件再传给BrotherB */}
      <BrotherB msg={msg}></BrotherB>
    </div>
  )
}
export default App;
```
### 4. 父传孙

