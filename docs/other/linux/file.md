# 1.2 文件管理
## 1.2.1 文件查看
###  `psw`显示当前的目录名 
###  `pwd`显示当前的完整路径    
###  `cd`切换目录
以`/`开头绝对路径       
以`.`开头当前路径       
以`./`、` `开头相对路径     
以`../`、`..`开头相对上一级路径     
`-`回到刚才的目录       
###  `ls`显示当前目录下的文件
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
文件的权限详见[1.2.4](/other/linux/file#_1-2-4-文件的权限)
## 1.2.2 目录/文件的创建与删除
### mkdir创建一个空目录
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
### rmdir删除一个空目录
### rm删除一个或多个目录
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
### touch创建一个文件
```zsh
touch file
```
* 批量创建
```
touch {1..10}.txt
```
## 1.2.3 文件操作
### `cp`文件的复制
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
### `scp`用于本地与服务器之间的文件复制

```zsh
scp /Users/jaqi.l/Desktop/index.html root@192.168.1.1:/home/index.html
```

* `-r`复制整个目录
```zsh
scp -r  /User /tmp/ 
```
### `mv`文件的移动和重命名
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

### `rename`文件重命名
```zsh
rename 's/newName/oldName/' *.txt 
```
* 批量将jaqi-x.txt重命名x.txt
```zsh
rename 's/(jaqi)-(\d+)/$2/' *.txt
```
## 1.2.4 文件的权限
### 查看文件权限
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
### 查看目录权限
`ls -ld`        
> 目录权限表示方法      
>> `x`可进入目录        
>> `rx`显示目录内的文件名       
>> `wx`修改目录内的文件名       
3. 第一个`root`表示谁创建的文件，第二个`root`表示是哪个用户组的。       
### `chmod`修改文件权限
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

### `chown`修改文件属主和属组
* 属主
```zsh
chown user1 /test
```
* 属组
```zsh
chown :group1 /test
```
### `chgrp`单独修改文件属组
### 特殊权限
`SUID`用于二进制可执行文件，执行命令时获取文件属主的权限        
`SGID`用于目录，在该目录下创建新的文件和目录，权限会自动更改为该目录的属组      
`SBIT`用于目录，该目录下新建的文件和目录，仅root和自己可以删除      
### `facl`(ext4,xfs)文件系统独有       
`getfacl`查看文件的权限     
`setfacl -m u:user1`设置user1的权限     
`setfacl -m g:group1`设置组group1的权限     
`setfacl -x u:user1`取消user1的权限     
## 1.2.5 文件内容查看
### `cat`查看文本内容
```zsh
cat /tmp/demo
```
### `head`查看文本开头
* 查看文件前五行(默认显示前十行)
```zsh
head -5 /tmp/demo 
```
### `tail`查看文本结尾
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
### `wc`统计文本内容信息
查看文本行数
```zsh
wc -l /tmp/demo
```
### `more`分行显示文本内容（空格下翻）
```zsh
more  /tmp/demo
```
### `less`分行显示文本内容（b上翻，d下翻），
```zsh
less  /tmp/demo
```
## 1.2.6 打包与压缩
### 打包
* `cf`打包
* 将etc打包命名成etc-backup.tar并放入tmp文件夹
```zsh
tar cf /tmp/etc-backup.tar /etc
```
### 解包
* `xf`解包
解包放入root目录下
```zsh
tar xf /tmp/etc-backup.tar -C /root
```

### 压缩与解压缩
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

### 解压缩
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

## 1.2.7 查找文件
### `find`查找文件
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
### `which`、`whereis`查找可执行文件路径
```zsh
which nginx
whereis nginx
```

## 1.2.8 查找文件内容
### `grep`查找文件内容
* `-l`显示行数     
查找全部文件中有字符串"jaqi"的文件
```zsh
    grep -lr "jaqi" *
```
## 1.2.9 文件内容批量处理
### `sed`文件内容批量处理

查找全部文件中有字符串"jaqi"的文件并替换成"jaqi.l"
```zsh
  sed -i "s/jaqi/jaqi.l/g" *
   # 替换全部并验证是否全部替换
  sed -i "s/jaqi/aqi.l/g" $(grep -lr "jaqi" *)
```