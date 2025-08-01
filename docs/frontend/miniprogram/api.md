# 8.9 API
前缀：`wx.`   
方法：wx.get（获取）、wx.set（写入）    
回调函数：success（成功）、fail（失败）、complete（完成）   
回调函数类型：直调函数（程序运行时立即执行被调函数）、回调函数（程序运行之后执行被调函数。包括登记回调函数和执行回调函数） 
## 8.9.1 网络
* 发起请求：
> wx.request（发起请求）：需要配置request白名单，必须的HTTPS协议，且通过ICP备案。
* 上传、下载类：
> wx.uploadFile（上传）：需要配置uploadFile白名单。   
> wx.downloadFile（下载）需要配置downloadFile白名单。
* websocket
websocket：需要配置websocket白名单。
## 8.9.2 媒体
#### 图片类：
* wx.chooseImage（选择图片）    
* wx.previewImage（预览图片）   
* wx.getImage（查看图片信息）   
* wx.saveImageToPhotosAlbum（保存图片）
 :::tip
 1. 必须是本地路径，远程地址可以使用downloadFile下载到本地再保存到相册。
 :::
#### 录音：
* wx.startRecord（开始录音），不再维护，但可使用    
* wx.stopRecord（停止录音），不再维护，但可使用   
* wx.getRecorderManager（录音管理器）   
#### 相机：
* wx.createCameraContext() - 创建 camera 上下文 CameraContext 对象
  - `CameraContext.takePhoto(Object object)` - 拍照
  - `CameraContext.startRecord(Object object)` - 开始录像
  - `CameraContext.stopRecord(Object object)` - 结束录像
  - `CameraContext.onCameraFrame(function callback)` - 监听相机实时帧数据
  - `CameraContext.setZoom(Object object)` - 设置缩放级别

**CameraContext.takePhoto 参数**：
- `quality` (string) - 成像质量，可选值：high、normal、low，默认值：high
- `success` (function) - 接口调用成功的回调函数
- `fail` (function) - 接口调用失败的回调函数
- `complete` (function) - 接口调用结束的回调函数

**CameraContext.startRecord 参数**：
- `timeoutCallback` (function) - 超过30s或页面hide时会回调
- `success` (function) - 接口调用成功的回调函数
- `fail` (function) - 接口调用失败的回调函数
- `complete` (function) - 接口调用结束的回调函数

**CameraContext.stopRecord 参数**：
- `success` (function) - 接口调用成功的回调函数
- `fail` (function) - 接口调用失败的回调函数
- `complete` (function) - 接口调用结束的回调函数

**示例**：
```js
const ctx = wx.createCameraContext()

// 拍照
ctx.takePhoto({
  quality: 'high',
  success: (res) => {
    console.log('拍照成功', res.tempImagePath)
  }
})

// 开始录像
ctx.startRecord({
  timeoutCallback: () => {
    console.log('录像超时')
  },
  success: () => {
    console.log('开始录像')
  }
})

// 结束录像
ctx.stopRecord({
  success: (res) => {
    console.log('录像结束', res.tempVideoPath, res.tempThumbPath)
  }
})

// 监听相机帧数据
ctx.onCameraFrame((frame) => {
  console.log('帧数据', frame.data, frame.width, frame.height)
})

// 设置缩放级别
ctx.setZoom({
  zoom: 1.5,
  success: () => {
    console.log('设置缩放成功')
  }
})
```

#### 音频：
* wx.createInnerAudioContext() - 创建内部音频上下文
* wx.getBackgroundAudioManager() - 获取全局唯一的背景音频管理器

#### 视频：
* wx.createVideoContext() - 创建 video 上下文 VideoContext 对象
## 8.9.3 文件
* wx.savaFile   
* wx.getFileInfo    
* wx.getSavedFileList   
* wx.getSavedFileInfo   
* wx.removeSavedFile    
* wx.openDocument   
## 8.9.4 数据缓存
* wx.setStorage   
* wx.setStorageSync   
* wx.getStorage   
* wx.getStorageSync   
* wx.getStorageInfo   
* wx.getStorageInfoSync   
* wx.removeStorage    
* wx.removeStorageInfoSync    
* wx.clearStorage   
* wx.clearStorageInfoSync   
## 8.9.5 位置
* wx.getLocation
* wx.chooseLocation
* wx.openLocation
* wx.createMapContext
## 8.9.6 设备  
* wx.canIUse    
  判断小程序的API，回调，参数，组件等是否在当前版本可用。  
  `${API}.${method}.${param}.${option}`或`${component}.${attribute}.${option}`
  ```js
  wx.canIUse('console.log')
  wx.canIUse('getSystemInfo.success.screenWidth')
  ```
