## 10.1 微前端概述

微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 `web` 应用的技术手段及方法策略      

微前端的核心目标是将巨石应用拆解成若干可以自治的松耦合微应用，这样才能确保微应用真正具备独立开发、独立运行的能力    

#### 多页面应用、单页面应用、与为微服务应用

1. 多页面应用(`MPA`):一个应用即一个页面。优点是彼此独立互不依赖。缺点是：不便于交流和资源共享，切换会造成浏览器重刷
2. 单页面应用(`SPA`):一个应用多个页面。优点是页面直接便于交流和资源共享，切换不刷新浏览器只加载局部代码。缺点是：彼此独立相互依赖
3. 微前端：合集了`MPA` 与 `SPA` 框架优势，即保证应用独立互不依赖，又便于应用之间交流和资源共享。
  
#### 特征
1. 与技术栈无关，主框架不限制接入应用的技术栈，微应用具备完全自主权
2. 独立开发、独立部署，微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新
3. 增量升级，在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略
4. 独立运行时，每个微应用之间状态隔离，运行时状态不共享


#### 微前端的类型
1. 单实例：即同一时刻，只有一个微应用被展示，微应用具备一个完整的应用生命周期。通常基于 `url` 的变化来做微应用的切换
2. 多实例：同一时刻可展示多个微应用。通常使用 `Web Components` 方案来做微应用封装，微应用更像是一个业务组件而不是应用


## 10.2 微前端框架 `single-spa`

 `single-spa`是单实例微前端框架

### 原理
`single-spa`仅仅是一个微应用生命周期的调度者

![工作流程](/微应用系统架构图.png)
<!-- https://www.processon.com/diagraming/64dd88005adbb0271b1f9f56 -->

1. 路由原理：通过 `pushState` 与 `onpopstate` 操作和监听 `url` 实现微应用的切换
2. 接入方式：基于 `HTML Entry`
3. 代码隔离：基于快照沙箱、代理沙箱


