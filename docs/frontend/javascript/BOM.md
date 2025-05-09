# 3.10 BOM
## 3.10.1 基本概念
BOM是Browser Object Model的缩写，简称浏览器对象模型

BOM由一系列相关的对象构成，并且每个对象都提供了很多方法与属性

## 3.10.2 window对象的方法和属性
window对象是浏览器窗口对文档提供的一个现实的容器，代表打开的浏览器窗口，是每一个加载文档的父对象

window的属性和方法调用方法:window.属性，window.方法

也可以直接调用省略 window.

### 对话框

alert() 显示带有一段消息和一个确认按钮的警告框。

confirm() 显示可提示用户输入的对话框。返回值为布尔值
```js
function myFunction(){
    var x;
    var r=confirm("按下按钮!");
    if (r==true){
        x="你按下了\"确定\"按钮!";
    }
    else{
        x="你按下了\"取消\"按钮!";
    };
}
```
prompt(msg,defaultText) 显示带有一段消息以及确认按钮和取消按钮的对话框。第一个参数是提示,第二个参数是默认值，返回值为输入的值，取消返回null。
```js
function myFunction(){ 
    var x; 
    var person=prompt("请输入你的名字","Harry Potter"); 
    if (person!=null && person!=""){ 
     x="你好 " + person + "! 今天感觉如何?"; 
    } 
}
```

### 窗体控制

open(URL,name,specs,replace) 打开一个新的浏览器窗口或查找一个已命名的窗口。 
> URL:打开指定的页面的URL。如果没有指定URL，打开一个新的空白窗口
> name:指定target属性或窗口的名称。支持以下值
>> _blank - URL加载到一个新的窗口。这是默认
>>_parent - URL加载到父框架
>>_self - URL替换当前页面
>>_top - URL替换任何可加载的框架集
>>name - 窗口名称
> features:声明了新窗口要显示的标准浏览器的特征。
>> channelmode=yes|no|1|0	是否要在影院模式显示 window。默认是没有的。仅限IE
>> directories=yes|no|1|0	是否添加目录按钮。默认是肯定的。仅限IE浏览器
>> fullscreen=yes|no|1|0	浏览器是否显示全屏模式。默认是没有的。在全屏模式下的 window，还必须在影院模式。仅限IE
>> left=pixels	该窗口的左侧位置
>> location=yes|no|1|0	是否显示地址字段.默认值是yes
>> menubar=yes|no|1|0	是否显示菜单栏.默认值是yes
>> resizable=yes|no|1|0	是否可调整窗口大小.默认值是yes
>> scrollbars=yes|no|1|0	是否显示滚动条.默认值是yes
>> status=yes|no|1|0	是否要添加一个状态栏.默认值是yes
>> titlebar=yes|no|1|0	是否显示标题栏.被忽略，除非调用HTML应用程序或一个值得信赖的对话框.默认值是yes
>> toolbar=yes|no|1|0	是否显示浏览器工具栏.默认值是yes
>> top=pixels	窗口顶部的位置.仅限IE浏
>> width=pixels	窗口的宽度.最小.值为100
```js
function openWin(){
	myWindow=window.open('','','width=200,height=100');
	myWindow.document.write("<p>这是'我的窗口'</p>");
	myWindow.focus();
}
```

### 窗口的属性：

#### 常用：

`width`新建窗口宽度

`heigth`新建窗口高度

`top`左上角垂直坐标

`left`左上角水平坐标

#### 不常用的属性：

`toolbar`指定窗口是否有标准工具栏。当该选项的值为1或yes时，表示有标准工具栏，当该选项的值为0或no时，表示没有标准工具栏； 

`resizable`指定窗口是否可改变大小，选项的值及含义与toolbar相同；

`ocation`指定窗口是否有地址工具栏，选项的值及含义与toolbar相同；

`directories`指定窗口是否有链接工具栏，选项的值及含义与toolbar相同；

`status`指定窗口是否有状态栏，选项的值及含义与toolbar相同；

