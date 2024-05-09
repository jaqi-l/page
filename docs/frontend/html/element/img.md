

### 常用属性
#### src属性
指定图片来源的路径
#### alt属性
当图片无法显示时的替代文字
#### width和height属性
指定图片的宽度和高度；单位是像素或百分比；
#### title属性
当鼠标移动到该位置时显示该内容
#### usemap属性
设置图片的映射区域

### 样式初始化

::: tip 提示
去除图片默认边框
```css
img{
    display: block;
    /* 或 */
    vertical-align: middle;
    /* 或 */
    vertical-align: top;
}
```
::: 

 
 ### 图形映射：
`map`标签       
> `name`:设置映射区的名称


`area`标签，创建一个子映射区(必须在map标签内使用)
> `shape`:设置子映射区形状
>> `rect`:矩形      
>> `circ`:圆形      
>> `poly`:多边形  

> `coords`:设置子映射区坐标     
>> `coords(x1,y1,x2,y2)`:子映射区为矩形时x,y为左上角顶点坐标、右下角顶点坐标     
>> `coords(x,y,radius)`:子映射区为圆形时,xy圆点坐标    
>> `coords(x1,y1,x2,y2,..,xn,yn)`子映射区为多边形时x,y为各顶点坐标   
> `href`:设置子映射区的目标URL      
> `alt`:设置子映射区的替代文本      

 ```html
 <!-- 通过usemap属性绑定相应的map映射区 -->
<img src="planets.gif" width="145" height="126" alt="Planets" usemap="#planetmap"> 

<map name="planetmap"> <!-- planetmap映射区名称 -->
  <area shape="rect" coords="0,0,82,126" href="sun.htm" alt="Sun">
  <area shape="circle" coords="90,58,3" href="mercur.htm" alt="Mercury">
  <area shape="circle" coords="124,58,8" href="venus.htm" alt="Venus">
</map>
```