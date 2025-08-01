# 8.7 事件

## 8.7.1 事件类型

### 触摸事件
- **touchstart** - 手指触摸开始
- **touchmove** - 手指触摸后移动
- **touchend** - 手指触摸结束
- **touchcancel** - 手指触摸动作被打断，如来电提醒，弹窗等

### 点击事件
- **tap** - 手指触摸后马上离开
- **longpress** - 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发
- **longtap** - 手指触摸后，超过350ms再离开（推荐使用longpress事件代替）

## 8.7.2 事件绑定

### 事件绑定语法
```html
<!-- 绑定事件 -->
<view bindtap="handleTap">点击我</view>

<!-- 阻止事件冒泡 -->
<view catchtap="handleTap">点击我</view>

<!-- 绑定多个事件 -->
<view bindtap="handleTap" bindtouchstart="handleTouchStart">点击我</view>
```

### 事件绑定方式
- **bind** - 事件绑定不会阻止冒泡阶段中事件继续传播
- **catch** - 事件绑定后，会阻止事件向上冒泡

## 8.7.3 事件对象

### 事件对象属性
| 属性 | 类型 | 说明 |
|------|------|------|
| type | String | 事件类型 |
| timeStamp | Number | 页面打开到触发事件所经过的毫秒数 |
| target | Object | 触发事件的源组件 |
| currentTarget | Object | 事件绑定的当前组件 |
| dataset | Object | 事件源组件上由data-开头的自定义属性组成的集合 |
| mark | Object | 事件触发时，事件冒泡路径上所有的mark会被合并 |
| touches | Array | 触摸事件，当前停留在屏幕中的触摸点信息的数组 |
| changedTouches | Array | 触摸事件，当前变化的触摸点信息的数组 |
| detail | Object | 自定义事件所携带的数据 |

### target 和 currentTarget
- **target** - 触发事件的源组件
- **currentTarget** - 事件绑定的当前组件

**示例：**
```html
<view id="outer" bindtap="handleOuterTap">
  <view id="inner" bindtap="handleInnerTap">内部</view>
</view>
```

```js
Page({
  handleOuterTap(e) {
    console.log('outer tap')
    console.log('target:', e.target.id)        // "inner"
    console.log('currentTarget:', e.currentTarget.id)  // "outer"
  },
  handleInnerTap(e) {
    console.log('inner tap')
    console.log('target:', e.target.id)        // "inner"
    console.log('currentTarget:', e.currentTarget.id)  // "inner"
  }
})
```

## 8.7.4 自定义数据

### dataset 属性
在组件节点中可以附加一些自定义数据，以 `data-` 开头：

```html
<view data-alpha-beta="1" data-alphaBeta="2" bindtap="bindViewTap">
  DataSet Test
</view>
```

```js
Page({
  bindViewTap(e) {
    console.log(e.currentTarget.dataset.alphaBeta)  // 1 (连字符转驼峰)
    console.log(e.currentTarget.dataset.alphabeta)  // 2 (大写转小写)
  }
})
```

### mark 属性
在基础库版本 2.7.1 以上，可以使用 `mark` 来识别具体触发事件的 target 节点：

```html
<view mark:myMark="last" bindtap="bindViewTap">
  <button mark:anotherMark="leaf" bindtap="bindButtonTap">按钮</button>
</view>
```

```js
Page({
  bindViewTap(e) {
    console.log(e.mark.myMark)        // "last"
    console.log(e.mark.anotherMark)   // "leaf"
  },
  bindButtonTap(e) {
    console.log(e.mark.myMark)        // "last"
    console.log(e.mark.anotherMark)   // "leaf"
  }
})
```

## 8.7.5 触摸事件详解

### Touch 对象属性
| 属性 | 类型 | 说明 |
|------|------|------|
| identifier | Number | 触摸点的标识符 |
| pageX, pageY | Number | 距离文档左上角的距离 |
| clientX, clientY | Number | 距离页面可显示区域左上角距离 |

### CanvasTouch 对象属性
| 属性 | 类型 | 说明 |
|------|------|------|
| identifier | Number | 触摸点的标识符 |
| x, y | Number | 距离 Canvas 左上角的距离 |

### touches 和 changedTouches
- **touches** - 当前停留在屏幕上的触摸点
- **changedTouches** - 有变化的触摸点（touchstart、touchmove、touchend、touchcancel）
