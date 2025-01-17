# 12.1 介绍、安装
`Python`是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言。
* 特点
1. 易于学习：`Python`有相对较少的关键字，结构简单，和一个明确定义的语法，学习起来更加简单。
2. 易于阅读：`Python`代码定义的更清晰。
3. 易于维护：`Python`的成功在于它的源代码是相当容易维护的。
4. 一个广泛的标准库：Python`Python`的最大的优势之一是丰富的库，跨平台的，在`UNIX`，`Windows`和`Macintosh`兼容很好。
5. 互动模式：互动模式的支持，您可以从终端输入执行代码并获得结果的语言，互动的测试和调试代码片断。
6. 可移植：基于其开放源代码的特性，`Python`已经被移植（也就是使其工作）到许多平台。
7. 可扩展：如果你需要一段运行很快的关键代码，或者是想要编写一些不愿开放的算法，你可以使用`C/C++`完成那部分程序，然后从你的`Python`程序中调用。
8. 数据库：`Python`提供所有主要的商业数据库的接口。
9. GUI编程：`Python`支持GUI可以创建和移植到许多系统调用。
10. 可嵌入: 你可以将`Python`嵌入到`C/C++`程序，让你的程序的用户获得"脚本化"的能力

## 12.1.1 安装

1. 下载安装。[python官网](https://www.python.org/)
 
2. 安装与配置环境变量
> * mac系统：mac系统默认安装python，通过python2、python3查看已安装的版本

### `pyenv`多版本管理工具

安装： 
::: code-group

```zsh [MacOS]
brew install pyenv
```

```zsh [Linux]
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```
:::

配置环境变量：

::: code-group

```zsh [MacOS]
vi ~/.zshrc

# pyenv
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```

```zsh [Linux]
vi ~/.bash_profile

# pyenv
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```
:::

使用：
```zsh
# 查看当前版本
pyenv versions

# 查看所有可安装的版本
pyenv install --list

# 安装指定版本
pyenv install 3.11.4

# 安装新版本后rehash一下
pyenv rehash

# 删除指定版本
pyenv uninstall 3.11.4

# 指定全局版本
pyenv global 3.11.4

# 使用指定版本执行
pyenv exec 3.11.4
```


## 12.1.2 书写规则
```py
# 这是一个Python程序

import time # 导入time库

print(time.time()) # 打印时间戳
```

* 编码风格：[PEP 8](https://pep8.org/)
* 自动风格化工具`aotopep8`：
> vscode 在插件中安装
> 设置为自动格式化模板
> ```json
>  "[python]": {
>    "editor.formatOnType": true,
>    "editor.defaultFormatter": "ms-python.autopep8"
>  },
> ```



## 12.1.3 命名规范
1. 名字由英文字母、数字、下划线组成
2. 变量名区分大小写
3. 不使用关键字作为变量名