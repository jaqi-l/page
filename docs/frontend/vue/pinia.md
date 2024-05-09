## 6.15.1 概述

##### `State`       
* 是一个保存状态和业务逻辑的实体    
##### `Getters`     
* 通过`Getters`可以派生出一些新的状态（类似于计算属性，会缓存计算结果）  
##### `Action`    
相当于组件中的`method`,用于存放修改`State`数据的方法

### 安装
```zsh
pnpm install pinia
```

### 配置
1. 手动创建`src/pinia/store.js`文件
```js
import { defineStore } from "pinia";

export const storeA = defineStore("storeA", {
  state: () => {
    return {
      piniaMsg: "hello pinia",
    };
  },
  getters: {},
  actions: {},
});
```
2. `src/main.js`
```js
import { createApp } from "vue";
import App from "./App.vue";
import {createPinia} from 'pinia'

const pinia = createPinia()
createApp(App).use(pinia).mount("#app");
```


3. 使用
```vue
<template>
  <div>{{ piniaStoreA.piniaMsg }}</div>
</template>
<script setup>
import { storeA } from '@/src/pinia/store'
let piniaStoreA = storeA()
console.log(piniaStoreA.piniaMsg); //hello pinia

piniaStoreA.piniaMsg = 'hello juejin'
console.log(piniaStoreA.piniaMsg); //hello juejin

</script>
```


## 6.15.2 核心概念

### `Store`
* `store`由`defineStore()`定义的:
  > 第一个参数是名字    
  > 第二个参数可接受两类值：`Setup` 函数或 `Option` 对象


<CodeGroup>
  <CodeGroupItem title="选项式写法">

  ```js
  export const useCounterStore = defineStore('counter', {
    state: () => ({ count: 0 }),
    getters: {
      double: (state) => state.count * 2,
    },
    actions: {
      increment() {
        this.count++
      },
    },
  })
  ```
  </CodeGroupItem>
  <CodeGroupItem title="组合式写法">

  ```js
  export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    function increment() {
      count.value++
    }
  
    return { count, increment }
  })
  ```
  ::: tip    
  `ref()`就是`state`属性    
  `computed()`就是`getters`    
  `function()`就是`actions`    
  使用组合式函数会让`SSR`变得更加复杂   
  :::
  </CodeGroupItem>
</CodeGroup>

* 使用`store`
```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
// 可以在组件中的任意位置访问 `store` 变量
const store = useCounterStore()

// 当我们需要store中的对个参数的时候，需要使用storeToRefs方法进行结构
const { name, doubleCount } = storeToRefs(store)
</script>
```

* `storeToRefs`解构
```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

// 当我们需要store中的对个参数的时候，需要使用storeToRefs方法进行结构
const { name, doubleCount } = storeToRefs(store)
</script>
```

### `State`
* 定义`State`
```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```
```ts
interface UserInfo {
  name: string
  age: number
}
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

const useStore = defineStore('storeId', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
})
```
* 访问`State`
```js
const store = useStore()
store.count++
```
* 重置`State`
```js
const store = useStore()
store.$reset()
```

