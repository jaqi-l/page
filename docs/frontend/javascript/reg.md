## 3.13.1基本概念

* 正则：处理字符串的一种规则。

* 正则匹配：验证当前字符串是否符合该规则的子串。

* 正则捕获：获取符合规则的字符。

* 正则定义

1. 正则字面量：`var reg=/\d/g;` (`\d` 表示元字符，`/`表示修饰符)

2. `new`创建：`var reg2 = new RegExp("\\d","g");`

* 使用变量拼接正则
> ```js 
> var name = "jaqi"
> // 'This note was written by <span style="A;">jaqi</span>'
> "This note was written by jaqi".replace(new RegExp(`\\b(${name})\\b`,'g'),`<span style="color:bule;">$1</span>`) 
> ```

::: warning new RegExp的正则对象连续使用问题
```js
// 在连续使用的时候lastIndex会指向前一个匹配元素的结尾
var urlReg = new RegExp(/^\d+$/g)
console.log(urlReg.lastIndex) // 0
console.log(urlReg.test("123456")) // true
console.log(urlReg.lastIndex) // 6
console.log(urlReg.test("123456"))  // false

// 解决方案 每次使用的时候重置lastIndex
var urlReg = new RegExp(/^\d+$/g)
urlReg.lastIndex=0
console.log(urlReg.lastIndex) // 0
console.log(urlReg.test("123456")) // true
urlReg.lastIndex=0
console.log(urlReg.lastIndex) // 0
console.log(urlReg.test("1234567")) // true
```
:::

## 3.13.2正则的组成

### 修饰符：
* `/`后的表示修饰符
> `g`全局匹配    

> `y`匹配连续满足条件的项
>> 每次匹配的起始位置字符必须满足匹配条件，否则不能连续执行，通常配合`lastIndex`使用

> `i`忽略大小写  

> `m`多行匹配   

> `u`匹配unicode(utf-8)主要用于多字节匹配比如汉字、特殊符号等
>> 主要用于多字节匹配比如汉字、特殊符号等 

> `s`忽略换行符   

### 元字符：
* `/ /`中的内容

### 特殊的元字符

* `\d` 0~9任意一个数字

* `\D` 非0~9之间的任意字符

* `\w` 字母、数字或者下划线

* `\W` 非字母、数字下划线

* `\s` 匹配任意一个空白字符（包括制表符tab键）

* `\S` 匹配任意一个非空白字符（包括制表符tab键）

* `\b` 单词边界（匹配单词的开始或结束位置）

* `\B` 非单词边界（匹配不在单词开始或结束位置的位置）

> ```js
> // 匹配单词word
> /\bword\b/.test('This is a word');    // true
> /\bword\b/.test('This is a 2word2');    // false
> 
> // 匹配非单词word（word前后有其他字符的单词）
> /\Bword\B/.test('This is a 2word2');    // true
> /\Bword\B/.test('This is a word');    // false
> ```

* `\n` 匹配一个换行符

* `\` 转义字符 可以把一个普通字符转换成特殊字符，也可以把特殊的转成普通的 (`\.`小数点)

* `.` 表示除了`\n`之外的任意字符

* `^` 以某个字符开头

* `$` 以某个字符结尾

* `a|b` a或者b任意个(a, b, ab)

### 量词元字符

* `*` 出现零到多次`→{0, }`

* `?` 出现零到一次`→{0, 1}`

* 量词+`?` 禁止贪婪，捕获最少的内容
```js
  `hdddd`.match(/hd{2,6}/)  //  hdddd
  `hdddd`.match(/hd{2,6}?/)  //  hdd
```

* `+` 出现一次到多次`→{1，}`

* `{m} `出现m次

* `{m,}` 出现至少m次

* `{m,n}` 出现m到n次

### 原子表`[]`

* `[abc]` a或b或c任意个

* `[^abc]` 除了a、b、c之外的

* `[a-z]` a到z任意一个字母`（[0-9]→\d）`

* `[^a-z] `a到z之外的任意字符

::: tip
1. 原子表`[]`内不会对特殊的元字符转译
2. 匹配所有`[\s\S]`或`[^]`
:::

### 原子组`()`
* `\n`原子组号：从左到右一个括号表示一组`\1`、`\2`、`\3`、`\4`，如果是嵌套的，先算里面的然后在继续算后面的
```js
// \1 代表第一个原子组 (h[1-6])
`<h1>awdawd</h1>`.match(/<(h[1-6])>([\s\S]*)<\/\1>/i)   

