# 3.3 WebSocket协议
HTTP协议有只能由客户端发起，如果想获取连续的状态变化，只能通过轮询的方式（轮询的效率低，非常浪费资源）    

WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了
它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种

## 3.3.1 特点
1. 建立在 TCP 协议之上，服务器端的实现比较容易    
2. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器    
3. 数据格式比较轻量，性能开销小，通信高效   
4. 可以发送文本，也可以发送二进制数据   
5. 没有同源限制，客户端可以与任意服务器通信   
6. 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL   

## 3.3.2 方法与属性
`readyState`：返回webSocket状态   
`onopen`连接成功后的回调    
`send`向服务器发送数据    
`onmessage`收到数据后的回调   
`onclose`连接关闭后的回调   
`bufferedAmount`返回为啥送的字节，用来判断是否发送结束    
`onerror`报错回调   

## 3.3.3 示例
```js
var ws = new WebSocket("wss://echo.websocket.org");

// 连接成功后的回调函数
ws.onopen = function(evt) { 
  ws.send("Hello WebSockets!");
};
// 收到服务器数据后的回调函数
ws.onmessage = function(evt) {
  ws.close();
};
// 连接关闭后的回调函数
ws.onclose = function(evt) {
  console.log("Connection closed.");
}; 
```
* 批量监听
```js
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});

ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});

ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});

```
## 3.3.4 WebSocket的几种状态
1. `CONNECTING`：0，表示正在连接    
2. `OPEN`：1，表示连接成功，可以通信了    
3. `CLOSING`：2，表示连接正在关闭   
4. `CLOSED`：3，表示连接已经关闭，或者打开连接失败    
```js
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
```
