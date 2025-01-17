# 9.3 容器命令
有了镜像才能创建容器        
      
## 9.3.1 `docker run`运行镜像
`docker run [OPTIONS] [image]`
> OPTIONS：可选项       
>> `-name`：容器名字          
>> `-d`：后台运行方式   
>> `-rt`：用完即删    
>> `-it`：交互方式进行   
>> `-v`：挂载数据卷   
>> `-e`：环境配置   
>> `-p`：指定容器端口   
>>> `ip:主机端口:容器端口`    
>>> `主机端口:容器端口`   
>>> `容器端口`   

>> `-P`：(大写P)随机容器端口


* 启动centos并进入容器
```
docker run --name nav_server -d  -v /home/jaqi/node_server:/home -p 80:7000 node /bin/bash
```
## 9.3.2 `docker rm`删除容器
`docker rm [image]`
* 批量删除多个
```
 docker rm -f 09d7636201f2 104ea3abc382 c9054809ffad e3ae598e7447 f9ce4763ae59 9d86d1f77623 109b97c45b65 
```

## 9.3.3 `docker start`启动容器
`docker start [image]`

## 9.3.4 `docker restart`重启容器
`docker restart [image]`

## 9.3.5 `docker stop`停止容器
`docker stop [image]`

## 9.3.6 `docker kill`强制停止容器
`docker kill [image]`

## 9.3.7 `docker ps`查看正在运行的容器

`docker ps [OPTIONS]`
> OPTIONS：可选项       
>> `-a`：查看运行过的容器   
>> `-n`：查看最近运行的容器   
>> `-q`：只显示容器编号   

## 9.3.8 `docker attach`进入容器
`docker attach [image]`：进入容器正在运行的终端，不会开启新进程，退出后会自动停止容器服务 
## 9.3.9 `docker exec`进入容器
  
`docker exec -it [image] [COMMAND]`：进入容器后开启有一个新的终端   

## 9.3.10 `docker logs`查看容器日志
`docker logs [OPTIONS] [image]`
> OPTIONS：可选项       
>> `-f`：显示日志   
>> `-t`：显示日志条数

## 9.3.11 `docker top`查看容器中的进程
`docker top  [image]`

## 9.3.12 `docker inspect`查看容器内部信息
`docker inspect  [image]`

## 9.3.13 `docker cp`容器与主机之间的数据拷贝
`docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH`

> OPTIONS：可选项       
>> `-r`：递归   

* 将主机/www/jaqi目录拷贝到容器96f7f14e99ab的/www目录下。
```zsh
 docker cp /www/jaqi 96f7f14e99ab:/www/
```

* 将容器96f7f14e99ab的/www目录拷贝到主机的/tmp目录中
```zsh
 docker cp  96f7f14e99ab:/www /tmp/
```

## 9.3.14 `exit`退出并停止镜像

## 9.3.15 `CTRL+P+Q`只退出镜像不停止