```
::: tip
使用原子组编号所匹配的一定是第一个原子组匹配的值
```js
// 原子组匹配的h1 那么通过原子组编号匹配的也是h1 所以返回null
`<h1>awdawd</h2>`.match(/<(h[1-6])>([\s\S]*)<\/\1>/i)   
```
:::

* `$n`用于在replace中获取原子组捕获的值：$原子组编号`$1`、`$2`、`$3`、`$4`
```js
// `$2`即是awdawd  <p>awdawd</p>
`<h1>awdawd</h1>`.replace(/<(h[1-6])>([\s\S]*)<\/\1>/i,`<p>$2</p>`)   
```

* `(?:)`不记录组编号捕获的值
```js
// `$2`无效 直接返回字符串 '<p>$2</p>'
`<h1>awdawd</h1>`.replace(/<(h[1-6])>(?:[\s\S]*)<\/\1>/i,`<p>$2</p>`)   
```

* `?<name>`原子组编号别名
```js
`<h1>awdawd</h1>`.replace(/<(h[1-6])>(?<nickname>[\s\S]*)<\/\1>/i,`<p>$<nickname></p>`)   
```

* `(?=)`前瞻<span style="color: red">*ES6新增</span>
```js
// a后面是5的a
'1a2a3a4a5a6a'.replace(/a(?=5)/,'替换'); //  1a2a3a4替换5a6a
// a后面是不是5的a
'1a2a3a4a5a6a'.replace(/a(?!5)/g,'替换'); // '1替换2替换3替换4a5替换6替换'
```

* `(?<=)`后瞻<span style="color: red">\*ES2018新增，除chrome以外大部分浏览器都不支持，谨慎使用！</span> 
```js
// a前面是5的啊
'1a2a3a4a5a6a'.replace(/(?<=5)a/,'替换'); //  1a2a3a4a5替换6a  

// a前面不是是5的啊
'1a2a3a4a5a6a'.replace(/(?<！5)a/,'替换'); //  1替换2替换3替换4替换5a6替换 

// 替换电话号码中级4位
'13800001110'.replace(/(?<=\d{3})(\d{4})/,'****'); // 138****1110
```
* `(?!)`反向预查
```js
// 英文后面不是数字
'jaqi13800001110yakamoz'.match(/[a-z]+(?!\d+)$/i); // yakamoz
```

## 3.13.3正则常用方法

### 正则相关方法
* `test`正则检测,返回true/false
```js
var reg = new RegExp(/\s/);
reg.test(str) 
```

* `exec`返回全部符合的元素数组（忽略`/g`），索引0为全部内容，1....99 为相应原子组匹配的内容
```js
var reg = new RegExp(/\s/);
reg.exec(str)
```

### 字符串相关方法

* `match`返回全部符合的元素数组，索引0为全部内容，1....99 为相应原子组匹配的内容
`match`如果不设置`/g`全局匹配，则返回原子组内容，否则只返回匹配的完整内容

* `matchAll`返回全部符合元素的迭代对象<span style="color: red">*ES2020(ES11)新增</span>

* `search`返回符合元素的索引（忽略`/g`）

* `replace`函数的返回值替换符合正则的元素 详见[3.9.1](/frontend/javascript/string#_3-9-1字符串string)

* `split`根据指定字符串对数组进行拆分
```js
`2020-09/12`.split(/[-\/]/); //通过逗号分割，转成数组
```
* `eval`

* `lastIndex`下次匹配的起始位置(只有全局匹配才有效)
```js
var str="The rain in Spain stays mainly in the plain";
var reg=/ain/g;

while (reg.test(str)==true) 
{
	document.write("'ain' found. Index now at: "+reg.lastIndex);
}

/**
 * 'ain' found. Index now at: 8
 * 'ain' found. Index now at: 17
 * 'ain' found. Index now at: 28
 * 'ain' found. Index now at: 43
 * /
```

## 3.13.4事例：

1. 以m开头 至少2个n 最多5个n
```js
var reg = /^mn{2,5}$/;
```
2. 6个5：
```js
var reg = /^5{6}$/;
```
3. 邮编：
```js
var reg = /^[0-9]{6}$/; 
```
4. 判断用户名字母数字下划线长度范围6~16：
```js
var reg = /^\w{6,16}$/;
```
5. 判断用户名字母数字下划线不能以数字开头长度范围6~16：
```js
var reg = /^[a-zA-Z_]\w{5,15}$/;
```
6. 至少6位密码
```js
var reg = /^.{6,}$/；
```
7. 要求输入网址必须是www.sina.com
```js
var reg = /^www\.sina\.com$/;/
```
8. 要求输入 8+9：
```js
var reg = /^8\+9$/;// 
```
9. 手机号码 以13开头或以15开头：
```js
var reg = /^1[35]\d{9}$/;  
//或
var reg = /^1(3|5)\d{9}$/;
//或
var reg = /^(13|15)\d{9}$/;
```
10. 请输入汉字（unicode范围）：
```js
var reg = /^[\u4e00-\u9fa5]+$/;
```
11. 18-65：
```js
var reg = /^((1[89])|([2-5][0-9])|(6[0-5]))$/; 
```
12. 邮箱：用户名是数字 字母 下划线 —
```js
var reg = /^[\w-]+@(\w+\.)+\w+/;
```
13. 书名号里面的标题
```js
/《([^《|》]*)》/
```
14. (〔 〕)查询法规标题
```js
/[（\(][a-zA-Z0-9\u4e00-\u9fa5]*?〔{1}.*?〕{1}[a-zA-Z0-9\u4e00-\u9fa5]*?[）\)]/
```

15. 多字节匹配
```js
/[αβ]/gu
```

15. 匹配各国文字
```js
/\p{sc=Han}/gu
```
::: warning 注意：
1. 中括号里面的字符绝大多数是普通的字符
2. 中括号出现的两位数 不是数学的两位数：[18-65]表示1或者8到6或者5
:::