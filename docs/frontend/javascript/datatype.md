基本类型:`Undefined` ,`Null`, `Boolean`,`Number`,`String`,`Symbol(ES6)`

引用类型: `Object`,`Array`,`Date`,`Function`
## 3.2.1 字符串型数据String 
* 字符串可以使用双引号（"）、单引号（'）或反引号（`）来定义，但是要注意开头结尾的符合要一致
```js
  let firstName = "John";
  let lastName = 'Jacob';
  let lastName = `Jingleheimerschmidt`
```
* 字符串是不可变的，意思是一旦创建，它们的值就不能变了。要修改，必须先销毁，然后将包含新值的另一个字符串保存到该变量
```js
  let lang = "Java";
  lang = lang + "Script";
```

JavaScript中常用的转义字符：换行符：`\n`、回车符：`\r`、退格符: `\b`、反斜杠: `\\`、双引号: `\"`

   
<p color="red">*</p>部分转义字符在输出为HTML文档流时不发生作用。
:::

## 3.2.2 数值型数据Number
JavaScript只有一种数字类型。数字可以带小数点，也可以不带。

极大或极小的数字可以通过科学（指数）计数法来书写：3e4

数值可以通过运算符进行计算。

浮点数值的最高精度是17位小数，但是在进行算术计算时其精度远远不如整数。例如，0.1加0.2的结果不是0.3， 而是0.30000000000000004。这个舍入误差会导致无法测试特定的浮点数值。 

数字可以写成十进制、八进制、十六进制。

八进制在js中表示是第一位一定要是0，后面就是八进制字数序列（0~7）

十六进制字面量前两位必须是0x,后面跟十六进制数字（0~9及A~F）。字母A~F不区分大小写。

*科学（指数）计数法、八进制、十六进制表示的数字在输出时统统会转换成十进制。

## 3.2.3 布尔型数据Boolean
布尔型数据boolen:只能有两个值：true 或 false。

将各种类型的值转化成Boolean类型的规则如下： 

Number:任意非0的数值为true,0值和NaN为"false"。

String:所有的非空字符串转化为 true;""（空字符串）转化成false

Object的任何对象都会转化为 true;

在javascript中，undefined、null、“ ”=false，其他都为真。

## 3.2.4 Undefined
这是一个很有意思的数据类型，因为它的值只有一个，那就是undefined。

在申明变量时如果没有将变量赋值的话这个变量也是属于Undefined类型的。

如果一个变量没有申明就直接去访问解释器会报错误信息，但是这样的变量如果使用typeof返回的结果也是"undefined"。

永远不用显式地给某个变量设置undefined值

## 3.2.5 Null
Null也是一个只有一个值得数据类型，它的值就是null，任何变量只要给其赋值为null的话这个变量的数据类型就是Null类型。

可以通过将变量的值设置为 null 来清空变量。

::: tip `null`和`undefined`的区别：
`null`不存在,没有开辟内存，`undefined`开辟了内存，没有值。
:::
## 3.2.6 数组Array:
可以通过数组的下标来访问数组的元素。

数组元素的顺序从0开始

## 3.2.7 对象Object:
在javascript中，所有的对象都继承自Object对象。

对象由花括号分隔。在括号内部，对象的属性以名称和值对的形式 (name : value) 来定义。

对象没有赋值的属性，该属性的值为undefined。

## 3.2.8 数据类型检测
### typeof方法：

适用于基本数据类型undefined,boolean,number,string、object、function     
``` js
Typeof vuale
```
### constructor方法：

适用于对象、数组等复杂的数据类型,不适用与undefined和null。
``` js
object.constructor
```
### prototype.toString方法：
最安全、准确。
``` js
Object.prototype.toString.call(data)
```
### instanceof方法：
``` js
let date = {}
console.log(date instanceof Object)
```


## 3.2.9 浅拷贝与深拷贝

#### 浅拷贝（shallowCopy）：只是增加了一个指针指向已存在的内存地址。
```js
var arr1 = {a:0,b:1,c:2};

var arr2 = arr1

arr1 = {};  // arr1指向另一个内存地址，不影响arr2指向之前arr1指向的内存地址
console.log(arr1); // {}
console.log(arr2); // {a: 0, b: 1, c: 2}
```

```js
var arr1 = {a:0,b:1,c:2};

var arr2 = arr1

arr1.a = 4; // 修改了arr1和arr2共同指向的内存地址里面的值
console.log(arr1); // {a: 4, b: 1, c: 2}
console.log(arr2); // {a: 4, b: 1, c: 2}
```
#### 深拷贝（deepCopy）：增加了一个指针并且申请了一个新的内存，使这个增加的指针指向这个新的内存，

对于字符串类型，浅拷贝是对值的复制。对于对象来说，浅拷贝是对对象地址的复制。
* 深拷方法：
1. JSON方法
```js
let obj2 = JSON.parse(JSON.stringify(obj))
```
2. 递归
3. 利用lodash库的cloneDeep方法
4. ES6扩展运算符（只能当对象属性是基本数据类型才是深拷贝，引用类型还是浅拷贝）
```js
let obj2 = {...obj1}
```