# 7.3 第三方模块

## 7.3.1 调用MySQL数据库(`mysql`)

安装：`npm install mysql -S`

方法：
`createConnection`:创建一个与数据库的链接   
`createPool`:创建一个与数据库的链接池(与`createConnection`相同，用于处理多个链接的情况)   
`query`:创建一个SQL语句   

```js
const mysql = require("mysql"); // 引入mysql模块 
// 创建一个与数据库的链接
let db = mysql.createPool({
    host: "jaqi.myDataBase.com",// 数据库地址
    ports:"3306",
    user: "jaqi", // 用户名
    password: "123456", // 密码
    database: "myDataBase" // 库名
})
// 执行SQL结构化查询语句
// 插入
db.query("INSERT INTO myDataBase.student (name, psw) VALUES ('张三', '654321')",(err,data)=>{
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
})
//查询
db.query('SELECT * FROM `myDataBase`.`student` WHERE id<=200',(err,data)=>{
    if(err){
        console.error(err);
    }else{
        console.log(JSON.stringify(data));
    }
})
```

`MySQL`详见[8.2 MySQL](/other/database/mySQL)


## 7.3.2 服务端渲染(ssr)模块

