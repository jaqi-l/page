
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

### caption元素：为表格添加标题
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
### th元素：为表格添加标题行
```html
<tr>
    <th>项目一</th>
    <th>项目一</th>
</tr>
```
### colspan元素：横向合并单元格
```html
<tr>
   <td colspan="2">合计</td>
</tr>
```

### rowspan元素：纵向向合并单元格
```html
<tr>
   <td colspan="2">合计</td>
</tr>
```

### thead\tfoot\tbaody元素：为表格设置表头，主体和表格页脚
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
### colgroup元素：用来组合列
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

### col元素：用来设定列的属性，一般作为colgroup元素的子元素配合使用
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
### html5新增属性
form属性:将表单外的内容与表单进行关联

novalidate属性：设置数据提交时不进行验证

enctype属性：仅作了解规定在发送到服务器之前应该如何对表单数据进行编码。通常情况下我们使用默认值即可

accept-charset属性：仅作了解accept-charset 属性规定服务器处理表单数据所接受的字符集。 accept-charset 属性允许您指定一系列字符集，服务器必须支持这些字符集，从而得以正确解释表单中的数据。通常情况下我们使用默认值即可 此属性的默认值是 "unknown"，表示表单的字符集与包含表单的文档的字符集相同。

 