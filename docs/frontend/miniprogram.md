## 8.1 概览
[微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
* 小程序代码构成    
> `.json`后缀的JSON配置文件   
>> `app.json`小程序的全局配置文件   
>> `project.config.json`工具配置文件    
>> `page.json`页面配置文件    
> `.wxml`后缀的WXML模板文件   
>> 标签必须闭合、大小写敏感   
> `.wxss`后缀的WXSS样式文件   
>> `app.wxss`公共样式配置文件   
> `.js`后缀的JS脚本逻辑文件   
>> `app.js`入口逻辑文件   
> `.wxs`后缀的WeiXinScript脚本逻辑文件    

* 小程序版本发布流程
预览版→开发版→体验版→审核版→正式版

## 8.2 wxml特性
* 支持的标签、组件：详见[视图容器|微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/component/)
* 支持的属性：id、class、style、hidden、data-*、bind*/catch*
* 数据绑定：详见[数据绑定|微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/data.html)
```html
    <view hidden="{{flag ? true : false}}"> {{"hello" + message}} </view>
```
* 列表渲染：详见[列表渲染|微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/list.html)
```html
    <block wx:for="{{item}}" wx:for-item="item" wx:key="index">
        <view>{{index}}:{{item.name}}</view>
    </block>
```
*条件渲染：详见[条件渲染|微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/conditional.html)
```html
<view wx:if="{{length > 5}}">大于五</view>
<view wx:elif="{{length > 2}}">大于二小于五</view>
<view wx:else>其他 </view>
```
* 模板：详见[模板|微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/conditional.html)
```html
<!-- 定义： -->
<template name="msgItem">
  <view>
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
  </view>
</template>

<!-- 使用： -->
 <template is="msgItem" data="{{...item}}"/> <!-- 只能通过data传参数 -->
```

引用：详见[引用|微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/import.html)
`import`：只能引入根节点的template
`include`：可以引入template内的全部template
```html
<!-- 定义item.wxml -->
<template name="item">
  <text>{{text}}</text>
</template>
<!-- 引用 -->
<import src="item.wxml"/>
<template is="item" data="{{text: 'forbar'}}"/>
```


## 8.3 wxss特性
* rpx单位：设备像素（dp设备的物理像素）、CSS像素、PPI/DPI（每英寸像素数）、DPR（设备像素与CSS像素的比）、rpx（规定屏幕宽度750px，根据DPR进行计算自动适配）
* 外链样式导入：
```css
@import './assets.wxss'
```
* 选择器：id选择器、类选择器、标签选择器、after/before伪类
* 选择器优先级：important最高、行内1000、id选择器100、类选择器10、标签选择器

## 8.4 wxs特性
JS运行环境：ios→JavaScriptCore、android→X5内核、IED→nwjs
WXS：运行环境不依赖于运行时的基础库版本，可以在所有版本的小程序中运行
```html
<!-- 定义 -->
<wxs module="m1">
var msg = "hello world";
module.exports.message = msg;
</wxs>
<!-- 使用 -->
<view> {{m1.message}} </view>
```
WXS数据类型：number、string、boolean、object、arrary、function、date、regexp
:::tip
    wxs不支持try/catch
:::

## 8.5 运行机制
* 运行机制：视图层→逻辑层→CDM（查看是否有更新）→网络请求
* 生命周期
#####  应用生命周期：
onLaunch   
onShow   
onHide   
onError        
##### 页面生命周期：
onLoad   
onShow   
onReady    
onHide   
onUnload   
:::tip
1. `5s`后挂起,`30min`后自动删除进程。

2. [原生与uni-app小程序应用、页面与组件的完整生命周期](https://blog.csdn.net/ljq547152849/article/details/130881632?spm=1001.2014.3001.5502)
:::
## 8.6 路由
![router](/router.jpg)
## 8.7 事件
* touchstart、
* touchmove、
* touchcancel（被打断）、
* touchend、
* tap、
* logpress、
* longtap、
## 8.8 组件
### 8.8.1 视图
* `view（相当于DIV）
* `cover-view`（用于覆盖原生组件）
* `cover-image`（用于覆盖原生组件的图片组件、可以嵌套`cover-view`里面）
* `scroll-view`（滚动组件）
* `grid-view`(Skyline网格布局容器)
* `list-view`(Skyline网格布局容器)
* `match-media`(匹配检测组件)
```html
<match-media min-width="300" max-width="600">
  <view>当页面宽度在 300 ~ 500 px 之间时展示这里</view>
</match-media>
```
* `movable-area`、`movable-view`(可移动区域、可移动的元素)
* `page-container`（页面容器：当用户进行返回操作，关闭该容器不关闭页面）
* `root-portal`（用于将组件从页面脱离出来，类似于Vue3的`Teleport`方法）
* `share-element`(共享元素需要在`page-container`组件内使用:用于页面直接的动画)
* `sticky-header`(吸顶布局容器)
* `sticky-section`(吸顶布局容器)
* `swiper`、`swiper-item`（轮播）
### 8.8.2 基础内容
* icon（图标）
* text（文本）
* rich-text（符文本）
* percent（进度条）
###  8.8.3 表单
* button
* checkbox
* form
* input
* label
* picker
* picker-view
* radio
* slider
* switch
* textarea
###  8.8.4 导航
* navigator
###  8.8.5 媒体组件
* audio（音频）
* video（视频）
* camera（相机）
* image（图片 ）
* live-player（实时播放）
* live-pusher（实时录制） 
* voip-room（多人音视频对话）
###  8.8.6 地图组件
* map
###  8.8.7 Canvas
### 8.8.8 开发能力
* open-data
* web-view
需要配置业务域名，必须是HTTPS协议。

## 8.9 API
前缀：`wx.`   
方法：wx.get（获取）、wx.set（写入）    
回调函数：success（成功）、fail（失败）、complete（完成）   
回调函数类型：直调函数（程序运行时立即执行被调函数）、回调函数（程序运行之后执行被调函数。包括登记回调函数和执行回调函数） 
### 8.9.1 网络
* 发起请求：
> wx.request（发起请求）：需要配置request白名单，必须的HTTPS协议，且通过ICP备案。
* 上传、下载类：
> wx.uploadFile（上传）：需要配置uploadFile白名单。   
> wx.downloadFile（下载）需要配置downloadFile白名单。
* websocket
websocket：需要配置websocket白名单。
### 8.9.2 媒体
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
####  音频：
####  视频：
### 8.9.3 文件
* wx.savaFile   
* wx.getFileInfo    
* wx.getSavedFileList   
* wx.getSavedFileInfo   
* wx.removeSavedFile    
* wx.openDocument   
### 8.9.4 数据缓存
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
### 8.9.5 位置
* wx.getLocation
* wx.chooseLocation
* wx.openLocation
* wx.createMapContext
### 8.9.6 设备  
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
### 8.9.7 界面
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
### 8.9.8 路由
* wx.reLaunch(关闭所有页面，打开到应用内的某个页面)   
* wx.redirectTo(关闭当前页面，跳转到应用内的某个页面。不能跳tabbar 页面)    
* wx.navigateTo(保留当前页面，跳转到应用内的某个页面。不能跳tabbar页面)   
* wx.navigateBack(关闭当前页面，返回到原页面)   
可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层   
* wx.switchTab(跳转到tabBar页面，并关闭其他所有非tabBar页面,不能传参)   
### 8.9.9 动画
* wx.createAnimation(创建一个动画实例)
### 8.9.10 绘图
* wx.createCanvasContext(创建canvas对象)

### 8.9.11 开放接口
#### 登录
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
#### 账号信息
* wx.getAccountInfoSync(获取当前账号信息，只能在正式版中获取) 
#### 用户信息
* wx.getUserProfile(获取授权、和当前用户信息)   
* wx.getUserInfo(已授权的情况下，获取用户信息)   
#### 授权 
* wx.authorize(提前向用户发起授权请求)
```js
uni.authorize({
  scope: 'scope.writePhotosAlbum',// 要获取的权限名
  success() {},
  fail (error) {},
})
```
#### 设置
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
#### 微信支付
小程序账号必须是商户账号

### 8.9.12 WXML
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