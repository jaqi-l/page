## 6.12.1 核心API
### `setup`
### `reactive`
返回一个对象的响应式代理
* 响应式代理与原始对象的关系
1. 只有代理对象是响应式的，更改原始对象不会触发更新
2. `reactive`返回的是一个原始对象的代理，它和原始对象是不相等的(嵌套对象也适用)
```js
const raw = {count: 0 }
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false

// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
```
* `reactive()`的局限性
1. 仅对对象类型有效（`Object`、`Array`、`Map`、`Set`），而对`String`、`Number`、`Boolean`这样的原始类型无效
2. 因为Vue的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失
```js
let state = reactive({ count: 0 })
// { count: 0 }失去响应，被{ count: 1 }覆盖
state = reactive({ count: 1 })

// n没有响应，不影响state
let n = state.count
n++

// count没有响应，state也没有响应
let { count } = state
// 不会影响原始的 state
count++
```
### `ref`
可以使用任何值类型的响应式，没有`reactive()`的上述限制和局限性
```vue
<script>
import { ref } from 'vue'
export default {
  // `setup` 是一个专门用于组合式 API 的特殊钩子函数
  setup() {
    const state = ref(0) // ref在顶层 { value: 0 } 
    function increment() {
      state.value++
    }

    // 暴露 state 到模板和increment方法
    return {
      state, increment
    }
  }
}
</script>
<template>
  <div @click="increment()">{{ state }}</div> <!-- ref在顶层的时候自动解包无需 .value -->
</template>
```
* 解构或覆盖不会失去响应
```js
const objectRef = ref({ count: 0 })

// 这是响应式的替换，仍然具有响应
objectRef.value = { count: 1 }

const obj = {
  foo: ref(1),
  bar: ref(2)
}

// 该函数接收一个 ref
// 需要通过 .value 取值
// 但它会保持响应性
callSomeFunction(obj.foo)

// 仍然是响应式的
const { foo, bar } = obj
```
*  `ref`解包
1. 当ref在模板中作为顶层属性被访问时，它们会被自动“解包”，所以不需要使用 `.value`
2. 使用`<script setup>`语法时，也会自动解包
```vue
<script>
import { ref } from 'vue'
export default {
  // `setup` 是一个专门用于组合式 API 的特殊钩子函数
  setup() {
    const object = { foo: ref(1) } // ref不在顶层
    const { foo } = object // 通过将 foo 改成顶层属性> 来解决这个问题
    // 暴露 state 到模板和increment方法
    return {
    object,foo
    }
  }
}
</script>
<template>
   <div >{{ object.foo +1 }}</div> <!--  ref不在顶在层 foo是一个ref对象 返回[object Object]1 -->
   <!--   正确写法 -->
   <div >{{ foo +1 }}</div>
   <div >{{object.foo.value +1}}</div>
</template>
```

::: tip reactive 与 ref 的比较
1.  `ref` 支持原始类型和对象，`reactive` 只支持对象。（ `ref` 处理对象类型的时候，也是通过 `reactive` 实现的）
2.  `reactive` 是 `proxy` 代理的对象数据，不需要 `.value` 访问
3.  对象层级较深，需要深度跟踪，那么推荐使用 `reactive`（性能更高）
4.  `watch` 监听 `ref` 类型的数据时，需要设置深度监听，`reactive` 不需要
5.  `reactive` 不能替换整个对象,不能直接解构，需要使用 `toRef` 或 `toRefs` 进行解构
:::

### `readonly`
返回一个只读的响应式代理
```js
const copy = readonly(original)

watchEffect(() => {
  // 用来做响应性追踪
  console.log(copy.count)
})

// 更改该只读副本将会失败，并会得到一个警告
copy.count++ // warning!
```
### `computed`
 `computed()`接收一个`getter`函数，返回值为一个计算属性 `ref`，其它特性同选项式Api中的计算属性
