## 1.3.1 id
id属性用于指定元素的识别名称，相当于一个人的身份证，是唯一的，同一个文档中不能有重复的id；一般配合CSS和JavaScript来选择元素。 
## 1.3.2 class
class属性用于指定元素的类别名称，可以使用class元素给同一个文档中的多个元素进行归类，CSS就可以通过class个同一类元素设置统一的样式。
## 1.3.3 style
stlyle属性用于给元素设定样式（内联样式或内部样式表）。

## 1.3.4 title
title属性用于显示省略的内容（或补充/提示说明的内容）：当光标移动到元素内容上时显示title里的内容.。

## 1.3.5 dir
dir属性用于设定元素标签内容的文字方向.与bdo元素共同作用。

## 1.3.6 lang
lang属性用于指定语言，比如中文还是英文：zh-cn/en;除了在html标签中设置，它还可以在特定元素中使用，改变该元素使用的语言。

## 1.3.7 accesskey
元素快捷键

## 1.3.8 tabindex
元素移动顺序
## 1.3.9 draggable
元素拖动
## 1.3.10 contenteditable
元素是否允许编辑
## 1.3.11 hidden
隐藏元素
## 1.3.12 spellchcheck
元素检查

## 1.3.13 contextmenu
元素快捷菜单

## 1.3.14 data-
自定义属性
```html
<div data-自定义属性名="属性值">
```
```js
.data("属性名")
```
::: danger

1. name和id属性：属性值必须是大小写英文字母开头；其余部分可以包含字母、数字、下划线、点等符号；属性值是区分大小写的

2. 属性值为数值时，必须输入正整数，不可谓0

3. width,height是属性值：如果设置为正整数时，单位默认为px（像素），不需要加上单位；但是在style中必须注明单位，否则会出错

:::