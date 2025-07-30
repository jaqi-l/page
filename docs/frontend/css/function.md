# 2.9 CSS函数与预编译器
## 2.9.1 CSS函数
### attr
`attr`返回选择元素的属性值。
```css
a:after {content: " (" attr(href) ")";}
```
### calc
`calc`动态计算属性值。支持 `+`、`-`、`*`、`/`运算符,采用标准数学运算优先级规则
```css
div {
    width: calc(100% - 100px);
    width: calc(100vh/3 - 100px);
}
```
::: warning
需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
:::

### var
`var`插入自定义的属性值。属性名必须以`--`开头
```css
:root {
  --main-bg-color: coral;
}
 
#div1 {
  background-color: var(--main-bg-color);
}
 
#div2 {
  background-color: var(--main-bg-color);
}
```

vue中通过定义自定义属性值
```html
<div :style="{'--top-bar-height':topBarHeight}"></div>
```
<span style="color: red">*</span>Vue3`v-bind`写法,详见：[vue中的特殊选择器、方法](/frontend/css/introduction#vue中的特殊选择器、方法)

### clamp
`clamp`函数的作用是把一个值限制在一个上限和下限之间
`clamp(MIN, VAL, MAX)`
```css
body {
  margin: 0 auto;
  width: min(1000px, calc(70% + 100px));
}

h1 {
  letter-spacing: 2px;
  font-size: clamp(1.8rem, 2.5vw, 2.8rem);
}

p {
  line-height: 1.5;
  font-size: max(1.2rem, 1.2vw);
}
```

### rgb
`rgb`使用rgb模式设置颜色
### rgba
`rgba`使用rgba模式设置颜色

### hsl
`hsl`使用HSL模式设置颜色
### hsla
`hsla`使用HSLA模式设置颜色

### color-mix(<span style="color: red">*</span>CSS 2023新增)
`color-mix`混合两个颜色值
> `params1`:色彩模式    
> `params2`:要混合的颜色 
```css
color-mix(in lch, plum, pink);
color-mix(in lch, plum 40%, pink);
color-mix(in srgb, #34c9eb 20%, white);
color-mix(in hsl longer hue, hsl(120 100% 50%) 20%, white);
```

### 嵌套(<span style="color: red">*</span>CSS 2023新增)
### 级联层(<span style="color: red">*</span>CSS 2023新增)
### 作用域`@scope`(<span style="color: red">*</span>CSS 2023新增)
```css
/* 限定只能在.card元素内生效 */
@scope (.card) {
  .title { 
      color:red;
  }
}

/* 限定只能在.card 到 .content 之间的元素生效，不包含 .content */
@scope (.card) to (.content) {
  .title { 
      color:red;
  }
}
```

::: tip
 `@scope`、`:scope`、`&` 的区别
1. `@scope` 本身不会影响 CSS 优先级权重计算
:::

### 三角函数(<span style="color: red">*</span>CSS 2023新增)

## 2.9.2 LESS

#### 导入
```less
@import "library.less";
```
#### 变量
```less
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

#### 混入
```less
.public {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
  button{
     background-color: grey;
  }
}

#menu a {
  color: #111;
  .public();
}

#nav a {
  color: red;
  .public().button(); /* 还可以写成 .public > .button() */
}
```

#### 映射
```less
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

#### 嵌套
```less
#header {
  color: black;
  .logo {
    width: 300px;
  }
  &:after {
    content: "";
  }
}
```

#### 规则嵌套和冒泡
外层规则会放在前面
```less
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}
```

#### 运算
```less
@base: calc(~"100vh - 50px");

@var: 50vh/2;
div {
    width: calc(@var ~'- 5px'); /* less语法下calc的特殊清空 */
}

```
::: warning 
less语法在加减运算时会进行单位转换。因此在使用calc属性时需要使用转义`~`进行特殊处理。
:::

#### 函数
* `percentage`:
```less
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // 0.5转换城50%
  color: saturate(@base, 5%); // 饱和度增加5%
}
```

#### 作用域
如果当前作用域找不到，则从父级查找，同时支持预编译可以先引用后定义。
```less
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```
## 2.9.3 SCSS(SASS)

