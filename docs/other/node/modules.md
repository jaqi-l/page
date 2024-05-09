    
## 7.2.1 创建服务器；响应请求(`http`)
请求参数的属性   
> `req.url`:返回请求路径    
> `req.method`:返回请求方式  
> `req.headers`:返回请求头    
> `req.on`:添加请求的监听事件   
>> `req.on("data",callback)`监听每次请求来的数据    
>> `req.on("end",callback)`监听数据接收结束事件   
>> `req.on("error",callback)`监听请求接收错误事件   

响应参数的属性     
> `res.writeHead`:设置响应头（响应的的参数）       
> `res.setHeader`:设置响应头（ 参数1：状态码，参数2：响应的的参数）        
> `res.write`:设置响应内容    
> `res.end`: 结束本次请求   
```js
const http = require("http");// 引用http模块

//创建一个响应请求服务 一旦有请求过来 函数就执行
let server = http.createServer(function(req,res) { // req请求 res响应

  // 处理请求
  let url = req.url // 请求路径 可以获取get请求的参数

  let arr = []
  // 监听请求来data post请求是分段请求的，因此需要监听数据
  req.on("data",function(buffer){arr.push(buffer)}) // 监听数据，把每次请求的数据存起来
  req.on("end",function(){
    let  buffer = Buffer.concat(arr)
    console.log(buffer.toString())
  }) // 监听数据接收结束事件   并把二进制数据转换成字符串

  // 设置响应
  res.writeHead(200, {'Content-Type': 'text/plain'}); // 状态码

  res.write(url); 
  res.write("<h1>hello</h1>");
  
  res.end(); // 结束本次请求  结束后不能再发响应
});

server.listen(8000);//监听等待客户端的连接
```
::: tip
* `res.writeHead`与`res.setHeader`区别    
> 1. `res.writeHead`必须在`res.end`之前调用   
> 2. 如果两者同时存在（没必要），要先写`res.setHeader`，后写`res.writeHead`，且`res.writeHead`优先
* 处理跨域问题`Access-Control-Allow-Origin`,
> 1. `res.setHeader("access-control-allow-origin","*")` 允许全部 
> 2. `res.writeHead(200, {"access-control-allow-origin","www.jaqi.com"})`    
:::
## 7.2.2 文件系统模块(`fs`)    
文件的读取修改创建
`fs`的属性    
> `fs.readFile`:读取文件（浪费服务器资源）    
> `fs.readFileSync`:同步读取文件    
> `fs.writeFile`:读取文件   
> `fs.writeFileSync`:同步读取文件   
> `fs.createReadStream`:流式操作（创建一个读取流）  
> `fs.createWriteStream`:流式操作（创建一个写入流）   
> `fs.existsSync`:路径是否存在   
> `pipe()`流式操作（执行流，通过管道对文件进行操作）
```js
const http = require("http");
const fs = require("fs");// 引用fs模块
// 修改文件并读取
let server = http.createServer(function(req,res) {
    fs.writeFileSync("./1.txt","新的内容",function(err){ // 1.txt文件写入新的内容
      if(err){
        console.log(err)
      }
    })
    // 根据req.url动态读取文件
    fs.readFile(`./${req.url}`,function(err,data){ // 第二个参数 data返回字符串、buffer：返回二进制数据
      if(err){
         res.write(JSON.stringify({error:404,msg:err}))
      }else{
        res.write(data); 
        res.end();
      }
    })
});

server.listen(8000);
```
`fs.readFile`浪费服务器内存、资源使用不均匀，推荐使用`流式操作`（读一个发一个）

* `流式操作`
```js
const fs = require("fs");// 引用fs模块

let readFile = fs.createReadStream("a.txt") // 创建一个读取流
let writeFile = fs.createWriteStream("a_copy.txt") // 创建一个写入流

readFile.on("error",(err)=>{
  console.log()
})

writeFile.on("finish",()=>{
  console.log("finish")
})

readFile.pipe(writeFile) // 通过管道对文件进行操作
```

## 7.2.4 文件压缩模块(`zlib`) 

