# 8.8 组件
## 8.8.1 视图容器

### view
**功能**：视图容器，相当于HTML中的div元素

**属性**：
- `hover-class` (string) - 指定按下去的样式类，当hover-class="none"时，没有点击态效果
- `hover-stop-propagation` (boolean) - 指定是否阻止本节点的祖先节点出现点击态
- `hover-stay-time` (number) - 按住后多久出现点击态，单位毫秒

### scroll-view
**功能**：可滚动视图区域，用于区域滚动

**属性**：
- `scroll-x` (boolean) - 允许横向滚动
- `scroll-y` (boolean) - 允许纵向滚动
- `upper-threshold` (number) - 距顶部/左边多远时，触发scrolltoupper事件
- `lower-threshold` (number) - 距底部/右边多远时，触发scrolltolower事件
- `scroll-top` (number) - 设置竖向滚动条位置
- `scroll-left` (number) - 设置横向滚动条位置
- `scroll-into-view` (string) - 值应为某子元素id，则滚动到该元素
- `scroll-with-animation` (boolean) - 在设置滚动条位置时使用动画过渡
- `enable-back-to-top` (boolean) - iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部
- `refresher-enabled` (boolean) - 开启自定义下拉刷新
- `refresher-threshold` (number) - 设置自定义下拉刷新阈值
- `refresher-default-style` (string) - 设置自定义下拉刷新默认样式
- `refresher-background` (string) - 设置自定义下拉刷新区域背景颜色
- `refresher-triggered` (boolean) - 设置当前下拉刷新状态

**事件**：
- `scrolltoupper` - 滚动到顶部/左边，会触发scrolltoupper事件
- `scrolltolower` - 滚动到底部/右边，会触发scrolltolower事件
- `scroll` - 滚动时触发，`event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}`

**示例**：
```html
<scroll-view 
  scroll-y="true" 
  scroll-top="{{scrollTop}}"
  bindscroll="onScroll"
  bindscrolltolower="onScrollToLower">
  <view wx:for="{{list}}" wx:key="id">{{item.name}}</view>
</scroll-view>
```


### match-media
**功能**：匹配检测组件，用于响应式布局

**属性**：
- `min-width` (number) - 页面最小宽度（px）
- `max-width` (number) - 页面最大宽度（px）
- `min-height` (number) - 页面最小高度（px）
- `max-height` (number) - 页面最大高度（px）
- `orientation` (string) - 屏幕方向，可选值：portrait、landscape

**示例**：
```html
<match-media min-width="300" max-width="600">
  <view>当页面宽度在 300 ~ 600 px 之间时展示这里</view>
</match-media>

<match-media orientation="landscape">
  <view>横屏时显示</view>
</match-media>
```

### movable-area 和 movable-view
**功能**：可移动区域和可移动视图组件

**movable-area 属性**：
- `scale-area` (boolean) - 当里面的movable-view设置为支持双指缩放时，设置此值可将缩放手势生效区域缩小为设置的movable-area区域

**movable-view 属性**：
- `direction` (string) - 移动方向，可选值：all、vertical、horizontal、none
- `inertia` (boolean) - 是否带有惯性
- `out-of-bounds` (boolean) - 是否允许超出边界
- `x` (number) - 定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围
- `y` (number) - 定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围
- `damping` (number) - 阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快
- `friction` (number) - 摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止
- `disabled` (boolean) - 是否禁用
- `scale` (boolean) - 是否支持双指缩放
- `scale-min` (number) - 定义缩放倍数最小值
- `scale-max` (number) - 定义缩放倍数最大值
- `scale-value` (number) - 定义缩放倍数，取值范围为 0.5-10
- `animation` (boolean) - 是否使用动画

**事件**：
- `change` - 拖动过程中触发的事件
- `scale` - 缩放过程中触发的事件
- `htouchmove` - 初次手指触摸后移动为横向的移动时触发的事件
- `vtouchmove` - 初次手指触摸后移动为纵向的移动时触发的事件

**示例**：
```html
<movable-area style="height: 200px; width: 200px; background: red;">
  <movable-view 
    direction="all" 
    x="{{x}}" 
    y="{{y}}" 
    bindchange="onChange">
    可移动内容
  </movable-view>
</movable-area>
```

### page-container
**功能**：页面容器，当用户进行返回操作时，关闭该容器而不关闭页面

**属性**：
- `show` (boolean) - 是否显示容器
- `overlay` (boolean) - 是否显示遮罩层
- `position` (string) - 容器出现的位置，可选值：bottom、center、top
- `round` (boolean) - 是否显示圆角
- `close-on-slide-down` (boolean) - 是否在下滑时关闭容器
- `close-on-overlay-click` (boolean) - 是否在点击遮罩层时关闭容器
- `safe-area-inset-bottom` (boolean) - 是否开启底部安全区适配
- `safe-area-inset-top` (boolean) - 是否开启顶部安全区适配

**事件**：
- `enter` - 容器进入时触发
- `leave` - 容器离开时触发
- `after-enter` - 容器进入动画结束时触发
- `after-leave` - 容器离开动画结束时触发

**示例**：
```html
<page-container 
  show="{{show}}" 
  position="bottom"
  bindenter="onEnter"
  bindleave="onLeave">
  <view>页面容器内容</view>
</page-container>
```

### root-portal
**功能**：用于将组件从页面脱离出来，类似于Vue3的Teleport方法

**属性**：
- `target` (string) - 指定挂载的节点，可选值为一个选择器

**示例**：
```html
<root-portal target=".custom-container">
  <view>脱离页面的内容</view>
</root-portal>
```

### swiper 和 swiper-item
**功能**：滑块视图容器，用于轮播图等场景

**swiper 属性**：
- `indicator-dots` (boolean) - 是否显示面板指示点
- `indicator-color` (string) - 指示点颜色
- `indicator-active-color` (string) - 当前选中的指示点颜色
- `autoplay` (boolean) - 是否自动切换
- `current` (number) - 当前所在滑块的index
- `interval` (number) - 自动切换时间间隔
- `duration` (number) - 滑动动画时长
- `circular` (boolean) - 是否采用衔接滑动
- `vertical` (boolean) - 滑动方向是否为纵向
- `previous-margin` (string) - 前边距，可用于露出前一个swiper-item
- `next-margin` (string) - 后边距，可用于露出后一个swiper-item
- `display-multiple-items` (number) - 同时显示的滑块数量
- `skip-hidden-item-layout` (boolean) - 是否跳过未显示的滑块布局
- `easing-function` (string) - 指定swiper切换动画类型

**swiper-item 属性**：
- `item-id` (string) - 该swiper-item的标识符

**事件**：
- `change` - current改变时会触发change事件
- `transition` - swiper-item的位置发生改变时会触发transition事件
- `animationfinish` - 动画结束时会触发animationfinish事件

**示例**：
```html
<swiper 
  indicator-dots="{{true}}"
  autoplay="{{true}}"
  interval="{{3000}}"
  duration="{{500}}"
  bindchange="onSwiperChange">
  <swiper-item wx:for="{{banners}}" wx:key="id">
    <image src="{{item.imageUrl}}" mode="aspectFill" />
  </swiper-item>
</swiper>
```

## 8.8.2 基础内容

### icon
**功能**：图标组件，用于显示各种图标

**属性**：
- `type` (string) - 图标类型，有效值：success, success_no_circle, info, warn, waiting, cancel, download, search, clear
- `size` (number) - 图标大小，单位px，默认值：23
- `color` (string) - 图标颜色，同CSS的color

**示例**：
```html
<icon type="success" size="23" color="#07c160" />
<icon type="info" size="20" color="#1989fa" />
<icon type="warn" size="25" color="#ff976a" />
```

### text
**功能**：文本组件，用于显示文本内容

**属性**：
- `space` (string) - 显示连续空格，可选值：ensp、emsp、nbsp
- `decode` (boolean) - 是否解码，默认值：false
- `user-select` (boolean) - 文本是否可选，默认值：false

**示例**：
```html
<text selectable="{{true}}" space="nbsp" decode="{{true}}">
  这是一段可选择的文本，支持空格和解码
</text>
```

### rich-text
**功能**：富文本组件，用于显示富文本内容

**属性**：
- `nodes` (array/string) - 节点列表/HTML String，支持Array和String类型
- `space` (string) - 显示连续空格，可选值：ensp、emsp、nbsp
- `user-select` (boolean) - 富文本是否可选，默认值：false

**nodes 属性支持两种类型**：
1. **String 类型**：节点字符串
2. **Array 类型**：节点数组

### progress
**功能**：进度条组件，用于显示操作进度

**属性**：
- `percent` (number) - 百分比0~100，默认值：0
- `show-info` (boolean) - 在进度条右侧显示百分比，默认值：false
- `stroke-width` (number) - 进度条线的宽度，单位px，默认值：6
- `color` (string) - 进度条颜色（请使用activeColor），默认值：#09BB07
- `activeColor` (string) - 已选择的进度条的颜色
- `backgroundColor` (string) - 未选择的进度条的颜色
- `active` (boolean) - 进度条从左往右的动画，默认值：false
- `active-mode` (string) - backwards: 动画从头播；forwards: 动画从上次结束点接着播，默认值：backwards
- `duration` (number) - 进度增加1%所需毫秒数，默认值：30

**事件**：
- `bindactiveend` - 动画完成事件

**示例**：
```html
<progress 
  percent="{{progressPercent}}" 
  show-info="{{true}}"
  stroke-width="{{4}}"
  active="{{true}}"
  active-mode="forwards"
  color="#07c160"
  backgroundColor="#f0f0f0" />
```

### selection
**功能**：选择器组件，用于文本选择

**属性**：
- `text` (string) - 要选择的文本内容
- `start` (number) - 选择起始位置，从0开始
- `end` (number) - 选择结束位置，从0开始
- `color` (string) - 选中文本的背景色，默认值：#007aff
- `background-color` (string) - 选中文本的背景色，默认值：#007aff

**事件**：
- `bindselect` - 选择文本时触发，`event.detail = {text, start, end}`

