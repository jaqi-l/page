## 3.6.1对象:Object
JavaScript 中的所有事物都是对象：字符串、数值、数组、函数...

对象是属性的集合，每个属性都有名字和值，对象可以通过属性的名字存取属性的值。

对象的属性既可以存放基本数据类型也可以存放其他对象的引用值或者函数的引用值，如果存储的是函数的的引用值则该属性称为方法

对象可以看做带有属性和方法的特殊数据类型。

对象包含两个基本要素：属性-值，也称作键-值/名-值;当属性值为方法时也称作：属性(字段)和方法(函数)

### 对象的声明

* 通过new运算符声明
```js
var person = new Object();
    person.name = "lisi";
    person.age = 21;
    person.family = ["lida","lier","wangwu"];
```    
* new关键字可以省略,属性可以用引号包含也可以不用
```js
var people={

name:'宋江',

sex:'男',

age:40

}
```
* ES6解构
```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
```
[详见ES6专题]()
### 对象的访问
* 可以用点符号访问对象属性值也可以通过数组的方式，即用["属性名称"] 
```js
alert(people['age'])
```

### 对象的方法
* `delete`删除对象的属性。
```js
delete people.age;
```
```js
delete people['age']
```
* `toUpperCase`把文本转换为大写
```js
message.toUpperCase()
```
## 3.6.2数组:Array

### 对数组的声明

* new关键字创建空数组
```js
var arr=new Array();
```
* new关键字创建包含元素的数组
```js
var arr=new Array("html","css","javascript);
```
* new关键字创建指定2个元素的数组
```js
var arr=new Array(2);
```
* 使用[]直接创建数组
```js
var arr=[];
```
* ES6解构
```js
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
```
[详见ES6专题]()

### 数组的访问
* 可以使用索引查询获取数组元素和添加数组元素
```js
arr[0]
```

### 数组的方法

* `length`获取数组的长度，并且可以给一个数组赋值。
```js
arr.length
```

* `push`将新元素添加到数组尾部，返回新数据长度
```js
arr.push("html"); 
```
* `unshift`将新元素添加到数组首位，返回新数据长度（IE不兼容）
```js
arr.unshift("html");  
```

* `delete`删除指定的元素，不改变数组长度
```js
delete arr[1];arr[1]=undefined
```

* `in`判断数组是否存在关键字（也可以判断对象是否有某个key）
```js
let obj = [1,2,3]
console.log(1 in obj) // true

let obj = {id:'1',name:'jaqi'}
console.log('name' in obj) // 只能判断key
```

* `pop`删除并返回数组的末尾元素
```js
arr.pop()
```
* `shift`删除并返回数组的第一个元素
```js
arr.shift()
```

* `toString`将数组表示为字符串。
```js
arr.toString()
```
* `join`数组转字符串并通过`''`符合分割

```js
arr.join(',')//转成字符串，并通过逗号分割
```
:::tip
* `split`通过`''`将字符串分割成数组组
```js
string.split(","); //通过逗号分割，转成数组
```
:::

* `reverse`颠倒数组元素的顺序，返回逆序后的新数组：
```js
  arr.reverse()
```

* `toReversed`颠倒数组元素的顺序，返回逆序后的新数组(<span style="color: red">*</span>ES2023新增)： 
```js
let arr = ["a","b","c","d","e"]
console.log(arr.toReversed()) // ['e', 'd', 'c', 'b', 'a']
console.log(arr)// ['a', 'b', 'c', 'd', 'e']
```

* `sort`数组排序： 
```js
arr.sort(sortfunction)  //sort function排序函数（若省略则按照ASII字符顺序进行升序排列）
```

* `toSorted`数组排序(<span style="color: red">*</span>ES2023新增)： 
```js
arr.toSorted(sortfunction)  //和sort相同，只是不改变元数组

let arr = [311,43,54,4,40,26,31,33];
arr.toSorted((a,b) => a - b);
```

* `concat`连接数组，将多个数组的元素合并为一个新的数组。
```js
arr3=arr1.concat(arr2);
```
* `splice`方法：删除、替换、插入元素(会更改原数组，返回值为裁切掉的数组)        
> splice(起始坐标，切去个数，插入元素1，插入元素2)
>> 第一参数为起始位置索引(包含起始位置)        
>> 第二参数为切取元素个数        
>> 第三个参数为插入元素，可选项
```js
let arr = [1,2,3,4,5,6]
arr.splice(3,2,4,4) // [4, 5]
console.log(arr) // [1, 2, 3, 4, 4, 6]
```

* `toSpliced`(<span style="color: red">*</span>ES2023新增)方法同`splice`，法：删除、替换、插入元素(不会更改原数组，返回值为修改后的数组)        
```js
let arr = [1,2,3,4,5,6]
arr.splice(3,2,4,4) // [1, 2, 3, 4, 4, 6]
console.log(arr) // [1, 2, 3, 4, 4, 6]
```



* `slice`切取数组的一段元素（不改变原数组，返回值为切取的新数组）： 

> slice(起始坐标，结束坐标)
> >第一参数为起始位置索引
> >第二参数为结束位置索引（不包含结束位置，若省略则切取到结尾）
```js
[1,2,3,4,5,6].selice(2,4) //[3,4]
```

