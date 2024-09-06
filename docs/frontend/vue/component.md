## 6.3.1 组件

### 组件名
* kebab-case    
使用kebab-case(短横线分隔命名)定义组件时，你也必须在引用这个自定义元素时使用kebab-case    
例如:`<my-component-name>`
* PascalCase
当使用PascalCase(首字母大写命名)定义一个组件时,引用时`kebab-case`/`PascalCase`都可以。

### 组件的作用域
* 全局注册    
可以用在任何新创建的Vue根实例
* 局部注册    
只能用在当前组件内，且不能用在其子组件中。

### 组件的实例
组件挂载后才能访问模板引用
::: code-group

```vue [Vue2]
<template>
  <input ref="input" />
</template>
<script>
export default {
  mounted() {
    // 所有实例对象都会被挂载到 this.$refs对象上
    this.$refs.input.focus()
  }
}
</script>
```

```vue [Vue3]
<template>
  <input ref="input" />
</template>
<script setup>
import { onMounted } from 'vue'

// 需要手动声明一个 ref 来存放该实例对象
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>
```

```vue [Vue3.5]
<template>
  <input ref="input" />
</template>
<script setup>
import { onMounted, useTemplateRef } from 'vue'

const input = useTemplateRef('input')

onMounted(() => {
  input.value.focus()
})
</script>
```
:::

::: tip
1. 如果子组件使用的是选项式 API，被引用的组件实例和该子组件的 `this` 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权。

2. <span style="color: red">*</span>Vue3：使用了`<script setup>` 的组件是默认私有的，父组件无法访问使用了` <script setup>` 的子组件中的任何东西,除非子组件在其中通过显式暴露[defineExpose](/frontend/vue/setup#defineexpose)

3. <span style="color: red">*</span>Vue3：函数模板引用，除了使用字符串作为实例的名字之外，还可以使用函数
> ```vue
> <template>
>   <ul>
>     <!-- 动态ref属性的值是一个JS执行函数，就是对引用进行  赋值  -->
>     <li v-for="item in list" 
>     :ref="el => { if (el) userRefMap['ref_' + item.id] = el }">
>         {{ item.name }}
>     </li>
>   </ul>
> </template>
> <script setup>
> import { ref, onMounted } from 'vue'
> 
> const userRefMap = ref({})
> const list = ref([
>  {id: 1001,name: 'html'},
>  {id: 1002,name: 'css' },
>  {id: 1003,name: 'javascript'}
> ])
> const onMounted = () =>{
>    console.log(userRefMap.value['ref_1001'])
>    console.log(userRefMap.value['ref_1002'])
>    console.log(userRefMap.value['ref_1003'])
> }
> </script>
> ```
:::

### 单文件组件
一个Vue单文件组件 (SFC)，通常使用`*.vue`作为文件扩展名，它是一种使用了类似HTML语法的自定义文件格式，用于定义Vue组件。一个Vue单文件组件在语法上是兼容HTML的

每一个 `*.vue` 文件都由三种顶层语言块构成：`<template>`、`<script>` 和 `<style>`，以及一些其他的自定义块
* 语言块:
> `<template>`：每个 `*.vue`文件最多可以包含一个顶层`<template>`标签    
> `<script>`：每个`*.vue`文件最多可以包含一个`<script>`标签   
> `<script setup>`：每个`*.vue`文件最多可以包含一个<span style="color: red">*</span>Vue3新增`<script setup>`标签   
> `<style>`：每个`*.vue`文件可以包含多个`<style>`标签   
> `自定义块`    
* 预处理器:
> `lang`声明预处理器语言
* src导入:
```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

### 模块系统
* 将每个组件放置在其各自的文件中。    
* 通过`import`/`require`引入组件。（`ES6 Module`详见[7.16.20](/frontend/javascript/ECMAScript#_3-16-20-es6-module)
`CommonJS`详见[7.1.7](/other/node/introduction#_7-1-7-模块系统)）    

* 全局注册的行为必须在根Vue实例(通过 new Vue)创建之前发生
* 局部注册：

::: code-group

```vue [Vue2]
<script>
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}
</script>
```

```vue [Vue3 setup]
<script setup>
// 导入即可，不需要注册
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'
</script>
```

```vue [Vue3 setup()]
<script>
export default {
  import BaseButton from './BaseButton.vue'
  import BaseIcon from './BaseIcon.vue'
  import BaseInput from './BaseInput.vue'
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
  setup(props, ctx) {
    return {
      BaseButton,
      BaseIcon,
      BaseInput
    }
  }
}
</script>
```

:::

## 6.3.2 全局组件
1. 第一步声明
```js
new Vue({el:`#app`}) 
```
2. 第二步全局注册挂载
```js
Vue.component("Vheader",{template:`<div>我是模板</div>`});
 //Vue.component(组件名称 template:`模板（需要一个根元素，否则只能渲染第一个元素）`)
