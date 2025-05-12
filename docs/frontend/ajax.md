## 5.1 Ajax概述
Ajax(Asynchronous JavaScript + XML)：JavaScript和XML的异步数据交互方式    
使用Ajax技术网页应用能够快速地将增量更新呈现在用户界面上，而不需要重载（刷新）整个页面，这使得程序能够更快地回应用户的操作    

异步数据交互方法`Fetch`与`XMLHttpRequest`

## 5.2 `Fetch`与`XMLHttpRequest`
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

### 5.2.2 Fetch
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


### 两者的区别

|                     | xhr        | Fetch        |
| ------------------- | ---------- | ------------ |
| 原理                | 基于 Event | 基于 Promise |
| 兼容                | ✅          | ❌            |
| 模块化设计          | ✅          | ❌            |
| 监听请求进度        | ❌          | ✅            |
| 监听响应进度        | ✅          | ❌            |
| 中断请求            | ✅          | ✅            |
| CORS 控制           | ❌          | ✅            |
| 数据流操作          | ❌          | ✅            |
| 携带 Cookie         | ❌          | ✅            |
| 重定向处理          | ❌          | ✅            |
| 设置 Referrer       | ❌          | ✅            |
| 支持 Service Worker | ❌          | ✅            |


## 5.3 基于`xhr`的请求库

### 5.3.1 JQuery
```js
$.ajax('/user',{
  "type":"get",//请求路径、请求类型
  "data":{"k":v }, //传到服务器的数据
  "success":function(data){},//回调函数
  "error":function(xhr,textStatus,errorThrown){}//错误时的回调
},{})
```


### 5.3.2 axios

`Axios`是一个基于`promise(es6)`、`xhr`的HTTP库，可以用在浏览器和`node.js`

#### `GET`请求
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

#### `POST`请求
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

#### 执行多个并发请求
```js
function getUserAccount() {
  return axios.get('/user/12345');
}
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```

#### 请求配置
```js
{
  // `url` 是用于请求的服务器 URL
  url: '/user',
  // `method` 是创建请求时使用的方法
  method: 'get', // default
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: 'https://www.jaqi.top/api/',
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },
  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // qs表单序列化插件
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default
  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应
  adapter: function (config) {
    /* ... */
  },
  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },
  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default
  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
  // Do whatever you want with the native progress event
  },
  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
  // 对原生进度事件的处理
  },
  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default
  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default
  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

#### 响应结构
```js
{
  // `data` 由服务器提供的响应
  data: {},
  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,
  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',
  // `headers` 服务器响应的头
  headers: {},
  // `config` 是为请求提供的配置信息
  config: {},
  request: {}
}
```

#### 全局的默认值
```js
axios.defaults.baseURL = 'https://jaqi.gitee.io';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

#### 拦截器
* 请求拦截器
```js
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```
* 响应拦截器
```js
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

## 5.4 基于`Fetch`的请求库

### 5.4.1 `umi-request`

* `GET`请求
```js
import request from 'umi-request';

request
  .get('/api/v1/xxx?id=1')
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

