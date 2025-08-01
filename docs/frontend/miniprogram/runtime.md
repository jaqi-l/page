# 8.5 运行机制
* 运行机制：视图层→逻辑层→CDM（查看是否有更新）→网络请求
* 生命周期
##  应用生命周期：
* **onLaunch(Object object)**：小程序初始化完成时触发，全局只触发一次。参数也可以使用 `wx.getLaunchOptionsSync` 获取。
* **onShow(Object object)**：小程序启动，或从后台进入前台显示时触发。也可以使用 `wx.onAppShow` 绑定监听。
* **onHide()**：小程序从前台进入后台时触发。也可以使用 `wx.onAppHide` 绑定监听。
* **onError(String error)**：小程序发生脚本错误或 API 调用报错时触发。也可以使用 `wx.onError` 绑定监听。
* **onPageNotFound(Object object)**：小程序要打开的页面不存在时触发。也可以使用 `wx.onPageNotFound` 绑定监听。
* **onUnhandledRejection(Object object)**：小程序有未处理的 Promise 拒绝时触发。也可以使用 `wx.onUnhandledRejection` 绑定监听。
* **onThemeChange(Object object)**：系统切换主题时触发。也可以使用 `wx.onThemeChange` 绑定监听。

**示例代码：**
```js
App({
  onLaunch (options) {
    // 小程序初始化完成时触发，全局只触发一次
    console.log('小程序启动', options)
  },
  onShow (options) {
    // 小程序启动，或从后台进入前台显示时触发
    console.log('小程序显示', options)
  },
  onHide () {
    // 小程序从前台进入后台时触发
    console.log('小程序隐藏')
  },
  onError (msg) {
    // 小程序发生脚本错误或 API 调用报错时触发
    console.log('小程序错误', msg)
  },
  onPageNotFound (res) {
    // 小程序要打开的页面不存在时触发
    wx.redirectTo({
      url: 'pages/index/index'
    })
  },
  onUnhandledRejection (res) {
    // 小程序有未处理的 Promise 拒绝时触发
    console.log('未处理的 Promise 拒绝', res)
  },
  onThemeChange (res) {
    // 系统切换主题时触发
    console.log('主题变化', res.theme)
  },
  globalData: 'I am global data'
})
```

## 页面生命周期：
* **onLoad(Object object)**：页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
* **onShow()**：页面显示时触发。每次打开页面都会调用一次。
* **onReady()**：页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
* **onHide()**：页面隐藏时触发。当 `navigateTo` 或底部 `tab` 切换时调用。
* **onUnload()**：页面卸载时触发。当 `redirectTo` 或 `navigateBack` 的时候调用。
* **onRouteDone()**：页面路由完成时触发。页面路由动画完成时触发，此时页面已经完全显示。

**示例代码：**
```js
Page({
  data: {
    title: '页面标题'
  },
  
  onLoad(options) {
    // 页面加载时触发，一个页面只会调用一次
    console.log('页面加载', options)
    // 获取页面参数
    if (options.id) {
      this.setData({
        id: options.id
      })
    }
  },
  
  onShow() {
    // 页面显示时触发，每次打开页面都会调用一次
    console.log('页面显示')
  },
  
  onReady() {
    // 页面初次渲染完成时触发，一个页面只会调用一次
    console.log('页面渲染完成')
    // 此时可以安全地操作DOM
  },
  
  onHide() {
    // 页面隐藏时触发，当navigateTo或底部tab切换时调用
    console.log('页面隐藏')
  },
  
  onUnload() {
    // 页面卸载时触发，当redirectTo或navigateBack的时候调用
    console.log('页面卸载')
    // 清理定时器、事件监听等
  },
  
  onRouteDone() {
    // 页面路由完成时触发，页面路由动画完成时触发
    console.log('页面路由完成')
    // 此时页面已经完全显示，可以执行一些需要等待动画完成的操作
  }
})
```

:::tip
1. `5s`后挂起,`30min`后自动删除进程。

2. [原生与uni-app小程序应用、页面与组件的完整生命周期](https://blog.csdn.net/ljq547152849/article/details/130881632?spm=1001.2014.3001.5502)
:::