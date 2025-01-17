# 1.6 软件安装
软件包管理器，方便软件的安装、卸载。        
Centos、RedHat使用yum，软件包格式为rpm      
Debian、Ubuntu使用apt,软件包格式为deb       

## 1.6.1 rpm包格式
vim-common-7.4.10-5.elx86_64.rpm        
软件名：vim-common      
软件版本：7.4.10-5      
系统版本：el7       
平台：x86_64        
## 1.6.2 rpm常用参数
`-q`查询        
`-qa`查询全部软件包     
`-i`安装        
`-e`卸载        
## 1.6.3 yum仓库
* 设置镜像源 [阿里镜像源](https://developer.aliyun.com/mirror/)     
`install`安装       
`remove`卸载        
`list`查询已安装软件包      
`grouplist`     
`update`升级，不填包名，更新全部        
:::tip yum的优点        
yum可以自动检测依赖关系，判断包是否被篡改，可以指定安装源       
:::
## 1.6.4 源代码编译安装流程
1. `wget`下载源代码     
2. `tar`解压压缩包      
3. `cd`进入安装包目录       
4. `./configure --prefix=/usr/local/openresty`configure表示可执行，--prefix=指定安装目录        
5. `make -j2`编译,（-j2用两个核心编译）     
6. `make install`安装       

## 1.6.5 升级内核
* rpm方式
1. `uname -r` 查看内核版本
2. `yum install kernel-3.10.0` 升级内核
* 源代码编译方式（略）