// 也可将 URL 的参数放到 options.params 里
request
  .get('/api/v1/xxx', {
    params: {
      id: 1,
    },
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

* `POST`请求
```js
request
  .post('/api/v1/user', {
    data: {
      name: 'Mike',
    },
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

## 5.5 HTTP请求常用方法

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
用于将数据发送到服务器以创建或更新资源，它可以用上传的内容替换目标资源中的所有当前内容。
它会将包含的元素放在所提供的URI下，如果URI指示的是当前资源，则会被改变。如果URI未指示当前资源，则服务器可以使用该URI创建资源。
* `DELETE`请求    
用来删除指定的资源，它会删除URI给出的目标资源的所有当前内容。
* `CONNECT`请求   
用来建立到给定URI标识的服务器的隧道；它通过简单的TCP / IP隧道更改请求连接，通常实使用解码的HTTP代理来进行SSL编码的通信（HTTPS）。
* `OPTIONS`请求   
用来描述了目标资源的通信选项，会返回服务器支持预定义URL的HTTP策略。
* `TRACE`请求   
用于沿着目标资源的路径执行消息环回测试；它回应收到的请求，以便客户可以看到中间服务器进行了哪些（假设任何）进度或增量。


Web协议相关详见：[Web协议](/other/network/introduction)
## 5.6 常见问题

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

* `jsonp`：只支持`GET`请求，原理是利用script标签请求不会触发同源策略，缺点是不安全XSS   
> JSONP 是一种非官方的跨域数据交换协议，通过动态添加一个 `script` 标签来调用跨域接口
> 它只支持GET请求，安全性差   
> ```json 
> req({
>   a:10,
>   b:20
> })
> ```
> ```js
> <script src='api/1.json'></script>
> <script>
> function req(data){
>   console.log(data.a,data.b)
> }
> </script>
> ```
* `cors`：需要后台配合进行相关的设置
* `postMessage`：配合使用`iframe`，需要兼容IE6-9
* `document.domain`：仅限于同一域名下的子域
* `websocket`：需要后台配合修改协议，不兼容，需要使用`http://socket.io`
* `proxy`：使用代理去避开跨域请求，需要修改`nginx`、`apache` 等的配置


### 中文乱码

#### 1. `escape`<span style="color: red">*已弃用</span>

- **功能**：对字符串进行编码，使字符串在所有计算机上可读。编码后的效果是%XX或%uXXXX这种形式   
- **编码范围**：除了ASCII字母、数字和特定符号（如`@*_±./`）外，其他字符都会被编码   
- **使用场景**：由于`escape`函数主要用于对字符串进行编码，而不是对URL进行编码，因此在实际需要对URL进行编码时，应避免使用此方法
- **解码方法**：`unescape`

#### 2. `encodeURI`
- **功能**：对URI（统一资源标识符）进行编码   
- **编码范围**：不会对ASCII字母、数字和一些特定标点符号（如`~!@#$&()=:/,;?+'`）进行编码。同时，也不会对在URI中具有特殊含义的ASCII标点符号（如`;😕?@&=+$,#`）进行编码    
- **使用场景**：当需要编码整个URI，并且希望URI中的合法字符保持原样时，应使用encodeURI函数。例如，当需要将一个网址作为字符串传递给另一个页面或API时，可以使用`encodeURI`对该网址进行编码   
- **解码方法**：`decodeURI`

#### 3. `encodeURIComponent`

- **功能**：对URI组件进行编码   
- **编码范围**：不会对ASCII字母、数字和一些特定标点符号（如`~!.'()`）进行编码。但会对其他用于分隔URI组件的标点符号（如`:;/?@&=+$,#`）进行编码   
- **使用场景**：当需要将URI的某个组件（如查询字符串中的参数）进行编码，以确保该组件在URI中安全传输时，应使用`encodeURIComponent`函数。例如，在构建包含查询参数的URL时，可以使用`encodeURIComponent`对参数值进行编码
- **解码方法**：`decodeURIComponent`

::: tip
1. `escape`函数主要用于对字符串进行编码，不适用于URL编码    
2. `encodeURI`函数用于编码整个URI，保持URI中的合法字符不变    
3. `encodeURIComponent`函数用于编码URI的单个组件，确保组件在URI中安全传输   
:::

### 文件流转url
```js
let url = URL.createObjectURL(blob);
```
文件转码相关详见：[文件系统](/frontend/javascript/File)
### `formData`表单序列化
```js
var formdata = new FormData()
formdata.append(key,value)
```

## 5.7 Alova

* 基于 `Fetch`/`XMLHttpRequest`封装请求库，用户可以自由根据需要选择使用`Fetch`或`XMLHttpRequest`两种方案
* 继承了 `axios` 的大部分功能，支持 `Promise` 和 `async/await` 语法，支持 `TypeScript`，并且可以在浏览器和 `Node.js` 中使用
* 还提供了更强大的功能，如请求拦截器、响应拦截器、请求取消、请求重试、请求超时、请求合并、请求重定向、请求状态管理、请求重试等功能

#### 初始化
```js
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
const alovaInstance = createAlova({
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
``` 
#### `GET`请求
```js
const response = await alovaInstance.Get('/user?ID=12345',{
  timeout: 10000, // 超时时间
   shareRequest: false, // 请求共享
    cacheFor: 0 // 响应缓存时间 s
});
```

#### `POST`请求
```js
const response = alovaInstance.Post('/user', {
  title: 'foo',
  body: 'bar',
  userId: 1
});
```

[Alova.js](https://alova.js.org/zh-CN/)

