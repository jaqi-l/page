## 3.5.1 基本概念
* 函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块。

* JavaScript函数语法:函数就是包裹在花括号中的代码块： 

> function 函数名()   
> {   
> &emsp;这里是要执行的代码    
> }   

* 形参(parameter)：函数定义时的变量    
* 实参(argument)：函数调用时的变量

## 3.5.2 函数的声明和调用
* 使用关键词`function`来声明函数

* 关键词`function`必须是小写的，并且必须以与函数名称相同的大小写来调用函数。

* 函数本身不会自动运行，只有当调用该函数时，才会执行函数内的代码。

* 函数可以通过其名字加上括号中的参数进行调用

* 可以在某事件发生时直接调用函数（比如当用户点击按钮时），并且可由JavaScript在任何位置进行调用。

* 在调用函数时，您可以向其传递值，这些值被称为参数。带有参数的函数也被称为有参函数。
> 设置参数的默认值
> ```js
> function fn(a = 1,b = 2){
>   console.log(a) // a的默认值是1
> }
> fn()
> ```
## 3.5.3 带有返回值的函数
* 有时，我们会希望函数将值返回调用它的地方。通过使用`return`语句就可以实现。

* 在使用`return`语句时，函数会停止执行，并返回指定的值。

* 可以将返回值赋值给一个变量，然后对变量进行操作

* 当函数遇到第一个`return`后将终止执行函数后边的语句，直接跳出函数

* 当函数没有`return`时，返回值是undefined
## 3.5.4 arguments 对象
在函数代码中，使用特殊对象`arguments`存储函数调用传递给该函数的所以参数（只能函数内部使用）。
```js
function fn(a,b,c,d){
  console.log(arguments[0]) //获取函数的第一个参数
  console.log(arguments.callee) // 获取函数本身
  console.log(arguments.length) // 获取实参个数
  console.log(fn.length) // 获取形参个数
  console.log(arguments.callee.length) // 获取形参个数
}
```
```js
var x= 20;
function fn(m,n,x){
  console.log(x);  // 3
  arguments[2]=20
  console.log(x);  // 3
}
x= fn(1,2,3);
console.log(x); // fn没有返回值 undefined
```
## 3.5.5 函数上下文与`this`关键字
面向对象语言中`this`表示当前对象的一个引用、但在`JavaScript`中`this`不是固定不变的，它会随着执行环境的改变而改变。    
通常指向该函数的“调用者“，如果是箭头函数则与"调用者的`this`“指向一致
1. 在对象中，`this`指向该方法调用的对象。     
```js
var person = {
  firstName: "John",
  lastName : "Doe",
  id: 5566,
  fullName : function() {
     console.log(this); 
  }
};

person.fullName()  // person调用fullName，所以this指向person

window.person.fullName()  // person调用fullName，所以this指向person

var i = person.fullName() // person调用fullName，所以this指向person

var j = person.fullName  // j = function(){console.log(this);}
j()    //   j调用自己，j所属对象是window，所以this指向window
```
对象嵌套案例：
```js
var a = 0
var obj1 = {
  a: 10,
  fn1: {
    a: 20,
    fn2: {
      a: 30,
      fn3: function () {
        console.log(this.a)
      }
    }
  }
}

var obj2 = {
  a: 50,
  fnA: obj1.fn1.fn2.fn3(),
  fnB: obj1.fn1.fn2.fn3
}

obj1.fn1.fn2.fn3() //  a=30 this指向fn3的调用者对象fn2

obj2.fnA //  a=30   this指向fn3的调用者fn2

// fnB=function(){console.log(this.a)} this指向fnB的调用者obj2
obj2.fnB() // this指向obj2 a=50 

// i=function(){console.log(this.a)}  i方法所属的对象是window
var i = obj1.fn1.fn2.fn3
i() // 所以this指向window a=0
```
数组：
```js
function fn1(a,b,c,d,e,f){
  console.log(arguments.callee.length) // fn1的形参个数 6
  console.log(this) // fn2的arguments数组
  console.log(this.callee.length) // fn2形参个数 8
}

function fn2(a,b,c,d,e,f,m,n){
  arguments[0](9,10,11,12,13); //fn1(9,10,11,12,13) 相当于arguments数组元素调用fn1
}

fn2(fn1,5,6,7)
```

