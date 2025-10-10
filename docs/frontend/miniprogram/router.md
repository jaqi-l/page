# 8.6 路由

## 8.6.1 路由方法

### wx.navigateTo(Object object)
保留当前页面，跳转到应用内的某个页面。不能跳转到 tabBar 页面。

**参数：**
- `url` (string) - 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数
- `success` (function) - 接口调用成功的回调函数
- `fail` (function) - 接口调用失败的回调函数
- `complete` (function) - 接口调用结束的回调函数

**示例：**
```js
wx.navigateTo({
  url: '/pages/detail/detail?id=1&name=test',
  success(res) {
    console.log('跳转成功')
  },
  fail(err) {
    console.log('跳转失败', err)
  }
})
```

### wx.redirectTo(Object object)
关闭当前页面，跳转到应用内的某个页面。不能跳转到 tabBar 页面。

**参数：**
- `url` (string) - 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数
- `success` (function) - 接口调用成功的回调函数
- `fail` (function) - 接口调用失败的回调函数
- `complete` (function) - 接口调用结束的回调函数

**示例：**
```js
wx.redirectTo({
  url: '/pages/login/login'
})
```

### wx.reLaunch(Object object)
关闭所有页面，打开到应用内的某个页面。

**参数：**
- `url` (string) - 需要跳转的应用内页面路径，路径后可以带参数
- `success` (function) - 接口调用成功的回调函数
- `fail` (function) - 接口调用失败的回调函数
- `complete` (function) - 接口调用结束的回调函数

**示例：**
```js
wx.reLaunch({
  url: '/pages/index/index'
})
```

### wx.switchTab(Object object)
跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。

**参数：**
- `url` (string) - 需要跳转的 tabBar 页面的路径，路径后不能带参数
- `success` (function) - 接口调用成功的回调函数
- `fail` (function) - 接口调用失败的回调函数
- `complete` (function) - 接口调用结束的回调函数

**示例：**
```js
// app.json 配置
{
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/profile/profile", 
      "text": "我的"
    }]
  }
}

// 跳转到 tabBar 页面
wx.switchTab({
  url: '/pages/index/index'
})
```

### wx.navigateBack(Object object)
关闭当前页面，返回上一页面或多级页面。

**参数：**
- `delta` (number) - 返回的页面数，如果 delta 大于现有页面数，则返回到首页
- `success` (function) - 接口调用成功的回调函数
- `fail` (function) - 接口调用失败的回调函数
- `complete` (function) - 接口调用结束的回调函数

**示例：**
```js
// 返回上一页
wx.navigateBack({
  delta: 1
})

// 返回多级页面
wx.navigateBack({
  delta: 2
})
```

### wx.rewriteRoute(Object object)
重写当前页面路由，用于自定义路由逻辑。

**参数：**
- `route` (string) - 重写的路由路径
- `success` (function) - 接口调用成功的回调函数
- `fail` (function) - 接口调用失败的回调函数
- `complete` (function) - 接口调用结束的回调函数

**示例：**
```js
// 重写当前页面路由
wx.rewriteRoute({
  route: '/pages/custom/custom',
  success(res) {
    console.log('路由重写成功')
  },
  fail(err) {
    console.log('路由重写失败', err)
  }
})
```

**使用场景：**
- 动态修改页面路由
- 自定义路由逻辑
- 路由拦截和处理

## 8.6.2 页面参数传递

### 传递参数
```js
// 页面跳转时传递参数
wx.navigateTo({
  url: '/pages/detail/detail?id=1&name=test&type=product'
})
```

### 接收参数
```js
// 在目标页面的 onLoad 中接收参数
Page({
  onLoad(options) {
    console.log(options.id)      // "1"
    console.log(options.name)    // "test"
    console.log(options.type)    // "product"
  }
})
```

## 8.6.3 `getCurrentPages`页面栈管理

### 获取当前页面栈
```js
const pages = getCurrentPages()
const currentPage = pages[pages.length - 1]  // 当前页面
const prevPage = pages[pages.length - 2]     // 上一个页面
```

### 页面栈限制
- 小程序最多只能打开10个页面
- 当页面栈达到10层时，再调用 `wx.navigateTo` 会失败

### 触发上一页方法
通过 `getCurrentPages` 可以获取页面栈中的页面实例，从而调用上一页的方法或修改上一页的数据。

```js
// 获取页面栈
const pages = getCurrentPages()
const currentPage = pages[pages.length - 1]  // 当前页面
const prevPage = pages[pages.length - 2]     // 上一个页面

// 调用上一页的方法
if (prevPage && prevPage.updateData) {
  prevPage.updateData('来自当前页面的数据')
}
```

## 8.6.4 路由事件

### 应用路由事件