**示例**：
```html
<selection 
  text="{{selectionText}}" 
  start="{{selectionStart}}" 
  end="{{selectionEnd}}"
  color="#ff6b6b"
  bindselect="onTextSelect">
  这是一段可以被选择的文本内容
</selection>
```

##  8.8.3 表单组件

### button
**功能**：按钮组件，用于触发操作

**属性**：
- `size` (string) - 按钮大小，可选值：default、mini，默认值：default
- `type` (string) - 按钮样式类型，可选值：primary、default、warn，默认值：default
- `plain` (boolean) - 按钮是否镂空，背景色透明，默认值：false
- `disabled` (boolean) - 是否禁用，默认值：false
- `loading` (boolean) - 名称前是否带 loading 图标，默认值：false
- `form-type` (string) - 用于 form 组件，点击分别会触发 form 的 submit/reset 事件
- `open-type` (string) - 微信开放能力，可选值：contact、share、getPhoneNumber、getUserInfo、launchApp、openSetting、feedback、chooseAvatar、getRealtimePhoneNumber、agreeprivacyauthorization、chooseAddress、subscribe、lifestyle、launchFacialRecognitionVerify、openBluetoothAdapter、getAuthorize、onWatchPrivacyPolicy、chooseInvoiceTitle、subscribeMessage、liveActivity
- `hover-class` (string) - 指定按钮按下去的样式类，当hover-class="none"时，没有点击态效果
- `hover-stop-propagation` (boolean) - 指定是否阻止本节点的祖先节点出现点击态
- `hover-stay-time` (number) - 按住后多久出现点击态，单位毫秒
- `lang` (string) - 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
- `session-from` (string) - 会话内消息卡片标题，open-type="contact"时有效
- `send-message-title` (string) - 会话内消息卡片标题，open-type="contact"时有效
- `send-message-path` (string) - 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
- `send-message-img` (string) - 会话内消息卡片图片，open-type="contact"时有效
- `app-parameter` (string) - 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
- `show-message-card` (boolean) - 显示会话内消息卡片，open-type="contact"时有效
- `bindgetphonenumber` (eventhandle) - 手机号快速验证回调，open-type=getPhoneNumber时有效
- `bindgetrealtimephonenumber` (eventhandle) - 手机号实时验证回调，open-type=getRealtimePhoneNumber时有效
- `binderror` (eventhandle) - 当使用开放能力时，发生错误的回调
- `bindopensetting` (eventhandle) - 在打开授权设置页后回调，open-type=openSetting时有效
- `bindlaunchapp` (eventhandle) - 打开 APP 成功的回调，open-type=launchApp时有效
- `bindchooseavatar` (eventhandle) - 获取用户头像回调，open-type=chooseAvatar时有效
- `bindagreeprivacyauthorization` (eventhandle) - 用户同意隐私协议事件回调

**示例**：
```html
<!-- 基础按钮 -->
<button type="primary" bindtap="onTap">主要按钮</button>
<button type="default" bindtap="onTap">默认按钮</button>
<button type="warn" bindtap="onTap">警告按钮</button>

<!-- 不同尺寸 -->
<button size="default" bindtap="onTap">默认尺寸</button>
<button size="mini" bindtap="onTap">小尺寸</button>

<!-- 镂空按钮 -->
<button plain="{{true}}" type="primary" bindtap="onTap">镂空按钮</button>

<!-- 加载状态 -->
<button loading="{{true}}" type="primary">加载中</button>

<!-- 禁用状态 -->
<button disabled="{{true}}" type="primary">禁用按钮</button>

<!-- 开放能力按钮 -->
<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">获取手机号</button>
<button open-type="chooseAvatar" bindchooseavatar="onChooseAvatar">选择头像</button>
```

### checkbox
**功能**：多选项目组件

**属性**：
- `value` (string) - checkbox标识，选中时触发checkbox-group的 change 事件，并携带 checkbox 的 value
- `disabled` (boolean) - 是否禁用，默认值：false
- `checked` (boolean) - 当前是否选中，默认值：false
- `color` (string) - checkbox的颜色，同css的color

**示例**：
```html
<checkbox value="option1" checked="{{true}}" bindchange="onCheckboxChange">选项1</checkbox>
<checkbox value="option2" disabled="{{true}}" bindchange="onCheckboxChange">选项2</checkbox>
```

### checkbox-group
**功能**：多项选择器，内部由多个checkbox组成

**属性**：
- `bindchange` (eventhandle) - checkbox-group中选中项发生改变时触发 change 事件

**示例**：
```html
<checkbox-group bindchange="onCheckboxGroupChange">
  <checkbox value="option1">选项1</checkbox>
  <checkbox value="option2">选项2</checkbox>
  <checkbox value="option3">选项3</checkbox>
</checkbox-group>
```

### form
**功能**：表单组件，用于将组件内的用户输入的switch input checkbox slider radio textarea 提交

**属性**：
- `report-submit` (boolean) - 是否返回 formId 用于发送模板消息，默认值：false
- `report-submit-timeout` (number) - 等待一段时间（毫秒）后，自动提交表单，默认值：0
- `bindsubmit` (eventhandle) - 携带 form 中的数据触发 submit 事件
- `bindreset` (eventhandle) - 表单重置时会触发 reset 事件

**示例**：
```html
<form bindsubmit="formSubmit" bindreset="formReset">
  <input name="username" placeholder="用户名" />
  <input name="password" type="password" placeholder="密码" />
  <button form-type="submit">提交</button>
  <button form-type="reset">重置</button>
</form>
```

### input
**功能**：输入框组件

**属性**：
- `value` (string) - 输入框的初始内容
- `type` (string) - input 的类型，可选值：text、number、idcard、digit、safe-password、nickname
- `password` (boolean) - 是否是密码类型，默认值：false
- `placeholder` (string) - 输入框为空时占位符
- `placeholder-style` (string) - 指定 placeholder 的样式
- `placeholder-class` (string) - 指定 placeholder 的样式类
- `disabled` (boolean) - 是否禁用，默认值：false
- `maxlength` (number) - 最大输入长度，设置为 -1 的时候不限制最大长度
- `cursor-spacing` (number) - 指定光标与键盘的距离，单位 px
- `auto-focus` (boolean) - 自动聚焦，拉起键盘，默认值：false
- `focus` (boolean) - 获取焦点，默认值：false
- `confirm-type` (string) - 设置键盘右下角按钮的文字，可选值：send、search、next、go、done
- `confirm-hold` (boolean) - 点击键盘右下角按钮时是否保持键盘不收起，默认值：false
- `cursor` (number) - 指定focus时的光标位置
- `selection-start` (number) - 光标起始位置，自动聚集时有效，需与selection-end搭配使用
- `selection-end` (number) - 光标结束位置，自动聚集时有效，需与selection-start搭配使用
- `adjust-position` (boolean) - 键盘弹起时，是否自动上推页面，默认值：true
- `hold-keyboard` (boolean) - 键盘弹起时，是否自动上推页面，默认值：false
- `bindinput` (eventhandle) - 键盘输入时触发
- `bindfocus` (eventhandle) - 输入框聚焦时触发
- `bindblur` (eventhandle) - 输入框失去焦点时触发
- `bindconfirm` (eventhandle) - 点击键盘完成时触发
- `bindkeyboardheightchange` (eventhandle) - 键盘高度发生变化的时候触发

**示例**：
```html
<input 
  value="{{inputValue}}" 
  placeholder="请输入内容"
  bindinput="onInput"
  bindfocus="onFocus"
  bindblur="onBlur"
  bindconfirm="onConfirm" />
```

### label
**功能**：用来改进表单组件的可用性

**属性**：
- `for` (string) - 绑定控件的 id

**示例**：
```html
<label for="username">用户名：</label>
<input id="username" placeholder="请输入用户名" />
```

### picker
**功能**：从底部弹起的滚动选择器

**属性**：
- `mode` (string) - 选择器类型，可选值：selector、multiSelector、time、date、region
- `range` (array) - mode为 selector 或 multiSelector 时，range 有效
- `range-key` (string) - 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
- `value` (number) - value 的值表示选择了 range 中的第几个（下标从 0 开始）
- `start` (string) - 有效值 start 表示有效日期范围的开始
- `end` (string) - 有效值 end 表示有效日期范围的结束
- `fields` (string) - 有效值 year、month、day，表示选择器的粒度
- `bindchange` (eventhandle) - value 改变时触发 change 事件
- `bindcancel` (eventhandle) - 取消选择时触发

**示例**：
```html
<!-- 普通选择器 -->
<picker mode="selector" range="{{array}}" bindchange="bindPickerChange">
  <view>当前选择：{{array[index]}}</view>
</picker>

<!-- 时间选择器 -->
<picker mode="time" value="{{time}}" bindchange="bindTimeChange">
  <view>当前时间：{{time}}</view>
</picker>

<!-- 日期选择器 -->
<picker mode="date" value="{{date}}" bindchange="bindDateChange">
  <view>当前日期：{{date}}</view>
</picker>
```

### picker-view
**功能**：嵌入页面的滚动选择器

**属性**：
- `value` (array) - 数组中的数字依次表示 picker-view 内的 picker-view-column 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项
- `indicator-style` (string) - 设置选择器中间选中框的样式
- `indicator-class` (string) - 设置选择器中间选中框的类名
- `mask-style` (string) - 设置蒙层的样式
- `mask-class` (string) - 设置蒙层的类名
- `bindchange` (eventhandle) - 当滚动选择，value 改变时触发 change 事件

**示例**：
```html
<picker-view value="{{value}}" bindchange="bindChange">
  <picker-view-column>
    <view wx:for="{{years}}" wx:key="*this">{{item}}年</view>
  </picker-view-column>
  <picker-view-column>
    <view wx:for="{{months}}" wx:key="*this">{{item}}月</view>
  </picker-view-column>
  <picker-view-column>
    <view wx:for="{{days}}" wx:key="*this">{{item}}日</view>
  </picker-view-column>
</picker-view>
```

