## 初始化 

* `init` 初始化仓库
```zsh
git init # 在当前目录新建一个Git代码库

git init [projectName] # 新建一个目录，将其初始化为Git代码库
``` 

* `config` 仓库配置
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
## `clone` 克隆代码       
从当前地址的`master`分支克隆的到本地`ProjectName`文件夹
```zsh
git clone https://gitHub.com/ ProjectName -b master
```

## `remote` 设置远程仓库地址
```zsh
git remote -v  # 查看全部远程仓库

git remote add origin https://gitHub.com/ master # 增加远程仓库origin并设置其远程地址

git remote set-url origin https://gitHub.com/  # 修改远程仓库origin的地址

git remote rm origin  # 删除origin仓库   
```

## `status` 查看工作区、暂存区、本地仓库的状态
```zsh
git status
```
## `add` 添加的暂存区
```zsh
git add .  # 添加所有modified（修改）、new（新增）的文件，不包括delete（删除）的文件

git add -u # 添加所有modified（修改）、delete（删除）的文件，不包括new（新增）的文件

git add -A  # 添加当前文件夹下的所有modified（修改）、new（新增），delete（删除）的文件

git add -f dist # 添加dist文件到暂存区

git add -p # 添加所有文件并根据变化分次提交
```

## `rm` 将文件从暂存区和工作区中删除
```zsh
git rm runoob.txt   # 从暂存区和工作区中删除 runoob.txt 文件

git rm -f runoob.txt  # 强制删除以追踪的暂存区和工作区中的runoob.txt 文件

git rm --cached runoob.txt  # 从追踪清单和的暂存区中删除，仍保留在工作区

git rm –r *  # 从暂存区和工作区中递归删除该目录下全部文件
```

## `mv` 移动或重命名一个文件、目录或软连接
```zsh
git mv  README  README.md  # 改名README ->README.md
```

## `diff` 比较暂存区和工作区的差异
```zsh
git diff # 显示暂存区和工作区的差异

git diff --cached [file] # 显示暂存区和上一个commit的差异

git diff HEAD # 显示工作区与当前分支最新commit之间的差异

git diff [first-branch]...[second-branch] # 显示两次提交之间的差异

git diff --shortstat "@{0 day ago}" # 显示今天你写了多少行代码
```

## `commit` 提交说明
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
## `fetch` 拉取分支
```zsh
git fetch # 拉取远程所以分支的最新代码

git fetch https://gitHub.com/ master # 拉取当前地址的master分支到本地

git fetch origin master # 拉取origin仓库master分支到本地
```
## `merge` 合并分支
```zsh
git merge dev # 合并本地dev分支，并创建新的提交commit

git merge origin/dev # 合并远程origin仓库的dev分支，并创建新的提交commit

git merge --abort   # 取消本次合并
```

## `rebase` 合并分支
```zsh
  git rebase master # 将本地分支的提交commit 合并到master后面 
  git rebase –abort # 取消本次合并
```
:::warning
不要在公共分支使用`rebase`,因为往后放的这些`commit`都是新的,这样其他从这个公共分支拉出去的人，都需要再`rebase`,相当于你`rebase`东西进来，就都是新的`commit`了
:::

## `pull` 拉取并合并分支
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

## `push` 提交分支
```zsh
git pull origin dev # 提交到远程dev分支的代码

git push [remote] --force # 强行推送当前分支到远程仓库，即使有冲突

git push [remote] --all # 推送所有分支到远程仓库
```

## `checkout` 切换分支
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

