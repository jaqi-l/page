# 2.7 CSS动画
## 2.7.1变形
### `transform`：2D变形： 

* 移动：

`translate(x,y)`X,Y轴移动。     
`translateX(x)`X轴移动。        
`translateY(y)`Y轴移动。

* 缩放：

`scale(x,y)`X,Y轴缩放。     
`scaleX(x)`X轴缩放。        
`scaleY(y)`Y轴缩放。        

* 转动：

`rotate(angle)`转动角度。       
`skew(x-angle,y-angle)`定义沿着 X 和 Y 轴的 2D 倾斜转换。      
`kewX(angle)`沿着X轴的转动。     
`skewY(angle)`沿着Y轴的转动。        
`matrix(n,n,n,n,n,n) `定义2D转换，使用六个值的矩阵。      
  
:::tip
* 转动单位可以设置角度`deg`/弧度`rad`     
* 长度单位可以设置像素`px`像素/百分比`%`
* X轴可以设置`left`/`right`/`center`
* Y轴可以设置`top`/`bottom`/`center`
:::



### `transform`：3D变形 

transform：3D变形可以近似理解为沿着Z轴移动元素，使得元素更加靠近或者远离你，从而使元素看起来变得更大或更小。

* 移动：  
        
`translate3d(x,y,z)`X,Y,Z轴移动。    
`translateX(x)`X轴移动。        
`translateY(y)`Y轴移动。        
`translateZ(z)`z轴移动。


* 缩放：

`scale3d(x,y,z)`X,Y,Z轴3D缩放。     
`scaleX(x)`X轴缩放。        
`scaleY(y)`Y轴缩放。        
`scaleZ(z)`Z轴缩放。

* 转动： 
     
`rotate3d(x,y,z,angle)`3D旋转。       
`rotateX(angle)`沿着X轴转动。       
`rotateY(angle)`沿着Y轴转动。       
`rotateZ(angle)`沿着Z轴转动。
`matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n) `定义 3D 转换，使用 16 个值的 4x4 矩阵。


###  其他属性： 
    
`transform-origin`改变元素变形的基准点。        

`perspective(n)`为3D转换元素定义透视视图，视距大，透视变形越小，反之。 

`perspective-origin`规定 3D 元素的底部位置。目前浏览器都不支持。    

`backface-visibility`定义元素在不面对屏幕时是否可见。反转时正显，背隐。浏览器支持度不好。   
   
`transform-style`规定被嵌套元素如何在 3D 空间中显示。 
> `flat`子元素将不保留其 3D 位置。      
> `preserve-3d`子元素将保留其 3D 位置。

## 2.6.2过渡
通过 CSS3，我们可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。
CSS3 过渡是元素从一种样式逐渐改变为另一种的效果。要实现这一点，必须规定两项内容：把效果添加到哪个 CSS 属性上/规定效果的时长

* 过渡动画的属性：

`transition` 简写属性，用于在一个属性中设置四个过渡属性。

`transition-property` 规定应用过渡的 CSS 属性的名称。 

> `none`没有属性会获得过渡效果。      
> `all`所有属性都将获得过渡效果。     
> `属性名称`

`transition-duration`定义过渡效果花费的时间。默认是 0。单位是秒或毫秒

`transition-timing-function`规定过渡效果的时间曲线。默认是 "ease"。 

> `linear`规定以相同速度开始至结束的过渡效果（等于`cubic-bezier(0,0,1,1)`）。       
> `ease`规定慢速开始，然后变快，然后慢速结束的过渡效果（`cubic-bezier(0.25,0.1,0.25,1)`）。     
> `ease-in`规定以慢速开始的过渡效果（等于 `cubic-bezier(0.42,0,1,1)`）。        
> `ease-out`规定以慢速结束的过渡效果（等于 `cubic-bezier(0,0,0.58,1)`）。       
> `ease-in-out`规定以慢速开始和结束的过渡效果（等于 `cubic-bezier(0.42,0,0.58,1)`）。       
> `cubic-bezier(n,n,n,n)`在`cubic-bezier`函数中定义自己的值。可能的值是 0 至 1 之间的数值。

`transition-delay`规定过渡效果何时开始。默认是 0。

## 2.7.3关键帧动画
通过 CSS3，我们能够创建动画，这可以在许多网页中取代动画图片、Flash 动画以及 JavaScript。

`@keyframes` 设定动画规则。可以近似理解为动画的剧本。 

> `name`必需。定义动画的名称。      
> 0-100%/from...to...动画时长的百分比。     
> 需要变化的CSS样式属性。       

`animation` 所有动画属性的简写属性，用于设置六个动画属性：
> `animation-name`      
> `animation-duration`      
> `animation-timing-function`       
> `animation-delay`     
> `animation-iteration-count`       
> `animation-direction`

`animation-name`属性为 @keyframes 动画规定名称。若设置为none则覆盖已有的动画效果。

`animation-duration` 规定动画完成一个周期所花费的秒或毫秒。默认是 0。

`animation-timing-function` 规定动画的速度曲线：

> `linear`规定以相同速度开始至结束的过渡效果（等于`cubic-bezier(0,0,1,1)`）。     
> `ease`（默认值）规定慢速开始，然后变快，然后慢速结束的过渡效果（等于`cubic-bezier(0.25,0.1,0.25,1)`）。     
> `ease-in`规定以慢速开始的过渡效果（等于`cubic-bezier(0.42,0,1,1)`）。       
> `ease-out`规定以慢速结束的过渡效果（等于`cubic-bezier(0,0,0.58,1)`）。      
> `ease-in-out`规定以慢速开始和结束的过渡效果（等于`cubic-bezier(0.42,0,0.58,1)`）。      
> `cubic-bezier(n,n,n,n)`在cubic-bezier函数中定义自己的值。可能的值是 0 至 1 之间的数值。

`animation-delay` 规定动画何时开始。默认是 0。

`animation-iteration-count` 规定动画被播放的次数。默认是 1。infinite为无限次播放。

`animation-direction` 规定动画是否在下一周期逆向地播放。

> `normal`（默认值）顺向播放"       
> `alternate`动画应该轮流反向播放。

`animation-play-state` 规定动画是否正在运行或暂停。

> `running`（默认值）正在播放。         
> `paused`动画暂停。      

`animation-fill-mode` 规定对象动画时间之外的状态。 

> `none`不改变默认行为。        
> `forwards`当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。        
> `backwards`在`animation-delay`所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。      
> `both`向前和向后填充模式都被应用。