### radio
**功能**：单选项目组件

**属性**：
- `value` (string) - radio 标识。当该radio 选中时，radio-group 的 change 事件会携带radio的value
- `checked` (boolean) - 当前是否选中，默认值：false
- `disabled` (boolean) - 是否禁用，默认值：false
- `color` (string) - radio的颜色，同css的color

**示例**：
```html
<radio value="option1" checked="{{true}}" bindchange="onRadioChange">选项1</radio>
<radio value="option2" disabled="{{true}}" bindchange="onRadioChange">选项2</radio>
```

### radio-group
**功能**：单项选择器，内部由多个 radio 组成

**属性**：
- `bindchange` (eventhandle) - radio-group 中的选中项发生变化时触发 change 事件

**示例**：
```html
<radio-group bindchange="onRadioGroupChange">
  <radio value="option1">选项1</radio>
  <radio value="option2">选项2</radio>
  <radio value="option3">选项3</radio>
</radio-group>
```

### slider
**功能**：滑动选择器组件

**属性**：
- `min` (number) - 最小值，默认值：0
- `max` (number) - 最大值，默认值：100
- `step` (number) - 步长，取值必须大于 0，并且可被(max - min)整除，默认值：1
- `disabled` (boolean) - 是否禁用，默认值：false
- `value` (number) - 当前取值，默认值：0
- `activeColor` (string) - 已选择的颜色，默认值：#1aad19
- `backgroundColor` (string) - 背景条的颜色，默认值：#e9e9e9
- `block-size` (number) - 滑块的大小，取值范围为 12 - 28，默认值：28
- `block-color` (string) - 滑块的颜色，默认值：#ffffff
- `show-value` (boolean) - 是否显示当前 value，默认值：false
- `bindchange` (eventhandle) - 完成一次拖动后触发的事件
- `bindchanging` (eventhandle) - 拖动过程中触发的事件

**示例**：
```html
<slider 
  min="0" 
  max="100" 
  value="{{sliderValue}}" 
  bindchange="onSliderChange"
  show-value="{{true}}"
  activeColor="#07c160" />
```

### switch
**功能**：开关选择器组件

**属性**：
- `checked` (boolean) - 是否选中，默认值：false
- `disabled` (boolean) - 是否禁用，默认值：false
- `type` (string) - 样式，有效值：switch、checkbox，默认值：switch
- `color` (string) - switch 的颜色，同 css 的 color
- `bindchange` (eventhandle) - checked 改变时触发 change 事件

**示例**：
```html
<switch 
  checked="{{switchChecked}}" 
  bindchange="onSwitchChange"
  color="#07c160" />
```

### textarea
**功能**：多行输入框组件

**属性**：
- `value` (string) - 输入框的内容
- `placeholder` (string) - 输入框为空时占位符
- `placeholder-style` (string) - 指定 placeholder 的样式
- `placeholder-class` (string) - 指定 placeholder 的样式类
- `disabled` (boolean) - 是否禁用，默认值：false
- `maxlength` (number) - 最大输入长度，设置为 -1 的时候不限制最大长度
- `auto-height` (boolean) - 是否自动增高，设置auto-height时，style.height不生效，默认值：false
- `fixed` (boolean) - 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，默认值：false
- `cursor-spacing` (number) - 指定光标与键盘的距离，单位 px
- `cursor` (number) - 指定focus时的光标位置
- `show-confirm-bar` (boolean) - 是否显示键盘上方工具栏，默认值：true
- `selection-start` (number) - 光标起始位置，自动聚集时有效，需与selection-end搭配使用
- `selection-end` (number) - 光标结束位置，自动聚集时有效，需与selection-start搭配使用
- `adjust-position` (boolean) - 键盘弹起时，是否自动上推页面，默认值：true
- `hold-keyboard` (boolean) - 键盘弹起时，是否自动上推页面，默认值：false
- `bindfocus` (eventhandle) - 输入框聚焦时触发
- `bindblur` (eventhandle) - 输入框失去焦点时触发
- `bindlinechange` (eventhandle) - 输入框行数变化时调用
- `bindinput` (eventhandle) - 当键盘输入时，触发 input 事件
- `bindconfirm` (eventhandle) - 点击键盘完成时触发
- `bindkeyboardheightchange` (eventhandle) - 键盘高度发生变化的时候触发

**示例**：
```html
<textarea 
  value="{{textareaValue}}" 
  placeholder="请输入内容"
  auto-height="{{true}}"
  maxlength="200"
  bindinput="onTextareaInput"
  bindfocus="onTextareaFocus"
  bindblur="onTextareaBlur" />
```

### keyboard-accessory
**功能**：键盘辅助组件，用于在键盘上方显示自定义内容

**属性**：
- `bindtap` (eventhandle) - 点击键盘辅助组件时触发
- `bindlongpress` (eventhandle) - 长按键盘辅助组件时触发

**示例**：
```html
<input placeholder="请输入内容" />
<keyboard-accessory bindtap="onKeyboardAccessoryTap">
  <view class="accessory-content">
    <text>常用短语</text>
    <text>表情</text>
    <text>@用户</text>
  </view>
</keyboard-accessory>
```

**使用场景**：
- 在输入框上方显示常用短语
- 显示表情选择器
- 显示@用户功能
- 其他键盘相关的快捷操作

### editor
**功能**：富文本编辑器组件，用于编辑富文本内容

**属性**：
- `read-only` (boolean) - 设置编辑器为只读，默认值：false
- `placeholder` (string) - 提示信息
- `show-img-size` (boolean) - 点击图片时显示图片大小控件，默认值：false
- `show-img-toolbar` (boolean) - 点击图片时显示工具栏控件，默认值：false
- `show-img-resize` (boolean) - 点击图片时显示修改尺寸控件，默认值：false
- `bindready` (eventhandle) - 编辑器初始化完成时触发
- `bindinput` (eventhandle) - 编辑器内容改变时触发
- `bindfocus` (eventhandle) - 编辑器获得焦点时触发
- `bindblur` (eventhandle) - 编辑器失去焦点时触发
- `bindstatuschange` (eventhandle) - 通过 context 方法改变编辑器内样式时触发

**方法**：
- `EditorContext.setContents(Object object)` - 初始化编辑器内容
- `EditorContext.getContents(Object object)` - 获取编辑器内容
- `EditorContext.clear(Object object)` - 清空编辑器内容
- `EditorContext.removeFormat(Object object)` - 清除当前选区的样式
- `EditorContext.format(String name, String value)` - 设置当前选区的样式
- `EditorContext.insertText(Object object)` - 在当前光标位置插入文本
- `EditorContext.insertImage(Object object)` - 在当前光标位置插入图片
- `EditorContext.scrollIntoView()` - 使编辑器光标滚动到可视区域

### editor-portal
**功能**：渲染 editor 组件的自定义区块，相关接口 EditorCtx.insertCustomBlock

**属性**：
- `key` (string) - 自定义区块的 blockId，必填

**示例**：
```html
<editor id="editor">
  <block wx:for="{{customBlockList}}" wx:key="blockId">
    <editor-portal key="{{item.blockId}}">
      <view class="flex"></view>
    </editor-portal>
  </block>
</editor>
```

##  8.8.4 导航

### navigator
**功能**：页面链接组件，用于页面跳转

**属性**：
- `target` (string) - 在哪个目标上发生跳转，默认值：self
  - `self` - 当前小程序
  - `miniProgram` - 其它小程序
- `url` (string) - 当前小程序内的跳转链接
- `open-type` (string) - 跳转方式，默认值：navigate
  - `navigate` - 对应 `wx.navigateTo` 或 `wx.navigateToMiniProgram` 的功能
  - `redirect` - 对应 `wx.redirectTo` 的功能
  - `switchTab` - 对应 `wx.switchTab` 的功能
  - `reLaunch` - 对应 `wx.reLaunch` 的功能
  - `navigateBack` - 对应 `wx.navigateBack` 或 `wx.navigateBackMiniProgram` 的功能
  - `exit` - 退出小程序，target="miniProgram"时生效
- `version` (string) - 当target="miniProgram"且open-type="navigate"时有效，要打开的小程序版本，默认值：release
  - `develop` - 开发版
  - `trial` - 体验版
  - `release` - 正式版
- `short-link` (string) - 当target="miniProgram"时有效，当传递该参数后，可以不传 app-id 和 path
- `app-id` (string) - 当target="miniProgram"时有效，要打开的小程序 appId
- `path` (string) - 当target="miniProgram"时有效，打开的页面路径，如果为空则打开首页
- `extra-data` (object) - 当target="miniProgram"时有效，需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据
- `delta` (number) - 当open-type="navigateBack"时有效，返回的页面数，如果 delta 大于现有页面数，则返回到首页
- `hover-class` (string) - 指定点击时的样式类，当hover-class="none"时，没有点击态效果，默认值：navigator-hover
- `hover-stop-propagation` (boolean) - 指定是否阻止本节点的祖先节点出现点击态，默认值：false
- `hover-start-time` (number) - 按住后多久出现点击态，单位毫秒，默认值：50
- `hover-stay-time` (number) - 手指松开后点击态保留时间，单位毫秒，默认值：600
- `bindsuccess` (string) - 当target="miniProgram"且open-type="navigate/navigateBack"时有效，跳转小程序成功
- `bindfail` (string) - 当target="miniProgram"且open-type="navigate/navigateBack"时有效，跳转小程序失败
- `bindcomplete` (string) - 当target="miniProgram"且open-type="navigate/navigateBack"时有效，跳转小程序完成

**使用限制**：
1. 需要用户确认跳转：从 `2.3.0` 版本开始，在跳转至其他小程序前，将统一增加弹窗，询问是否跳转，用户确认后才可以跳转其他小程序
2. 从2020年4月24日起，跳转其他小程序将不再受数量限制

