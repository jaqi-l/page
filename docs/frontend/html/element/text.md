
#### 文本元素，就是将一段文本设置成相匹配的结构和含义

1. `b`元素：加粗文字。
2. `br`元素：强制换行。
3. `i`元素：文字倾斜。
4. `del`元素：删除文字。
5. `strong`元素：强调一段文本（加粗文字）。
6. `wbr`元素：表示安全换行。
7. `em`元素：强调（文字倾斜）。
8. `s`元素：删除线。表示不准确的删除。
9. `u`元素：给文字加下划线。
10. `ins`元素：给文字加下划线，起到强调作用。
11. `small`元素：添加小号字体（用于免责声明和澄清声明）。
12. `sub`和`sup`元素：添加下标和上标： sub表示下标：HTML5sup，sup表示上标： HTML5sup 。
13. `dfn`元素：倾斜文本（表示定义术语，是对一个词或短语的解释）。
14. `abbr`元素：表示一段文本的缩写（在文本显示上没有任何实际效果，比如WTO）。
15. `q`元素：给文本加上双引号（表示引用来自其他地方的的内容）。
16. <span style="color: red">*</span>`code`等元素：表示计算机代码片段。function(){}。
17. <span style="color: red">*</span>`var`元素用来表示编程语言中的变量。 
18. <span style="color: red">*</span>`numsamp`元素表示程序或计算机的输出您没有权限浏览该网页。
19. <span style="color: red">*</span>`kbd`元素表示某部分内容是由用户利用键盘输入如：请按Enter键。

20.  `ruby`元素：文字上方或右方的注音符号（很多浏览器不支持此功能）,`rp`标签：是浏览器不支持时显示的内容
> ```html
> <ruby>
>   漢 <rp>(</rp><rt>han</rt><rp>)</rp>
>   字 <rp>(</rp><rt>zi</rt><rp>)</rp>
> </ruby>
> ```
21.  `cite`元素：表示引用其他作品的标题。 实际效果就是加粗文本
22.  `bdo`元素：设置文字方向，必需使用dir属性才可以设置，共两个值，rtl（从右到左）。即：right to left 
23.  `mark`元素：突出显示文本，用于记号， 实际作用就是加上一个黄色的背景。
24.  `time`元素：从语义上来看就是表示日期和时间，例如 2015-9-18
25.  `span`元素：表示一般性的文本，没有特殊效果（行内元素）
26.  `pre`元素：保持原始格式（其实主要是保持空格和换行）,常用来输出带格式的`json`
27.  `base`元素：为页面上的所有链接规定默认地址或默认目标

::: tip 提示
<span style="color: red">*</span>这几个元素属于英文范畴，必须将html设置成英语才能体现效果。
```html 
<html lang="en"/> 
```
:::