# 2.1 基本介绍
`Nginx`是一个高性能的HTTP和反向代理web服务器。
## 2.1.1 Nginx的优点：
1. 高并发、高性能
2. 可扩展性好
3. 高可靠性
4. 热部署
5. BSD许可证书
## 2.1.2 Nginx的组成：
1. 二进制可执行文件
2. `Nginx.conf`配置文件(默认是目录：`/etc/nginx/`)
3. `access.log`访问日志(默认是目录：`/var/log/nginx/`)
4. `error.log`错误日志(默认是目录：`/var/log/nginx/`)
4. `html`默认站点目录(默认是目录：`/usr/share/nginx/html`)

## 2.1.3 主要发行版本
1. `Tengine`是阿里巴巴基于`Nginx`开发的第三方模块，但与`Nginx`更新不同步。
2. `OpenResty`是基于`Nginx`与`Lua`的高性能 Web 平台

## 2.1.4 安装

[下载地址](http://nginx.org/en/download.html)
```zsh
# 下载
wget http://nginx.org/download/nginx-1.23.0.tar.gz
# 解压
tar -zvxf nginx-1.23.0.tar.gz
# 安装依赖
yum -y install pcre-devel openssl openssl-devel
# 安装到usr目录下
cd nginx-1.23.0

./configure --prefix=/usr/nginx --with-http_stub_status_module --with-http_ssl_module

make install
```
## 2.1.5 Nginx配置语法
1. 配置文件由指令块、指令组成。
2. 指令块由大括号组成，里面的内容是指令。
3. 指令以分号结尾，指令与参数空格分隔。
4. `include`语句可以引入多个配置文件
5. `#`注释
6. `$`变量
7. 部分指令支持正则
8. 时间配置参数：`ms`毫秒、`s`秒、`m`分钟、`h`小时、`d`天、`w`周、`M`月、`y`年、
9. 空间配置参数：` `字节、`k`/`K`kb、`m`/`M`兆、`g`/`G`G

## 2.1.6 Nginx命令行
* `start nginx`运行nginx
* `nginx`+`-?`帮助
* `nginx`+`-c`使用指定的配置文件
* `nginx`+`-g`指定配置命令
* `nginx`+`-p`指定运行目录
* `nginx`+`-t`、`-T`测试配置文件是否有错误
* `nginx`+`-v`、`-V`打印Nginx的版本信息、编译信息等
* `nginx`+`-s`+`stop`/`squti`/`reload`/`reopen` 立即停止服务、优雅的停止服务、重载配置文件、重新开始记录日志文件
* `ps -ef |grep nginx"`查看nginx进程
## 2.1.7 安全协议
1. 使用`Let's Encrypt`配置证书
`yum install python2-certbot-nginx`安装配置工具     
`certbot --nginx  --nginx-server-root=/usr/local/openresty/nginx/conf/ -d`+`www.jaqi.com` 给指定域名生成证书，并放置/usr/local/openresty/nginx/conf/目录下

2. 部署阿里云ssl证书
```zsh
   server {
       listen       443 ssl;
       server_name  localhost;
       ssl_certificate      ./ssl/ssl.pem; # 证书的目录
       ssl_certificate_key  ./ssl/ssl.key; # 证书的目录
       ssl_session_cache    shared:SSL:1m;
       ssl_session_timeout  5m;
       ssl_ciphers  HIGH:!aNULL:!MD5;
       ssl_prefer_server_ciphers  on;
       location / {
           root   html;
           index  index.html index.htm;
       }
   }
```
3. GoAccess工具：可视化实时查看access日志
1. 安装依赖
```zsh
# 依赖
yum -y install glib2 glib2-devel GeoIP-devel  ncurses-devel zlib zlib-devel gcc
yum -y install GeoIP-update	#安装GeoIP-update地理位置数据库
```
2. 安装主包
```zsh
# 依赖
wget https://tar.goaccess.io/goaccess-1.3.tar.gz
tar -xzvf goaccess-1.3.tar.gz
cd goaccess-1.3/
./configure --enable-utf8 --enable-geoip=legacy
make
make install
```
```zsh
# 生成日志页面
 /usr/local/bin/goaccess -f access.log -a > access.html
```