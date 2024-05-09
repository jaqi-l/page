## 2.2.1 常用选择器

1. 通用选择器：`*`

2. 元素选择器：`p`/`div`...

3. id选择器：`#id`

4. 类选择器：`.class`


## 2.2.2 属性选择器

* `E[att]` :选择具有att属性的E元素。需要选择有某个属性的元素，而不论属性值是什么，可以使用简单属性选择器。可以根据多个属性进行选择，只需将属性选择器链接在一起即可
```css
img[alt]{}
```
* `E[att="val"]`：选择具有att属性且属性值等于val的E元素。进一步缩小选择范围，（只选择有特定属性值的元素）
```css
input[type="text"]{}
```
* `E[att~="val"]`:选择具有att属性且属性值有多个，其中一个的值等于val的E元素
```css
div[class~="a"]{}
```
* `E[att|="val"]`:选择具有att属性且属性值为以val开头并用连接符"-"分隔的字符串的E元素
```css
div[class|="a"]{}
```
* `E[att^="val"]`:选择具有att属性且属性值为以val开头的字符串的E元素
```css
div[class^="a"]{}
```
* `E[att$="val"]`:选择具有att属性且属性值为以val结尾的字符串的E元素
```css
div[class$="c"]{}
```
* `E[att*="val"]`:选择具有att属性且属性值为包含val的字符串的E元素。div[class*="b"]
```css
div[class*="b"]{}
```
## 2.2.3 关系选择器

* 后代选择器（包含选择器）：EE选择某元素的所有后代目标元素。ul li<!—ul下的所有li-->
 ```css
 ul li{}
  ```
* 子元素选择器：E>E只选择某元素的目标子元素（不包含孙元素）。Ul>li<!—ul下的子元素li-->
 ```css
 ul>li{}
  ```
* 交集选择器：EE（E可以是id/class/name）#id1#id2<!—id1和id2的交集-->
 ```css
h1#title{}
  ```
* 并集选择器：E,E（E可以是#id,.class,div）
 ```css
h1,h2{}
  ```
* 相邻选择符：E+F选择紧贴在E元素之后的F元素。
 ```css
p+div{}
  ```
* 兄弟选择器:E~F选择E元素之后的所有兄弟F元素
 ```css
p~div{}
  ```
## 2.2.4 伪元素选择器

* `E:first-letter`/`E::first-letter` 设置元素内的第一个字符的样式（用于块对象）

* `E:first-line`/`E::first-line`设置元素内的第一行的样式（用于行内元素）

* `E:before`/`E::before`在每个 E元素的内容之前插入内容。用来和content属性一起使用（行内元素）


* `E:after`/`E::after`在每个E元素的内容之后插入内容。用来和content属性一起使用（行内元素）

* `E:marker`在每个`li`元素的内容之前插入内容。用来和content属性一起使用，设置列表项的图标

* `E::selection`设置对象被选择时的颜色，背景

* `:scope`用于代替当前元素的选择器,相当于预编译器中的`&`
## 2.2.5 伪类选择器结构伪类选择器

* `:root`:选择文档的根元素

* `E:first-child`:选择第一个元素，是E则选，不是选

* `E:last-child`:选择最后一个元素，是E则选，不是选

* `E:nth-child(n)`:选择第n个元素，是E则选，不是选

* `E:nth-last-child(n)`:选择倒数第n个元素，是E则选，不是选



* `E:first-of-type` :选择E元素中的，第一个元素

* `E:last-of-type`:选择E元素中的，最后一个元素

* `E:nth-of-type(n)`:选择E元素中的，第n个E元素

* `E:nth-last-of-type(n)`:选择E元素中的，倒数第n个E元素



* `E:only-child`:选择父元素中子元素只有一个E的E元素

* `E:only-of-type`:选择父元素中子元素只有一个E类型的E元素

* `E:empty`:匹配没有任何子元素（包括text节点）的元素E

* `E:has()`选择包含指定元素的 E 元素(<span style="color: red">*</span>CSS 2023新增)
```css
/* 选择包含 p 元素的 div 元素 */
div:has(p) {
  color: red;
}

/* 选择包含 p 元素或 a 元素的 div 元素 */
div:has(p,a) {
  color: red;
}

/* 选择紧跟 p 元素的 div 元素 */
div:has(+p) {
  color: red;
}
```

* `E:not()`选择不包含指定元素的 E 元素(<span style="color: red">*</span>CSS 2023新增)

```css
/* 选择不含 p 元素的 div 元素 */
div:not(:has(p)) {
  color: red;
}

/* 选择不包含 p 元素且不包含 a 元素的 div 元素 */
div:not(:has(p,a)) {
  color: red;
}
```


* `:is() E`选择多个指定元素中的 E 元素(<span style="color: red">*</span>CSS 2023新增，优先级由括号中的参数决定)

```css
/* 选择 article, section, aside 元素中的 p 元素 */
:is(article, section, aside) p {
  color: red;
}

/* 等同于 优先级也相同 */
article > p,
section > p,
aside > p {
  color: red;
}

```

* `:where()`选择多个指定元素中的 E 元素(<span style="color: red">*</span>CSS 2023新增，优先级为0)

```css
article > p,
section > p,
aside > p {
  color: green;
}

/* where的优先级为0，尽管写在后面仍不生效 */
:where(article, section, aside) p {
  color: blue;
}
```

::: tip
1. N的取值：数值、奇数（odd）偶数(even)、公式3n

2. `nth-of`属性<span style="color: red">*</span>CSS 2023新增    
```css
/* 选择p元素中第二个是.highlight的标签 */
p:nth-child(2 of .highlight) {
  outline: 0.3rem dashed hotpink;
  outline-offset: 0.7rem;
}
```
:::

## 2.2.6 UI伪类及其他选择器


* `E:active`:向被激活的元素添加样式

* `E:hover`:当鼠标悬浮在元素上方时，向元素添加样式

* `E:link`:向未被访问的链接添加样式

* `E:visited`:向已被访问的链接添加样式

* `E:focus`:向拥有键盘输入焦点的元素添加样式

* `E:lang`:向带有指定 lang 属性的元素添加样式

* `input:checked`:选择每个被选中的input元素

* `input:disabled`:选择每个禁用的input元素

* `input:enabled`:选择每个启用的input元素 

* `input:disabled`:选择每个禁用的input元素

* `#E:target`:目标伪类选择器：选择当前活动的元素(某个被链接的元素)

* `:not(E)`:选择E元素之外的每个元素

::: warning
`:`不支持IE6，`::`不支持IE5.5/6/7/8
:::


## 2.2.7 深度选择器

详见：[样式私有化-深度选择器](/frontend/css/introduction#深度选择器)