```
<span style="color: red">*</span>Vue3语法

```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // 注册的名字
  'MyComponent',
  // 组件的实现
  {
    /* ... */
  }
)
```
3. 第三步使用
```html
<div id="app">
<Vheader></Vheader><!--双标签 -->
<Vheader/><!--单标签（用于全局组件，el标记的组件只会渲染第一个） -->
</div>
```
## 6.3.3 局部组件
1. 第一步声明
```js
new Vue({el:"#app"});
```
2. 第二步局部注册挂载，仅用于#app下局部使用
```js
new Vue({
    el:"#app",
    components: {
        Vheader:{template:`<div>子组件</div>`}//3.组件描述
    },
});
```
3. 第三步使用组件
```html
<div id="app">
    <Vheader></Vheader>
</div>
```
::: warning
1. 如果子组件在外部描述需要先声明，然后再父组件中注册挂载
2. 子组件的`data`必须是一个函数,否则在复用组件时，将共用一个`data`
:::

## 6.3.4 动态组件、异步组件、异步导入、与组件缓存
### 动态组件
```html
<component :is="currentTabComponent"></component>
<button @click="change">切换页面</button>
```
```js
// 组件名称组成的数组或一个组件的选项对象
data:{
    index:0,
    currentTabComponent:[
      template1,template2,template3
    ],
 methods:{
    change(){
      this.index++
      this.currentTabComponent[this.index%3]
    }
  }
```
### 异步组件
```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```
* 异步引用模块化组件
```html
  <component :is="currentComponent"></component>
```
```js
import Home from "./components/home.vue";
import News from "./components/news.vue";
export default {
  name:"App",
  data(){
    return{
    //默认值显示Home,通过修改currentComponent异步加载不同的组件
      currentComponent:Home ,
    }
  },
  components:{
    Home,
    News 
  },
```

### 异步导入组件    

<span style="color: red">*</span>通过Vue3新增的`defineAsyncComponent`方法异步引入组件

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve({
        template: '<div>I am async!</div>'
      })
    })
)
```

* 全局异步导入：
```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

* 在局部注册的时候直接导入
```js
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
```
* 配合动态组件异步导入：
```js
import { defineAsyncComponent } from 'vue'
const Home = defineAsyncComponent(() => import('@/components/home.vue'))
const News = defineAsyncComponent(() => import('@/components/News.vue'))
export default {
  name:"App",
  data(){
    return{
    //默认值显示Home,通过修改currentComponent异步加载不同的组件
      currentComponent:Home ,
    }
  },
  components:{
    Home,
    News 
  },
```
* 加载与错误状态：
```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```
* 搭配 `Suspense` 使用

### `keep-alive`组件缓存    

参数：
> `include`：（捕获需要缓存的）字符串、数组或正则表达式。只有名称匹配的组件会被缓存。   
> `exclude`：（捕获不需要缓存的）字符串、数组或正则表达式。任何名称匹配的组件都不会被缓存。   
> `max`：数字。最多可以缓存多少组件实例。

```html
<!-- cachedViews 需要缓存的路由name数组 -->
<keep-alive :include="cachedViews">
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
<!-- 缓存路由：keep-alive与router-view结合 -->
<keep-alive :include="cachedViews">
  <router-view :key="key"></router-view>
</keep-alive>
```
::: warning
1. `keep-alive`要求被切换到的组件都有自己`name`    
2. `keep-alive`与`router-view`结合使用时，`include`优先匹配组件的`name`所以组件的`name`必须与路由的`name`完全一致   
3. `exclude`与`include`t同时使用时，`exclude`的优先级会更高
4. 在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的`name`选项，无需再手动声明。
:::

缓存组件的生命周期：    
> `activated`被`keep-alive`缓存的组件激活时调用   
> `deactivated`被`keep-alive`缓存的组件停用时调用      
::: tip
模板在编译阶段是由外向里进行的，运行阶段则由里向外进行。异步加载的组件则是父组件模板编译完成后再编译的

同步组件的周期运行顺序：`页面created(onBeforeMount)`→`组件created(onBeforeMount)`→`页面mounted(onMounted)`→`组件mounted(onMounted)`   

异步组件的周期运行顺序：`页面created(onBeforeMount)`→`页面mounted(onMounted)`→`组件created(onBeforeMount)`→`组件mounted(onMounted)`   

缓存组件的生命周期运行顺序：`created`→`activated`→`deactivated`→`activated`   
:::

## 6.3.5 组件通信
### 父传子`props`
* 父组件
```html
<template>
  <div>
    <input type="text" v-model="name">
    <!-- 引入子组件,通过自定义属性inputName传递数据name -->
    <child :inputName="name"></child>
  </div>
</template>
<script>
  import child from './child'
  export default {
    components: {
      child
    },
    data () {
      return {
        name: 'jaqi'
      }
    }
  }
</script>
```
* 子组件 
```html
<template>
  <div>
    <span>{{inputName}}</span>  <!-- jaqi -->
  </div>
</template>
<script>
  export default { 
    props: {
      inputName: String, // 通过自定义的inputName属性接受父组件传来的字符串(String)类型的name
    }
  }
</script>
```
::: tip props
1. props是单向下行绑定，父组件更新回传给子组件，反之不行   
2. Prop可以验证，并设置默认值。如果验证失败开发环境回产生一个控制台警告    
```js
 props: {
    // Number类型验证
    propA: Number,
    // 多个类型验证
    propB: [String, Number],
    // 必填的String类型
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的Number类型
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的Object
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
```
3. 使用一个对象绑定多个 prop
```vue
<script>
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      }
    }
  }
}
</script>
<BlogPost v-bind="post" />
<!-- 等价于 -->
<BlogPost :id="post.id" :title="post.title" />
```
4. 非`Prop`的`Attribute`是指不需要接收直接挂在到子组件根节点的属性，常见的有`class`、`style`、`id`
```html
<!-- 子组件 -->
<template>
  <div class="date-picker">
    <input type="datetime-local" />
  </div>