```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <span>{{ publishedBooksMessage }}</span>    <!-- 自动解包无需 .value -->
</template>
```
* 可写计算属性
```vue
<script setup>
import { reactive, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
   // getter
   get() {
     return firstName.value + ' ' + lastName.value
   },
   // setter
   set(newValue) {
     // 注意：我们这里使用的是解构赋值语法
     [firstName.value, lastName.value] = newValue.>split(' ')
   }
})
</script>

<template>
  <span>{{ fullName }}</span>   <!-- 自动解包无需 .value -->
</template>
```
### `watch`
```js
 const state = ref(0)

 function increment() {
   state.value++
 }

 watch(state, (newValue, oldValue) => {
   console.log(newValue, oldValue)
 })
```
* 侦听数据源类型
的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组：
```js
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```
::: warning 不能直接侦听响应式对象的属性值
```js
const obj = reactive({ count: 0 })

// 错误：因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
// 正确写法：提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```
:::
* 深层侦听器
`watch()`会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发
```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++
```
只有在返回不同的对象时，才会触发回调
```js
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)
```
`deep`选项，强制转成深层侦听器
```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true }
)
```
停止侦听
```js
const unwatch = watchEffect(() => {})
unwatch()
```
回调的触发时机`flush`   
`watch`的侦听器回调，都会在Vue组件更新之前被调用。这意味着你在侦听器回调中访问的DOM将是被Vue更新之前的状态，如果想在侦听器回调中能访问被Vue更新之后的DOM。就要使用`flush`属性

可选参数：
> `pre`: 在组件更新之前异步调用，(`onBeforeUpdate`之前调用)   
> `post`:在组件更新之后异步调用，(`onBeforeUpdate`之后调用，`onUpdated`之前)  
> `async`:在组件更新之前异同步调用，(`onBeforeUpdate`之前调用)   

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

::: tip 执行顺序
`watchSyncEffect` → `watchEffect` → `onBeforeUpdate` → `watchPostEffect` → `onUpdated`
:::


### `watchEffect`
`watch()` 是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。
```js
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```
:::tip `watch` 与 `watchEffect`

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：
* `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
* `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确
* `watchEffect`相当于`watch` 设置了`immediate:true`
:::
### `watchPostEffect`
`watchEffect()` 使用 `flush: 'post'` 选项时的别名。

### `watchSyncEffect`
`watchEffect()` 使用 `flush: 'async'` 选项时的别名
## 6.12.2 工具API
### `isRef`
判断是否是 `ref` 对象
```js
isRef(foo)
```
### `unref`
如果参数是 `ref` ，则返回内部值，否则返回参数本身，相当于   
`val = isRef(val) ? val.value : val `是其语法糖

### `toRef`与`toRefs`
`toRef`：基于响应式对象上的一个属性，创建一个对应的`ref`    
`toRefs`：基于响应式对象，创建一个对应的`ref`，对象的所有属性都会创建一个`ref`    
```vue
<script setup lang="ts">
import { reactive, toRefs,toRef } from "vue";
let data = reactive({
  a: 1,
  b: 2,
  c: 3
});

let { a, b, c } = toRefs(data)
let s = toRef(data,'a') // 基于data对象的a属性创建一个响应式对象

console.log(a);
function increment() {
  data.a++;
}
</script>

<template>
  <div @click="increment">
   {{ a }}--{{ s }}
  </div>
</template>
```
### `toValue`
将值、`refs` 或 `getters` 规范化为值。这与` unref()` 类似，不同的是此函数也会规范化 ``getter`` 函数。如果参数是一个 `getter`，它将会被调用并且返回它的返回值。
这可以在组合式函数中使用，用来规范化一个可以是值、`ref` 或 `getter`的参数。

主要用于在组合式函数中规范化参数
```js
import type { MaybeRefOrGetter } from 'vue'

function useFeature(id: MaybeRefOrGetter<number>) {
  watch(() => toValue(id), id => {
    // 处理 id 变更
  })
}

// 这个组合式函数支持以下的任意形式：
useFeature(1)
useFeature(ref(1))
useFeature(() => 1)
```

### `isProxy`
检查一个对象是否是由 `reactive`、`readonly`、`shallowReactive`、`shallowReadonly` 创建的代理
### `isReactive`
检查一个对象是否是由 `reactive` 或 `shallowReactive` 创建的代理
#### `isReadonly`
检查传入的值是否为只读对象,通过 `readonly` 和 `shallowReadonly` 创建的代理都是只读的，(不能是`ref`对象)
## 6.12.3 进阶API
### `shallowRef`、`shallowReactive`
对应`ref`与`reactive`，开启浅层监听
```js
const shallowArray = shallowRef([
  /* 巨大的列表，里面包含深层的对象 */
])

// 这不会触发更新...
shallowArray.value.push(newObject)
// 这才会触发更新
shallowArray.value = [...shallowArray.value, newObject]

// 这不会触发更新...
shallowArray.value[0].foo = 1
// 这才会触发更新
shallowArray.value = [
  {
    ...shallowArray.value[0],
    foo: 1
  },
  ...shallowArray.value.slice(1)
]
```