**注意事项**：
- `navigator` 在 Skyline 下视为文本节点，只能嵌套文本节点（如 text），不能嵌套 view、button 等普通节点
- 新增 `span` 组件用于内联文本和图片
- `navigator-hover` 默认为 `{background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}`，navigator 的子节点背景色应为透明色
- `app-id` 必须是有效的微信小程序 appId，格式为 wx 开头的字符串
- `path` 路径必须以 `/` 开头，如果不传或为空，则打开目标小程序的首页
- `extra-data` 传递的数据会在目标小程序的 `App.onLaunch()` 和 `App.onShow()` 中通过 `options.referrerInfo.extraData` 获取
- `delta` 用于 `navigateBack` 时指定返回的页面层数，如果 delta 大于现有页面数，则返回到首页

**示例**：
```html
<!-- 基础跳转 -->
<navigator url="/page/navigate/navigate?title=navigate" hover-class="navigator-hover">
  跳转到新页面
</navigator>

<!-- 在当前页打开 -->
<navigator url="../../redirect/redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">
  在当前页打开
</navigator>

<!-- 切换 Tab -->
<navigator url="/page/index/index" open-type="switchTab" hover-class="other-navigator-hover">
  切换 Tab
</navigator>

<!-- 打开其他小程序 -->
<navigator target="miniProgram" open-type="navigate" app-id="wx1234567890abcdef" path="pages/index/index" extra-data="{{extraData}}" version="release">
  打开绑定的小程序
</navigator>

<!-- 使用短链接跳转其他小程序 -->
<navigator target="miniProgram" open-type="navigate" short-link="https://example.com/short-link">
  使用短链接跳转
</navigator>

<!-- 返回上一页 -->
<navigator open-type="navigateBack" delta="1">
  返回上一页
</navigator>

<!-- 返回多级页面 -->
<navigator open-type="navigateBack" delta="2">
  返回多级页面
</navigator>

<!-- 打开其他小程序并传递数据 -->
<navigator 
  target="miniProgram" 
  open-type="navigate" 
  app-id="wx1234567890abcdef" 
  path="pages/detail/detail?id=123" 
  extra-data="{{extraData}}" 
  version="release"
  bindsuccess="onNavigateSuccess"
  bindfail="onNavigateFail">
  打开其他小程序并传递数据
</navigator>
```

### functional-page-navigator
**功能**：用于跳转插件功能页的组件

**属性**：
- `version` (string) - 跳转的小程序版本，默认值：release
- `name` (string) - 要跳转的功能页 name
- `args` (object) - 功能页参数，参数格式与具体功能页相关
- `bindsuccess` (eventhandle) - 功能页调用成功
- `bindfail` (eventhandle) - 功能页调用失败

**示例**：
```html
<functional-page-navigator 
  name="loginAndGetUserInfo" 
  args="{{ args }}" 
  bindsuccess="loginSuccess" 
  bindfail="loginFail">
  登录功能页
</functional-page-navigator>
```
##  8.8.5 媒体组件

### camera
**功能**：系统相机组件，支持拍照和扫码功能

**属性**：
- `mode` (string) - 应用模式，只在初始化时有效，不能动态变更，默认值：normal
  - `normal` - 相机模式
  - `scanCode` - 扫码模式
- `resolution` (string) - 分辨率，不支持动态修改，默认值：medium
  - `low` - 低分辨率
  - `medium` - 中分辨率
  - `high` - 高分辨率
- `device-position` (string) - 摄像头朝向，默认值：back
  - `front` - 前置摄像头
  - `back` - 后置摄像头
- `flash` (string) - 闪光灯，默认值：auto
  - `auto` - 自动
  - `on` - 打开
  - `off` - 关闭
  - `torch` - 常亮（2.8.0+）
- `frame-size` (string) - 指定期望的相机帧数据尺寸，默认值：medium
  - `small` - 小尺寸帧数据
  - `medium` - 中尺寸帧数据
  - `large` - 大尺寸帧数据

**事件**：
- `bindstop` - 摄像头在非正常终止时触发，如退出后台等情况
- `binderror` - 用户不允许使用摄像头时触发
- `bindinitdone` - 相机初始化完成时触发，`e.detail = {maxZoom}`
- `bindscancode` - 在扫码识别成功时触发，仅在 `mode="scanCode"` 时生效

**注意事项**：
- 同一页面只能插入一个 `camera` 组件
- 需要用户授权 `scope.camera`
- 扫码二维码功能需升级微信客户端至6.7.3
- 2.10.0起 `initdone` 事件返回 `maxZoom`，最大变焦范围
- 原生组件使用限制
- `onCameraFrame` 接口根据 `frame-size` 返回不同尺寸的原始帧数据，与 Camera 组件展示的图像不同，其实际像素值由系统决定


### channel-live
**功能**：小程序内嵌视频号直播组件，展示视频号直播状态和封面，并无弹窗跳转至视频号

**属性**：
- `feed-id` (string) - 视频 feedId，必填
- `finder-user-name` (string) - 视频号 id，以"sph"开头的id，可在视频号助手获取，必填

**注意事项**：
- 基础库 2.29.0 开始支持，低版本需做兼容处理
- 使用该组件打开的视频号视频需要与小程序的主体一致
- 视频号必须与当前小程序相同主体

### channel-video
**功能**：小程序内嵌视频号视频组件，用于播放视频号视频内容

