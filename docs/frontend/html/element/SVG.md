
### 图形
#### `svg`
所有的SVG元素都要放在`svg`标签内。      
`svg`属性：     
> `xmlns`属性：定义SVG命名空间。        
> `width`/`height`属性：设置SVG文档宽高。       
> `version`定义所使用的SVG版本。        
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
</svg>
```
#### `rect`
定义一个矩形元素。      
`rect`属性：
> `x`/`y`设置矩形在svg标签的位置水平或垂直位置。        
> `width`/`height`设置矩形的宽高。      
> `rx`/`ry`设置矩形的水平或垂直边圆角的半径大小。       
> `style`设置css属性。      
> `fill`填充颜色。      
> `stroke-width`边框的宽度。        
> `stroke`边框的颜色。      
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
<rect width="300" height="100" x="50" y="20" rx="20" ry="20"
style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
</svg>
```
#### `circle`
定义一个圆形元素。      
`circle`属性：      
> `cx`/`cy`设置圆形中心在svg标签的位置水平或垂直位置。      
> `r`设置圆形的半径。       
> `style`设置css属性。      
> `fill`填充颜色。              
> `stroke-width`边框的宽度。        
> `stroke`边框的颜色。      
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red"/>
</svg>
```
#### `ellipse`
定义一个椭圆元素。      
`ellipse`属性：     
> `cx`/`cy`设置椭圆中心在svg标签的位置水平或垂直位置。      
> `rx`/`ry`设置椭圆的水平半径或垂直半径。       
> `style`设置css属性。      
> `fill`填充颜色。      
> `stroke-width`边框的宽度。        
> `stroke`边框的颜色。      
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <ellipse cx="240" cy="50" rx="220" ry="30" style="fill:yellow"/>
</svg>
```

#### `line`
定义一个直线元素。           
`line`属性：        
> `x1`/`y1`设置起点坐标。              
> `x2`/`y2`设置终点坐标。              
> `style`设置css属性。              
> `fill`填充颜色。                       
> `stroke-width`直线宽度。           
> `stroke`直线颜色。                
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
 <line x1="0" y1="0" x2="200" y2="200"
  style="stroke:rgb(255,0,0);stroke-width:2"/>
</svg>
```

#### `polygon`
定义一个多边形元素。              
`polygon`属性：               
> `points`设置各点坐标，水平、垂直坐标两两一组，逗号分隔。                 
> `style`设置css属性。               
> `fill`填充颜色。                        
> `stroke-width`直线宽度。            
> `stroke`直线颜色。        
> `fill-rule`设置填充规则。             
```html
<svg  height="210" width="500">
  <polygon points="200,10 250,190 160,210"
  style="fill:lime;stroke:purple;stroke-width:1"/>
</svg>
```

#### `polyline`
定义一个多边形元素。              
`polygon`属性：              
> `points`设置各点坐标，水平、垂直坐标两两一组，逗号分隔。               
> `style`设置css属性。              
> `fill`填充颜色。                      
> `stroke-width`直线宽度。            
> `stroke`直线颜色。        
> `fill-rule`设置填充规则。              
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" style="fill:white;stroke:red;stroke-width:4" />
</svg>
```

#### `path`
定义一个路径元素。            
`path`属性：        
> `M x y`(moveto)从该坐标为开始。       
> `L x y`(lineto)到该坐标为结束。       
> `H`(horizontal lineto)设置水平终点。      
> `V`(vertical lineto) 设置垂直终点     
> `C`(curveto)曲线      
> `S`(smooth curveto)平滑曲线       
> `Q`(quadratic Bézier curve)赛贝尔曲线     
> `T`(smooth quadratic Bézier curveto)光滑赛贝尔曲线。        
> `A`(elliptical Arc)椭圆弧。       
> `Z`(closepath)闭合路径。             
> `style`设置css属性。              
> `fill`填充颜色。                     
> `stroke-width`直线宽度。            
> `stroke`直线颜色。        
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <path d="M150 0 L75 200 L225 200 Z" />
</svg>
```

#### `text`
定义一个文本元素。            
`text`属性：            
> `style`设置css属性。         
> `fill`填充颜色。              
> `stroke`描边颜色。      
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <text x="0" y="15" fill="red" transform="rotate(30 20,40)">I love SVG</text>
</svg>
```
#### `a`
定义一个链接元素。            
`text`属性：            
> `xlink:href`设置路径。         
> `target`设置跳转模式。    
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
xmlns:xlink="http://www.w3.org/1999/xlink">
  <a xlink:href="http://www.w3schools.com/svg/" target="_blank">
    <text x="0" y="15" fill="red">I love SVG</text>
  </a>
</svg>
```


###  滤镜
#### `defs`
所有的滤镜元素都要放在`defs`标签内。
#### `filter`
根据ID对滤镜分组，需放在`defs`标签内。     
`id`定义滤镜ID。        
滤镜使用方法：`filter="url(#id)"`根据`filter`ID绑定滤镜。

#### `feGaussianBlur`
创建模糊滤镜        
`feGaussianBlur`属性：       
> `in="SourceGraphic"`设置对整个图片创建滤镜。      
> `stdDeviation`设置模糊量。
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
```
#### `feBlend `
设置滤镜混合模式                
`feGaussianBlur`属性：     
> `in="SourceGraphic"`设置对整个图片创建滤镜。      
> `dx`/`dy`设置阴影偏移量。     
> `result="offOut"` 
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
      <feBlend in="SourceGraphic" in2="offOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
