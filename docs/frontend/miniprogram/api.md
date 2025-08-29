# 8.9 API
前缀：`wx.`   
方法：wx.get（获取）、wx.set（写入）    
回调函数：success（成功）、fail（失败）、complete（完成）   
回调函数类型：直调函数（程序运行时立即执行被调函数）、回调函数（程序运行之后执行被调函数。包括登记回调函数和执行回调函数） 
## 8.9.1 基础

### 环境变量
* `wx.env` - 环境变量对象
  - `wx.env.USER_DATA_PATH` - 文件系统中的用户目录路径 (本地路径)

### 兼容性检查
* `wx.canIUse` - 判断小程序的API，回调，参数，组件等是否在当前版本可用
  - 格式：`${API}.${method}.${param}.${option}` 或 `${component}.${attribute}.${option}`
  - 示例：
    ```js
    wx.canIUse('console.log')
    wx.canIUse('getSystemInfo.success.screenWidth')
    wx.canIUse('button.open-type.contact')
    ```

### 系统
* `wx.openSystemBluetoothSetting` - 打开系统蓝牙设置页。仅支持安卓
* `wx.openAppAuthorizeSetting` - 打开应用授权设置页
* `wx.getWindowInfo` - 获取窗口信息
* `wx.getSystemSetting` - 获取系统设置
* `wx.getSkylineInfoSync` - 同步获取当前运行环境对于 Skyline 渲染引擎 的支持情况
* `wx.getSkylineInfo` - 异步获取当前运行环境对于 Skyline 渲染引擎 的支持情况
* `wx.getRendererUserAgent` - 获取 Webview 小程序的 UserAgent
* `wx.getDeviceInfo` - 获取设备信息
* `wx.getDeviceBenchmarkInfo` - 获取设备性能得分和机型档位数据
* `wx.getAppBaseInfo` - 获取应用基础信息
* `wx.getAppAuthorizeSetting` - 获取应用授权信息

### 更新
* `wx.updateWeChatApp` - 更新微信版本
* `wx.getUpdateManager` - 获取全局唯一的版本更新管理器

### 小程序生命周期
* `wx.onApiCategoryChange` - 监听 API 类别变化事件
* `wx.offApiCategoryChange` - 移除 API 类别变化事件的监听函数
* `wx.getLaunchOptionsSync` - 获取小程序启动时的参数。与 App.onLaunch 的回调参数一致。
* `wx.getEnterOptionsSync` - 获取本次小程序启动时的参数。如果当前是冷启动，则返回值与 App.onLaunch 的回调参数一致；如果当前是热启动，则返回值与 App.


### 应用级事件
* `wx.postMessageToReferrerPage` - 向来源页面发送消息
* `wx.postMessageToReferrerMiniProgram` - 向跳转的源小程序发送消息，源小程序可在 wx.onShow 或 wx.getEnterOptionsSync 中通过 extraData 接收消息

* `wx.onUnhandledRejection` - 监听未处理的 Promise 拒绝事件
* `wx.offUnhandledRejection` - 移除未处理的 Promise 拒绝事件的监听函数

* `wx.onThemeChange` - 监听系统主题变化事件
* `wx.offThemeChange` - 移除系统主题变化事件的监听函数

* `wx.onPageNotFound` - 监听页面不存在事件
* `wx.offPageNotFound` - 移除页面不存在事件的监听函数

* `wx.onLazyLoadError` - 监听分包加载失败事件
* `wx.offLazyLoadError` - 移除分包加载失败事件的监听函数

* `wx.onError` - 监听小程序错误事件
* `wx.offError` - 移除小程序错误事件的监听函数

* `wx.onAudioInterruptionEnd` - 监听音频中断结束事件
* `wx.offAudioInterruptionEnd` - 移除音频中断结束事件的监听函数

* `wx.onAudioInterruptionBegin` - 监听音频因为受到系统占用而被中断开始事件
* `wx.offAudioInterruptionBegin` - 移除音频中断开始事件的监听函数

* `wx.onAppShow` - 监听小程序切前台事件
* `wx.offAppShow` - 移除小程序显示事件的监听函数

* `wx.onAppHide` - 监听小程序切后台事件
* `wx.offAppHide` - 移除小程序隐藏事件的监听函数



### 路由事件

