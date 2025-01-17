FreeMarker是一款模板语言：即一种基于模板和要改变的数据，并用来生成输出文本的通用工具。

##  6.1 `assign`定义变量
```ftl
<#assign userName="jaqi">
```

##  6.2 `${...}`输出变量
```html
<p>${userName}</p>
<!-- 如果为空不执行 -->
<p>${user!}</p>
<!-- !后设置默认值 -->
<p>${user!"jaqi"}</p>
```

##  6.3 控制语句
#### `if`
```ftl
<#if userName="jaqi">

<#elseif userName="lijiaqi">

<#else>  

</#if>
```
#### `switch`
```ftl
<#switch value> 
<#case refValue1> 
    ... 
    <#break> 
<#case refValue2> 
    ... 
    <#break> 
    ... 
<#case refValueN> 
    ... 
    <#break> 
<#default> 
    ... 
</#switch> 
```

##  6.4 `list`遍历
```ftl
<#list goodsList as item>
  ${item_index+1} 商品名称： ${item.name} 价格：${item.price}
 <!-- 不在最后一项添加换行标签 -->
  <#sep><br><#sep> 
</#list>
```
::: tip
1. `循环体+_index`返回索引
2. `<#sep>`不在第一项之前或最后一项之后显示的内容。
:::
* 根据name排序
```ftl
<#assign userNameArr=[{"name":1},{"name":6},{"name":4}]>
<#list userNameArr?sort_by(["name"])?reverse as user>
   ${user.name}   //  6 4 1
</#list>
```
##  6.5 `include`引用模板
```ftl
<#include "head.html">
```

##  6.6 常用属性
* `size`返回数组长度
```ftl
${(userName?size)}
```

* `length`返回字符串长度
```ftl
${(userName?length)}
```

* `??`判断变量是否存在,不判断变量的值。
```ftl
${userName??}
```

* `!!`忽略list中的空值
```ftl
<#list lists!! as list>
</#list>
```

* `has_content`判断变量是否为空
```ftl
${userName?has_content}
```

* `?c`Number类型转字符串
```ftl
${Num?c}
```

* 比较运算符

大于:`gt`\小于:`lt`\大于等于:`gte`小于等于:`lte`