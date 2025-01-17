# node.js 工具
## 7.5.1 node.js连续运行工具
### `forever`

安装：`npm install forever -g`

启动：`forever start server.js`

重启：`forever restart server.js`

停止：`forever stop server.js`

停止服务：`forever stop all`

查看正在运行的服务：`forever list`

### `PM2`（推荐使用）
安装：`npm install pm2 -g`

启动服务：`pm2 start server.js`

> 启动4个server.js服务并进行自动进行负载均衡：`pm2 start server.js -i 4`

> 启动server.js服务并命名为 "jaqi'server"：`pm2 start server.js --name="jaqi'server"`

> 启动server.js服务,当文件变化时自动重启应用：`pm2 start server.js --watch`

> 启bash服务：`pm2 start server.sh`

查看所有启动的服务：`pm2 list`

查看每个服务的资源占用情况：`pm2 monit`

查看服务详细信息：`pm2 monit server`

查看服务日志：`pm2 logs server`

清空服务日志：`pm2 flush server`

停止服务：`pm2 stop server`

> 停止全部服务：`pm2 stop all`

重启服务：`pm2 restart server`

> 重启全部服务：`pm2 restart all`

