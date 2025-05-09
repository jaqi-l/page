# 6.2 指令系统
## 6.2.1 `v-text`
`v-text`把数据渲染在视图中与{{}}、innerText作用类似
## 6.2.2 `v-html`
`v-html`把数据渲染在视图中,支持渲染标签与innerHTML作用类似
```html
<div id="app" v-html="msg"></div>
```
## 6.2.3 `v-pre`
`v-pre`跳过Mustache直接渲染静态内容
```html
<div id="app" v-pre>{{ item }}</div> <!-- <div id="app">{{ item }}</div>  -->
```
## 6.2.4 `v-if`/`v-else`/`v-else-if`
`v-if`/`v-else`/`v-else-if` 决定元素是否显示true显示false移除
原理是依靠的是元素增加与删除appendChild()/removeChild()     
```html
<template class="demo" v-if="true" ></template>
<template class="demo"v-else ></template>
```
## 6.2.5 `v-show`、`v-cloak`
`v-show`决定元素是否显示true显示false隐藏,靠的是改变样式display:none适用于频繁切换DOM元素   
```html
<template class="demo" v-show="true" ></template>
```
:::tip 
* v-show页面首次加载乱码
`v-cloak`指令可以隐藏未编译的Mustache标签直到实例准备完毕
```js
<template class="demo" v-show="true" v-cloak ></template>
```
```css
[v-cloak]{display:none;}
```
* v-show不支持`<template>`元素，也不支持`v-else`
:::
## 6.2.6 `v-bind`
`v-bind`绑定属性(自定义的属性或元素系统属性)单向数据绑定
```html
<div v-bind:class="className">
<div v-bind:url="{url}">
<!-- 动态绑定属性 -->
<div v-bind="{ id: 'blue' }"></div> 
<!-- 动态绑定多个值 -->
<div v-bind="{ id: 'blue',class: 'wrapper' }"></div> 
<!-- 简写 -->
<div :mydata="data">
```
::: warning
动态绑定同名属性时的覆盖问题：
* Vue2：固定绑定的属性总是覆盖动态绑定的属性
* <span style="color: red">*</span>Vue3：从左至右，后绑定的覆盖前绑定的属性
:::
## 6.2.7 `v-model`
`v-model`双向数据绑定 一般只用于表单控件input、select、textarea、components