`menubar`指定窗口是否有菜单，选项的值及含义与toolbar相同；

`scrollbar`指定当前窗口文档大于窗口时是否有滚动条，选项的值及含义与 toolbar相同； 

`close`() 关闭浏览器窗口。

`document.hidden`判断页面是否隐藏的布尔值   
`document.visibilityState`返回document的可见性
> `hidden`：文档处于背景标签页或者窗口处于最小化状态，或者操作系统正处于 '锁屏状态'   
> `visible`：此页面在前景标签页中，并且窗口没有最小化   
> `prerender`：页面在屏幕外执行预渲染处理 document.hidden 的值为 true   
> `unloaded`：页面正在从内存中卸载 

> 监听`visibilityState`事件
> ```js
> document.addEventListener('visibilitychange', function() {});
> ```

### 定时器

* `setInterval`(按照指定的周期（以毫秒计）来调用函数或计算表达式。
* `clearInterval`取消由`setInterval`设置的定时器。
* `setTimeout`在指定的毫秒数后调用函数或计算表达式。
* `clearTimeout`取消由`setTimeout`方法设置的定时器。

#### 专为动画而来的Api（`requestAnimationFrame`）
目的：为解决`setTimeout`和`setInterval`因为时间不精确导致的动画不流畅，同时提渲染性能。
优势：
> 1. requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
> 2. 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的CPU、GPU和内存使用量
> 3. requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销

取消：`cancelAnimationFrame`
使用：requestAnimationFrame的用法与settimeout很相似，只是不需要设置时间间隔而已。requestAnimationFrame使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。它返回一个整数，表示定时器的编号，这个值可以传递给cancelAnimationFrame用于取消这个函数的执行
```js
	(function animationFn() {
    var timer = requestAnimationFrame(animationFn);
		console.log(timer)  // 1 2 3 ... requestAnimationFrame定时器编号
		// cancelAnimationFrame(timer)
  })()
```
::: tip
`setTimeout`若果时间设置为0，则相当于默认是4ms
:::
```js
var timer = setInterval(function(){ alert("Hello"); }, 3000);
 clearInterval(timer)
```
### 其他方法

* `print`打印当前窗口的内容。

* `blur`把键盘焦点从顶层窗口移开。

* `createPopup`创建一个 pop-up 窗口。只支持id

* `focus`把键盘焦点给予一个窗口。

* `moveBy`可相对窗口的当前坐标把它移动指定的像素。

* `moveTo`把窗口的左上角移动到一个指定的坐标。

* `resizeBy`按照指定的像素调整窗口的大小。

* `resizeTo`把窗口的大小调整到指定的宽度和高度。

* `scrollBy`按照指定的像素值来滚动内容。

* `scrollTo`把内容滚动到指定的坐标。

* `postMessage`跨源通信。
```js
 <iframe id="receiver" src="https://jaqi.gitee.io/jaqi.note/"/>
// 发送postMessage
postMessage() {
  const $target = document.querySelector('#receiver').contentWindow 
  // 第二个参数指定哪个窗口能收到此消息，*表示无限制
  $target.postMessage('hellow jaqi', 'https://jaqi.gitee.io/')
}
// 监听postMessage
window.addEventListener('message', function (e) {  // 监听 message 事件
  console.log(e.data)// 接受到的消息
  alerconsole.log(e.origin)// 消息来源地址
});
```

## 3.10.3 Window对象属性

* `innerWidth`返回窗口的文档显示区的宽度。

* `innerHeight`返回窗口的文档显示区的高度。
```js
window.innerWidth
```

* `name`设置或返回窗口的名称。

* `opener`返回父窗口,谁触发了open事件谁是父窗口
```js
window.opener.close() //关闭父窗口
myWindow.opener.document.write("<p>这个是父窗口!</p>")//向父窗口传值
```
:::tip
* `parent`返回父窗口,用于iframe中，谁创建的iframe谁是父窗口
:::

* `closed`设置窗口，并返回窗口状态
```js
    myWindow=window.open("","","width=400,height=200");//myWindow返回true/fasle 代表myWindow打开的窗口是否关闭
    myWindow.close();  //关闭打开的窗口
```
* `self`返回对当前窗口的引用。

* `top`返回最顶层的先辈窗口。

* `outerheight`返回窗口的外部高度。

* `outerwidth`返回窗口的外部宽度。

* `status`设置窗口状态栏的文本。

## 3.10.4 History对象的常用方法
* `length`属性查看客户端浏览器的历史列表中访问的网页个数

* `back`加载history列表中的前一个 URL。

* `forward`加载history列表中的下一个 URL。
``` js
history.forward();
```
* `go`加载history列表中的某个具体页面。
  
* `pushState`
pushState(state,popstate,title)
> 一个与指定网址相关的状态对象
> popstate回调函数,如果不需要这个对象，此处可以填null。
> title新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null
> url新的网址，必须与当前页面处在同一个域。
* `replaceState`
同pushState，不会在History对象中生成一个新的记录。新的记录会覆盖History对象中的当前记录，不能返回。
::: tip
```js
history.replaceState({name: "华为"}, "", "j87078.html");
window.location.reload();
```
与location.replace相同效果
:::

监听`pushState`和`replaceState`事件
```js
const bindEventListener = function(type) {
   const historyEvent = history[type];
   return function() {
       const newEvent = historyEvent.apply(this, arguments);
      const e = new Event(type);
       e.arguments = arguments;
       window.dispatchEvent(e);
       return newEvent;
   };
};
history.pushState = bindEventListener('pushState');
history.replaceState = bindEventListener('replaceState');

// 使用
window.addEventListener('replaceState', function(e) {
  console.log('THEY DID IT AGAIN! replaceState');
});
window.addEventListener('pushState', function(e) {
  console.log('THEY DID IT AGAIN! pushState');
});
```

* `onpopstate`监听`history`的改变


## 3.10.5 Location对象

`href`设置或返回完整的 URL。
```js
location.href
```

* `host`设置或返回主机名和当前 URL 的端口号。

* `hash`设置或返回从井号 (#) 开始的 URL（锚）。

* `hostname`设置或返回当前 URL 的主机名。

* `pathname`设置或返回当前 URL 的路径部分。

* `port`设置或返回当前 URL 的端口号。

* `protocol`设置或返回当前 URL 的协议。

* `search`设置或返回从问号 (?) 开始的 URL（查询部分）。


* `assign`加载新的文档。
```js
location.assign(URL)
```
* `reload`重新加载当前文档。 
```js
 window.location.reload()  //重新加载（有可能从缓存中加载）
 window.location.reload(true) //重新加载(从服务器重新加载)
```
:::tip
1. 如果该方法没有规定参数，或者参数是 false，它就会用 HTTP 头 If-Modified-Since 来检测服务器上的文档是否已改变。如果文档已改变，`reload`会再次下载该文档。如果文档未改变，则该方法将从缓存中装载文档。这与用户单击浏览器的刷新按钮的效果是完全一样的。
2. 如果把该方法的参数设置为 true，那么无论文档的最后修改日期是什么，它都会绕过缓存，从服务器上重新下载该文档。这与用户在单击浏览器的刷新按钮时按住 Shift 健的效果是完全一样。
:::

* `replace`用新的文档替换当前文档。replace方法不会在History对象中生成一个新的记录。当使用该方法时，新的URL将覆盖History对象中的当前记录，不能返回。
```js
location.replace('https://jaqi.gitee.io/page/#/');
```

:::tip
History与Location与的区别
History操作的是历史栈，Location操作的是url
:::


## 3.10.6 Screen对象
* `availHeight`返回显示屏幕的高度 (除 Windows 任务栏之外)。
```js
screen.availHeight
```
* `availWidth`返回显示屏幕的宽度 (除 Windows 任务栏之外)。

* `height`返回显示屏幕的高度。

* `width`返回显示器屏幕的宽度。

* `bufferDepth`设置或返回显示器屏幕的比特深度。

## 3.10.7 Navigator对象属性
* `appCodeName`返回浏览器的代码名。

* `appMinorVersion`返回浏览器的次级版本。

* `appName`返回浏览器的名称。

* `appVersion`返回浏览器的平台和版本信息。

* `cookieEnabled`返回指明浏览器中是否启用 cookie 的布尔值。

* `userAgent`返回由客户机发送服务器的user-agent头部的值
```js
navigator.userAgent
```
* `onLine`返回指明系统是否处于脱机模式的布尔值。



## 3.10.8 缓存对象及其他缓存技术

###  `Cookie`
* 设置`Cookie`：
```js
    document.cookie="key=value";
    // 设置过期时间
    document.cookie="key=value; expires=Thu, 18 Dec 2043 12:00:00 GMT";
    // 设置domain 和 path 实一级域名下的跨域共享cookie
    document.cookie="key=value; ; domain=yq.com;path=/";
```
* 读取`Cookie`
```js
    document.cookie
```
* 修改`Cookie`
```js
    document.cookie="key=value; expires=Thu, 18 Dec 2043 12:00:00 GMT";
```
* 删除`Cookie`，只需要设置expires参数为以前的时间即可
```js
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
```

常用的`cookie`函数
```js
// 设置Cookie
function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

// 获取Cookie
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

// 检测Cookie
function checkCookie()
{
  var username=getCookie("username");
  if (username!="")
  {
    alert("Welcome again " + username);
  }
  else 
  {
    username = prompt("Please enter your name:","");
    if (username!="" && username!=null)
    {
      setCookie("username",username,365);
    }
  }
}
```

`js-cookie`工具

```js
Cookies.set('name', 'value')
Cookies.set('name', 'value', { expires: 7, path: '', domain: 'test.com' })
Cookies.get('name') 
Cookies.remove('name')
```


::: warning
1. `Cookie`不能跨域访问和操作，但是可以实现一级域名下的跨域访问和操作
2. 不能访问和操作设置了设置了`HttpOnly`的(防止XSS攻击)
3. 设置了`Secure=true`只能用https协议发送给服务器
:::
### `SessionStorage`
* 设置`sessionStorage`
```js
sessionStorage.setItem("key", "value");
```
* 读取`sessionStorage`
```js
sessionStorage.getItem("key");
```
* 删除`sessionStorage`
```js
sessionStorage.removeItem("key");
```
* 删除所有`sessionStorage`
```js
sessionStorage.clear();
```
### `LocalStorage`
* 设置`sessionStorage`
```js
localStorage.setItem("key", "value");
```
* 读取`sessionStorage`
```js
localStorage.getItem("key");
```
* 删除`sessionStorage`
```js
localStorage.removeItem("key");
```


### `Application Cache`

### `IndexDB`
### `Web SQL`

### `SQLite`


### 各缓存技术的比较
| 名称 | 存储位置 | 生命周期 | 容量限制 | 兼容性 |
| -------- | -------- | -------- | -------- |-------- |
| `Cookie`  | 浏览器 | 自行设置，可以无限长  | >4KB | 良好 |
| `SessionStorage`  | 浏览器 | 仅在当前会话下有效，关闭页面或浏览器后被清除  | >5MB | 优秀 |
| `LocalStorage`  | 浏览器 | 除非被清除，否则永久保存  | 每个域名>5MB |优秀 |
| `Application Cache`  | 电脑缓存 | 除非被清除，否则永久保存  | 5MB | 标准已废弃不建议使用 |
| `IndexDB`  | 浏览器 | 除非被清除，否则永久保存  | 理论无上限 | 良好 |
| `Web SQL`  | 电脑缓存 | 除非被清除，否则永久保存  | >25MB | 一般 |
| `SQLite`  | 安卓缓存 | 除非被清除，否则永久保存  | 理论无上限 | 一般 |

::: tip
1. `SessionStorage`不能在多个窗口或选项卡之间共享数据，但是，当通过`window.open`或链接打开新页面时，新页面会复制上一个页面的`SessionStorage`
:::