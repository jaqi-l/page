
## 2.3.1字体属性

`font-size`:规定文本的字体尺寸：
> `px`     
> `%`:相对父元素       
> `vh`:相对视口     
> `em`:相对父元素     
> `rem`:相对html      
> `xx-small`    
> `x-small`    
> `small`    
> `medium`:默认值       
> `large`    
> `x-large`    
> `xx-large`      
> `smaller`:相对父元素     
> `arger`:相对父元素    


`font-variant`:规定是否以小型大写字母的字体显示文本：
> `normal`:（默认值）浏览器会显示一个标准的字体  
> `small-caps` 浏览器会显示小型大写字母的字体 
> 

`font-style`:规定文本的字体样式：
> `normal`:（默认值）浏览器会显示一个标准的字体  
> `italic`:浏览器会显示一个斜体的字体样式  
> `oblique`:浏览器会显示一个倾斜的字体样式

`font-weight`:规定字体的粗细：
> `normal`:（默认值）定义标准的字符    
> `bold`:定义粗体字符    
> `bolder`:定义更粗的字符   
> `lighter`:定义更细的字符    
> `100-900`定义由粗到细的字符。`400`等同于`normal`，而`700`等同于`bold`

`font-family`:规定文本的字体系列：

`font`:在一个声明中设置所有字体属性：

这个简写属性用于一次设置元素字体的两个或更多方面。

至少要指定字体大小和字体系列

可以按顺序设置如下属性：`font-style`/`font-variant`/`font-weight`/`font-size`/`font-family`

