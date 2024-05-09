## 6.1.1 前端三大框架
vue/react/angular

## 6.1.2 vue 是什么？
JavaScript框架 操作数据 彻底解放DOM操作 组件化

jQuery库  直接操作DOM

Vue 不支持 IE8 及以下版本但它支持所有兼容 ECMAScript 5 的浏览器

虚拟DOM：实际上它只是一层对真实DOM的抽象，该对象包含了真实DOM的结构及其属性，通过算法（`Diff`）与真实DOM对比差异，从而进行局部渲染来达到优化性能的目的（减少DOM的重绘和回流从而减少浏览器性能消耗）    

> ::: tip 不同框架的编译机制   
> `React`：编译成`JXS`函数并返回`虚拟DOM`（状态变化时，从当前组件开始，包括子组件都重新加载）   
> `Vue`：编译成`render`函数并返回`虚拟DOM`（状态变化时，仅当前组件重新加载），`Vite`未来可能会采用`Vapor mode`    
> `SolidJS`：编译`真实DOM`字符串（状态变化时，重新加载对应的DOM）    
> `Svelte` ：编译`真实DOM`片段（状态变化时，重新加载对应的DOM）    
> :::

> ::: tip 重绘与回流
> 回流：DOM树中的元素被增加或者删除，导致浏览器需要重新的去渲染整个DOM树，回流比重绘更消耗性能，发生回流必定重绘，重绘不一定会导致回流    
> 重绘：DOM树没有元素增加或删除，只是样式的改变，针对浏览器对某一元素进行单独的渲染，这个过程就叫做重绘
> :::

> [Svelte和Solid](https://juejin.cn/post/7145669817428049957)   
> [Svelte原理](https://juejin.cn/post/7235628080219078693)    
> [No DomDiff](https://juejin.cn/post/7009575427731636232)
## 6.1.3 MVVM
MVVM：Model-View-ViewModel 数据-视图-视图模型。

响应式数据原理（发布订阅模式）：通过ES5提供的Object.defineProperty（数据劫持）来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。    
<span style="color: red">*</span>Vue3的响应式原理详解：[6.1.6](/frontend/vue/introduction#_6-1-6-响应式)
::: tip mvc、mvp、mvvm的区别
* MVC    
![docker](/mvc-1.png)  
![docker](/mvc-2.png)  
> 1. 用户操作View
> 2. View将事件传给Controller（用户也可以直接操作Controller）
> 3. Controller根据业务逻辑修改Model里的数据
> 4. Model想数据反馈给View

* MVP   
![docker](/mvp.png)
> 各部分之间的通信，都是双向的
> View 与 Model 不发生联系，都通过 Presenter 传递

* MVVM    
![docker](/mvvm.png)
> 基本上与MVP模式完全一致
> 区别是ViewModel与Model通过双向数据绑定实现
:::
## 6.1.5 引入
* 通过用`<script>`引入
```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script> 
<!-- 锁定版本号避免不可预期的风险 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script> 
```
* 通过`NPM`引入
```zsh
npm install vue
```
## 6.1.5 基本结构

<CodeGroup>
    <CodeGroupItem title="Vue2" active>

  ```vue
  <div id="app">
      <button @click="add">{{a}}</button>
  </div>
  <script>
  new Vue({
      el:"#app", //元素 不能使用body、html标签
      data (){ // data也可以是对象，但不建议会导致数据覆盖
          return{
              count:0
          }
      },
      methods:{
          add() {
              this.count++
          }
      }
  });
  </script>
  ```
  </CodeGroupItem>
  <CodeGroupItem title="Vue3 setup()">

  ```vue
  <div id="app">
      <button @click="add">{{a}}</button>
  </div>
  <script>
  // 使用场景：
  // 要在非单文件组件中使用组合式 API 时。
  // 需要在基于选项式 API 的组件中集成基于组合式 API 的代码时。
  createApp({
    setup() {
      let count = ref(0)
      const add = () => {
        count++
      }
      return {
        count,
        add
      }
    }
  }).mount('#app')
  </script>
  ```
  </CodeGroupItem>
    <CodeGroupItem title="Vue3 setup">

  ```vue
  <div id="app">
      <button @click="add">{{a}}</button>
  </div>
  <script setup>
    // 使用场景：只支持单文件组件
    // setup()的简化写法
    let count = ref(0)
    const add = () => {
     count++
    }
  </script>
  ```
  </CodeGroupItem>
</CodeGroup>

::: tip setup 的优点
1. 更加简洁的代码
2. `setup()`函数中需要手动暴露状态和方法
3. 更好的`TypeScript`、IDE类型推论支持
:::


## 6.1.6 响应式

#### Vue2:基于`ES5的Object.defineProperty`数据劫持，实现响应式的。
当一个`Vue`实例被创建时，它将`data`对象中的所有的`property`加入到`Vue`的响应式系统中。当这些`property`的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。      

只有当实例被创建时就已经存在于`data`中的`property`才是响应式的。

使用`Object.freeze(property)`阻止修改现有的`property`的“响应”

#### <span style="color: red">*</span>Vue3:基于`ES6的Proxy`,代理，实现响应式的。

::: tip 使用过Vue2的用户可能需要注意下面这样的边界情况：
```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```
当你在赋值后再访问`this.someObject`，此值已经是原来的`newObject`的一个响应式代理。这与Vue2中原始的`newObject`不会变为响应式完全不同：请确保始终通过`this`来访问响应式状态。
:::


`Object.defineProperty`与`Proxy`详见：[6.1.6](/frontend/javascript/ECMAScript#_3-16-11-proxy)
### DOM的更新时机
DOM的更新并不是同步的。`Vue`将缓存它们直到更新周期的 “下个时机”（异步dom更新队列） 以确保无论你进行了多少次声明更改，每个组件都只需要更新一次。
若要等待一个状态改变后的DOM更新完成，你可以使用`nextTick()` 