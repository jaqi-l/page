### 初始化 

* `init`初始化仓库
```zsh
git init # 在当前目录新建一个Git代码库

git init [projectName] # 新建一个目录，将其初始化为Git代码库
``` 

* `config`仓库配置
```zsh
git config --list # 显示当前仓库的Git配置

git config -e [--global] # 编辑全局的Git配置

git config [--global] user.name "[name]" # 设置用户名

git config [--global] user.email "[email address]" # 设置邮箱
```

* `SSH Key`
```zsh
ssh-keygen -t rsa -C "[email address]" # 创建 SSH Key

vi  ~/.ssh/id_rsa.pub # 查看 SSH Key
``` 
### `clone`克隆代码       
从当前地址的`master`分支克隆的到本地`ProjectName`文件夹
```zsh
git clone https://gitHub.com/ ProjectName -b master
```

### `remote`设置远程仓库地址
```zsh
git remote -v  # 查看全部远程仓库

git remote add origin https://gitHub.com/ master # 增加远程仓库origin并设置其远程地址

git remote set-url origin https://gitHub.com/  # 修改远程仓库origin的地址

git remote rm origin  # 删除origin仓库   
```

### `status`查看工作区、暂存区、本地仓库的状态
```zsh
git status
```
### `add`添加的暂存区
```zsh
git add .  # 添加所有modified（修改）、new（新增）的文件，不包括delete（删除）的文件

git add -u # 添加所有modified（修改）、delete（删除）的文件，不包括new（新增）的文件

git add -A  # 添加当前文件夹下的所有modified（修改）、new（新增），delete（删除）的文件

git add -f dist # 添加dist文件到暂存区

git add -p # 添加所有文件并根据变化分次提交
```

### `rm`将文件从暂存区和工作区中删除
```zsh
git rm runoob.txt   # 从暂存区和工作区中删除 runoob.txt 文件

git rm -f runoob.txt  # 强制删除以追踪的暂存区和工作区中的runoob.txt 文件

git rm --cached runoob.txt  # 从追踪清单和的暂存区中删除，仍保留在工作区

git rm –r *  # 从暂存区和工作区中递归删除该目录下全部文件
```

### `mv`移动或重命名一个文件、目录或软连接
```zsh
git mv  README  README.md  # 改名README ->README.md
```

### `diff`比较暂存区和工作区的差异
```zsh
git diff # 显示暂存区和工作区的差异

git diff --cached [file] # 显示暂存区和上一个commit的差异

git diff HEAD # 显示工作区与当前分支最新commit之间的差异

git diff [first-branch]...[second-branch] # 显示两次提交之间的差异

git diff --shortstat "@{0 day ago}" # 显示今天你写了多少行代码
```

### `commit`提交说明
```zsh
git commit -m"提交的情况说明"

git commit -am"提交的情况说明" # 相当于 add . + commit

git commit -v # 查看要提交的信息

git commit --amend # 修改刚刚设置的commit

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
git commit --amend -m [message]

git commit --amend [file1] [file2] ... # 重做上一次commit，并包括指定文件的新变化
```
### `fetch`拉取分支
```zsh
git fetch # 拉取远程所以分支的最新代码

git fetch https://gitHub.com/ master # 拉取当前地址的master分支到本地

git fetch origin master # 拉取origin仓库master分支到本地
```
### `merge`合并分支
```zsh
git merge dev # 合并本地dev分支，并创建新的提交commit

git merge origin/dev # 合并远程origin仓库的dev分支，并创建新的提交commit

git merge --abort   # 取消本次合并
```

### `rebase` 合并分支
```zsh
  git rebase master # 将本地分支的提交commit 合并到master后面 
  git rebase –abort # 取消本次合并
```
:::warning
不要在公共分支使用`rebase`,因为往后放的这些`commit`都是新的,这样其他从这个公共分支拉出去的人，都需要再`rebase`,相当于你`rebase`东西进来，就都是新的`commit`了
:::

### `pull`拉去并合并分支
```zsh
git pull # 拉取当前分支并与当前分支合并

git pull origin dev # 拉取远程dev分支，并与当前分支合并

git push origin --delete dev # 直接删除远程dev分支，谨慎使用！
```
::: tip     
`git pull` = `git fetch` + `git merge` 或 `git rebase`
1. `git config pull.rebase false`此时：`git pull`=`git fetch`+`git merge`
2. `git config pull.rebase true`此时：`git pull`=`git fetch`+`git rebase`
3. `git config pull.ff only`会将本地分支移到远程分支的最新提交上，而不会创建新的合并提交或执行变基操作    
:::

### `push`提交分支
```zsh
git pull origin dev # 提交到远程dev分支的代码

git push [remote] --force # 强行推送当前分支到远程仓库，即使有冲突

git push [remote] --all # 推送所有分支到远程仓库
```

### `checkout`切换分支
```zsh
git checkout -b dev master # 在本地基于master创建dev分支，并切换到dev分支，提交后远程才会生效

git checkout dev # 切换到dev分支

git checkout index.js # 撤销工作区中index.js文件，对暂存区的文件无效

git checkout . # 撤销工作区中所有文件的修改，对暂存区的文件无效

git checkout - # 切换到上一个分支
```
从工作区恢复某个文件或目录
```zsh
git checkout 1.js
```
:::warning
如果远程有新增分支，在切换分支之前,需要先`fetch`拉取一下全部分支
:::

