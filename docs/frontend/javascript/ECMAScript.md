# 3.16 ECMAScript
## 3.16.1 `let`和`const`命令
`let`声明的变量不存在预解析，不存在变量提升，同一作用域不允许重复声明，只能在块内访问。     
`const`用于声明常量，值不可以改变，不存在预解析，必须初始化（直接赋值），同一作用域不允许重复声明，只能在块内访问。     
::: tip
1. 块级作用域：`if`/`else`/`for`，由`{}`包括起来的部分。
2. `const`指向的地址不可以改变，但是指向的数据结构是可以改变的。换句话说，如果`const`变量引用的是一个对象，那么修改这个对象内部的属性并不违反const的限制,可以使用`Object.freeze`冻结指向的对象。
3. `let`/`const`声明的变量不属于顶层对象的属性。
4. <span style="color: red">*</span>ES2020新增`globalThis`可以在任何环境下获取顶层对象。
5. `let`不能进行条件式声明
6. 优先使用`const`，如果需要修改值再使用`let`，不使用`var`
:::
块级作用域的优点：
```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}
// 5 5 5 5 5
```
```js
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}
// 0 1 2 3 4

// 通过闭包实现
for (var i = 0; i < 5; i++) {
  (function (index) {
    setTimeout(() => {
      console.log(index)
    }, 1000)
  })(i)
}
// 0 1 2 3 4
```
## 3.16.2 变量的解构赋值
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构
### 1. 数据的解构赋值
`=`号右侧必须是数组，根据数据顺序一一对应，如果解构不成功，变量的值就等于undefined。
> ``` js
>     let [a,b,c] = [1,2,3] // a = 1 b = 2 c = 3
>     let [foo, [[bar], baz]] = [1, [[2], 3]] // foo = 1 bar = 2 baz = 3
>     let [head, ...tail] = [1, 2, 3, 4];  // head = 1  tail = [2, 3, 4]
>     let [x, y] = [1, 2, 3];let [x, y] = [1, 2, 3]; // x =1 y = 2
> ```
> * 默认值
> ```js
>      let [x, y = 'b'] = ['a']; // 给y设置默认值 x='a', y='b'
> ```
### 2. 对象的解构赋值
`=`号右侧必须是对象，根据key一一对应，如果解构不成功，变量的值就等于undefined。
> ``` js
>    let { bar, foo } = { foo: 'aaa', bar: 'bbb' }; // bar = aaa foo = bbb
>    let { baz } = { foo: 'aaa', bar: 'bbb' };  // baz = undefined
>    let { foo: baz } = { foo: 'aaa', bar: 'bbb' }; 
> ```
>  * 默认值
> ```js
>      let {x, y = 5} = [x:1]]; // 给y设置默认值 x=1, y=5
> ```
> * 别名
> ```js
> // 给baz设置别名foo baz = aaa  
> // foo = error: foo is not defined 真正被赋值的是变量baz，而不是别名foo。
> let { foo: baz } = { foo: 'aaa', bar: 'bbb' }; 
> ```
> * 嵌套结构的对象
> ```js
> let obj = {p: ['Hello',{ y: 'World' }]};
> let { p: [x, { y }] } = obj; // x = "Hello" y =  "World"  
> // 通过别名s接收
> let { p:s, p: [x, { y }] } = obj; 
> // x = "Hello" y = "World"  
> // 第一个p是表示赋值给p, 第二个p 表示obj里面的p对象
> // p = ["Hello", {y: "World"}] s = ["Hello", {y: "World"}]
> ```
> ```js
> let obj = {p:{x:'Hello',y: 'World'}};
> let {p,p:{x,y}} = obj   // p = {x: "Hello", y: "World"}
> // 通过别名s接收
> let {p:s,p:{x,y}} = obj   // p = {x: "Hello", y: "World"} s = {x: "Hello", y: "World"}
> ```
> ::: warning
> 如果要将一个已经声明的变量用于解构赋值,需要将整个解构赋值语句，放在一个圆括号里面。
> ```js
> 
> let x;
> // 错误的写法 
> {x} = {x: 1};
> // 正确的写法
> ({x} = {x: 1});
> ```
> :::
### 3. 字符串的解构赋值
```js
    let [a, b, c, d, e] = 'hello' // a = "h" b = "e" c = "l" d = "l" e = "o"
    let {length : len} = 'hello'; // len = 5
```
### 4. 数值和布尔值的解构赋值
解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
```js
    let {toString: s} = 123;
    s === Number.prototype.toString // true
```
::: tip
数值和布尔值的包装对象都有toString属性，因此变量都能取到值。
由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
:::
### 5. 函数参数的解构赋值
> ```js
> function add([x, y]){
>   return x + y;
> }
> 
> add([1, 2]); // 3
> ```
> ```js
> [[1, 2], [3, 4]].map(([a, b]) => a + b);// [ 3, 7 ]
> ```
> * 默认值
> 1. 写法一：函数参数的默认值是空对象，但是设置了对象解构赋值的默认值
> ```js
> function move({x = 0, y = 0} = {}) {
>   return [x, y];
> }
> move({x: 3, y: 8}); // [3, 8]
> move({x: 3}); // [3, 0]
> move({}); // [0, 0]
> move(); // [0, 0]
> ```
> 2. 写法二：函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值
> ```js
> function move({x, y} = { x: 0, y: 0 }) {
>   return [x, y];
> }
> 
> move({x: 3, y: 8}); // [3, 8]
> move({x: 3}); // [3, undefined]
> move({}); // [undefined, undefined]
> move(); // [0, 0]
> ```
> * 参数默认值的位置：通常情况下，定义了默认值的参数，应该是函数的尾参数，否则不能省略默认值前面的参数。
## 3.16.3 函数扩展
###  1. `length`属性
只会返回没有设置默认值的参数的长度。
###  2. 作用域
如果设置了默认值参数，则赋值语句本事会形成一个单独的作用域。如果作用域内未定义则查找全局参数，否则提示未定义。
###  3. `rest`参数
用于获取函数的多余参数
```js
function fn(...rest) {
  return rest;  // [1,2,3,4,5]
}
fn(1,2,3,4,5)
```
###  4. 严格模式
ES6规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能设定为严格模式
```js
'use strict'; // 设置为严格模式
function doSomething(a, b = a) { // 方法内部正常模式，不能在方法内设置use strict
}
```
:::tip
1. 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为。       
2. 消除代码运行的一些不安全之处，保证代码运行的安全。      
3. 提高编译器效率，增加运行速度。      
4. 为未来新版本的Javascript做好铺垫。      
:::
###  5. `name`属性
```js
function fn(){}
var f = function fn(){}
fn.name  // fn
f.name // 匿名函数赋值给变量 ES5 => ""  ES6 => fn 
```
* 箭头函数:使用`=>`定义函数
```js
var f = v => v
//等同于
var f = function (v) {
 return v;
};
```
:::tip
1. 如果不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
2. 如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
3. 箭头函数内的`this`指向定义时所在作用域链上一层的`this`   
4. 箭头函数不可以当做构造函数，不可以使用`new`命令
5. 箭头函数不可以使用`arguments`对象
6. 箭头函数不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。
7. 给对象的属性定义方法时，不建议使用箭头函数，此时的箭头函数this指向全局。
8. 
:::
* 尾调用优化:删除调用尾调用方法的方法的调用帧，只要严格模式模式下有效。
尾调用：指某个函数的最后一步是调用另一个函数。`return`后调用另一个方法
* 尾递归优化:只保留一个调用记录，只要严格模式模式下有效。
尾递归：指某个函数的最后一步是调用函数自己。`return`后调用自己

