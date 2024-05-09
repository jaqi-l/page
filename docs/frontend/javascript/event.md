## 3.12.1基本概念
事件是一些特定动作发生时所发出的信号,JavaScript中的事件是可以被JavaScript侦测到的行为。

网页中的每个元素都可以产生某些事件，我们可以在用户点击某按钮时产生一个onClick事件来触发某个函数。

## 3.12.2事件处理(绑定事件)
### DOM0级：
同一个元素的同一种事件只能绑定一个函数，否则后面的函数会覆盖之前的函数
* 内联方式
```js
<input id="myButton" type="button" value="Press Me" onclick="alert('thanks');" >
```
* 脚本方式
```js
document.getElementById("myButton").onclick = function () {
    alert('thanks');
}
```
* 事件清理
```js
   input.onclick = null
```

### DOM2级：
* `addEventListener`绑定事件
```js
element.addEventListener(event, function, useCapture)
```
* 新的写法：
```js
element.addEventListener(event, function, {
    capture: false, //捕获
    passive: false, 
    once: false    //只触发一次
})
```

* `removeEventListener`移除事件
```js
element.removeEventListener(event, function, useCapture)
``` 
* 新的写法：
```js
element.removeEventListener(event, function, {
    capture: false, //捕获
    passive: false, 
    once: false    // 只触发一次
})
```
> `event`:事件名       
> `function`:绑定的函数       
> `useCapture`、`capture`：（true：捕获/false：冒泡）
> `passive`提前告诉浏览器是否会阻止默认行为(Firefox、safari和Chrome支持)        
> `once`只触发一次(目前浏览器都不支持)      

