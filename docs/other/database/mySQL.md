# 8.2 MySQL
## 8.2.1 安装部署

* 下载安装
[下载官方的yum资源包](https://dev.mysql.com/downloads/repo/yum/)
``` zsh 
yum -y install  mysql80-community-release-el7-6.noarch.rpm

rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

yum -y install mysql-community-server
``` 

* 启动和停止
``` zsh
systemctl start mysqld

systemctl status mysqld

systemctl restart mysqld

systemctl stop mysqld
``` 

* 连接数据库
```zsh
mysql [-h 127.0.0.1] [-p 3306] -u root -p
```

* 初始化配置

1. 安全模式启动
``` zsh
vim  /etc/my.cnf
# 在my.cnf的[mysqld]下添加：`skip-grant-tables`
```

2. 设置root账号初始密码
```zsh
 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY'123456';
```

3. 注释掉`my.cnf`中的安全启动命令

4. 创建数据库
```zsh
show databases; # 查看已有的
 create database jaqi_db  # 创建名为jaqi_db的数据库
```

5. 创建一个远程访问账号
```zsh
CREATE USER user@'%' IDENTIFIED BY '123456';

# 不使用mysql8.0协议 
ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
```

6. 给admin用户设置jaqi_bd的权限
```zsh
# GRANT ALL PRIVILEGES ON [数据库名].[表明] TO '[用户名]'@'[连接地址]' WITH GRANT OPTION;
grant all privileges on `jaqi_db`.* to 'admin'@'%' with grant option; 

flush privileges # 刷新权限表 

select host,user from mysql.user;  # 查看用户表
```
## 8.2.2 概述

## 8.2.3 库与表的创建
库的创建：
`CREATE DATABASE <库> CHARACTER SET <字符集> COLLATE <排序规则>;`
``` SQL
CREATE DATABASE `myDataBase` CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci';
```
表的创建：
`CREATE TABLE <表.库> (表头);`
``` SQL
CREATE TABLE `myDataBase`.`student`
( `id` int NOT NULL, `name` varchar(255) NULL, `psw` varchar(255) NULL, PRIMARY KEY (`id`));
```
## 8.2.4 SQL结构化查询语句

* `INSERT`插入数据 

`INSERT INTO <表.库> (key1,key2,key3...) VALUES (value1,value2,value3...);`
``` SQL
 INSERT INTO `myDataBase`.`student` (id,name,password) VALUES ('0422','jaqi','psw123456');
```

##### 插入多条
``` SQL
 INSERT INTO `myDataBase`.`student` (name) VALUES ('jaqi1') ,('jaqi2');
```

* `DELETE`删除数据  

` DELETE FROM <表.库> WHERE <条件>;`

``` SQL
 DELETE FROM `myDataBase`.`student` WHERE id='0422';
```

* `UPDATE`修改数据   

`UPDATE <表.库> SET key1=value1,key2=value2... WHERE <条件>`

``` SQL
  UPDATE `myDataBase`.`student` SET name=`jaqi.l`,password=`123456psw` WHERE id='0422'
```

* `SELECT`查询数据    

`SELECT <key1,key2,key3(返回的字段)> FROM <表.库> WHERE <条件> ORDER BY <排序key> LIMIT <起始位置,条数>`

```SQL
SELECT * FROM `bdm314524665_db`.`jaqi` WHERE `id` > '0' LIMIT 0,1000
```
::: tip
1. 如果SQL语句中的`key`与`MySQL`系统关键字重复，需要使用``反引号包裹起来。
:::


