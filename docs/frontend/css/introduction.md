## 2.1.1 什么是CSS3
CSS3是CSS（层叠样式表）技术的升级版本，于1999年开始制订，2001年5月23日W3C完成了CSS3的工作草案，主要包括盒子模型、列表模块、超链接方式、语言模块、背景和边框、文字特效、多栏布局等模块


## 2.1.2 插入样式的三种方法

1. 外部样式表：通过link元素引入外部样式表
```html
<link rel="stylesheet" type="text/css" href="">
```
1. 内部样式表（style中）
```html 
<style type="text/css"></style>
```
1. 内联样式表（行内）
```html
<p type="color:red"></p>
```

## 2.1.3 语法

1.  单一元素的多个属性之间用分号隔开；若只有一个可以省略

2.  多个元素之间用逗号隔开

3.  如果值为若干单词，则要给值加引号;除了这种情况外其他时候不可以加引号

4. 样式的优先顺序:
> * 设计者设计的样式>浏览器用户自定义的样式>浏览器自设的样式    
> * 行内（内联）样式>内部样式：style中的>外部样式    
> * 强制优先级：!important    

5. 层叠、继承、冲突

外观样式--比如字体、颜色可以继承;而布局有关的样式不可以继承，比如边框等

层叠性

### 优先级的判断
![weight](/weight.jpg)

* 权重的计算公式：

> 行内样式：1000    
> id选择器：0100    
> 类选择器：0010 伪类选择器：0010 属性选择器：0010 伪元素选择器：0010    
> 标签选择器：0001    

* 结构就近原则：最后加载的会覆盖前面加载的样式；

* 书写就近原则：{color:red;color:blue;}后写的会覆盖先写的属性；

## 2.1.4 样式私有化(Vue)
在单页面应用中每一个打开过的样式都会加载到全局样式里。
通过`<style>`标签的`scoped`属性可以规定样式的私有作用域比较样式污染。

```html
<style type="text/css" scoped>
</style>
```

1. 在Vue项目中使用`scoped`时，Vue会在渲染DOM时为每一个设置了私有化样式的DOM增加一个`data-v-id`的自定义属性作为全局标识。
```html
<div class="list">
    <div data-v-3b648845="" class="tagtree"></div>
</div>
```
2. 在设置了私有化样式`scoped`时，Vue会自动给最后一个选择器后面追加一个属性选择器，实现与绑定了`data-v-id`的DOM一一对应
```css
/* vue自动给`.tagtree`追加属性选择器而不是`.list` */
.list .tagtree[data-v-3b648845] {
    color:red;
}
```

::: tip 
1. 未来 `Vue` 将使用 `CSS` 原生的 [@scope](/jaqi.note/frontend/css/function/#作用域-scope-css-2023新增) 方法优化该策略。
新策略下，`Vue` 内部只需要在每个组件的根部元素上加上 `scope` 属性即可。（再也不需要一个一个元素遍历去加了）
2. 微信小程序样式隔策略`styleIsolation`详见[组件样式隔离](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E9%9A%94%E7%A6%BB)
:::

### 样式穿透
当我们使用第三方组件库且使用私有化样式`scoped`时，此时在修改第三方组件样式时会出现以下问题:

Vue在构建时(有时只会给`<el-input>`增加`data-v-id`标识)不会给内部的`<input>`标签增加`data-v-id`

```html
<div class="list" data-v-3b648845="">
    <el-input data-v-3b648845="" class="myTxt">
        <input type="text">
    </el-input>
</div>
```
但是此时会在`<input>`选择器后面增加一个`data-v-id`属性选择器，此时样式就不会生效。
```css
.list input[data-v-3b648845] {
    color:red;
}
```

### 深度选择器
本质就是修改`data-v-id`属性选择器在CSS选择其中的位置
* `>>>`写法：
```css
.list >>> input {
    color:red;
}
```

* `::v-deep`写法：
```css
.list ::v-deep input {
    color:red;
}
```

* `/deep/`写法：
```css
.list /deep/ input {
    color:red;
}
```
* `:deep()`写法：
```css
:deep(.list)  input {
    color:red;
}
```
渲染后的样式，此时他会放在使用了深度选择器的位置
```css
.list[data-v-3b648845] input {
    color:red;
}
```

::: tip 各深度选择器的区别

| 名称 | 适用场景 |
| -------- | --------  |
| `>>>`  | 原生CSS |
| `::v-deep`  | 预处理器（dart-sass） |
| `/deep/`  | 预处理器（Vue3不支持） |
| `:deep()`  | 预处理器（支持Vue3） |

:::

### vue中的特殊选择器、方法

* `:slotted`插槽选择器
```css
:slotted(div) {
  color: red;
}
```

* `:global`全局选择器
```css
:global(div) {
  color: red;
}
```

* `CSS Modules`

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

具名注入：
```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>    
```

* `useCssModule`    
在`setup()`和`<script setup>`中访问注入的`class`
```html
<script setup lang="ts">
import { ref , useCssModule} from "vue";

// 获取匿名模块
let classes = ref( useCssModule().red) // 获取classes模块的red标签

// 获取具名模块
let classes = ref( useCssModule('classes').red) // 获取classes模块的red标签
</script>

<template>
    <p id="test" :class="classes">red</p>
</template>
<style module="classes">
.red {
  color:red;
  font-size: 50px;
}
</style>    
```

* `v-bind()`
```html
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

同`css`的`var`方法,详见：[css函数](/jaqi.note/frontend/css/function/#css函数)