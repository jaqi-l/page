# 3.4 控制语句
## 3.4.1 基本概念

#### 单行语句

#### 复合语句

#### 代码块

#### 复合语句也会被当做一条语句来处理


## 3.4.2 if选择语句

#### 过程：
条件语句用于基于不同的条件来执行不同的动作。

if() 语句 - 只有当指定条件为 true 时，使用该语句来执行代码

if()...else 语句 - 当条件为 true 时执行代码，当条件为 false 时执行其他代码

if()...else if()....else 语句 - 使用该语句来选择多个代码块之一来执行

if语句()中的表达式会自动转换成布尔值。

#### 写法：
```js
if(condition){
// 要执行的代码
}else if(condition){
// 要执行的代码
}else{
// 要执行的代码
}
```

## 3.4.3 switch多条件选择语句
使用 switch 语句来选择要执行的多个代码块之一。

#### 过程：
首先设置表达式 n（通常是一个变量）。

随后表达式的值会与结构中的每个 case 的值做比较。

如果存在匹配，则与该 case 关联的代码块会被执行。

请使用 break 来阻止代码自动地向下一个 case 运行。

default 关键词来规定匹配不存在时做的事情;相当于if里的else

#### 写法：
```js
switch(n)
{
case 1:
    // 要执行的代码;
    break;
case 2:
    // 要执行的代码;
    break;
case 3:
    // 要执行的代码;
    break;
default:
//n 与 所有的case 都不同时执行的代码，相当于if里的else
} 

// 利用对象简化switch语句
var data = {
  1: fn1(), // 要执行的代码;
  2: fn2(), // 要执行的代码;
  3: fn3()  // 要执行的代码;
};
```

## 3.4.4 for循环语句
在编程中有些指令需要执行很多遍，这时候就要用到循环语句。

#### 语法：
for (语句 1; 语句 2; 语句 3)
{
被执行的代码块
}
#### 过程：
语句 1 在循环（代码块）开始前执行

语句 2 定义运行循环（代码块）的条件,如果语句 2 返回 true，则循环再次开始，如果返回 false，则循环将结束。

语句 3 在循环（代码块）已被执行之后执行

语句 1 是可选的，也就是说不使用语句 1 也可以。

如果您省略了语句 2，那么必须在循环内提供 break。否则循环就无法停下来。这样有可能令浏览器崩溃。

语句 3 也是可选的。
#### 写法：
```js
for(var i=0 ; i<arr;i++){
    console.log(arr[i])
}
```

## 3.4.5 while循环
while循环在执行前测试一个条件，如果条件成立进入循环。

#### 写法：
```js
while(condition)
{
// 要执行的代码;
}
```
## 3.4.6 do-while循环
while循环在执行前测试一个条件，而do-while循环先执行循环，然后再测试条件成立与否。

#### 写法：
```js
do
{
// 要执行的代码;
}
while (condition)
```


:::tip
差别：for:已知循环次数，while:已知循环条件，do-while:希望至少循环一次
:::

## 3.4.7 其他控制语句
### for/in 
循环遍历对象
```js
let obj = {a: '1', b: '2', c: '3', d: '4'}
for (let key in obj) {
    console.log(key)    //对象的属性名称 a,b,c,d
    console.log(obj[key])  //对象的属性值1，2，3，4
}
```
### for/of
ES6新增加的语法，用来对键值进行循环
```js
let arr = ['China', 'America', 'Korea']
for (let o of arr) {
    console.log(o) //China, America, Korea
}
```
### for/each
遍历数组，并调用函数（不能使用return、break等中断循环），不改变原数组，无返回值undefined。
```js
let arr = ['a', 'b', 'c', 'd']
arr.forEach(function (val, index, arr) {
    console.log(val + ', index = ' + index) // val是当前元素，index当前元素索引，arr数组
})


// 输出结果
a, index = 0
b, index = 1
c, index = 2
d, index = 3
```

#### map
与`for/each`相同
```js
var numbers = [4, 9, 16, 25];

function myFunction() {
    x = document.getElementById("demo")
    x.innerHTML = numbers.map(Math.sqrt);
}
// 输出结果
2,3,4,5
```

:::tip
map与foreach区别：

1. `map`速度比`for/each`快

2. `map`会返回一个新数组，不对原数组产生影响,`for/each`不会产生新数组，`for/each`返回undefined

3. `map`因为返回数组所以可以链式操作，`for/each`不能

4. `map`里可以用`return` ,而`for/each`不能用`break`和`return`。
:::

#### with
`with`语句的用途是将代码作用域设置为特定的对象

```js
const obj = { a: 1 };
with(obj) {
  console.log(a); 
}
```

::: warning
由于`with`语句影响性能且难于调试其中的代码，通常不推荐在产品代码中使用with语句
:::


## 3.4.8 跳出 

`break`用来终止循环，让循环不再往下继续，可以用在循环或`switch`中,不能用在`for/each`中。

`continue`用来跳过当前循环，继续往下循环，只能用在循环中。

`return`跳出当前函数，只能用在函数体内。