```js
function fn1(f,a,b,c){
	arguments[0](5,8); // fn2(5,8)
}

function fn2(i,j,k,l,,m){
	console.log(this.length) // fn1的arguments数组长度(实参) 6
	console.log(this.callee.length) // fn1 形参个数 4 
	console.log(arguments.length) // fn2的实参个数 2
	console.log(arguments.callee.length) // fn2的形参个数 5
}

fn1(fn2,2,4,6,8,10)
```
2. 如果单独使用，this指向全局对象。   
```js
var x = this; // 在浏览器中指向window
```  
3. 在函数中，this指向调用它的对象。自执行函数指向window，严格模式下是undefined
```js
function a(){
    console.log(this); 
}

a();//Window
```   
4. 在箭头函数中，this继承定义时所在作用域链上一层的`this`        
* 箭头函数不会创建自己的`this`,它只会从自己的作用域链的上一层继承`this`，
* 箭头函数中的`this`在定义函数时就已经确定了不能更改，
* 箭头函数不能用`call`、`apply`方法修改里面的`this`,
```js
var a = 0
var obj2 ={
	a:10,
	fnA:() => { 
	console.log(this.a) 
	},
	b:{
		a:20,
		fnB:() => {
		console.log(this.a) 
		},
	},
	c: function() {
     return ()=>{
           console.log(this.a); 
     }
  }
}
obj2.fnA.call() // 箭头函数继承对象的this，对象的this是window a=0
obj2.b.fnB() // 0 箭头函数继承对象的this，对象和子对象的this都是window a=0
var a = 0
var obj ={
	a:10,
	fnA:() => { 
	console.log(this.a) 
	},
	b:{
		a:20,
		fnB:() => {
		console.log(this.a) 
		},
	},
	c: function() {
     return ()=>{
           console.log(this.a); 
     }
  }
}
obj.fnA.call() // 箭头函数继承对象的this，对象的this是window a=0
obj.b.fnB() // 0 箭头函数继承对象的this，对象和子对象的this都是window a=0
obj.b.fnB.apply(obj) // call apply 不能修改箭头函数的继承
obj.c()() // 10 // 箭头函数继承c的this，c的this是obj  a=10
obj2.c()() // 10 // 箭头函数继承c的this，c的this是obj2  a=10
```   
箭头函数详见[3.16.3](/frontend/javascript/ECMAScript#_3-16-3-函数扩展)    

5. 在事件中，this表示指向接收事件的DOM元素。 
```html
<button onclick="console.log(this)">this</button>  
```    

6. 在`setTimeout`、`setInterval`中，this指向window。 

7. 类似`call()`和`apply()`方法可以将this引用到任何对象。   
```js
var person1 = {
  fullName: function() {
  console.log(this); // this指向person2
  }
}

var person2 = {
  firstName:"John",
  lastName: "Doe",
}

var x = person1.fullName.call(person2);  // call的第一个参数是this的指向
``` 

8. 在回调函数中，`this`指向
* 回调函数中`this`指向回调函数调用者
* 回调函数中不能用`call`、`apply`方法修改里面的`this`,
```js
function open(callback){
    var a = 1;
    callback()    
}

var obj ={
    a:2,
    b:function () {
        open((res)=>{
            console.log(this) // obj调用open方法，this指向obj
        })
    },
    c:{
       d:() => {
        open((res)=>{
            console.log(this) //  箭头函数永远指向指向window
        })
       }
    }
}

obj.b() // {a: 2, c: {…}, b: ƒ}
obj.c.d() // Window
```

## 3.5.6 call和apply
`call`也可以调用函数,它的参数除了接受实际参数外,还可以接受一个参数代表。
```js
fn.call(obj,1,2,3,4)  // this指向call的第一个参数obj
```
`apply`与`call`基本功能相同，传参语法不同,实参需要`[]`括起。
```js
fn.apply (obj,[1,2,3,4]) // this指向apply的第一个参数obj
```
* 案例：
```js
var length = 10;

function fn(){
  alert(this.length)
}

var obj ={
  length:5,
  method:function(fn){
    alert(this===obj) // true
    fn();  // window.fn() this -> window  10
    fn.call(this);  // obj  5
    arguments[0]()  // fn()   this -> arguments  1
  }
}

obj.method(fn)
```

```js
function A(){
  this.m = 10; 
}

function B(){
  this.m = 20; 
}

A.call(B); // B.m = 10
B.call(A); // A.m = 20

var a = new A(); // 10
var b = new B(); // 20

console.log(a.m==B.m) // 10  10
console.log(b.m==A.m) // 20 20
```

```js
function getLength(){
  return this.length; 
}

function foo(){
  this.length = 1; // this == winow
  return(function(){
    var length = 2;
    return {
      length:function(a,b,c){
        return this.arr.length
      },
      arr:[1,2,3,4],
      info:function(){
        // this => {length:...,arr:...}
        // this.length => length:function(a,b,c)... 的形参 3
        return getLength.call(this.length) 
      }
    }
  })();
}

// foo() {length:...,arr:...}.info()
var x = foo().info(); 
console.log(x) // x = 3
```

## 3.5.7 函数的注释与规范

### 语法

```js
/**
 * 方法的名称
 * @description 方法的具体描述
 * @param {String} name  接受的参数类型和参数名
 * @return {String} 返回的参数类型
 * @author: jaqi.l<jaqi.l@qq.com> 
 */
function test(num) {
  console.log(num);
  return num.toUpperCase()
}
```

### 常用的符号列表

`@api`: 提供给第三方使用的接口    
`@author`: 标明作者    
`@param`: 参数    
`@return`: 返回值    
`@todo`: 待办    
`@version`: 版本号    
`@inheritdoc`: 文档继承    
`@property`: 类属性    
`@property-read`: 只读属性    
`@property-write`: 只写属性    
`@const`: 常量    
`@deprecated`: 过期方法    
`@example`: 示例    
`@final`: 标识类是终态, 禁止派生    
`@global`: 指明引用的全局变量    
`@static`: 标识类、方法、属性是静态的    
`@ignore`: 忽略    
`@internal`: 限内部使用    
`@license`: 协议    
`@link`: 链接,引用文档等    
`@see`: 与 link 类似, 可以访问内部方法或类    
`@method`: 方法    
`@package`: 命名空间    
`@since`: 从指定版本开始的变动    
`@throws`: 抛出异常    
`@uses`: 使用    
`@var`: 变量    
`@copyright`: 版权声明    