`@font-face`:嵌入字体图标：
[icomoon](https://icomoon.io/)

打包图标icomoon App

生成字体图标：generate Font

解压压缩包，将fonts文件移之网页根目录


```css
/* 声明： */
@font-face {
  font-family: 'icomoon';

  src:  url('fonts/icomoon.eot?cothrk');
  src:  url('fonts/icomoon.eot?cothrk#iefix') format('embedded-opentype'),

  url('fonts/icomoon.ttf?cothrk') format('truetype'),
  url('fonts/icomoon.woff?cothrk') format('woff'),
  url('fonts/icomoon.svg?cothrk#icomoon') format('svg');

  src: local('PingFang SC'),
       local("Microsoft Yahei");

  font-weight: normal;
  font-style: normal;
  font-display: block;
}
css引用：
div{
  font-family: 'icomoon';
  font-style: normal;
}
```
```html
html中应用：

<i></i>
```

::: tip 字体文件的优化
 1. 字体蜘蛛
 2. `unicode-range`属性，规定要是用的字符集范围
  > ```css
  > @font-face {
  >   font-family: "Font Name";
  >   src: url("font.woff2") format("woff2");
  >   unicode-range: U+0020-007E, U+4E00-9FFF;
  > }
  >```
3. 根据`font-weight`自动选择对应字体包，(没有使用的字宽不会被加载)
  > ```css
  > @font-face {
  >     font-family: A;
  >     src: url('./fonts/A-Bold.ttf');
  > 		font-weight: 600;
  > }
  > @font-face {
  >     font-family: A;
  >     src: url('./fonts/A-Medium.ttf');
  > 		font-weight: 500;
  > }
  > @font-face {
  >     font-family: A;
  >     src: url('./fonts/A-Regular.ttf');
  > 		font-weight: 400;
  > }
  > @font-face {
  >     font-family: A;
  >     src: url('./fonts/A-Thin.ttf');
  > 		font-weight: 300;
  > }
  >```

  > ```html
  >   <p style="font-family: A;font-weight: 300;"></p>
  >   <p style="font-family: A;font-weight: 600;"></p>
  > ```
:::
## 2.3.2文本属性

`color`:设置文本颜色

`text-align`:设置文本的水平对齐方式
> `left`:（默认值）左对齐    
> `right`:右对齐   
> `center`:居中对齐    
> `justify`:两端对齐

CSS3中新增了start和end属性值，在通常情况下，start等于left，end等于right

`text-align-last`:设置行末的水平对齐方式
> `left`:（默认值）左对齐    
> `right`:右对齐   
> `center`:居中对齐    
> `justify`:两端对齐


`line-height`:设置行高
> `normal`:（默认值）    
> `数字`    
> `%`    
> `px`   
> `rem`

`text-indent`:设置文本的首行缩进
> `%`    
> `px`    
> `em`    
> `rem`

`initial-letter`:设置文本的下沉
> `params1`:行高    
> `params2`:沉度  

> ```css
> /* 首字下沉 */
> p:first-letter {
>     color: #bf4055;
> 	  initial-letter: 3;
> }
> ``` 

`text-decoration`:向文本添加修饰
> `none`:（默认值）显示标准的文本    
> `underline`:定义文本下划线    
> `overline`:定义文本上划线   
> `line-through`:定义穿过文本下的一条线   
> `blink`:定义闪烁的文本

`text-underline-offset`:设置文本修饰的偏移距离

`text-underline-position`:设置下划线的位置（`text-decoration:underline`时）

`letter-spacing`:设置字符间距
> `normal`:（默认值）   
> `px`:（允许使用负值）

`word-spacing`: 设置字/单词间距
> `normal`:（默认值）就等同于设置为`0`   
> `数字`:（允许使用负值）

`text-transform`: 设置对象中的文本的大小写
> `none`:（默认值）标准的文本    
> `capitalize`:每个单词以大写字母开头    
> `uppercase`:转换为大写字母    
> `lowercase`:转换为小写字母   

`text-shadow`:向文本添加阴影

`white-space`:设置元素中空白的处理方式
> `none`（默认值）空白会被浏览器忽略    
> `pre`:空白会被浏览器保留。其行为方式类似 HTML 中的 pre 标签,常用来输出带格式的`json`  
> `nowrap`:文本不会换行，文本会在在同一行上继续，直到遇到br标签为止   
> `pre-wrap`:保留空白符，但是正常地进行换行   
> `pre-line`:合并空白符，但是正常地进行换行   
> `inherit`:从父元素继承 white-space 属性的值

`direction`:设置文本方向
> `ltr`（默认值）文本方向从左到右   
> `rtl`文本方向从右到左。
::: warning direction:rtl在遇到括号的时候会显示异常
![eventloop](/direction.png)
:::

`text-wrap`:规定文本的换行规则(目前主流浏览器都不支持)
> `normal`:（只在允许的换行点进行换行     
> `none`:不换行。元素无法容纳的文本会溢出    
> `unrestricted`:在任意两个字符间换行    
> `suppress`:压缩元素中的换行。浏览器只在行中没有其他有效换行点时进行换行  
> `balance`:平衡排版，浏览器会根据内容和宽度自动换行(<span style="color: red">*</span>CSS 2023新增) 

`word-break`:规定非中日韩文本的换行规则

`word-wrap`:允许对长的不可分割的单词进行分割并换行到下一行

`text-fill-color`:文本填充颜色，指定文字填充部分的颜色

`text-stroke`:文本边框颜色，指定文字描边部分的颜色

> text-stroke-width文字的描边宽度
> text-stroke-color文字的描边颜色
> 
> ::: danger
>  使用该属性需要使用浏览器私有前缀
> :::
`text-overflow`:规定当文本溢出包含元素时发生的事情
>  clip（默认值）当对象内文本溢出时不显示省略标记（...），而是将 溢出的部分裁切掉   
>  ellipsis：当对象内文本溢出时显示省略标记（...）
>  ::: danger
>  该属性需要和over-flow:hidden属性、white-space:nowrap配合使用
> ```css
> /* 显示一行，省略号 */
> white-space: nowrap;
> text-overflow: ellipsis;
> overflow: hidden;
> word-break: break-all;
> 
> /* 显示两行，省略号 */
> text-overflow: -o-ellipsis-lastline;
> overflow: hidden;
> text-overflow: ellipsis;
> display: -webkit-box;
> -webkit-line-clamp: 2;
> line-clamp: 2;
> -webkit-box-orient: vertical;
> ```
>  :::
`text-outline`:规定文本的轮廓

`user-select`:规定文本是否被用户选择

`text-justify`:规定当 text-align 设置为 "justify" 时所使用的对齐方法

`text-align-last`:设置如何对齐最后一行或紧挨着强制换行符之前的行

`text-emphasis`:向元素的文本应用重点标记以及重点标记的前景色

`unicode-bidi`:用于同一个页面里存在从不同方向读进的文本显示。与`direction`属性一起使用
> `normal`:不使用附加的嵌入层面   
> `embed`:创建一个附加的嵌入层面    
> `bidi-override`:创建一个附加的嵌入层面。重新排序取决于 `direction` 属性

`hanging-punctuation`:规定标点字符是否位于线框之外

`punctuation-trim`:规定是否对标点字符进行修剪

`tab-size`:设定一个tab在页面中的显示长度

`vertical-align`:文本垂直居中（只对行内元素有效，对块元素需要设置`display: table-cell;`）

::: tip 几种实现垂直居中的方法
1. `absolute + margin auto`
2. `absolute + 负 margin`
3. `absolute + calc`
4. `absolute + transform`
5. `line-height + vertical-align`
6. `table`
7. `css-table`
8. `flex-container`
9. `flex + margin auto`
10. `grid网格布局`：推荐在移动端使用
:::

## 2.3.3边框
元素的边框就是围绕元素内容和内边距的一条或多条线

`border`:简写属性，用于把针对四个边的属性设置在一个声明

`border-width`:简写属性，用于为元素的所有边框设置宽度，或者单独地为各边边框设置宽度：

常用单位为像素(px)、em

> `thin`:细的边框。    
> `medium`:（默认值）    
> `thick`:定义粗的边框

`border-style`:用于设置元素所有边框的样式，或者单独地为各边设置边框样式：

> `none`:定义无边框   
> `dotted`:定义点状边框   
> `dashed`:定义虚线   
> `solid`:定义实线    
> `double`:定义双线   
> `groove`:定义 3D 凹槽边框   
> `ridge`:定义 3D 垄状边框    
> `inset`:定义 3D inset 边框    
> `outset`:定义 3D outset 边框

`border-color`:简写属性，设置元素的所有边框中可见部分的颜色，或为 4 个边分别设置颜色。

`border-bottom`:简写属性，用于把下边框的所有属性设置到一个声明中

`border-bottom-color`:设置元素的下边框的颜色

`border-bottom-style`:设置元素的下边框的样式

`border-bottom-width`:设置元素的下边框的宽度

`border-left`:简写属性，用于把左边框的所有属性设置到一个声明中

`border-left-color`:设置元素的左边框的颜色

`border-left-style`:设置元素的左边框的样式

`border-left-width`:设置元素的左边框的宽度

`border-right`:简写属性，用于把右边框的所有属性设置到一个声明中

`border-right-color`:设置元素的右边框的颜色

`border-right-style`:设置元素的右边框的样式

`border-right-width`:设置元素的右边框的宽度

`border-top`:简写属性，用于把上边框的所有属性设置到一个声明中

`border-top-color`:设置元素的上边框的颜色

`border-top-style`:设置元素的上边框的样式

`border-top-width`:设置元素的上边框的宽度

### CSS3新增的边框属性：
`border-radius`:设置所有四个`border-radius`属性的简写属性：

`*`:同时设定四个角的圆角

`**`:分别设定左上 右下、左下 右上圆角

`***`:分别设定左上 、左下 右上、右下圆角

`****`:分别设定左上 、右上、右下、左下圆角

`border-top-left-radius`:左上角圆角边框

`border-top-right-radius`:右上角圆角边框

`border-bottom-right-radius`:右下角圆角边框

`border-bottom-left-radius`:左下角圆角边框

`border-image`:设置所有`border-image`:属性的简写属性：

`border-image`:复合属性，设置边框使用图像来填充，可依次设置一下属性：

`border-image-source`:图像来源路径

`border-image-slice`:边框背景图的分割方式

`border-image-width`:边框的宽度

`border-image-outset`:边框背景图的扩展(边框图像区域超出边框的量)

`border-image-repeat`:边框图像的平铺方式:
> `stretch`:拉伸   
> `repeat`:重复铺满    
> `round`:重复铺满并对图片进行调整

::: tip 使用border绘制三角形
```css
span
{
	 border: 6px solid red;
    border-left-color: #fff;
    border-top-color: #fff;
    border-bottom-color:#fff;
}
```
:::


`box-shadow`:向方框添加一个或多个阴影：

none： 无阴影

阴影水平偏移值/阴影垂直偏移值/阴影模糊值/阴影外延值/阴影的颜色/inset内阴影(默认值为outset)
## 2.3.4背景
`background`:简写属性，作用是将背景属性设置在一个声明中：

`background-attachment`:背景图像是否固定或者随着页面的其余部分滚动。scroll 默认值。/fixed 当页面的其余部分滚动时，背景图像不会移动

`background-color`:设置元素的背景颜色

`background-image`:把图像设置为背景

`background-position`:设置背景图像的起始位置
> `left`    
> `right`   
> `center`    
> `bottom`   
> `top`  
> ::: tip
> 这几个属性值可以两两组合使用，如果只规定了一个关键词，那么第二个值将是"center"
> :::
> x% y% （左上角是 0% 0%。右下角是 100% 100%;如果仅规定了一个值，另一个值将是 50%）   
> x y （左上角是 0 0。右下角是 100 100;如果仅规定了一个值，另一个值将是 50%）


`background-repeat`:设置背景图像是否及如何重复。repeat/repeat-x/repeat-y/no-repeat

### CSS3新增的背景属性： 

`background-size`:规定背景图片的尺寸：

> `px`    
> `%`   
> `cover`:把背景图像扩展至足够大，以使背景图像完全覆盖背景区域    
> `contain`:把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域

`background-clip`:规定背景的绘制区域：

> `border-box`:背景被裁剪到边框盒   
> `padding-box`:背景被裁剪到内边距框    
> `content-box`:背景被裁剪到内容框

`background-origin`:规定背景图片的定位区域：
> `padding-box`:背景图像相对于内边距框来定位    
> `border-box`:背景图像相对于边框盒来定位   
> `content-box`:背景图像相对于内容框来定位


`background-blend-mode`:设置背景图片的混合模式
> `normal`:设置正常的混合模式
>> 是默认的状态，其最终色和绘图色相同

> `multiply`:正片叠底模式
>> 此模式就象是将两副透明的图像重叠夹在一起放在一张发光的桌子上。将两个颜色的像素值相乘，然后除以255得到的结果就是最终色的像素值。通常执行正片叠底模式后的颜色比原来两种颜色都深。任何颜色和黑色正片叠底得到的仍然是黑色，任何颜色和白色执行正片叠底则保持原来的颜色不变，而与其他颜色执行此模式会产生暗室中以此种颜色照明的效果

> `screen`:滤色模式
>> 作用结果和正片叠底刚好相反，它是将两个颜色的互补色的像素值相乘，然后除以255得到的最终色的像素值。通常执行滤色模式后的颜色都较浅。任何颜色和黑色执行滤色，原色不受影响;任何颜色和白色执行滤色得到的是白色；而与其他颜色执行滤色会产生漂白的效果

> `overlay`:叠加模式
>>  在保留底色明暗变化的基础上使用`正片叠底`或`滤色`模式，绘图的颜色被叠加到底色上，但保留底色的高光和阴影部分。底色的颜色没有被取代，而是和绘图色混合来体现原图的亮部和暗部。使用此模式可使底色的图像的饱和度及对比度得到相应的提高，使图像看起来更加鲜亮

> `darken`:变暗模式
>> 与`lighten`相反，将两个图像中更暗的那个被选来作为结果

> `lighten`:变亮模式
>> 与`darken`相反，取两个像素中更亮的作为结果

> `color-dodge`:颜色减淡模式
>> 查看每个通道的颜色信息，通过降低“对比度”使底色的颜色变亮来反映绘图色，和黑色混合没变化

> `saturation`:饱和度模式
>> 采用底色的亮度、色相以及绘图色的饱和度来创建最终色。如果绘图色的饱和度为0，则原图没有变化

> `color`:颜色模式
>> 采用底色的亮度以及绘图色的色相、饱和度来创建最终色。它可保护原图的灰阶层次，对于图像的色彩微调、给单色和彩色图像着色都非常有用

> `luminosity`:亮度模式
>> 采用底色的色相和饱和度以及绘图色的亮度来创建最终色。此模式创建于颜色模式相反效果    
::: tip  实现文字剪切蒙版效果
```css
.container{
  position: relative;
  width: 400px;
  height:400px;
}
img{
  display:block;
  width: 100%;
}
.txt {
  position: absolute;
  inset: 0;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  background: #fff;
  mix-blend-mode: screen;
}
```
```html
<div class="container">
	<img src="pineapple.jpg" alt="pineapple">  <!-- 文字后面的图片 -->
	<div class="txt">mix-blend-mode 属性</div> <!-- 文本内容 -->
</div>
``` 
   
## 2.3.5渐变
`linear-gradinet`:线性渐变(开始位置 角度，起始颜色，终止颜色) 
> 开始位置：渐变开始的位置
>> `%`   
>> `长度`    
>> `left`    
>> `right`   
>> `top`   
>> `bottom`   

> 角度：渐变终止方向的角度，当开始位置为数值或百分比时候可用    
> `起始颜色`    
> `终止颜色`    

`repeating-linear-gradinet`:重复渐变

`radial-gradient`:径向渐变(形状 发散方向，起始颜色，终止颜色) 
> 形状:   
>> `ellipse`:椭圆     
>> `circle`:圆形    

> 方向：    
>> `left`   
>> `right`    
>> `top`    
>> `bottom`  
>> `center`

> 半径：可用像素或关键字表示
>> `closest-side`:圆心到距离最近的边    
>> `farthest-side`:圆心到距离最远的边   
>> `closest-corner`:圆心到距离最近的角   
>> `farthest-corner`:圆心到距离最远的角

> 起始颜色    
> 终止颜色

`repeating-radial-gradinet`:重复的径向渐变
## 2.3.6列表与表格
表格有关的属性：

`border-collapse`:设置是否把表格边框合并为单一的边框.属性值：separate 默认值/collapse边框合并

`border-spacing`:设置分隔单元格边框的距离

`caption-side`:设置表格标题的位置。属性值：top 默认值,在表格之上。bottom 在表格之下

`empty-cells`:设置是否显示表格中的空单元格。属性值：hide/show默认

`table-layout`:设置显示宽度是否随内容拉伸。属性值：auto默认/fixed 列宽由表格宽度和列宽度设定

列表的属性：

`list-style`:简写属性。用于把所有用于列表的属性设置于一个声明中

`list-style-type`:设置列表项标志的类型：
> `none`:无标记    
> `disc`:（默认值）实心圆    
> `circle`:空心圆    
> `square`:实心方块    
> `decimal`:数字    
> `decimal-leading-zero`:0开头的数字    
> `lower-roman`:小写罗马数字    
> `upper-roman`:大写罗马数字    
> `lower-alpha`:小写英文字母    
> `upper-alpha`:大写英文字母    

`list-style-position`:设置列表项标志的位置。属性值：inside/outside默认值

`list-style-image`:将图象设置为列表项标志。属性值：URL 图像的路径。/none 默认。无图形被显示   
## 2.3.7其他常用属性
`opacity`:透明度设定 

:::tip
* IE9, Firefox, Chrome, Opera和Safari使用属性`opacity`来设定透明度。`opacity`属性能够设置的值从0.0到1.0。值越小，越透明
* IE8 以及更早的版本使用滤镜`filter:alpha(opacity=x)` x能够取的值从0到100。值越小，越透明
* `opacity`与通过`rgba()`设定透明度的区别：前者同时作用于元素的标签内容，后者只是作用于元素本身
:::
` cursor`鼠标的样式： 
> `hand`:是手型    
> `pointer`:也是手型，推荐使用这种    
> `crosshair`:是十字型    
> `text`:是移动到文本上的那种效果     
> `wait`:是等待的种效果    
> `default`:是默认效果     
> `e-resize`:是向右的箭头     
> `ne-resize`:是向右上的箭头     
> `n-resize`:是向上的箭头    
> `nw-resize`:是向左上的箭头    
> `w-resize`:是向左的箭    
> `sw-resize`:是左下的箭头    
> `s-resize`:是向下的箭头     
> `se-resize`:是向右下的箭头     
> `auto`:是由系统自动给出效果   

`pointer-events`规定元素是否对指针事件做出反应
> `auto`:默认值。元素对指针事件做出反应，比如:`hover`和`click`    
> `none`:元素不对指针事件做出反应    
> `initial`:将此属性设置为其默认值   
> `inherit`:从其父元素继承此属性   


`outline`:轮廓
是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用
> `outline-color`:设置轮廓的颜色    
> `outline-style`:设置轮廓的样式    
> `outline-width`:设置轮廓的宽度    
> `outline-offset`:设置轮廓到边框的距离。 注：css新增属性,不可以写到符合属性里    

`display`:规定元素应该生成的框的类型
> `none`此元素不会被显示    
> `block`:此元素将显示为块级元素。特征：换行，可设置宽高尺寸   
> `inline`:行内元素，默认。特征:大小自适应；不换行   
> `inline-block`:行内块元素。特征:可以设置大小，但是不可以换行   
> 其他：`list-item`/`table`/`inline-table`/`table-cell`/`table-caption`......     

::: warning inline-block的一些特殊问题
1. 该属性会让元素中间解析一个空格。解决方法是给父元素加`font-size:0px;`
2. 该属性会在垂直方向上以基线对齐。解决方法是给元素加`vertical-align: top;`
:::

`visibility`:规定元素是否可见
> `visible`默认值。元素是可见的。     
> `hidden`:元素是不可见的。    
> `collapse`:当在表格元素中使用，可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"。   
> `inherit`:规定应该从父元素继承visibility属性的值。   

`filter`:滤镜
> `blur()`:模糊   
> `brightness()`:亮度    
> `contrast()`:对比度    
> `grayscale()`:灰度   
> `hue-rotate()`:色相旋转    
> `invert()`:反相    
> `opacity()`:透明度   
> `saturate()`:饱和度    
> `sepia()`:深褐色   
> `drop-shadow()`:阴影  

`touch-action`:设置元素允许的触控操作类型
> `auto`:浏览器来决定  
> `none`:阻止一切操作  
> `pan-x`:只允许单指水平移动    
> `pan-y`:只允许单指垂直移动    
> `pan-left`、`pan-right`、`pan-up`、`pan-down`:只允许单指向左、右、上、下移动    
> `manipulation`:只允许滚动和持续缩放操作    
> `pinch-zoom`只允许多手指平移和缩放操作


`overscroll-behavior`:设置滚动链行为    
是`overscroll-behavior-x`和`overscroll-behavior-y`的集合属性
> `auto`:默认效果，元素的滚动会传播给祖先元素    
> `contain`:阻止滚动链，滚动不会传播给祖先    
> `none`:阻止滚动链，也会阻止元素本身的滚动   

`overscroll-behavior`:控制元素在移动设备上是否使用滚动回弹效果    
> `touch`:当手指从触摸屏上移开，会保持一段时间的滚动     
> `auto`:当手指从触摸屏上移开，滚动会立即停止   

`text-size-adjust`:在移动端的文本溢出算法    
> `none`:文本大小不会根据设备尺寸进行调整   
> `auto`:文本大小根据设备尺寸进行调整   
> `%`:用百分比来指定文本大小在设备尺寸不同的情况下如何调整

`text-orientation`:设定行中字符的方向    

`font-size-adjust`设置当第一个字体不能使用时，第二个字体的大小
> `number`:定义字体的aspect值比率   
> `none`:默认   
> `inherit`:继承父元素

`object-fit`设置指定元素的内容应该如何去适应指定容器的高度与宽度，一般用于 img 和 video 标签
> `fill`:	默认，不保证保持原有的比例，内容拉伸填充整个内容容器  
> `contain`:保持原有尺寸比例。内容被缩放  
> `cover`:保持原有尺寸比例。但部分内容可能被剪切  
> `none`:保留原有元素内容的长度和宽度，也就是说内容不会被重置   
> `scale-down`:保持原有尺寸比例。内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些    
> `initial`:设置为默认值    
> `inherit`:从该元素的父元素继承属性    

`box-decoration-break`规定当元素框被分段时，如何应用元素的 `background`、`padding`、`border`、`border-image`、`box-shadow`、`margin`、`clip-path`
> `slice`:	默认，整个元素作为一个修饰元素，样式会在元素片段的边缘断裂    
> `clone`:每个断开元素都作为一个装饰元素独立渲染，样式会在元素片段的上完整的渲染  
> `initial`:设置为默认值    
> `inherit`:从该元素的父元素继承属性  

`will-change`告知浏览器该元素会有哪些变化的
> `auto`:	默认，表示没有特别指定哪些属性会变化，浏览器根据内置的方法优化   
> `scroll-position`:不久后滚动条的位置将改变，或者使它们产生动画    
> `contents`:不久后元素中的内容将改变，或者使它们产生动画   
> `<custom-ident>`:指定将要变化的那些属性，如果是多个属性则使用逗号进行分隔   
[CSS 的 will-change 属性详解](https://juejin.cn/post/6844903618982723592?searchId=20230714151805B4A163D4F69DF6294CB5)
## 2.3.8 @media 媒体查询
`@media`可以针对不同的屏幕尺寸设置不同的样式
```css
@media not|only mediatype and (mediafeature and|or|not mediafeature) {
  CSS-Code;
}
```
`not`：运算符用于否定媒体查询，如果不满足这个条件则返回`true`，否则返回`false`。如果出现在以逗号分隔的查询列表中，它将仅否定应用了该查询的特定查询。如果使用`not`运算符，则还必须指定媒体类型

`only`：运算符仅在整个查询匹配时才用于应用样式，并且对于防止较早的浏览器应用所选样式很有用。 当不使用`only`时，旧版本的浏览器会将`screen and (max-width: 500px)` 简单地解释为`screen`，忽略查询的其余部分，并将其样式应用于所有屏幕。如果使用`only`运算符，则还必须指定媒体类型。

`, (逗号)`：逗号用于将多个媒体查询合并为一个规则。逗号分隔列表中的每个查询都与其他查询分开处理。因此，如果列表中的任何查询为`true`，则整个`media`语句均返回`true`。换句话说，列表的行为类似于逻辑或`or`运算符

`and`：操作符用于将多个媒体查询规则组合成单条媒体查询，当每个查询规则都为真时则该条媒体查询为真，它还用于将媒体功能与媒体类型结合在一起

`mediatype`：媒体类型：
> `all`：用于所有设备   
> `print`：用于打印机和打印预览   
> `screen`：用于电脑屏幕，平板电脑，智能手机等    
> `speech`

`mediafeature`：媒体功能：
> 宽度类型：
>> `width`：页面等于`width`时可见   
>> `max-width`：页面小于`max-width`时可见    
>> `min-width`：页面大于`min-width`时可见        
>> `device-width`：屏幕等于`width`时可见      
>> `max-device-width`：屏幕小于`max-device-width`时可见        
>> `min-device-width`：屏幕大于`min-device-width`时可见  

> 高度类：
>> `height`：页面等于`height`时可见    
>> `max-height`：页面小于`max-height`时可见    
>> `min-height`：页面大于`min-height`时可见        
>> `device-height`：屏幕等于`height`时可见      
>> `max-device-height`：屏幕小于`max-device-height`时可见        
>> `min-device-height`：屏幕大于`min-device-height`时可见     
  
> 比例类（宽度/高度）：
> > `aspect-ratio`：页面等于`aspect-ratio`时可见    
> > `max-aspect-ratio`：页面小于`max-aspect-ratio`时可见    
> > `min-aspect-ratio`：页面大于`min-aspect-ratio`时可见       
> > `device-aspect-ratio`：屏幕等于`device-aspect-ratio`时可见      
> > `max-device-aspect-ratio`：屏幕小于`max-device-aspect-ratio`时可见    
> > `min-device-aspect-ratio`：屏幕大于`min-device-aspect-ratio`时可见    

> 颜色类：
>> `color`：定义输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于0    
>> `color-index`：定义在输出设备的彩色查询表中的条目数。如果没有使用彩色查询表，则值等于0   
>> `max-color`：定义输出设备每一组彩色原件的最大个数    
>> `max-color-index`：定义在输出设备的彩色查询表中的最大条目数    
>> `min-color`：定义输出设备每一组彩色原件的最小个数    
>> `min-color-index`：定义在输出设备的彩色查询表中的最小条目数    
其他：
>> `monochrome`：定义在一个单色框架缓冲区中每像素包含的单色原件个数。如果不是单色设备，则值等于0      
>> `max-monochrome`：定义在一个单色框架缓冲区中每像素包含的最大单色原件个数    
>> `min-monochrome`：定义在一个单色框架缓冲区中每像素包含的最小单色原件个数       

>> `resolution`：定义设备的分辨率。如：96dpi, 300dpi, 118dpcm       
>> `max-resolution`：定义设备的最大分辨率             
>> `min-resolution`：定义设备的最小分辨率       

>> `grid`：用来查询输出设备是否使用栅格或点阵       
>> `orientation`：定义输出设备中的页面可见区域高度是否大于或等于宽度       
>> `scan`：定义电视类设备的扫描工序     

* 案例    
```html
  <style>
    /* 1000-1200之间 */
    @media screen and (min-width: 1000px) and (max-width: 1200px) {
      body {
        background-color: lightgreen;
      }
    }
    /* 1000-1200之外 */
   @media not screen and (min-width: 1000px) and (max-width: 1200px) {
      body {
        background-color: lightgreen;
      }
    }
  </style>
<!-- 通过媒体查询引入不同的样式表 -->
<link rel="stylesheet" media="screen and (min-width: 1000px) and (max-width: 1200px)" href="smallscreen.css">
```
::: tip
媒体查询的书写顺：目标值要由大到小的顺序，否则会小的值回被覆盖
```js
    @media screen and (max-width: 1000px) {
      body {
        background-color: lightgreen;
      }
    }
    @media screen and (max-width:600px) {
      body {
        background-color: lightblue;
      }
    }
```
:::
## 2.3.9兼容属性
* Webkit内核：前缀为-webkit-      
* Trident内核：前缀为-ms-     
* Gecko内核：前缀为-moz-      
* Presto内核：前缀为-o-        
