
# 9.2 方法
## 9.2.1 响应式 `useState`
useState 是一个 `React hooks`  ，它允许我们向组件添加一个状态变量，从而控制影响组件的渲染结果。

* 状态规则：
1. 状态不可变：状态是只读的，我们应该始终替换它而不是修改它，直接修改不会引起视图更新
2. 修改对象状态：应该始终传递给 `set` 方法一个全新的对象来进行修改
3. `useState` 是一个 `Hook`，因此你只能在 组件的顶层 或自己的 `Hook` 中调用它。你不能在循环或条件语句中调用它   

```js
import { useState } from 'react'
function App() {
  // count 变量 setCount 修改变量的方法
  const [count, setCount] = useState(0)

  const [form, setForm] = useState({ name: 'zhangsan' })

  const [array, setArray] = useState([1, 2, 3])
  const handleClick = () => {
    // 修改变量
    // 基本类型
    setCount(count + 1)
    // 对象
    setForm({ ...form, name: 'jaqi' })
    // 数组
    setArray([...array, 4, 5, 6])
  }
  return (
    <div className="App">
      <button onClick={handleClick}>{count}</button>
      <div>{form.name}</div>
      <div>{array}</div>
    </div >
  );
}

export default App;
```

## 9.2.2 获取DOM `useRef`

```js
import { useRef } from 'react'
function App() {
  const inputRef = useRef()
  const handleClick = () => {
    console.log(inputRef);
    // 获取聚焦
    inputRef.current.focus()
  }
  return (
    <div className="App">
      <button onClick={handleClick}>useRef</button>
      <input type="text" ref={inputRef} placeholder='请输入内容'/>
    </div >
  ); 
}

export default App;
```
