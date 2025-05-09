# 2.6 CSS布局
## 2.6.1 固定布局

#### 优点：

* 固定宽度布局更容易使用，在设计方面更容易定制

* 在所有浏览器中宽度一样,不设置min-width和max-width，来防止内容缩放引起的布局混乱

#### 缺点：

* 对于使用高分辨率的用户，固定宽度布局会留下很大的空白

*  屏幕分辨率过小时需要垂直滚动条

:::warning
1. 设置了固定宽度的外包裹，里面的各个模块也是固定宽度而非百分比
2. 大多数设计者选择960或760px的固定宽度。960px最适合1024×768或者更高的分辨率，有一点空间设置margin。如果设计者想让布局适应800×600分辨率的用户，可以使 用760px的宽度，它仍然适用于更大的分辨率 
:::

## 2.6.2 流体布局
流体布局，主体部分都是用了百分比宽度，因此可以自适应用户的分辨率

#### 优点：

* 流动布局页面对用户更友好，因为它能自适应用户的设置

* 页面周围的空白区域在所有分辨率和浏览器下都是相同的，在视觉上更美观

#### 缺点：

* 设计者更难控制用户所见，并可能忽略掉一些错误，因为在特定的分辨率下看起来好的

* 视频以及其他设置了宽度的内容可能需要多种宽度以适应不同分辨率的用户

## 2.6.3 浮动布局
根据内容是固定尺寸还是百分比有可以划分为：流体浮动布局、固定浮动布局

## 2.6.4 定位布局
根据内容是固定尺寸还是百分比有可以划分为：流体定位布局、固定定位布局

参照基准点：将父元素设为相对定位，且不设置坐标，如果父元素设置了相对定位，子元素的绝对定位将以父元素的基准点为参照基准点

## 2.6.5 多列布局

多列属性（CSS3新增）:

* `columns`设置`column-width`和`column-count`的简写属性 

* `column-width`规定列的宽度。(该宽度为缩放时的最小宽度，默认为`auto`)

* `column-count`规定元素应该被分隔的列数。默认为`auto`

* `column-rule`设置所有`column-rule-*`属性的简写属性 

* `column-rule-color`规定列之间规则的颜色

* `column-rule-style`规定列之间规则的样式

* `column-rule-width`规定列之间规则的宽度

* `column-span`规定元素应该横跨的列数。默认值为`1`，可以设置为`all`

* `column-gap`规定列之间的间隔

* `column-fill`规定如何填充列。主流浏览器都不支持`column-fill`属性

:::tip
传统布局实现多列（3列及以上）布局的问题：实现起来麻烦，很不方便、后期维护更改困难
:::

## 2.6.6 弹性布局(弹性伸缩布局)
事实上它是一种新类型的盒子模型，也称作弹性伸缩盒布局：旨在提供一个更加有效的方式来布置，对齐和分布在容器之间的各项内容，即使它们的大小是未知或者动态变化的    

弹性布局的主要思想是让容器有能力来改变项目的宽度和高度，以填满可用空间（主要是为了容纳所有类型的显示设备和屏幕尺寸）的能力    

#### 优点：

应用恰当的弹性布局对用户十分友好。页面中所有元素可以随着用户的偏好缩放    

对于同时喜欢流动和定宽布局的设计师来说，弹性布局是完美的，因为前两种布局的优点在弹性布局中都能找到    

#### 缺点：

需要花更多时间理解和测试，让布局适合所有用户    

这种布局类型相对于其他两个更难制作    

#### `flex`弹性布局属性(对父元素设置) 

最新版：

> * `display：flex`将对象作为弹性伸缩盒显示   
> * `display：inline-flex`将对象作为内联块级弹性伸缩盒显示        
> ::: tip
> * 过渡版写法：`flexbox`，`inline-flexbox`        
> * 老版本写法：`box`，`inline-box`   
> :::
> 
> ::: warning
> * `float`、`clear`、`vertical-align`在`flex`项目中不起作用
> * css多列（CSS columns）在弹性盒子中不起作用
> :::

