# 3.2 HTTP/1.1协议
## 3.2.1 http协议
一种无状态的，应用层的，以请求/应答方式运行的协议。建立在TCP协议之上，它可以使用可扩展的语义和自描述消息格式。与基于网络的超文本信息系统灵活互动。（RFC723 2014.6）
### 特点：
* 传输协议实际是交给TCP协议来完成的
* 无状态：并不会存储用户的信息；如果连接意外断开，整个会话就会丢失，重新连接之后一般需要从头开始
* 请求/应答：一次请求对应一次响应
* 可扩展：可以自定义扩展一些head字段等
* 自描述： 消息体可以是音频视频、文本、图片等（Content-type）

## 3.2.2 https协议
由于HTTP天生“明文"的特点,整个传输过程完全透明,任何人都能够在链路中截获、修改或者伪造请求/响应报文,数据不具有可信性。因此就诞生了为安全而生的HTTPS协议使用HTTPS时，所有的HTTP请求和响应在发送到网络之前，都要进行加密。

https利用摘要算法、对称加密算法、非对称加密算法来完成的

##  3.2.3 基于ABNF语义定义的HTTP消息格式

##  3.2.4 浏览器发起http请求的过程
![浏览器发起http请求的过程](/浏览器发起http请求的过程.png)

## 3.2.5 使用Chrome的Network面板分析HTTP报文
###  Network面板构成：控制器、过滤器、概览、请求列表、概要
1. 控制器：     
 > 抓包/停止抓包、清除请求、保留日志（Preserve log）、屏幕截图（Capture screenshots）、重新执行XHR请求、替换请求体、修改请求头、停用浏览器缓存(Diaable cache)、手动清理缓存（cache）、手动清理缓存（cookie）、离线模式、模型网速、        
2. 过滤器：
> * 根据类型过滤：XHR、JS、Img、Media、Font、Doc、WS(WebSocket)、Mainifest、Other     
> * 多类型过滤：Ctrl/Command+单击根据多个类型过滤     
> * 按照时间过滤：  
> * 过滤BASE64的请求：Data URLs   
> * 根据属性过滤filter：domain（指定域）、has-response-header（指定响应头）、is:running（websocker）、is:from-cache(缓存)、larger-than（资源大小）、method（请求类型）、mime-type（MIME资源类型）、status-code（状态码）、set-cookoe-name/domain/value（具有set-cookoe标头的域/名称/值）、scheme(具有https保护的)、mixed-content（显示所有混合内容的资源），显示状态吗为200的"`status-code:200`"
> * 反向过滤：`-` + `过滤属性`，显示状态码不为204的"`-status-code:204`"
3. 概览：
4. 请求列表：
> 请求列表排序：
>> * 按照活动时间排序Waterfall：Start Time（第一个请求开始的）、Response Time（第一个开始下载的）、End Time（完成的第一个请求）、Total Duration（连接设置时间和请求、相应最快的请求）、Latency（等待最短响应时间的）      
>> * 请求发起方式Initiator:Parser（html解析器发起的）、Redirect（HTTP重定向发起的）、Script（JS脚步发起的）、Other（用户点击、地址栏输入地址等） 

> 预览请求详情:
>> * 头部Headers:     
>> * cookie       
>> * 预览响应正文Preview   
>> * 查看响应正文Response   
>> * 时间详情分布timing:Queueing（请求正在排队）、Stalled（请求被终止）、DNS Lookup（解析地址）、Proxy Negotiation（正在与代理服务器协商请求）、Requst sent（正在发送请求）、ServiceWorker Preparation（浏览器正在启动Service Worker ）、Request to ServiceWorker（浏览器正将请求发送到Service Worker） Waiting（浏览器正在等待响应的第一个字节）、Content Download（浏览器正在接收响应） Receiving Push（浏览器正在通过HTTP/2服务器推送接收此响应的数据）、 Reading Push（浏览器正在读取之前收到的本地数据） 
>> * 请求的上下游:shift键+鼠标悬停  
     
