# 6.7 生命周期
## 6.7.1 生命周期
创建前/后、载入前/后、更新前/后、销毁前/销毁后。

![lifecycle](/lifecycle.png)

| 事件 |  API | <span style="color: red">*</span>Vue3API | 
| -------- | -------- | -------- |
| 实例挂载之前 | `beforeCreate` | `setup()` |
| 实例创建之后 | `created` | - |
| 数据挂载之前 | `beforeMount` | `onBeforeMount` |
| 数据挂载之后 | `mounted` | `onMounted` |
| 数据更新之前 | `beforeUpdate` | `onBeforeUpdate` |
| 数据更新之后 |  `updated` | `onUpdated` |
| 缓存组件被激活 | `activated` | `onActivated` |
| 缓存组件被卸载 |  `deactivated` | `onDeactivated` |
| 实例销毁之前 |  `beforeDestroy` | `onBeforeUnmount` |
| 实例销毁之后 | `destroyed` | `onUnmounted` |
| 实例错误 | `errorHandler` | `app.config.errorHandler` |
| 后代组件错误 | `errorCaptured` | `onErrorCaptured` |
| 当组件读取到响应式数据时 | - | `onRenderTracked`(仅开发模式) |
| 当响应式数据改变触发组件渲染时 | - | `onRenderTriggered`(仅开发模式) |
| 在组件实例在服务器上被渲染之前 | - | `onServerPrefetch`(SSR) |

## 6.7.2 使用方法

::: code-group

```vue [Vue2]
<script>
export default {
  mounted() {
      console.log(`the component is now mounted.`)
  }
}
</script>
```

```vue [Vue3 setup]
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

```vue [Vue3 setup()]
<script>
import { onMounted } from 'vue'

export default {
setup(props, ctx) {
  onMounted(() => {
    console.log(`the component is now mounted.`)
  });
  return {}
}
}
</script>
```
:::

## 6.7.3 生命周期事件
::: code-group

```html [Vue2]
<!-- 以hook:开头 -->
<template>
  <child-component @hook:updated="onUpdated">
</template>
```

```html [Vue3]
<!-- 以vnode-开头 -->
<template>
    <child-component @vnode-updated="onUpdated">
    <!-- 驼峰命名法 -->
    <child-component @vnodeUpdated="onUpdated">
</template>
```
::: code-group