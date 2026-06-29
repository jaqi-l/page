# 1.5 网络管理
## 1.5.1 网络信息
`eth0`表示第一块网卡      
`eno1`表示板载网卡    
`ens33`表示PCI-E网卡       
`enp0s3`表示无法获取物流信息的PCI-E网卡  
### net-tools(老版本)         
* `ipconfig` 查看网卡      
> `/sbin/ifconfig`普通用户查看网卡      
* `mii-tool` 查看网卡连接状态      
>`mii-tool enp4s0f2` 接口名     
* `route` 查看网关   
> `route -n` 不解析域名     
> `route add -host`设置网关     

### iproute2（centos7以上）
* `ip a` 查看网卡       
* `ip addr show dev ens33`查看某个网卡信息
* `ip route`查看网关
## 1.5.2 网络状态
* `service network status`查看网络状态
* `service network restart`重启网卡
* `ping`检测当前主机与目标主机是否畅通
* `traceroute`检测当前主机到目标主机的网络状态
  > `traceroute baidu.com` **场景**：想知道访问百度时数据经过了哪些路由器，每个路由器延迟多少，排查网络慢的原因
  > `traceroute -I baidu.com` **场景**：默认追踪结果全是`* * *`，说明中间防火墙拦截了UDP包，加`-I`改用ICMP协议（需要root权限）
  > `traceroute -T -p 80 baidu.com` **场景**：想检测网站80端口是否能正常访问，看看路由路径上是否有设备拦截了80端口
  > `traceroute -m 20 baidu.com` **场景**：访问国内网站时等待太久，国内网站通常不超过20跳，调小跳数可以更快结束
  > `traceroute -w 2 baidu.com` **场景**：某个路由器响应慢，每个跃点等3秒太浪费时间，缩短为2秒
  > `traceroute -F baidu.com` **场景**：数据包太大被分片导致追踪结果不准，禁用分片后结果更准确
  > `traceroute -i eth0 baidu.com` **场景**：服务器有多个网卡（外网eth0、内网eth1），想指定从外网网卡追踪路由
  > **参数说明**：
  > | 参数 | 应用意义 |
  > |------|----------|
  > | `-I` | 改用ICMP协议探测（默认UDP），适合被防火墙拦截UDP时使用，需要root权限 |
  > | `-T` | 使用TCP协议探测，适合检测特定端口是否能到达，需要root权限 |
  > | `-p` | 指定目标端口号，配合-T参数使用，检测到该端口的路由路径 |
  > | `-m` | 设置最大经过的路由器数量（跳数），默认30，国内网站通常不超过20 |
  > | `-w` | 设置等待每个路由器响应的超时时间（秒），默认3，网络慢时可增大 |
  > | `-F` | 禁止数据包分片，防止分片导致路由信息不准确 |
  > | `-i` | 指定从哪个网卡发出探测包，多网卡环境下使用 |
  > 注意：Linux默认使用UDP协议，Windows使用tracert命令（默认ICMP）
* `mtr`检测当前主机的网络状态
* `nslookup`查看域名对应的ip
* `telent`检查目标主机的端口连接状态
* `tcpdump`分析数据包
* `netstat`查看端口状态
* `ss`

## 1.5.3 网络配置
### 管理工具
1. SysV(老版本) 
2. systemd(centos7以上)         
`ifcfg-eth0`网络配置文件        
/etc/hosts网卡配置文件      
/etc/sysconfig/network-script网卡配置文件       
* `hostname`主机名

### wifi设置
* `yum install iw`安装iw工具
* `iw dev`查看无线网卡 Interface wlp2s0
* ` ip link set wlp2s0 up`启动网卡
* `iw wlp2s0 link` 查看网卡连接状态
* `iw wlp2s0 scan | grep SSID` 查看可用的wifi
* `wpa_supplicant -B -i wls1 -c <(wpa_passphrase "wifi" "password")`连接wifi
* `dhclient wlp2s0`分配IP地址，如果报错kill -9

### wifi开机自动连接 
* `chkconfig NetworkManager on` 或  `systemctl enable NetworkManager.service` 设置NetworkManager自动启动
* `yum -y install NetworkManager-wifi` 安装NetworkManager-wifi 
* `nmcli r wifi on` 开启WiFi
* `nmcli dev wifi` 查看可用的wifi
* `nmcli d wifi connect "wifi" password "password" wlp2s0`如果报错删除已有连接
* `nmcli c` 查看已有连接
* `nmcli c delete wifi` 删除已有连接

### 防火墙
* `systemctl status firewalld` 查看防火墙状态
* `firewall-cmd --list-all` 查看规则 
* `vi /etc/firewalld/zones/public.xml` 修改防火墙规则
* `firewall-cmd --list-ports` 查看所有打开的端口
* `firewall-cmd --reload` 重载规则
* `systemctl restart firewalld` 重启