:::warning
1. IE8及其以下需要使用IE事件处理程序attachEvent/detachEvent
2. 捕获与冒泡详见[3.12.6](/jaqi.note/frontend/javascript/event/#_3-12-6事件的冒泡和捕获)
3. 如果要阻止默认行为，需设置`passive`，否则可能会失败
4. 要移除事件时，移除时绑定的事件必须监听时绑定的是同一个事件。
> ```js
> document.addEventListener("touchmove", this.fn);
> document.removeEventListener("touchmove", this.fn);
> fn(event) {console.log(event)};
> ```
:::

### DOM0级与DOM2级的区别：

* DOM0：存在覆盖的问题；下边的代码会把上边的代码覆盖

* DOM2：同时绑定几个事件（相同或不同），然后顺序执行，不会覆盖。


### DOM3级：

DOM3级事件在DOM2级事件的基础上添加了更多的事件类型，全部类型如下：
> UI事件，当用户与页面上的元素交互时触发，如：load、scroll      
> 焦点事件，当元素获得或失去焦点时触发，如：blur、focus     
> 鼠标事件，当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup      
> 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel      
> 文本事件，当在文档中输入文本时触发，如：textInput     
> 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress     
> 合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart     
> 变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified     
> 同时DOM3级事件也允许使用者自定义一些事件      

## 3.12.3常用的事件类型(事件处理函数)
### 鼠标事件

* `onclick`鼠标点击某个对象

* `ondblclick`当用户双击某个对象时调用的事件句柄。

* `oncontextmenu`在用户点击鼠标右键打开上下文菜单时触发

* `onmousedown`鼠标按钮被按下。

* `onmousemove`鼠标被移动。

* `onmouseout`鼠标从某元素移开。

* `onmouseover`鼠标移到某元素之上。

* `onmouseup`鼠标按键被松开。

### 键盘事件

* `onkeydown`某个键盘按键被按下。       
> 用户按下任何键盘键时发生,因此监听一个用户是否按下按键请使用 onkeydown 事件，所以浏览器都支持。
* `onkeyup`某个键盘按键被松开。

* `onkeypress`某个键盘按键被按下并松开。
> 不是适用于系统按钮(如： ALT, CTRL, SHIFT, ESC)。


* `keyCode`
> * 键盘事件的event对象中包含一个keyCode属性，onkeydown和onkeyup表示你按下的具体的键，而onkeypress表示你按下的字符。        
> `keyCode`详见[3.12.4](/jaqi.note/frontend/javascript/event/#3.12.4事件的对象获)

### 其他事件

`onload`一个页面或一幅图像完成加载      
`onunload`用户退出页面。存在兼容性问题
:::warning
> 1. IE6，IE7，IE8中，刷新页面、关闭浏览器之后、页面跳转之后都会执行。     
> 2. IE9刷新页面会执行，页面跳转、关闭浏览器不能执行。     
> 3. Opera、Chrome 任何情况都不执行。      
:::
* `onblur`元素失去焦点。

* `onfocus`元素获得焦点。

* `onselect`文本被选中。

* `onabort`图像的加载被中断

* `onchange`域的内容被改变。

* `onerror`在加载文档或图像时发生错误。

* `onreset`重置按钮被点击。

* `onscroll`当文档被滚动时发生的事件。

## 3.12.4事件的对象
在触发某个事件时，会产生一个事件对象`event`这个对象中包含着所有与事件有关的信息。包括导致事件的元素，事件的类型以及其他与特定事件相关的信息。

* `type`获取事件类型

* `target`获取事件目标
  ```js
  target=e.target || e.srcElement; //获取当前事件源
  ```
* `clientX`/`clientY`窗口坐标

* `pageX`/`pageY`页面坐标（包括已卷曲距离）

* `screenX`/`screenY`屏幕坐标

* `offsetX`/`offsetY`区域坐标（相对于带有定位的父盒子）

#### 键值
> * keyCode兼容：
* `keyCode`
> 返回keydown和keyup事件时触发的键盘按键对应的ASII码（不支持Firefox浏览器的onkeypress事件）。
* `which`
> 返回onkeypress、nkeydown、onkeyup事件时触发的键盘按键对应的ASII码（不支持IE8及其更早版本）。

>> 兼容方案：
> ```js
> document.onkeydown = function(e){
> var e = e || window.event;var e = e.keyCode || e.which;}
> ```
* `ctrlKey`/`altKey`/`shiftKey` 
>事件被触发时ctrl/alt/shift键是否被按下，返回布尔值。

* `button`返回当事件被触发时，哪个鼠标按钮被点击。
> 
> 0|1|2分别代表左中右三个键，IE浏览器左中右三个键对应的数字为1|4|2
> 
> 兼容：
> ```js
> function fn(e){
> if(e){
>   returee.button
> }else if(event){
>   switch(event.button){
>   case 1:return 0; 
>   case 4:return 1; 
>   case 2:return 2; 
>   }}
> }
> ```

## 3.12.5client/offset/scroll

### client
* `clientWidth`/`clientHeight`
```js
element.clientWidth
```
内容+外边距padding（,与内容是否溢出无关,不包括滚动条、边框和外边距）

* `clientTop`/`clientLeft`
1. 如果文字方向从右往左(默认从左往右,通过设置 direction: rtl;)进行排列,且存在垂直滚动条的情况下
    一侧边框宽度border+一侧宽带条宽度scollbar
2. 默认情况下 
   一侧边框宽度border
:::warning
如果当前元素是行内元素(inline)时, clientLeft将返回 0;
:::

### offset

* `offsetParent`
ie8+：假如祖先元素中都没有定位，offsetParent就是body，如果有定位，则以结构上最近的带有定位的祖先元素为准。
ie6/7：自身没有定位，参考的是最近的有宽高的祖先元素，没有宽高参考body。如果自身有定位，与高级浏览器一直。

*兼容：自身元素定位，祖先无边框。
* `offsetWidth`/`offsetHeight`

内容+边框border+外边距padding（与内容是否溢出无关）

* `offsetLeft`/`offsetTop`
offsetLeft：元素自身的左边框外部到offsetParent左边框内部的距离。（ie8：多一个offsetParent边框）     
offsetTop：元素自身的上边框外部到offsetParent上边框内部的距离。（ie8：多一个offsetParent边框）      

### scroll
* `scrollWidth`/`scrollHeight`
起始位置内边距+内容实际宽度（与内容溢出有关）
scrollWidth=padding-left+textwidth
scrollHeight= padding-top+textheight

* `scrollTop`/`scrollLeft`
  
兼容：
```js
var scrollTop=document.documentElement.scrollTop||doucument.body.scrollTop;
```

## 3.12.6事件的冒泡和捕获
### 事件的冒泡：
事件按照从最特定的事件目标到最不特定的事件目标的顺序触发。
事件会从最内层的元素开始发生，一直向上传播，直到document对象。

### 事件的捕获：
与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。
事件捕获时，父级元素先触发，子级元素后触发

通过addEventListener函数，可以自己选择绑定事件时采用事件捕获还是事件冒泡它有三个参数，第三个参数若是true，则表示采用事件捕获，若是false，则表示采用事件冒泡。详见[3.12.2](/jaqi.note/frontend/javascript/event/#_3-12-2事件的冒泡和捕获)

:::warning
1. IE9以前的版本只支持事件冒泡，不支持事件捕获，它也不支持addEventListener函数，不会用第三个参数来表示是冒泡还是捕获，它提供了另一个函数attachEvent。
2. 不是所有的事件都能冒泡，例如：blur、focus、load、unload
:::

### 事件的阻止

####  阻止冒泡或捕获
新：
```js
e.stopPropagation():
```
```js
ie8以下：e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
```
#### 阻止事件的默认行为
新:
```js
e.preventDefault():
```
```js
ie8以下：function(){return false;} / e.returnValue=false;
```

#### 冒泡或捕获也阻止事件的默认行为
`stopImmediatePropagation`DOM3新增方法