[SCSS](https://www.sasscss.com/)

### SASS 与 SCSS
SCSS 语法（ .scss ）最为常用。它是 CSS 的超集，这意味着所有有效的 CSS 也是有效的 SCSS。    
缩进语法（ .sass ）则不太常见：它使用缩进来嵌套语句，使用换行符而不是分号来分隔它们。


#### 导入

* `@import` <Badge type="danger" text="1.80.0 已弃用" />
```scss
// 1.80.0 以下版本
@import "library.scss";
```


* `@use` <Badge type="tip" text="^1.80.0" /> ，不会“链式传递”变量，但可以设置变量    

```scss
@use "library.scss";
@use "library.scss" as theme; // 别名导入
// 使用
.cover-title {
  font-size: theme.$font-lg;
  color: theme.$color;
}

// 导入时设置变量 ，with的作用是覆盖转发模块的默认值
@use "library.scss" as theme with (
  $color: red
);

```

* `@forward` 转发其他 `Sass` 文件的内容，不会直接导入，如果当前文件需要使用则需要使用 `@use` 导入   
> 核心价值是：允许将 Sass 库拆分到多个文件中管理，同时让用户只需加载一个入口文件即可使用所有转发的成员，简化库的使用流程

```scss
// src/_list.scss（被转发的模块）
@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

// bootstrap.scss（入口文件，转发模块）
// bootstrap.scss 文件内无法使用转发的模块
@forward "src/list"; // 转发 src/_list.scss 中的成员

// styles.scss（用户文件，使用入口文件）
@use "bootstrap"; // 加载入口文件
li {
  @include bootstrap.list-reset; // 使用被转发的 mixin
}
```

```scss
@forward "library.scss";
@forward "library.scss" as theme; // 别名转发所有变量

@forward "../theme.scss" show $font-lg ;  // 转发指定变量 隐藏其他变量

@forward "../theme.scss" hide $font-lg ;  // 隐藏指定变量

@forward "library.scss" as theme with (
  $color: red
);
```

#### 变量
```scss
$width: 10px;
$height: $width + 10px;

#header {
  width: $width;
  height: $height;
}

$side : left;
// 字符串嵌套 #{}
.rounded {
    border-#{$side}-radius: 5px;
}
```



#### 嵌套与属性嵌套
```scss
#header {
  color: black;
  .logo {
    width: 300px;
  }
  &:after {
    content: "";
  }
  //  属性的嵌套
  border: {
    color: red;
  }
}
```



#### 运算
```scss

@var: 50vh/2;
body {
    margin: (14px/2);
    top: 50px + 100px;
    right: $var * 10%;
}
```


#### 继承`@extend`
```scss
.class1 {
    border: 1px solid #ddd;
}
.class2 {
    @extend .class1;
    font-size:120%;
}
```

#### 混入`@mixin`
```scss
@mixin left {
    float: left;
    margin-left: 10px;
}

div {
  @include left;
}
```
* 指定参数和缺省值
```scss
@mixin left($value: 10px) {
    float: left;
    margin-right: $value;
}

div {
    @include left(20px);
}


@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

* 指定选择器的参数、要注入样式
```scss
@mixin b($block){
  .#{$block}{ // 选择器的参数
    background-color: blue;
    @content; // 要注入的样式
  }
}
// 使用
@include b(test){
  color: red;
}

// 渲染结果
.test {
  background-color: blue;
  color: red;
}
```

#### `@at-root`
让其内部的样式规则或选择器跳过正常的嵌套层级，直接输出到文档的根级别，常见于结合父选择器 `&` 或选择器函数（如 `selector.unify()`）进行复杂选择器组合时

```scss
.card {
  padding: 16px;

  // 用 @at-root 让子元素成为顶级选择器
  @at-root .card_title { 
    font-size: 18px;
  }

  // 用 @at-root 让修饰符成为顶级选择器
  @at-root .card_large { 
    padding: 24px;
  }
}

.card {
  padding: 16px;
}
.card_title {
  font-size: 18px;
}

.card_large {
  padding: 24px;
}


// 不使用`@at-root`的效果

.card {
  padding: 16px;

  // 用 @at-root 让子元素成为顶级选择器
  .card_title { 
    font-size: 18px;
  }

  // 用 @at-root 让修饰符成为顶级选择器
  .card_large { 
    padding: 24px;
  }
}

.card {
  padding: 16px;
}
.card .card_title {
  font-size: 18px;
}
.card .card_large {
  padding: 24px;
}
```

- `with`/`without`    
> 可选值：    
>> `rule`:普通样式规则（如 `.class { ... }` 或 `a { color: red; }`）   
>> `media`:媒体查询规则（`@media`）    
>> `supports`:特性检测规则（`@supports`）    
>> `all`:所有 at-rules（包括` @media`、`@supports`、`@keyframes` 等）    
```scss
.card {
  display: flex;

  // .title的样式跳出父级嵌套
  @at-root (with: rule) {
    .title {
      font-size: 20px;
    }
  }
}

