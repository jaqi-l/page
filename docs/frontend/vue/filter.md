过滤器只改变展示的形式，不改变原数据，并通过return返回处理后的数据。
* 全局过滤器
```js
Vue.filter("formatData",function (olddata) {     
    return   newdata  
})
```
* 局部过滤器
```js
filters: {
    formatData: function (olddata) {
        return  newdata
    }
}
```
* 使用
```html
<p>{{olddata | newdata}}</p>
```
::: warning 
<span style="color: red">*</span>Vue3中移除,建议使用计算属性或方法代替
:::