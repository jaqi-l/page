

### input元素
用来设置表单中的内容项，比如输入内容的文本框，按钮等。
不仅可以布置在表单中，也可以在表单之外的元素使用。

#### 属性

* `type`：指定输入内容的类型，默认为text:单行文本框；
* `name`:输入内容的识别名称，传递参数时候的参数名称；
* `value`:默认值；
* `maxlength`:输入的最大字数；
* `readonly`：只读属性，设置内容不可变更，提交时会以前发送至服务器；
* `disabled`：设置为不可用（不可操作）；
* `required`：设置该内容为必须填写项，否则无法提交；
* `placeholder`：设置默认值，当文本框获得焦点时被清空，对text/url/tel/email/
password/search有效；
* `autocomplet`：属性值为on/off,定义是否开启浏览器自动记忆功能；
* `autofocus`：自动获得焦点；
* `accesskey`：指定快捷键win中，指定快捷键后，按Alt+“快捷键”,便会获得焦点
* `tabindex`：指定按Tab键时，项目间的移动顺序
* `autocomplet`： HTML5新增属性属性值为on/off,定义是否开启浏览器自动记忆功能
* `pattern`：设定输入类型的正则表达式
* `type`属性
> text:默认为。     
> password:密码状态输入。     
> submit:提交按钮，点击将数据发送至服务器。     
> button:普通按钮。         

> ::: warning submit于button的区别
>| 场景 | Submit          | Button |
>| -------- | ----------------- | -------- |
>| 网页上需要提交信息到服务器  | √ |   |
>| 网页上执行一个普通的事件，如重置、清空功能。    |  | √  |
>| 提交表单    | √ | 需要绑定事件才能提交表单数据 |
>| 局部刷新    | 不可以使用，在触发事件的同时会提交表单。 | 而button默认是不提交任何数据。可以绑定事件的方式来提交数据 |
>| 没有表单，却要提交数据 | submit需要有表单时，提交时才会带数据。当然使用submit也可以，但是前提要拦截onclick事件。 | 而button默认是不提交任何数据。可以绑定事件的方式来提交数据。 |
>| 表单数据太多的时候    | 推荐 |  需要写很多数据的获取动作  |
>| <span style="color: red">\*</span>提交数据是要使用JS进行校验的，但如果这时候用户禁用了JS，那么校验就失效了，如果后台也没有进行校验，那么不合法的数据就进入后台了。 | 不推荐 | 推荐：通过button提交数据，那么如果用户禁用JS,那么数据提交动作就激活不了  |
> 使用submit时需要验证请加 return true或false
> ```js
>   <input type="submit" name="Submit" value="注 册" onClick=" return check();">
> ```
>:::  
> reset:重置按钮。        
> image：图片式提交按钮。     
> hidden；隐藏字段。该内容不会显示页面上，一般为网页设计者设置的变量数据，提交时，隐藏内容会提交到服务器。     
> <span style="color: red">\*</span>email:表示要输入一个电子邮箱，并验证输入内容。     
> <span style="color: red">\*</span>url:表示要输入一个网址，并验证输入内容。     
> <span style="color: red">\*</span>tel:表示输入的内容是一个电话号码，不验证输入内容。     
> <span style="color: red">\*</span>number:可以配合input的max/min/step/value规定允许输入的最大值/最小值/步长/默认值。     
> <span style="color: red">\*</span>range(活动条):可以配合input的max/min/step/value规定的最大值/最小值/步长/默认值。     
> <span style="color: red">\*</span>时间类:包括datetime/datetime-local/date/month/week/time。     
> <span style="color: red">\*</span>color:可以建立一个颜色的选择输入框。     
> <span style="color: red">\*</span>seacrch:用于建立一个搜索框，用来供用户输入搜素的关键词。     
> <span style="color: red">\*</span>file:用来创建一个文件选取的输入框,可通过accept属性规定选取文件的类型，比如图片/视频（multiple：多文件上传）。     
> <span style="color: red">\*</span>checkbox:复选框（可以多选）通过checked属性可设置默认选项，再次单击取消。     
> <span style="color: red">\*</span>radio:单选框（可以多选）通过checked属性可设置默认选项，再次单击取消。必须将同一组单选项设置一个相同的name属性值。     

