## 1.2.9 canvas元素

HTML5的canvas元素是HTML5技术标准中最令人振奋的功能之一。它提供了一套强大的图形API，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。让开发者能够制作从文字处理到电子游戏的各类应用程序。

#### 绘制线段

```html
<canvas id="canvas" width="500" height="300"><!--设置的宽高和ID -->
    您浏览器暂不支持HTML5的canvas元素<!--添加提示语句-->
</canvas>
```
```js
var canvas=document.getElementById('canvas');// 获取画布/设置绘图绘图环境

var c=canvas.getContext('2d');// 固定语句

c.lineWidth=10;// 线宽

c.strokeStyle="#A52A2A" // 轮廓颜色 

c.moveTo(50,50); //  设置起点

c.lineTo(200,200); // 设置终点

c.stroke(); // 开始绘制
```

#### 绘制矩形
* 方法一：
```js

var canvas=document.getElementById('canvas'); 

var c=canvas.getContext('2d');

c.lineWidth=10; // 线宽

c.strokeStyle="#A52A2A" // 轮廓颜色

c.moveTo(50,50); // 设置起点

c.lineTo(200,50);

c.lineTo(200,150);

c.lineTo(50,150);

c.lineTo(50,50); // 方法一：通过坐标回到起点

c.closePath(); // 方法二：从当前点回到起始点

c.stroke(); // 开始绘制
```
* 方法二：
```js
var canvas=document.getElementById('canvas'); 

var c=canvas.getContext('2d');

c.lineWidth=10; // 线宽

c.strokeStyle="green"

c.rect(300,50,150,100) // 创建一个矩形(x,y,width,height)

c.stroke(); // 开始绘制

```
* 方法三：
```js
var canvas=document.getElementById('canvas'); 

var c=canvas.getContext('2d');

c.lineWidth=10; // 线宽

c.strokeStyle="green"; // 轮廓颜色

c.fillStyle="red"; // 填充颜色

c.strokeRect(300,50,150,100); // 绘制空心矩形(x,y,width,height)

c.fill(); // 填充颜色
```
* 方法四：
```js
var canvas=document.getElementById('canvas'); 

var c=canvas.getContext('2d');

c.lineWidth=10; // 线宽

c.strokeStyle="green": // 轮廓颜色

c.fillStyle="red": // 填充颜色

c.fillRect(300,50,150,100); // 绘制实心矩形(x,y,width,height)
```
### 绘制圆/弧
```js
var canvas=document.getElementById('canvas');

var c=canvas.getContext('2d');

c.lineWidth=10; // 线宽

c.strokeStyle="green"; // 轮廓颜色

c.fillStyle="red"; // 填充颜色

c.arc(100,50,30,0,Math.PI/2，true/false); // 绘制实心矩形(x,y,r,起始角度，结束角度，顺逆时针)

c.stroke(); // 开始绘制。Fill填充
```
### 文字的绘制
```js
c.font= 40px 隶书;
c.strokeText("",x,y,maxWith);   // 文字内容”,x,y
c.fillText("",x,y,maxWith);    //  文字内容”,x,y
c.fillText();
```
### 绘制阴影
`shadowOffsetX`
设置阴影的水平偏移距离
```js
c.shadowOffsetX=10;
```
`shadowOffsetY` 设置阴影垂直偏移距离
```js
c.shadowOffsetY=10;   
```
`shadowBlur` 设置阴影的模糊系数
```js
c.shadowBlur=5;    
```
`shadowColor` 设置阴影的颜色
```js
c.shadowColor="green"   
```