</template>
<!-- 父组件 -->
<date-picker data-status="activated"></date-picker>

<!-- 渲染结果  data-status属性自动挂载到根结点 -->
<div class="date-picker" data-status="activated">
  <input type="datetime-local" />
</div>
```
禁用`Attribute`继承   
```vue
<template>
  <div class="date-picker">
    <input type="datetime-local" v-bind="$attrs" />
  </div>
</template>
<script>
  export default {
    inheritAttrs: false
  }
</script>
```
```html
<!-- Date-picker 组件 使用非 prop attribute -->
<date-picker data-status="activated"></date-picker>

<!-- 渲染结果 data-status属性自动挂载到根结点之外的节点 -->
<div class="date-picker">
  <input type="datetime-local" data-status="activated" />
</div>
```
:::

<span style="color: red">*</span>Vue3写法

::: code-group

```vue [Vue3 setup]
<script setup>
// defineProps接受props参数
const props = defineProps(['title'])
console.log(props.title)

// Vue3.5+ 写法
const { title } = defineProps(['title'])
</script>

<template>
 <h4>{{ title }}</h4>
</template>
```


```vue [Vue3 setup()]
<script setup>
export default {
 props: ['title'],
 setup(props) {
   console.log(props.title)
 }
}
</script>
```
:::

* `withDefaults`使用`TS`声明类型
```js
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```


### 父传孙`attrs`
* 父组件
```html
<template>
  <div>
    <input type="text" v-model="name">
    <br>
    <br>
    <!-- 引入子组件,通过自定义属性inputName传递数据name -->
    <child :inputName="name"></child>
  </div>