#### 设备信息：
* wx.getSystemInfoSync(同步获取设备信息)    
* wx.getSystemInfoAsync(异步获取设备信息)   
#### 网络状态：
* wx.getNetworkType(获取网络类型)
* wx.onNetworkStatusChange(监听网络状态变化事件)
#### 网络状态：
## 8.9.7 界面
#### 交互：
* wx.showToast(提示框)、wx.hideToast(隐藏示框)
* wx.showModal(模态框
* wx.showLoading(加载动画)、wx.hideLoading(隐藏加载动画)
* wx.showActionSheet(显示操作菜单)
* wx.enableAlertBeforeUnload(开启小程序页面返回询问对话框)、wx.disableAlertBeforeUnload(关闭小程序页面返回询问对话框)
::: warning
`wx.showLoading`和`wx.showToast`同时只能显示一个。
:::
#### 导航栏：
* wx.showNavigationBarLoading(导航条加载动画)、wx.hideNavigationBarLoading(隐藏导航条加载动画)
* wx.setNavigationBarTitle(导航条标题)
* wx.setNavigationBarColor(导航条颜色)
* wx.hideHomeButton(隐藏返回首页按钮)
#### 背景：
* wx.setBackgroundTextStyle(下拉背景字体、loading 图的样式)
* wx.setBackgroundColor(背景色)
#### Tab Bar：
* wx.showTabBar(显示tabBar)、wx.hideTabBar(隐藏tabBar)    
* wx.setTabBarStyle(设置tabBar的整体样式)   
* wx.setTabBarItem(设置tabBar某一项的内容)    
* wx.setTabBarBadge(为tabBar某一项的右上角添加文本)、wx.removeTabBarBadge(移除tabBar某一项右上角的文本)   
* wx.showTabBarRedDot(显示tabBar某一项的右上角的红点)、wx.hideTabBarRedDot(隐藏tabBar某一项的右上角的红点)   
#### 置顶栏
* wx.setTopBarText(动态设置置顶栏文字内容)    
只有小程序被置顶时生效
## 8.9.8 路由
* wx.reLaunch(关闭所有页面，打开到应用内的某个页面)   
* wx.redirectTo(关闭当前页面，跳转到应用内的某个页面。不能跳tabbar 页面)    
* wx.navigateTo(保留当前页面，跳转到应用内的某个页面。不能跳tabbar页面)   
* wx.navigateBack(关闭当前页面，返回到原页面)   
可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层   
* wx.switchTab(跳转到tabBar页面，并关闭其他所有非tabBar页面,不能传参)   
## 8.9.9 动画
* wx.createAnimation(创建一个动画实例)
## 8.9.10 绘图
* wx.createCanvasContext(创建canvas对象)

## 8.9.11 开放接口
### 登录
* wx.login(接口获取登录凭证code)    
发送`code`给后端服务器，获取`session_key`(有时效性)。
```js
wx.login({
  success (res) {
    if (res.code) {
      //发起网络请求
      wx.request({
        url: 'https://example.com/onLogin',
        data: {
          code: res.code
        }
      })
    } else {
      console.log('登录失败！' + res.errMsg)
    }
  }
})
```
* wx.checkSession(检查`session_key`是否过期)
```js
wx.checkSession({
  success () {
    //session_key 未过期，并且在本生命周期一直有效
  },
  fail () {
    // session_key 已经失效，需要重新执行登录流程
    wx.login() //重新登录
  }
})
```
### 账号信息
* wx.getAccountInfoSync(获取当前账号信息，只能在正式版中获取) 
### 用户信息
* wx.getUserProfile(获取授权、和当前用户信息)   
* wx.getUserInfo(已授权的情况下，获取用户信息)   
### 授权 
* wx.authorize(提前向用户发起授权请求)
```js
uni.authorize({
  scope: 'scope.writePhotosAlbum',// 要获取的权限名
  success() {},
  fail (error) {},
})
```
### 设置
* wx.getSetting(获取用户的当前设置)
```js
wx.getSetting({
  success (res) {},
  fail(error) {},
})
```
* wx.openSetting(查看设置界面)
```js
wx.openSetting({
  success (res) {},
  fail (error) {},
})
```
### 微信支付
小程序账号必须是商户账号

## 8.9.12 WXML
* wx.createSelectorQuery(创建获取DOM节点信息对象)
查看DOM信息
```js
const query = wx.createSelectorQuery()
query.select('#the-id').boundingClientRect()
query.selectViewport().scrollOffset()
query.exec(function(res){
  res[0].top       // #the-id节点的上边界坐标
  res[1].scrollTop // 显示区域的竖直滚动位置
})
```