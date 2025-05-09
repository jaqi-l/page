## 1.2.2 a元素
### 常用属性
#### href属性
指向的页面URL 
#### target属性
设置超链接的打开方式  
* `self`:当前位置、
* `blank`:新窗口、
* `top`:最顶层框架、
* `parent`:父框架

#### type属性
规定被链接文档的的 MIME 类型 

### 外链


#### 绝对路径和相对路径
##### 绝对路径
需要指出链接资源的绝对位置，与你的HTML文档的位置无关。      
* 服务器中的位置：
href="http://baidule.yuansupic.com/"
* 本地存储的位置：
file:///D:\桌面\HTML5课程\HTML5入门实例课程\lesson9\1.png
#####  相对路径
* 同一个路径： 直接写文件名称 或 ./文件名 比如：tp.jpg或者./tp.jpg 
* 在下级路径： 路径名称/资源名称：xxx/tp.jpg 
* 在下下级路径： xx/xxx/tp.jpg 
* 在上级路径：../资源名称：../tp.jpg
* 在上上级路径： ../../tp.jpg

::: tip 提示
* `.`表示当前目录、 `..`表示上级目录、`...`表示上上级目录
* 如果链接资源与你的HTML文档位于同一个站点，可以使用相对路径。否则必须使用绝对路径
:::

### 内链

* id属性：href="#id"
* name属性：href="#name"
* 跨页面：href="index.html#id/name"

### 样式初始化

```css
a:link{
    text-decoration:none;
     /* 指正常的未被访问过的链接*/
}
a:visited{
    text-decoration:none;
     /*指已经访问过的链接*/
}a:hover{
     text-decoration:none;
     color: #C81623;
     /*指鼠标在链接*/
}
a:active{
    text-decoration:none;
    /* 指正在点的链接*/
}
```
 