# 3.1 变量
##  3.1.1 标识符
### 标识符命名规范
变量、函数、属性或函数参数的名称     
1. 名字由英文字母、美元符号、下划线组成开头，后面可以是“字母、下划线、美元符号或数字        
2. 标识符中的字母可以是扩展ASCII（Extended ASCII）中的字母，也可以是Unicode的字母字符，如À和Æ（但不推荐使用）   
3. 使用驼峰大小写形式，即第一个单词的首字母小写，后面每个单词的首字母大     
4. 关键字、保留字、true、false、eval、arguments和null不能作为标识     

##  3.1.2 常量、变量、关键字、保留字
### 常量      
* 常量是从始至终不能被改变的数据。比如: 数字 123 可以是常量，字符串 "hello" 也是一个常量......
* 常量通常用来表示固定不变的量，比如圆周率，万有引力常量。
### 变量      
* 变量的值是可以改变的，变量可以看做是存储数据的容器。比如一个瓶子，它既可以装入酱油、醋；也可以装入茅台和二锅头......
* 在 JavaScript 中创建变量通常称为“声明”变量，使用关键字 `var`来声明变量。在ECMAScript 6及更晚的版本中使用可以使用`const`和`let`
* 向变量赋值，使用等号;可以在声明变量时对其赋值，也可以先声明后赋值。
* 可以在一条语句中声明很多变量。该语句以 `var` 开头，并使用逗号分隔变量即可。
* 当变量名与函数名一致时，保留函数。    
### 关键字  
`break`、`do`、`in`、`typeof`、`case`、`else`、`instanceof`、`var`、`catch`、`export`、`new`、`void`、`class`、`extends`、`return`、`while`、`const`、`finally`、`super`、`with`、`continue`、`for`、`switch`、`yield`、`debugger`、`function`、`this`、`default`、`if`、`throw`、`delete`、`import`、`try`
### 保留字  
* 始终保留：`enum`
* 严格模式下保留：`implements`、`package`、`public`、`interface`、`protected`、`static`、`let`、`private`
* 模块代码中保留：`await`


##  3.1.3 作用域

作用域是指有效范围，JS变量的作用域有全局和局部之分
> "全局变量"：申明在函数之外的变量。        
> "局部变量"：申明在函数体中的变量，并且只能在当前函数体内访问。

全局变量的优缺点    
> * 全局变量的优点：可以减少变量的个数，减少由于实际参数和形式参数的数据传递带来的时间消耗。
> * 全局变量缺点:使函数的代码可读性降低。由于多个函数都可能使用全局变量，函数执行时全局变量的值可能随时发生变化，对于程序的查错和调试都非常不利。