```

#### `feOffset`
创建阴影滤镜        
`feGaussianBlur`属性：            
> `in="SourceGraphic"`设置对整个图片创建滤镜。      
> `dx`/`dy`设置阴影偏移量。     
> `result="offOut"` 
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
      <feBlend in="SourceGraphic" in2="offOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
```

#### `linearGradient`
创建线性渐变        
`feGaussianBlur`属性：     
> `x1`/`y1`设置渐变开始位置。       
> `x2`/`y2`设置渐变结束位置。       
`stop`属性：添加渐变颜色。      
> `offset`设置渐变颜色位置，0%表示起点，100%表示终点。      
> `style`设置css属性。      
> `stop-color`设置颜色。        
> `stop-opacity`设置透明度。      
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>
```

#### `radialGradient`
创建放射性渐变      
`radialGradient`属性：     
> `cx`/`cy`设置外层圆心位置。       
> `fx`/`fy`设置内层圆心位置。       
> `r`设置渐变半径，百分比。     
`stop`属性：添加渐变颜色。      
> `offset`设置渐变颜色位置，0%表示起点，100%表示终点。      
> `style`设置css属性。      
> `stop-color`设置颜色。        
> `stop-opacity`设置透明度。        
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);
      stop-opacity:0" />
      <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
    </radialGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>
```
###  动画
#### `animate`
创建放射性渐变      
`animate`属性：     
> `attributeName`设置发生变化的元素属性名。       
> `attributeType`设置属性类型，`XML`类型和`css`类型，默认auto，优先使用css属性，如果无效使用XML属性。       
> `from`/`to`/`by`设置初始值，终止值，迁移量。     
> `begin`/`dur`/`end`设置开始时间，时长，终止时间。
> `repeatDur`设置动画的总时长。     
> `fill`设置结束后的画面，freeze停留在终止时刻，remove停留在初始化时刻，。      
> `repeatCount`重复次数、 indefinit为循环。          
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);
      stop-opacity:0" />
      <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
    </radialGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>
```
###  事件
#### SMIL方式
点击后fill从红色变成蓝色
```html
<svg>
<rect x="15" y="15" width="40" height="40" fill="red">
<set attributeName="fill" to="blue" begin="click"/>
</rect>
</svg>
```

#### iframe方式
```html
 <iframe scrolling="no" id="iframe" src="img.svg"/>
```
```js
 $("#iframe").on("load", function (event) {//判断 iframe是否加载完成  这一步很重要
    $("#img", this.contentDocument).click(function () {//添加点击事件
  });
 });
```
#### Attributes方式
```html
<svg xmlns="http://www.w3.org/2000/svg"
xmlns:xlink=http://www.w3.org/1999/xlink
xmlns:a3="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
a3:scriptImplementation="Adobe">
  <script type="text/ecmascript" a3:scriptImplementation="Adobe">
    <![CDATA[
    function changeColor(evt)
    {
    var rect = evt.target;
    rect.setAttributeNS(null, "fill", "blue")
    }
    ]]>
  </script>
  <rect x="5" y="5" width="40" height="40"
  fill="red"
  οnclick= "changeColor(evt)"/>click
</svg>
```

#### JavaScript+SMIL方式
```html
<svg οnlοad="makeShape(evt)">
  <script>
    <![CDATA[
    var svgns = "http://www.w3.org/2000/svg";u
    function makeShape(evt) {
    svgDoc = evt.target.ownerDocument;
    var rect = svgDoc.createElementNS(svgns, "rect");v
    rect.setAttributeNS(null, "x", "5");
    rect.setAttributeNS(null, "y", "5");
    rect.setAttributeNS(null, "width", "40");
    rect.setAttributeNS(null, "height", "40");
    rect.setAttributeNS(null, "fill", "red");
    var set = svgDoc.createElementNS(svgns, "set");
    set.setAttributeNS(null, "attributeName", "fill");
    set.setAttributeNS(null, "to", "blue");
    set.setAttributeNS(null, "begin", "click");
    rect.appendChild(set);
    svgDoc.rootElement.appendChild(rect);
    }
    ]]>
  </script>
</svg>
```

#### JavaScript+SMIL方式
```html

<svg οnlοad="makeShape(evt)">
  <script>
    <![CDATA[
    var svgns = "http://www.w3.org/2000/svg";
    function makeShape(evt) {
    if ( window.svgDocument == null )
    svgDoc = evt.target.ownerDocument;
    var rect = svgDoc.createElementNS(svgns, "rect");
    rect.setAttributeNS(null, "x", 15);
    rect.setAttributeNS(null, "y", 15);
    rect.setAttributeNS(null, "width", 40);
    rect.setAttributeNS(null, "height", 40);
    rect.setAttributeNS(null, "fill", "red");
    rect.addEventListener("click", changeColor, false); u
    svgDoc.documentElement.appendChild(rect);
    }
    function changeColor(evt) {
    var target = evt.target;
    target.setAttributeNS(null, "fill", "blue");
    }
    ]]>
  </script>
</svg>
```
###  其他
`Stroke`属性的其他相关属性      
stroke-linecap设置线段端点样式。        
stroke-dasharray设置虚线，逗号分隔各线段长度。      