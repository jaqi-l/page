## 2.1 基本介绍
`Nginx`是一个高性能的HTTP和反向代理web服务器。
### 2.1.1 Nginx的优点：
1. 高并发、高性能
2. 可扩展性好
3. 高可靠性
4. 热部署
5. BSD许可证书
### 2.1.2 Nginx的组成：
1. 二进制可执行文件
2. `Nginx.conf`配置文件(默认是目录：`/etc/nginx/`)
3. `access.log`访问日志(默认是目录：`/var/log/nginx/`)
4. `error.log`错误日志(默认是目录：`/var/log/nginx/`)
4. `html`默认站点目录(默认是目录：`/usr/share/nginx/html`)

### 2.1.3 的主要发行版本
1. `Tengine`是阿里巴巴基于`Nginx`开发的第三方模块，但与`Nginx`更新不同步。
2. `OpenResty`是基于`Nginx`与`Lua`的高性能 Web 平台

### 2.1.4 安装

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
### 2.1.5 Nginx配置语法
1. 配置文件由指令块、指令组成。
2. 指令块由大括号组成，里面的内容是指令。
3. 指令以分号结尾，指令与参数空格分隔。
4. `include`语句可以引入多个配置文件
5. `#`注释
6. `$`变量
7. 部分指令支持正则
8. 时间配置参数：`ms`毫秒、`s`秒、`m`分钟、`h`小时、`d`天、`w`周、`M`月、`y`年、
9. 空间配置参数：` `字节、`k`/`K`kb、`m`/`M`兆、`g`/`G`G