<span style="color: red">\*ES6新增块级作用域</span> [3.16.1 let和const命令](/frontend/javascript/ECMAScript#_3-16-1-let和const命令)

::: tip
1. 当局部变量与全部变量同名时，用自己的。
2. 如果函数内部有定义变量，即使在定义之前输出但会先执行后面定义语句，然后逐行判断输出结果。（浏览器会先解析var、function（只优先解析定义。）,<span style="color: red">ES6新增的let和const不存在预解析</span> ）
3. 函数的预解析优先级高于变量
4. 块内的预解析只能优先到块首
5. 不加var默认是隐形全局变量，无论在什么位置定义，都是全局的。
6. 匿名函数自执行（避免全局污染）：(function(){…})();
:::


``` js
var a =1;  
function test(){  
    alert(a); // a为undefined! 这个a并不是全局变量  而是 var a的a  因为变量声明提升 
    a=4  
    alert(a); //a为4, 这里的a是局部变量  
    var a;  
    alert(a);   //a为4, 这里的a是局部变量 
    alert(window.a); //a为1,这里的a是全局变量  
}  
test()  
alert(a); //a为1,这里的a是全局变量  
```

``` js
var a = 1
console.log(a) // 1 全局
if (true) {
    console.log(a) // f 全局
    a = 2 // 2
    console.log(a) //  2 全局+局部
    function a() {} // 函数的预解析优先级高于变量
    a = 3 
    console.log(a) // 3 局部
}
console.log(a)  // 2 全局
```

##  3.1.4 作用域链
当访问一个变量时，解释器会首先在当前作用域查找，如果没有找到，就去<span style="color: red">定义</span>它的父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链。
```js
function f1(){
　　　　var n=999; 
　　　　function f2(){  
　　　　　　alert(n);  //  通过作用域链 可以使用父元素的变量
　　　　}
        f2()
　　}
　　f1();
```

::: warning  对象嵌套函数的作用域链问题
```js
var name = "The Window";	
var person = {
  　name : "My Object",
  	fn : function() {
    console.log(name); // The Window   fn作用域链的上层就是window，与对象嵌套的多少无关
  }
};

person.fn() 
``` 
:::
##  3.1.5 闭包
一个函数和对其周围状态的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包。
本质上是利用作用域链，从而能从外向里获取内容函数的变量的现象。
```js
function f1(){
　　　　var n=999; // 一个局部变量
　　　　function f2(){   // f2 一个内部函数  形成一个闭包
            n++; // 闭包可以更新外部变量的值
　　　　　　alert(n);  //  通过过作用域链 使用父元素的变量
　　　　}
　　　　return f2; // f1 执行完 立即执行f2
　　}
　　var result=f1();
　　result(); // 1000
    result(); // 1001
```
当`f1`执行完毕,环境栈被销毁，因为`f2`通过作用域链引用了`f1`的相关对象`n`，因此一直保存在内存中。

* 闭包的用途
1. 读取函数内部的变量
2. 让这些变量的值始终保持在内存中

* 闭包的三个特性：
1. 闭包可以访问当前函数以外的变量。
2. 即使外部函数已经返回，闭包仍能访问外部函数定义的变量
3. 闭包可以更新外部变量的值

<!-- 利用闭包实现发送验证码功能
```js
function sendVerCode() {
    var timer = null; // 记录定时器，用于结束后重置定时器
    var count = 5; // 记录还剩多少秒可以重试
    return timer = setInterval(() => {
        count--
        if (count == 0) {
            console.log('发送验证码')
            clearInterval(timer)
            timer = null
        }else{
            console.log(`${count}秒后重试`)
        }
    }, 1000)
}
sendVerCode()
``` -->

::: warning
1. 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，会造成网页的性能问题，需要在退出函数之前，将不使用的局部变量全部删除

2. 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。
:::


* this指向、作用域、闭包的比较：
```js
// 对象嵌套函数的this与作用域链
var name = "The Window";	
var person = {
  　name : "My Object",
  	fullName : function() {
    console.log(this.name);  // My Object
    console.log(name); // The Window  作用域链
  }
};

person.fullName()   // fullName函数是person调用的 因此this指向person
	

var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
			console.log(this.name); // The Window
            console.log(name);  // The Window
        };
    }
};

object.getNameFunc()(); 
/*
    第一次调用时，相当于把函数体赋给了object
    object.getNameFunc() == object = function(){console.log(name);};

    第二次调用的时候，相当于调用函数window.object
*/

// 闭包与作用域链

var object = {
    name : "My Object",
    getNameFunc : function(){
        var name = "My Object-Son";
        var that = this;  
        return function(){
            console.log(name)  // My Object-Son 
            console.log(that.name)  // My Object
        };
    }
};

object.getNameFunc()(); 
/*
    第一次调用时，相当于把函数体赋给了object
    object.getNameFunc() == object = unction(){console.log(that.name)};
    此时的that指向调用getNameFunc的object对象。

    第二次调用的时候，相当于调用函数window.object
    而此时因为闭包原因，that未被销毁 依旧指向object对象，所以打印object对象name属性
*/
```