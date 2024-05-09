## 5.1 Ajax概述
Ajax(Asynchronous JavaScript + XML)：JavaScript和XML的异步数据交互方式。

## 5.2 异步数据交互方法
### 5.2.1 xhr(XMLHttpRequest)
1. 创建一个xhr对象
```js
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest(); // 高级浏览器
}else{
  xhr = new ActiveXObject("Microsoft.XMLHTTP");// IE6
} 
```
2. 发送请求参数
* 发送`GET`请求：
```js
/*  
设置请求参数：
第一个参数请求类型get/post
第二个参数请求路径（带参数的写法"php/do2.php?yhm="+yhm）
第三个参数是否使用异步
*/  
xhr.open("get","php/1.txt",true);

// 发送请求，get写null
xhr.send(null); 
```
* 发送`POST`请求：
```js

/* 
设置请求参数：
第一个参数请求类型get/post
第二个参数请求路径
第三个参数是否使用异步
*/  
xhr.open("post","php/do2.php",true);

// 设置请求头信息，post必填
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

// 发送请求(带参数写法"k=v&k=v")
xhr.send("xingming=along&age=30");
```
3. 监听返回
`readyState`返回值：   
> `0`→`open()`没有被调用    
> `1`→`open()`被调用    
> `2`→头部被服务器接收到    
> `3`→开始接收服务器返回的数据    
> `4`→完成
```js
xhr.onreadystatechange = function(){
  if (xhr.readyState == 4) {
    if(xhr.status>=200 &&xhr.status<300 || xhr.status ==304 ){
      content.innerHTML = xhr.responseText;
    }else{
      content.innerHTML = "服务器内部错误，稍后再试";
    }
  }
}
```


### 5.2.2 jQuery下的Ajax
```js
$.ajax(1.txt,{
"type":"get",//请求路径、请求类型
"data":{"k":v }, //传到服务器的数据
"success":function(data){},//回调函数
"error":function(xhr,textStatus,errorThrown){}//错误时的回调
},{})
```
### 5.2.3 jsonp
Jsonp(JSON with Padding) 是json的一种"使用模式"，可以让网页从别的域名（网站）那获取资料，即跨域读取数据。
它只支持GET请求，安全性差。
```json 
req({
  a:10,
  b:20
})
```
```js
<script src='api/1.json'></script>
<script>
function req(data){
  console.log(data.a,data.b)
}
</script>
```

### 5.2.4 fetch
```js
fetch(url,{
        method:'POST',
        headers:{
            'Content-type':'application/json'// 设置请求头数据类型
        },
        body:data
      })
      .then(res=>res.json())
      .then(data=>console.log(data))
```
### 5.2.5 axios
* `GET`请求
```js
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// 上面的请求也可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
``` 

* `POST`请求
```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## 5.3 HTTP请求常用方法

#### `GET`请求
`http://localhost/api/index?userName=123456&psw=123456`

* 优势：便于分享网址

* 不足：性能不高、数据内容不能太大，一般2000字符

#### `POST`请求
* 属性：
> 1.`enctype` 规定如何对表单数据进行编码。
>> `application/x-www-from-urlencoded`    
>> `multipart/form-data`：既可以上传键值对，也可以上传文件。    
>> `application/json`：可以上传任意格式的文本，可以上传text、json、xml、html等。    
>> `binary`：只可以上传二进制数据。

* 优势：安全、内容不限量

* 不足：地址不可以分享

#### 其他方法
* `HEAD`请求     
与`GET`方法相同，但没有响应体，仅传输状态行和标题部分
* `PUT`请求   
`PUT`方法用于将数据发送到服务器以创建或更新资源，它可以用上传的内容替换目标资源中的所有当前内容。
它会将包含的元素放在所提供的URI下，如果URI指示的是当前资源，则会被改变。如果URI未指示当前资源，则服务器可以使用该URI创建资源。
* `DELETE`请求    
`DELETE`方法用来删除指定的资源，它会删除URI给出的目标资源的所有当前内容。
* `CONNECT`请求   
`CONNECT`方法用来建立到给定URI标识的服务器的隧道；它通过简单的TCP / IP隧道更改请求连接，通常实使用解码的HTTP代理来进行SSL编码的通信（HTTPS）。
* `OPTIONS`请求   
`OPTIONS`方法用来描述了目标资源的通信选项，会返回服务器支持预定义URL的HTTP策略。
* `TRACE`请求   
`TRACE`方法用于沿着目标资源的路径执行消息环回测试；它回应收到的请求，以便客户可以看到中间服务器进行了哪些（假设任何）进度或增量。
## 5.4 常见问题

### 缓存问题
两次get、post请求同一个url携带的参数也一样，即使服务器返回状态码是200 也会被当做304那也缓存，这样会导致后台文件修改，前台内容没有变化


* 解决方案：
1. 加随机数："php/do2.php?x="+Math.random()

2. 时间挫：Date.parse(new.Date());



### 跨域问题
##### 域名的组成：      
协议+子域名+主域名+端口号+请求资源地址。`http://www.abc.com:8080/script/jquert.js`


##### 同源策略    
当协议、子域名、主域名、端口号中任意一个不同时，都算作跨域，


##### 解决方案：

* `jsonp`：只支持`GET`请求，原理是利用script标签请求不会触发同源策略，缺点是不安全XSS,
* `cors`：需要后台配合进行相关的设置
* `postMessage`：配合使用`iframe`，需要兼容IE6-9
* `document.domain`：仅限于同一域名下的子域
* `websocket`：需要后台配合修改协议，不兼容，需要使用`http://socket.io`
* `proxy`：使用代理去避开跨域请求，需要修改`nginx`、`apache` 等的配置


### 中文乱码
1. `encodeURIComponent`编码`decodeURIComponent`解码
2. `encodeURI`编码、`decodeURI`解码
`URIComponent`比`URI`编码的范围更大。
### 文件流转url
```js
let url = URL.createObjectURL(blob);
```
### `formData`表单序列化
```js
  var formdata = new FormData()
  formdata.append(key,value)
```