#### 执行顺序
路由事件的执行顺序如下（以页面跳转为例）：
1. `wx.onBeforeAppRoute` - 路由逻辑执行前
2. `wx.onBeforePageUnload` - 当前页面销毁前
3. `wx.onBeforePageLoad` - 新页面实例化前
4. `wx.onAppRoute` - 路由逻辑执行后
5. `wx.onAfterPageUnload` - 当前页面销毁后
6. `wx.onAfterPageLoad` - 新页面实例化完成
7. `wx.onAppRouteDone` - 路由动画执行完成

#### 事件详解

**路由前事件**：
* `wx.onBeforeAppRoute` - 监听路由事件下发后，执行路由逻辑前的事件监听
* `wx.offBeforeAppRoute` - 移除路由事件下发后，执行路由逻辑前的事件监听
> **应用场景**：路由拦截、权限检查、数据预处理

**页面销毁事件**：
* `wx.onBeforePageUnload` - 监听路由事件引起现有页面实例销毁时，页面实例销毁前的事件监听
* `wx.offBeforePageUnload` - 移除路由事件引起现有页面实例销毁时，页面实例销毁前的事件监听
> **应用场景**：数据保存、资源清理、状态记录

* `wx.onAfterPageUnload` - 监听路由事件引起现有页面实例销毁时，页面实例销毁后的事件监听
* `wx.offAfterPageUnload` - 移除路由事件引起现有页面实例销毁时，页面实例销毁后的事件监听
> **应用场景**：内存清理、统计上报

**页面加载事件**：
* `wx.onBeforePageLoad` - 监听路由事件引起新的页面实例化时，页面实例化前的事件监听
* `wx.offBeforePageLoad` - 移除路由事件引起新的页面实例化时，页面实例化前的事件监听
> **应用场景**：参数验证、初始化配置

* `wx.onAfterPageLoad` - 监听路由事件引起新的页面实例化时，页面实例化完成的事件监听
* `wx.offAfterPageLoad` - 移除路由事件引起新的页面实例化时，页面实例化完成的事件监听
> **应用场景**：数据加载、UI初始化、埋点统计

**路由后事件**：
* `wx.onAppRoute` - 监听路由事件下发后，执行路由逻辑后的事件监听
* `wx.offAppRoute` - 移除路由事件下发后，执行路由逻辑后的事件监听
> **应用场景**：路由完成后的业务逻辑处理

**动画完成事件**：
* `wx.onAppRouteDone` - 监听当前路由动画执行完成的事件监听
* `wx.offAppRouteDone` - 移除当前路由动画执行完成的事件监听
> **应用场景**：动画完成后的回调、性能监控


### 调试
* `wx.setEnableDebug` - 设置是否打开调试开关
* `wx.getRealtimeLogManager` - 获取实时日志管理器
* `wx.getLogManager` - 获取日志管理器

### 性能
* `wx.reportPerformance` - 上报性能数据
* `wx.preloadWebview` - 预加载 WebView
* `wx.preloadSkylineView` - 预加载 Skyline 视图
* `wx.preloadAssets` - 为视图层预加载媒体资源文件, 目前支持：font，image
* `wx.getPerformance` - 获取性能管理器

### 分包加载
* `wx.preDownloadSubpackage` - 预下载分包，目前只开放了下载 worker 分包的能力

### 加密
* `wx.getUserCryptoManager` - 获取用户加密管理器

## 8.9.2 跳转

* `wx.restartMiniProgram` - 重启当前小程序
* `wx.openOfficialAccountProfile` - 打开公众号主页
* `wx.openOfficialAccountArticle` - 打开公众号文章页
* `wx.openEmbeddedMiniProgram` - 打开半屏小程序
* `wx.onEmbeddedMiniProgramHeightChange` - 监听半屏小程序可视高度变化事件
* `wx.offEmbeddedMiniProgramHeightChange` - 移除半屏小程序可视高度变化事件的监听函数
* `wx.navigateToMiniProgram` - 打开另一个小程序
* `wx.navigateBackMiniProgram` - 返回到上一个小程序
* `wx.exitMiniProgram` - 退出当前小程序

## 8.9.3 聊天工具

