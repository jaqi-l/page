# 9.2 镜像命令
## 9.2.1 `docker images`查看镜像
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
## 9.2.2 `docker search`搜索镜像
`docker search [OPTIONS] TERM`

* 从Docker Hub查找所有镜像名包含node，并且收藏数大于 10 的镜像
```
 docker search -f stars=10 node
```

## 9.2.3 `docker pull`下载镜像
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

## 9.2.4 `docker rmi`删除镜像
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

## 9.2.5 `docker image prune`清理镜像
清理残存、些临时、没有被使用的镜像文件

## 9.2.6 `docker tag`标记镜像
`docker tag [SOURCE_IMAGE][:TAG] [TARGET_IMAGE][:TAG]`

> `SOURCE_IMAGE`原始镜像        
> `TARGET_IMAGE`：标记后的镜像      

* 将镜像ubuntu:15.10标记为 runoob/ubuntu:v3 镜像。
```
docker tag ubuntu:15.10 runoob/ubuntu:v3
```
## 9.2.7 `docker image is`查看镜像
`docker tag [Repository][:TAG]`

* 查看node镜像
```
docker image is node
```

## 9.2.8 `docker commit`从容器创建一个新的镜像
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

## 9.2.9 `docker build`通过文件构建新镜像

`docker build [OPTIONS] PATH | URL | ` 

> OPTIONS：可选项       
>> `-f`：dockerfile路径    
>> `-t`：镜像名     

```
docker build -f dockerfile -t jaqi/centos:v1.0 .
```

## 9.2.10 `docker history`查看镜像的构建历史

`docker history [IMAGE ID] ` 

## 9.2.11 `docker push`发布镜像
`docker push [OPTIONS] NAME[:TAG]` 

发布之前需要登陆Docker Hub或阿里云镜像仓库
```
docker login ******
docker push jaqi/centos:v1.0
```

## 9.2.12 `docker save`将指定镜像保存成tar归档文件
`docker save [OPTIONS] [IMAGE...]` 
> OPTIONS：可选项       
>> `-o`：输出到的文件 
将镜像 runoob/ubuntu:v3 生成 my_ubuntu_v3.tar 文档
```
docker save -o my_ubuntu_v3.tar runoob/ubuntu:v3
```   

## 9.2.13 `docker load`导入使用`docker save`命令导出的镜像
`docker load [OPTIONS]` 
> OPTIONS：可选项       
>> `-i`：指定导入的文件   
>> `-q`：精简输出信息 

导入my_ubuntu_v3.tar
```
docker load --i my_ubuntu_v3.tar
```