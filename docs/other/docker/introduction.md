# 9.1 概述
## 9.1.1 Docker概述
### Docker为什么会出现？
* 传统的发布流程：
1. 发布项目时所有依赖都需要单独配置
2. 开发环境、生产环境还要分别配置
3. 不能跨平台

* `Docker`的发布流程：
将业务代码和环境一起打包直接发布到服务器。
1. 常用的依赖和配置全部打包到`Docker`镜像仓库
2. 发布时直接下载不需要单独配置


### Docker Hub
Docker的官方镜像仓库
### Docker核心概念
1. "镜像(image)"：依赖的程序和配置文件的集合
2. "仓库(repository)"：存放镜像的位置
3. "容器(container)"：使用虚拟化技术实现的运行镜像的环境
4. "隔离"：容器彼此隔离，互不影响

### 容器的生命周期

1. `created`初建状态
2. `running`运行状态
3. `stopped`停止状态
4. `paused`暂停状态

### 底层原理
* Docker的工作原理
> Docker是一个Client-Server结构的系统，Docker的守护进程（一直在后台运行的进程）运行在主机上，通过Socket从客户端访问。
> DockerServer接收到Docker-Client的指令,就会执行这个命令。



## 9.1.2 Docker安装

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

### `docker run`的运行过程
`docker run <imagesName>`
> 1. 判断是否有这个镜像
> 2. 没有则去DockerHub下载到本地
> 3. 运行镜像
## 9.1.3 Docker命令

[官方命令文档](https://docs.docker.com/reference/)

![docker](/docker1.jpg)

![docker](/docker2.jpg)

查看Docker版本：`docker version`      
查看Docker信息：`docker info`     
Docker帮助命令：`docker <命令> --help`        

