# 8.2 wxml特性
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