</template>
<script>
  import child from './child'
  export default {
    components: {
      child
    },
    data () {
      return {
        name: 'jaqi'
      }
    }
  }
</script>
```
* 子组件 
```html
<template>
  <div>
       <grandson v-bind="$attrs"/>
  </div>
</template>
<script>
 import grandson from './grandson'
  export default { 
      components: {
      grandson
    },
  }
</script>
```

* 孙组件 
```html
<template>
  <div>
    <span>{{inputName}}</span>  <!-- jaqi -->
  </div>
</template>
<script>
  export default { 
    props: {
      inputName: String, // 通过自定义的inputName属性接受父组件传来的name
    }
  }
</script>
```

### 子传父`emit`
* 子组件 
```html
<template>
  <div>
    <span>{{childValue}}</span>
    <!-- 定义一个子组件传值的方法 -->
    <input type="button" value="点击触发" @click="childClick">
  </div>
</template>
<script>
  export default {
    data () {
      return {
        childValue: '我是子组件的数据'
      }
    },
    methods: {
      childClick () {
        // childByValue是在父组件on监听的方法
        // 第二个参数this.childValue是需要传的值
        this.$emit('childByValue', this.childValue)
      }
    }
  }
</script>
```
* 父组件
```html
<template>
  <div>
    <span>{{name}}</span>
    <br>
    <br>
    <!-- 引入子组件 定义一个on的方法监听子组件的状态-->
    <child v-on:childByValue="childByValue"></child>
  </div>
</template>
<script>
  import child from './child'
  export default {
    components: {
      child
    },
    data () {
      return {
        name: ''
      }
    },
    methods: {
      childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.name = childValue
      }
    }
  }
</script>
```  

<span style="color: red">*</span>Vue3写法

::: code-group

```vue [Vue3 setup]
<script setup>
// 子组件 
const childClick = （） => {
  emit('childByValue')
}

// defineEmits定义对外公开的方法 
const emit = defineEmits(["childByValue"]);
// TS
const emit = defineEmits<{
  (e: 'childByValue'): void
}>();
</script>
```

```vue [Vue3 setup()]
<script setup>
// 子组件 
export default {
  emits: ['childByValue'],
  setup(props, ctx) {
    ctx.emit('childByValue')
  }
}
</script>
```
:::

### 子传父`listeners`
<span style="color: red">*</span>Vue3中移除   

### 兄弟传值$emit与$on
* 组件A
```html
<template>
  <div>
    <span>{{elementValue}}</span>
    <input type="button" value="点击触发" @click="elementByValue">
  </div>
</template>
<script>
  // 引入公共的bug，来做为中间传达的工具
  import Bus from './bus.js'
  export default {
    data () {
      return {
        elementValue: 4
      }
    },
    methods: {
      elementByValue: function () {
        Bus.$emit('val', this.elementValue) // 通过$emit存入Bus
      }
    }
  }
</script>
```

* 组件B
```html
<template>
  <div>
    B组件:
    <input type="button" value="点击触发" @click="getData">
    <span>{{name}}</span>
  </div>
</template>
<script>
  import Bus from './bus.js'
  export default {
    data () {
      return {
        name: 0
      }
    },
    mounted: function () {
      var vm = this
      // 通过$on从Bus取
      Bus.$on('val', (data) => {
        console.log(data)
        vm.name = data
      })
    },
    methods: {
      getData: function () {
        this.name++
      }
    }
  }
</script>
```






### 依赖注入（`provide`、`inject`）

::: code-group   
```vue [Vue2]
<!-- 父组件 -->
<script>
  export default {
    // 父组件通过provide方法想数据分发给后代组件
    provide() { 
        return {
            name: 'jaqi'
        };
    },
  }
</script>

<!-- 子组件 -->
<script>
  export default {
    // 后代组件直接通过inject获取父组件分发的数据
    inject: ['name'],
  }
</script>

```   

```vue [Vue3]
<!-- 父组件 -->
<script setup>
import { provide } from 'vue'

