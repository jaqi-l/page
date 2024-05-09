## 3.14.1概述
### 单线程与多线程
* 单线程：所有任务都需要排队一次执行，JavaScript是单线程的语言。
* 多线程：任务可以同时进行。
### 异步与同步
* 同步：上一个任务执行完毕在执行下一个任务。
* 异步：上一个任务在等待状态时，先让下一个任务先执行，等待状态结束后在返回来执行原本的任务。

### 浏览器的线程

* 渲染线程：负责页面的渲染
* js引擎线程：负责js的解析和执行
* 定时触发器线程：处理`setInterval`和`setTimeout`
* 事件触发线程：处理DOM事件
* 异步http请求线程：处理http请求

### JavaScript的线程
JavaScript是单线程语言为解决堵塞问题，因此提出了(eventloop)消息队列模型。
* 主线程：js引擎线程。
* eventloop消息队列：一些I/O操作，定时器的计时和事件监听由浏览器的定时触发器线程完成

### eventloop消息队列

* 微队列，micro task，也叫jobs。 另一些异步任务的回调会依次进入micro task queue，等待后续被调用，这些异步任务包括：
> process.nextTick(Node)        
> Promise       
> Object.observe        
> MutationObserver

* 宏队列，macro task，也叫tasks。 一些异步任务的回调会依次进入macro task queue，等待`微队列`全部执行完毕后被调用，这些异步任务包括：
> setTimeout                
> setInterval               
> setImmediate(Node)            
> requestAnimationFrame（浏览器）            
> I/O
> UI rendering（浏览器）

![eventloop](/eventloop.jpg)
[eventloop消息队列](https://segmentfault.com/a/1190000016278115)    
[消息队列可视化工具](https://www.jsv9000.app/)
::: tip
* 宏任务可以有多个任务队列，微任务只有一个任务队列
* 微任务与宏任务执行顺序
```js
console.log('1')
setTimeout(()=>{
    console.log('settimeout')
},0)
new Promise((res)=>{
    console.log('2')
    res()
}).then(()=>{
    console.log('promise.then')
})
console.log('3')

// 1 ➡️ 2 ➡️ 3 ➡️ promise.then ➡️ settimeout

setTimeout(()=>{
    console.log('settimeout1')
    new Promise((res)=>{
    res()
    }).then(()=>{
        console.log('promise.then1')
    })
},0)
setTimeout(()=>{
    console.log('settimeout2')
    new Promise((res)=>{
    res()
    }).then(()=>{
        console.log('promise.then2')
    })
},0)
// settimeout1 ➡️ promise.then1 ➡️ settimeout2 ➡️ promise.then2

```
* 微任务、宏任务执行过程中产生的子任务，会排在队尾
```js
function a() {
    return new Promise(resolve => {
        setTimeout(() => resolve('a'), 200);
    });
}
function b() {
    return new Promise(resolve => {
        setTimeout(() => resolve('b'), 100);
    });
}
async function fn() {
   await a().then((res)=>{console.log('a')})
     b().then((res)=>{console.log('b')})
}

[1,2,3].map(()=>{
    fn()
})
//  aaa bbb 而不是abababa   所有的a任务会先进队列，后产生的b任务会排到队尾

// 通过链式调用处理
var num = 3 // 循环次数
function a() {
    return new Promise(resolve => {
        // 初始化
        console.info('resolve a');
        setTimeout(() => {
          console.log('a');
          resolve('a')
          
        }, 200);
    });
}
function b() {
    // a 初始化结束后会对then中的b方法初始化,a resolve 后执行 b
    console.info('function b');
    return new Promise(resolve => {
         // 初始化
        console.info('resolve b');
        setTimeout(() => {
            console.log('b');
            num --
            if(num>0){
                a().then(b())
            }
            resolve('b')}, 200);
    });
}
a().then(b())
//  abababa
// 微观流程 [`resolve a` ➡️ `function b` ➡️ `resolve b` ➡️ `a` ➡️ `b`] * 3

```
:::
## 3.14.2Promise
* `promise`对象代表了未来将要发生的事件，用来传递异步操作的消息。
* `promise`有三种状态,三者按顺序切换，不能跨状态切换。
> pending:初始状态，不是成功或失败状态。        
> fulfilled:意味着操作成功完成。        
> rejected:意味着操作失败。  

* 创建`promise`对象
```js
let promise = new Promise(function(resolve,reject){
    resolve("成功!");// 成功后返回的数据
    reject("失败!");// 失败后返回的数据
});
```

* `then`监听成功或失败回调
```js
promise.then(function(req){
    console.log(req) // req即resolve/reject返回的值
});
```

* `catch`监听失败回调
```js
promise.catch(function(fail){
    console.log(fail) // fail即reject返回的值
});
```

* `finally`监听失败回调
```js
promise.finally(function(fail){
    console.log(fail) // fail即reject返回的值
});
```

* `Promise.all`对多个`Promise`进行包装。

```js
var p = Promise.all([p1,p2,p3]);
p.then(function(req){
    console.log(req)
});
```
:::tip p的状态来源
1. 所有的都是完成(fulfilled)，p的状态才是完成(fulfilled)。此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
2. 有一个是失败(rejected)，p的状态就变成失败(rejected)，此时第一个失败的(rejected)实例的返回值，会传递给p的回调函数。
:::


* `Promise.race`对多个`Promise`进行包装。

```js
var p = Promise.race([p1,p2,p3]);
p.then(function(req){
    console.log(req)
});
```
:::tip p的状态来源
1. 有一个最先改变状态，p的状态就跟着改变。最先改变状态的实例就会把值传递给p的回调函数。
:::

* `Promise.allSettled`对多个`Promise`进行包装。
<span style="color: red">*</span>ES2020新增
:::tip p的状态来源
1. 不管是完成还是失败，只要所有p的状态都改变，就把值传递给p的回调函数。
:::

* `Promise.any`对多个`Promise`进行包装。
<span style="color: red">*</span>ES2021新增
:::tip p的状态来源
1. 有一个p完成，就把值传递给p的回调函数。如果都是失败，则返回失败
:::

* `Promise.try`对无论是同步还是异步的操作都进行同步操作。


* `Promise.resolve `将现有对象转为`Promise`对象
  
1. 如果`Promise.resolve`接收的的参数，不是具有then方法的对象（又称 thenable 对象），则返回一个新的Promise对象，且它的状态为fulfilled，并立即执行。
2. 如果`Promise.resolve`接收的参数是一个Promise对象的实例，则会被原封不动地返回。也会返回一个新的Promise实例，该实例的状态为rejected，Promise.`Promise.resolve`接收的参数，会被传递给实例的回调函数。

```js
var p = Promise.resolve('Hello');
p.then(function (s){
  console.log(s)// Hello
});

```

## 3.14.3async/await
* `async`异步，返回一个`Promise`对象。
* `await`等待`async`异步的`Promise`对象返回的状态。如果返回的不是`Promise`对象则立即执行后面的语句
* `await`只能写在`async`函数里面

```js
function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

async function test() {
    const v = await takeLongTime(); //等待1000 后再执行log命令
    console.log(v);
}

test();
```
:::tip async/await和promise的执行顺序
[async/await和promise的执行顺序](https://segmentfault.com/a/1190000017224799)
:::