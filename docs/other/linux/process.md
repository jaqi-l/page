# 1.7 进程管理
## 1.7.1 查看进程
`ps`查看当前终端正在进行的进程              
`pstree`查看进程树              
`top`实时显示正在进行的进程           
## 1.7.2 查看之间的通信
`kill -l`查看所有支持的信号及信号编号              
`kill 9 22817`9信号编号，22817进程标号              

## 1.7.3 守护进程
`nohup`不受挂起影响，也一直运行。       
`nohup`+`&`不受挂起影响，即使关闭终端，也一直运行。     
```zsh
nohup tail -f /var/log/messages &
```
`screen`进入screen环境，（与服务器断开后，恢复后仍能继续运行）      
`ctrl`+`a`退出screen模式        

## 1.7.4 服务管理工具
* `service`工具     
启动脚本：/etc/init.d/      
* `systemctl`工具(新)       
启动脚本：/usr/lib/systemd/system       
`systemctl start`+`服务名` 启动     
`systemctl stop`+`服务名` 停止      
`systemctl status`+`服务名` 查看状态        
`systemctl restart`+`服务名` 关闭后重新重启     
`systemctl reload`+`服务名` 不关闭直接重新加载      
`systemctl enable`+`服务名`设置随系统自动运行       
`systemctl disable`+`服务名`设置不允许随系统自动运行