* `wx.shareVideoToGroup` - 转发视频到聊天
* `wx.shareImageToGroup` - 转发图片到聊天
* `wx.shareFileToGroup` - 转发文件到聊天
* `wx.shareEmojiToGroup` - 转发表情到聊天
* `wx.shareAppMessageToGroup` - 转发小程序卡片到聊天
* `wx.selectGroupMembers` - 选择聊天室的成员，并返回选择成员的 group_openid。若当前为群聊，则会拉起成员选择器；若当前为单聊，则直接返回双方的 group_openid    
* `wx.openChatTool` - 进入聊天工具模式
* `wx.notifyGroupMembers` - 提醒用户完成任务，标题长度不超过 30 个字符，支持中英文和数字，中文算2个字符。
* `wx.getChatToolInfo` - 获取聊天工具模式下的群聊信息。

## 8.9.4 转发

* `wx.updateShareMenu` - 更新转发按钮状态和显示内容
* `wx.showShareMenu` - 显示转发按钮
* `wx.showShareImageMenu` - 打开图片分享面板
* `wx.shareVideoMessage` - 直接分享视频到聊天
* `wx.shareFileMessage` - 直接分享文件到聊天
* `wx.onCopyUrl` - 监听用户复制页面链接事件
* `wx.offCopyUrl` - 取消监听用户复制页面链接事件
* `wx.hideShareMenu` - 隐藏转发按钮、
* `wx.authPrivateMessage` - 校验私密消息（私密消息跳转校验）
## 8.9.5 界面
### 交互
* `wx.showToast` - 显示消息提示框
* `wx.hideToast` - 隐藏消息提示框
* `wx.showModal` - 显示模态对话框
* `wx.showLoading` - 显示 loading 提示框
* `wx.hideLoading` - 隐藏 loading 提示框
* `wx.showActionSheet` - 显示操作菜单
* `wx.enableAlertBeforeUnload` - 开启小程序页面返回询问对话框
* `wx.disableAlertBeforeUnload` - 关闭小程序页面返回询问对话框

### 导航栏
* `wx.showNavigationBarLoading` - 显示导航栏加载动画
* `wx.hideNavigationBarLoading` - 隐藏导航栏加载动画
* `wx.setNavigationBarTitle` - 设置导航栏标题
* `wx.setNavigationBarColor` - 设置导航栏颜色
* `wx.hideHomeButton` - 隐藏返回首页按钮
### 背景
* `wx.setBackgroundTextStyle` - 设置下拉背景字体、loading 图的样式
* `wx.setBackgroundColor` - 设置窗口的背景色
### Tab Bar
* `wx.setTabBarStyle` - 设置 tabBar 的样式
* `wx.showTabBar` - 显示 tabBar
* `wx.hideTabBar` - 隐藏 tabBar
* `wx.showTabBarRedDot` - 显示 tabBar 上指定 item 的红点
* `wx.hideTabBarRedDot` - 隐藏 tabBar 上指定 item 的红点
* `wx.setTabBarItem` - 动态设置 tabBar 上的文本、图片和选中状态
* `wx.setTabBarBadge` - 设置 tabBar 上指定 item 的右上角徽标
* `wx.removeTabBarBadge` - 移除 tabBar 上指定 item 的右上角徽标
### 字体
* `wx.loadFontFace` - 动态加载网络字体
* `wx.loadBuiltInFontFace` - 加载内置字体
### 下拉刷新
* `wx.stopPullDownRefresh` - 停止当前页面下拉刷新
* `wx.startPullDownRefresh` - 开始下拉刷新。调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
### 滚动
* `wx.pageScrollTo` - 将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
* `ScrollViewContext` - 增强 ScrollView 实例
### 动画
* `wx.createAnimation` - 创建动画实例
* `Animation` - 过渡动画实例

### 自定义组件
* `wx.nextTick` - 延迟一部分操作到下一个时间片再执行。（类似于 setTimeout）

