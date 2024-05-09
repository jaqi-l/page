## 6.15.1 概述

![lifecycle](/vuex.png)
#### `State`       
* 数据源载体，是唯一的数据源，单一的状态树。       
#### `Getters`     
* 通过`Getters`可以派生出一些新的状态（类似于计算属性或者是过滤器）  
* 根据`State`的状态创建一个新的数据，并且缓存起来，不改变`state`里的状态，只有依赖数据改变才重新计算。
#### `Mutations`       
* 数据操作（`State`中的状态只能通过`Mutations`进行修改，且只能执行同步任务）      
* 更改Vuex的store中的状态的唯一方法是提交mutation	        
#### `Actions`
主要用法是对Mutations的操作进行异步处理,
通过`dispatch`触发`Actions`事件，返回一个Promise
#### `Modules`
面对复杂的应用程序，当管理的状态比较多时，我们需要将Vuex的store对象分割成模块,每个模块拥有自己的`state`、`mutation`、`action`、`getter`。

## 6.15.2 安装
```zsh
    npm install vuex -S
    npm install -S vuex-persistedstate
```

## 6.15.3 配置
### Vuex 3.x语法:
手动创建src/store/index.js文件
```js 
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' //持久化插件
Vue.use(Vuex)
export default new Vuex.Store({
	namespaced:true //命名空间 
	plugins: [createPersistedState()],//使用持久化插件
	state: {    //初始数据源
		loginStatus: [],
	},
	mutations: {    //修改数据源
		loginStatus: (state, info) => { 
            state.loginStatus = info
		},
	},
	actions: {   //触发事件
		loginStatus: ({commit}, info) => { 
			setTimeout(()=）{
				commit('loginStatus',info)
			},2000)
		},
}
})
```
src/main.js
```js
import store from './store' // 在main.js中注入store，每个实例都会存在一个$stroe属性
index.vue
```
### Vuex 4.x语法:
手动创建src/store/index.js文件
```js
import { createStore } from 'vuex'
export const store = createStore({
  state () {
    return {
      count: 1
    }
  }
})
```
src/main.js
```js
import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'
const app = createApp(App)
app.use(store)
app.mount('#app')
```
## 6.15.4 使用
```js
this.$store.commit('loginStatus', that.loginStatus) // 同步提交mutation变更数据
$store.dispatch('loginStatus')// 触发Actions方法，异步方法提交mutation变更数据

this.$store.state.loginStatus // 读取数据

$store.getters.loginStatus，// 读取计算后的属性值（namespaced == false）
$store.getters["loginStatus"]// 读取计算后的属性值（namespaced == true）

```

## 6.15.5 辅助函数
### mapState（state语法糖）
```js
import { mapState } from './store'
...mapState('user',['userName']) // 相当于 return this.$store.user.userName

console.log(this.userName) // 调用数据
```

### mapGetters（getters语法糖）
```js
import { mapGetters } from './store'
...mapGetters('user') // 相当于 return this.$store.getters.user

console.log(this.user) // 调用数据
```

### mapActions（actions语法糖）
```js
import {  mapActions } from './store'
...mapActions('user') // 相当于 this.$store.dispatch('user')

```

## 6.15.6 Modules

### 命名空间

默认情况下，模块内部的 `action` 和 `mutation` `getter` 默认注册在全局命名空间，
如果希望你的模块相对独立，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 `getter、action` 及 `mutation` 都会自动根据模块注册的路径调整命名。
```js
const moduleA = {
  state: () => ({ ... }),
  mutations:{ fun1()=>{} },
  actions: { fun2()=>{} },
  getters:{ fun3()=>{} },
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { fun1()=>{} },
  actions: { fun2()=>{} },
  getters:{ fun3()=>{} },
}

const store = createStore({
  modules: {
    moduleA,
    moduleB
  }
})

// 启动了 namespaced 后，你需要通过空间名去调用
store.state.moduleA // -> moduleA 的state
store.state.moduleB // -> moduleB 的state

account['moduleA/fun1'] // -> moduleA 的fun1()
account['moduleB/fun1'] // -> moduleB 的fun1()

dispatch['moduleA/fun2'] // -> moduleA 的fun2()
dispatch['moduleB/fun2'] // -> moduleB 的fun2()

getters['moduleA/fun3'] // -> moduleA 的fun3()
getters['moduleB/fun3'] // -> moduleB 的fun3()

```

### 跨模块全局访问、分发

* 如果你希望使用全局 `state` 和 `getter`，`rootState` 和 `rootGetters` 会作为第三和第四参数传入 `getter`，也会通过 `context` 对象的属性传入 `action`。

* 若需要在全局命名空间内分发 `action` 或提交 `mutation`，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。


```js
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    fun1 (state) { 
    }
  },
  getters: {
    // 局部state、局部getters、根节点rootState、根节点rootGetters
    fun2 (state, getters, rootState, rootGetters) {
        state.count  // 局部访问 -> count
        getters.fun1 // 局部访问 -> fun1
        rootState.count // 全局访问 -> moduleA/count
        rootGetters.fun1 // 全局访问 -> moduleA/fun1
        rootGetters['moduleA/fun1'] // 全局访问 -> moduleA/fun1
    }
  },
  actions: {
     // 局部state、局部dispatch、局部commit、局部getters、根节点rootGetters
    fun2 ({ state, dispatch, commit, getters, rootGetters }) {
        state.count  // 局部访问 -> count
        getters.fun1 // 局部访问 -> fun1
        rootGetters.fun1 // 全局访问 -> moduleA/fun1
        rootGetters['moduleA/fun1'] // 全局访问 -> moduleA/fun1

        dispatch('fun2') // 局部访问 -> fun2
        dispatch('fun2', null, { root: true }) // 全局访问 -> moduleA/fun2

        commit('fun1') // 局部访问-> 'moduleA/fun1'
        commit('fun1', null, { root: true }) // 全局访问 -> moduleA/fun1
    }
  }
}
```

### 在模块内注册全局`action`
```js
const moduleA = {
    actions: {
        fun1: {
          // 创建到根节点
          root: true,
          handler ({ state, dispatch, commit, getters, rootGetters }) { ... }
        }
    }
}
```

### 辅助函数全局访问

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  }),
  ...mapGetters([
    'some/nested/module/someGetter', // -> this['some/nested/module/someGetter']
    'some/nested/module/someOtherGetter', // -> this['some/nested/module/someOtherGetter']
  ])
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

* 简化写法：

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  }),
  ...mapGetters('some/nested/module', [
    'someGetter', // -> this.someGetter
    'someOtherGetter', // -> this.someOtherGetter
  ])
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

* 通过`createNamespacedHelpers`方法进行简化：

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

### 模块动态注册

* 动态注册
```js
import { createStore } from 'vuex'

const store = createStore({ /* 选项 */ })

// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})

// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

* 检查动态模块是否注册

```js
store.hasModule('myModule')
store.hasModule(['nested', 'myModule'])
```

* 卸载动态模块(只能卸载动态模块)

```js
store.unregisterModule('myModule')
store.unregisterModule(['nested', 'myModule'])
```

### 模块重用

如果我们使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时 store 或模块间数据互相污染的问题。

实际上这和 Vue 组件内的 data 是同样的问题
```js
const MyReusableModule = {
  state: () => ({
    foo: 'bar'
  }),
  // mutation、action 和 getter 等等...
}
```