#### `flex-direction`(用于父元素):设置子元素在父元素中的排列方式   
> * `row`（默认值）横向从左到右排列   
> * `row-reverse`反转横向从右到左排列         
> * `column`纵向排列    
> * `column-reverse`反转纵向排列，从后往前排，最后一项排在最上面    

![flex-direction](/flex-direction.png)

#### `flex-wrap`(用于父元素) 设置子元素超出父元素后是否换行   

> * `nowrap`当子元素溢出父容器时不换行          
> * `wrap`当子元素溢出父容器时自动换行           
> * `wrap-reverse`当子元素溢出父容器时自动换行,方向同 `wrap`反转排列   

![flex-wrap](/flex-wrap.png)

#### `flex-flow`(用于父元素)复合属性: 可以同时设置 `flex-direction`/`flex-wrap`

#### `justify-content`(用于父元素) 设置子元素的水平对齐方式   

> * `flex-start`（默认值）弹性盒子元素将向行起始位置对齐    
> * `flex-end`弹性盒子元素将向行结束位置对齐    
> * `center`弹性盒子元素将向行中间位置对齐    
> * `space-between`弹性盒子元素会平均地分布在行里   
> * `space-around`弹性盒子元素会平均地分布在行里，两端保留子元素与子元素之间间距大小的一半`1:2:2:1`

![justify-content](/justify-content.png)

#### `align-items`(用于父元素) 设置子元素的垂直对齐方式（适用于子元素单行分布）   

> * `flex-start`弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界    
> * `flex-end`弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界    
> * `center`弹性盒子元素在该行的侧轴（纵轴）上居中放置    
> * `baseline`如弹性盒子元素的行内轴与侧轴为同一条，则该值与`flex-start`等效。其它情况下，该值将参与基线对齐    
> * `stretch`（默认值）如果指定侧轴大小的属性值为`auto`，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照`min/ma* x-width/height`属性的限制   

![align-items](/align-items.png)

#### `align-self`:(用于子元素)设置子元素自身在侧轴方向上的对齐方式 
> * `auto`如果`align-self`的值为`auto`，则其计算值为元素的父元素的`align-items`值，如果其没有父元素，则计算值为 `stretch`   
> * `flex-start`弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界   
> * `flex-end`弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界   
> * `center`弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）    
> * `baseline`如弹性盒子元素的行内轴与侧轴为同一条，则该值与`flex-start`等效。其它情况下，该值将参与基线对齐   
> * `stretch`如果指定侧轴大小的属性值为`auto`，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸   

![align-self](/align-self.png)

#### `align-content`:(用于父元素) 设置子元素的垂直对齐方式（适用于子元素多行分布）
> * `flex-start`各行向弹性盒容器的起始位置堆叠。弹性盒容器中第一行的侧轴起始边界紧靠住该弹性盒容器的侧轴起始边界，之后的每一行都紧靠住前面一行    
> * `flex-end`各行向弹性盒容器的结束位置堆叠。弹性盒容器中最后一行的侧轴起结束界紧靠住该弹性盒容器的侧轴结束边界，之后的每一行都紧靠住前面一行   
> * `center`各行向弹性盒容器的中间位置堆叠。各行两两紧靠住同时在弹性盒容器中居中对齐，保持弹性盒容器的侧轴起始内容边界和第一行之间的距离与该容器的侧轴结束内容边界与第最后一行之间的距离相等   
> * `space-between`各行在弹性盒容器中平均分布   
> * `space-around`各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半        
> * `stretch`（默认值）各行将会伸展以占用剩余的空间

![align-content](/align-content.png)

#### `order`(适用于弹性盒模型容器子元素) 用整数值来定义排列顺序，数值小的排在前面。可以为负值 

![order](/order.png)

#### `flex-grow`(适用于弹性盒模型容器子元素) 设置元素的放大比例

> * `1`默认,如果空间变大，该元素将变大    
> * `0`使存在剩余空间，也不会放大

![flex-grow](/flex-grow.png)

#### `flex-shrink`(适用于弹性盒模型容器子元素) 设置元素的缩小比例

> * `1`默认,如果空间不足，该项目将缩小    
> * `0`空间不足时，该元素不会缩小

![flex-shrink](/flex-shrink.jpg)