箭头函数的作用域详见[3.5.5](/frontend/javascript/function#_3-5-5-函数上下文与this关键字)   

## 3.16.4 字符串扩展
### 1. `for...of`方法遍历字符串
> ```js
> for (let codePoint of 'foo') {console.log(codePoint)}  // "f" "o" "o"
> ```
### 2. 模板字符串
> 通过反引号包裹字符串，${}可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性还可以调用函数。
> ```js
> `Hello ${name}, how are you ${time}?`
> ```
> :::tip
> * 如果模板内字符串需要输出反引号，则序号反斜杠转译\`
> * 模板字符串内的所有空格和缩进都会保留，如果不想保留可以使用`trim`去除
> :::
### 3. 模板标签
> 把模板设置成一个方法
> ```js
> Hello([`Hello ${name}, how are you ${time}?`]) 
> // 等同于
> Hello`Hello ${name}, how are you ${time}?` 
> ```
### 4. `includes`/`startsWith`/`endsWith`
> ```js
> let s = 'Hello world!';
> s.startsWith('Hello') // true 指定字符串是否在首位
> s.endsWith('!') // true  指定字符串是否在尾部
> s.includes('o') // true  是否含有指定字符串
> ```
### 5. `repeat`
> 将原字符串重复n次,如果是小数，向下取整，不可以是负数。
> ```js
> 'x'.repeat(3) // "xxx"
> 'hello'.repeat(2) // "hellohello"
> 'na'.repeat(0) // ""
>  ```
### 6. `padStart`/`padEnd`    
> <span style="color: red">*</span>ES2017新增：`padStart`用于头部补全，`padEnd`()`用于尾部补全。第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。
> ```js
> 'x'.padStart(5, 'ab') // 'ababx' 头部用ab补全，补全后为5位
> 'x'.padEnd(5, 'ab') // 'xabab' 尾部用ab补全，补全后为5位
>  ```
> ::: tip
> * 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
> * 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
> * 如果省略第二个字符串，则默认使用空格补全。
> :::
### 7. `trimStart`/`trimEnd`
> <span style="color: red">*ES2019新增：</span>`trimStart`消除字符串头部的空格，`trimEnd`消除尾部的空格,不改变原字符串
### 8. `matchAll`
> 方法返回一个正则表达式在当前字符串的所有匹配
### 9. `replaceAll`
> <span style="color: red">*ES2021新增：</span>一次性替换所有匹配，正则必须配置全局匹配`g`。
> * `$&`匹配的字符串
> *  $`匹配结果前面的字符串
> * `$'` 匹配结果后面的字符串+
> * `$n`匹配的第N组数据，n从1开始。这个参数生效的前提是，第一个参数必须是正则表达式。
> * `$$`表示美元符号
> ```js
> // $& 表示匹配的字符串，即`b`本身
> 'abbc'.replaceAll('b', '$&') // abbc
> // $` 表示匹配结果之前的字符串
> // 对于第一个`b`，$` 指代`a`
> // 对于第二个`b`，$` 指代`ab`
> 'abbc'.replaceAll('b', '$`') // 'aaabc'
> // $' 表示匹配结果之后的字符串
> // 对于第一个`b`，$' 指代`bc`
> // 对于第二个`b`，$' 指代`c`
> 'abbc'.replaceAll('b', `$'`) // 'abccc'
> // $1 表示正则表达式的第一个组匹配，指代`ab`
> // $2 表示正则表达式的第二个组匹配，指代`bc`
> 'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')// 'bcab'
> // $$ 指代 $
> 'abc'.replaceAll('b', '$$')// 'a$c'
> ```
## 3.16.5 数值扩展
### 1. `isFinite`/`isNaN`
>  Number.isFinite()检测数值是否有限，Number.isNaN检测数值是否为NaN
### 2. `parseInt`/`parseFloat`
* `parseInt`
```js
  let num1 = parseInt("1234blue");     // 1234
  let num2 = parseInt("");             // NaN
  let num3 = parseInt("0xA");          // 10，解释为十六进制整数
  let num4 = parseInt(22.5);           // 22
  let num5 = parseInt("70");           // 70，解释为十进制值
  let num6 = parseInt("0xf");          // 15，解释为十六进制整数
  let num7 = parseInt("0xAF", 16);     // 175 16为设置的进制数
  let num8 = parseInt("AF", 18);       // 195 18 进制
  let num9 = parseInt("12",3);         // 5 3进制