```js
const fs = require("fs");// 引用fs模块
const zlib = require("zlib");// 引用zlib模块

let readFile = fs.createReadStream("a.txt") // 创建一个读取流
let GzipFile = zlib.createGzip() // 创建压缩流
let writeFile = fs.createWriteStream("a.txt.gz") // 创建一个写入流


readFile.pipe(GzipFile).pipe(writeFile) // 执行流 压缩文件并写入
```

## 7.2.5 查询字符串模块(`querystring`)   
`querystring`的属性   
> `querystring.parse`:默认根据`&`、`=`将字符串转成对象    
> `querystring.stringify`:默认根据`&`、`=`将对象转成字符串    

```js
const querystring = require("querystring");// 引用querystring模块
let obj = querystring.parse('foo=bar&baz=qux&baz=quux&corge')
// obj = { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
let str = querystring.stringify(obj)
// str = 'foo=bar&baz=qux&baz=quux&corge'
```
### 7.2.6 缓冲器(`Buffer`) 
`Buffer`的属性      
> `Buffer.alloc`:返回一个指定大小的Buffer实例   
> `Buffer.from`:根据传入的参数创建一个Buffer实例    
> `Buffer.toJSON`: 将Buffer转换为JSON对象      
> `Buffer.toString`编码转换      
>> `Buffer.toString('ascii')`:ASCII编码，仅支持7位    
>> `Buffer.toString('Buffer.utf8')`: 多字节编码的Unicode    
>> `Buffer.toString('Buffer.utf16le')`: 2或4个字节的Unicode   
>> `Buffer.toString('Buffer.ucs2')`: utf16le的别名    
>> `Buffer.toString('Buffer.base64')`: Base64编码   
>> `Buffer.toString('Buffer.latin1')`: 一种把Buffer编码成一字节编码的字符串的方式   
>> `Buffer.toString('Buffer.binary')`: latin1的别名   
>> `Buffer.toString('Buffer.hex')`: 将每个字节编码为两个十六进制字符        

```js
const querystring = require("querystring");// 引用querystring模块
let obj = querystring.parse('foo=bar&baz=qux&baz=quux&corge')
// obj = { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
let str = querystring.stringify(obj)
// str = 'foo=bar&baz=qux&baz=quux&corge'
```
## 7.2.7 请求路径处理方法(`url`)   
`url`的属性
> `url.parse`:将一个url的字符串解析成对像   
> `url.format`:将一个url的对像解析成字符串    
> `url.resolve`:将一个url解析成"from/to"格式的字符串    

```js
const http = require("http");
const fs = require("url");// 引用url模块
// 修改文件并读取
let server = http.createServer(function(req,res) {
  url.parse(req.url)
  res.write(data); 
  res.end();
});

server.listen(8000);
```
## 7.2.8 文件路径处理方法(`path`)与魔术变量(`__dirname`)
`path`的属性
> `path.dirname`:返回文件的目录，不包括文件    
> `path.extname`:返回文件的扩展名    
> `path.basename`:返回文件的文件名（包括扩展名）    
> `path.resolve`:分析并拼接路径

```js
const path = require("path")

let pathUrl = "/a/b/c/1.html";

path.dirname(pathUrl);// /a/b/c

path.extname(pathUrl);// .html

path.basename(pathUrl);// 1.html

/*
/root/a/b ->  /root/a/b
../c  ->  /root/a/c
d  ->  /root/a/c/d
..  ->  /root/a/c
e  ->  /root/a/c/e
（.当前目录 .. 上级 ...上上级）
*/
path.resolve("/root/a/b","../c","d","..","e");

path.resolve(__dirname,"www"); // 魔术变量将绝对路径替换成www
``` 
## 7.2.9 断言(`assert`)
`assert`的属性
> `assert`:判断表达式正确与否   
> `assert.equal`:比较两个值相不相等，相当于`==`（不支持数组、json）      
> `assert.deepEqual`:比较两个表达式相不相等，相当于`==`    
> `assert.deepStrictEqual`:比较两个表达式相不相等，相当于`===`        
```js
const assert = require("assert");

assert(10>19,"达式3") // 如果表达式错误则返回达式3

assert.equal(1,1)// 比较两个值相不相等（不支持数组、json） 

assert.deepEqual(1,"1","达式3"); // 如果两个表达式不相等则返回表达式3，相当于==

assert.deepStrictEqual（1,"1","达式3"） // 如果两个表达式不相等则返回表达式3，相当于===
```