::: warning
<span style="color: red">\*</span>为html5新增元素，低版本浏览器可能不支持，且效果不一。
:::
### select与HTML5新增的datalist元素
#### select元素:
创建下拉菜单选项列表，不仅可以在表单中使用，还可以在其他块元素和内联元素中使用。select只是定义一个下拉菜单列表，其具体列表项要通过option元素建立。

#### option元素
用来建立一个选项，即下拉列表的一个菜单项。

#### optgroup元素
用来对option元素进行组合分组。

#### 属性
`size`用来定义列表中显示的列表项。

`multiple`属性用来定义是否可以多选。

可以添加disabled属性和autofocus属性。

#### datalist元素
创建一个选项列表(HTML5新增)

```html

<datalist>标签规定了<input> 元素可能的选项列表。需要使用<input> 元素的 list 属性

来绑定 <datalist> 元素。<input list="browsers">

<datalist id="browsers"><option value="Internet Explorer"></datalist>
```

### lable元素和label属性

为input建立一个与之相关联的标签，点击lable元素内文本时就会触发相关联的input

#### 关联方法：

* 显式关联：（通过id和for建立关联）
``` html

<input type='checkbox' name='basket' id='basketball'>

<label for="basketball">篮球</label>
```

* 隐性关联（直接将表单控件放到label标签内）：
```html

<label>点击我可以使文本框获得焦点

<input type='text' name='theinput' id='theinput'>

</label>
```

可以通过accesskey建立快捷键

#### lable属性

在option元素中可以设定比标签内容更优先的选项

optgroup的分组名称

### textarea属性 
用来建立多行输入文本框

元素标签中的内容将一文本框默认值的形式呈现

不仅可以用在表单中，也可以在其他块元素或内联元素中

textarea元素的属性：

name/disabled/readonly/form/reauired/autofocus/placeholder

rows属性：设置多行文本的行数（高度）

cols属性：设置多行文本的每行显示的字数（宽度）

###  button属性
用来建立一个按钮从功能上来说，与input元素建立的按钮相同

button元素是双标签，其内部可以配置图片与文字，进行更复杂的样式设计

不仅可以在表单中使用，还可以在其他块元素和内联元素中使用

button元素的属性

type属性：可以设置三个值 submit/reset/button与input元素设置的按钮含义相同

name/vlue/disable属性：与input的用法相同

autofocus属性：设置按钮自动获得焦点。

form属性：设定按钮隶属于哪一个或多个表单

formmethod属性：设定表单的提交方式，将覆盖原本的提交方式

formnovalidate属性：设定表单将会覆盖原本的novalidate属性

fomaction属性：指定表单数据发送对象，将覆盖原来的action属性设定

formenctype属性;指定表单的数据发送类型，将覆盖原本的enctype属性设定

formtarget属性：将覆盖原本的target属性设定

重要事项：如果在表单中使用 button 元素，不同的浏览器会提交不同的值。Internet Explorer 将提交 button元素开始标签与结束标签之间的文本，而其他浏览器将提交 value 属性的内容。最好就是在表单中使用 input 元素来创建按钮。其他地方使用button创建按钮。

### form元素
将表单外的内容与表单进行关联

#### novalidate属性
设置数据提交时不进行验证

#### enctype属性
仅作了解规定在发送到服务器之前应该如何对表单数据进行编码。通常情况下我们使用默认值即可

#### accept-charset属性
仅作了解accept-charset 属性规定服务器处理表单数据所接受的字符集。 accept-charset 属性允许您指定一系列字符集，服务器必须支持这些字符集，从而得以正确解释表单中的数据。通常情况下我们使用默认值即可 此属性的默认值是 "unknown"，表示表单的字符集与包含表单的文档的字符集相同。