// 编译结果
.card {
  display: flex;
}
.card .title {
  font-size: 20px;
}


.card {
  display: flex;
  
  // 排除.title的样式跳出父级嵌套
  @at-root (without: rule) {
    .title {
      font-size: 20px;
    }
  }
}

.card {
  display: flex;
}
.title {
  font-size: 20px;
}
```

```scss
@media print {
  .page {
    width: 8in;

    @at-root (without: media) { // 排除 media 规则，样式直接在根级别
      color: #111;
    }

    @at-root (with: rule) { // 仅保留样式规则，排除其他 at-rules
      font-size: 1.2em;
    }
  }
}
```

#### 运算符 
- `+`、`-`、`*`、`%`、`/`  
常见的数学运算符，示例：

```scss
  $a: 10px + 5px;   // 15px
  $b: 20px - 5px;   // 15px
  $c: 2 * 8;        // 16
  $d: 10 % 3;       // 1
  $e: 20px / 2;     // 10px
```

::: warning
`/` 在 SCSS 中既是除法运算符，也是 CSS 的分隔符。建议用 `math.div()` 进行除法运算，避免歧义。
:::

- 关系与比较运算符：`==`、`!=`、`>`、`<`、`>=`、`<=`
```scss
  $is-equal: 5 == 5;      // true
  $is-greater: 10 > 5;    // true
  $is-less: 3 < 2;        // false
```

- 逻辑运算符：`and`、`or`、`not`
```scss
  $a: true and false;      // false
  $b: true or false;       // true
  $c: not false;           // true
```

- 字符串插值
```scss
  $side: left;
  .rounded {
    border-#{$side}-color: red; // border-left-color: red;
  }
```

- 单位自动转换
```scss
  $len: 1in + 10mm; // 1.3937in
```

#### `math` 
数学模块，提供数学运算函数。

- **math.div($number1, $number2)**  
除法，推荐用法（`/` 会被当作 CSS 运算符）
```scss
  @use 'sass:math';
  width: math.div(600px, 960px) * 100%; // 62.5%
```
- **math.round($number)**  
四舍五入
```scss
  @use 'sass:math';
  $value: math.round(2.6); // 3
```
- **math.max($numbers...)**  
取最大值
```scss
  @use 'sass:math';
  $max: math.max(1, 5, 3); // 5