```
* `parseFloat`
```js
 let num1 = parseFloat("1234blue");    // 1234，按整数解析
  let num2 = parseFloat("0xA");        // 0
  let num3 = parseFloat("22.5");       // 22.5
  let num4 = parseFloat("22.34.5");    // 22.34
  let num5 = parseFloat("0908.5");     // 908.5
  let num6 = parseFloat("3.125e7");    // 31250000
```
### 3. `isInteger`
> 判断是否为整数
### 4. `EPSILON`
> 生成一个极小的常量，常用语设置误差范围
## 3.16.6 Math扩展
### 1. `Math`去除小数部分
### 2. `sign`判断一个数的底数
### 3. `cbrt`计算一个数的立方根
### 4. `cbrt`计算所有参数的平方和的平方根
## 3.16.7 数组扩展
### 1. 扩展运算符`...`
将一个数组转为用逗号分隔的参数序列
> * 数组合并
>```js
> arr1.push(...arr2);// push方法的参数不可以是数组，所以通过扩展运算符拆分在参数序列插入arr1数组
>```
> * 深拷贝
>```js
> arr1 = (...arr2);
>```
> * 配合解构赋值
>```js
> const [first, ...rest] = [1, 2, 3, 4, 5]; //  first = 1    rest = [2, 3, 4, 5] 
>```
> * 字符串转数组
>```js
> [...'hello']// 字符串转数组 [ "h", "e", "l", "l", "o" ]
>```
> * 遍历器（Iterator）转数组
>```js
> let nodeList = document.querySelectorAll('div');
> let array = [...nodeList];
>```
> * Map 和 Set 结构，Generator 函数
### 2. `from`   
> 将类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
> ```js
> const list = document.querySelectorAll("li");
> Array.from(list).map((item) => item);
> ```
### 3. `of`
> 将一组值，转换为数组
> ```js
> Array.of(3, 11, 8) // [3,11,8]
> ```
### 4. `copyWithin`
> 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
> ```js
> [1, 2, 3, 4, 5].copyWithin(0, 3) // [4, 5, 3, 4, 5]
> ```
> 第一个参数：从该位置开始替换数据。如果为负值，表示倒数。
> 第二个参数：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
> 第三个参数：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

### 5. `find`/`findIndex`/`findLast`/`findLastIndex`
* `find`/`findIndex`找出第一个符合条件的数组成员。`find`返回找到的第一个元素，`findIndex`返回找到的第一个元素的索引
* `findLast`/`findLastIndex`(<span style="color: red">*</span>ES2023新增),其他与`find`/`findIndex`一致
```js
  [21,20,1,2,3,4,5,10,11].find(item => item>10) // 20 找到大于10的数,从前往后遍历

   [1,2,3,4,5,6,7,8,9,10,11].findLast(item => item>10) // 11 找到大于10的数,从后往前遍历
