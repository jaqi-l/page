# 2.5 配置文件详解
## 2.5.1 全局模块配置
```html
user administrator administrators;  # 配置用户或者组，默认为nobody nobody。
worker_processes 2;  # 允许生成的worker进程数，默认为1 建议设置为cpu内核数
pid /nginx/pid/nginx.pid;   # pid进程运行文件存放地址
rror_log log/error.log debug;  # 设置日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
```
## 2.5.2 events模块的配置
```nginx
accept_mutex on;   # 设置网路连接序列化，防止惊群现象发生，默认为on
multi_accept on;  # 设置一个进程是否同时接受多个网络连接，默认为off
use epoll;      # 事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
worker_connections  1024;    # 单个work的最大连接数，默认为512
```
## 2.5.3 http模块的配置
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
## 2.5.4 location模块的配置
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