### 菜单
* `wx.onOnUserTriggerTranslation` - 监听用户触发小程序菜单中翻译功能的事件
* `wx.offOnUserTriggerTranslation` - 取消监听用户触发翻译功能的事件
* 
* `wx.onMenuButtonBoundingClientRectWeightChange` - 监听菜单按钮（右上角胶囊按钮）的布局位置信息变化事件
* `wx.offMenuButtonBoundingClientRectWeightChange` - 取消监听菜单按钮（右上角胶囊按钮）的布局位置信息变化事件
* 
* `wx.getMenuButtonBoundingClientRect` - 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点
### 窗口
* `wx.onWindowStateChange` - 监听小程序窗口状态变化事件。仅适用于 PC 平台
* `wx.offWindowResize` - 移除小程序窗口状态变化事件的监听函数
* `wx.onWindowResize` - 监听窗口尺寸变化事件
* `wx.offWindowResize` - 移除窗口尺寸变化事件的监听函数
* `wx.checkIsPictureInPictureActive` - 返回当前是否存在小窗播放（小窗在 video/live-player/live-pusher 下可用）
### worklet动画


## 8.9.6 网络

## 8.9.7 支付
## 8.9.8 数据缓存
* `wx.setStorageSync`、`wx.setStorage` - 同步、异步将数据存储在本地缓存中指定的 key 中
* `wx.getStorageSync`、`wx.getStorage` - 同步、异步获取指定 key 对应的内容
* `wx.getStorageInfoSync`、`wx.getStorageInfo` - 同步、异步获取当前 storage 的相关信息
* `wx.removeStorageSync`、`wx.removeStorage` - 同步、异步移除指定 key
* `wx.clearStorageSync`、`wx.clearStorage` - 同步、异步清除 storage 中所有 key

* `wx.batchSetStorageSync`、`wx.batchSetStorage` - 同步、异步批量保存 指定 key 的内容
* `wx.batchGetStorageSync`、`wx.batchGetStorage` - 同步、异步批量保存获取指定 key 的内容


* `wx.createBufferURL` - 根据传入的 buffer 创建一个唯一的 URL 存在内存中
* `wx.revokeBufferURL` - 根据 URL 销毁存在内存中的数据

### 数据预拉取和周期性更新
* `wx.setBackgroundFetchToken` - 设置自定义登录态，在周期性拉取数据时带上，
* `wx.getBackgroundFetchToken` - 获取设置过的自定义登录态。若无，则返回 fail。
* `wx.onBackgroundFetchData` - 监听预拉取数据接口，监听到请求返回后，返回最新的数据
* `wx.getBackgroundFetchData` - 监听预拉取数据接口    
> 1.如果小程序已启动，请求还未完成，则返回缓存的旧数据(首次启动，没有缓存，返回空)    
> 2.如果请求已结束，则返回最新的数据    
::: tip
`wx.getBackgroundFetchData`可能获取到新或者旧数据，`wx.onBackgroundFetchData`获取的一定是新数据。因此在实际业务中需要两个 api 配合，保证数据是最新的    
[深度解析微信小程序数据预拉取API调用的问题与使用方法 wx.getBackgroundFetchData](https://developers.weixin.qq.com/community/develop/article/doc/000cccb5ed4368334bb24f14b6b013)
:::
### 缓存管理器
## 8.9.9 数据分析
## 8.9.10 画布
## 8.9.11 媒体
## 8.9.12 位置

* `wx.openLocation` - 使用微信内置地图查看位置
* `wx.onLocationChangeError`、`offLocationChangeError` - 监听、移除持续定位接口返回失败时触发
* `wx.onLocationChange`、`offLocationChange` - 监听、移除实时地理位置变化事件
* `wx.getLocation` - 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用。
* `wx.getFuzzyLocation` - 获取当前的模糊地理位置
* `wx.startLocationUpdate`、`wx.stopLocationUpdate` - 开启、停止监听位置变化
* `wx.startLocationUpdateBackground` - 开启小程序在前后台时均可接收位置消息，后台包括离开小程序后继续使用微信（微信仍在前台）、离开微信（微信在后台）两个场景
* `wx.choosePoi` - 打开POI列表选择位置，支持模糊定位（精确到市）和精确定位混选
* `wx.chooseLocation` - 打开地图选择位置

## 8.9.13 文件
* `wx.saveFileToDisk` - 保存文件到本地磁盘，仅在 PC 端支持
* `wx.openDocument` - 在新开页面打开文档
* `wx.getFileSystemManager` - 获取文件系统管理器
## 8.9.14 开发接口
## 8.9.15 设备
## 8.9.16 AI
## 8.9.17 Worker
## 8.9.18 WXML
## 8.9.19 广告
## 8.9.20 Skyline
## 8.9.21 XR_FRAME







<!-- ## 8.9.2 媒体
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
``` -->