```

#### `color`
颜色处理模块，支持颜色调整、混合等。

- **color.scale($color, $lightness: 20%)**  
调整颜色的亮度、饱和度等。
```scss
  @use 'sass:color';
  $new: color.scale(#f00, $lightness: 20%);
```
- **color.mix($color1, $color2, $weight: 50%)**  
混合两种颜色
```scss
  @use 'sass:color';
  $mix: color.mix(#f00, #00f, 30%);
```
- **color.adjust($color, $red: 10, $blue: -10)**  
调整颜色通道
```scss
  @use 'sass:color';
  $adj: color.adjust(#f00, $green: 50);
```

- **lighten($color, $amount)**  
使颜色变亮。`$amount` 为变亮的百分比。常用于提升背景色或强调色的明度。
```scss
  lighten(#cc3, 10%) // #d6d65c
```
- **darken($color, $amount)**  
使颜色变暗。`$amount` 为变暗的百分比。常用于降低颜色的明度，使其更适合作为阴影或边框色。
```scss
  darken(#cc3, 10%) // #a3a329
```
- **grayscale($color)**  
将颜色转换为灰度（无彩色）。常用于图片滤镜或需要去色的场景。
```scss
  grayscale(#cc3) // #808080
```
- **complement($color)**  
获取颜色的补色（色轮上相对的颜色）。常用于配色设计，增强对比度。
```scss
  complement(#cc3) // #33c
 ```

#### `meta`
元编程相关模块，用于判断类型、变量等。

- **meta.type-of($value)**  
获取值的类型
```scss
  @use 'sass:meta';
  $type: meta.type-of(42); // number
```
- **meta.global-variable-exists($name)**  
判断全局变量是否存在
```scss
  @use 'sass:meta';
  @if meta.global-variable-exists(color) { ... }
```

#### `selector`
选择器处理相关模块。

- **selector.nest($selectors...)**  
  嵌套选择器
```scss
  @use "sass:selector";
  $sel: selector.nest(".foo", "&:hover"); // .foo:hover
  // 使用
  #{$sel} {
		color: red;
	}
```
- **selector.append($selectors...)**  
追加选择器
```scss
  @use "sass:selector";
  $sel: selector.append(".foo", ".bar"); // .foo.bar
  // 使用
  #{$sel} {
		color: red;
	}
```

#### `string`
字符串处理相关模块。

- **string.length($string)**  
字符串长度
```scss
  @use 'sass:string';
  $len: string.length("hello"); // 5
```
- **string.insert($string, $insert, $index)**  
插入字符串
```scss
  @use 'sass:string';
  $str: string.insert("hello", " world", 6); // "hello world"
```
- **string.to-upper-case($string)**  
转大写
```scss
  @use 'sass:string';
  $up: string.to-upper-case("abc"); // "ABC"
```

#### `list`
列表处理相关模块

- **list.length($list)**  
列表长度
```scss
  @use 'sass:list';
  $len: list.length(1 2 3); // 3
```
- **list.join($list1, $list2, $separator: auto)**  
合并列表
```scss
  @use 'sass:list';
  $joined: list.join(1 2, 3 4); // 1 2 3 4
```
- **list.nth($list, $n)**  
取第 n 个元素
```scss
  @use 'sass:list';
  $item: list.nth(a b c, 2); // b
```

#### 控制语句
* `@if`
```scss
@if lightness($color) > 30% {
  background-color: #000;
} @else {
  background-color: #fff;
}
```

* `@for`

```scss
@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
```

* `@while`

```scss
$i: 6;

@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

* `@each`

```scss
@each $member in a, b, c, d {
  .#{$member} {
    background-image: url("/image/#{$member}.jpg");
  }
}
```

#### 自定义函数
```scss
@function double($n) {
  @return $n * 2;
}
#sidebar {
    width: double(5px);
}
```

::: tip 扩展函数库：
[SassMagic](http://w3cplus.github.io/SassMagic/#undefined-function-decimal-round)
:::

#### 调试工具 `@error`、`@warn`、`@debug`

- **@error**  
抛出错误并终止编译
```scss
  @error "在控制台打印错误";
```
- **@warn**  
输出警告但不终止编译
```scss
  @warn "在控制台打印警告";
```
- **@debug**  
输出调试信息用于开发
```scss
  @debug "进入调试模式";
```

## 2.9.4 Stylus

### 缩排
`Stylus`语法是基于缩进，空格有重要的意义，使用缩排和凹排代替花括号`{`及`}`
```stylus
body
  color white
/* 编译后 */
body {
  color: #fff;
}
```
### 规则集
```stylus
textarea, input
  border 1px solid #eee
/* 其他写法 */
textarea
input
  border 1px solid #eee
/* 编译后 */
textarea,
input {
  border: 1px solid #eee;
}
```


### 嵌套
```stylus
textarea
input
  color #A7A7A7
  &:hover
    color #000
/* 编译后 */
textarea,
input {
  color: #a7a7a7;
}
textarea:hover,
input:hover {
  color: #000;
}
```
### 变量
```stylus
font-size = 14px

body
  font font-size Arial, sans-seri
/* 编译后 */
body {
  font: 14px Arial, sans-serif;
}
```

### 属性查找
```stylus
#logo
  position: absolute
  top: 50%
  left: 50%
  width: 150px
  height: 80px
  margin-left: -(@width / 2)
  margin-top: -(@height / 2)

  body
  color: red
  ul
    li
      color: blue
      a
        background-color: @color  /* color=blue 一直向上查找 */
```

### 插值
```stylus
vendor(prop, args)
  -webkit-{prop} args
  -moz-{prop} args
  {prop} args

border-radius()
  vendor('border-radius', arguments)

box-shadow()
  vendor('box-shadow', arguments)

button
  border-radius 1px 2px / 3px 4px
/* 编译后 */
button {
  -webkit-border-radius: 1px 2px / 3px 4px;
  -moz-border-radius: 1px 2px / 3px 4px;
  border-radius: 1px 2px / 3px 4px;
}
```

```stylus
table
  for row in 1 2 3 4 5
    tr:nth-child({row})
      height: 10px * row
/* 编译后 */
table tr:nth-child(1) {
  height: 10px;
}
table tr:nth-child(2) {
  height: 20px;
}
table tr:nth-child(3) {
  height: 30px;
}
table tr:nth-child(4) {
  height: 40px;
}
table tr:nth-child(5) {
  height: 50px;
}
```

### 运算符

* 一元运算符 
```stylus
!0              // => true
!!0             // => false
!1              // => false
!!5px           // => true
-5px            // => -5px
--5px           // => 5px
not true        // => false
not not true    // => true
```

* 二元运算符    
下标运算符`[]`允许我们通过索引获取表达式内部值。括号表达式 可以充当元组（如`(15px 5px)`,`(1, 2, 3)`）
```stylus
add(a, b)
  if a is a 'unit' and b is a 'unit'
    a + b
  else
    (error 'a 和 b 必须是 units!')

body
  padding add(1,'5')              // => padding: error "a 和 b 必须是 units";
  padding add(1,'5')[0]           // => padding: error;
  padding add(1,'5')[0] == error  // => padding: true;
  padding add(1,'5')[1]           // => padding: "a 和 b 必须是 units";
```

* 范围`..` `...`
```stylus
1..5                              // => 1 2 3 4 5
1...5                             // => 1 2 3 4
```

* 加减：`+` `-`   
二元加乘运算其单位会转化，或使用默认字面量值。例如，`5s - 2px`结果是`3s`
```stylus
15px - 5px                        // => 10px
5 - 2                             // => 3
5in - 50mm                        // => 3.031in
5s - 1000ms                       // => 4s
20mm + 4in                        // => 121.6mm
"foo " + "bar"                    // => "foo bar"
"num " + 15                       // => "num 15"
```

* 乘除：`*` `/` `%`
二元加乘运算其单位会转化，或使用默认字面量值。例如，`5s - 2px`结果是`3s`
```stylus
2000ms + (1s * 2)                 // => 4000ms
5s / 2                            // => 2.5s
4 % 2                             // => 0
```
当在属性值内使用`/`时候，你必须用括号包住。否则 `/`会根据其字面意思处理（支持`CSS`的`line-height`）
```stylus
font: 14px/1.5;                   // 但是，下面这个却等同于14px ÷ 1.5
font: (14px/1.5);                 // 只有/操作符的时候需要这样
```

* 指数：`**`
```stylus
2 ** 8                            // => 256
```

* 相等与关系运算：`==`、`!=`、`>=`、`<=`、`>`、`<`
```stylus
5 == 5                            // => true
10 > 5                            // => true
#fff == #fff                      // => true
true == false                     // => false
wahoo == yay                      // => false
wahoo == wahoo                    // => true
"test" == "test"                  // => true
true is true                      // => true
'hey' is not 'bye'                // => true
'hey' isnt 'bye'                  // => true
(foo bar) == (foo bar)            // => true
(1 2 3) == (1 2 3)                // => true
(1 2 3) == (1 1 3)                // => false
```

别名：    
`==` 别名 `is`    
`!=` 别名 `is not`或`isnt`    

* 真与假
`true`例子：
```stylus
0%
0px
1px
-1
-1px
hey
'hey'
(0 0 0)
('' '')
```

`false`例子：
```stylus
0
null
false
```

* 逻辑操作符`&&`、`||`、`or`    
`&&`和`||` 别名是 `and`和`or`
```stylus
5 && 3                                // => 3
0 || 5                                // => 5
0 && 5                                // => 0
#fff is a 'rgba' and 15 is a 'unit'   // => true
```

* 存在操作符`in`
```stylus
nums = 1 2 3
1 in nums                             // => true
5 in nums                             // => false

words = foo bar baz
bar in words                          // => true
HEY in words                          // => false

vals = (error 'one') (error 'two')
error in vals                         // => false
(error 'one') in vals                 // => true
(error 'two') in vals                 // => true
(error 'something') in vals           // => false
```

* 条件赋值`?=` `:=`   
`?=`别名`?:`
```stylus
color := white
color ?= white
color = color is defined ? color : white
```

* 从最高到最低：    
`[]`    
`!` `~` `+` `-`   
`is` `defined`    
`**` `*` `/` `%`    
`+` `-`    
`...` `..`    
`<=` `>=` `<` `>`    
`in`    
`==` `is` `!=` `is` `not` `isnt`    
`is` `a`    
`&&` `and` `||` `or`    
`?:`    
`=` `:=` `?=` `+=` `-=` `*=` `/=` `%=`    
`not`    
`if` `unless`    

## 2.9.5 PostCSS