## `branch` 查看分支
```zsh
git branch # 查看本地全部分支，*为当前分支

git branch -r # 查看远程全部分支，*为当前分支

git branch -a # 查看全部分支，*为当前分支

git branch dev # 在本地创建dev分支，提交后远程才会生效。注意与checkout -b的区别

git branch -d dev # 删除本地分支

git branch -d -r dev # 删除远程分支，删除后还需推送到服务器
git branch origin:dev  # 删除后推送至服务器

git branch -m [oldname] [newname] # 重命名本地分支，如果oldname已存在于远程分支，那么会新建一个newname兵提交，且不会影响oldname分支

git branch --track [branch] [origin/remote-branch] # 根据上游分支，创建一个新的分支，不切换到新分支

git branch --set-upstream-to=[origin/remote-branch] [branch] # 修改分支的追踪分支
```
:::warning
1. 如果远程有新增分支，在查看远程分支之前,需要先`fetch`拉去一下全部分支
:::

## `log` 查看版本历史
```zsh
git log 

git log --stat # 显示commit历史，以及每次commit发生变更的文件

git log -S [keyword] # 搜索提交历史，根据关键词

git log -p [file] #显示指定文件相关的每一次diff

# 显示某个文件的版本历史，包括文件改名
git log --follow [file]
git whatchanged [file]
```

## `blame` 查看指定文件修改记录
```zsh
git blame [file]
```

## `reflog` 查看提交记录
```zsh
git reflog 
```

## `reset` 撤销本地提交
```zsh
git reset --hard [commit] # 撤销到指定的commit版本

git reset --hard HEAD^  # 撤销，并切换到最新的一次提交

$ git reset --keep [commit] # 重置当前HEAD为指定commit，但保持暂存区和工作区不变

git reset HEAD^  # 保留当前代码，撤销到git add 之前

git push origin HEAD --force 

git reset HEAD [file] # 撤销当前文件的提交
```

## `revert`回滚远程代码
```zsh
git revert [commit] # 保留当前版本，创建一个新的commit并回滚到指定的commit版本，需要填写commit
```

## `stash` 本地代码暂存
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

## `tag` 标签
```zsh
git tag # 查看标签

git tag [标签名] [commit]  # 为指定commitID创建标签 

git tag -d [标签名] # 删除标签

git push --tags  # 推送标签

git checkout [标签名] # 切换标签
```


## `describe` 生成可读性更强的版本号
```zsh
git describe # 基于最近的 tag，生成当前 commit 的描述（如 v1.0-2-g2414721）
git describe --tags # 同上，显示所有 tag（包括轻量标签）
git describe --abbrev=0 # 只显示最近的 tag，不显示 commit 信息
git describe --always # 即使没有 tag，也显示 commit 的简短 hash
git describe --long # 显示完整的 tag-commit 距离信息
```
> 通常用于生成更易读的版本号，常见于自动化发布脚本。

## `rev-parse` 解析和转换 Git 对象
```zsh
git rev-parse HEAD # 显示当前分支最新 commit 的 hash 值
git rev-parse --short HEAD # 显示短 hash
git rev-parse --abbrev-ref HEAD # 显示当前分支名
git rev-parse --show-toplevel # 显示仓库的根目录绝对路径
git rev-parse origin/master # 显示远程分支的 commit hash
```
> 常用于脚本中获取分支名、commit hash、仓库路径等信息。

## `switch` 切换分支 <Badge type="tip" text="^2.23" />
`git switch` 用于切换分支，是对 `git checkout` 分支切换功能的专门细化，语义更清晰。

```zsh
git switch dev                # 切换到已有的 dev 分支
git switch -c feature/login   # 新建并切换到 feature/login 分支（等价于 git checkout -b）
git switch -                  # 切换到上一个分支
```
**区别：**
- `git switch` 只用于分支切换，不会用于文件还原，避免误操作。
- `git checkout` 既能切分支又能还原文件，语义不清晰，容易误用。

## `restore` 恢复或撤销文件的更改 <Badge type="tip" text="^2.23" />
`git restore` 用于还原工作区或暂存区的文件内容，是对 `git checkout` 文件还原功能的专门细化。

