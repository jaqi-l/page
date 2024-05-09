## 6.8.1 路由基础
* 安装
```zsh
npm install vue-router
```
* 全局引用      
main.js 

<CodeGroup>
  <CodeGroupItem title="Vue Router 3.x">

  ```js
  import VueRouter from 'vue-router'
  
  Vue.use(VueRouter)
  // 或
  new Vue({
      render: h => h(App),
      router,
  }).$mount('#app')
  ```
  </CodeGroupItem>
  <CodeGroupItem title="Vue Router 4.x">

  ```js
import { createRouter, createWebHistory } from 'vue-router'
// 还有 createWebHashHistory 和 createMemoryHistory

createRouter({
  history: createWebHistory(),
  routes: [],
})
```
  </CodeGroupItem>
</CodeGroup>

#### js方法：
```js
router.push('/index') 
```

#### 标签方法：
```html
<router-link to="/index">首页</router-link> 
<!-- router-link被渲染成a元素，to属性被渲染成href属性 -->
```
```js
 methods: {
    go() {
      this.$router.push('/index')
    },
    goBack(){
        this.$router.go(-1)// 后退一步记录，等同于 history.back()
    },
     goForward(){
        this.$router.go(1) // 在浏览器记录中前进一步，等同于 history.forward()
    }
  }
```

### 动态路由
* query方法（查询路由）
#### 编程式:
```js
this.$router.push({ path: "/index", query: data })// 发送 -> /index
this.$route.query // 接收
```
#### 声明式:
```html
<router-link :to="{ path: '/news', query: data}">新闻</router-link>
```
* params方法(命名路由)
#### 编程式:
```js
 this.$router.push({ name: "index", params: data })// 发送 -> /index?data
 tthis.$route.params // 接收
```
#### 声明式:
```html
<router-link :to="{ name: 'news', params: data}">新闻</router-link>
```
* 路径传参
#### 编程式:
```js
this.$router.push({ path: "/index/:id"})
```
#### 声明式:
```html
<router-link to="/index/+'data'+">首页</router-link> 
```
:::tip
1. query要用(path)路径传参，params要用(name)命名路由传参。
2. 通过命名路由(params)传递的参数，刷新页面参数会丢失。
3. 发送是`$router`,接收使是`$route`
:::

### 路由捕获
```js
path: '*' // 会匹配所有路径，通常用于404错误
path: '/user-*' // 会匹配以 `/user-` 开头的任意路径
```
* 在参数中自定义正则：
```js
path: '/:orderId(\\d+)' // 仅匹配数字
path: '/:chapters(\\d+)*'  // 匹配 /, /1, /1/2, /1/2/3, 等
 ```

### 路由嵌套
```js
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          children: []
        }
      ]
    }
  ]
 ```

:::tip
以`/`开头的嵌套路径会被当作根路径
:::


### 命名视图与嵌套命名视图
* 命名视图
```html
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```
```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // LeftSidebar: LeftSidebar 的缩写
        LeftSidebar,
        // 它们与 `<router-view>` 上的 `name` 属性匹配
        RightSidebar,
      },
    },
  ],
})
```
* 嵌套命名视图
```html
<div>
  <h1>User Settings</h1>
  <NavBar />
  <router-view />
  <router-view name="helper" />
</div>
```
```js
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

### 重定向与别名
#### 从/a重定向到/b：
 ```js
  routes: [
    { path: '/a', redirect: '/b' }
  ]
 ```
#### 重定向另一个命名路由
```js
 routes: [
  { path: '/a', redirect: { name: 'foo' }}
]
```
#### 重定向一个方法
```js
routes: [
  { path: '/a', redirect: to => {
    // 方法接收 目标路由 作为参数
    // return 重定向的 字符串路径/路径对象
  }}
]
```

#### 别名
/a的别名是/b，意味着，当用户访问/b 时，URL会保持为 /b，但是路由匹配则为/a，就像用户访问 /a 一样。
```js
routes: [
  { path: '/a', component: A, alias: '/b' }
]
```


### 路由组件传参
使组件只能在某些特定的URL上使用
#### 取代与$route的耦合：
  ```js
