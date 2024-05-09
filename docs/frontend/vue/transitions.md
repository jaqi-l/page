## 6.10.1 `transition`单组件过渡、动画
触发条件：DOM的显示隐藏或新增移除（`v-if`、`v-show`,和组件的切换`<component>`）   
* `name`:过渡的类名
```html
  <transition name="transit">
      <p v-show="show">transit</p>
  </transition>
```
## 6.10.2 `transition-group`多组件过渡、动画

触发条件：列表项的修改，插入，删除（列表整体修改不会触发）    
* `name`:过渡的类名   
* `tag`:渲染的根元素标签，默认渲染成`span`标签。<span style="color: red">*</span>Vue3不再默认渲染  
```html
<transition-group name="list" tag="ul">
    <li v-for="item in list" :key="item" class="list">
      {{ item }}
    </li>
  </transition-group>
```
::: warning
当有相同标签名的元素切换时，需要实则`key`
:::

## 6.10.3 过渡、动画的默认类名
* 显示过程开始前的状态    `.v-enter`<span style="color: red">*</span>Vue3中替换为`v-enter-from`
* 显示过程的过渡效果    `.v-enter-active`   
* 显示过程结束后的状态    `.v-enter-to `  
* 隐藏过程开始前的状态    `.v-leave`<span style="color: red">*</span>Vue3中替换为`v-leave-from`   
* 隐藏过程的过渡效果    `.v-leave-active`   
* 隐藏过程结束后的状态    `.v-leave-to`     
::: tip   
`v`是`transition`标签的`name`属性定义的类名
:::
```html
 <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
```
* 过度
```css
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
```

* 动画
```css
.slide-fade-enter-active {
  animation: slide-fade-in .5s;
}
.slide-fade-leave-active {
  animation: slide-fade-in .5s reverse;
}
@keyframes slide-fade-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

## 6.10.4 自定义过渡、动画的类名
* 显示过程开始前的类名`enter-class`
* 显示过程中的类名`enter-active-class`
* 显示过程结束前一刻的类名`enter-to-class`

* 隐藏过程开始前的类名`leave-class`
* 隐藏过程中的类名`leave-active-class`
* 隐藏过程结束后的类名`leave-to-class`
```html
<transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
```

## 6.10.5 `duration`属性
设置过度、动画的持续时间
```html
<!-- 设置开始和结束的持续时间 -->
<transition :duration="{ enter: 500, leave: 800 }">
</transition>
```

## 6.10.6 `appear `属性
设置初始渲染的过渡
```html
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>
```

## 6.10.7 钩子
* 初始过程开始前触发`before-appear`
* 初始过程开始时触发`appear`
* 初始过程开始后触发`after-appear`
* 初始过程结束时触发`appear-cancelled`

* 显示过程开始前触发`before-enter`
* 显示过程开始时触发`enter`
* 显示过程开始后触发`after-enter`
* 显示过程结束时触发`enter-cancelled`

* 隐藏过程开始前触发`before-leave`
* 隐藏过程开始时触发`leave`
* 隐藏过程开始后触发`after-leave`
* 隐藏过程结束时触发`leave-cancelled`

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```
```js
export default {
  // ...
  methods: {
    // 在元素被插入到 DOM 之前被调用
    // 用这个来设置元素的 "enter-from" 状态
    onBeforeEnter(el) {},

    // 在元素被插入到 DOM 之后的下一帧被调用
    // 用这个来开始进入动画
    onEnter(el, done) {
      // 调用回调函数 done 表示过渡结束
      // 如果与 CSS 结合使用，则这个回调是可选参数
      done()
    },

    // 当进入过渡完成时调用。
    onAfterEnter(el) {},
    onEnterCancelled(el) {},

    // 在 leave 钩子之前调用
    // 大多数时候，你应该只会用到 leave 钩子
    onBeforeLeave(el) {},

    // 在离开过渡开始时调用
    // 用这个来开始离开动画
    onLeave(el, done) {
      // 调用回调函数 done 表示过渡结束
      // 如果与 CSS 结合使用，则这个回调是可选参数
      done()
    },

    // 在离开过渡完成、
    // 且元素已从 DOM 中移除时调用
    onAfterLeave(el) {},

    // 仅在 v-show 过渡中可用
    onLeaveCancelled(el) {}
  }
}
```
::: tip
如果仅有JavaScript 执行的动画时，最好是添加一个`:css="false"`
```html
<Transition :css="false"></Transition>
```
:::
## 6.10.8 过度模式
* 新元素先进行过度，完成之后当前元素过度离开`in-out`
* 当前元素先进行过渡，完成之后新元素过渡进入`out-in`
```html
<transition name="fade" mode="out-in"></transition>
```
::: tip
过度模式不支持`transition-group`
:::
## 6.10.9 列表过渡
* 排序过渡
* 交错过渡