## 4.1 基本介绍
jQuery不是新的语言，由原生js封装的js类库，常用于大量直接操作DOM

* 类库：jQuery/ZEPTO(移动端)提供一些常用方法，任何项目可以导入该库去使用里面的方法，完成我们自己的业务逻辑。

* 插件：有一定的业务功能的 例如轮播图插件、选项卡插件、模态框等（插件规定了当前这个功能的样式和结构，实现的功能用js封装）。

* UI组件：把结构、样式、行为全部封装好，我们想实现一个功能，直接导入进来（Bootstrap）。

* 框架：具备一定的变成思想 开发者按照其思想开发，一般框架提供了常用的类库、插件、UI组件（vue/react/angular/backbone）。

## 4.2 选择器
```js
$("p")
$(".demo")
$("#one")
$("*")
$(".box1 p")
$(".box1 p.cur")
$(".box1,#p1")
```
## 4.3 jQuery与原生js转化
jQuery对象--->原生js对象
```js
$("div")[0]
```
原生js对象--->jQuery对象
```js
$(this)
```
## 4.4 jQuery常用方法
* 设置：
```js
.html("") // === innerHTML
```
* 获取：.html() 
```js
element.html() 
```
* 设置/获取：
```js
  $("img").attr("width","180"); // === obj.style.width
```
* 添加：
```js
 $("div").addClass("box") // === obj.className
```
* 移除：removeClass 
```js
 $("div").removeClass("box")
```
* 切换：
```js
 $("div").toggleClass("box")
```

* 事件：
```js
click(fn(){}) 
on("click",function(){})
mouseover(fn(){}) 
mouseout(fn(){}) 
mousemove(fn(){})
```
:::tip on()和click()的区别:  
二者在绑定静态控件时没有区别，但是如果面对动态产生的控件，只有 on() 能成功的绑定到动态控件中。
:::
* 样式：
```js
css("width","200px")
css({"width":"500px","height":"500px"})  
css("width") // 只写一个参数 表示获取
```
* 获取元素内容宽度
$("div").width()
* 获取元素内容宽度
```js
$("div").innerWidth() 
```
innerWidth()：
* 获取元素外部宽度
```js
$("div").outerWidth() //元素内容宽度+padding+border
$("div").outerWidth(true)//元素内容宽度+padding+border+margin
```
* 动画：

显示：show(time) 隐藏hide(time) 切换toggle(time)  长宽透明度同时变换

显示：slideUp(time) 隐藏slideDown(time) 切换slideToggle(time)  高度变换

淡入：fadeIn()  淡出：fadeOut() 切换淡入淡出fadeToggle()透明度调整到：fadeTo()

* 节点：

获取子元素：
```js
$("div:(0)"); // 访问第一个div元素
```
parent()必须是亲父亲

children()必须是亲儿子

siblings()兄弟（除自己之外的亲兄弟）

find()查找后代

next()下一个兄弟

prev()一个兄弟

nextAll()后面的所以兄弟 
```js
nextAll("p")
```
prev()上一个兄弟

prevAll()前面所以兄弟

parents()所以祖先元素

eq()将所有符合的元素按照取出顺序排列

index()元素在父元素中的位置

each(function(index,element)) 为每个匹配元素规定运行的函数。（返回 false 可用于及早停止循环。）
```js
$("tr").each(function(){

$(this).children(":even").css("background","pink");

}) //隔列操作
```
* 链式编程：


点击一个元素，自己变紫，父亲蓝，兄弟黄，父亲的兄弟粉，父亲兄弟的儿子红
```js
$("div").children().click(function(){

var el = $(this).css("background","purple")  //自己

 .siblings().css("background","yellow")  //自己的兄弟

 .parent().css("background","blue")  //自己的父亲

 .siblings().css("background","pink") //父亲的兄弟 

 .children().css("background","red") //父亲的儿子

});
```js
$(function(){});
$(document).ready() //入口函数同window.onload
```
mouseenter/mouseleave代替mouseover/mouseout
创建元素
```js
$("<h1>标题</h1>");
```
父亲加儿子：.append();

儿子被加到父亲在：.appendTo();

## 4.5 jQuery下的Ajax
POST：
```js
$.post("1.php",{"k":"v"},function(data){ });//请求路径、传到服务器的数据、回调函数
```
GET：
```js
$.get("1.txt",{"k":"v"},function(data){ });//请求路径、传到服务器的数据、回调函数
```
AJAX：
```js
$.ajax(1.txt,{
"type":"get",//请求路径、请求类型
"data":{"k":v }, //传到服务器的数据
"success":function(data){},//回调函数
"error":function(xhr,textStatus,errorThrown){}//错误时的回调
},{})
```
## 4.6 表单序列化
表单序列化：把表单信息序列化成一个字符串。

Serialize：把form的表单信息转换成以URL 编码的字符串。

$("form").serialize()