provide( 'name','jaqi')
</script>

<!-- 子组件 -->
<script setup>
import { inject } from 'vue'

const message = inject<string>('name')
</script>
 ```
:::



::: warning 依赖注入是非响应式的
<span style="color: red">*</span>Vue3：`inject`和`provide` 需要在 `setup()` 内同步调用

<span style="color: red">*</span>Vue3：如果需要在注入方组件中更改数据，需要给提供方给注入放一个变更数据的方法：

<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation // 为注入方提供方法
})
</script>
```
```vue
<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
<!-- 调用提供方的方法更改数据 -->
  <button @click="updateLocation">{{ location }}</button>
</template>
```
:::


* 注入默认值

```js
inject('message', '这是默认值')

inject('key', () => new ExpensiveClass())
```

<span style="color: red">*</span>Vue3使用 Symbol 作注入名   

但如果你正在构建大型的应用，包含非常多的依赖提供，或者你正在编写提供给其他开发者使用的组件库，建议最好使用 Symbol 来作为注入名以避免潜在的冲突。

详见[3.16.9 Symbol](/frontend/javascript/ECMAScript#_3-16-9-symbol)
```js
// keys.js
export const myInjectionKey = Symbol() as InjectionKey<string>
```

```js
// 在供给方组件中
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* 要提供的数据 */
      }
    }
  }
}
```

```js
// 注入方组件
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```
## 6.3.6 组件其他方法

### 在组件上使用`v-model`
```js
<ChildComponent v-model="searchText"/>
```
子组件`props`必须绑定名为`value`的变量。并在`input`事件中通过`$emit`返回给父组件
```js
Vue.component('ChildComponent ', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```
* 使用`model`选项
允许一个自定义组件在使用v-model时定制prop和event命名
```js
Vue.component('ChildComponent ', {
  model: {
    prop: 'searchText',
    event: 'change'
  },
  props: {
    // 这将允许 `value` 属性用于其他用途
    value: String,
    // 使用searchText代替value作为model的prop
    searchText: {
      type: Number,
      default: 0
    }
  },
  // ...
})
```

* <span style="color: red">*</span>Vue3中语法
#### 有参数的v-model
```html
<!-- 使用searchText代替value作为model的prop -->
<!-- 使用update:searchText作为$event的事件名 -->
<ChildComponent v-model:searchText="title" />
```
#### 无参数的v-model
`prop`和`event`命名更改为`modelValue`和`update:modelValue`
```html
<ChildComponent v-model="title" @input="changePageTitle" />
```
```js
// ChildComponent.vue
export default {
  props: {
    modelValue: String // Vue2是`value：String`
  },
  emits: ['update:modelValue'],
  methods: {
    changePageTitle(title) {
      this.$emit('update:modelValue', title) // Vue2是 `this.$emit('input', title)`
    }
  }
}
```
`defineModel`方法
```html
<ChildComponent v-model="title" />
```
```js
// ChildComponent.vue
var title = defineModel()
```

### 混入(mixin)
将任意组件通过mixin包装成混入对象，插入另一个组件,
```js
// 定义一个混入对象
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}
// 使用混入对象
new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})
```
* 使用`Vue.extend`进行混入
```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```
:::tip
1. 当组件和混入对象含有同名选项时,`methods`、`components`和`directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
2. <span style="color: red">*</span>Vue3中推荐使用组合式函数\组合式Api方式
:::
* 全局混入
```js
Vue.mixin({
  created: function () {
    console.log('全局混入')
  }
})
```

* 自定义选项合并策略
`Vue.config.optionMergeStrategies`自定义合并策略
```js
const merge = Vue.config.optionMergeStrategies.computed
Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
  if (!toVal) return fromVal
  if (!fromVal) return toVal
  return {
    getters: merge(toVal.getters, fromVal.getters),
    state: merge(toVal.state, fromVal.state),
    actions: merge(toVal.actions, fromVal.actions)
  }
}
```
### 函数式组件(渲染函数render)
```html
<div id="app">
    <anchored-heading :level="1">Hello world!</anchored-heading>
  </div>
  <script>
    var app = new Vue({
      el: "#app",
      components: {
        'anchored-heading': {
          render: function (createElement) {
            return createElement(
              'h' + this.level,   // 标签名称
              // this.$slots.default 子节点数组
              // template可以渲染一个模板字符串
             [createElement( {template:`<p>${this.level}</p>`}),this.$slots.default] 
            )
          },
          props: {
            level: {
              type: Number,
              required: true
            }
          }
        }
      }
    })
  </script>
