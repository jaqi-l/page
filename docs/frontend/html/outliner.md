# 1.4 HTML5大纲算法
在html5中有一个很重要的概念，叫做HTML5大纲算法(HTML5 Outliner),它的用途为用户提供一份页面的信息结构目录。合理的使用HTML5元素标签，可以生成一个非常清晰的文档大纲

HTML5大纲算法 

我们可以通过各种工具去查看当前页面，这里推荐使用一个测试工具：HTML5 Outliner，网址如下：https://gsnedders.html5.org/outliner/

1.section和div的区别

div元素在html5之前是最常用的最流行的标签，但他本身是没有任何语义的，它只不过是用来布局页面和CSS样式以及JS调用。

在html5中section标签并不是用来取代div的。他是具有语义的文档标签，在大纲规范中规定section至少要包含一个标题。也就是section标签内至少包含一个h1~h6.

如果是页面布局，且不是header、footer之类的专属区域，都应该使用div;

2.body、nav、section都是需要有标题的才规范.header和div则是不需要标题的。

3.section和nav元素大纲要求有标题h1~h6，但是section必须有才规范，而nav如果没有标题，也是合理的。给他添加了标题会让大纲更好看，所以我们可以添加完了在隐藏，就不会破坏布局了。