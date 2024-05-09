## 3.17.1 概述
`TypeScript`是微软开发的一个开源的编程语言，通过在`JavaScript`的基础上添加静态类型定义构建而成。    
`TypeScript`通过`TypeScript`编译器或`Babel`转译为`JavaScript`代码，可运行在任何浏览器，任何操作系统。

[阮一峰 TypeScript教程](https://wangdoc.com/typescript/)

### 强类型与弱类型语言
按变量类型划分
* 强类型语言（不允许改变变量的数据类型，错误后不能继续执行）
* 弱类型（变量可以被赋予不同的值）
### 静态类型与动态类型语言
按运行时状态划分
* 静态类型语言（在编译阶段确定所有变量的类型）
> 1. 对数据类型极度严格
> 2. 可以立即发现错误
> 3. 运行时性能好
> 4. 可读性好
* 动态类型语言（在执行阶段确定所有变量的类型）
> 1. 对数据类型非常宽松
> 2. 错误不易被发现
> 3. 运行时性能差
> 4. 可读性差

### 编译器的安装与使用

#### `typescript`编译器
* 安装编译器
```zsh
npm install typescript  -g
```
* 初始化配置项`tsconfig.json`
```zsh
tsc --init
```
* 编译
```zsh
tsc index.ts
```
* 运行编译后文件
```zsh
node index.js
```

#### `ts-node`动态编译器
`ts-node`不会生成编译文件,而且是在运行时直接转移
* 安装编译器
```zsh
npm install ts-node  -g
```
运行ts文件
```zsh
ts-node index.ts
```

#### [在线编译工具](https://www.typescriptlang.org/zh/play?#code/DYUwLgBAhhBcDOYBOBLAdgcwgXggcgAsRhgB7AdwjAE8AHEeAY1VrDyA)

### 类型注解
语法：(变量/函数):数据类型     
作用：相当于强类型语言中的类型声明

```ts
let num: number = 123
```

### 类型声明文件
类型声明文件：用来为已存在的JS库提供类型信息(对已经编译的js文件保留类型保护)。

#### `ts`文件与类型声明文件的区别：  
* `.ts`文件：
> 1. 既包含类型信息又可执行的代码 
> 2. 可以被编译为.js文件。然后执行代码
> 3. 用途是编写程序代码的地方  

* `.d.ts`文件：
> 1. 只包含类型信息的类型声明文件
> 2. 不会生成.js文件。仅用于提供类型信息
> 3. 用途是为js提供类型信息 

#### 类型声明文件的来源：    
1. 库自带   
2. 通过`DefinitelyTyped`(提供常用库的类型声明文件)，下载类型声明文件：`npm install @type/*`   
3. 创建自己的类型声明文件

#### 创建自己的类型声明文件
* 为`ts`文件创建类型声明文件
> 1. 创建`index.d.ts`声明文件   
> 2. 创建需要共享的类型,并使用`export`导出    
> 3. 在需要使用共享类型的`.ts`文件中，通过`import`导入（文件后缀，可以省略）  

* 为`js`文件创建类型声明文件 
> 1. 创建`index.d.ts`声明文件   
> 2. 使用`declare`为`.js`已有的变量声明类型（`type`、`interface`等不需要使用`declare`）
> 3. 使用`export`导出   
> 4. `.js`文件通过`import`导入

`index.d.ts`声明文件   
```ts
declare let count: number

interface Ponit {
  x: number
  y: number
}
declare let position: Ponit

declare function add(x: number, y: number): number

declare function changeDirection(direction: 'up' | 'right' | 'down' | 'left'): void

type FomartPoint = (point: Ponit) => void
declare const fomartPoint: FomartPoint

export { count, position, add, changeDirection, fomartPoint }
```

`index.js`
```js
import { count, position, add, changeDirection, fomartPoint } from './index'

let count = 0

let position = {
  x: 0,
  y: 0
}

function add(x, y) {
  return x + y
}

function changeDirection(direction) {
  console.log(direction)
}

const fomartPoint = point => {
  console.log(point)
}
```

::: tip
1. 类型声明文件的名称不要与`ts`、`js`文件重名
:::

## 3.17.2 数据类型

### 基本类型

* Number
```ts
let x:number = 123;
let y:number = 3.14;
let z:number = 0xffff;
```

* bigint<span style="color: red">*</span>ES2020新增
```ts
// 大整数类型
let x:bigint = 123n;
let y:bigint = 0xffffn;
```

* String
```ts
let str: string = '123'
```

* Boolean
```ts
let bool: boolean = true
```

* Null
```ts
let nul: null = null
```

* Undefined
```ts
let under: undefined = undefined
```

* Symbol
```ts
let s1: symbol = Symbol()
```

::: tip
1. `undefined`和`null`既是值，又是类型，是任何类型的子类型   
2. `strictNullChecks`开启严格检查，使`undefined`和`null`不能赋值给其他类型的变量（除了`any`类型和`unknown`类型）    
```ts
const obj:object = undefined;
obj.toString() // 编译不报错，运行就报错
// tsc --strictNullChecks app.ts

let age:number = 24;

age = null;      // 报错
age = undefined; // 报错
```
:::

### 对象类型

* Object
```ts
let obj: {
  x: number,
  y: number,
  z: string,
  sayHi(name: string): string
} = {
  x: 1,
  y: 2,
  z: '3',
  sayHi(name) { return 'Hi ' + name } 
}

console.log(obj.sayHi('Jaqi')); //  Hi Jaqi

let obj: { x: number, y?: number, } = { x: 1 } // ?表示该参数y是可选参数

// 类型声明对象的 key 为变量的类型
const dynamic: { [key:string] : { x: number,y: number, z: string}}  = {"a":{x:1,y:2,z:"3"},"b":{x:1,y:2,z:"3"} };
```

* Array
```ts
let arr1: number[] = [1, 2, 3] // 推荐写法
let arr2: Array<number> = [1, 2, 3]

let arr1: string[] = ['1', '2', '3'] // 推荐写法
let arr2: Array<string> = ['1', '2', '3', '4']
```

* Function   
实际上是为函数的参数和返回值设置类型
```ts
function add(x: number, y: number): number { return x + y }

let add = (x: number, y: number): number => { return x + y }

const add: (x: number, y: number) => number = (x, y) => {return x + y}

// 如果函数没有返回值
let add = (x: number, y: number): void => { console.log(x + y); }

// y可选参数，可传可不传（必须在参数列表的最后面，可选参数的后面不能再有必选参数）
let add = (x: number, y?: number): number => { return x }
```
### void 
表示没有任何返回值
### any

任意类型，永远不会有返回值的类型（除非遇到异常、死循环）

::: warning
  1. 原则上不推荐使用any，这会让`TypeScript`失去类型保护
  2. 污染问题
  > ```ts
  > let x:any = 'hello';
  > let y:number;
  > 
  > y = x; // 不报错  x的类型被y 继承
  > 
  > y * 123 // 不报错
  > y.toFixed() // 不报错
  > ```
:::

### unknown

同`any`表示任意类型，但是使用更严格，`unknown`类型的变量，不能直接赋值给其他类型的变量（除了`any`类型和`unknown`类型）,因此解决了`any`污染问题


### never

`never`代表从不会出现的值，是任何类型的子类型，也就是说`never`可以赋值给任何类型。常用于函数表示不会有返回值。

### 值类型

单个值也是一种类型，称为“值类型”。它只能赋值为这个字符串，赋值为其他字符串就会报错    

```ts
let x:'hello';

x = 'hello'; // 正确
x = 'world'; // 报错
```
### 元祖

* 元祖类型是特殊的数组类型
* 元祖可以明确的限制每个元素的类型和元素个数
* 数组类型只能限制数组成员的类型，不能显示成员的数量

```ts
let tuple: [number, string] = [0, '1']
```

### 枚举

定义一个类型的可选值，与字面量有相同效果

#### 枚举类型

```ts
enum Direction { up, down, left, right }

function changeDirection(direction: Direction) {
  console.log(direction);
}

changeDirection(Direction.up) // 访问枚举成员 0
```

* 指定枚举成员的值
```ts
enum Role {
  Reporter,
  Developer = 2,
  Maintainer,
  Owner,
  Guest
}

console.log(Role.Reporter); // 0 默认重零开始 依次递增 只有数字类型有自增长行为
console.log(Role.Developer); // 2 设置初始值
console.log(Role.Maintainer); // 3 
console.log(Role.Guest); // 5
```

> 其他类型注解在编译为js的时候会自动移除，而枚举类型会被编译成js代码，上述代码编译后的代码：
>> ```js
>> var Role;
>> (function (Role) {
>>     Role[Role["Reporter"] = 0] = "Reporter";
>>     Role[Role["Developer"] = 2] = "Developer";
>>     Role[Role["Maintainer"] = 3] = "Maintainer";
>>     Role[Role["Owner"] = 4] = "Owner";
>>     Role[Role["Guest"] = 5] = "Guest";
>> })(Role || (Role = {}));
>> console.log(Role.Reporter); // 0 默认重零开始 依次递增 只有数字类型有自增长行为
>> console.log(Role.Developer); // 2 设置初始值
>> console.log(Role.Maintainer); // 3 
>> console.log(Role.Guest); // 5
>> ```
* 字符串枚举
```ts
enum Role {
  Success = '恭喜你，成功了', //  字符串枚举必须有初始值，且不会有自增长行为
  Fail = '抱歉，失败了',
}
```
> 代码编译后的代码：
>> ```js
>> "use strict";
>> var Role;
>> (function (Role) {
>>     Role["Success"] = "\u606D\u559C\u4F60\uFF0C\u6210\u529F\u4E86";
>>     Role["Fail"] = "\u62B1\u6B49\uFF0C\u5931\u8D25\u4E86";
>> })(Role || (Role = {}));
>> ```


* 异构枚举
枚举可以混合字符串和数字成员
```ts
enum Answer {
  N,
  Y = 'yes'
}
```

```js
"use strict";
var Answer;
(function (Answer) {
    Answer[Answer["N"] = 0] = "N";
    Answer["Y"] = "yes";
})(Answer || (Answer = {}));
```

#### 枚举成员
* 枚举成员类型：只读类型
* 枚举成员分类：`const`常量枚举、`computed`计算枚举
> `const`的三种情况:常量枚举的成员会在编译时候计算结果，以常量的形式出现在运行时环境
>>```ts
>> a // 1.没有初始值
>> b = Char.a // 2.对已有枚举成员的引用
>> c = 1 + 3 // 3.常量表达式
>>```
> `computed`非常量的表达式（必须有初始值）:枚举的成员不会在编译时候被计算，在运行时计算。
>>```ts
>> d = Math.random()
>> e = '123'.length
>>```
### 包装对象类型
`JavaScript` 的8种类型之中，`undefined`和`null`其实是两个特殊值，`object`属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值。

`boolean`,`string`,`number`,`bigint`,`symbol`这五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值在需要时，会自动产生的对象。

```ts
const s = new String('hello');
typeof s // 'object'
s.charAt(1) // 'e'
```

在 `JavaScript` 语言中，只有对象才有方法，原始类型的值本身没有方法。这行代码之所以可以运行，就是因为在调用方法时，字符串会自动转为包装对象，`charAt()`方法其实是定义在包装对象上。

### 字面量类型
在 `TypeScript` 中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型

字面量类型的种类：字符串字面量类型、数字字面量类型、布尔字面量类型

```ts
let str1 = 'Hello TS' // string
const str2 = 'Hello TS' // 'Hello TS'类型 const是一个常量 所以类型是它本身 即字面量类型

const age: 18 = 18 // age只能是18
```


* 一般与联合类型一起使用，表示一组明确的可选值列表，与枚举类型有相同效果

```ts
// direction的类型只能是 其中之一
function changeDirection(direction: 'up' | 'down' | 'left' | 'right') { 
  console.log(direction);
}

changeDirection('middle') // 报错

changeDirection('up')

```

::: tip 包装对象类型与字面量类型
* TypeScript规定大写类型同时包含包装对象和字面量，小写类型只包含字面量，不包含包装对象。
> `Boolean` 和 `boolean`
> `String`和 `string`
> `Number`和 `number`
> `BigInt`和 `bigint`
> `Symbol`和 `symbol`
```ts
const s1:String = 'hello'; // 正确
const s2:String = new String('hello'); // 正确

const s3:string = 'hello'; // 正确
const s4:string = new String('hello'); // 报错
```

* `Object` 类型与 `object` 类型
大写的`Object`类型代表 `JavaScript` 语言里面的广义对象。所有可以转成对象的值    
小写的`object`类型代表 `JavaScript` 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值    
```ts
let obj:object;
 
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
obj = true; // 报错
obj = 'hi'; // 报错
obj = 1; // 报错
```
:::

### `class`类

`Typescript`全面支持ES2015中的`class`关键字，并为其添加了类型的注解和语法

`javascript`中的`class`关键字详见[3.16.9](/jaqi.note/frontend/javascript/ECMAScript/#_3-16-19-class)

```ts
class Person {
  age: number
  sex = '男' // 直接设置默认值，此时通过类型推论生成类型
}

const p = new Person() // const p: Person

console.log(p.sex); // 男
```

```ts
class Person {
  name: string
  sex = '男' // 直接设置默认值，此时通过类型推论生成类型
  constructor(name: string) { // 构造函数的返回值不能设置类型
    this.name = name;
  }
  getAge(birthday: number) {
    var nowYear = new Date().getFullYear();
    return Number(nowYear - birthday);
  }

}

const p = new Person('jaqi.l') // const p: Person

console.log(p.sex); // 男
console.log(p); // Person { sex: '男', name: 'jaqi.l' }
console.log(p.getAge(2006));  // 17
```

#### `class`类的继承方法

* `extends`类的继承
```ts
class Animal {
  type() {
    console.log('动物');
  }
}

class Cat extends Animal { // extends 继承Animal的类
  color() {
    console.log('灰色');
  }
}

const cat = new Cat()
cat.color(); // 灰色
```

* `implements`实现接口
```ts
interface Animal {
  type(): void
}

class Cat implements Animal {
  type() {
    console.log('动物');
  }
  color() {
    console.log('灰色');
  }
}

const cat = new Cat()
cat.type(); // 动物
cat.color(); // 灰色
```

#### 类成员的可见性与只读性

* 可见性修饰符:
> `public`（公共）默认的,所有成员都可以访问（当前类、子类、实例对象）   
> `protected`（受保护的）,只能在当前声明的类及其子类中访问，实例对象不能呢该访问    
> `private`（私有）,只能在当前声明的类中访问    
```ts
class Animal {
  public type() { // 公共的方法
    console.log('动物');
    this.sex() // 受保护的方法可以在当前类调用
    this.age() // 私有的方法只能在当前类调用
  }
  protected sex() { // 受保护的方法
    console.log('公');
  }
  private age() { // 私有的方法
    console.log(10);
  }
}

class Cat extends Animal {
  color() {
    console.log('灰色');
    this.sex() // 受保护的方法可以在子类中调用
    this.age() // 报错 属性“age”为私有属性，只能在类“Animal”中访问。
  }
}

const cat = new Cat()
cat.color(); // 灰色 公
```

* 只读修饰符:
> `readonly`该属性只读(防止在构造函数之外对属性进行赋值)，只能修饰属性不能修饰方法

```ts
class Person {
  readonly name: string = 'jaqi' // 如果不指定类型 只设置默认值  则会认为是字面量类型
  constructor(name: string) { // 只能通过constructor赋值
    this.name = name
    console.log(this.name);
  }
  setName() {
    this.name = 'yousaffaher' // 报错 无法为“name”赋值，因为它是只读属性
  }
}

const p = new Person('jaq.l')
```
## 3.17.3 类型的方法与特性
### 类型查询

`typeof`检测变量的类型

```ts
// 查看对象属性的类型 
let obj = { x: 1, y: 2 }
console.log(typeof obj.x); // number

// 查看函数返回值的类型
function add(x: number, y: number) { return ' x + y' }
console.log(typeof add(1, 2)); // string

function add(x: number, y: number) { console.log(x + y) } 
console.log(typeof add(1, 2)); // undefined

```

```ts
let num: number = 123

let num1: typeof num = 456 // 根据已有的变量类型 简化类型书写
```
### 类型兼容性

* 类型系统分为两种：
1. 结构化类型系统（鸭子类型）：类型检查关注的是值所具有的形状
2. 标明类型系统

`TypeScript`采用的是结构化类型系统，如果两个对象具有相同的形状，则认为它们属于用一类型,

```ts
class Point { x: number; y: number }
class Point2D { x: number; y: number}

const p: Point = new Point2D() // 所以Point与Point2D属于用一类型 在C#、Java中是无法兼容的

```

* 对于对象类型来说：更准确的说法是`Y`的成员至少与`X`相同，则`X`兼容`Y`（成员多的`Y`可以赋值给成员少的`X`）

```ts
class Point { x: number; y: number } 
class Point3D { x: number; y: number; z: number }

const p: Point = new Point3D() // 成员多的Point3D可以赋值给成员少的Point
```

* 接口之间的类型兼容性,`class`与`interface`也可以兼容
```ts
interface Point { x: number; y: number }
interface Point2D { x: number; y: number }

let p1: Point
let p2: Point2D = p1!

interface Point3D { x: number; y: number; z: number }

let p3: Point3D
p2 = p3!

class Point4D { x: number; y: number; z: number; W: number }

p3 = new Point4D // class与interface也可以兼容
```

* 函数之间的类型兼容性

1. 参数个数：参数多的兼容参数少的（少的可以赋值给多的）
```ts
type F1 = (a: number) => void
type F2 = (a: number, b: number) => void

let f1: F1
let f2: F2 = f1! // 参数少的可以赋值给参数多的，与对象兼容性正好相反，


let arr = ['a', 'b', 'c']
// forEach回调函数是有三个参数，我们可以省略不需要的参数
// 但是不能使用没有提供的参数 参数少的可以赋值给参数多的
arr.forEach(item => { })
```

2. 参数类型：相同位置的参数类型要相同（原始类型）或兼容（对象类型）

3. 返回值类型：返回值类型要相同（原始类型）或兼容（对象类型）
```ts
type F1 = () => { a: '1', b: '2' }
type F2 = () => { a: '1' }


let f1: F1
let f2: F2 = f1! // 返回值多的可以赋值给返回值少的

```


### 类型推论
在`TypeScript`中，没有明确类型的地方，`TypeScript`会根据类型推论自动设置类型    

1. 声明变量并初始化时
2. 决定函数返回值时

```ts
let age = 18
// 等同于
let age:number = 18

// 根据参数和返回的内容自动判断返回值的类型（参数类型必须写）
function add(x: number, y: string) { return x + y }  

```

### 类型断言`as`

手动指定值的具体类型（常用语缩小类型的范围）

```ts
const aLink = document.getElementById('link')

console.log(aLink.href) // ts报错 此时的aLink是HTMLElement，只有通用的属性和属性值
```

```ts
const aLink = document.getElementById('link') as HTMLAnchorElement // 指定类型为a标签类型（HTMLAnchorElement），HTMLAnchorElement是HTMLElement子类型

// 其他写法 不能再react中使用
const aLink = <HTMLAnchorElement>document.getElementById('link')

```

::: tip 如果判断HTMLElement的子类型
通过浏览器控制板，选中元素然后console.dir($0)，`[[Prototype]]`即是
:::
## 3.17.4 扩展类型

### 联合类型
`|`表示联合类型，由一个或多个类型组成类型
```ts
// 联合类型
let arr1: (number | string)[] = [1, 2, 3, '4'] // 数组中可以是number或string
let arr2: number | string[] = 1 // number或字符串数组
let arr3: Array<number | string> = [1, 2, 3, '4'] // 数组中可以是number或string
```


### 类型别名

* `type`为类型设置别名
```ts
type numStrArray = (number | string)[] // 设置类型别名为numStrArray
let arr1: numStrArray = [1, 2, 3, '4']
let arr2: numStrArray = ['5', 6, 7, '8']
```

* 利用`interface`接口实现类型别名的效果
```ts
interface objTemp { x: number, y: number, }  // 声明一个objTemp公共类型

let obj2: objTemp = { x: 1, y: 2 }   // 复用objTemp的类型 与type类型别名有相同效果
```

::: tip `type`与`interface`实现类型别买的区别
相同点：都是给对象指定类型
不同点：`interface`只能为对象指定类型、`type`可以为任何类型指定别名
:::

### 类型继承
* `extends`接口继承

```ts
interface objTemp { x: number, y: number, }  // 声明一个objTemp公共类型
interface objTemp1 extends objTemp {z:string }  // 继承objTemp的类型并设置自己的类型

let obj: objTemp1 = { x: 1, y: 2, z: '3' }
```

* `class`类的继承：详见[class类的继承方法
](/jaqi.note/frontend/javascript/TypeScript/#class类)


### 交叉类型
`&`表示交叉类型，合并多个类型组成类型
组合多个类型
```ts
interface objTemp1 { x: number, y: number, }
interface objTemp2 { a: string, b: string, }

type objTemp = objTemp1 & objTemp2 // 同时继承objTemp1与objTemp2 
let obj: objTemp = {
  x: 1, y: 2,
  a: '1', b: '2'
}
```

::: tip 交叉类型、接口继承与联合类型的对比
都可以实现类型的组合、只是对同名属性，处理冲突的方式不同

> 接口继承无法处理冲突
> ```ts
> // 接口继承
> interface Person {
>   name: string,
>   id: number
> }
> interface User { // 接口Person与User都有id属性 不能继承 
>   admin: string,
>   id: string
> }
> 
> interface User extends Person { z: string }
> ```

> 联合类型与交叉类型处理冲突的方式不同
> ```ts
> type Person = {
>   name: string,
>   id: number
> }
> type User = {
>   admin: string,
>   id: string
> }
> 
> // 交叉类型
> type p = Person & User
> const p1: p = {
>   name: '123',
>   admin: '123',
>   id: 1 // error, id为never
> }
> 
> // 联合类型
> const p1: p = {
>   name: '123',
>   admin: '123',
>   id: '1' // number | string
> }
> ```
:::

### 泛型和`keyof`
泛型是在保证类型安全的前提下，让函数等与多种类型一起工作，从而实现复用。      
常用于：`函数`、`接口`、`class`中

```ts
// 接受什么类型就返回什么类型
// Type泛型变量，相当于一个容器，接受什么类型就代表什么类型
function id<Type>(value: Type): Type { return value }

console.log(id<number>(100)); // 设置Type的类型为number

// 通过类型推断机制，简化泛型调用
// 参数是string则type为string类型，如果无法推断的时候需要显性的传入类型
console.log(id('jaqi.l')); 
```

* 泛型约束
```ts
// 对接受的类型变量设置范围为数组或字符串,返回值为number
function id<Type>(value: Type[]): Type[] { return value.length }

console.log(id([1, 2, 3, 4]));
```

通过`extends`设置约束
```ts
interface ILength { length: number }// 设置范围为：有length属性的类型

// 类型必须满足ILength类型
function id<Type extends ILength>(value: Type): number { return value.length }

console.log(id([1, 2, 3, 4]));
console.log(id('jaqi.l'));
console.log(id({ length: 999,name:'jaqi.l' }));
```

* 多个泛型变量
```ts
function id<valueType, nameType>(value: valueType, name: nameType): nameType { return name }

console.log(id(100, 'jaqi.l')); 
```

* `keyof`   
接受一个对象类型，生成其键名称（可能是字符串或数字）的联合类型。
```ts
// key必须是Type中存在的属性
function getProp<Type, key extends keyof Type>(obj: Type, key: key) { return obj[key] } 

console.log(getProp({ name: 'jaqi.l', age: 18 }, 'name')); // jaqi.l
console.log(getProp('abc', 'length')); // 3
console.log(getProp('abc', 1)); // b  1 表示索引

console.log('object'[2]); // j
```

* 泛型接口
```ts
interface IdFunc<Type> {
  id: (value: Type) => Type // 接口的泛型变量，对接口中的所有成员可见
  ids: () => Type[]
}

let obj: IdFunc<number> = { // 需要显性的设置类型
  id(value) { return value }, // number
  ids() { return [1, 2, 5] } // number[]
}
```

* 泛型类`class`
```ts
class GenericNimber<NumType> {
  defaultValue!: NumType
  add: (x: NumType) => NumType = (x) => {
    return x
  }
}

const myNum = new GenericNimber<number>() // 需要显性的设置类型
myNum.defaultValue = 10

console.log(myNum.add(1));

// 可以省略类型的情况
class GenericNimber<NumType> {
  defaultValue!: NumType
  add: (x: NumType) => NumType = (x) => {
    return x
  }
  constructor(value: NumType) {
    this.defaultValue = value
  }
}

const myNum = new GenericNimber(100) // 使用constructor进行赋值可以省略类型
```

数组就是一个泛型接口，`option+鼠标左键`查看详情

### 索引签名类型与索引查询类型
绝大多数情况下，我们都可以在使用对象前确定对象的结构，并为对象添加准确的类型。
当无法确定对象中有哪些属性，此时就需要用到索引签名类型。
```ts
interface AnyObject {
  [key: string]: number // [key: string] 只做占位，在js中没有实际意义
}

let obj: AnyObject = {
  a: 1,
  b: '2' // error 不能将类型“string”分配给类型“number”。
}
```
```ts
// 数组的原理
interface AnyObjectt<Type> {
  [key: number]: string
}

let obj: AnyObjectt<string> = {
  0: '1',
  1: '1',
}
```

* 索引查询类型
```ts
type Props = { a: number, b: string, c: boolean }

type TypeA = Props['b']// Props['a']即索引查询（访问）类型

//模拟 Partial的实现原理
type myPartial<T> = {
  [p in keyof T]: T[p]  // T[P] 即索引查询（访问）类型
}

type PartialProps = myPartial<Props>
```
* 同时查询兑个索引查询类型
```ts
type Props = { a: number, b: string, c: boolean }

type TypeA = Props['b' | 'c']

type TypeB = Props[keyof Props] // 获取Props里的所有键
```
::: tip
1. `javascript`中对象的键`key`默认是`string`类型
2. 数组就是一个泛型接口，`option+鼠标左键`查看详情
:::
### 映射类型
基于旧类型创建新的类型（对象类型），相当于批量设置属性的类型

只能用于类型别名`type`，接口类型可以使用`Record<Keys,Type>`
```ts
type Type1 = 'x' | 'y' | 'z'
type Type2 = { [key in Type1]: number } // 相当于for/in 对Type1的所有属性设置number类型

/* 相当于：
type Type2 = {
  x: number;
  y: number;
  z: number;
}
*/
```
```ts
type Server = "USER" | "SHOP" | "IM"
type Env = "devst" | "sit" | "pp"

type ServerList = {
  [key in Env]: {
    [key in Server]?: string;
  };
}

const serverList: ServerList = {
  "devst": {
    "USER": "https://devst.jaqi.top/user",
    "SHOP": "https://devst.jaqi.top/shop"
  },
  "sit": {
    "USER": "https://sit.jaqi.top/user",
    "IM": "https://sit.jaqi.top/im"
  },
  "pp": {
    "USER": "https://pp.jaqi.top/user",
    "SHOP": "https://pp.jaqi.top/shop",
    "IM": "https://pp.jaqi.top/im"
  }
}


```

利用`keyof`根据对象类型来创建，支持接口类型
```ts
type Type1 = { x: number, y: string, z: boolean }

interface Type2 { a: number, b: string, c: boolean }

type TypeA = { [key in keyof Type1]: number }
type TypeB = { [key in keyof Type2]: number }

// 相当于：
// type TypeA = {
//   x: number;
//   y: number;
//   z: number;
// }
```

<!-- p74 https://www.bilibili.com/video/BV14Z4y1u7pi/?p=74 --> 


## 3.17.4 工具类型

### 1. `Awaited<Type>`
用来取出 `Promise` 的返回值类型，适合用在描述 `then()` 方法和 `await` 命令的参数类型    
```ts
type A = Awaited<Promise<string>>;
```
### 2. `ConstructorParameters<Type>`
提取构造方法`0Type`的参数类型，组成一个元组类型返回   
```ts
type T1 = ConstructorParameters<
  new (x: string, y: number) => object
>; // [x: string, y: number]

type T2 = ConstructorParameters<
  new (x?: string) => object
>; // [x?: string | undefined]
```
### 3. `Exclude<UnionType, ExcludedMembers>`
用来从联合类型`UnionType`里面，删除某些类型`ExcludedMembers`，组成一个新的类型返回    
```ts
type T1 = Exclude<'a'|'b'|'c', 'a'>; // 'b'|'c'
type T2 = Exclude<'a'|'b'|'c', 'a'|'b'>; // 'c'
```
### 4. `Extract<Type, Union>`
用来从联合类型`UnionType`之中，提取指定类型`Union`，组成一个新类型返回。它与E`xclude<T, U>`正好相反   
```ts
type T1 = Extract<'a'|'b'|'c', 'a'>; // 'a'
type T2 = Extract<'a'|'b'|'c', 'a'|'b'>; // 'a'|'b'
type T3 = Extract<'a'|'b'|'c', 'a'|'d'>; // 'a'
```
### 5. `InstanceType<Type>`
提取构造函数的返回值的类型（即实例类型），参数Type是一个构造函数，等同于构造函数的`ReturnType<Type>`    
```ts
type T = InstanceType<
  new () => object
>; // object
```
### 6. `NonNullable<Type>`
用来从联合类型`Type`删除`null`类型和`undefined`类型，组成一个新类型返回，也就是返回`Type`的非空类型版本   
```ts
// string|number
type T1 = NonNullable<string|number|undefined>;

// string[]
type T2 = NonNullable<string[]|null|undefined>;
```
### 7. `Omit<Type, Keys>`
用来从对象类型Type中，删除指定的属性`Keys`，组成一个新的对象类型返回    
```ts
interface A {
  x: number;
  y: number;
}

type T1 = Omit<A, 'x'>;       // { y: number }
type T2 = Omit<A, 'y'>;       // { x: number }
type T3 = Omit<A, 'x' | 'y'>; // { }
```
### 8. `OmitThisParameter<Type>`
从函数类型中移除 `this` 参数    
```ts
function toHex(this: Number) {
  return this.toString(16);
}

type T = OmitThisParameter<typeof toHex>; // () => string
```
### 9. `Parameters<Type>`
从函数类型Type里面提取参数类型，组成一个元组返回    
```ts
type T1 = Parameters<() => string>; // []

type T2 = Parameters<(s:string) => void>; // [s:string]
```
### 10. `Partial<Type>`
根据传入的类型构造一个新类型，新类型中所有属性都变为可选的,不改变传入的类型（生成一个可选版本的类型）
```ts
interface Props {
  id: string
  children: number[]
}

// 根据传入Props类型构造一个新PartialProps类型，新类型的所有属性都变为可选的
type PartialProps = Partial<Props>
```
### 11. `Pick<Type,Keys>`
选择传入类型中的一些属性，构造一个新类型（生成一个指定属性范围版本的类型）
```ts
interface Props {
  id: string
  children: number[]
  title: string
}
// 属性必须存在于传入属性
type PartialProps = Pick<Props, 'id' | 'title'>

let p1: PartialProps = {
  id: '1',
  title: 'typescript'
}
```
### 12. `Readonly<Type>`
根据传入的类型构造一个新类型，新类型中所有属性都变为只读的,不改变传入的类型（生成一个只读版本的类型）
```ts
interface Props {
  id: string
  children: number[]
}

type PartialProps = Readonly<Props>

let p1: PartialProps = {
  id: '1',
  children: [1]
}

p1.id = '10' // 无法为“id”赋值，因为它是只读属性。
```
### 13. `Record<Keys,Type>`
构造一个对象类型，属性值为`keys`，属性类型为Type(生成一个批量设置属性的类型的新类型)
```ts
type RecordObj = Record<'a' | 'b' | 'c', string[]>

let obj: RecordObj = {
  a: ['1'],
  b: ['2'],
  c: ['3']
}
```
### 14. `Required<Type>`
返回一个新类型，将参数类型Type的所有属性变为必选属性。它与`Partial<Type>`的作用正好相反   
```ts
interface A {
  x?: number;
  y: number;
}

type T = Required<A>; // { x: number; y: number; }
```
### 15. `ReadonlyArray<Type>`
用来生成一个只读数组类型，类型参数Type表示数组成员的类型    
```ts
const values: ReadonlyArray<string> 
  = ['a', 'b', 'c'];

values[0] = 'x'; // 报错
values.push('x'); // 报错
values.pop(); // 报错
values.splice(1, 1); // 报错
```
### 16. `ReturnType<Type>`
`ReturnType<Type>`提取函数类型`Type`的返回值类型，作为一个新类型返回   
```ts
type timer = ReturnType<typeof setTimeout>
type socketTask = ReturnType<typeof uni.connectSocket>
```
### 17. `ThisParameterType<Type>`
提取函数类型中this参数的类型
```ts
function toHex(this: Number) {
  return this.toString(16);
}

type T = ThisParameterType<typeof toHex>; // number
```
### 18. `ThisType<Type>`
不返回类型，只用来跟其他类型组成交叉类型，用来提示 `TypeScript` 其他类型里面的`this`的类型
### 19.`Uppercase<StringType>`
将字符串类型的每个字符转为大写
```ts
type A = 'hello';

// "HELLO"
type B = Uppercase<A>;
```
### 20.`Lowercase<StringType>`
将字符串的每个字符转为小写
```ts
type A = 'HELLO';

// "hello"
type B = Lowercase<A>;
```
### 21.`Capitalize<StringType>`
将字符串的第一个字符转为大写
```ts
type A = 'hello';

// "Hello"
type B = Capitalize<A>;
```
### 22.`Uncapitalize<StringType>`
将字符串的第一个字符转为小写
```ts
type A = 'HELLO';

// "hELLO"
type B = Uncapitalize<A>;
```

## 3.47.5 注释指令
## 3.17.6 `tsconfig.json`配置文件详情   


* `compilerOptions`: 编译器的选项，如语言版本、目标 `JavaScript` 版本、生成的 `sourcemap` 等    
* `include`: 指定需要编译的文件路径或文件夹路径   
* `exclude`: 指定不需要编译的文件路径或文件夹路径   
* `files`: 指定需要编译的文件列表   
* `extends`: 指定继承自另一个 `tsconfig.json` 文件    
* `compileOnSave`: 指定是否在保存时编译文件   
* `buildOnSave`: 指定是否在保存时编译文件   
* `target`：编译目标 JavaScript 版本，可以是 "`ES3`"，"`ES5`" 或 "`ES2015`" 等    
* `module`：指定模块系统，可以是 "`CommonJS`"，"`AMD`" 或 "`System`" 等   
* `sourceMap`：是否生成 `sourcemap` 文件    
* `outDir`：编译输出目录    
* `rootDir`：设置项目的根目录   
* `strict`：是否开启严格类型检查    
* `noImplicitAny`：是否禁止隐式 `any` 类型    
* `lib`：指定要包含在编译中的库文件，如 "`es2015`"    
* `paths`: 指定模块路径别名   
* `baseUrl`: 指定基础目录   
* `jsx`: 指定 JSX 的处理方式    
* `allowJs`: 是否允许编译 `JavaScript` 文件   
* `checkJs`: 是否检查 `JavaScript` 文件   
* `declaration`: 是否生成声明文件   
* `declarationMap`: 是否生成声明文件的 sourcemap    
* `emitDecoratorMetadata`: 是否支持装饰器   
* `experimentalDecorators`: 是否支持实验性装饰器    
* `listEmittedFiles`: 是否列出所有输出的文件    
* `listFiles`: 是否列出所有编译过的文件   
* `locale`: 指定本地化语言    
* `mapRoot`: 指定 sourcemap 文件的根目录    
* `moduleResolution`: 指定模块解析策略    
* `noEmit`: 是否禁止输出 `JavaScript` 代码    
* `noEmitHelpers`: 是否禁止输出辅助函数   
* `noEmitOnError`: 是否在发生错误时禁止输出 `JavaScript` 代码   
* `noImplicitReturns`: 是否禁止隐式返回   
* `noUnusedLocals`: 是否检查未使用的局部变量    
* `noUnusedParameters`: 是否检查未使用的参数    
* `preserveConstEnums`: 是否保留 `const` 枚举   
* `pretty`: 是否格式化输出的 `JavaScript` 代码    
* `removeComments`: 是否移除注释    
* `skipLibCheck`: 是否跳过检查库文件    
* `sourceRoot`: 指定源文件的根目录    
* `suppressExcessPropertyErrors`: 是否禁止过多属性错误    
* `suppressImplicitAnyIndexErrors`: 是否禁止隐式 `any` 类型索引错误   
* `typeRoots`: 指定类型声明文件的根目录   
* `types`: 指定需要包含在编译中的类型声明文件   
* `watch`: 是否监视文件变化并重新编译
* `reference`: 为不同的子工程引用不同的配置文件

### `vite`项目配置案例
```json
{
  "compilerOptions": {
    "target": "ESNext", // 编译目标 JavaScript 版本
    "useDefineForClassFields": true, // 是否使用下一代标准
    "module": "ESNext", // 设置模块规范
    "moduleResolution": "Node", // 指定模块解析策略
    "types": ["vite/client"],// 指定需要包含在编译中的类型声明文件
    "strict": true, // 严格模式
    "jsx": "preserve", // 如何处理jsx
    "resolveJsonModule": true, // 支持对json文件
    "isolatedModules": true, // ES Module 模块导入
    "esModuleInterop": true, // 如果是其他模块自动转成 ES6 module
    "lib": [
      "ESNext",
      "DOM"
    ], // 类型检测需要的包
    "skipLibCheck": true, // 绕过整个包的检测
    "noEmit": true, // 是否禁止输出 JavaScript 代码
    "baseUrl": ".", // 指定基础目录
    "paths": { // 指定模块路径别名
      "@/*": [
        "src/*"
      ],
      "@views/*": [
        "src/views/*"
      ],
      "@store/*": [
        "src/store/*"
      ],
      "@router/*": [
        "src/router/*"
      ],
    },
  },
  "include": [ // 指定需要编译的文件路径或文件夹路径
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "build/**/*.ts",
    "build/**/*.d.ts",
    "vite.config.ts"
  ], // 只转换这部分的文件
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ], // 为不同的子工程引用不同的配置文件
  "exclude": ["node_modules", "dist", "**/*.js"]
}
```

::: tip 让 `TypeScript` 识别 `Vue` 单文件组件
方法一：`tsconfig.json`文件中设置
```js
{
  "compilerOptions": {
    "types": ["vite/client"],
  }
}
```
方法二：`vite-env.d.ts` 文件中定义（建议使用此方法）
```ts
/// <reference types="vite/client" />   

// 为所有的.vue文件声明Vue类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 为环境变量添加类型注解
export interface ImportMetaEnv {
  readonly VITE_NODE_ENV:string; //定义提示信息 数据是只读的无法被修改
  //多个变量定义多个...
}

// 为自动引入的element-plus插件声明类型
// 可以由unplugin-vue-components自动生成
export declare global {
  const ElMessage:typeof import('element-plus')['ElMessage'] 
  const ElLoading:typeof import('element-plus')['ElLoading'] 
}
```

:::
