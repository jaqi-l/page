# 1.4 用户与用户管理
## 1.4.1 用户

### `id`查询用户
```zsh
id root
```
### `useradd`创建用户
* 默认会创建一个和用户名同名的用户组
>```zsh
>useradd jaqi
>```
* 创建用户并加入dev组
>```zsh
>useradd -g dev jaqi
>```
### `userdel`删除用户
```zsh
userdel jaqi
```
* `-r`同时删除该用户的home目录
```zsh
userdel -r jaqi
```
### `passwd`修改用户密码
```zsh
passwd jaqi 
```
### `usermod`修改用户属性
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

### `chage`修改用户属性
```zsh
chage jaqi 
```

## 1.4.2 用户组
### `groupadd`创建用户组
```zsh
groupadd dev
```

## 1.4.3 用户管理
### `su`切换用户
`-`完全切换
```zsh
su - jaqi
```

### `visudo`给其他用户授权

### `sudo`以其他用户身份执行命令
```zsh
sudo - jaqi
``` 

## 1.4.4 用户配置文件
/etc/passwd

## 1.4.5 SELinux
强制访问控制（生产环境不建议开启）
修改后需要重启生效