```zsh
git restore index.js                # 撤销工作区 index.js 的修改（还原为暂存区内容）
git restore --staged index.js       # 撤销暂存区 index.js 的修改（还原为 HEAD 内容）
git restore .                       # 撤销所有文件的修改
```
**区别：**
- `git restore` 只用于文件内容的恢复，不涉及分支切换。
- `git checkout` 既能切分支又能还原文件，命令不直观。

---

**对比总结：**

| 操作           | 旧命令（`checkout`/`reset`）         | 新命令（`switch`/`restore`）         |
| -------------- | ------------------------- | ---------------------- |
| 切换分支       | git checkout dev          | git switch dev         |
| 新建并切分支   | git checkout -b feature   | git switch -c feature  |
| 撤销工作区文件   | git checkout -- file      | git restore file       |
| 撤销暂存区文件 | git reset HEAD file       | git restore --staged file |

## `submodule` 子模块

`git submodule` 命令用于管理包含其他 Git 仓库的项目，适用于大型项目或需要集成外部库的场景。通过子模块，你可以将外部库作为项目的一部分管理，而不必直接合并到主仓库中

### 1. 初始化子模块
```bash
# 根据 `.gitmodules` 配置，初始化所有子模块，但不会下载内容，
git submodule init
```
### 2. 根据子模块的引用，拉取子模块的内容
```bash
# 从子模块的远程仓库拉取内容，只是拉取，不会更新子项目的提交
# 通常在初始化项目后使用
git submodule update

# 相当于 git submodule init + git submodule update
git submodule update --init --recursive
```
### 3. 更新子模块的引用，并拉取
```bash
# 递归更新所有子模块（包括子模块的子模块）并拉取最新更改
# --recursive 递归更新，--remote 从远程仓库拉取最新更改
git submodule update --recursive --remote
```

### 4. 添加子模块
```bash
# 将指定仓库作为子模块添加到当前仓库
# <repo-url> 是子模块仓库地址，<path> 是子模块在主仓库中的路径（可选）
git submodule add <repo-url> [<path>]

# 示例
git submodule add https://github.com/example/jaqi.git submodule-1

# 示例 添指定分支的子模块
git submodule add -b master https://github.com/example/jaqi.git submodule-1
```

### 5. 移除子模块
```bash
# 从 .git/config 文件中移除子模块
git submodule deinit <path>

# 从主仓库中删除子模块引用
git rm <path>

# 删除子模块的本地缓存
rm -rf .git/modules/<path>
```
- 说明：需要三个步骤完成子模块的完全移除

### 6. 列出子模块
```bash
# 列出当前仓库中的所有子模块及其状态
git submodule
```
- 说明：显示子模块的提交哈希、路径等信息

### 7. 检查子模块状态
```bash
# 显示子模块的当前状态
git submodule status
```
- 说明：包括当前提交哈希、路径以及是否有未提交的更改

### 克隆包含子模块的项目
当克隆一个包含子模块的项目时，需要初始化并更新子模块：
如果 子模块领先于主模块引用的子模块提交，该方法不会更新主模块的子模块引用，需要手动更新。
```bash
# repo-url 是主模块的 git 地址
git clone <repo-url>
cd <repo-dir>
git submodule init
git submodule update

# 或者使用一步命令
git clone --recurse-submodules <repo-url>
```

### 在主模块中修改子模块的内容

主项目（父仓库）中存储的是子模块的 特定提交哈希（commit ID） ，而不是对子模块分支的直接引用

> 在主项目中无法直接修改子模块的内容 ：
> - 当你克隆包含子模块的项目时，子模块目录会处于“分离头指针（detached HEAD）”状态，指向主项目中记> 录的特定提交。
> - 在这种状态下，你可以查看子模块的内容，但任何修改都不会自动关联到子模块的任何分支。

> 关键原因 ：
> - 主项目仅记录子模块的特定提交，而不跟踪子模块的分支变化。
> - 若不切换到子模块的分支就进行修改，这些修改将处于“游离”状态，无法被正确提交到子模块的版本历史中。
> - 修改子模块后，必须同时更新主项目中对子模块的引用提交，否则其他克隆该项目的开发者将无法获取到最新的子模块修改。