```

### 6. `fill`
> 使用给定值填充数组,第一个参数是要填充的值，第二个参数是起始位置，第三个参数是结束位置
> ```js
> ['a', 'b', 'c'].fill(7)  // [7, 7, 7]
> new Array(3).fill(7)  // [7, 7, 7]
> ['a', 'b', 'c'].fill(7, 1, 2)  // ['a', 7, 'c']
> ```
### 7.  `entries`/`keys`/`values`
> 用于遍历数组。它们都返回一个遍历器对象（Iterator），可以用`for...of`循环进行遍历，唯一的区别是`keys`是对键名的遍历、`values`是对键值的遍历，`entries`是对键值对的遍历。 
> ```js
>for (let index of ['a', 'b'].keys()) {
>  console.log(index);// 0  1
>}
>
>for (let elem of ['a', 'b'].values()) {
>  console.log(elem);// 'a'  'b'
>}
>
>for (let [index, elem] of ['a', 'b'].entries()) {
>  console.log(index, elem);// 0 "a"  1 "b"
>}
> ```
### 8. `includes`
> 表示某个数组是否包含给定的值，与字符串的indexof方法类似.第一个参数是给定的值，第二个参数是起始位置，负数倒序。
```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```
### 9. `flat`/`flatMap`
> `flat`将嵌套的数组“拉平”,参数表示拉平的层数，默认为1，Infinity表示全部拉平。    
> `flatMap`对原数组的每个成员执行一个函数.并返回一个新的拉平数组，但是只能“拉平”一层。    
> ```js
> [1, 2, [3, 4]].flat() // [1, 2, 3, 4]
> [1, 2, 3, 4].flatMap(x => [[x * 2]])  // [[2], [4], [6], [8]]
> ```

### 9. `at`
> 根据索引获取数组的值，支持负数(倒序)
> ```js
> [1, 2, 3, 4].at(-1) // 4
> [1, 2, 3, 4].at(-2) // 3
> ```

### 10. `with`<span style="color: red">*</span>ES2023新增
允许您基于索引修改单个元素，并返回一个新的数组
> ```js
> const arr = ["I", "am", "the", "Walrus"];
> // 用 "Ape Man" 替换字符串 "Walrus"。
> const newArr = arr.with(3, "Ape Man");
> console.log(newArr);
> ```

## 3.16.8 对象扩展
### 1. 属性的简洁表示法
> ```js
> const baz = {foo};// 等同于   baz = {foo: foo};
> ```
### 2. 属性名表达式
>```js
>obj['a' + 'bc'] = 123;  // obj.abc = 123
> ```
### 3. `name`属性
> 对象也是方法，`name`属性返回方法名。如果对象的方法使用了取值函数（getter）和存值函数（setter），在`name`前加`get`和`set`
### 4. 可枚举性
> 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。`getOwnPropertyDescriptor`方法可以获取该属性的描述对象。
> ```js
> let obj = { foo: 123 };
> console.log(Object.getOwnPropertyDescriptor(obj, 'foo'))
> // 修改foo的值和枚举类型
> Object.defineProperties(obj, {
>   foo: {
>     value: 456,
>     enumerable: false
>   }
> });
> 
> console.log(Object.getOwnPropertyDescriptor(obj, 'foo'))
> ```
> 描述对象的enumerable属性，称为“可枚举性”，如果该属性为false，就表示某些操作会忽略当前属性。
> 目前，有四个操作会忽略enumerable为false的属性。
>> `for/in`：只遍历对象自身的和继承的可枚举的属性。
>> `Object.keys`：返回对象自身的所有可枚举的属性的键名。
>> `JSON.stringify`：只串行化对象自身的可枚举的属性。
>> `Object.assign`： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
> 这四个操作之中，前三个是 ES5 就有的，最后一个`Object.assign`是 ES6 新增的。其中，只有`for/in`会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。实际上，引入“可枚举”（enumerable）这个概念的最初目的，就是让某些属性可以规避掉`for/in`操作，不然所有内部属性和方法都会被遍历到。比如，对象原型的toString方法，以及数组的length属性，就通过“可枚举性”，从而避免被for...in遍历到。
### 5. 属性的遍历
> * `for/in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
> * `Object.keys(obj)`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
> * `Object.getOwnPropertyNames(obj)`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
> * `Object.getOwnPropertySymbols(obj)`返回一个数组，包含对象自身的所有 Symbol 属性的键名。
> * `Reflect.ownKeys(obj)`返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或> 字符串，也不管是否可枚举。
> ::: tip
>   首先遍历所有数值键，按照数值升序排列。
>   其次遍历所有字符串键，按照加入时间升序排列。
>   最后遍历所有 Symbol 键，按照加入时间升序排列。
> :::
### 6. `super`关键字
指向当前对象的原型对象,只能用在对象方法之中。
```js
onst proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```
JavaScript引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。