###  H5新增的表单重写
form元素的属性小结

action/method/enctype/name/accept-charset/accept/target/autocomplete/novalidate

accept属性：（仅作了解）指定服务器处理表单时所能接受的数据形态，一般默认即可

accept-charset: （仅作了解）指定表单处理数据时所能接受的字符编码

target属性:指定在何处打开action属性所指定的URL目标

enctype属性：(了解即可)规定在发送到服务器之前应该如何对表单数据进行编码。

当method设定发送方式为get时，不必设置该属性；

当method设定发送方式为post时该属性才有效；

默认地，表单数据会编码为 "application/x-www-form-urlencoded"。就是说，在发送到服务器之前，所有字符都会进行编码（空格转换为 "+" 加号，特殊符号转换为 ASCII HEX 值）。

当值设为"multipart/form-data"时表示：不对字符编码。在使用包含文件上传控件的表单时（比如当input的type值为file时），必须使用该值。

text/plain:空格转换为 "+" 加号，但不对特殊字符编码。

表单的重写：重写 form 元素的某些属性设定。

表单重写属性适用于提交按钮

formaction - 重写表单的 action 属性

formenctype - 重写表单的 enctype 属性

formmethod - 重写表单的 method 属性

formnovalidate - 重写表单的 novalidate 属性

formtarget - 重写表单的 target 属性

### output 
output元素是HTML5新增的元素，用来设置不同数据的输出

output元素的输出内容是由javascript代码控制的

oninput表单事件：当用户对元素数据的输入时触发

output元素的属性：

name属性：定义对象的唯一名称。（表单提交时使用）

form属性：定义所属的一个或多个表单。

for属性：定义输出域相关的一个或多个元素。

### progress 
是HTML5中新增的元素，用来建立一个进度条

通常与JavaScript 一同使用，来显示任务的进度。

使用时注意浏览器的支持情况：Internet Explorer 9 以及更早的版本不支持

progress元素的属性：

max属性：规定当前进度的最大值。

value属性设定进度条当前默认显示值

form属性：规定进度条所属的一个或多个表单。

### meter 
HTML5中新增的元素，用来建立一个度量条,用来表示度量衡的评定

通常与JavaScript 一同使用，来显示任务的进度。

meter元素的属性：

value属性设定进度条当前默认显示值

max属性：规定范围的最大值，默认值为1.

min属性：规定范围的最小值，默认值为0.

low属性：规定被视作低的标准。

high属性：规定被视作高标准。

form属性：规定所属的一个或多个表单。

### keygen 
HTML5中新增的元素，用来建立一个密钥生成器

当提交表单时，私钥存储在本地，公钥发送到服务器。主要作用是提供一种用户验证身份的方法

目前Internet Explorer 和 Safari暂不支持

keygen元素的属性：

name/form/autofocus/disabled

challenge属性:将 keygen 的值设置为在提交时询问。

keytype属性：定义密钥类型，如设置为rsa（一种密码的算法），则生成 RSA 密钥。

RSA是目前最有影响力的公钥加密算法，它能够抵抗到目前为止已知的绝大多数密码攻击，已被ISO推荐为公钥数据加密标准。

### fieldset/legend 
fieldset元素：可将表单内的相关元素分组。

当一组表单元素放到fieldset标签内时，浏览器会以特殊方式来显示它们，通常会有一个边框。

没有必需的或唯一的属性。form/disabled属性可用。

legend元素：为 fieldset 元素定义标题

### details/summary
details元素：

用于描述文档或文档某个部分的细节。

通常与summary元素配合使用，可以为 details 定义标题。标题是可见的，用户点击标题时，会显示出 details中的内容。

details元素的属性：

open：规定在 HTML 页面上 details 是可见的。
::: warning
*目前还不是所以浏览器都支持
:::