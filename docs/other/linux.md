linux版本：内核版本、发行版本。     
所有命令都区分大小写。      
root用户 `#` 普通用户 `$`       
`exit`切换用户      
`init 0`关机
`reboot`、`init 6`重启
`init 2`命令行模式      
`init 3`图形模式        
`systemctl get-default`查看默认启动模式     
`systemctl set-default multi-user.target`设置默认启动命令行模式     
`shutdown -h 30`30分钟之后关机                  
`clear`或者`ctrl+l`清空命令             
`tab`键命令不全               
`y`确认、`ctrl+c`终止       
`ctrl+r`搜索之前的命令          
* `ip addr`查看ip地址            
终端： 图形、命令行、远程终端（SSH、VNC）               
## 1.1 常用目录结构
`/`根目录       
* 系统启动必须：        
`/boot`存放的启动Linux 时使用的内核文件，包括连接文件以及镜像文件。     
`/etc`存放所有的系统需要的配置文件和子目录列表，更改目录下的文件可能会导致系统不能启动。        
`/lib`存放基本代码库（比如c++库），其作用类似于Windows里的DLL文件。几乎所有的应用程序都需要用到这些共享库。     
`/sys`这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。sysfs文件系统集成了下面3种文件系统的信息：针对进程信息的proc文件系统、针对设备的devfs文件系统以及针对伪终端的devpts文件系统。该文件系统是内核设备树的一个直观反映。当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统中     
* 指令集合：        
`/bin`存放着最常用的程序和指令      
`/sbin`只有系统管理员能使用的程序和指令。       
* 外部文件管理：        
`/dev`Device(设备)的缩写, 存放的是Linux的外部设备。注意：在Linux中访问设备和访问文件的方式是相同的。        
`/media`类windows的其他设备，例如U盘、光驱等等，识别后linux会把设备放到这个目录下。         
`/mnt`临时挂载别的文件系统的，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容了。     
* 临时文件：        
`/run`是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。如果你的系统上有 /var/run 目录，应该让它指向 run。        
`/lost+found`一般情况下为空的，系统非法关机后，这里就存放一些文件。     
/tmp这个目录是用来存放一些临时文件的。      
* 账户：        
`/root`系统管理员的用户主目录。     
`/home`用户的主目录，以用户的账号命名的。       
`/usr`用户的很多应用程序和文件都放在这个目录下，类似于windows下的program files目录。        
`/usr/bin`系统用户使用的应用程序与指令。        
`/usr/sbin`超级用户使用的比较高级的管理程序和系统守护程序。     
`/usr/src`内核源代码默认的放置目录。        
* 运行过程中要用：      
`/var`存放经常修改的数据，比如程序运行的日志文件（/var/log 目录下）。       
`/proc`管理内存空间！虚拟的目录，是系统内存的映射，我们可以直接访问这个目录来，获取系统信息。这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件来做修改。       
* 扩展用的：        
`/opt`默认是空的，我们安装额外软件可以放在这个里面。        
`/srv`存放服务启动后需要提取的数据（不用服务器就是空）      
## 1.2 帮助命令
* `man`是manual的缩写,查看命令的帮助
```zsh
man ls
```
`help`查看命令解释器
```zsh
help ls <!-- 内部命令 -->
ls -help <!-- 外部命令 --> 
```
`info`比`help`帮助更详细
```zsh
info ls 
```