**wx.onBeforeAppRoute(function listener)**
- **功能**：监听应用路由即将发生事件
- **参数**：`listener` - 路由事件的监听函数
- **回调参数**：`res` 对象包含路由相关信息

**wx.offBeforeAppRoute(function listener)**
- **功能**：取消监听应用路由即将发生事件
- **参数**：`listener` - 要取消的监听函数

**wx.onAppRoute(function listener)**
- **功能**：监听应用路由事件
- **参数**：`listener` - 路由事件的监听函数
- **回调参数**：`res` 对象包含路由相关信息

**wx.offAppRoute(function listener)**
- **功能**：取消监听应用路由事件
- **参数**：`listener` - 要取消的监听函数

**wx.onAppRouteDone(function listener)**
- **功能**：监听应用路由完成事件
- **参数**：`listener` - 路由事件的监听函数
- **回调参数**：`res` 对象包含路由相关信息

**wx.offAppRouteDone(function listener)**
- **功能**：取消监听应用路由完成事件
- **参数**：`listener` - 要取消的监听函数

### 页面路由事件

**wx.onBeforePageUnload(function listener)**
- **功能**：监听路由事件引起现有页面实例销毁时，页面实例销毁前的事件监听
- **参数**：`listener` - 路由事件的监听函数
- **回调参数**：`res` 对象包含 `path`(页面路径)、`routeEventId`(路由事件id)、`page`(页面实例)

**wx.offBeforePageUnload(function listener)**
- **功能**：取消监听页面即将卸载事件
- **参数**：`listener` - 要取消的监听函数

**wx.onBeforePageLoad(function listener)**
- **功能**：监听页面即将加载事件
- **参数**：`listener` - 路由事件的监听函数
- **回调参数**：`res` 对象包含 `path`(页面路径)、`routeEventId`(路由事件id)

**wx.offBeforePageLoad(function listener)**
- **功能**：取消监听页面即将加载事件
- **参数**：`listener` - 要取消的监听函数

**wx.onAfterPageLoad(function listener)**
- **功能**：监听页面加载完成事件
- **参数**：`listener` - 路由事件的监听函数
- **回调参数**：`res` 对象包含 `path`(页面路径)、`routeEventId`(路由事件id)

**wx.offAfterPageLoad(function listener)**
- **功能**：取消监听页面加载完成事件
- **参数**：`listener` - 要取消的监听函数

**wx.onAfterPageUnload(function listener)**
- **功能**：监听页面卸载完成事件
- **参数**：`listener` - 路由事件的监听函数
- **回调参数**：`res` 对象包含 `path`(页面路径)、`routeEventId`(路由事件id)

**wx.offAfterPageUnload(function listener)**
- **功能**：取消监听页面卸载完成事件
- **参数**：`listener` - 要取消的监听函数


## 8.6.5 EventChannel 页面间通信

EventChannel 是页面间通信的桥梁，用于在页面跳转时传递数据和事件。

### 创建 EventChannel
```js
// 页面跳转时创建 EventChannel
wx.navigateTo({
  url: '/pages/detail/detail',
  events: {
    // 监听目标页面发送的事件
    acceptDataFromOpenerPage: function(data) {
      console.log('接收到目标页面数据', data)
    },
    someEvent: function(data) {
      console.log('接收到事件', data)
    }
  },
  success: function(res) {
    // 通过 eventChannel 向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
})
```

### 在目标页面使用 EventChannel
```js
// 在目标页面 pages/detail/detail.js 中
Page({
  onLoad: function(options) {
    const eventChannel = this.getOpenerEventChannel()
    
    // 监听上一页面发送的数据
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      console.log('接收到上一页面数据', data)
      this.setData({
        receivedData: data.data
      })
    })
    
    // 向上一页面发送数据
    eventChannel.emit('acceptDataFromOpenerPage', { data: '来自详情页的数据' })
  }
})
```

### EventChannel 方法
- **emit(eventName, data)** - 向指定页面发送事件和数据
- **on(eventName, callback)** - 监听指定事件
- **once(eventName, callback)** - 监听指定事件，只触发一次
- **off(eventName, callback)** - 取消监听指定事件

## 8.6.6 自定义路由

```js
// 定义自定义效果，从右侧推入
const slideRouteBuilder = (customRouteContext) => {
  const { primaryAnimation } = customRouteContext
  const handlePrimaryAnimation = () => {
    'worklet'
    const transX = windowWidth * (1 - primaryAnimation.value)
	   return {
		   transform: `translateX(${transX}px)`,
	   }
  }
  return {
    handlePrimaryAnimation
  }
}

wx.router.addRouteBuilder('slide', slideRouteBuilder)

// 使用自定义路由
wx.navigateTo({
  url: 'xxx',
  routeType: 'slide'
})
```
