## 6.6.1 methods
在vue项目中定义的函数需要放在`methods`方法里。
```js
methods:{
    loadData(){}
}
```
## 6.6.2 computed
`computed`计算属性：将复杂的逻辑从模板中提取出来便于维护。并根据数据的改变重新进行逻辑处理。如果数据没有改变就不会重新处理。
```html
<p>Reversed message: "{{ reversedMessage }}"</p>
```
```js
computed:{
// 对reversedMessage进行逻辑处理
      reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
#### 可写计算属性
计算属性默认仅能通过计算函数得出结果。当你尝试修改一个计算属性需要如下方法
```js
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // 注意：我们这里使用的是解构赋值语法
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
```
::: warning
1. 不要在计算函数中做异步请求或者更改DOM
2. 避免直接修改计算属性值
:::
## 6.6.3 watch
`watch`监听属性：监听数据的改变
```js
// 监听data属性的改版
watch: {
    data(val, oldVal) {
    }
} 
```
* 深度监听
```js
// 监听data属性的改版
watch: {
    docData: {
        handler(val, oldVal) {
        },
        deep: true, //深度监听
        immediate: true //对初始值进行监听
    }
}
```

* 监听子属性
```js
watch: {
// 只能是简单的路径，不支持表达式
            'data.rows': {
                handler(val, oldVal) {
                },
                immediate: true
            }
        },
```
* 函数写法
```js
var unwatch = this.$watch('data.rows', function (val, oldVal) {
    unwatch()// 取消监听
  },
  { deep: true, //深度监听
    immediate: true //对初始值进行监听 
  }

```
* <span style="color: red">*</span>Vue3新增的`flush`属性
默认情况下，用户创建的侦听器回调，都会在Vue组件更新之前被调用。这意味着你在侦听器回调中访问的DOM将是被Vue更新之前的状态，如果想在侦听器回调中能访问被Vue更新之后的DOM。就要使用`flush`属性
```js
watch: {
    docData: {
        handler(val, oldVal) {
        },
        flush: 'post'
    }
}
```
## 6.6.3 三者的区别
1. `methods`方法不会自执行。
2. `computed`方法有缓存，如果监听的数据没有改变，不会重新计算。适合复杂的逻辑处理
3. `watch`擅长处理一个数据影响多个数据、`computed`擅长处理一个数据受多个数据影响

```js
new Vue({
  el: '#app',
  data: {
    fullName: '',
    firstName: 'jaqi',
    lastdName: 'l'
  },
  //一个数据(fullName)受(firstName、lastdName)两个数据的影响
    computed:{
        this.fullName = firstName + this.lastdName
  },
  //如果使用watch就需要对每个改变的数据进行监听，非常繁琐
    watch: {
        firstName: function (newValue) {
            this.fullName = firstName + this.lastdName
    },
        lastdName: function (newValue) {
            this.fullName = firstName + this.lastdName
    },
  },
})
```
* [【Vue】谈Vue的依赖追踪系统 ——搞懂methods watch和compute的区别和联系](https://www.cnblogs.com/penghuwan/p/7194133.html)     
* [vue computed正确使用方式](https://zhuanlan.zhihu.com/p/72541791)