##  1.3 文件管理
### 1.3.1 文件查看
####  `psw`显示当前的目录名 
####  `pwd`显示当前的完整路径    
####  `cd`切换目录
以`/`开头绝对路径       
以`.`开头当前路径       
以`./`、` `开头相对路径     
以`../`、`..`开头相对上一级路径     
`-`回到刚才的目录       
####  `ls`显示当前目录下的文件
```zsh
ls /root  <!-- root目录下的文件 -->
ls /nome /root  <!-- root目录和根目录下的文件 -->
```        
* `-l`长格式显示文件     
* `-a` 显示隐藏的文件,以`.`开头的是隐藏的文件
* `-r` 逆序显示，需配合-l使用
* `-t` 按时间排序显示
* `-R` 递归显示（显示子文件夹里的所有文件）
* `-lrtR` 按时间逆序长格式递归显示
```zsh
[root@localhost/]$ ls -l /  <!-- 详细显示根目录下的文件 -->
-rw-------. 1 root 1555 dec 14 23：:50 anaconda-ks.cfg
-dw-r--r--. 1 root 1555 dec 14 23：:50 boot
```
文件的权限详见[1.3.4](/jaqi.note/other/linux/#_1-3-4-文件的权限)
### 1.3.2 目录/文件的创建与删除
#### mkdir创建一个空目录
* 在根目录创建一个a目录
```zsh
mkdir /a
```
* 在当前目录创建一个a目录
```zsh
mkdir a
```
* 在当前目录创建一个a目录,在a中再创建b...
```zsh
mkdir a/b/c 
```
* 在当前目录同时创建a、b、c
```zsh
mkdir a b c
```
* `-p`进行三级以上的创建
```zsh
mkdir -p  a/b/c/d/e/f/g 
```
#### rmdir删除一个空目录
#### rm删除一个或多个目录
* `-r`删除非空目录，`y`确认、`ctrl+c`终止
```zsh
rm -r
```
* `-f`删除非空目录，不进行操作提示。
```zsh
rm -rf
```
* 批量删除文件
```zsh
rm {1..5}.txt
```
* 通过正则批量删除文件
```zsh
ls|grep -E  "正则表达式"|xargs rm
```
* 批量删除jaqi-x.html的文件
```
ls|grep -E  "jaqi-\d+.html"|xargs rm -rf
```
#### touch创建一个文件
```zsh
touch file
```
* 批量创建
```
touch {1..10}.txt
```
### 1.3.3 文件操作
#### `cp`文件的复制
* 复制a目录或a文件到root目录下
```zsh
cp a /root/ 
```
* `-r`同时复制整个目录
```zsh
cp -r  /root/a /tmp/ 
```
* `-p`复制的时候同时复制权限、属组和时间
```zsh
cp -p /root/a /tmp/ 
```
#### `scp`用于本地与服务器之间的文件复制

```zsh
scp /Users/jaqi.l/Desktop/index.html root@192.168.1.1:/home/index.html
```

* `-r`复制整个目录
```zsh
scp -r  /User /tmp/ 
```
#### `mv`文件的移动和重命名
* fileA改名fileB
```zsh
mv /fileA /fileB 
```
* fileB移动到tmp目录
```zsh
mv /fileB /tmp 
```
* fileB移动到tmp目录，并改名fileC
```zsh
mv /fileB /tmp/fileC 
```

#### `rename`文件重命名
```zsh
rename 's/newName/oldName/' *.txt 
```
* 批量将jaqi-x.txt重命名x.txt
```zsh
rename 's/(jaqi)-(\d+)/$2/' *.txt
```

### 1.3.4 文件的权限
#### 查看文件权限
`ls -l`
-rw-------. 1 root root 1721 1月  4 21:33 anaconda-ks.cfg
1. 首位表示文件类型`-`文件、`d`目录、`l`链接文档、`b`可随机存储装置、`c`一次性存储装置（鼠标、键盘）
2. 后面几位数字以三个为一组。第一组是属主权限，第一组是属组权限，第三组是其他用户权限
> 文件权限表示方法
>> `r`=`4`=read     
>> `w`=`2`write     
>> `x`=`1`execute（可执行），`-`表示没有权限        
>> `6`读写权限      
>> `7`全部权限      
#### 查看目录权限
`ls -ld`        
> 目录权限表示方法      
>> `x`可进入目录        
>> `rx`显示目录内的文件名       
>> `wx`修改目录内的文件名       
3. 第一个`root`表示谁创建的文件，第二个`root`表示是哪个用户组的。       
#### `chmod`修改文件权限
* `+`增加权限
* `-`减少权限
* `=`设置权限
* `u`属主
```zsh
chmod u+x /tmp/testfile
```
* `g`数组
* `o`其他用户权限
* `a`统一设置
* 数组方法设置权限，第一位属主、第二位属组、第三位其他用户权限
```zsh
chmod 755 /tmp/testfile
```

#### `chown`修改文件属主和属组
* 属主
```zsh
chown user1 /test
```
* 属组
```zsh
chown :group1 /test
```
#### `chgrp`单独修改文件属组
#### 特殊权限
`SUID`用于二进制可执行文件，执行命令时获取文件属主的权限        
`SGID`用于目录，在该目录下创建新的文件和目录，权限会自动更改为该目录的属组      
`SBIT`用于目录，该目录下新建的文件和目录，仅root和自己可以删除      
#### `facl`(ext4,xfs)文件系统独有       
`getfacl`查看文件的权限     
`setfacl -m u:user1`设置user1的权限     
`setfacl -m g:group1`设置组group1的权限     
`setfacl -x u:user1`取消user1的权限     

### 1.3.5 文件内容查看
#### `cat`查看文本内容
```zsh
cat /tmp/demo
```
#### `head`查看文本开头
* 查看文件前五行(默认显示前十行)
```zsh
head -5 /tmp/demo 
```
#### `tail`查看文本结尾
* 查看文件后五行(默认显示前十行)
```zsh
tail -5 /tmp/demo 
```
* `-f`实时查看文件的后十行
```zsh
tail -f /tmp/demo 
```
* `grep`过滤某个字符并实时查看文件的后十行
```zsh
tail -ef| grep  string
```
查找全部点jaqi
```zsh
grep -lr "jaqi" *
```
#### `wc`统计文本内容信息
查看文本行数
```zsh
wc -l /tmp/demo
```
#### `more`分行显示文本内容（空格下翻）
```zsh
more  /tmp/demo
```
#### `less`分行显示文本内容（b上翻，d下翻），
```zsh
less  /tmp/demo
```
### 1.3.6 打包与压缩
#### 打包
* `cf`打包
* 将etc打包命名成etc-backup.tar并放入tmp文件夹
```zsh
tar cf /tmp/etc-backup.tar /etc
```
#### 解包
* `xf`解包
解包放入root目录下
```zsh
tar xf /tmp/etc-backup.tar -C /root
```

#### 压缩与解压缩
不能压缩目录，需要对目录先打包再压缩
* `czf`打包并压缩成gzip格式
将etc打包并压缩成gz格式，且命名成etc-backup.tar并放入tmp文件夹
```zsh
tar czf /tmp/etc-backup.tar.gz /etc
```
* `cjf`打包并压缩成bzip格式（压缩率高）
将etc打包并压缩成bz2格式，且命名成etc-backup.tar并放入tmp文件夹
```zsh
tar cjf /tmp/etc-backup.tar.bz2 /etc
```

#### 解压缩
* `zxf`解压缩gzip格式
解压缩包放入root目录下
```zsh
tar zxf /tmp/etc-backup.tar -C /root
```
* `jxf`解压缩bzip格式
解压缩包放入root目录下
```zsh
tar jxf /tmp/etc-backup.tar -C /root
```

:::tip 参数说明
`c`打包
`x`解包
`f`制定操作类型为文件
:::

### 1.3.7 查找文件
#### `find`查找文件
* `-name`指定文件名     
* `-type`指定文件类型
* >`d`(目录)、`c`(字型装置文件)、`b`(区块装置文件)、`p`(具名贮列)、`f`(一般文件)、`l`(符号连结)、`s`(socket)  
* `-size`指定文件大小查找     
* `-cmin`指定是过去n分钟内被修改过 
* `-exec`找到后的下一步操作  

查看etc下的jaqi文件
```zsh
    find /etc/ -name jaqi 
```

查找当前目录及其子目录下所有最近20天内更新过的文件
```zsh
# find . -ctime -20
```

查找系统中所有文件长度为0的普通文件
```zsh
find / -type f -size 0 -exec ls -l {} \; 
```
#### `which`、`whereis`查找可执行文件路径
```zsh
which nginx
whereis nginx
```

### 1.3.8 查找文件内容
#### `grep`查找文件内容
* `-l`显示行数     
查找全部文件中有字符串"jaqi"的文件
```zsh
    grep -lr "jaqi" *
```
### 1.3.9 文件内容批量处理
#### `sed`文件内容批量处理

查找全部文件中有字符串"jaqi"的文件并替换成"jaqi.l"
```zsh
  sed -i "s/jaqi/jaqi.l/g" *
   # 替换全部并验证是否全部替换
  sed -i "s/jaqi/aqi.l/g" $(grep -lr "jaqi" *)
```

## 1.4 `vi`文本编辑器
`vi`的四种模式
> 正常模式      
> 插入模式      
> 命令模式      
> 可是模式      

#### vim配置文件
/etc/vimrc
#### 普通模式

* 移动光标位置      
> `h`左             
> `j`下     
> `k`上     
> `l`右   

* 设置光标到位置        
> `g`设置到首行     
> `shift`+`g`设置到末行     
> `n`+`shift`+`g`设置到指定行       
> `shift`+`6`设置到行首     
> `shift`+`4`设置到行末         

* `y`复制
> `yy`复制行
> `n`+`yy`复制n行
> `y$`复制从当前光标到末位内容
* `p`粘贴

* `d`剪切

> `dd`复制行        
> `n`+`dd`复制n行       
> `d$`复制从当前光标到末位内容      
* `u`撤销

* `ctrl`+`r`取消撤销

* `x`删除当前位置内容

* `r`替换当前位置内容

#### 命令模式
* `:set nu`显示行号
* `:set nonu`不显示行号
* `:set nohlsearch`取消高亮显示
* `:w`保存命令
> `:w /root/a.txt`保存指定目录
* `/x`查找x的位置，`n`找到下一个，`shift`+`n`找到下一个
* `:%s/old/new`old替换new
* `:%s/old/new/g`old全局替换new
* `:3,5s/old/new/g`3到5行的old替换new
#### 插入模式     
> `i`在光标当前位置，进入插入模式       
> `shift`+`i`在光标当前行的首位，进入插入模式       
> `a`在光标当前位置的下一位，进入插入模式       
> `shift`+`a`在光标当前行的末位，进入插入模式       
> `o`在光标当前行的下一行，创建一个空行，进入插入模式       
> `shift`+`o`在光标当前行的上一行，创建一个空行，进入插入模式   
#### 可视模式 
* 三种进入可是模式的方式
> `v`字符可视模式
> `shift`+`v`行可视模式
> `ctrl`+`v`块可是模式
* 插入
> `I`在当前块前面插入
* 删除
> `d`删除选中部分

##  1.5 用户与用户管理
### 1.5.1 用户

#### `id`查询用户
```zsh
id root
```
#### `useradd`创建用户
* 默认会创建一个和用户名同名的用户组
>```zsh
>useradd jaqi
>```
* 创建用户并加入dev组
>```zsh
>useradd -g dev jaqi
>```
#### `userdel`删除用户
```zsh
userdel jaqi
```
* `-r`同时删除该用户的home目录
```zsh
userdel -r jaqi
```
#### `passwd`修改用户密码
```zsh
passwd jaqi 
```
#### `usermod`修改用户属性
* `-c`修改用户账号的备注文字。
* `-d`修改用户登入时的home目录。
* `-e`修改账号的有效期限。
* `-f`修改在密码过期后多少天即关闭该账号。
* `-g`修改用户所属的群组。
> ```zsh
> usermod -g dev  jaqi 
> ```
* `-G`修改用户所属的附加群组。
* `-l`修改用户账号名称。
* `-L`锁定用户密码，使密码无效。
* `-s`修改用户登入后所使用的shell。
* `-u`修改用户ID。
* `-U`解除密码锁定。

#### `chage`修改用户属性
```zsh
chage jaqi 
```

### 1.5.2 用户组
#### `groupadd`创建用户组
```zsh
groupadd dev
```

### 1.5.3 用户管理
#### `su`切换用户
`-`完全切换
```zsh
su - jaqi
```

#### `visudo`给其他用户授权

#### `sudo`以其他用户身份执行命令
```zsh
sudo - jaqi
``` 

### 1.5.4 用户配置文件
/etc/passwd

### 1.5.5 SELinux
强制访问控制（生产环境不建议开启）
修改后需要重启生效

## 1.6 网络管理

### 1.6.1 网络信息
`eth0`表示第一块网卡      
`eno1`表示板载网卡    
`ens33`表示PCI-E网卡       
`enp0s3`表示无法获取物流信息的PCI-E网卡  
#### net-tools(老版本)         
* `ipconfig` 查看网卡      
> `/sbin/ifconfig`普通用户查看网卡      
* `mii-tool` 查看网卡连接状态      
>`mii-tool enp4s0f2` 接口名     
* `route` 查看网关   
> `route -n` 不解析域名     
> `route add -host`设置网关     

#### iproute2（centos7以上）
* `ip a` 查看网卡       
* `ip addr show dev ens33`查看某个网卡信息
* `ip route`查看网关
### 1.6.2 网络状态
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

### 1.6.3 网络配置
#### 管理工具
1. SysV(老版本) 
2. systemd(centos7以上)         
`ifcfg-eth0`网络配置文件        
/etc/hosts网卡配置文件      
/etc/sysconfig/network-script网卡配置文件       
* `hostname`主机名

#### wifi设置
* `yum install iw`安装iw工具
* `iw dev`查看无线网卡 Interface wlp2s0
* ` ip link set wlp2s0 up`启动网卡
* `iw wlp2s0 link` 查看网卡连接状态
* `iw wlp2s0 scan | grep SSID` 查看可用的wifi
* `wpa_supplicant -B -i wls1 -c <(wpa_passphrase "wifi" "password")`连接wifi
* `dhclient wlp2s0`分配IP地址，如果报错kill -9

#### wifi开机自动连接 
* `chkconfig NetworkManager on` 或  `systemctl enable NetworkManager.service` 设置NetworkManager自动启动
* `yum -y install NetworkManager-wifi` 安装NetworkManager-wifi 
* `nmcli r wifi on` 开启WiFi
* `nmcli dev wifi` 查看可用的wifi
* `nmcli d wifi connect "wifi" password "password" wlp2s0`如果报错删除已有连接
* `nmcli c` 查看已有连接
* `nmcli c delete wifi` 删除已有连接

#### 防火墙
* `systemctl status firewalld` 查看防火墙状态
* `firewall-cmd --list-all` 查看规则 
* `vi /etc/firewalld/zones/public.xml` 修改防火墙规则
* `firewall-cmd --list-ports` 查看所有打开的端口
* `firewall-cmd --reload` 重载规则
* `systemctl restart firewalld` 重启
## 1.7 软件安装
软件包管理器，方便软件的安装、卸载。        
Centos、RedHat使用yum，软件包格式为rpm      
Debian、Ubuntu使用apt,软件包格式为deb       
### rpm 
#### rpm包格式
vim-common-7.4.10-5.elx86_64.rpm        
软件名：vim-common      
软件版本：7.4.10-5      
系统版本：el7       
平台：x86_64        
#### rpm常用参数
`-q`查询        
`-qa`查询全部软件包     
`-i`安装        
`-e`卸载        
#### yum仓库
* 设置镜像源 [阿里镜像源](https://developer.aliyun.com/mirror/)     
`install`安装       
`remove`卸载        
`list`查询已安装软件包      
`grouplist`     
`update`升级，不填包名，更新全部        
:::tip yum的优点        
yum可以自动检测依赖关系，判断包是否被篡改，可以指定安装源       
:::

#### 源代码编译安装流程
1. `wget`下载源代码     
2. `tar`解压压缩包      
3. `cd`进入安装包目录       
4. `./configure --prefix=/usr/local/openresty`configure表示可执行，--prefix=指定安装目录        
5. `make -j2`编译,（-j2用两个核心编译）     
6. `make install`安装       


#### 升级内核
* rpm方式
1. `uname -r` 查看内核版本
2. `yum install kernel-3.10.0` 升级内核
* 源代码编译方式（略）

## 1.8 进程管理
#### 查看进程
`ps`查看当前终端正在进行的进程              
`pstree`查看进程树              
`top`实时显示正在进行的进程           
#### 查看之间的通信
`kill -l`查看所有支持的信号及信号编号              
`kill 9 22817`9信号编号，22817进程标号              

#### 守护进程
`nohup`不受挂起影响，也一直运行。       
`nohup`+`&`不受挂起影响，即使关闭终端，也一直运行。     
```zsh
nohup tail -f /var/log/messages &
```
`screen`进入screen环境，（与服务器断开后，恢复后仍能继续运行）      
`ctrl`+`a`退出screen模式        

#### 服务管理工具
* `service`工具     
启动脚本：/etc/init.d/      
* `systemctl`工具(新)       
启动脚本：/usr/lib/systemd/system       
`systemctl start`+`服务名` 启动     
`systemctl stop`+`服务名` 停止      
`systemctl status`+`服务名` 查看状态        
`systemctl restart`+`服务名` 关闭后重新重启     
`systemctl reload`+`服务名` 不关闭直接重新加载      
`systemctl enable`+`服务名`设置随系统自动运行       
`systemctl disable`+`服务名`设置不允许随系统自动运行        

## 1.9 内存与磁盘管理
### 1.9.1 内存
`free -m`查看内存使用率,以M为单位（-g以G为单位）        
`top` 实时显示正在进行的进程，及内存占用情况        
### 1.9.2 磁盘
#### `fdisk`查看磁盘情况，对磁盘进行分区
`fdisk -l`查看全部磁盘      
`df -h`查看linux分区下的文件信息        
`du`查看文件所占磁盘大小（`ls`文件字节长度大小）        
`dd`磁盘分区        
## 1.9.3 文件系统
`ext4`：CentOS6及以前      
`xfs`：CentOS7     
`NTFS`：外置设备(需要安装NTFS软件包)       
### ext4
#### 超级块
根据全部文件生成的数据块        
#### 超级块副本
对超级快进行备份        
#### i节点
记录每一个文件的属性和权限等信息，
`ls -li`查看i节点ID     
#### 数据块
记录文件的具体数据，每4.0KB(ext4,xfs)生成块（`ls`是根据查出当前i节点下全部数据块的大小总和，不满的块也会被计算）

:::tip
`touch`创建文件，创建一个i节点和一个4.0KB(ext4,xfs)的数据块。                   
`mv`移动/改名文件，修改i节点的记录参数，如果是跨目录移动则i节点与数据块同时移动，如果跨分区移动（不是瞬间完成的）。          
`cp`复制文件，创建一个新的i节点及相应数据块。                    
`vim`编辑文件，编辑的是文件生成的缓存文件，会改变i节点，好处可以被同时打开且意外终止，不会影响源文件。           
`echo >`编辑文件，编辑的是文本本身不会改变i节点。              
`rm`删除文件，删除的是i节点与数据块的绑定关系。              
`ln`链接文件，将数据块指向某个i节点，可以多个数据块指向同一个i节点，不能跨分区。              
`ln -s`符号(软)链接文件，创建一个新的i节点指向另一个i节点，可以跨分区。不能设置单独的权限。需要使用`facl`设置权限             
:::
## 1.9.4 磁盘分区与挂载
#### `fdisk`
`fdisk`+`要分区的设备名`进入分区工具。      
`m`帮助     
`n`新建分区     
`p`查看分区     
`q`不保存退出       
`d`删除分区     
`w`保存     
#### `mkfs`格式化
#### `parted`对大于2TB的文件进行分区
#### `mount`挂载
#### 配置文件
/etc/fstab
## 1.9.5 磁盘配额
### xfx系统
1. `mkfs.xfs /dev/sdb1`
> 格式化sdb1分区        
2. `mkdir -p /mnt/disk1`
> 创建disk1分区目录     
1. `mount -o uquota,gquota /dev/sdb1 /mnt/disk1`
> 挂载sdb1分区到disk1目录       
> uquota：用户磁盘配额      
> gquota：组磁盘配额        
4. `chmod 17777 /mnt/disk1`
> 设置权限
5. `xfs_quota`+`enter键`进入xfs_quota模式
6. `xfs_quota -x -c 'report -ugibh' /mnt/disk1`
> 查看disk1磁盘配额     
> u：用户       
> g：组     
> i：节点       
> b：数据块     
> h：显示的格式     
6. `xfs_quota -x -c 'limit -u isoft=5 ihard=10 user1' /mnt/disk1`
> 配置disk1磁盘配额     
> limit：限制磁盘配额(-u：用户,-g：组)      
> soft：软限制，hard：应限制。           
> :::tip 
> 硬限制：可以在任何时候任何进程中设置  但硬限制只能由超级用户提起
> 软限制：内核实际执行的限制，任何进程都可以将软限制设置为任意小于等于对进程限制的硬限制的值。
> isoft：单次可创建的最大i节点数
> ihard：总的可创建文件i节点数
> bsoft：单次可创建的最大数据块数
> bhard：总的可创建数据块数
> :::
> user1：被操作的用户   
## 1.9.6 交换（swap）分区
### 增加交换分区(虚拟内存)
* `mkswap`      
`mkswap /dev/sdd1`将sdd1分区格式化成交换分区        
`mkswapoff /dev/sdd1`恢复sdd1分区 
* `swapon`
## 1.9.7 RAID磁盘阵列
### RAID卡
### 软件模拟RAID
mdadm：RADI软件包

## 1.9.8 逻辑卷管理
物理卷（pv）：一个物理设备即一个物理卷
逻辑卷（lv）：文件系统无法跨物理卷使用，因此在各物理卷的底层再叠加一个逻辑卷。
卷组（vg）：多个物理卷组成的组
lvm：逻辑卷管理器
### 逻辑卷的创建
1. `fdisk`添加硬盘或分区     
2. `pvcreate`+`硬盘1`+`硬盘2`:对多个硬盘同时创建物理卷       
3. `pvs`查看物理卷      
4. `vgcreate`+`卷组名`+`物理卷1`+`物理卷2`:设置卷组，一个卷不能加入两个不同的卷组     
5. `vgs`+`卷组名`查看卷组       
6. `lvcreate -l`+`空间大小`+`-n`+`逻辑卷名`+`卷组名`:创建逻辑卷
7. `lvs`查看逻辑卷
8. `mkdir /mnt/`+`目录名`:创建目录
9. `mfs.xfx /dev/`+`卷组名`+`逻辑卷名`格式化
10. `mount`挂载
### 逻辑卷的扩充
1. `vgextend` 