const proto = {
```js

const obj = {
  foo: super.foo // 报错 super用在了属性里
}

const obj = {
  foo: () => super.foo // 报错 super用在了函数里
}

const obj = {
  foo: function () {
    return super.foo // 报错 super用在了函数里
  }
}
```
### 7. 对象的扩展运算符 详见数组的扩展
### 8. `?.`链判断运算符
> <span style="color: red">*</span>ES2020新增：`?.`链判断运算符
> 如果读取对象内部的某个属性，往往需要判断一下该对象是否存在。比如，要读取message.body.user.firstName，安全的写法是写成下面这样。
> ```js
> // 错误的写法
> const  firstName = message.body.user.firstName;
> 
> // 正确的写法
> const firstName = (message
>   && message.body
>   && message.body.user
>   && message.body.user.firstName) || 'default';
>  // 使用链判断运算符写法
>  const firstName = message?.body?.user?.firstName || 'default';
> ```
### 9. `??`Null判断运算符
> <span style="color: red">*</span>ES2020新增：`??`Null判断运算符
> ```js
> // 如果firstName的值是false或0，default会生效
>  const firstName = message?.body?.user?.firstName || 'default';  
> // firstName的值是null或undefined，default才会生效
> const firstName = message?.body?.user?.firstName ?? 'default';  
> ```
### 10. `Object.is`
> 判断是否同值相等
> ```js
> Object.is('foo', 'foo') // true
> Object.is({}, {}) // false
> Object.is(+0, -0) // false
> Object.is(NaN, NaN) // true
> ```
### 11. `Object.assign`
> 将源对象的所有可枚举属性属性合并。
> ```js
> Object.assign(source1,source2,source3);
> ```
> :::warning
> 如果属性同名则后面的覆盖前面的,因此嵌套对象会执行覆盖而不是插入，因此不能处理嵌套对象。
> 该方法为浅拷贝。
> :::
### 12. `Object.getOwnPropertyDescriptors`
> ES5：`getOwnPropertyDescriptor`返回某个对象属性的描述对象。   
> <span style="color: red">*</span>ES2017：`getOwnPropertyDescriptors`返回指定对象所有自身属性（非继承属性）的描述对象。   
> 该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。Object。assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。 
### 13. ` __proto__`属性和`Object.setPrototypeOf`/`Object.getPrototypeOf`方法
> ` __proto__`属性：用来读取或设置当前对象的原型对象。出于兼容性考虑建议使用一下方法操作原型对象。    
> `Object.setPrototypeOf`方法用于设置一个对象的原型对象，返回参数对象本身。   
> `Object.setPrototypeOf`方法用于读取一个对象的原型对象。   
### 14.  `Object.keys`/`Object.values`/`Object.entries`/`Object.fromEntries`
> `Object.keys`返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。   
> <span style="color: red">*</span>ES2017：`Object.values`返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。   
> `Object.entries`返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。    
> ```js
> var obj = { foo: 'bar', baz: 42 };
> Object.keys(obj) // ["foo", "baz"]
> Object.values(obj) // ["bar", 42]  
> Object.entries(obj) // [ ["foo", "bar"], ["baz", 42] ]
> ```
> `Object.fromEntries`是`Object.entries`的逆操作，用于将一个键值对数组转为对象。
> ```js
> Object.fromEntries([
>   ['foo', 'bar'],
>   ['baz', 42]
> ])
> // { foo: "bar", baz: 42 }
> ```
### 15. `groupBy`<span style="color: red">*</span>ES2024新增
允许您基于指定的属性，进行分组，并返回一个新的数组
> ```js
> const inventory = [
>    { name: "芦笋", type: "蔬菜", quantity: 5 },
>    { name: "香蕉", type: "水果", quantity: 0 },
>    { name: "山羊", type: "肉", quantity: 23 },
>    { name: "樱桃", type: "水果", quantity: 5 }
> ];
> 
> console.log(Object.groupBy(inventory, (item) => item.type))
> ```

## 3.16.9 Symbol
ES5的对象属性名都是字符串，这容易造成属性名的冲突。   
ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。   
`Symbol`值通过`Symbol`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的`Symbol`类型。凡是属性名属于`Symbol`类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

1. 如果不加参数，它们在控制台的输出都是Symbol()
2. Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。
```js
// 没有参数的情况
let s1 = Symbol(); // s1 = Symbol()
let s2 = Symbol(); // s2 = Symbol()

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo'); // s1 = Symbol(foo)
let s2 = Symbol('foo'); //  s2 = Symbol(foo)

s1 === s2 // false
```
3. Symbol值不能与其他类型的值进行运算,但是，Symbol值可以显式转为字符串也可以转为布尔值，但是不能转为数值
```js
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```

### `Symbol`的方法
1. `for`：全局符号注册表
```js
let fooGlobalSymbol = Symbol.for('foo');         // 创建新符号
let otherFooGlobalSymbol = Symbol.for('foo');   // 重用已有符号
console.log(fooGlobalSymbol === otherFooGlobalSymbol);   // true

// 即使采用相同的符号描述，在全局注册表中定义的符号跟使用Symbol()定义的符号也并不等同
let localSymbol = Symbol('foo');
console.log(localSymbol === globalSymbol); // false
```

2. `keyfor`：查询全局注册表
```js
 // 创建全局符号
let s = Symbol.for('foo');
console.log(Symbol.keyFor(s));    // foo
// 创建普通符号
let s2 = Symbol('bar');
console.log(Symbol.keyFor(s2));   // undefined
```
3. `isConcatSpreadable`
4. `toPrimitive`
5. `species`
6. `iterator`
7. `hasInstance`
8. `toStringTag`
9.  `asyncIterator`

### `Symbol`的常见应用
1. 解决属性名称冲突、私有属性
```js
const PRIVATE_KEY = Symbol('value');

const obj = {
  "value":"value",
  [PRIVATE_KEY]: 'only value', // 创建唯一（私有）属性
};

console.log(obj); // {value: 'value', Symbol(value): 'only value'}
console.log(obj[PRIVATE_KEY]); // only value 只能通过PRIVATE_KEY访问
```

## 3.16.10 Set与Map

### Set
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

set方法:
> `add`:添加某个值，返回Set对象本身   
> `clear`:删除所有的键/值对，没有返回值   
> `delete`:删除某个键，返回true。如果删除失败，返回false    
> `forEach`:对每个元素执行指定操作    
> `has`:返回一个布尔值，表示某个键是否在当前 Set 对象之中   


1. 用来数组，字符串去重
```js
let array = [1, 2, 3, 4, 5, 5, 5, 5]
[...new Set(array)]
let string = "1234555555"
[...new Set(string)].join('')
```

2. 用来数组，字符串并集
```js
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var union = new Set([...a, ...b]); // {1, 2, 3, 4}
```

3. 用来数组，字符串交集
```js
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var intersect = new Set([...a].filter(x => b.has(x))); // {2, 3}
```

4. 用来数组，字符串差集
```js
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var difference = new Set([...a].filter(x => !b.has(x))); // {1}
```

### Map
Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应
1. `size`返回总成员数
2. `has`判断是否有该成员，成功返回true
3. `get`返回该成员的值，没有对应成员，返回undefined。
4. `delete`删除该成员，成功返回true
5. `clear`清空所有成员
```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2 
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

## 3.16.11 proxy
Proxy可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

Proxy接受两个参数：第一个参数是所要代理的目标对象，第二个参数是一个配置对象用于拦截对应的操作,实例如下。
### 1. `get`拦截对象属性的读取、`set`拦截对象属性的设置。
```js
var obj = new Proxy({}, {
  get: function () {
    console.log('get')
    return 
  },
  set: function () {
    console.log('set')
    return 'set'
  }
});

obj.title  //   console.log('get')
obj.title = 'jaqi'  //   console.log('set')
```
### 2. `deleteProperty`拦截delete操作
```js
var obj = new Proxy({}, {
  deleteProperty: function () {
    console.log('deleteProperty')
    return true
  }
});
obj.name = 'jaqi'
delete obj.name //  console.log('deleteProperty')
```
### 3. `has`判断对象是否具有某个属性，拦截`hasProperty`操作

### 4. `construct`拦截new命令
### 5. `defineProperty`模拟ES5的`Object.defineProperty()`操作
```js
var obj = new Proxy({}, {
  defineProperty: function () {
    console.log('defineProperty')
    return true
  }
});
// 触发 console.log('defineProperty')
Object.defineProperty(obj, 'name', {
   value: 'jaqi',
   writable: true // 是否可以改变
})
obj.name // jaqi
obj.name = 'root' // writable为true 时 可以修改 root 
```
::: tip
  ES6的`Proxy`与ES5`Object.defineProperty()`的对比：
  1. `Proxy`可以直接监听整个对象而非属性，`Object.defineProperty()`监听不到对象新增或删除属性。
  2. `Proxy`可以直接监听数组的变化，`Object.defineProperty()`监听不到数组通过下标进行修改。
  3. `Proxy`有13种拦截方法
  4. `Proxy`不兼容IE
:::  
## 3.16.12 `Reflect`
 
`Reflect`提供一组能操作`Object`语言内部基本方法的对象

::: tip
1. 我们通常使用的基于`Reflect`，经过封装的语法糖形式来调用这些基本方法。这些语法糖是语言本身提供的便捷语法或由开发人员创建的封装函数
2. 未来所有的内部方法都将只能通过`Reflect`对象获取
>```js
> // 老写法
> Object.defineProperty(target, property, attributes);
> 
> // 新写法
> Reflect.defineProperty(target, property, attributes);
> ```
:::


### 静态方法
1. `Reflect.apply(target, thisArg, args)`：类似于`Function.prototype.apply.call(func, thisArg, args)`    
2. `Reflect.construct(target, args)`：类似于`new target(...args)`   
3. `Reflect.get(target, name, receiver)`：类似于`target[name]`    
4. `Reflect.set(target, name, value, receiver)`：类似于`target[name] = value`   
5. `Reflect.defineProperty(target, name, desc)`：类似与`Object.defineProperty(target, property, attributes)`
6. `Reflect.deleteProperty(target, name)`：类似于`delete obj[name]`   
7. `Reflect.has(target, name)`：类似于`name in obj`   
8. `Reflect.ownKeys(target)`：类似于`Object.getOwnPropertyNames`与`Object.getOwnPropertySymbols`
9. `Reflect.isExtensible(target)`：类似于`Object.isExtensible`返回布尔值，表示对象是否可扩展
10. `Reflect.preventExtensions(target)`：类似于`Object.preventExtensions`让对象变为不可扩展。它返回布尔值，表示是否成功
11. `Reflect.getOwnPropertyDescriptor(target, name)`：类似于`Object.getOwnPropertyDescriptor`用于得到指定属性的描述对象
12. `Reflect.getPrototypeOf(target)`：类似于`Object.getPrototypeOf(obj)`用于读取对象的`__proto__`属性
13. `Reflect.setPrototypeOf(target, prototype)`：`Object.setPrototypeOf(obj, newProto)`用于设置目标对象的原型（`prototype`）返回布尔值，表示是否成功    

### 使用语言内部基本方法的意义

1. 灵活修改`this`的指向
```js
let obj = {
    a:1,
    b:2,
    get c(){
        console.log(this) 
        return this.a + this.b 
    }
}

// 3 this 指向 obj 本身 {a: 1, b: 2}
console.log(obj.c) 

// 7 this 指向 {a: 3, b: 4}
console.log(Reflect.get(obj,'c',{a:3,b:4}))
```

```js
let obj = {
    a:1,
    b:2,
    get c(){
        console.log(this)
        return this.a + this.b
    }
}
const p = new Proxy(obj,{
    get(target,key, recevier) {
        // return target[key]   此时 this 指向原始的obj对象 {a: 1, b: 2}
        return Reflect.get(target,key, recevier) //  此时 this 指向代理后的obj对象  Proxy(Object) {a: 1, b: 2}
    }
})

// 返回都是3，但是 this 指向不同，导致无法触发代理方法
console.log(p.c)
```

1. 遍历对象，包括`key`为`Symbol`类型的的(不包含不可枚举类型)
```js
const d = Symbol('d')
let obj = {
    a:1,
    b:2,
    [Symbol('c')]:3,
    [d]:4
}

console.log(Object.keys(obj)) //  ['a', 'b']
console.log(Reflect.ownKeys(obj)) // ['a', 'b', Symbol(c), Symbol(d)]

// 传统Symbol('d')值方法
console.log(obj[d]) // 4
```

## 3.16.13 Promise
`Promise`详见[3.14.2](/frontend/javascript/sync_asyn#_3-14-2promise)

## 3.16.14 Iterator和`for...of`循环
JavaScript原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。为了统一接口机制，来处理不同的数据结构，因此提出了遍历器（Iterator）为各种不同的数据结构提供统一的访问机制。以及新的遍历命令`for...of`
## 3.16.15 Iterator
* Iterator 的遍历过程:
> 1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
> 2. 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。
> 3. 第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。
> 4. 不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。
* `next`方法返回两个对象，当前指向的成员值value和该成员是否被遍历过done
* 原生具备 Iterator 接口的数据结构如下。
> Array   
> Map   
> Set 
> String      
> TypedArray    
> 函数的 arguments 对象   
> NodeList 对象   

## 3.16.16 `for...of`
一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以用for...of循环遍历它的成员。

## 3.16.17 Generator 
Generator函数特征
1. function关键字与函数名之间有一个星号。
2. 函数体内部使用yield表达式，定义不同的内部状态，遇到yield会暂停执行。
3. `next`恢复暂停，向下执行。返回value表达式的值，done是否完成遍历。
```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()// { value: 'hello', done: false }
hw.next() // { value: 'world', done: false }
hw.next() // { value: 'ending', done: true }
hw.next() // { value: undefined, done: true }

```
* next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
```js
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```
如果next方法没有参数，每次运行到yield表达式，变量reset的值总是undefined。当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。

* throw在函数体外抛出错误，然后在Generator函数体内捕获
```js
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

* return返回给定的值，并且终结遍历Generator函数。
```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

## 3.16.18 async 
<span style="color: red">*</span>ES2017新增`async`，它就是Generator函数的语法糖。

* 相对于Generator的改进：   
1. 内置执行器：Generator函数的执行必须靠执行器，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
2. 更好的语义：async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
3. 更广的适用性：yield命令后面只能是Thunk函数或Promise对象，而async函数的await命令后面，可以是Promise对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即resolved的Promise对象）。
4. 返回值是Promise：async函数的返回值是Promise对象，可以用then方法指定下一步的操作。

async/await详见[3.14.3](/frontend/javascript/sync_asyn#_3-14-3async-await)

## 3.16.19 Class
为了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。
ES写法：
```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.total = function () {
  return this.x + this.y;
};
Point.prototype.description = '求和';

var p = new Point(1,2);
p.Description // '求和'
p.total() // 3 
```
ES6 class写法：
```js
class Point {
  // 构造函数
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  // prototype方法
  total() {
    return this.x+this.y;
  }
}
 Object.assign(Point.prototype, {
	Description : '求和',
});
var p = new Point(1,2);
p.Description // '求和'
p.total() // 3 
```
:::tip
1. 类名不能重复
2. 类定义不会被提升，需要在访问前定义
:::
`prototype`详见[3.15.3](/frontend/javascript/oop#_5、prototype模式)

## 3.16.20 ES6 Module
`CommonJS`、`AMD`和`ES6 Module`规范的区别： 

| 名称 |  使用场景 | 加载方式 | 加载方式 | 模块规范| 
| -------- | -------- | -------- | -------- | -------- |
| `CommonJS`  | 服务器 | 同步  | 运行时 | NodeJS| 
| `AMD`  | 浏览器 | 异步  | 运行时（预先执行） | RequireJS | 
| `CMD`  | 浏览器 | 异步  | 运行时（按需执行） | SeaJS|  | 
| `ES6 Module`  | 通用 | 异步  | 编译时确认依赖关系，运行时按需动态引用 | 原生JS |

::: tip
* `ES6 Module`模块输出的是实时的动态数据，是值的引用，而`CommonJS`输出的是缓存的值，是一个值的拷贝。   
* `CommonJS`加载的是一个对象该对象只有在脚本运行完才会生成。而`ES6 Module`模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
* `CommonJS`详见[7.1.7](/other/node/introduction#_7-1-7-模块系统) 
:::

`ES6 Module`主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。
### `export`
一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。`export`命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错。    

`export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
* `export`的写法
```js
// 报错
export 1;

// 报错
var m = 1;
export m;

// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三 通过as关键字设置别名
var n = 1;
export {n as m}; 
```

* 输出`function`和`class`的写法
```js
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```

批量输出
```js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// 另一种写法
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

### `import`
使用`export`命令定义了模块的对外接口以后,就可以通过`import`命令加载这个模块。`import`命令是一个只读接口，虽然输出对象时可以修改但不建议。

```js
import { firstName, lastName, year } from './profile.js';

// 通过as关键字设置别名
import { lastName as surname } from './profile.js';

// 整体加载
import *as profile from './profile.js';

// 整体加载的使用
profile.firstName
profile.lastName
profile.year

```
<span style="color: red">*</span>ES2020提案`import`支持动态加载模块,返回一个promise 。
```js
import(specifier) //specifier 表示变量
```
按需加载:只有用户点击了按钮，才会加载这个模块。
```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
  })
});
```
::: warning 动态引入模块：import和export命令只能在模块的顶层，不能在代码块之中调用
```js

