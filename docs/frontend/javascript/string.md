## 3.9.1字符串string
字符串是非常重要的数据类型，除了基本字符串外，JavaScript还提供了字符串的引用类型--字符串对象。

## 3.9.2字符串的声明

可以通过new 关键字创建字符串对象
```js
var str=new String
```
## 3.9.3对象的方法

* `length`获取字符串的长度。
```js
arr.length
```

* `toString`返回字符串。可以将数值转换成字符串。
```js
arr.toString
```
:::tip
如果需要获取数值的二进制、八进制、十六进制的字符串表示，则可以给toString传递一个表示进制的的整数
:::

* `parseInt`将字符串转换成整数。
>parseInt(string, radix)
>> string必需,要被解析的字符串。        
>> radix可选,表示要解析的数字的基数。
> 遇到小数点会停止解析
> 可以把二进制、八进制、十六进制或其他任何进制的字符串转换成整数
```js
parseInt("10.33");			//返回 10
parseInt("19",10);		//返回 19 (10+9)
parseInt("11",2);		//返回 3 (2+1)
parseInt("17",8);		//返回 15 (8+7)
parseInt("1f",16);		//返回 31 (16+15)
parseInt("010");		//未定：返回 10 或 8
```
* `parseFloat`将字符串转换浮点数。
如果第一个字符是数字字符，parseInt() 会继续解析第二个字符，直到解析完所有后续字符串或者遇到了一个非数字字符。
```js
parseInt("10.33") //10.33
```
:::warning
`parseInt`/`parseFloat`不能转换非数字字符串.遇到非数字字符为止.如果开头是非数字字符串，则返回NaN
:::

* `Number`将任意类型的值转换数值。
> 布尔值返回0/1
> null返回0
> undefined返回NaN
> 字符串：
>> 如果字符串中只包含数字时，将其转换为十进制数值，忽略前导0
>> 如果字符串中包含有效浮点格式，如"1.1"，将其转换为对应的浮点数字，忽略前导0
>> 如果字符串中包含有效的十六进制格式，如"0xf"，将其转换为相同大小的十进制数值
>> 如果字符串为空，将其转换为0
>> 如果字符串中包含除上述格式之外的字符，则将其转换为NaN
> 对象：则调用对象的valueOf方法，然后依照前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的toString方法，然后再依照前面的规则转换返回的字符串值。
```js
var num1 = Number("Hello world");　　//NaN
var num2 = Number("");　　　　　　　　//0
var num3 = Number("0000011");　　　　//11
// 字符串转nubmer 简写
let num = +'12.3';
```

* `isNaN`用于检查参数是否是非数字值 NaN=true 其他值=false
```js
isNaN(string)
```

* `charAt`返回指定索引位置的字符。
```js
	var str="HELLO WORLD";
	var n=str.charAt(1);//=E
```

* `charCodeAt`返回指定索引位置字符的 Unicode 值。
```js
var str="HELLO WORLD";
var n=str.charCodeAt(1); //=69
```

* `concat`连接字符串。var n = str1.concat(str2,str3);
```js
var n=txt1.concat(txt2);
```

* `slice`提取字符串索引n到m之间的片断(不包括m位置的字符串)，并在新的字符串中返回被提取的部分，-1表示最后一个，-2表示最后2个。
```js
var str="Hello world!";
var n=str.slice(2,3));//l
```

* `substring`提取字符串中两个指定的索引号之间的字符，不包含结尾字符。
```js
var str="Hello world!";
var n=str.substring(2,3));//l
```

* `substr`从索引号n开始提取字符串中m个字符。
```js
var str="Hello world!";
var n=str.substr(2,3); //llo
```

:::tip
`slice`/`substring`/`substr`区别
1. `slice`/`substring`第二次参数指定的是字符串最后一个字符后面的位置（都不包含最后一个字符），`substr`第二个参数指定返回的字符串个数。
2. `slice`支持复数（-1表示最后一个，-2表示最后2个。），`substring`填负数，先当与0
3. 第二个参数不填默认都是取到结尾
:::

* `indexOf`检索字符串,返回某个指定的字符串值在字符串中首次出现的位置。如果查找不到会返回 -1
```js
var str="Hello world, welcome to the universe.";
	var n=str.indexOf("welcome"); // =13
```
* `lastIndexOf`从后向前检索指定字符串。
```js
	var str="Hello world, welcome to the universe.welcome";
	var n=str.indexOf("welcome"); // =37
```
:::tip
识别空格，如果没有找到匹配的字符串则返回 -1。
:::

* `toLowerCase`把字符串转换为小写。
```js
string.toLowerCase()
```

* `toUpperCase`把字符串转换为大写。
```js
string.toUpperCase()
```

* `match`找到一个或多个正则表达式的匹配。该方法会返回一个数组，数组中包含了所有符合条件的文本。
```js
var str="The rain in SPAIN stays mainly in the plain"; 
var n=str.match(/ain/g); v//ain,ain,ain
```

* `replace`替换与正则表达式匹配的子串，并返回替换后的字符串，注意原字符串不会改变
```js
var str=document.getElementById("demo").innerHTML; 
var n=str.replace("Microsoft","Runoob");
// 替换值也可以写函数
str.replace('jaqi',($0,$1,$2)=>{console.log($0,$1,$2)})
```
replace中`$`的有特殊含义
| 字符 | 替换文本 |
| -------- |-------- |
| $0  | 匹配到的整个内容 |
| $1、$2、...、$99  | 第 1 到第 99 个原子组匹配的内容 |
| $&  | 匹配到的整个内容,和$0一样 |
| $`  | 匹配内容左侧的容 |
| $'  | 匹配内容右侧的容 |
:::tip
#### 替换全部
1. [replaceAll](/jaqi.note/frontend/javascript/ECMAScript/#_3-16-4-字符串扩展)
2. replace(/RegExp/g, str); //RegExp正则表达式
```js
    var str = "test-test-test".replace(/test/g, "ok");
```
:::

* `search`检索与正则表达式相匹配的值。查找与参数模式相匹配的文本，并返回该文本的位置。若无则返回null(indexOf会返回-1).与indexOf相似。
```js
var str="Visit Runoob!"; 
var n=str.search("Runoob"); //n=6
```

* `split`把字符串分割为字符串数组（参数可以是字符串或正则）
```js
string.split(","); //通过逗号分割，转成数组

`2020-09/12`.split(/[-\/]/); //通过 - / 分割，转成数组
```

* `trim`去掉字符串两端的多余空格。
```js
string.trim();
```
:::tip
需要注意的是，JavaScript的字符串是不可变的（immutable），String 类定义的方法都不能改变字符串的内容。像String.toUpperCase这样的方法，返回的是全新的字符串，而不是修改原始字符串。
:::