const User = {
    template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
    routes: [
     { path: '/user/:id', component: User }
    ]
})
  ```

#### 通过props解耦：
```js
const User = {
    props: ['id'],
    template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true }, // 当props=true，route.params将会被设置为组件属性

    // 对于包含命名视图的路由，必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

### 响应路由参数的变化
当使用带有参数的路由时需要注意的是相同的组件实例将被重复使用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会被调用。
要对同一个组件中参数的变化做出响应的话，可以使用一下方法：
* `wacth`监听
```js
// 写法一：
watch:{
  $router(to,from){
       console.log(to.path)
  }
},
// 写法二：
watch: {
   $route: {
     handler:  function (val, oldVal){
       console.log(val);
     },
     // 深度观察监听
     deep:  true
   }
},
```
* `beforeRouteUpdate`拦截
```js
  async beforeRouteUpdate (to, from, next) {
    his.userData = await fetchUser(to.params.id)
  },
```


### 替换历史栈
#### 编程式:
```js
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })
```
#### 声明式:
```html
<router-link :to="{ path: '/news', query: data}" replace>新闻</router-link>
```

### 历史模式
* Hash模式
通过`createWebHashHistory()`创建
```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```
:::tip 什么是Hash模式
这里的hash是指url尾巴后的#号及后面的字符。这里的#和css里的#是一个意思。hash也称作锚点，本身是用来做页面定位的，她可以使对应id的元素显示在可是区域内。由于hash值变化不会导致浏览器向服务器发出请求，而且hash改变会触发hashchange事件，浏览器的进后退也能对其进行控制，所以人们在 html5的history出现前，基本都是使用 hash 来实现前端路由的。Hash模式兼容到IE8,使用Hash模式做路由则不能使用锚点功能。
:::
* history(HTML5)模式
通过`createWebHistory()`创建
```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```
:::tip 什么是history(HTML5)模式
HTML5规范提供了history.pushState和history.replaceState来进行路由控制。通过这两个方法可以改变url且不向服务器发送请求。同时不会像hash有一个#,更加的美观。但是history路由需要服务器的支持，并且需将所有的路由重定向倒根页面。history(HTML5)模式兼容到IE10。history(HTML5)模式可以传递体积更大的数据包。
:::
## 6.8.2 导航卫士

#### 局部卫士： 
`beforeRouteEnter`进入当前路由前    
`beforeRouteUpdate`当前路由更新前   
`beforeRouteLeave`离开当前路由前    
#### 全局卫士：
在main.js或router.js配置    
`beforeEach`进入路由时    
`beforeResolve`路由解析后   
`afterEach`进入路由后，不接受next参数   
#### 独享卫士：
在router.js配置   
`beforeEnter`进入路由配置时
#### 参数：
`from`从哪个路由进入    
`to`去哪个路由    
`next`组件渲染完毕后回调    
#### 触发顺序：
`beforeEach`→`beforeEnter`→`beforeRouteEnter`→`beforeRouteUpdate`→`beforeRouteLeave`
→`beforeResolve`→`afterEach`→`beforeRouteEnter`的回调函数


#### 案例
1. 守卫模块（作用于VueRouter）:
```js
routes:[{
  path:"/Blog",
  component:Blog,
  meta:{ // 路由元信息
  auth:true// 表示用户访问该组件是否需要登陆
}]
```

2. 登录模块（作用于登录模块）:
```js
handleLogin(){   //保存用户名和密码
  localStorage.setItem("username",{name:this.uname,psw:this.psw});
  this.$router.push("/blog")}//给VueRouter添加一个历史记录 目的是渲染blog
}
```

3. 守卫判断:
```js
router.beforeEach((to,from,next)=>{
  if (to.meta.auth) {//判断有没有用户名和密码
      if (localStorage.getItem("username")) {//有用户名说明已经登录
        next();
      }else{//没有登录 渲染登录组件
        next({path:"/login"});
      };
    }else{
    next();
  };
});
```

4. 注销模块（作用域实例）：
```js
clearOut(){
  localStorage.removeItem("username"); // 移除本地用户名密码
  this.$router.push("/login") 
}//给VueRouter添加一个历史记录 目的是渲染blog

```