### `branch`查看分支
```zsh
git branch # 查看本地全部分支，*为当前分支

git branch -r # 查看远程全部分支，*为当前分支

git branch -a # 查看全部分支，*为当前分支

git branch dev # 在本地创建dev分支，提交后远程才会生效。注意与checkout -b的区别

git branch -d dev # 删除本地分支

git branch -d -r dev # 删除远程分支，删除后还需推送到服务器

git push origin:dev  # 删除后推送至服务器

git branch -m [oldname] [newname] # 重命名本地分支，如果oldname已存在于远程分支，那么会新建一个newname兵提交，且不会影响oldname分支

git branch --track [branch] [origin/remote-branch] # 根据上游分支，创建一个新的分支，不切换到新分支

git branch --set-upstream-to=[origin/remote-branch] [branch] # 修改分支的追踪分支
```
:::warning
1. 如果远程有新增分支，在查看远程分支之前,需要先`fetch`拉去一下全部分支
:::

### `log`查看版本历史
```zsh
git log 

git log --stat # 显示commit历史，以及每次commit发生变更的文件

git log -S [keyword] # 搜索提交历史，根据关键词

git log -p [file] #显示指定文件相关的每一次diff

# 显示某个文件的版本历史，包括文件改名
git log --follow [file]
git whatchanged [file]
```

### `blame`查看指定文件修改记录
```zsh
git blame [file]
```

### `reflog`查看提交记录
```zsh
git reflog 
```

### `reset`撤销本地提交
```zsh
git reset --hard [commit] # 撤销到指定的commit版本

git reset --hard HEAD^  # 撤销，并切换到最新的一次提交

$ git reset --keep [commit] # 重置当前HEAD为指定commit，但保持暂存区和工作区不变

git reset HEAD^  # 保留当前代码，撤销到git add 之前

git push origin HEAD --force 

git reset HEAD [file] # 撤销当前文件的提交
```

### `revert`回滚远程代码
```zsh
git revert [commit] # 保留当前版本，创建一个新的commit并回滚到指定的commit版本，需要填写commit
```

### `stash`本地代码暂存
```zsh
git stash save "[暂存名称]" # 暂存 

git stash list # 查看暂存列表

git stash pop  # 取回暂存（栈是先进后出）

git stash apply # 取回指定暂存（不会删除已取出的）

git stash drop [暂存名称] # 删除指定暂存

git reset --hard # 取消取回

git stash clear # 删除全部暂存

git stash show # 查看暂存列表中最新保存的stash和当前目录的差异
```

### `tag`标签
```zsh
git tag # 查看标签

git tag [标签名] [commit]  # 为指定commitID创建标签 

git tag -d [标签名] # 删除标签

git push --tags  # 推送标签

git checkout [标签名] # 切换标签
```

### `.gitignore`
> ##### 常用的规则
>> mtk 忽略当前目录下整个mtk文件夹      
>> *.zip 忽略所有.zip格式的文件     
>> mtk/doc 忽略当前目录下mtk文件里的doc文件       
> ##### 配置语法：
>> 以斜杠/开头表示目录；                
>> 以星号*通配多个字符；               
>> 以问号?通配单个字符      
>> 以方括号[]包含单个字符的匹配列表；              
>> 以叹号!表示不忽略(跟踪)匹配到的文件或目录；           

::: tip 

`cd`切换目录

`pwd`显示当前工作目录

`ls`显示当前目录所以文件

`ls-a`显示所有文件包括隐藏的

`mkdir`创建目录（文件夹）

`↑`查看上一条cmd命令

`↓`查看下一条cmd命令

`tab`字段补全命令

`-d`delete：删除

`-D`delete+force强制

`-f`force：强制

`-m`move：移动或重命名

`-M`move+force的快捷键

`-r`remote：远程

`-a`all全部

`!`强制

`q`退出

`w`保存

`wq`保存并退出

`wq!`强制保存并退出.
:::

[Git在线演示](https://learngitbranching.js.org/?locale=zh_CN)       
[Git命令大全](https://gitee.com/all-about-git)
### 与svn命令的对比
| 作用 | git | svn |
| ---- | ---- | ---- |
| 版本库初始化 | `git init` | `svn create` |
| 拉取 | `git clone` | `svn co(checkout)` |
| 添加暂存区 | `git add` | `svn add` |
| 本地快照 | `git commit` | `svn commit`（直接提交） |
| 更新 | `git pull` | `svn update` |
| 提交 | `git push` |  |
| 查看暂存区 | `git status` | `svn status` |
| 查看分支 | `git branch` | `svn cp` |
| 删除分支 | `git branch -d ` | `svn rm` |
| 合并分支 | `git merge` | `svn merge` |
| 比较暂存区和工作区的差异 | `git diff` | `svn diff` |
| 切换分支 | `git checkout` | `svn switch` |