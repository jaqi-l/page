# 8.4 wxs特性
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