```bash
# 1. 进入子模块目录
cd <submodule-path>

# 2. 切换到子模块的目标分支（如main或master）
git switch <branch-name>

# 3. 进行必要的修改
git add .
git commit -m "Update submodule"

# 4. 推送修改到子模块的远程仓库
git push

# 5. 返回主项目，更新对子模块的引用
cd ..
git add <submodule-path>
git commit -m "Update submodule reference"
git push
```


### `.gitmodules` 配置文件

`.gitmodules` 是一个 Git 配置文件，用于存储项目中子模块的映射信息。当你添加子模块时，Git 会自动创建或更新这个文件。该文件会被版本控制，与项目一起提交和推送，确保其他开发者克隆项目时能正确获取子模块。

#### 文件结构与格式

`.gitmodules` 文件采用标准的 Git 配置文件格式，由多个子模块配置块组成。每个子模块配置块包含子模块的名称、路径和仓库 URL 等信息。

**基本格式示例：**
```ini
[submodule "DbConnector"]
    path = DbConnector
    url = https://github.com/example/DbConnector.git

[submodule "Utils"]
    path = lib/utils
    url = https://github.com/example/Utils.git
    branch = main
```

#### 主要配置项说明

| 配置项 | 说明 | 是否必需 |
|--------|------|---------|
| `submodule` 后的名称 | 子模块的唯一标识符，通常与子模块仓库名相同 | 必需 |
| `path` | 子模块在主仓库中的相对路径 | 必需 |
| `url` | 子模块的远程仓库地址 | 必需 |
| `branch` | 指定跟踪的分支（默认为 `master` 或 `main`） | 可选 |
| `ignore` | 忽略子模块状态的方式（默认为 `none`） | 可选 |
| `update` | 更新子模块的策略（默认为 `checkout`） | 可选 |

#### 手动编辑 `.gitmodules` 文件

在某些情况下，你可能需要手动编辑 `.gitmodules` 文件：

1. **修改子模块的 URL**：当子模块仓库地址变更时
2. **调整子模块的路径**：当需要移动子模块在项目中的位置时
3. **添加额外的配置项**：如指定跟踪的分支

**编辑后需要执行的操作：**
```bash
# 使修改生效
git submodule sync

# 更新子模块
git submodule update --init --recursive
```

#### 配置示例详解

**1. 基本配置**
```ini
[submodule "vue"]
    path = src/vue
    url = https://github.com/vuejs/vue.git
```
- 说明：添加 Vue.js 作为子模块，放置在 `src/vue` 目录下

**2. 指定分支和更新策略**
```ini
[submodule "react"]
    path = lib/react
    url = https://github.com/facebook/react.git
    branch = main
    update = rebase
    ignore = dirty
```
- 说明：
  - 跟踪 `main` 分支
  - 更新时使用 `rebase` 策略
  - 忽略子模块中的未提交更改

#### 注意事项

- `.gitmodules` 文件会被版本控制，修改后需要提交和推送
- 其他开发者克隆仓库后，Git 会根据 `.gitmodules` 文件中的信息拉取子模块
- 如果需要为本地修改子模块 URL（例如使用 SSH 而非 HTTPS），可以使用 `git config` 命令在本地覆盖配置：
  ```bash
  git config submodule.<子模块名>.url <新的 URL>
  ```
  这种本地修改不会影响 `.gitmodules` 文件

### 注意事项
- 子模块的 `.gitmodules` 文件会被版本控制，包含子模块的 URL 和路径映射
- 子模块在主仓库中被视为一个特定的提交，而不是跟踪其内容变化
- 推送主仓库时不会自动推送子模块的更改，需要单独推送

## `.gitignore`
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

`ls -a`显示所有文件包括隐藏的

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
## 与svn命令的对比
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