> 查看请求的上下游:shift+鼠标悬停，红色下游、绿色上游 
5. 概要：请求总数，总数据量，DOM加载时间，总加载时间：

::: tip
[Chrome Devtools 原理](https://mp.weixin.qq.com/s/QHE32rzlZHqp1yWMfxaC9A?poc_token=HFkuFWWjbIDUA1eitIyB_IEKINDBeduRjVcbBH0-)    
[Chrome Developers](https://developer.chrome.com/)
:::

## 3.2.6 `URI`、`URL`、`URN`概念

URI = Uniform Resource Identifier 统一资源标志符    
URL = Uniform Resource Locator 统一资源定位符   
URN = Uniform Resource Name 统一资源名称（没流行起来，导致几乎目前所有的`URI`都是`URL`）    

`URI`是抽象的定义,不管用什么方法表示，只要能定位一个资源，就叫`URI`.用地址定位叫`URL`，用名称定位叫`URN`

### `URI`的组成   
`scheme`(协议)-`user`(用户名/密码)-`host`(域名)-`port`(端口)-`path`(文件路径/文件名)-`query`(查询字符串)-`fragment`(片段标识符)

- **`scheme`**：协议类型，http、https、ftp、mailto、telnet等    
- **`user`**：用户名和密码，格式为`username:password@`，可选    
- **`host`**：主机名，IP地址或域名    
- **`port`**：端口号，http默认80端口,https默认443端口,可省略    
- **`path`**：文件路径，表示资源在服务器上的位置    
- **`query`**：查询字符串，表示请求参数，格式为`key1=value1&key2=value2`    
- **`fragment`**：片段标识符，表示资源的某个部分，格式为`#fragment`，可选   


## 3.2.7 HTTP请求行
HTTP版本：0.9（只支持get方法）、1.0 （常用代理服务器例如nginx默认配置）1.1（1999年发布）、2.0(2015年发布)
HTTP常见方法：
> `GET`：主要的获取信息方法，幂等方法     
> `HEAD`：类似于GET，但服务器不发送body，用以获取HEAD元数据，幂等方法     
> `POST`：常用于表单，和新增资源      
> `PUT`：常用于更新资源，带条件时是幂等方法       
> `DELETE`：删除资源，幂等方法        
> `CONNECT`：建立tunnel隧道       
> `OPTIONS`：显示服务器对访问资源支持的方法，幂等方法     
> `TRACE`：回显服务器收到的请求，用于定位问题。有延期风险。（nginx不支持）
::: tip
幂等方法：调用一次和调用多次结果一致。
:::

## 3.2.8 HTTP包体
## 3.2.9 HTTP响应行
HTTP响应码：
> * 1xx：请求已收到，需要进一步处理
>> 100：上传大文件前使用
>> 101：协议升级使用
>> 102：用于WebDAV请求、服务器已收到，需要很长一段时间完成。

> * 2xx：成功处理的请求
>> 200：成功返回响应
>> 201：有新资源在服务器端被创建
>> 202：服务器接收并开始处理请求，单请求未处理完成。
>> 203：告诉客户端代理服务器修改了原服务器的数据。
>> 204：成功的执行了请求，但不响应包体。暗示客户端无需更新视图。
>> 205：成功的执行了请求，但不响应包体。提示客户端需要更新视图。
>> 206：range协议时返回部分响应内容时的响应码。
>> 207：WebDev协议中以XML返回多个资源的状态。
>> 208：WebDev协议中父集合的响应码

> * 3xx：重定向,次数不超过5次
>> 300：告诉客户端自行选择访问方式
>> 301：永久重定向
>> 302：临时重定向
>> 303：重定向到其他资源
>> 304：缓存过期
>> 307：
>> 308：

> * 4xx：客户端出现错误
>> 400：服务端认为客户端出现了错误，且不属于以下错误类型。。
>> 401：用户认证信息不正确或缺失。
>> 407：对需要经由代理的请求，认证信息未通过代理服务器。
>> 403：没有权限
>> 404：没有找到对应资源
>> 410：没有找到对应资源，且知道资源永久性的找不到。
>> 405：服务器不支持改请求方法。
>> 406：对客户端指定的资源表述不存在。
>> 408：服务器接收请求超时。
>> 409：资源冲突。
>> 411：请求中有包体，未携带Content-length头部，且不属于chunk类请求。
>> 412：条件类请求，不满足时
>> 413：包体超出最大长度
>> 414：请求的URI超长
>> 415：上传的文件类型不被服务器支持
>> 416：无法提供range请求中指定的那段包体
>> 417：对Expect请求头部期待的情况无法满足时的相应码
>> 421：服务器认为请求不应该发给它
>> 426：服务器拒绝基于http协议提供服务
>> 428：用户请求中缺失了条件类头部
>> 429：发送请求速率过快
>> 431：请求的header头部大小超过限制
>> 451：由于法律渊源资源不可以访问

> * 5xx：服务端出现错误
>> 500：服务器内部出现错误，且不属于以下错误类型。
>> 501：不支持实现请求所需要的功能。
>> 502：代理服务器无法获取到合法请求。
>> 503：服务器资源尚未准备好处理当前请求。
>> 504：代理服务器无法及时的从上游获取相应。
>> 505：请求使用的http协议版本不支持。
>> 507：服务器没有足够的空间处理请求。
>> 508：访问资源时检测到循环
>> 511：代理服务器发现客户端需要进行身份验证才能获得网络访问权限。

## 3.2.10 响应与请求上下文
`User-Agent`:客户端类型信息     
`Referer`:浏览器告诉服务器该网页是从哪个页面链接过来的（常用于处理防盗链、统计分析、缓冲优化等）        
`Form`:用于网络爬虫，告诉服务器爬虫信息     
`Server`:告诉客户端，服务器上用的软件信息       
`Allow`:告诉客户端，服务器支持的请求方法    
`Transfer-Encoding`:包体的传输方式    
`Connection`:约定服务端返回后是否关闭TCP连接（用于多次HTTP之间重用同一个TCP连接）
`Content-Type`:定义网络文件的类型和网页的编码             
### 内容协商：
* Proactive（主动内容协商）     
* Reactive（响应式内容协商）        
`Accept`        
`Accept-Encoding`:压缩算法      
`Accept-Language`:语言、质量（质量因子q）
### Ranges规范（用于断点续传、多线程下载）：
`Accept-Ranges`:设置Range头信息
`Content-Ranges`   
::: tip
利用http重定向https可以跳过防盗链
:::

## 3.2.11 会话跟踪技术
###  会话跟踪技术：    
会话：从打开页面到关闭页面      
跟踪：客户端与服务器多次请求数据，时进行数据共享

目的是解决http协议无状态的问题
### `Cookie`
通过检查客服端上的“通行证”来确认客户身份    
**存储位置**：客户端（浏览器）    
**工作原理**：客户端首次请求服务器，服务端返回一个`Cookie`通行证，当客户端携带`Cookie`通行证并再一次发送请求时，服务端检查`Cookie`来确认客户身份    
**应用场景**：常用于保存用户偏好（如主题设置）、记录会话 ID（配合 Session 使用）、实现简单的身份验证（不推荐用于敏感信息）    
**优点**：
> * 实现起来较为简单，服务器端可以直接读取，适合保存一些非敏感信息    
  

`set-cookie`
set-cookie:value [;expires=date][;domain=domain][;path=path][;secure][;HttpOnly] 
 > expires过期时间、domain域名、path路径、secure必须是https、HttpOnly不允许修改
```js
  document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/admin secure HttpOnly";
  response.addHeader("Set-Cookie", "timeout=30; Path=/admin; secure HttpOnly");
```

### `Session`
通过检查服务端上的“客户表”来确认客户身份    

**存储位置**：服务器端    
**工作原理**：服务器为每个用户创建一个唯一的 `Session ID`，并将其以 `Cookie` 的形式发送给客户端。客户端后续的请求都会携带这个 `Session ID`，服务器通过它来查找对应的会话数据    
**应用场景**：用于保存用户的登录状态、购物车信息等敏感数据    
**优点**：
> * 安全性比 `Cookie`高，适合存储敏感信息    
> * 存储大小没有上限    

**缺点**：    
> * 难以在分布式系统中实现    
> * 依赖 `Cookie`，如果用户禁用 `Cookie`，Session 就会失效    

### `Token`
`Token`是无状态的，是服务端生成的一串字符串，以作客户端进行请求的一个令牌，当第一次登录后，服务器生成一个`Token`并返回给客户端，以后客户端只需带上这个`Token`前来请求数据即可，无需再次带上用户名和密码。

**存储位置**：客户端（通常存放在 LocalStorage、SessionStorage 或者请求头中）    
**工作原理**：客户端通过用户名和密码向服务器进行身份验证，服务器生成一个签名的 `Token` 并返回给客户端。客户端在后续请求时携带这个 `Token`，服务器去验证签名和过期时间 `Token` 的有效性    
**应用场景**：RESTful API 的无状态身份验证（如 JWT）、第三方登录（如 OAuth）、前后端分离的应用    
**优点**：
> * 无状态，便于扩展，可以在分布式系统中使用    
> * 可以避免 CSRF 攻击    
> * 支持跨域访问     

**缺点**：
> * Token 体积较大，会增加网络请求的流量    
> * 如果存储在 LocalStorage 中，存在 XSS（跨站脚本攻击）的风险    
> * 一旦 Token 被泄露，可能会被冒用   


### `Cookie`、`Session`、`Token`的区别
| **特性**     | **Cookie**               | **Session**                  | **Token**                    |
| ------------ | ------------------------ | ---------------------------- | ---------------------------- |
| **存储位置** | 客户端                   | 服务器端                     | 客户端                       |
| **状态性**   | 有状态（依赖服务器存储） | 有状态（依赖服务器存储）     | 无状态（数据包含在Token中）  |
| **安全性**   | 低（易受CSRF攻击）       | 中（依赖Session ID的安全性） | 高（使用签名和加密）         |
| **扩展性**   | 差（依赖服务器会话）     | 差（依赖服务器会话）         | 好（无状态，适合分布式系统） |
| **跨域支持** | 不支持                   | 不支持                       | 支持                         |
| **典型应用** | 用户偏好、简单会话跟踪   | 用户登录状态、购物车         | API身份验证、第三方登录      |

::: tip
身份验证技术与浏览器缓存的交叉点
1. `Session`、`Token` 通常情况下存在浏览器的`Cookie`中
2. `sessionStorage`、`localStorage`通常情况不建议直接存储敏感数据
:::


## 3.2.12 同源策略与跨域访问
限制不同源的对象或js脚本互相影响

同源：`“协议+子域名+主域名+端口号+请求资源地址”`完全一致

`CORS`跨域资源共享
* 简单请求
1. 请求方法：`HEAD`、`GET`、`POST`、
2. HTTP的头信息不超出以下几种字段：`Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`、
`Content-Type（application/x-www-form-urlencoded、multipart/form-data、text/plain）`
* 非简单请求
凡是不同时满足上面简单请求，就属于非简单请求

### 简单请求跨域访问：
设置Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）
如果Origin指定的域名在许可范围内，服务器会返回一下信息:
> `Access-Control-Allow-Origin`:返回请求时Origin字段的值，或者是*，表示接受任意域名的请求
> `Access-Control-Allow-Credentials`: 返回是否允许发送Cookie
> `Access-Control-Expose-Headers`: 返回


### 非简单请求跨域访问：
* 预检请求
* 预检请求的回应
