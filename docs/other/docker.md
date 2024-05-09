## 9.1 Docker概述
#### Docker为什么会出现？
* 传统的发布流程：
1. 发布项目时所有依赖都需要单独配置
2. 开发环境、生产环境还要分别配置
3. 不能跨平台

* `Docker`的发布流程：
将业务代码和环境一起打包直接发布到服务器。
1. 常用的依赖和配置全部打包到`Docker`镜像仓库
2. 发布时直接下载不需要单独配置


#### Docker Hub
Docker的官方镜像仓库
#### Docker核心概念
1. "镜像(image)"：依赖的程序和配置文件的集合
2. "仓库(repository)"：存放镜像的位置
3. "容器(container)"：使用虚拟化技术实现的运行镜像的环境
4. "隔离"：容器彼此隔离，互不影响

#### 容器的生命周期

1. `created`初建状态
2. `running`运行状态
3. `stopped`停止状态
4. `paused`暂停状态

#### 底层原理
* Docker的工作原理
> Docker是一个Client-Server结构的系统，Docker的守护进程（一直在后台运行的进程）运行在主机上，通过Socket从客户端访问。
> DockerServer接收到Docker-Client的指令,就会执行这个命令。



## 9.2 Docker安装

[官方文档](https://docs.docker.com/get-docker/)

1. 查看centos内核版本（>=3.10）：`uname -r`
2.  安装之前需要卸载旧版：
```
 sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```
3. 安装docker环境：`yum install -y yum-utils`
4. 配置镜像仓库：
5. 更新yum索引：`yum makecache fast`
6. 安装docker：`yum install docker docker-ce docker-ce-cli containerd.io`
7. 查看版本：`docker version`
8. 启动：`systemctl start docker` 
9. 运行：`docker run hello-world` 
10. 查看镜像：`docker images`
11. 卸载依赖：`yum remove docker-ce docker-ce-cli containerd.io`
12. 卸载资源：`rm -rf /var/lib/docker`、`rm -rf /var/lib/containerd`
13. 使用阿里云镜像加速器：
```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://g099lhap.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

#### `docker run`的运行过程
`docker run <imagesName>`
> 1. 判断是否有这个镜像
> 2. 没有则去DockerHub下载到本地
> 3. 运行镜像
## 9.3 Docker命令

[官方命令文档](https://docs.docker.com/reference/)

![docker](/docker1.jpg)

![docker](/docker2.jpg)

查看Docker版本：`docker version`      
查看Docker信息：`docker info`     
Docker帮助命令：`docker <命令> --help`        

## 9.4 镜像命令  
### 9.4.1 `docker images`查看镜像
`docker images [OPTIONS] [REPOSITORY[:TAG]]`
> OPTIONS：可选项       
>> `-f`：过滤条件      
>> `-q`：只显示ID

> 返回参数       
>> `REPOSITORY`：镜像仓库       
>> `TAG`：镜像标签     
>> `TMAGE ID`：镜像ID      
>> `CREATED`：镜像创建事件     
>> `SIZE`：镜像创建大小

* 列出本地镜像中`REPOSITORY`为`ubuntu`的镜像列表
```
 docker images  ubuntu
```
### 9.4.2 `docker search`搜索镜像
`docker search [OPTIONS] TERM`

* 从Docker Hub查找所有镜像名包含node，并且收藏数大于 10 的镜像
```
 docker search -f stars=10 node
```

### 9.4.3 `docker pull`下载镜像
`docker pull [Registry]/[Repository]/[Image]:[Tag]`

> `Registry`：注册服务器（用于管理镜像仓库的服务器）        
> `Repository`：镜像仓库        
> `tag`：镜像的标签，默认为latest。     
::: tip
先从本地搜索，没有则从Docker Hub下载镜像。       
:::

从Docker Hub下载node最新版镜像。
```
 docker pull node
```

### 9.4.4 `docker rmi`删除镜像
`docker rmi [OPTIONS] IMAGE [IMAGE...]`
> OPTIONS：可选项       
>> `-f`：强制删除   

* 强制删除本地镜像 runoob/ubuntu:v4。
```
 docker rmi -f runoob/ubuntu:v4 
```
* 删除全部
```
 docker rmi -f $(docker images -aq)
```

### 9.4.5 `docker image prune`清理镜像
清理残存、些临时、没有被使用的镜像文件

### 9.4.6 `docker tag`标记镜像
`docker tag [SOURCE_IMAGE][:TAG] [TARGET_IMAGE][:TAG]`

> `SOURCE_IMAGE`原始镜像        
> `TARGET_IMAGE`：标记后的镜像      

* 将镜像ubuntu:15.10标记为 runoob/ubuntu:v3 镜像。
```
docker tag ubuntu:15.10 runoob/ubuntu:v3
```
### 9.4.7 `docker image is`查看镜像
`docker tag [Repository][:TAG]`

* 查看node镜像
```
docker image is node
```

### 9.4.8 `docker commit`从容器创建一个新的镜像
`docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]`
> OPTIONS：可选项       
>> `-a`：提交的镜像作者      
>> `-c`：使用Dockerfile指令来创建镜
>> `-m`：提交时的说明文字
>> `-p`：在commit时，将容器暂停


* 将容器a404c6c174a2 保存为新的镜像,并添加提交人信息和说明信息。
```
 docker commit -a "jaqi.l" -m "jaqi.l'The first image of jaqi.l" a404c6c174a2  jaqi.image:v1.0.0 