### `triggerRef`
强制触发`ref`与`reactive`，的浅层监听
```js
const shallow = shallowRef({
  greet: 'Hello, world'
})

// 触发该副作用第一次应该会打印 "Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet)
})

// 因为是浅层监听，不会触发watchEffect事件
shallow.value.greet = 'Hello, universe'

// 强制触发浅层监听
triggerRef(shallow)
```
### `customRef`
创建一个自定义的`ref`，显式声明对其依赖追踪和更新触发的控制方式

* 示例：创建一个防抖 `ref`，即只在最近一次 `set` 调用后的一段固定间隔后再调用
```js
import { customRef } from 'vue'

export function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
```

```vue
<script setup>
import { useDebouncedRef } from './debouncedRef'
const text = useDebouncedRef('hello')
</script>

<template>
  <input v-model="text" />
</template>
```
### `shallowReadonly`
`readonly`的浅层监听
### `toRaw`
返回由 `reactive`、`readonly`、`shallowReactive`、`shallowReadonly`创建的代理对应的原始对象
```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```
### `markRaw`
将一个对象标记为不可被转为代理。返回该对象本身。
```js
const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false  isReactive:检查对象是否是由 `reactive` 或 `shallowReactive` 创建的代理

// 也适用于嵌套在其他响应性对象
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false
```
### `effectScope`
创建一个 `effect` 作用域，方便统一管理响应式副作用(即计算属性和侦听器)

```js
const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})

// 处理掉当前作用域内的所有 effect
scope.stop()
```
### `getCurrentScope`
如果有的话，返回当前活跃的 `effect` 作用域。
### `onScopeDispose`
在当前活跃的 `effect` 作用域上注册一个处理回调函数。当相关的 `effect` 作用域停止时会调用这个回调函数。
### `getCurrentInstance`
在组件内部访问当前组件实例的属性和方法
```vue
<template>
  <div ref="ref">
    <div ref="childRef">
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";

const that = getCurrentInstance();// 获取当前实例对象this

onMounted(()=>{ 
  console.log(that.refs);// 实例对象的内容需要在onMounted生命周期之后获取
})

</script>
```
### `useCssModule`
`setup()`和`<script setup>`中访问注入的`class`
详见：[vue中的特殊选择器、方法](/frontend/css/introduction#vue中的特殊选择器、方法)


## 6.12.4 `<script setup>`API
### `defineProps`
为 `props` 定义类型 
```vue
<script setup>
const props = defineProps({
  foo: String
})
</script>
```
### `defineEmits`
为 `emits` 定义类型 
```vue
<script setup>
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// Vue3.3+：简洁的语法
const emit = defineEmits<{
  change: [id: number] // 具名元组语法
  update: [value: string]
}>()
</script>
```
### `defineExpose`
`<script setup>` 的组件属性和方法都是默认私有的,需要使用`defineExpose`显式暴露
```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const add = ()=>{count++}
// 向外暴露变量 count 和 add 方法
defineExpose({
  count,
  add
})
</script>
```

### `defineOptions`
使`<script setup>`支持声明组件选项API
```vue
<script setup>
import { onMounted } from 'vue'
defineOptions({
  name: 'HelloWorld',
  mounted() {
    console.log('mounted')
  },
})
onMounted(()=>{
  console.log('onMounted')
})
</script>
```
### `defineSlots`
为作用域插槽定义类型 
```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any
}>()
</script>
```
### 与`setup()`混合使用
```vue
<script>
// 普通 <script>, 在模块作用域下执行 (仅一次)
runSideEffectOnce()

// 声明额外的选项
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// 在 setup() 作用域中执行 (对每个实例皆如此)
</script>
```
### `useSlots`
### `useAttrs`
### `await`
`<script setup>` 中可以使用顶层 `await`。结果代码会被编译成 `async setup()`
```vue
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```
### `泛型`
```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

```vue
<script
  setup
  lang="ts"
  generic="T extends string | number, U extends Item"
>
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```