```
* `render`函数，
> 有一个参数`createElement`函数   
> 返回`createElement`创建的VNode虚拟节点
* `createElement`函数
> 第一个参数`HTML`标签字符串    
> 第二个参数`HTML`标签的属性对象
>> `class`样式    
>> `style`样式    
>> `attrs`属性    
>> `on`事件   
>> `props`接收参数    
>> `domProps`传递参数   
>> `on`事件   
>> `nativeOn`原生事件   
>> `directives`自定义指令     

> 第三个参数子虚拟节点数组，返回VNode虚拟节点   
* `props`接收上级传来的参数

* 元素位置限制
某些HTML元素对于放在其中的元素类型有限制，例如` <ul>`，`<ol>`，`<li>`，`<table>`，`<tr>`
```html
<!-- table组件内是不能直接渲染自定义组件blog-post-row -->
<table>
  <blog-post-row></blog-post-row>
</table>
<!-- 需要添加vue:前缀才能正确渲染 -->
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

完整示例
```js
Vue.component('example', {
  render: function (createElement) {
    return createElement(
      'h' + this.level, //h1,h2...标签
      {  // 属性
       style: {
         border: '1px solid #ccc',
         ':hover': {  // 设置伪类
              background: 'yellow'
          },
       }
      },
      [  // 添加子节点
        createElement(
           // 标签
          'input',
          // 属性
          { //类名
            class:{ 
              'demo':true
            },
            // html属性
            attrs: { 
              name: this.$slots.default.headingId
            },
            // 组件的props
            props:{ 
              myData: 'message',
              // 绑定自定义事件
              'focus':()=>{}
            },
            // Dom属性
            domProps:{ 
              innerHtml:'baz'
            },
            style: {
              border: '1px solid #ccc',
              fontSize:'10px'
            },
            // 添加事件
            on: { 
                  click: () => {
                  },
                  mouseover: () => {
                  }
            },
            // 监听原生事件
            nativeOn:{
              click: ()=>{}
            },
            // 自定义指令
            directives:[
              {
                name:'myDIrective',
                value:2,
                expression:' 1+1',
                arg:'foo',
                modifiers:{
                bar:true
                }
              }
            ]
        }, 
        this.$slots.default // 子节点
        )
      ]
    )
  },
  // 接收传给example组件的的数据
  props: { 
    level: {
      type: Number,
      required: true
    }
  }
)}
```
* <span style="color: red">*</span>Vue3写法
```vue
<script setup lang="ts">
import { h, defineComponent } from "vue";
const contentlist = defineComponent({
  name: "contentlist",
  setup() {
    return () => {
      return h("div", { style: { color: "red" } }, "rander.js");;
    };
  },
});
</script>

<template>
  <contentlist />
</template>
```

::: tip 实现v-model
```js
return h('div', [
                h('Input', {
                  props: {
                    // 回显
                    value: data
                  },
                  on: {
                    // 监听input 动态修改data参数
                    input: (event) => {
                      data = event
                    }
                  }
                })
              ])
```
:::

#### JSX
```html
<script>
import myComponent from "./myComponent.vue";
export default {
  render() {
    return (
      <div>
        <h3>内容</h3>
        {/* 纯文本 */}
        <p>hello, I am Gopal</p>
        {/* 动态内容 */}
        <p>hello {this.msg}</p>
        {/* 输入框 */}
        <input />
        {/* 自定义组件 */}
        <myComponent></myComponent>
      </div>
    );
  },
};
</script>
```

### 模板扩展
* `inline-template`内联模板   
 内联模板不会把子组件的内容分发渲染到父组件中而是需要在父组件中实现其内容的渲染