```html
<input type="text" v-model="msg">
```
::: tip
`v-model`会忽略所有表单元素的value、checked、selected
:::
## 6.2.8 `v-on`
`v-on`事件绑定
```html
<button v-on:click="click"></button>
<!-- 简写 -->
<button @click="fn"></button>
```
支持的事件详见：[事件](/frontend/javascript/event)
## 6.2.9 `v-for`
`in`遍历key,在遍历对象时使用。
```html
<ul v-for="(item,index) in arr" :key="index" >
<li>{{index}}-{{item.subject}}-{{item.score}}</li>
</ul>
```
`of`遍历value，在遍历数组时使用。
```html
<ul v-for="(item,key,index) of arr" >
<li>{{item}}-{{key}}-{{index}}</li>
</ul>
```
`in`/`of`在Vue的v-for中使用效果并无差别。
:::warning
1. `v-for`渲染的元素列表顺序改变时，采取“就地更新”策略，`Vue`不会随之移动DOM元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染
2. `v-for`支持的监听数组变化的方法：`push()`,`pop()`,`shift()`,`unshift()`,`splice()`,`sort()`,`reverse()`
3. `v-for`与`v-if`一同使用时，`v-for`优先级高，因此每次循环都会重复执行`v-if`
4. <span style="color: red">*</span>Vue3中`key`不再是必须的，Vue会自动生成唯一的`key`
5. <span style="color: red">*</span>Vue3中`v-if`总是优先于`v-for`生效，这意味着`v-if`的条件将无法访问到`v-for`作用域内定义的变量别名。
6. `:key="index"`将项目的索引与项目的唯一项绑定以避免因为就地复用引起项目混乱。    
[key的作用详解](https://www.zhihu.com/question/61064119/answer/766607894)
7. <span style="color: red">*</span>Vue3中当容器是`<template>`时`key`应该放在`</template>`上
:::
## 6.2.10 `v-once`、`v-memo`  
* `v-once`：只渲染一次，不随数据更新而重新渲染。与`Object.freeze()`方法类似。
```html
<p v-once>{{msg}}</p>
```
*  `v-memo`：(` v-memo="[valueA, valueB]"`)只有当`valueA`和`valueB`都保持不变，则整个子树不会重新渲染
```html
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```

::: tip
当搭配`v-for`使用`v-memo`，确保两者都绑定在同一个元素上。
:::

## 6.2.11 `:class`
```html
<div :class="class">变量</div>
<div :class="{ active: isActive }">对象</div> <!-- isActive真值 -->
<div :class="class ? 'class-a' : 'class-b' ">三目运算符</div>
<div :class="[classA, classB]">数组</div>
```

如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个class。你可以通过组件的 `$attrs`来实现指定：
```html
<!-- my-component 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```
```html
<my-component class="baz"></my-component>
```
渲染结果：
```html
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

## 6.2.12 `:style`
```html
<p :style="{color:FontColor}">变量</p>
<p :style="styleObject">对象</p>
<p :style="{color:(index==0?arr.conFontColor:'#000')}">三目运算符</p>
<p :style="[arr.styles.conTitleStyle,arr.styles.conLiStyle]">数组</p>
```
* 多重值
常用语浏览器兼容问题，Vue会渲染数组中最后一个被浏览器支持的值
```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```
## 6.2.13 动态参数
```html
<a v-bind:[attributeName]="url">attributeName是一个变量</a>
<!-- 简写 -->
<a :[attributeName]="url">attributeName是一个变量</a>
<!-- v-on简写 -->
<a @[eventName]="doSomething">eventName是一个变量</a>
```
## 6.2.14 自定义指令 `directive`

* 局部注册：
```js
Vue.directive('myfocus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```
* 局部注册：
```js
 export default {
    el:'app',
    directives:{
            myfocus:{
              //  inserted 当被绑定的元素插入到 DOM 中时
                inserted (el,binding) {
                   el.focus() // 获取焦点
                }
            }
    },
  }
```
```html
<input type="text" v-myfocus>
```


### 动态指令参数：
```html
<p v-color="{ color: 'white', text: 'hello!' }"></p>
```
```js
 export default {
    el:'app',
    directives:{
            color:{
              //  inserted 当被绑定的元素插入到 DOM 中时
                inserted (el,binding) {
                   el.style.color = binding.value.color //设置字体颜色
                   el.innerHTML = binding.value.text //设置字体颜色
                }
            }
    },
  }
```
### 相关钩子函数
`inserted`：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）。        
`bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。        
`update`：所在组件的`VNode`更新时调用，但是可能发生在其子`VNode`更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。     
`componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。        
`unbind`：只调用一次，指令与元素解绑时调用。      
### 相关参数：
`el`：指令所绑定的元素，可以用来直接操作DOM。   
`binding`：一个对象，包含以下属性：   
> `name`：指令名，不包括 v- 前缀    
> `value`：指令的绑定值，例如：v-my-directive="1+1" 中，绑定值为2   
> `oldValue`：指令绑定的前一个值，仅在`update`和`componentUpdated`钩子中可用。无论值是否改变都可用    
> `expression`：字符串形式的指令表达式。例如v-my-directive="1+1"中，表达式为"1+1"   
> `arg`：传给指令的参数，可选。例如v-my-directive:foo中，参数为"foo"    
> `modifiers`：一个包含修饰符的对象。例如：v-my-directive.foo.bar中，修饰符对象为{ foo: true, bar: true }   
> `vnodeVue`：编译生成的虚拟节点    
> `oldVnode`：上一个虚拟节点，仅在`update`和`componentUpdated`钩子中可用 

###  <span style="color: red">*</span>Vue3语法
#### 相关钩子函数的变化：
`created`：新增！在元素的 attribute 或事件监听器被应用之前调用    
bind → `beforeMount`：在元素被插入到 DOM 前调用   
inserted → `mounted`：在绑定元素的父组件及他自己的所有子节点都挂载完成后调用   
`beforeUpdate`：新增！在元素本身被更新之前调用，与组件的生命周期钩子十分相似    
`update` →：移除！该钩子与 updated 有太多相似之处。请改用 `updated`    
componentUpdated → `updated`：在绑定元素的父组件及他自己的所有子节点都更新后调用
`beforeUnmount`：新增！与组件的生命周期钩子类似，它将在元素被卸载之前调用   
unbind -> `unmounted`：绑定元素的父组件卸载后调用

### 相关参数的变化：
`el`：指令所绑定的元素，可以用来直接操作DOM   
`binding`：一个对象，包含以下属性：   
> `name`：指令名，不包括 v- 前缀    
> `value`：指令的绑定值，例如：v-my-directive="1+1" 中，绑定值为2   
> `oldValue`：指令绑定的前一个值，仅在`beforeUpdate`和`updated`钩子中可用。无论值是否改变都可用    
> `arg`：传给指令的参数，可选。例如v-my-directive:foo中，参数为"foo"    
> `modifiers`：一个包含修饰符的对象。例如：v-my-directive.foo.bar中，修饰符对象为{ foo: true, bar: true }   
> `instance`：使用该指令的组件实例      
> `dir`：指令的定义对象

`vnode`：代表绑定元素的底层 VNode   
`prevNode`：之前的渲染中代表指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。   
```html
<p v-color="{ color: 'white', text: 'hello!' }"></p>
```
```js
 export default {
    el:'app',
    directives:{
            color:{
              //  mounted 当被绑定的元素插入到 DOM 中时
                mounted (el, binding, vnode) {
                   el.style.color = binding.value.color //设置字体颜色
                   el.innerHTML = binding.value.text //设置字体颜色
                }
            }
    },
  }
```
::: tip
1. 只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令。其他情况下应该尽可能地使用 v-bind 这样的内置指令来声明式地使用模板，这样更高效，也对服务端渲染更友好
2. 除了 el 外，其他参数都是只读的，不要更改它们。若你需要在不同的钩子间共享信息，推荐通过元素的 dataset attribute 实现
:::
## 6.2.15 数据修饰符

### `lazy`
在change时而非input时更新
```html
<input v-model.lazy="msg" >
```

### `number`
将用户的输入值转为数值类型
```html
<input v-model.number="age" >
```
### `trim`
过滤用户输入的首尾空白字符
```html
<input v-model.trim="nickname">
```

## 6.2.16 事件修饰符

### `once`
只执行一次
```html
<a v-on:click.once="fn"></a>
```

### `stop`
阻止冒泡
```html
<a v-on:click.stop="fn"></a>
```

### `capture`
冒泡顺序，设置capture的最先冒泡
```html
<div id="app" v-on:click="show">1</div>
<div id="app2" v-on:click.capture="show2">2</div>
<div id="app3" v-on:click="show3">3</div>
<!-- 2→3→1 -->
```

### `self`
只有设置了`self`的才能触发事件,既阻止捕获又阻止冒泡
```html
<div id="app" v-on:click="show">1</div>
<div id="app2" v-on:click.self="show2">2</div>
<div id="app3" v-on:click="show3">3</div>
```

### `prevent`
阻止默认事件
```html
<a v-on:click.prevent="fn"></a>
```

### `passive`
执行默认方法
```html
<a v-on:click.passive="fn"></a>
```

### `native`
监听组件子组件元素的原生事件<span style="color: red">*</span>Vue3中移除
```html
  <my-compoent @click.native="fn()"></my-compoent>
```
```html
  <button @click="btn()">buttom</button>
```

### `sync`
子组件修改父组件的
```html
  <button @click="show = true">显示</button>
  <dialog :show.sync="show" v-show="show"></dialog>
```
* <span style="color: red">*</span>Vue3语法
```html
  <button @click="show = true">显示</button>
  <dialog v-model:show="show" /></dialog>
```
子组件修改父组件的show值
```js
  this.$emit('update:show',false)
```
### 按键修饰符
按下按键时执行
```html
<input v-on:keyup.enter="submit">
```
* 按键编码
`keyCode`已被主流浏览器废弃，因此vue提供如下按键码别名：

`.enter`/`.tab`/`.delete`(捕获“删除”和“退格”键)/`.esc`/`.space `/`.up` /`.down` /`.left`/`.right`/`.ctrl`/`.alt`/`.shift`/`.meta`

你还可以通过全局`config.keyCodes`(Vue2)对象自定义按键修饰符别名：  
### `exact`
组合修饰符    
允许精确的使用组合修饰符触发的事件。
```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```
:::tip
* 浏览器只有等内核线程执行到事件监听器对应的JavaScript代码时，才能知道内部是否会调用preventDefault函数来阻止事件的默认行为,因此使用`prevent`提前告知浏览器。一般用于监听`@scoll`/`@touchmove`

* 串联使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。例如：`v-on:click.prevent.self`会阻止所有的点击，而 `v-on:click.self.prevent`只会阻止对元素自身的点击。
:::