// 错误写法
if (x === 1) {
  import 'module1';
} else {
  import 'module2';
}

// 正确写法
if (x === 1) {
 import('module1.js').then((MyModual)=>{
    new MyModual();
  })
} else {
  import('module2.css').then((module2)=>{
    module2;  // 引入css文件的写法
  })
}


// CommonJS写法 
// 该方法不能引入css文件的写法。
if (x === 1) {
  require('module1.js');
} else {
  require('module2.js');
}

```
:::
### `export default`
使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

* 输出匿名函数
```js
export default function () {
  console.log('foo');
}
// 使用默认输出时，变量不需要大括号
import customName from './export-default';
customName(); // 'foo'
```

* 输出非匿名函数
```js
export default function foo() {
  console.log('foo');
}
// 另一种写法
function foo() {
  console.log('foo');
}

export default foo;
// 等同于  
export {foo as default};
```

`export default`命令的本质是将后面的值，赋给default变量，所以它后面不能跟变量声明语句。
```js
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;

// 正确
export default 42;

// 报错
export 42;

```

### `export`与`import`的复合写法
先输入后输出同一个模块。    
需要注意的是，写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。
```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

### 模块的继承
输出circle模块的所有属性和方法,但会忽略circle模块里的默认方法，然后有输出e和默认方法。
```js
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
```


### 跨模块常量
const声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。
```js
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

### Module的加载实现
* 传统方法
`defer`是“渲染完再执行”，`async`是“下载完就执行”。
```js
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```
* ES6加载
要加入`type="module"`属性。属于异步加载，等同于`defer`。
```js
<script type="module" src="./foo.js"></script>
// 另一种写法
<script type="module">
  import foo from "./foo.js";
</script>
```


::: tip 参考文档
[阮一峰 ECMAScript](https://es6.ruanyifeng.com/)
:::
