## 6.11.1 全局配置(Vue.config)
`Vue.config`是一个对象，包含Vue的全局配置。
* `Vue.config.silent`:是否显示Vue所有的日志与警告
> ```js
> Vue.config.silent = true // 取消 Vue 所有的日志与警告。
> ```    
* `Vue.config.optionMergeStrategies`:混入的自定义合并策略
> ```js
> Vue.config.optionMergeStrategies._my_option = function (parent, child, vm) {
>   return child + 1
> }
> 
> const Profile = Vue.extend({
>   _my_option: 1
> })
> 
> // Profile.options._my_option = 2
> ```   
* `Vue.config.devtools`:配置是否允许vue-devtools检查代码 
> ```js
> // 务必在加载 Vue 之后，立即同步设置以下内容
> Vue.config.devtools = true
> ```
* `Vue.config.errorHandler`:捕获指定组件的渲染和观察期间错误    
> ```js
> Vue.config.errorHandler = function (err, vm, info) {}
> // `info` 是Vue特定的错误信息，比如错误所在的生命周期钩子
> ```
* `Vue.config.warnHandler`:为Vue运行时的警告赋予一个自定义处理函数
* `Vue.config.ignoredElements`:忽略在Vue之外的自定义元素。<span style="color: red">*</span>Vue3中移除替换为 `config.isCustomElement`
* `Vue.config.keyCodes`:给v-on自定义键位别名.<span style="color: red">*</span>Vue3中移除
> ```js
> Vue.config.keyCodes = {
>   v: 86,
>   f1: 112,
>   // camelCase 不可用
>   mediaPlayPause: 179,
>   // 取而代之的是 kebab-case 且用双引号括起来
>   "media-play-pause": 179,
>   up: [38, 87]
> }
> ```
> ```html
> <input type="text" @keyup.media-play-pause="method">
> ```
* `Vue.config.performance`:在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。只适用于开发模式和支持performance.mark API的浏览器上。
* `Vue.config.productionTip`:阻止vue在启动时生成生产提示。<span style="color: red">*</span>Vue3中移除

## 6.11.2 全局API
* `Vue.extend()`:在Vue实例中创建一个“子类” 详见[6.4.6](/jaqi.note/frontend/vue/component/#混入-mixin) 。<span style="color: red">*</span>Vue3中移除
* `Vue.nextTick()`:在下次DOM更新循环结束之后执行延迟回调,详见[6.9.1](/jaqi.note/frontend/vue/async/#_6-9-1nexttick) 
* `Vue.set()`修改数组或对象并触发视图更新,详见[6.4.6](/jaqi.note/frontend/vue/component/#控制更新) 
* `Vue.delete()`删除数组或对象并触发视图更新
* `Vue.directive()`注册或获取全局自定义指令,详见[6.2.14](/jaqi.note/frontend/vue/control/#_6-2-14-自定义指令-directive) 
* `Vue.filter()`注册或获取全局过滤器
* `Vue.component()`注册或获取全局组件
* `Vue.use()`使用已安装的vue插件
* `Vue.mixin()`全局注册一个混入,详见[6.4.6](/jaqi.note/frontend/vue/component/#混入-mixin) 
* `Vue.compile()`将一个模板字符串编译成render函数
* <span style="color: red">*</span>Vue3新增：`createApp`创建应用实例
* <span style="color: red">*</span>Vue3新增：`mount`挂载应用实例
> ```js
> var res = Vue.compile('<div><span>{{ msg }}</span></div>')
> 
> new Vue({
>   data: {
>     msg: 'hello'
>   },
>   render: res.render,
>   staticRenderFns: res.staticRenderFns
> })
> ```
* `Vue.observable()`让一个对象可响应
* `Vue.version`当前使用的vue版本号（读取package.json中的version字段）
* `Vue.globalProperties`:轻易全局对象。<span style="color: red">*</span>Vue3中移除替换为 `config.isCustomElement`
```js
// Vue2
Vue.prototype.$http = () => {}
// Vue3
const app = createApp({})
app.config.globalProperties.$http = () => {}
```
## 6.11.3 实例选项
* <span style="color: red">*</span>Vue3新增：
`emits`定义一个组件可以向其父组件触发的事件

```js
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text'],
    emits: ['accepted']
  }
</script>
```

## 6.11.4 实例方法

#### property
* `Vue.$data`:实例的data对象        
* `Vue.$props`:当前组件接收到的props对象         
* `Vue.$el`:Vue根实例的DOM元素
* `Vue.$options`:初始化实例选项
> ```js
> new Vue({
>   customOption: 'foo',
>   created: function () {
>     console.log(this.$options.customOption) // => 'foo'
>   }
> })
> ```
* `Vue.$parent`:查看父组件实例
* `Vue.$root`::查看根组件实例
* `Vue.$children`:查看子组件实例。<span style="color: red">*</span>Vue3中移除，如需访问子组件请使用`$refs`
* `Vue.$slots`:查看被插槽分发的内容(v-slot:foo -> vm.$slots.foo ,匿名 -> vm.$slots.default)
* `Vue.$scopedSlots`:查看作用域插槽
* `Vue.$refs`:查看注册过ref属性的dom元素数组。
> ::: tip   
>  1. 在<span style="color: red">*</span>Vue3初期版本不再自动创建`$ref`数组，`3.2.25`以上可以  
> 2. `expose`选项可以用于限制对子组件实例的访问
>>```js
>> export default {
>> // 父组件的ref只能访问以下两个组件
>>   expose: ['ChildA', 'ChildB']
>> }
>>```
> :::
* `Vue.$isServer`:当前 Vue 实例是否运行于服务器
* `Vue.$attrs`:获取父组件中不被prop识别，且不是class和style的数据，并且可以通过v-bind="$attrs"向下传入。<span style="color: red">*</span>Vue3中包含class和style
* `Vue.$listeners`:监听父组件中(不含 .native 修饰器的) v-on 事件监听器的时间，并且可以通过v-bind="$listeners"向下传入。<span style="color: red">*</span>Vue3中移除

#### 数据
* `Vue.$watch`:监听Vue实例上的一个表达式或者一个函数计算结果的变化
* `Vue.$set`:全局`Vue.set`的别名
* `Vue.$delete`:全局`Vue.delete`的别名

#### 事件
* `Vue.$on`:监听当前实例上的自定义事件.<span style="color: red">*</span>Vue3中移除
> ```js
> vm.$on('test', function (msg) {
>   console.log(msg)
> })
> vm.$emit('test', 'hi')
> // => "hi"
> ```
* `Vue.$once`:监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除.<span style="color: red">*</span>Vue3中移除
* `Vue.$off`:移除自定义事件监听器,如果没有提供参数，则移除所有的事件监听器.<span style="color: red">*</span>Vue3中移除
* `Vue.$emit`:触发当前实例上的事件
#### 生命周期
* `Vue.$mount`:手动挂载一个未挂载的实例
* `Vue.$forceUpdate`:迫使Vue实例重新渲染
* `Vue.$nextTick`:将回调延迟到下次DOM更新循环之后执行
* `Vue.$destroy`:完全销毁一个实例，会触发beforeDestroy和destroyed钩子


:::tip
组件与实例的关系：Vue是由一个个实例构建而成的，一个组件就是一个Vue的实例，每个组件内部都可以写属性，因此每一个组件都是一个Vue的实例。”
:::
* 具体使用方法详见：[VUE|API](https://cn.vuejs.org/v2/api/)