* `indexOf`指定字符串在数组中首次出现的位置（从头找）
```js
var fruits = ["苹果","香蕉", "橙子", "苹果", "甜瓜"];
	var a = fruits.indexOf("苹果") // =0
```
* `lastIndexOf()`指定字符串在数组中最后出现的位置
```js
var fruits = ["苹果","香蕉", "橙子", "苹果", "甜瓜"];
	var a = fruits.lastIndexOf("苹果") // =0
```
:::tip
1. 识别空格，如果没有找到匹配的字符串则返回 -1。
2. 利用indexOf查找原理（查找对象地址），可以实现查找数组中指定对象
> ```js
> let arr=[{name:"Alex"},{name:"Tom"},{name:"Jaqi"}];
> let active = arr[2]
> arr.indexOf(active); // 2
> ```
:::
* `every`检测数组所有元素是否都符合指定条件（函数），有一个元素不满足则返回false ，且剩余的元素不会再进行检测。所有元素都满足条件返回true
```js
var ages = [32, 33, 16, 40];
function checkAdult(age) {
    return age >= 18;
}
ages.every(checkAdult);
```

* `some`用于检测数组中的元素是否满足指定条件（函数），一个元素满足则表达式返回true , 剩余的元素不会再执行检测。没有一个满足返回false。
```js
var ages = [3, 10, 18, 20];
function checkAdult(age) {
    return age >= 18;
}
ages.some(checkAdult);
```
ES6 箭头函数写法：
```js
var ages = [3, 10, 18, 20];
ages.some(item=>item>8)
```
* `filter`检测数组所有元素是否都符合指定条件（通过函数提供），并返回符合条件所有元素的数组。
```js
var ages = [32, 33, 16, 40];
function checkAdult(age) {
    return age >= 18;
}
function myFunction() {
    ages.filter(checkAdult);
}
```
* `forEach`用于调用数组的每个元素，并将元素传递给回调函数,详见[3.4.7](/jaqi.note/frontend/javascript/control/#_3-4-7其他控制语句)
```js
arr.forEach(function () {})
```
* `map`返回一个新数组，数组中的元素为原始数组元素调用函数处理后的，详见[3.4.7](/jaqi.note/frontend/javascript/control/#_3-4-7其他控制语句)
```js
arr.map(function () {})
```
* `reduce`将数组元素计算为一个值（从左到右）
```js
var numbers = [65, 44, 12, 4];
function getSum(total, num) {
    return total + num;
}
 numbers.reduce(getSum);

```
## 3.6.3Json
Json标准的数据交换格式：对象格式加`“”`      
`“属性”`，`“值”`        

### json的方法

#### json遍历
* `for/in`,详见3.4.7
```js
let obj = {a: '1', b: '2', c: '3', d: '4'}
for (let key in obj) {
    console.log(key)    //对象的属性名称 a,b,c,d
    console.log(key[o])  //对象的属性值1，2，3，4
}
```

#### string转json
* `eval`
```js
var json = eval("("+string+")")
```
* `JSON.parse`
```js
var json = JSON.parse(string);
```

::: tip JSON.parse(text,reviver)的其他参数  
`reviver`   
> 一个转换结果的函数，将为对象的每个成员调用此函数       

```js
var text = '{ "name":"Runoob", "initDate":"2013-12-14", "site":"www.runoob.com"}';
var obj = JSON.parse(text, function (key, value) {
	if (key == "initDate") {
	    return new Date(value);
	} else {
	    return value;
}});

console.log(obj) 
// name: 'Runoob', 
// initDate: Sat Dec 14 2013 08:00:00 GMT+0800 (中国标准时间), 
// site: 'www.runoob.com'
```
:::

#### json转string
* `JSON.stringify`
```js
var string = JSON.stringify(json);
```
::: warning
`JSON.stringify`不能转换`function`、`symbol`,`undefined`等数据类型
```js
let arr = [
  {
    fieldId: 539,
    value: undefined
  },
  {
    fieldId: 540,
    value: undefined
  }
]
JSON.stringify(arr) // '[{"prop":1},{"prop":2}]'  
// value为undefined的会丢失，因为undefined不是有效的json值
```

:::
::: tip JSON.stringify(value,replacer,space)的其他参数  
`replacer`   
> 如果是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理            
> 如果是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的JSON字符串中          
> 如果该参数为null或者未提供，则对象所有的属性都会被序列化           

`space`指定缩进用的空白字符串，用于美化输出；
> 如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格      
> 如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格          
> 如果该参数没有提供（或者为 null），将没有空格 

#### 利用replacer转换`function`、`symbol`,`undefined`等数据类型
```js
var data = {
	name: 'jaqi',
	info: {
		age: 24,
		sex: 'male'
	}
}
JSON.stringify(data, (key, value) => {
    if (typeof value === "symbol" || typeof value === "function") {
      return value.toString()
    }else if(value === undefined){
         return 'undefined'
    } else {
      return value
    }
  }, 4)
```
#### 利用space美化json
```js 
var data = {
	name: 'jaqi',
	info: {
		age: 24,
		sex: 'male'
	}
}

var shy = JSON.stringify(data, null, 4)

// {
//    "name": "jaqi",
//    "info": {
//        "age": 18b,
//        "sex": "male"
//    }
// }
```
:::

### json的访问
::: tip success
```js
alert(object.ob); //访问属性
alert(["ob"]); //=object.Ob访问属性
alert([k])//访问属性
alert(k)//访问属性名
```
:::
::: danger error
```js
alert([ob]);
```
:::
::: tip
对象、数组、Json指向的是地址，而不是存储数据。

var obj1={name:”luck”};

var obj2=obj1;      //obj1,obj2指向同一地址

obj2.name=”lily”; //地址内容变成lily

obj1.name→lily
:::