### 2.1.6 Nginx命令行
* `start nginx`运行nginx
* `nginx`+`-?`帮助
* `nginx`+`-c`使用指定的配置文件
* `nginx`+`-g`指定配置命令
* `nginx`+`-p`指定运行目录
* `nginx`+`-t`、`-T`测试配置文件是否有错误
* `nginx`+`-v`、`-V`打印Nginx的版本信息、编译信息等
* `nginx`+`-s`+`stop`/`squti`/`reload`/`reopen` 立即停止服务、优雅的停止服务、重载配置文件、重新开始记录日志文件
* `ps -ef |grep nginx"`查看nginx进程
### 2.1.7 安全协议
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
## 2.2 构架基础
#### 2.2.1 Nginx的请求处理流程
![Nginx的请求处理流程](/Nginx的请求处理流程.jpg)
#### 2.2.2 Nginx的进程结构
* 多进程Nginx结构
1. `Master`进程= `CM`进程+`CL`进程+n个`worker`进程
2. 进程之间通过共享内存通讯
3. 每个`worker`进程独占一个CPU内核 
4. 一个线程同时处理多个连接，尽量减少切换进程。 
#### 2.2.3 Nginx进程管理-信号
1. 信号种类
> `term`/`int`立刻停止    
> `quit`优雅的停止    
> ``hup`重载配置文件   
> `usr1`重新打开日志文件    
> `usr2`、`winch`通过命令行发送信号，针对热部署使用       
2. Master信号   
> 监控worker进程           
> 管理worker进程       
> 接受信号`term`、`int`、`quit`、`hup`、`usr1`、`usr2`、    `winch`   
3. Worker信号   
> 接受信号`term`、`int`、`quit`、`usr1`、`winch`
4. 命令行信号   
> `hup`、`usr1`、`term`、`quit`   
::: tip
1. Nginx为什么是多进程结构：多线程共用一个地址空间，易出现缓存失效，Nginx使用多进程单线程，不仅能提高并发率,而且进程之间是相互独立，互不干扰。
2. 什么是`http`请求优雅的关闭：判断连接是否空闲，并关闭空闲的连接
3. 重载:先启动新的进程平稳运行后再关闭旧的进程，此时新进程可以向老进程发送`hup`信号进行回滚。
:::

## 2.3 HTTP模块

## 2.4 反向代理与负载均衡

## 2.5 配置文件详解
### 2.5.1 全局模块配置
```html
user administrator administrators;  # 配置用户或者组，默认为nobody nobody。
worker_processes 2;  # 允许生成的worker进程数，默认为1 建议设置为cpu内核数
pid /nginx/pid/nginx.pid;   # pid进程运行文件存放地址
rror_log log/error.log debug;  # 设置日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
```
### 2.5.2 events模块的配置
```nginx
accept_mutex on;   # 设置网路连接序列化，防止惊群现象发生，默认为on
multi_accept on;  # 设置一个进程是否同时接受多个网络连接，默认为off
use epoll;      # 事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
worker_connections  1024;    # 单个work的最大连接数，默认为512
```
### 2.5.3 http模块的配置
```nginx
http {
    include       mime.types;   # 文件扩展名与文件类型映射表
    default_type  application/octet-stream; # 默认文件类型，默认为text/plain
    charset utf-8; # 默认编码
    access_log on; # 开启access日志服务 
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; # 自定义日志要记录的参数
    
    # $remote_addr 与 $http_x_forwarded_for 用以记录客户端的ip地址；
    # $remote_user ：用来记录客户端用户名称；
    # $time_local ： 用来记录访问时间与时区；
    # $request ： 用来记录请求的url与http协议；
    # $status ： 用来记录请求状态；成功是200；
    # $body_bytes_s ent ：记录发送给客户端文件主体内容大小；
    # $http_referer ：用来记录从那个页面链接访问过来的；
    # $http_user_agent ：记录客户端浏览器的相关信息；
    
    access_log log/access.log myFormat;  # 设置日志存放位置并使用myFormat格式记录日志
    sendfile on;   # 允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile_max_chunk 100k;  # 每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout 65;  # 连接超时时间，默认为75s，可以在http，server，location块。
    gzip on; # 开启文件压缩
    gzip_min_length 1;  # 压缩小于一字节以上的 
    gzip_comp_level 2;  # 压缩级别
    gzip_type text/plain application/x-javascript; # 要压缩的格式
    upstream mysvr {   #  #负载均衡配置 
      server 127.0.0.1:7878; # 默认轮训模式
      server 192.168.3.1:7878  weight=2;  max_fails=2 fail_timeout=2 # weight设置加权轮训 max_fails允许请求失败次数 fail_timeout允许请求失败的时间间隔
      server 192.168.10.1:3333 down;  # down不参与负载均衡
      server 192.168.10.121:3333 backup;  # backup热备(当上一个服务器宕机后运行)
      ip_hash; # 让同一个客户端请求相同的服务
    }
    error_page 500 502 503 504 /50x.html # 错误页
    server {
        keepalive_requests 120; # 单连接请求上限次数。
        listen       4545;   # 监听端口
        server_name  127.0.0.1;   # 监听地址       
    }
}
```
### 2.5.4 location模块的配置
``` nginx
location  ~*^.+$ {   # 请求的url过滤，正则匹配，= 严格匹配 ~区分大小写匹配 !~区分大小写不匹配 ~* 不区分大小写匹配 !~* 不区分大小写不匹配 ^~ 如果路由匹配，那么不进行正则匹配
  root path;  # root从当前目录下查找，alias是从根目录查看赵 
  index vv.txt;  # 设置默认页
  proxy_pass  http://mysvr;  # 请求转向mysvr 定义的服务器列表
  autoindex off; # 是否开启自动目录 开启后用户可以访问全部静态资源  
  set $limit_rate 1k; # 限制访问速度1k/s
  client_max_body_size 10m; # 允许客户端请求的最大单文件字节数
  client_body_buffer_size 128k; # 缓冲区代理缓冲用户端请求的最大字节数
  proxy_connect_timeout 90; # nginx跟后端服务器连接超时时间(代理连接超时)
  proxy_send_timeout 90; # 后端服务器数据回传时间(代理发送超时)
  proxy_read_timeout 90; # 连接成功后，后端服务器响应时间(代理接收超时)
  proxy_buffer_size 4k; # 设置代理服务器（nginx）保存用户头信息的缓冲区大小
  proxy_buffers 4 32k; # proxy_buffers缓冲区，网页平均在32k以下的设置
  proxy_busy_buffers_size 64k; # 高负荷下缓冲大小（proxy_buffers*2）
  proxy_temp_file_write_size 64k; # 设定缓存文件夹大小，大于这个值，将从upstream服务器传
  deny 127.0.0.1;  # 拒绝的ip
  allow 172.18.5.54; # 允许的ip       
  rewrite /oldindex /index permanent;break; # 重定向 oldindex → index 
  expires 24h; #客户端缓存上述静态数据
  try_files $uri $uri/ /index.html; # 处理单页面应用的history模式 
  add_header 'Access-Control-Max-Age' 2592000; # 设置响应头
  add_header 'Content-Type' 'text/plain; charset=utf-8';
  add_header 'Content-Length' 0;
              
} 
```
::: tip 拦截或转发请求时有无"/"的区别
* 拦截：
> ``` nginx
> location /api {}  # 拦截所有api开头的
> location /api/ {}  # 拦截所有api/开头的
> ```
* 转发请求：
> ``` nginx
> location /api {
>    proxy_pass http://jaqi.api;  # 相对路径 相当于被代理到 http://jaqi.api/api
>    proxy_pass http://jaqi.api/; # 绝对路径 相当于被代理到 http://jaqi.api
>}
> ```
:::

案例:
```nginx

#user  nobody;
worker_processes  1;

error_log  logs/error.log;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    charset utf-8;

    log_format  main  '$remote_addr - $remote_user [$time_local] requesthost:"$http_host"; "$request" requesttime:"$request_time"; '
        '$status $body_bytes_sent "$http_referer" - $request_body'
        '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log;

    sendfile        on;

    keepalive_timeout  65;

    gzip on;
		gzip_min_length 1k;
		gzip_comp_level 4;
		gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
		gzip_vary on;
		gzip_disable "MSIE [1-6]\.";

    server {
       listen       80;
       server_name  jaqi.lymhspring.com;
       return  301 https://jaqi.lymhspring.com$request_uri;   
    }

    # HTTPS server
    server {
        listen       443 ssl;
        server_name  jaqi.lymhspring.com;

        ssl_certificate      ./ssl/jaqi.lymhspring.com.pem;
        ssl_certificate_key  ./ssl/jaqi.lymhspring.com.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

       location /jaqi.note {
            expires 24h; #客户端缓存上述静态数据
            alias /home/admin/app/note/html/;  #文件路径
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
       }

      location / {
            expires 24h; #客户端缓存上述静态数据
            root /home/admin/app/page/html;  #文件路径
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
      }

        location /navApi/ {
        	proxy_pass http://127.0.0.1:7000/;
            proxy_set_header x-real-ip $remote_addr;
            proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
            proxy_set_header host $http_host;
        }
    }
}
```