# 9.4 DockerFile
DockerFile就是用来构建docker镜像的构建文件（docker命令脚本）

## 9.4.1 DockerFile语法规则：
1. 每个关键字（指令）都必须是大写字母
2. 顺序从上到下
3. #表示注释
4. 每个指令都会创建一个新的镜像层，并提交  

## 9.4.2 DockerFile指令：
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
