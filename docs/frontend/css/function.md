## CSS函数
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
<span style="color: red">*</span>Vue3`v-bind`写法,详见：[vue中的特殊选择器、方法](/jaqi.note/frontend/css/introduction/#vue中的特殊选择器、方法)

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

## LESS

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
## SCSS(SASS)

#### 导入
```scss
@import "library.scss";
```
#### 变量
```scss
$width: 10px;
$height: @width + 10px;

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
// .test {
//  background-color: blue;
//  color: red;
// }
```

#### 颜色函数
```scss
  lighten(#cc3, 10%) // #d6d65c
  darken(#cc3, 10%) // #a3a329
  grayscale(#cc3) // #808080
  complement(#cc3) // #33c
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
## Stylus

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

## PostCSS