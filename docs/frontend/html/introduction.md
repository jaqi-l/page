# 1.1 HTML概述
## 1.1.1 什么是HTML
HTML是一种超文本标记语言，“超文本”就是指页面内可以包含图片、链接，甚至音乐、程序等非文字元素。

HTML5是HTML的最新版本。

## 1.1.2 开发工具
`Visual Studio Code(VScode)`、`WebStorm` 、`notepad++`、`Ecliipse`、`sublime`、`Dreamweaver`等等...

## 1.1.3 基本格式
```html

<!DOCTYPE html>
<!-- 文档声明 -->

<html>
<!-- 表示文档的开始 -->

<head>
	<!-- head标签存放文档的基本信息，不可见元素 -->
	<meta charset="utf-8"><!-- 声明字符编码 -->
	<meta name="viewport" content="width=device-width,		
	 initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> 
	<title>网页标题</title>
	<meta name="keywords" content="网页关键词" />
	<meta name="description" content="网页描述" /> 
	<!-- 异步加载css文件 -->
	<link rel="stylesheet" type="text/css" href="index.css">
	<!-- 同步加载js文件 -->
	<script type="text/javascript" src="index.js"></script>
</head>

<body>
	<!-- body标签存放文档可见内容 -->

</body>

</html><!-- 表示文档结束 -->
```
::: tip
*注意事项：
1. 文件保存为以 .html 为后缀的文件。

2. `<meta>`是个单标签，它没有结束标签；meta元素也可以成为空元素。meta元素为head元素的子元素，且只能放在head标签中使用。meta元素重要用来附加文档的额外信息，除了使用我们熟悉的 charset="utf-8"声明字符编码外，它还有几个常用的功能通过name与content属性为文件加入作者(author)描述信息（description）关键词(kewords)编码工具（generator）等信息。 通过属性http-equiv将指定的信息以HTTP表头信息的方式送到客户端。

3. `<script>`
> * 标签的属性
>> 1. `async`：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效		
>> 2. `charset`：可选。使用src属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的值		
>> 3. `crossorigin`：配置相关请求的CORS（跨源资源共享）		
>> 4. `defer`：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效		
>> 5. `integrity`：可选。表示脚本的完整性。这个属性是HTML5新增的，主要用于防止CDN上的文件被篡改		
>> 6. `language`：废弃。最初用于表示代码块中的脚本语言		
>> 7. `src`：“可选。表示包含要执行的代码的外部文件		
>>>  外部JavaScript文件的扩展名是`.js`这不是必需的，因为浏览器不会检查所包含JavaScript文件的扩展名		
>>>	使用了`src`属性的`<script>`元素不应该再在`<script>`和`</script>`标签中再包含其他JavaScript代码,如果两者都提供的话，则浏览器只会下载并执行脚本文件，从而忽略行内代码		
>> 8. `type`：可选。可选。代替`language`，表示代码块中脚本语言的内容类型（也称MIME类型）。按照惯例，这个值始终都是`text/javascript`		

> * 标签位置与加载关系
>> 1. 放在`<head>`里，浏览器会解析html后同步加载js文件。缺点是页面的加载会滞后且不能进行DOM操作		
>> 2. 放在`</body>`前面，先渲染html在加载js。缺点是对于依赖js文件的部分会滞后		
> ```html
>  <script type="text/javascript" src="index.js" async></script>
> ```

4. `<noscript>`：被用于给不支持JavaScript的浏览器提供替代内容（浏览器不支持脚本、浏览器对脚本的支持被关闭）		
::: 
## 1.1.4 元素的概念

### 双标签
| 开始标签 | 元素内容          | 结束标签 |
| -------- | ----------------- | -------- |
| `<h1> `  | h标签用来表示标题 | `</h1>`  |
| `<p>`    | p标签表示一个段落 | `</p>`   |


### 单标签
| 单标签（没有结束标签）                 |
| -------------------------------------- |
| `<hr>`是一个单标签，会给文档加一个横线 |

## 1.1.5 元素的属性

属性的作用就是就为元素提供更多的信息，大多数元素都可以拥有属性
```html
<标签 属性1=参数1></标签>
```

