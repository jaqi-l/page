## 1.2.5 表格
### 基本结构
`table`：表格的范围，外框；用来定义表格，表格的其他元素包含在table标签里面。    
`tr`：表格的行。    
`td`：表格的单元格。 
```html
<table>
    <tr><td>1<td><td>2<td></tr>
    <tr><td>3<td><td>4<td></tr>
</table>
```

### table布局
#### table布局是传统的网页布局方式：
早期网页由于内容较少，布局简单，都是使用table布局。
* 思路：用表格把屏幕分成几块--不同的单元格存放不同的内容。
* 优点:比较简单，容易理解
* 缺点：对于复杂的布局，表格嵌套太多，比较繁琐；后期维护和修改很不方便

### caption元素
为表格添加标题
```html
<table>
    <caption>标题</caption>
    <tr><td>1<td><td>2<td></tr>
    <tr><td>3<td><td>4<td></tr>
</table>
```
::: danger 注意
在HTML5中已经被废弃，不推荐使用，建议使用CSS样式设置。 
:::
### th元素
为表格添加标题行
```html
<tr>
    <th>项目一</th>
    <th>项目一</th>
</tr>
```
### colspan属性
横向合并单元格
```html
<tr>
   <td colspan="2">合计</td>
</tr>
```

### rowspan属性
纵向向合并单元格
```html
<tr>
   <td rowspan="2">合计</td>
</tr>
```

### table-layout属性
设置表格的布局算法
> `automatic`:（默认值）列宽度由单元格内容设定。
> `fixed`:列宽由表格宽度和列宽度设定
> `inherit`:继承父元素的`table-layout`属性的值。
### thead\tfoot\tbaody元素
为表格设置表头，主体和表格页脚
```html
<table>
	<thead>
        <!-- 表头 -->
		<tr>
			<td>表头1</td>
			<td>表头2</td>
		</tr>
	</thead>
	<tbaody>
        <!-- 主体 -->
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
		</tr>
	</tbaody>
	<tfoot>
        <!-- 页脚 -->
		<tr>
			<td>页脚1</td>
			<td>页脚2</td>
		</tr>
	</tfoot>
</table>
```
### colgroup元素
用来组合列
```html
<table>
    <colgroup span="2" style="background:red"></colgroup> 
    <!-- 设置前两列背景颜色为红色 -->
    <tr>
        <td>1<td>
            <td>2<td>
        </tr>
    <tr>
        <td>3<td>
            <td>4<td>
        </tr>
</table>
```

### col元素
用来设定列的属性，一般作为colgroup元素的子元素配合使用
```html
<table>
    <colgroup>
    <col span="2" style="background-color:red"> 
    <col style="background-color:yellow">
  </colgroup> 
    <!-- 设置前两列背景颜色为红色，其他为黄色 -->
    <tr>
        <td>1<td>
            <td>2<td>
        </tr>
    <tr>
        <td>3<td>
            <td>4<td>
        </tr>
</table>
```

::: danger
colgroup与col元素，不支持html5，不推荐使用
:::




 