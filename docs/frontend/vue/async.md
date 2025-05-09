# 6.9 异步
## 6.9.1 nextTick
Vue在更新DOM时是异步执行的。当数据发生变化，Vue将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新。

为了在更新DOM后能立即拿的修改后的数据就需要`nextTick`方法。`nextTick`会在DOM更新结束后立即执行。
::: code-group  
```js [Vue2]
created(){
    this.$nextTick(() => {})
}
```  

```js [Vue3]
import { nextTick  } from 'vue'
created(){
    nextTick(() => {})
}
```
:::

:::tip
在Vue生命周期的`created()`钩子函数进行的DOM操作一定要放在`Vue.nextTick()`的回调函数中.
:::

## 7.9.2 Promise详见[3.14.2](/frontend/javascript/sync_asyn#_3-14-2promise)
## 7.9.3 async/await详见[3.14.3](/frontend/javascript/sync_asyn#_3-14-3async-await)