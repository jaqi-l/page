# 3.11 DOM
## 3.11.1基本概念
每个载入浏览器的HTML文档都会成为Document对象。

Document对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。

Document对象是Window对象的一部分

当浏览器打开一个HTML文档时，浏览器解析HTML文档的标记，并创建表示这些标记的对象，这些对象就是HTML文档对象。

文档对象即Document对象，指的是一回事。

## 3.11.2获取DOM常用方法
* `getElementById`返回拥有指定 id 的第一个对象的引用。
```js
var x=document.getElementById("id")
```

* `getElementsByName`返回拥有指定name的对象的集合。ie中只对表单元素中的name有效
```js
var x=document.getElementsByName("name");
```

* `getElementsByTagName`返回带有指定标签名的对象集合。Ie8+
```js
var x=document.getElementsByTagName("div")[0]
```

* `getElementsByClassName`返回文档中所有指定class的元素集合。
```js
var x=document.getElementsByClassName("class")[0]
```

* `querySelector`返回指定元素节点的子树中匹配选择器的集合中的第一个元素，如果没有匹配返回null,Ie9+
```js
var x=document.querySelectorAll(".example");
```

* `querySelectorAll`按文档顺序返回指定元素节点的子树中匹配选择器的元素集合，如果没有匹配返回空集合,Ie8+
```js
  var list=document.querySelectorAll(".example1,.example2");
  var example1 = list[0]
```

::: warning
* `querySelectorAll`查找元素是非实时的，即不支持有动态添加元素情况下的查找
:::
## 3.11.3操作DOM对象
在DOM中，Element对象表示HTML元素。

* `innerHTML`设置或返回元素的内容。
```js
element.innerHTML="hello word";
```
* `tagName`返回元素的标签名。


* `id`设置或返回元素的id。
```js
element.id
```
* `className`设置或返回元素的class属性。

* `title`设置或返回元素的title属性。

* `style`设置或返回元素的style属性。
```js
element.style.width="100px";
element.style.cssText="width:100px";
```
:::tip
1. className
```js
element.className="width:100px" 
```
2. getComputedStyle
```js
var element = querySelector.getElementById("test");
Window.getComputedStyle(element, false)["属性名"]
//兼容：
function getStyle(obj,attr){
   if(window.getComputedStyle){
    return window.getComputedStyle(obj,false)[attr];
   }else{
    return obj.currentStyle[attr];
   }
  }
```
3. getPropertyValue
```js
var element = querySelector.getElementById("test");
window.getComputedStyle(element, null).getPropertyValue("CSS属性")
```
:::


* `getAttribute`返回元素节点指定属性值的属性值。
```js
a.getAttribute("target"); //_black
```
* `setAttribute`把指定属性设置或更改为指定值。

* `removeAttribute`从元素中移除指定属性。



* `createElement`创建一个元素(节点)。
```js
var btn=document.createElement("BUTTON");
```
* `appendChild`向元素列表的末尾添加新的子节点。
```js
document.body.appendChild(btn) //添加到body中.
```
* `removeChild`从元素中移除子节点。
```js
ul.removeChild(li)
```
* `insertBefore`向元素添加新的子节点，作为第一个子节点。
```js
ul.insertBefore(newItem1, newItem2);
```
* `cloneNode`元素克隆,(true)复制子元素,()不复制子元素
```js
li.cloneNode(true)
```
* `replaceChild`替换元素中的子节点。
```js
ul.insertBefore(newLi、, oldLi);
```
* `write`向文档写HTML表达式或JavaScript代码。
:::tip
文档加载之后使用docunment.write()会覆盖原文档.
:::

## 3.11.5DOM节点
HTML 文档中的所有内容都是节点。

整个文档是一个文档节点、每个 HTML 元素是元素节点、HTML 元素内的文本是文本节点

每个 HTML 属性是属性节点、注释是注释节点。


节点的属性：(名称、类型、值)

* `nodeName`返回元素的名称。与`tagName`作用相同
文本节点的名称为:#text;文档节点的名称为:#document. 

* `nodeType`返回元素的节点类型。 

> 元素节点返回 1  
> 属性节点返回 2  
> 文本节点返回 3

* `nodeValue`设置或返回元素值。 
> 文本节点返回文本内容
> 属性节点返回属性值
> 元素节点无nodeValue
```js
var x=document.getElementById("demo").childNodes[0].nodeValue;
```

#### 父子节点属性

* `parentNode`返回元素的父节点。

* `childNodes`返回元素子节点的NodeList类似CSS中的子选择器（包括文本，标签，和回车，可以借助nodetype筛选）

* `children`返回元素的子元素,该属性只返回元素节点。

* `firstChild`（识别回车）和element.firstElementChild 返回元素的首个子元素。类似CSS中的：e:first-child

* `lastChild`（识别回车）和element.lastElementChild 返回元素的最后一个子元素。类似CSS中的：e:last-child

#### 兄弟节点属性

* `previousSibling`返回位于相同节点树层级的前一个元素（包括文本节点、注释节点即回车、换行、空格、文本等等）。

* `previousElementSibling`返回位于相同节点树层级的前一个元素。

* `nextSibling`返回位于相同节点树层级的后一个元素（包括文本节点、注释节点即回车、换行、空格、文本等等）。

* `nextElementSibling`返回位于相同节点树层级的后一个元素。
```js
var x = document.getElementById("li").nextElementSibling.innerHTML;
```
#### 文件节点属性

* `attributes`返回指定节点的属性集合，即NamedNodeMap。
```html
<p id="demo" class="demo" onclick="myFunction()"></p>
```
```js
	var x=document.getElementById("demo").attributes.length; //x=3 id/class/onclick
```
:::tip
### [浏览器兼容情况查询](https://caniuse.com/#)
:::