```

### 9.4.9 `docker build`通过文件构建新镜像

`docker build [OPTIONS] PATH | URL | ` 

> OPTIONS：可选项       
>> `-f`：dockerfile路径    
>> `-t`：镜像名     

```
docker build -f dockerfile -t jaqi/centos:v1.0 .
```

### 9.4.10 `docker history`查看镜像的构建历史

`docker history [IMAGE ID] ` 

### 9.4.11 `docker push`发布镜像
`docker push [OPTIONS] NAME[:TAG]` 

发布之前需要登陆Docker Hub或阿里云镜像仓库
```
docker login ******
docker push jaqi/centos:v1.0
```

### 9.4.12 `docker save`将指定镜像保存成tar归档文件
`docker save [OPTIONS] [IMAGE...]` 
> OPTIONS：可选项       
>> `-o`：输出到的文件 
将镜像 runoob/ubuntu:v3 生成 my_ubuntu_v3.tar 文档
```
docker save -o my_ubuntu_v3.tar runoob/ubuntu:v3
```   

### 9.4.13 `docker load`导入使用`docker save`命令导出的镜像
`docker load [OPTIONS]` 
> OPTIONS：可选项       
>> `-i`：指定导入的文件   
>> `-q`：精简输出信息 

导入my_ubuntu_v3.tar
```
docker load --i my_ubuntu_v3.tar
```

## 9.5 容器命令
有了镜像才能创建容器        
      
### 9.5.1 `docker run`运行镜像
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
### 9.5.2 `docker rm`删除容器
`docker rm [image]`
* 批量删除多个
```
 docker rm -f 09d7636201f2 104ea3abc382 c9054809ffad e3ae598e7447 f9ce4763ae59 9d86d1f77623 109b97c45b65 
```

### 9.5.3 `docker start`启动容器
`docker start [image]`

### 9.5.4 `docker restart`重启容器
`docker restart [image]`

### 9.5.5 `docker stop`停止容器
`docker stop [image]`

### 9.5.6 `docker kill`强制停止容器
`docker kill [image]`

### 9.5.7 `docker ps`查看正在运行的容器

`docker ps [OPTIONS]`
> OPTIONS：可选项       
>> `-a`：查看运行过的容器   
>> `-n`：查看最近运行的容器   
>> `-q`：只显示容器编号   

### 9.5.8 `docker attach`进入容器
`docker attach [image]`：进入容器正在运行的终端，不会开启新进程，退出后会自动停止容器服务 
### 9.5.9 `docker exec`进入容器
  
`docker exec -it [image] [COMMAND]`：进入容器后开启有一个新的终端   

### 9.5.10 `docker logs`查看容器日志
`docker logs [OPTIONS] [image]`
> OPTIONS：可选项       
>> `-f`：显示日志   
>> `-t`：显示日志条数

### 9.5.11 `docker top`查看容器中的进程
`docker top  [image]`

### 9.5.12 `docker inspect`查看容器内部信息
`docker inspect  [image]`

### 9.5.13 `docker cp`容器与主机之间的数据拷贝
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

### 9.5.14 `exit`退出并停止镜像

### 9.5.15 `CTRL+P+Q`只退出镜像不停止

## 9.6 DockerFile
DockerFile就是用来构建docker镜像的构建文件（docker命令脚本）

#### DockerFile语法规则：
1. 每个关键字（指令）都必须是大写字母
2. 顺序从上到下
3. #表示注释
4. 每个指令都会创建一个新的镜像层，并提交  

#### DockerFile指令：
`FROM`：基础镜像    
`MAINTAINEW`：镜像是谁写的，姓名+邮箱   
`RUN`：镜像构建的时候需要运行的命令   
`ADD`：添加内容   
`WORKDIR`：镜像的工作目录   
`VOLUME`：挂载的目录    
`EXPOSE`：暴露端口    
`CMD`：指定这个容器启动的时候要运行的命令，只有最后一个会生效   
`ENTRYPOINT`：指定这个容器启动的时候要运行的命令，可以追加命令    
`ONBUILD`：当构建一个被继承DockerFile，这个时候会运行ONBUILD的指令，触发指令   
`COPY`：类似ADD，将我们文件拷贝到镜像中   
`ENV`：构建时候设置环境变量   

::: tip `CMD`与`ENTRYPOINT`的区别
 `CMD`：不能再docker run的时候再追加命令，只能替换。  
 `ENTRYPOINT`：可以直接追加命令
:::

* 构建一个Jaqi.L/centos
``` DockerFile
FROM centos

MAINTAINER Jaqi.L<Jaqi.l@qq.com>

ENV MYPATH /usr/local

WORKDIK $MYPATH

RUN yum -y install vim

EXPOSE 80

CMD echo $MYPATH

CMD echo "---end---"

CMD /bin/bash
```

## 9.7 Docker镜像

## 9.8 Docker数据卷(volume)
#### 数据卷联合文件系统
![docker](/docker-volume.jpg)


#### 数据共享
容器之间共享数据的一种技术（将docker容器中的目录挂载到外部服务器上【卷名】），实现容器的持久化和同步操作，而且容器间也可以数据共享。    

`docker run -v [服务器目录(卷名)]:[容器目录]:[r0/rw]`

容器限制权限：
> `r0`:只读   
> `rw`或不填:可读可写

* 将容器的home目录挂载到服务器的/home/test目录
```
docker run -it -v /home/test:/home
```
#### 具名和匿名挂载：    
（不指定服务器的目录（卷名），自动挂载到`/var/lib/docker/volumes/xxx/_data`）

#### `docker volume`查看卷
`docker volume ls`查看全部卷    
`docker volume inspect [卷名]`查看卷详情

#### 数据卷容器
`--volume-from`通过一个容器给其他容器共享数据。

* docker01的数据同步到docker02
```
docker run -it --name docker02 --volume-from docker01 jaqi/centos:v1.0
```

## 9.9 Docker网络