```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```
::: warning
1. 内联模板的作用域是子组件自身。
2. <span style="color: red">*</span>Vue3中移除
:::
* `X-Template`
```html
 <div id="app">
        <!-- 使用 -->
        <my-component></my-component>
        <!-- 定义 -->
        <script type="text/x-template" id="my-component">
                <div>
                <p>This is the content of component</p>
                <p>Hello Vue!</p>
            </div>
        
        </script>
    </div>
    <script>
        // 注册
        Vue.component('my-component', {
            template: '#my-component'
        });
        var app = new Vue({
            el: "#app"
        });
    </script>
```

### 控制更新
由于`JavaScript`的限制，`Vue`不能检测数组和对象的变化。
因此在变更数组和对象的时候可以使用以下两种方法触发视图更新：
1. `$forceUpdate`强制视图更新。（只会影响实例本身和插入插槽内容的子组件，而不是所有子组件）
```js
this.$forceUpdate(); 
```
2. 通过`$set`方法修改数组或对象触发视图更新。
```js
this.$set(target,key,value); // target = Object | Array
```
### <span style="color: red">*</span>Vue3透传属性
1. 当一个组件以单个元素为根作渲染时，透传的属性会自动被添加到根元素上
```html
<!-- <MyButton> 的模板 -->
<button>click me</button>
<!-- 使用 -->
<MyButton class="large" />
<!-- 最后渲染出的 DOM 结果是 -->
<button class="large">click me</button>
```
2. 如果一个子组件的根元素已经有了 `class` 或 `style` 属性，它会和从父组件上继承的值合并。
3. `v-on`监听器也会有透传显像
4. 禁用透传
* 如果你使用了 `<script setup>`，你需要一个额外的 `<script>` 块来书写这个选项声明
```vue
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>
<script setup>
// ...setup 部分逻辑
</script>
```

### <span style="color: red">*</span>Vue3组合式函数(Hooks)

组合式函数(`Hooks`) 是一个利用 Vue 组合式 API 来封装和复用有状态逻辑的函数。

* 鼠标跟踪实例：
```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态
  return { x, y }
}
```
```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

* 选项式Api中使用组合式函数
```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // setup() 暴露的属性可以在通过 `this` 访问到
    console.log(this.x)
  }
  // ...其他选项
}
```

::: tip 组合式函数 和 Mixin 的对比
* Vue 2 的用户可能会对 mixins 选项比较熟悉。它也让我们能够把组件逻辑提取到可复用的单元里。然而 mixins 有三个主要的短板：

1. 不清晰的数据来源：当使用了多个 mixin 时，实例上的数据属性来自哪个 mixin 变得不清晰，这使追溯实现和理解组件行为变得困难。这也是我们推荐在组合式函数中使用 ref + 解构模式的理由：让属性的来源在消费组件时一目了然。

2. 命名空间冲突：多个来自不同作者的 mixin 可能会注册相同的属性名，造成命名冲突。若使用组合式函数，你可以通过在解构变量时对变量进行重命名来避免相同的键名。

3. 隐式的跨 mixin 交流：多个 mixin 需要依赖共享的属性名来进行相互作用，这使得它们隐性地耦合在一起。而一个组合式函数的返回值可以作为另一个组合式函数的参数被传入，像普通函数那样。

基于上述理由，我们不再推荐在 Vue 3 中继续使用 mixin。保留该功能只是为了项目迁移的需求和照顾熟悉它的用户。
:::

### `<Teleport>`
`<Teleport>`可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

参数：
> `to`：指定传送的目标，可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象    
> `disabled`：禁用传送  
> `max`：数字。最多可以缓存多少组件实例。
```html
<!-- 组件内将modal标签渲染到body元素内 -->
<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```
::: tip
`<Teleport>` 挂载时，传送的 to 目标必须已经存在于 DOM 中。理想情况下，这应该是整个 Vue 应用 DOM 树外部的一个元素。如果目标元素也是由 Vue 渲染的，你需要确保在挂载 `<Teleport>` 之前先挂载该元素。
:::

* 多个 `<Teleport>` 共享同一个目标
```html
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```
渲染结果
```html
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

### `<Suspense>`
`<Suspense>`用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。

* 异步依赖