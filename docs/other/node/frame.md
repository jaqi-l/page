
## 7.4.1 Express
安装：`npm install express`
```js
const express = require('express') // 引用express框架
const bodyParser = require('body-parser') // 引用body-parser模块
const app = express() // 挂在框架
 // 处理get请求
app.get('/', function (req, res，next) {
  res.send(res.query) // 发送数据到客服端,相当于于`res.write`和`res.end`的集合。
})

// 处理post请求
app.use(bodyParser.json());  // 解析 application/json
app.post('/', function (req, res，next) {
  res.send(req.bodyParser) // 发送数据到客服端,相当于于`res.write`和`res.end`的集合。
})
 
app.listen(3000)
```
#### 路由
`get(url,fn)`:处理get请求      
`post(url,fn)`:处理post请求   
`use(url,fn)`:无论什么请求都处理    
回调函数`fn`的参数:
> 请求参数的属性  
>> `res.query`:获取`query`类型的参数

> 响应参数的属性   

>> `res.send`:发送数据到客服端,相当于于`res.write`和`res.end`的集合 

> 回调函数的属性(`next`)    
#### 系统中间件
1. `express.static`静态文件托管
```js
app.use('/',express.static("./static/"))
```

#### 第三方中间件
1. `body-parser`:解析JSON、Raw、文本、URL-encoded格式的请求体
> `bodyParser.json()`:解析JSON格式    
> `bodyParser.raw()`:解析二进制格式   
> `bodyParser.text()`:解析文本格式    
> `bodyParser.urlencoded()`:解析文本格式    
2. `multer`解析multipart/form-data格式的请求体(上传文件)
3. `cookie-parser`
3. `cookie-session`
## 7.4.2 Koa
v1:Generator
v2:Generator和async
v3:Generator和async

安装：`npm install koa -S`
```js
const Koa = require("koa");

let server = new Koa() // 创建koa对象
server.listen(80);
```
server属性：
> `listen`:监听端口      
> `context`:设置全局上下文。可以通过ctx调用
#### 路由中间件`koa-router`
`koa`不自带路由，需要单独安装`koa-router`

router属性：
> `get(url,fn)`:处理get请求      
> `post(url,fn)`:处理post请求   
> `all(url,fn)`:无论什么请求都处理   
> `use(url,fn)`:挂载中间件

ctx的属性：   
> `body`:响应内容      
> `cookies`:cookies   
>> `cookies.set`:设置cookies 
>> `cookies.get`:获取cookies  

安装：`npm install koa-router`
```js
const Koa = require("koa");
const Router = require("koa-router");

let server = new Koa()
server.listen(80);

let router = new Router(); // 创建router对象
server.use(router.routes() ) // 挂在router

server.keys = []; //秘钥

router.get("/aa",(ctx,next)=>{
   ctx.cookies.set("user","jaqi.l",{signed:true}); // 设置cookies,signed启动秘钥验证
    ctx.body = "aaa"; // 设置响应内容
})
```
* 嵌套路由
```js
const Koa = require("koa");
const Router = require("koa-router");

let server = new Koa()
server.listen(80);

let router = new Router();

let company = new Router();
company.get("/:name",(ctx,next)=>{
    console.log(ctx.params);
    ctx.body = "我是公司"+ctx.params.name
})

let admin = new Router();
admin.get("/query",(ctx,next)=>{
    ctx.body = "我是管理员"+ctx.query.name
})

let userRouter = new Router();

userRouter.use("/company",company.routes())
userRouter.use("/admin",admin.routes())

router.use("/user",userRouter.routes())
/*
    /user/company/:name
    /user/admin/:name
*/
server.use(router.routes())
```

#### 文件解析中间件`koa-better-body`

安装：`npm install koa-better-body`
```js
const Koa = require("koa");
const body = require("koa-better-body");

let server = new Koa()
server.listen(80);

server.use(body({
  uploadDir:"./upload" // 文件上传目录
}))

server.use(async ctx=>{
  ctx.request.fields
});
```
#### 静态文件服务中间件`koa-static`

安装：`npm install koa-static`
```js
const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");

let server = new Koa();
server.listen(80);

let router = new Router();

router.all(/(\.css)$)/i,static("./static", {
    maxage: 24*60*60*1000 // css文件缓存的过期时间
}))

server.use(router.routes());

server.use(static("./static", {
    index: "index.html",//默认读取的文件
    maxage: 24*60*60*1000 // 文件缓存的过期时间
}));
```

#### session服务中间件`koa-session`
安装：`npm install koa-session -S`
```js
const Koa = require("koa");
const Router = require("koa-router");
const session = require("koa-session");

let server = new Koa();
server.listen(80);

let router = new Router();

server.keys = []; //秘钥

server.use(session({
  maxAge:20*60*1000,// 过期时间
  renew:true // 自动续签
},server));

server.use(async ctx=>{
  if(ctx.session.view){
    ctx.session.view = 0;
  }
  ctx.session.view++;
  ctx.body = `欢迎第${ctx.session.view}次访问`
})
```

#### mysql服务中间件`mysql`、`co-mysql`
安装：`npm install mysql co-mysql -S`
```js
const Koa = require("koa");
const mysql = require("mysql");
const co = require("co-mysql");

// 创建一个与数据库的链接
let con = mysql.createdPool({
  host: "jaqi.myDataBase.com",// 数据库地址
  ports:"3306",
  user: "jaqi", // 用户名
  password: "123456", // 密码
  database: "myDataBase" // 库名
})

let server = new Koa();
server.listen(80);

```

#### 服务端渲染(ssr)中间件`koa-ejs`

安装：`npm install koa-ejs -S`
```js
const Koa = require("koa");
const render = require("koa-ejs");
const path = require("path");

let server = new Koa();

render(server,{
  root:path.resolve(__dirname,"./template"),//模板文件的所在文件夹
  layout:false, // 目标文件，false 自动在文件夹下找
  viewExt:"ejs",// 模板的扩展名
  cache:false,// 缓存
  debug:false,// debug
});

server.use(async ctx=>{
  // 使用template目录下的index模板，并传递数据给模板渲染
  await ctx.render("index",{  
    name:"jaqi",
    sex:"men"
  })
});

server.listen(80);
```
## 7.4.3 egg

## 7.4.4 nest
