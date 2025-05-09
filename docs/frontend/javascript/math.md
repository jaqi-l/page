# 3.8 Math对象
## 3.8.1基本概念
`Math`对象用于执行数学任务。

`Math`对象并不像`Date`和`String`那样是对象的类，因此没有构造函数`Math()`。

## 3.8.2算数值
`Math.PI`：返回圆周率（约等于3.14159）。

`Math.E`：返回算术常量e，即自然对数的底数（约等于2.718）。

`Math.SQRT2`：返回2的平方根（约等于 1.414）。

`Math.SQRT1_2`：返回返回1/2的平方根（约等于 0.707）。

`Math.LN2`：返回2的自然对数（约等于0.693）。

`Math.LN10`：返回10的自然对数（约等于2.302）。

`Math.LOG2E`：返回以2为底的e的对数（约等于 1.443）。

`Math.LOG10E`：返回以10为底的e的对数（约等于0.434）。

`Math.max`：返回一组数中的最大值

`Math.min`：返回一组数中的最小值
> ```js
>   const arr = [1, 2, 3];
>   Math.max(…arr); // 3
>   Math.min(…arr); // 1
> ```
## 3.8.3数值取整
`Math.ceil(x)`：对数进行上舍入。

`Math.floor(x)`：对数进行下舍入。
> ```js
> Math.floor(1.9) === 1 // true
> 
> // 简写
> ~~1.9 === 1 // true
> ```
`Math.round()`：把数四舍五入为最接近的整数。

`toFixed(x)`：把数四舍五入为最接近的x位小数。

## 3.8.4随机数
`Math.random()`：返回0 ~ 1之间的随机数（并不包括0和1）。
> 生成low,high之间的随机数：
> ```js
> function selec(low,high){
>   var ch=high-low+1;
>   return Math.floor(Math.random()*ch+low);
> }
> ```
## 3.8.5三角函数
`Math.cos(x)`：返回数的余弦。

`Math.acos(x)`：返回x的反余弦值。

`Math.sin(x)`：返回数的正弦。

`Math.asin(x)`：返回x的反正弦值。

`Math.tan(x)`：返回角的正切。

`Math.atan(x)`：以介于-PI/2 与PI/2弧度之间的数值来返回x的反正切值。

## 3.8.6其他方法
`Math.max(x,y)`：返回x和y中的最高值。

`Math.min(x,y)`：返回x和y中的最低值。

`Math.abs(x)`：返回x的绝对值。

`Math.atan2(y,x)`：返回从x轴到点(x,y)的角度（介于 -PI/2 与 PI/2 弧度之间）。

`Math.exp(x)`：返回e的指数。

`Math.log(x)`：返回数的自然对数（底为e）。

`Math.pow(x,y)`：返回x的y次幂。
> ```js
> Math.pow(2,3); // 8
> 
> // 简写
> 2**3 // 8
> ```
`Math.valueOf()`：返回Math对象的原始值。