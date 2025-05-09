
## 1.2.11 iframe元素
`iframe`元素用来在文档中添加一个内联框架。

`iframe`为`body`元素的子元素，必须放置在`boay`中使用

主要属性:

* `src`:要显示的文档的URL
* `name`:名称
* `id`:ID
* `width`:宽度
* `height`:高度
* `scrolling`:是否显示滚动条
* `srcdoc`:要显示的HTML内容
> ```html
> <iframe srcdoc="<p>Hello world!</p>" src="demo_iframe_srcdoc.htm"></iframe>
> ```
* `seamless`:设置一个特殊的样式
* `sandbox`:沙箱属性
> 设置空的时候限制全部      
> `allow-same-origin`:允许 iframe 内容被视为与包含文档有相同的来源      
> `allow-top-navigation`:允许 iframe 内容从包含文档导航（加载）内容     
> `allow-forms`:允许表单提交        
> `allow-scripts`:允许脚本执行      


获取`iframe`内的DOM元素(必须同源)：

1. `window.frames[0].document`

2. `document.querySelector('iframe').contentWindow.document`