#### `flex-basis`(适用于弹性盒模型容器子元素) 
> * `auto`无特定宽度值，取决于其它属性值   
> * `length`用长度值/百分比来定义宽度。不允许负值   

#### `flex`(适用于弹性盒模型子元素) 是 `flex-grow`、`flex-shrink`、`flex-basis`的复合属性

> * `none`：`none`关键字的计算值为:` 0 0 auto`（默认）

## 2.6.7 Grid 网格布局

[阮一峰CSS Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

> * `display：grid`指定一个容器采用网格布局（块级元素）       
> * `display：inline-grid`指定一个容器采用网格布局（行内块级元素）    

采用网格布局的区域，称为容器`container`，容器内部采用网格定位的子元素，称为项目`item`
#### `fr`单位
表示`Grid`布局中中残余空间的一部分，一般来说`1fr`表示`100%`的残余空间,`.25fr`表示`25%`的残余空间

#### `grid-template-columns`(用于父元素):设置每一列的列宽
> * `none`（默认值）不指定列的大小     
> * `auto`列的大小由容器的大小和列中网格元素内容的大小决定         
> * `max-content`每列的大小设置为该列中最大网格元素的大小       
> * `min-content`每列的大小设置为该列中最小网格元素的大小     
> * `length`长度值，可以是`px`、`fr`为单位的数值或百分比`%`、`0`是默认值 
> * `initial`将此属性设置为默认值   
> * `inherit`	从父元素继承该属性   
```css
.div {
  display: grid;
  grid-template-columns: 30px 200px auto 100px;
}
``` 

#### `grid-template-rows`(用于父元素):设置每一行的行高
> * `none`（默认值）不指定行的大小     
> * `auto`行的大小由容器的大小和行中网格元素内容的大小决定         
> * `max-content`每行的大小设置为该行中最大网格元素的大小       
> * `min-content`每行的大小设置为该行中最小网格元素的大小     
> * `length`长度值，可以是`px`、`fr`为单位的数值或百分比`%`、`0`是默认值  
> * `initial`将此属性设置为默认值   
> * `inherit`	从父元素继承该属性    

#### `repeat()`函数，批量设置重复值
该函数可以用于 CSS Grid 属性中 `grid-template-columns` 和 `grid-template-rows`    
`repeat(num,a b c)`第一个参数是重复的次数，第二个参数是所要重复的值   

> * `length`长度值，可以是`px`、`fr`为单位的数值或百分比`%`、`0`是默认值   
> * `max-content`所有网格元素中最大的      
> * `min-content`所有网格元素中最小的     
> * `auto`
> * `auto-fill`
> * `auto-fit`

```css
div {
  display: grid;
  grid-template-columns: repeat(3,50px 100px 50px); /* 重复3次，重复单元是50px 100px 50px */
  grid-template-rows: repeat(3,50px); /* 重复3次，重复单元是50px */
}
```


#### `minmax()`函数，产生一个长度范围
它接受两个参数，分别为最小值和最大值

> * `length`长度值，可以是`px`、`fr`为单位的数值或百分比`%`、`0`是默认值  
> * `max-content`
> * `min-content`
> * `auto`
> * `auto-fill`
> * `auto-fit`
```css
div {
  display: inline-grid;
  grid-template-columns: repeat(3,minmax(100px, 200px));
  grid-template-rows: repeat(3,minmax(100px, 200px));
}
```

#### `[ ]`网格线的名称
```css
div {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4 active];
}
```

#### `grid-row-gap`(用于父元素):设置行间距
#### `grid-column-gap`(用于父元素):设置列间距
#### `grid-gap`(用于父元素):设置行、列间距

```css
div {
  display: grid;
  grid-template-columns: repeat(3,50px);
  grid-template-rows: repeat(3,50px);
  grid-gap: 20px 20px;
}
```

#### `grid-template-areas`(用于父元素):属性在网格布局中规定区域


::: tip 主轴与侧轴的概念

主轴就是弹性盒子子元素沿着排列的轴；与主轴垂直的轴称为侧轴    

row ,则主轴是水平方向，侧轴是垂直方向   

column,则主轴是垂直方向，侧轴是水平方向   

注：基线、底线、定线、中线

![line](/line.jpg)

:::