* 修改`State`
```js
const store = useStore()
store.$patch({
  count: store.count++,
  age: 120,
  name: 'DIO',
})
// 也可以接受一个函数
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

* 替换`State`
```js
const store = useStore()
// 这实际上并没有替换`$state`
store.$state = { count: 24 }
// 在它内部调用 `$patch()`：
store.$patch({ count: 24 })
```

* 订阅`State`
```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // 和 cartStore.$id 一样
  mutation.storeId // 'cart'
  // 只有 mutation.type === 'patch object'的情况下才可用
  mutation.payload // 传递给 cartStore.$patch() 的补丁对象。

  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  localStorage.setItem('cart', JSON.stringify(state))
},{ detached: true }) // 如果 store 在组件的 setup() 里面)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 { detached: true } 作为第二个参数，以将 state subscription 从当前组件中分离
```
::: tip
```js
watch(
  pinia.state,
  (state) => {
    // 每当状态发生变化时，将整个 state 持久化到本地存储。
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```
:::
### `Getter`
* 定义`Getter`

<CodeGroup>
  <CodeGroupItem title="选项式写法">

  ```js
  export const useStore = defineStore('main', {
    state: () => ({
      count: 0,
    }),
    getters: {
      doubleCount: (state) => state.count * 2,
      // 可以使用this访问当前store实例
      doublePlusOne: (state) => this.doubleCount + 2,
    },
  })
  ```
  </CodeGroupItem>
  <CodeGroupItem title="组合式写法">

  ```js
  export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    function increment() {
      count.value++
    }
    const doubleCount = computed(() => {
      return state.count * 2
    })
    const doublePlusOne = computed(() => {
      return doubleCount + 2
    })
    return { count }
  })
  ```
  </CodeGroupItem>
</CodeGroup>



* 访问`Getter`
```vue
<script setup>
import { useCounterStore } from './counterStore'
const store = useCounterStore()
</script>
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>
```

* 访问其它`State`的`Getter`
```js
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```



* 向`Getter`传递参数
`Getter`只是幕后的计算属性，所以不可以向它们传递任何参数。不过，你可以从 `getter`返回一个函数，该函数可以接受任意参数：
```js
export const useStore = defineStore('main', {
  getters: {
    // 此时将不再被缓存，他只是一个被调用的函数
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

```vue
<script setup>
import { useUserListStore } from './store'
const userList = useUserListStore()
const { getUserById } = storeToRefs(userList)
// 请注意，你需要使用 `getUserById.value` 来访问
// <script setup> 中的函数
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```
### `Action`
* 定义`Action`

<CodeGroup>
  <CodeGroupItem title="选项式写法">

  ```js
  export const useCounterStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
    randomizeCounter() {
      // 可以使用this访问当前store实例
      this.increment()
      this.count = Math.round(100 * Math.random())
    },
  },
})
  ```
  </CodeGroupItem>
  <CodeGroupItem title="组合式写法">

  ```js
  export const useCounterStore = defineStore('main', () => {
    const count = ref(0)
    function increment() {
      count.value++
    }

    function randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    }

    return { count, increment,randomizeCounter }
  })
  ```
  </CodeGroupItem>
</CodeGroup>

 * 订阅`Action`
 你可以通过`store.$onAction()`来监听`action`和它们的结果。传递给它的回调函数会在`action`本身之前执行。`after`表示在`promise`解决之后，允许你在`action`解决后执行一个回调函数。同样地，`onError`允许你在`action`抛出错误或`reject`时执行一个回调函数。
```js
const unsubscribe = someStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // 为这个特定的 action 调用提供一个共享变量
    const startTime = Date.now()
    // 这将在执行 "store "的 action 之前触发。
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  },true // action 订阅器会被绑定到添加它们的组件上(如果 store 在组件的 setup() 内)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 true 作为第二个参数传递给 action 订阅器，以便将其从当前组件中分离
)

// 手动删除监听器
unsubscribe()
```


### 插件

#### pinia-plugin-persist插件的使用
* 安装
```zsh
pnpm install pinia-plugin-persist // 持久化工具
```

* 引入
```js
import { createApp } from "vue";
import App from "./App.vue";
import {createPinia} from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPersist);
createApp(App).use(pinia).mount("#app");
```

* 使用
```js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useInfoStore = defineStore('useInfoStore', () => {
  let navlist = ref([]);
  return { navlist }  // 需要静态化的参数需要return出去
}, {
  persist: {
    enabled: true, // 开启静态化
    strategies: [{ // 没有此项认为是全局静态化
      // 自定义存储的 key，默认是 store.$id
      key: "useInfoStore",
      // 指定存储方案 默认是sessionStorage
      storage: localStorage,
     // paths: ["navlist"]  // 静态化部分数据
    }]
  }
})
```