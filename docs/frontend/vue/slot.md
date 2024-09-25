## 6.5.1 匿名插槽
* 定义：
```html
<button>
    <slot></slot><!-- name默认default -->
</button>
```
* 使用：
```html
  <component>登陆</component>
```

## 6.5.2 具名插槽

* 定义：
```html
<div>
  <slot name="two"></slot>
  <slot name="one">默认值</slot>
  <slot name="three"></slot>
</div> 
```

* 使用：
```html

  <component>
    <template v-slot:one>
      <li></li>
    </template>
    <!-- 具名插槽缩写 -->
    <template #two> 
      <li></li>
    </template>
    <!-- 动态插槽名 -->
    <template v-slot:[dynamicSlotName]> 
      <li></li>
    </template>
    <!-- 动态插槽名缩写 -->
    <template #[dynamicSlotName]> 
      <li></li>
    </template>
  </component>
```

## 6.5.3 作用域插槽
父组件通过插槽prop调用子组件的数据
* 定义：
```html

<div>
  <!-- 插槽名称user 插槽prop参数名user -->
  <slot v-bind:user="userName" name="user">
    {{ userName.lastName }}
  </slot>
</div>
```
```js
  data() {
    return {
      userName: {
        firstName: "jaqi",
      },
    };
  },
```
* 使用：
```html
  <div id="app">
  <component>
    <!-- 获取具名插槽user，的user参数-->
    <template v-slot:user="slotProps"> 
      {{ slotProps.user.firstName }}
    </template>
  </component>
</div>
```
* 解构插槽Prop:
```html
  <div id="app">
  <component>
    <!-- 获取具名插槽user，并重命名user为name -->
    <template v-slot:user="{user:name}">  
      {{ name.firstName }}
    </template>
  </component>
</div>
```
