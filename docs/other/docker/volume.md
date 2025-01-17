# 9.5 Docker数据卷(volume)
## 9.5.1 数据卷联合文件系统
![docker](/docker-volume.jpg)


## 9.5.2 数据共享
容器之间共享数据的一种技术（将docker容器中的目录挂载到外部服务器上【卷名】），实现容器的持久化和同步操作，而且容器间也可以数据共享。    

`docker run -v [服务器目录(卷名)]:[容器目录]:[r0/rw]`

容器限制权限：
> `r0`:只读   
> `rw`或不填:可读可写

* 将容器的home目录挂载到服务器的/home/test目录
```
docker run -it -v /home/test:/home
```
## 9.5.3 具名和匿名挂载：    
（不指定服务器的目录（卷名），自动挂载到`/var/lib/docker/volumes/xxx/_data`）

## 9.5.4 `docker volume`查看卷
`docker volume ls`查看全部卷    
`docker volume inspect [卷名]`查看卷详情

## 9.5.5 数据卷容器
`--volume-from`通过一个容器给其他容器共享数据。

* docker01的数据同步到docker02
```
docker run -it --name docker02 --volume-from docker01 jaqi/centos:v1.0
```