::: tip
1. `pushState`与`popState`详见[3.10.3](/frontend/javascript/BOM#_3-10-3-window%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7) 
2. `HTML Entry` & `JS Entry`
* `JS Entry`
> 原理：所有的资源（css、图片）都打包成一个 `js` 文件,主应用引用微应用打包出的 `js`文件        
> 缺点：打包出来的文件体积庞大，资源加载慢微应用发布后，主应用需要重新打包     

* `HTML Entry`
> 原理：微应用按照原来的方式打包出一个 `html`、主应用加载微应用打包出来的 `html` 文件，并将这个 `html` 节点放在主应用的容器中      
> 缺点：打包出来的文件体积庞大，资源加载慢微应用发布后，主应用需要重新打包     
> ![工作流程](/HTML_Entry.jpg)
:::

###  `iframe` 与 `single-spa`

* `iframe` 的弊端
1. 每次进来都要加载，状态不能保留
2. `DOM` 结构不共享。(比如微应用里有一个 `Modal`，显示的时候只能在那一小块地方展示，不能全屏展示)
特性
3. 无法跟随浏览器前进后退
4. 天生的硬隔离，无法与主应用进行资源共享，交流也很困难

* `single-spa`的优势
1. 切换路由就是切换页面组件，组件的挂载和卸载非常快
2. 单页应用共享 `DOM`
3. 前端控制路由，想前就前，想后就后
4. `React` 通信有 `Redux`，`Vue` 通信有 `Vuex` ，可与 `App` 组件进行交流、资源共享


## 10.3 `single-spa` 的实现库 `qiankun`

* 蚂蚁金融科技基于 `single-spa` 的微前端实现库



### 10.3.1 安装与使用

#### 主应用 

* 初始化主应用
::: code-group
```zsh [Vue/Cli]
npm install -g @vue/cli
vue create main-app
npm install vue-router -S
```

```zsh [Vite]
pnpm install vite
pnpm create vite
pnpm install vue-router -S
```
:::


* 安装 `qiankun`
```zsh
pnpm install qiankun -S 
# 或者 
npm install qiankun -S
```

* 注册主应用
```js
// mainApp.js
import { registerMicroApps } from "qiankun";
import config from "./subApps"; // 微应用配置项

const { subApps } = config;

export function registerApps() {
    try {
        registerMicroApps(subApps, {
            beforeLoad: [
                app => {
                    console.log("before load", app);
                }
            ],
            beforeMount: [
                app => {
                    console.log("before mount", app);
                }
            ],
            afterUnmount: [
                app => {
                    console.log("before unmount", app);
                }
            ]
        });
    } catch (err) {
        console.log(err);
    }
}
```

* 配置微应用
```js
// subApps.js
export default {
    subApps: [
        {
            name: "vue-app", // 微应用名称，跟package.json一致
            entry: "//localhost:7071", // 微应用入口，本地环境下指定端口
            container: "#container", // 挂载微应用的dom
            activeRule: "/vue-app", // 路由匹配规则
            props: {} // 主应用与微应用通信传值
        },
        {
            name: "react-app", // 微应用名称，跟package.json一致
            entry: "//localhost:7072", // 微应用入口，本地环境下指定端口
            container: "#container", // 挂载微应用的dom
            activeRule: "/react-app", // 路由匹配规则
            props: {} // 主应用与微应用通信传值
        }
    ]
};
```


* 挂载主应用
```vue
<!-- src/views/layout/index.vue -->
<template>
  <!-- 微应用的容器 -->
  <div id="container" />
</template>

<script>
import { start } from "qiankun";
import { registerApps } from "@/utils/qiankun";
export default {
    mounted() {
        if (!window.qiankunStarted) {
            window.qiankunStarted = true;
            registerApps();
            start({
                sandbox: {
                    experimentalStyleIsolation: true // 样式隔离
                }
            });
        }
    }
};
</script>

<style>

</style>
```

* 配置微应用路由
```js
// rc/router/index.js
import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "",
        redirect: { name: "app" },
        meta: { title: "App" },
        children: [
            {
                // history模式需要通配所有路由，详见vue-router文档
                path: "/vue-app/:pathMatch(.*)*",
                name: "vue-app",
                meta: {},
                component: () => import("@/views/layout/index.vue")
            },
            {
                // history模式需要通配所有路由，详见vue-router文档
                path: "/react-app/:pathMatch(.*)*",
                name: "react-app",
                meta: {},
                component: () => import("@/views/layout/index.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;

```
<!-- 
已知问题：

1. 版本一致性 如果主应用和微应用都是基于 umi 框架，在使用 @umijs/umi-plugin-qiankun 插件时，要使用同一个版本，否则微应用报错。
2. 跨域 qiankun 是通过 fetch 去获取微应用资源的，所以必须支持跨域


3. 微应用内部跳转，需要在基座路由上提前注册好，否则在跳转后，页面识别不到。

4. css污染 qiankun 只能解决微应用之间的样式相互污染，不能解决微应用样式污染基座的样式

5. 错误捕获，降级处理

6. 路由懒加载样式丢失

风险：

业务场景不全面，可能导致无法评估业务实践
微应用开发流程不完善
社区不够活跃、文档不够完善 -->

* 基于 UI 复用需求的微应用的拆分方案
![微应用的拆分方案](/微应用的拆分方案.png)  

## 10.4 参考文档

[single-spa官方文档](https://zh-hans.single-spa.js.org/docs/getting-started-overview)

[qiankun官方文档](https://qiankun.umijs.org/zh/guide)

[微前端解决方案的演进](https://zhuanlan.zhihu.com/p/78362028)

[qiankun在中后台系统实践](https://zhuanlan.zhihu.com/p/259209543?utm_id=0)

[single-spa原理与实践](https://mp.weixin.qq.com/s?__biz=MzA3NTk4NjQ1OQ==&mid=2247484245&idx=1&sn=9ee91018578e6189f3b11a4d688228c5)

[qiankun-vue 后项目demo](https://github.com/gongshun/qiankun-vue-element-admin)