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