**属性**：
- `feed-id` (string) - 仅视频号视频与小程序同主体时生效，若内嵌非同主体视频，请使用 feed-token
- `finder-user-name` (string) - 视频号 id，以"sph"开头的id，可在视频号助手获取，视频号必须与当前小程序相同主体
- `feed-token` (string) - 仅内嵌小程序非同主体视频号视频时使用，获取方式参考[feed-token 指引](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/channels-activity#feed-token)
- `autoplay` (string) - 是否自动播放，仅视频号视频与小程序同主体时支持设置为 true
- `loop` (boolean) - 是否循环播放，默认值：false
- `muted` (boolean) - 是否静音播放，默认值：false
- `object-fit` (string) - 当视频大小与 video 容器大小不一致时，视频的表现形式，默认值：contain
  - `contain` - 包含
  - `fill` - 填充
  - `cover` - 覆盖

**事件**：
- `binderror` - 视频播放出错时触发

**注意事项**：
- 基础库 2.31.1 开始支持 feed-token 和 autoplay 属性
- 暂不支持纯图片视频号内容
- 视频号必须与当前小程序相同主体


### image
**功能**：图片组件，支持 JPG、PNG、SVG、WEBP、GIF 等格式，2.3.0 起支持云文件ID

**属性**：
- `src` (string) - 图片资源地址
- `mode` (string) - 图片裁剪、缩放的模式，默认值：scaleToFill
  - `scaleToFill` - 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
  - `aspectFit` - 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来
  - `aspectFill` - 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来
  - `widthFix` - 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变
  - `heightFix` - 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变（2.10.3+）
  - `top` - 裁剪模式，不缩放图片，只显示图片的顶部区域（仅 WebView 支持）
  - `bottom` - 裁剪模式，不缩放图片，只显示图片的底部区域（仅 WebView 支持）
  - `center` - 裁剪模式，不缩放图片，只显示图片的中间区域（仅 WebView 支持）
  - `left` - 裁剪模式，不缩放图片，只显示图片的左边区域（仅 WebView 支持）
  - `right` - 裁剪模式，不缩放图片，只显示图片的右边区域（仅 WebView 支持）
  - `top left` - 裁剪模式，不缩放图片，只显示图片的左上边区域（仅 WebView 支持）
  - `top right` - 裁剪模式，不缩放图片，只显示图片的右上边区域（仅 WebView 支持）
  - `bottom left` - 裁剪模式，不缩放图片，只显示图片的左下边区域（仅 WebView 支持）
  - `bottom right` - 裁剪模式，不缩放图片，只显示图片的右下边区域（仅 WebView 支持）
- `show-menu-by-longpress` (boolean) - 长按图片显示发送给朋友、收藏、保存图片、搜一搜、打开名片/前往群聊/打开小程序的菜单，默认值：false
- `binderror` (eventhandle) - 当错误发生时触发，`event.detail = {errMsg}`
- `bindload` (eventhandle) - 当图片载入完毕时触发，`event.detail = {height, width}`

**Skyline 特有属性**：
- `fade-in` (boolean) - 是否渐显，默认值：false

**WebView 特有属性**：
- `webp` (boolean) - 默认不解析 webP 格式，只支持网络资源，默认值：false
- `lazy-load` (boolean) - 图片懒加载，在即将进入一定范围（上下三屏）时才开始加载，Skyline 默认懒加载，默认值：false
- `forceHttps` (boolean) - 自动将 http 链接替换为 https 链接，默认值：false

**支持长按识别的码**：
- 小程序码
- 微信个人码（2.18.0+）
- 企业微信个人码（2.18.0+）
- 普通群码（2.18.0+）
- 互通群码（2.18.0+）
- 公众号二维码（2.18.0+）

**注意事项**：
- image 组件默认宽度 320px、高度 240px
- image 组件进行缩放时，计算出来的宽高可能带有小数，在不同 webview 内核下渲染可能会被抹去小数部分
- 使用 svg 格式且 mode=scaleToFill 时，WebView 会居中（除非 svg 里加上 preserveAspectRatio="none"），Skyline 则会撑满
- svg 格式不支持百分比单位
- svg 格式不支持 `<style>`

### live-player
**功能**：实时音视频播放组件，v2.9.1 起支持同层渲染

**属性**：
- `src` (string) - 音视频地址，支持 RTMP、FLV、HLS 格式
- `mode` (string) - 模式，默认值：live
  - `live` - 直播模式
  - `RTC` - 实时通话模式
- `autoplay` (boolean) - 是否自动播放，默认值：false
- `muted` (boolean) - 是否静音，默认值：false
- `orientation` (string) - 画面方向，默认值：vertical
  - `vertical` - 竖直
  - `horizontal` - 水平
- `object-fit` (string) - 当视频大小与 video 容器大小不一致时，视频的表现形式，默认值：contain
  - `contain` - 包含
  - `fillCrop` - 填充
- `background-mute` (boolean) - 是否开启后台静音，默认值：false
- `min-cache` (number) - 最小缓冲区，单位 s，默认值：1
- `max-cache` (number) - 最大缓冲区，单位 s，默认值：3
- `sound-mode` (string) - 音频输出模式，默认值：speaker
  - `speaker` - 扬声器
  - `ear` - 听筒
- `auto-pause-if-navigate` (boolean) - 当跳转到其它小程序页面时，是否自动暂停本页面的实时音视频播放，默认值：true
- `auto-pause-if-open-native` (boolean) - 当跳转到其它微信原生页面时，是否自动暂停本页面的实时音视频播放，默认值：true
- `picture-in-picture-mode` (array) - 小窗模式，默认值：[]
  - `push` - 从当前页跳转至下一页时出现小窗
  - `pop` - 离开当前页面时触发小窗
- `enable-recv-message` (boolean) - 是否接收消息，默认值：false
- `auto-focus` (boolean) - 是否自动聚焦，默认值：false
- `enable-camera` (boolean) - 是否开启摄像头，默认值：false
- `auto-mirror` (boolean) - 是否自动镜像，默认值：false
- `mixing` (boolean) - 是否开启混音，默认值：false
- `beauty` (number) - 美颜，取值范围 0-9，0 表示关闭，默认值：0
- `whiteness` (number) - 美白，取值范围 0-9，0 表示关闭，默认值：0
- `aspect` (string) - 宽高比，可选值有 3:4, 9:16，默认值：9:16
- `zoom` (boolean) - 是否开启缩放，默认值：false
- `device-position` (string) - 摄像头方向，默认值：front
  - `front` - 前置
  - `back` - 后置
- `enable-mic` (boolean) - 是否开启麦克风，默认值：false
- `enable-agc` (boolean) - 是否开启自动增益控制，默认值：false
- `enable-ans` (boolean) - 是否开启主动降噪，默认值：false
- `enable-echo-cancel` (boolean) - 是否开启回声消除，默认值：false
- `enable-auto-focus` (boolean) - 是否开启自动对焦，默认值：false
- `enable-zoom` (boolean) - 是否开启双指缩放，默认值：false
- `enable-torch` (boolean) - 是否开启闪光灯，默认值：false
- `enable-mute` (boolean) - 是否开启静音，默认值：false
- `enable-mirror` (boolean) - 是否开启镜像，默认值：false
- `enable-remote-mirror` (boolean) - 是否开启远程镜像，默认值：false
- `enable-recv-message` (boolean) - 是否接收消息，默认值：false
- `enable-snapshot` (boolean) - 是否开启截图，默认值：false
- `enable-record` (boolean) - 是否开启录制，默认值：false
- `enable-background-mute` (boolean) - 是否开启后台静音，默认值：false
- `enable-picture-in-picture` (boolean) - 是否开启画中画，默认值：false
- `enable-casting` (boolean) - 是否开启投屏，默认值：false
- `enable-casting-state-change` (boolean) - 是否开启投屏状态变化，默认值：false
- `enable-casting-interrupt` (boolean) - 是否开启投屏中断，默认值：false

**事件**：
- `bindstatechange` - 播放状态变化事件，`event.detail = {code}`
- `binderror` - 播放错误事件，`event.detail = {errMsg}`
- `bindnetstatus` - 网络状态变化事件，`event.detail = {info}`
- `bindfullscreenchange` - 全屏变化事件，`event.detail = {direction, fullScreen}`
- `bindaudiovolumenotify` - 音频音量变化事件，`event.detail = {volume}`
- `bindenterpictureinpicture` - 进入画中画事件
- `bindleavepictureinpicture` - 离开画中画事件
- `bindcastingstatechange` - 投屏状态变化事件，`event.detail = {type, state}`
- `bindcastinginterrupt` - 投屏中断事件

**状态码**：
- `2001` - 拉流：已经连接服务器
- `2002` - 拉流：已经连接 RTMP 服务器,开始拉流
- `2003` - 拉流：网络接收到首个视频数据包(IDR)
- `2004` - 拉流：视频播放开始
- `2005` - 拉流：视频播放进度
- `2006` - 拉流：视频播放结束
- `2007` - 拉流：视频播放Loading
- `2008` - 拉流：解码器启动
- `2009` - 拉流：视频分辨率改变
- `2030` - 音频设备发生改变
- `2032` - 拉流：视频渲染首帧事件
- `2101` - 拉流：当前视频帧解码失败
- `2102` - 拉流：当前音频帧解码失败
- `2103` - 拉流：网络断连, 已启动自动重连
- `2104` - 拉流：网络来包不稳
- `2105` - 拉流：当前视频播放出现卡顿
- `2106` - 拉流：硬解启动失败，采用软解
- `2107` - 拉流：当前视频帧不连续，可能丢帧
- `2108` - 拉流：当前流硬解第一个I帧失败，SDK自动切软解
- `3001` - 拉流：RTMP -DNS解析失败
- `3002` - 拉流：RTMP服务器连接失败
- `3003` - 拉流：RTMP服务器握手失败
- `3005` - 拉流：RTMP 读/写失败，之后会发起网络重试
- `-2301` - 拉流：网络断连，且经多次重连无效，请自行重启拉流
- `-2302` - 拉流：获取拉流地址失败

**注意事项**：
- live-player 默认宽度300px、高度225px，可通过wxss设置宽高
- 开发者工具上暂不支持
- 基础库 1.7.0 开始支持，低版本需做兼容处理
- 需要申请开通相关类目权限

**示例**：
```html
<live-player 
  src="https://domain/pull_stream" 
  mode="RTC" 
  autoplay="{{true}}"
  bindstatechange="statechange" 
  binderror="error"
  bindnetstatus="netstatus"
  style="width: 300px; height: 225px;">
</live-player>
```



### live-pusher
**功能**：实时音视频录制组件，v2.9.1 起支持同层渲染

**属性**：
- `url` (string) - 推流地址，支持 RTMP 协议
- `mode` (string) - 推流模式，默认值：SD
  - `SD` - 标清
  - `HD` - 高清
  - `FHD` - 超清
  - `RTC` - 实时通话
- `autopush` (boolean) - 是否自动推流，默认值：false
- `muted` (boolean) - 是否静音，默认值：false
- `enable-camera` (boolean) - 是否开启摄像头，默认值：true
- `auto-focus` (boolean) - 是否自动聚焦，默认值：true
- `device-position` (string) - 摄像头方向，默认值：front
  - `front` - 前置
  - `back` - 后置
- `enable-mic` (boolean) - 是否开启麦克风，默认值：true
- `enable-agc` (boolean) - 是否开启自动增益控制，默认值：false
- `enable-ans` (boolean) - 是否开启主动降噪，默认值：false
- `enable-echo-cancel` (boolean) - 是否开启回声消除，默认值：false
- `enable-auto-focus` (boolean) - 是否开启自动对焦，默认值：true
- `enable-zoom` (boolean) - 是否开启双指缩放，默认值：false
- `enable-torch` (boolean) - 是否开启闪光灯，默认值：false
- `enable-mirror` (boolean) - 是否开启镜像，默认值：false
- `enable-remote-mirror` (boolean) - 是否开启远程镜像，默认值：false
- `enable-recv-message` (boolean) - 是否接收消息，默认值：false
- `enable-snapshot` (boolean) - 是否开启截图，默认值：false
- `enable-record` (boolean) - 是否开启录制，默认值：false
- `enable-background-mute` (boolean) - 是否开启后台静音，默认值：false
- `enable-picture-in-picture` (boolean) - 是否开启画中画，默认值：false
- `enable-casting` (boolean) - 是否开启投屏，默认值：false
- `enable-casting-state-change` (boolean) - 是否开启投屏状态变化，默认值：false
- `enable-casting-interrupt` (boolean) - 是否开启投屏中断，默认值：false
- `beauty` (number) - 美颜，取值范围 0-9，0 表示关闭，默认值：0
- `whiteness` (number) - 美白，取值范围 0-9，0 表示关闭，默认值：0
- `aspect` (string) - 宽高比，可选值有 3:4, 9:16，默认值：9:16
- `zoom` (boolean) - 是否开启缩放，默认值：false
- `min-bitrate` (number) - 最小码率，单位 kbps，默认值：200
- `max-bitrate` (number) - 最大码率，单位 kbps，默认值：1000
- `waiting-image` (string) - 等待画面资源，2.3.0 起完整支持网络路径、临时文件和包内路径
- `background-mute` (boolean) - 是否开启后台静音，默认值：false
- `picture-in-picture-mode` (array) - 小窗模式，默认值：[]
  - `push` - 从当前页跳转至下一页时出现小窗
  - `pop` - 离开当前页面时触发小窗

**事件**：
- `bindstatechange` - 推流状态变化事件，`event.detail = {code}`
- `binderror` - 推流错误事件，`event.detail = {errCode, errMsg}`
- `bindnetstatus` - 网络状态变化事件，`event.detail = {info}`
- `bindfullscreenchange` - 全屏变化事件，`event.detail = {direction, fullScreen}`
- `bindaudiovolumenotify` - 音频音量变化事件，`event.detail = {volume}`
- `bindenterpictureinpicture` - 进入画中画事件
- `bindleavepictureinpicture` - 离开画中画事件
- `bindcastingstatechange` - 投屏状态变化事件，`event.detail = {type, state}`
- `bindcastinginterrupt` - 投屏中断事件

**状态码（code）**：
- `1001` - 推流：已经连接推流服务器
- `1002` - 推流：已经与服务器握手完毕，开始推流
- `1003` - 推流：打开摄像头成功
- `1004` - 推流：录屏启动成功
- `1005` - 推流：推流动态调整分辨率
- `1006` - 推流：推流动态调整码率
- `1007` - 推流：首帧画面采集完成
- `1008` - 推流：编码器启动
- `1018` - 推流：进房成功（ROOM协议特有）
- `1019` - 推流：退房成功（ROOM协议特有）
- `1020` - 推流：远端主播列表变化（ROOM协议特有）
- `1021` - 推流：网络变更时重进房，WiFi 切换到4G 会触发断线重连（ROOM协议特有）
- `1022` - 推流：进入房间失败（ROOM协议特有）
- `1031` - 推流：远端主播进房通知（ROOM协议特有）
- `1032` - 推流：远端主播退房通知（ROOM协议特有）
- `1033` - 推流：远端主播视频状态位变化（ROOM协议特有）
- `1034` - 推流：远端主播音频状态位变化（ROOM协议特有）
- `1101` - 推流：网络状况不佳：上行带宽太小，上传数据受阻
- `1102` - 推流：网络断连, 已启动自动重连
- `1103` - 推流：硬编码启动失败, 采用软编码
- `1104` - 推流：视频编码失败, 内部会重启编码器
- `3001` - 推流：RTMP DNS解析失败
- `3002` - 推流：RTMP服务器连接失败
- `3003` - 推流：RTMP服务器握手失败
- `3004` - 推流：RTMP服务器主动断开，请检查推流地址的合法性或防盗链有效期
- `3005` - 推流：RTMP 读/写失败
- `4998` - Mic状态切换的时候，enable-mic触发(iOS特有)
- `4999` - mute状态切换的时候，muted 触发(iOS特有)
- `5001` - 系统电话打断或者微信音视频电话打断
- `-1301` - 推流：打开摄像头失败
- `-1302` - 推流：打开麦克风失败
- `-1303` - 推流：视频编码失败
- `-1304` - 推流：音频编码失败
- `-1305` - 推流：不支持的视频分辨率
- `-1306` - 推流：不支持的音频采样率
- `-1307` - 推流：网络断连，且经多次重连抢救无效，更多重试请自行重启推流
- `-1308` - 推流：开始录屏失败，可能是被用户拒绝
- `-1309` - 推流：录屏失败，不支持的Android系统版本，需要5.0以上的系统
- `-1310` - 推流：录屏被其他应用打断了
- `-1311` - 推流：Android Mic打开成功，但是录不到音频数据
- `-1312` - 推流：录屏动态切横竖屏失败
- `0` - 无错误

**错误码（errCode）**：
- `10001` - 用户禁止使用摄像头
- `10002` - 用户禁止使用录音
- `10003` - 背景音资源（BGM）加载失败
- `10004` - 等待画面资源（waiting-image）加载失败

**网络状态数据（info）**：
- `videoBitrate` - 当前视频编/码器输出的比特率，单位 kbps
- `audioBitrate` - 当前音频编/码器输出的比特率，单位 kbps
- `videoFPS` - 当前视频帧率
- `videoGOP` - 当前视频 GOP,也就是每两个关键帧(I帧)间隔时长，单位 s
- `netSpeed` - 当前的发送/接收速度
- `netJitter` - 网络抖动情况，抖动越大，网络越不稳定
- `netQualityLevel` - 网络质量：0：未定义 1：最好 2：好 3：一般 4：差 5：很差 6：不可用
- `videoWidth` - 视频画面的宽度
- `videoHeight` - 视频画面的高度
- `videoCache` - 主播端堆积的视频帧数
- `audioCache` - 主播端堆积的音频帧数

**注意事项**：
- live-pusher 默认宽度为100%、无默认高度，请通过wxss设置宽高
- 开发者工具上暂不支持
- 基础库 1.7.0 开始支持，低版本需做兼容处理
- 需要用户授权 `scope.camera`、`scope.record`
- 需要申请开通相关类目权限
- 请注意原生组件使用限制

**示例**：
```html
<live-pusher 
  url="https://domain/push_stream" 
  mode="RTC" 
  autopush="{{true}}"
  bindstatechange="statechange" 
  binderror="error"
  bindnetstatus="netstatus"
  style="width: 300px; height: 225px;">
</live-pusher>
```

### video
**功能**：视频播放组件，v2.4.0 起支持同层渲染

**属性**：
- `src` (string) - 要播放视频的资源地址，支持网络路径、本地临时路径、云文件ID（2.3.0+），必填
- `duration` (number) - 指定视频时长
- `controls` (boolean) - 是否显示默认播放控件（播放/暂停按钮、播放进度、时间），默认值：true
- `danmu-list` (array) - 弹幕列表
- `danmu-btn` (boolean) - 是否显示弹幕按钮，默认值：false
- `enable-danmu` (boolean) - 是否开启弹幕，默认值：false
- `autoplay` (boolean) - 是否自动播放，默认值：false
- `loop` (boolean) - 是否循环播放，默认值：false
- `muted` (boolean) - 是否静音播放，默认值：false
- `initial-time` (number) - 指定初始播放位置，单位 s，默认值：0
- `direction` (number) - 设置全屏时视频的方向，不指定则根据宽高比自动判断，默认值：0
  - `0` - 正常竖屏
  - `90` - 逆时针90度
  - `270` - 顺时针90度
- `show-progress` (boolean) - 是否显示播放进度，默认值：true
- `show-fullscreen-btn` (boolean) - 是否显示全屏按钮，默认值：true
- `show-play-btn` (boolean) - 是否显示播放按钮，默认值：true
- `show-center-play-btn` (boolean) - 是否显示视频中间的播放按钮，默认值：true
- `enable-progress-gesture` (boolean) - 是否开启控制进度的手势，默认值：true
- `show-casting-button` (boolean) - 是否显示投屏按钮，默认值：false
- `picture-in-picture-mode` (array) - 小窗模式，默认值：[]
  - `push` - 从当前页跳转至下一页时出现小窗
  - `pop` - 离开当前页面时触发小窗
- `enable-play-gesture` (boolean) - 是否开启播放手势，即双击切换播放/暂停，默认值：false
- `auto-pause-if-navigate` (boolean) - 当跳转到其它小程序页面时，是否自动暂停本页面的视频播放，默认值：true
- `auto-pause-if-open-native` (boolean) - 当跳转到其它微信原生页面时，是否自动暂停本页面的视频播放，默认值：true
- `vslide-gesture` (boolean) - 在非全屏模式下，是否开启亮度和音量调节手势，默认值：false
- `vslide-gesture-in-fullscreen` (boolean) - 在全屏模式下，是否开启亮度和音量调节手势，默认值：true
- `ad-unit-id` (string) - 视频前贴广告单元ID，可通过小程序后台申请
- `poster` (string) - 视频封面图片地址，支持网络路径、本地临时路径、云文件ID
- `poster-for-crawler` (string) - 用于给搜索等场景作为视频封面展示，建议直接传视频的网络图片地址
- `object-fit` (string) - 当视频大小与 video 容器大小不一致时，视频的表现形式，默认值：contain
  - `contain` - 包含
  - `fillCrop` - 填充
- `codec` (string) - 解码器选择，默认值：hardware
  - `hardware` - 硬件解码
  - `software` - 软件解码
- `http-cache` (boolean) - 是否开启 http 缓存，默认值：true
- `referrer-policy` (string) - 设置 HTTP 请求的 referer 字段，默认值：no-referrer
- `title` (string) - 视频标题，全屏时在视频顶部显示
- `play-btn-position` (string) - 播放按钮的位置，默认值：center
  - `center` - 中间
  - `bottom` - 底部
- `play-btn-image` (string) - 自定义播放按钮图片地址
- `play-btn-image-hover` (string) - 自定义播放按钮图片地址（按下状态）
- `enable-auto-rotation` (boolean) - 是否开启自动旋转，默认值：false
- `show-snapshot-btn` (boolean) - 是否显示截图按钮，默认值：false
- `show-background-play-btn` (boolean) - 是否显示后台播放按钮，默认值：false
- `background-poster` (string) - 后台播放时的封面图片
- `enable-play-in-background` (boolean) - 是否开启后台播放，默认值：false
- `enable-play-in-background-mode` (boolean) - 是否开启后台播放模式，默认值：false
- `bindplay` (eventhandle) - 当开始/继续播放时触发play事件
- `bindpause` (eventhandle) - 当暂停播放时触发 pause 事件
- `bindended` (eventhandle) - 当播放到末尾时触发 ended 事件
- `bindtimeupdate` (eventhandle) - 播放进度变化时触发，`event.detail = {currentTime, duration}`
- `bindfullscreenchange` (eventhandle) - 视频进入和退出全屏时触发，`event.detail = {fullScreen, direction}`
- `bindwaiting` (eventhandle) - 视频出现缓冲时触发
- `binderror` (eventhandle) - 视频播放出错时触发
- `bindprogress` (eventhandle) - 加载进度变化时触发，`event.detail = {buffered}`
- `bindloadedmetadata` (eventhandle) - 视频元数据加载完成时触发，`event.detail = {width, height, duration}`
- `bindcontrolstoggle` (eventhandle) - 切换 controls 显示隐藏时触发，`event.detail = {show}`
- `bindenterpictureinpicture` (eventhandle) - 播放器进入小窗
- `bindleavepictureinpicture` (eventhandle) - 播放器退出小窗
- `bindseekcomplete` (eventhandle) - seek 完成时触发
- `bindcastinguserselect` (eventhandle) - 用户选择投屏设备时触发，`event.detail = {state}`
- `bindcastingstatechange` (eventhandle) - 投屏成功/失败时触发，`event.detail = {type, state}`
- `bindcastinginterrupt` (eventhandle) - 投屏被中断时触发

**支持的格式**：
- **视频格式**：mp4、mov（仅iOS）、m4v（仅iOS）、3gp、avi（仅iOS）、m3u8、webm（仅Android）
- **编码格式**：H.264、HEVC、MPEG-4、VP9（仅Android）

**小窗特性**：
- **触发模式**：push（页面栈push）、pop（页面栈pop）
- **自动判断尺寸**：小窗容器尺寸会根据原组件尺寸自动判断
- **导航回原页面**：点击小窗，用户会被导航回小窗对应的播放器页面
- **关闭方式**：点击小窗右上角的关闭按钮或调用 `context.exitPictureInPicture()` 接口

**DRM 加密播放**：
- 支持 DRM 加密视频播放
- 需要提供视频地址、身份认证 url、license url
- Android 和 iOS 使用不同的 DRM 协议（Android：widevine；iOS：fairplay）

**注意事项**：
- video 默认宽度 300px、高度 225px，可通过 wxss 设置宽高
- 从 2.4.0 起 video 支持同层渲染，更多请参考原生组件使用限制
- 若当前组件所在的页面或全局开启了 `enablePassiveEvent` 配置项，该内置组件可能会出现非预期表现

**示例**：
```html
<!-- 基础视频播放 -->
<video 
  src="{{videoUrl}}" 
  controls="{{true}}"
  autoplay="{{false}}"
  loop="{{false}}"
  muted="{{false}}"
  bindplay="onPlay"
  bindpause="onPause"
  bindended="onEnded"
  bindtimeupdate="onTimeUpdate"
  style="width: 100%; height: 200px;">
</video>

<!-- 弹幕视频 -->
<video 
  src="{{videoUrl}}" 
  danmu-list="{{danmuList}}"
  enable-danmu="{{true}}"
  danmu-btn="{{true}}"
  style="width: 100%; height: 200px;">
</video>

<!-- 小窗模式视频 -->
<video 
  src="{{videoUrl}}" 
  picture-in-picture-mode="{{['push', 'pop']}}"
  bindenterpictureinpicture="onEnterPictureInPicture"
  bindleavepictureinpicture="onLeavePictureInPicture"
  style="width: 100%; height: 200px;">
</video>
```

### voip-room
**功能**：多人音视频对话组件，需用户授权 `scope.camera`、`scope.record`

**属性**：
- `openid` (string) - 进入房间用户的 openid，必填
- `mode` (string) - 对话窗口类型，默认值：camera
  - `camera` - 自身传入 camera
  - `video` - 其他用户传入 video
- `device-position` (string) - 摄像头方向，仅在 mode 为 camera 时有效，默认值：front
  - `front` - 前置摄像头
  - `back` - 后置摄像头
- `object-fit` (string) - 画面与容器比例不一致时，画面的表现形式，默认值：fill
  - `fill` - 填充
  - `contain` - 包含
  - `cover` - 覆盖，安卓暂未支持，iOS 生效

**事件**：
- `binderror` (eventhandle) - 创建对话窗口失败时触发

**使用流程**：
1. 开通该组件权限后，开发者可在 `joinVoIPChat` 成功后，获取房间成员的 `openid`
2. 将 `openid` 传递给 `voip-room` 组件，以显示成员画面
3. 根据是否为当前用户，设置不同的 `mode` 值

**注意事项**：
- 开发者工具上暂不支持
- 请注意原生组件使用限制
- 基础库 2.11.0 开始支持，低版本需做兼容处理
- 需要用户授权 `scope.camera`、`scope.record`

**示例**：
```html
<block wx:for="{{openIdList}}" wx:key="*this">
  <voip-room
    openid="{{item}}"
    mode="{{selfOpenId === item ? 'camera' : 'video'}}"
    device-position="front"
    object-fit="fill"
    binderror="onVoipError">
  </voip-room>
</block>
```

**相关 API**：
- `wx.joinVoIPChat` - 加入多人音视频聊天
- `wx.exitVoIPChat` - 退出多人音视频聊天
- `wx.updateVoIPChatMuteConfig` - 更新多人音视频聊天静音设置

##  8.8.6 地图组件
### map

**功能**：地图组件，提供了地图展示、交互、叠加点线面及文字等功能，同时支持个性化地图样式

**基础属性**：
- `longitude` (number) - 中心经度，必填，浮点数，范围 -180 ~ 180
- `latitude` (number) - 中心纬度，必填，浮点数，范围 -90 ~ 90
- `scale` (number) - 缩放级别，默认值：16，范围 3 ~ 20
- `min-scale` (number) - 最小缩放级别，默认值：3，范围 3 ~ 20
- `max-scale` (number) - 最大缩放级别，默认值：20，范围 3 ~ 20
- `markers` (array) - 标记点，数组类型
- `covers` (array) - 即将移除，请使用 markers
- `polyline` (array) - 路线，数组类型
- `polygons` (array) - 多边形，数组类型
- `circles` (array) - 圆，数组类型
- `controls` (array) - 控件（即将废弃，建议使用 cover-view 代替）
- `include-points` (array) - 缩放视野以包含所有给定的坐标点
- `show-location` (boolean) - 显示带有方向的当前定位点，默认值：false
- `subkey` (string) - 地图能力【个性化地图】使用的key，不支持动态修改
- `layer-style` (number) - 地图能力【个性化地图】配置的 style，默认值：1
- `rotate` (number) - 旋转角度，范围 0 ~ 360，地图正北和设备 y 轴角度的夹角，默认值：0
- `skew` (number) - 倾斜角度，范围 0 ~ 40，关于 z 轴的倾角，默认值：0
- `enable-3D` (boolean) - 开启 3D 楼块效果，默认值：false
- `show-compass` (boolean) - 显示指南针，默认值：false
- `show-scale` (boolean) - 显示比例尺，工具暂不支持，默认值：false
- `enable-overlooking` (boolean) - 开启俯视，默认值：false
- `enable-auto-max-overlooking` (boolean) - 开启最大俯视角，俯视角度从 45 度拓展到 75 度，默认值：false
- `enable-zoom` (boolean) - 是否支持缩放，默认值：true
- `enable-scroll` (boolean) - 是否支持拖动，默认值：true
- `enable-rotate` (boolean) - 是否支持旋转，默认值：false
- `enable-satellite` (boolean) - 是否开启卫星图，默认值：false
- `enable-traffic` (boolean) - 是否开启实时路况，默认值：false
- `enable-poi` (boolean) - 是否展示 POI 点，默认值：true
- `enable-building` (boolean) - 是否展示建筑物
- `setting` (object) - 设置，对象类型

**事件**：
- `bindtap` (eventhandle) - 点击地图时触发    
- `bindmarkertap` (eventhandle) - 点击标记点时触发，`e.detail = {markerId}`
- `bindlabeltap` (eventhandle) - 点击label时触发，`e.detail = {markerId}`
- `bindcontroltap` (eventhandle) - 点击控件时触发，`e.detail = {controlId}`
- `bindcallouttap` (eventhandle) - 点击标记点对应的气泡时触发，`e.detail = {markerId}`
- `bindupdated` (eventhandle) - 在地图渲染更新完成时触发
- `bindregionchange` (eventhandle) - 视野发生变化时触发
- `bindpoitap` (eventhandle) - 点击地图poi点时触发，`e.detail = {name, longitude, latitude}`
- `bindpolylinetap` (eventhandle) - 点击地图路线时触发，`e.detail = {longitude, latitude}`
- `bindabilitysuccess` (eventhandle) - 地图能力生效时触发，`e.detail = {ability, errCode, errMsg}`
- `bindabilityfail` (eventhandle) - 地图能力失败时触发，`e.detail = {ability, errCode, errMsg}`
- `bindauthsuccess` (eventhandle) - 地图鉴权结果成功时触发，`e.detail = {errCode, errMsg}`
- `bindinterpolatepoint` (eventhandle) - MapContext.moveAlong 插值动画时触发，`e.detail = {markerId, longitude, latitude, animationStatus: "interpolating" | "complete"}`
- `binderror` (eventhandle) - 组件错误时触发，例如创建或鉴权失败，`e.detail = {longitude, latitude}`

**marker 标记点属性**：
- `id` (number) - 标记点 id，marker 点击事件回调会返回此 id
- `clusterId` (Number) - 聚合簇的 id，自定义点聚合簇效果时使用
- `joinCluster` (Boolean) - 是否参与点聚合，默认不参与点聚合
- `latitude` (number) - 纬度，必填，浮点数，范围 -90 ~ 90
- `longitude` (number) - 经度，必填，浮点数，范围 -180 ~ 180
- `title` (string) - 标注点名，点击时显示，callout 存在时将被忽略
- `zIndex` (number) - 显示层级
- `iconPath` (string) - 显示的图标，必填，项目目录下的图片路径，支持网络路径、本地路径、代码包路径
- `rotate` (number) - 旋转角度，顺时针旋转的角度，范围 0 ~ 360，默认为 0
- `alpha` (number) - 标注的透明度，默认 1，无透明，范围 0 ~ 1
- `width` (number/string) - 标注图标宽度，默认为图片实际宽度
- `height` (number/string) - 标注图标高度，默认为图片实际高度
- `callout` (Object) - 标记点上方的气泡窗口，支持的属性见下表，可识别换行符
- `customCallout` (Object) - 自定义气泡窗口，支持的属性见下表
- `label` (Object) - 为标记点旁边增加标签，支持的属性见下表，可识别换行符
- `anchor` (Object) - 经纬度在标注图标的锚点，默认底边中点，`{x, y}`，x 表示横向(0-1)，y 表示竖向(0-1)。`{x: .5, y: 1}` 表示底边中点
- `aria-label` (string) - 无障碍访问，（属性）元素的额外描述
- `collisionRelation` (string) - 碰撞关系   
- `collision` (string) - 碰撞类型   

**marker 上的气泡 callout**：
- `content` (string) - 文本
- `color` (string) - 文本颜色
- `fontSize` (number) - 文字大小
- `borderRadius` (number) - 边框圆角
- `borderWidth` (number) - 边框宽度
- `borderColor` (string) - 边框颜色
- `bgColor` (string) - 背景色
- `padding` (number) - 文本边缘留白
- `display` (string) - 'BYCLICK':点击显示; 'ALWAYS':常显
- `textAlign` (string) - 文本对齐方式。有效值: left, right, center
- `anchorX` (number) - label的坐标，原点是 marker 对应的经纬度
- `anchorY` (number) - label的坐标，原点是 marker 对应的经纬度
- `collision` (string) - 碰撞类型
**marker 上的自定义气泡 customCallout**：
- `display` (string) - 自定义气泡窗口的显示方式，有效值: 'BYCLICK' | 'ALWAYS'
- `anchorY` (number) - 自定义气泡窗口的锚点，原点是 marker 对应的经纬度
- `anchorX` (number) - 自定义气泡窗口的锚点，原点是 marker 对应的经纬度

**marker 上的气泡 label**：
- `content` (string) - 文本
- `color` (string) - 文本颜色
- `fontSize` (number) - 文字大小
- `anchorX` (number) - label的坐标，原点是 marker 对应的经纬度
- `anchorY` (number) - label的坐标，原点是 marker 对应的经纬度
- `borderWidth` (number) - 边框宽度
- `borderColor` (string) - 边框颜色
- `borderRadius` (number) - 边框圆角
- `bgColor` (string) - 背景色
- `padding` (number) - 文本边缘留白
- `textAlign` (string) - 文本对齐方式。有效值: left, right, center
- `collision` (string) - 碰撞类型

**polyline 路线属性**：
- `points` (array) - 经纬度数组，必填，`[{latitude: 0, longitude: 0}]`
- `color` (string) - 线的颜色，十六进制
- `colorList` (array) - 彩虹线，存在时忽略 color 值
- `width` (number) - 线的宽度
- `dottedLine` (boolean) - 是否虚线，默认 false
- `arrowLine` (boolean) - 带箭头的线，默认 false，开发者工具暂不支持该属性
- `arrowIconPath` (string) - 更换箭头图标，在 arrowLine 为 true 时生效
- `borderColor` (string) - 线的边框颜色
- `borderWidth` (number) - 线的厚度
- `level` (string) - 压盖关系，默认为 abovelabels
- `textStyle` (TextStyle) - 文字样式，折线上文本样式
- `segmentTexts` (`Array<SegmentText>`) - 分段文本，折线上文本内容和位置

注：textStyle 与 segmentTexts 结合可在折线线段上面绘制文字，用来显示路名。

**SegmentText 分段文本属性**：
- `name` (string) - 名称
- `startIndex` (number) - 起点
- `endIndex` (number) - 终点

**TextStyle 文字样式属性**：
- `textColor` (string) - 文字颜色
- `strokeColor` (number) - 描边颜色
- `fontSize` (number) - 文本大小

**control 控件属性**：
- `id` (number) - 控件 id
- `position` (string) - 控件在地图的位置，有效值: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
- `iconPath` (string) - 显示的图标，项目目录下的图片路径
- `clickable` (boolean) - 是否可点击，默认 false

**position 位置属性**：
- `left` (number/string) - 距离左边的距离
- `top` (number/string) - 距离上边的距离
- `width` (number/string) - 宽度
- `height` (number/string) - 高度

**bindregionchange 事件详情**：
- `type` (string) - 视野变化类型，有效值: 'begin' | 'end'
- `detail` (object) - 视野变化详情 拖动地图导致(drag)、缩放导致(scale)、调用接口导致(update)

**polygon 多边形属性**：
- `points` (array) - 经纬度数组，必填，`[{latitude: 0, longitude: 0}]`
- `strokeWidth` (number) - 描边的宽度
- `strokeColor` (string) - 描边的颜色，十六进制
- `fillColor` (string) - 填充颜色，十六进制
- `zIndex` (number) - 设置多边形 Z 轴数值
- `level` (string) - 压盖关系，默认为 abovelabels

**circles 圆属性**：
- `latitude` (number) - 纬度，必填，浮点数，范围 -90 ~ 90
- `longitude` (number) - 经度，必填，浮点数，范围 -180 ~ 180
- `color` (string) - 描边的颜色，十六进制
- `fillColor` (string) - 填充颜色，十六进制
- `radius` (number) - 半径，必填
- `strokeWidth` (number) - 描边的宽度
- `level` (string) - 压盖关系，默认为 abovelabels

**比例尺对照表**：
| scale | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|-------|---|---|---|---|---|---|---|----|----|
| 比例 | 1000km | 500km | 200km | 100km | 50km | 25km | 20km | 10km | 5km |
| scale | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
| 比例 | 2km | 1km | 500m | 200m | 100m | 50m | 20m | 10m | 5m |

**注意事项**：
- 地图组件使用的经纬度是火星坐标系，调用 `wx.getLocation` 接口需要指定 `type` 为 `gcj02`
- 地图中的颜色值需使用6位（8位）十六进制表示，8位时后两位表示alpha值，如：#000000AA
- 地图组件的经纬度必填，如果不填经纬度则默认值是北京的经纬度
- 从 2.8.0 起 map 支持同层渲染，更多请参考原生组件使用限制
- 个性化地图暂不支持工具中调试，请先使用微信客户端进行测试
- 若当前组件所在的页面或全局开启了 `enablePassiveEvent` 配置项，该内置组件可能会出现非预期表现

**相关 API**：
- `wx.createMapContext` - 创建 map 上下文 MapContext 对象
- `wx.getLocation` - 获取当前的地理位置、速度
- `wx.chooseLocation` - 打开地图选择位置
## 8.8.7 Canvas

### 属性说明

| 属性 | 类型 | 默认值 | 必填 | 说明 | 最低版本 |
|------|------|--------|------|------|----------|
| type | string | - | 否 | 指定 canvas 类型，支持 2d (2.9.0) 和 webgl (2.7.0) | 2.7.0 |
| canvas-id | string | - | 否 | canvas 组件的唯一标识符，若指定了 type 则无需再指定该属性 | 1.0.0 |
| disable-scroll | boolean | false | 否 | 当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新 | 1.0.0 |
| bindtouchstart | eventhandle | - | 否 | 手指触摸动作开始 | 1.0.0 |
| bindtouchmove | eventhandle | - | 否 | 手指触摸后移动 | 1.0.0 |
| bindtouchend | eventhandle | - | 否 | 手指触摸动作结束 | 1.0.0 |
| bindtouchcancel | eventhandle | - | 否 | 手指触摸动作被打断，如来电提醒，弹窗 | 1.0.0 |
| bindlongtap | eventhandle | - | 否 | 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动 | 1.0.0 |
| binderror | eventhandle | - | 否 | 当发生错误时触发 error 事件，detail = {errMsg} | 1.0.0 |

### Canvas 类型

#### 1. Canvas 2D (推荐)

从 2.9.0 开始支持的新接口，使用标准的 Canvas 2D API。

**WXML 示例**：
```xml
<canvas type="2d" id="myCanvas"></canvas>
```

**JS 示例**：
```javascript
Page({
  onReady() {
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        // 设置画布尺寸，考虑设备像素比
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        // 绘制图形
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(0, 0, 100, 100)
      })
  }
})
```

#### 2. WebGL

从 2.7.0 开始支持 WebGL 渲染。

**WXML 示例**：
```xml
<canvas type="webgl" id="myCanvas"></canvas>
```

**JS 示例**：
```javascript
Page({
  onReady() {
    const query = wx.createSelectorQuery()
    query.select('#myCanvas').node().exec((res) => {
      const canvas = res[0].node
      const gl = canvas.getContext('webgl')
      
      // 设置清除颜色
      gl.clearColor(1, 0, 1, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
    })
  }
})
```

### 常用绘制方法

#### Canvas 2D API

```javascript
// 矩形
ctx.fillRect(x, y, width, height)  // 填充矩形
ctx.strokeRect(x, y, width, height) // 描边矩形

// 圆形
ctx.beginPath()
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
ctx.fill() // 或 ctx.stroke()

// 线条
ctx.beginPath()
ctx.moveTo(x, y)
ctx.lineTo(x, y)
ctx.stroke()

// 文本
ctx.font = '16px sans-serif'
ctx.fillText(text, x, y)
ctx.strokeText(text, x, y)

// 图片
const img = canvas.createImage()
img.src = 'path/to/image.png'
img.onload = () => {
  ctx.drawImage(img, x, y, width, height)
}
```

#### 旧版 API

```javascript
// 矩形
context.rect(x, y, width, height)
context.fillRect(x, y, width, height)
context.strokeRect(x, y, width, height)

// 圆形
context.arc(x, y, radius, startAngle, endAngle, anticlockwise)

// 线条
context.moveTo(x, y)
context.lineTo(x, y)

// 文本
context.setFontSize(size)
context.fillText(text, x, y)

// 图片
context.drawImage(imageResource, dx, dy, dWidth, dHeight)

// 提交绘制
context.draw()
```

### 注意事项

1. **默认尺寸**：canvas 标签默认宽度 300px、高度 150px
2. **ID 唯一性**：同一页面中的 canvas-id 不可重复
3. **原生组件限制**：请注意原生组件使用限制
4. **硬件加速**：开发者工具中默认关闭了 GPU 硬件加速，可在设置中开启
5. **WebGL 透明背景**：支持通过 `getContext('webgl', { alpha: true })` 获取透明背景
6. **真机调试**：WebGL 暂不支持真机调试，建议使用真机预览
7. **Canvas 2D 尺寸**：需要显式设置画布宽高，默认：300×150，最大：1365×1365
8. **性能问题**：避免设置过大的宽高，在安卓下会有 crash 的问题
9. **事件支持**：iOS 暂不支持 pointer-events
10. **配置项影响**：在 mac 或 windows 小程序下，若开启了 `enablePassiveEvent` 配置项，可能出现非预期表现
11. **鸿蒙 OS**：暂不支持外接纹理

### 相关 API

- `wx.createSelectorQuery()` - 创建选择器查询对象
- `wx.getSystemInfoSync()` - 获取系统信息
- `wx.createCanvasContext()` - 创建 canvas 上下文（旧版）
- `wx.canvasToTempFilePath()` - 将 canvas 导出为图片
- `wx.canvasGetImageData()` - 获取 canvas 区域隐含的像素数据
- `wx.canvasPutImageData()` - 将像素数据绘制到 canvas

### 渲染框架支持

- **Skyline**：使用最新 Nightly 工具调试
- **WebView**：传统渲染框架
## 8.8.8 开发能力
* open-data
* web-view
需要配置业务域名，必须是HTTPS协议。
## 8.8.9 其他
page-meta、navigation-bar

