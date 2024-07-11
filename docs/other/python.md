## 12.1 介绍、安装

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

### 12.1.1 安装：

1. 下载安装。[python官网](https://www.python.org/)
 
2. 安装与配置环境变量
> * mac系统：mac系统默认安装python，通过python2、python3查看已安装的版本

#### `pyenv`多版本管理工具

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


### 12.1.2 书写规则：
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



### 12.1.3 命名规范：
1. 名字由英文字母、数字、下划线组成
2. 变量名区分大小写
3. 不使用关键字作为变量名
## 12.2 变量、数字、序列、映射和集合
### 12.2.1 基本数据类型

* 整数`init`: 8
* 浮点数`float`: 8.8
* 字符串`str`: "8"
* 布尔值`bool`: True False

### 12.2.2 序列

指它的成员是有序排列，可以根据下标访问其成员    
#### 序列包括:  

字符串: "abc"    
列表: [0,"abcd"]   
元组: ("abc","def")    

#### 序列操作：

```py
str ="abcdefghijk"

print(str[5]) # f 访问 5

print(str[0:5]) # abcde 访问 0 到 5（左闭右开）

print(str[0:]) # abcdefghijk 访问 0 到最后一个

print(str[0:-1]) # abcdefghij 访问 0 到倒数第一个（左闭右开）

print('g' in str) # True g 是否在 str 中

print(str * 3) # abcdefghijkabcdefghijkabcdefghijk 序列重复
```

#### 字符串的特殊操作

```py
str ="abcdefghijk"

print(str + 'lmnopqr') # abcdefghijklmnopqr 字符串连接
```

#### 列表的特殊操作

```py
arr =['A','B','C','D','E','F','G','H','I','J','K']

arr.append('L') #  列表的连接

print(arr) #  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

arr.remove('L') #  列表的裁剪

print(arr) #  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
```

#### 元组中两个数字的比较：

```py
print((1,20)>(2,19)) #  False 相当于 120 > 219
```

::: tip
列表与元组的区别：列表的内容可以变更，元组不可以
:::

### 12.2.3 字典\映射

```py
dict = {}  # 定义一个空字典

print(type(dict)) # <class 'dict'>

dict['x'] = 1 # 赋值

print(dict) # {'x': 1}

dict['y'] = 2

for key in dict:
    print(key) # x y 遍历key
    print(dict[key]) # 1 2 遍历value
```

#### `keys`方法

```py
dict = {'a':1,'b':2,'c':3}

for key in dict.keys():
    print(key) # a b c 遍历key
```

#### `values`方法

```py
dict = {'a':1,'b':2,'c':3}

for key in dict.values():
    print(key) # 1 2 3 遍历value
```
### 12.2.4 类型方法
#### `type`
```py
var = '8.8'

print(type(var)) # <class 'float'>
```
## 12.3 条件和循环
### 12.3.1 `if`选择语句   

```py
# 单条件
x ='abc'

if x == 'abc' :
  print('x 等于 abc')

# 多条件
num ='123'

if num == 'abc' :
  print('num 等于 abc')
elif num== 'def':
  print('num 等于 def')
else:
  print('num 等于 ' + num)
```

### 12.3.2 `for`循环语句

```py
arr =['A','B','C','D','E','F','G','H','I','J','K']

for item in arr :
    print(item)
```

#### `range`方法
```py
for i in range(1,13) : # 起始索引，结束索引（左闭右开）
    print('%s月' %(i)) # 1月 ~ 12月
```

### 12.3.3 `while`循环语句

```py
i = 0
while i < 10:
    print(i) # 0 ~ 9
    i+=1
```

### 12.3.4 推导式

```py
# 从1 到 10 所有偶数的平方

# 常规写法
alist = []

for i in range(1,11):
  if(i % 2 == 0):
    alist.append(i*i)

print(alist)

# 列表推导式写法 [表达式 for 变量 in 序列 if 条件]

blist = [i*i for i in range(1,11) if(i % 2 == 0)]

print(blist)


# 字典推导式写法

clist = {i*i for i in range(1,11) if(i % 2 == 0)}

print(clist)
```

### 12.3.5 跳出

`break`用来终止循环，让循环不再往下继续，可以用在循环或`switch`中,不能用在`for/each`中    

`continue`用来跳过当前循环，继续往下循环，只能用在循环中    

`return`跳出当前函数，只能用在函数体内    
## 12.4 文件、输入输出、异常
### 12.4.1 文件的内建函数与方法
#### `open`:打开文件

* 参数：
> `file`:文件的路径(str类型)   

> `mode`:模式(str类型)
>> `r`只读(默认)    
>> `w`写入(会覆盖原内容)，`w+`写入(同`w`，如果文件不存在会新建)   
>> `a`写入(指针在文档的结尾)，`a+`写入(同`a`，如果文件不存在会新建)
  
> `buffering`:设置缓冲    

> `encoding`:编码,`utf8`(默认)    

> `errors`:报错级别    

> `newline`:区分换行符    

> `closefd`:传入的file参数类型    

> `opener`:设置自定义开启器，开启器的返回值必须是一个打开的文件描述符   

#### `read`:读取

* 参数
> `size`:读取到文件内指针位置(init类型),`-1`表示读取整个文件(默认) 
```py
file = open('file.text','r')

print(file.read()) # Hello world!1  Hello world!2  Hello world!3 

file.close()
```

#### `readline`:读取一行

* 参数
> `size`:读取当前行的字节数(init类型),`-1`表示读取整个行(默认)    
```py
file = open('file.text','r')

print(file.readline()) # Hello world!1 读取完一行后指针会移动到下一行

print(file.readline()) # Hello world!2

file.close()
```

#### `readlines`:逐行读取

```py
file = open('file.text','r')

# ['Hello world!1\n', 'Hello world!2\n', 'Hello world!3'] 逐行读取 并返回列表
print(file.readlines()) 

file.seek(0)
            
for line in file.readlines(): # 配合 for 循环，逐行读取
    print(line)
file.close()
```

#### `tell`:文件内指针位置
#### `seek`:设置文件内指针位置

* 参数
> `offset`:文件内指针位置偏移量(init类型)    
> `whence`:`0`表示从文件开头偏移(默认)，`1`表示从当前位置偏移，`2`表示从文件结尾偏移(init类型)
```py
file = open('file.text','r')

print(file.read(10)) # 读取到指针20处 
print(file.tell()) # 10 

file.seek(0)
print(file.tell()) # 0
```

#### `write`:写入

* 参数
> `params`:要写入的内容   

* 返回值
> 写入的字符长度    
```py
file = open('file.text', 'a') # ['Hello world!1\n', 'Hello world!2\n', 'Hello world!3\n']

file.write('\nHello world!4') # ['Hello world!1\n', 'Hello world!2\n', 'Hello world!3\n', 'Hello world!4']

file.close()
```

#### `writelines`:写入一个序列的字符串

* 参数
> `params`:要写入的内容   
    
```py
file = open('file.text','w')
            
list = ["Hello world!1\n", "Hello world!2\n","Hello world!3\n"]

file.writelines( list )

file.close()
```

#### `close`:关闭文件
#### `flush`:刷新缓冲区
#### `truncate`:截断

* 参数
> `size`:从指针位置开始（默认是文件开头），截取指定长度的内容(init类型)

#### `with`处理文件关键字
用于简化资源管理，它提供了一种保证在代码块执行完毕后资源会被正确释放的方法。with 语句创建了一个上下文管理器，该管理器负责在进入和退出代码块时执行相关操作       

```py
with open('file.text', 'w') as file:
    file.write('hello world !')

# 等同于
file = open('file.text', 'w')
file.write('hello world !')
file.close()
```

### 12.4.2 文件的异常检测处理

```py
try:
  # 要检测的代码
    print(1/0)
except NameError: # 要捕获的异常类型
  # 异常处理代码
except (NameError,AttributeError): # 同时捕获多种异常异常类型
  # 异常处理代码
except ZeroDivisionError as err: # 捕获所有错误，并将错误信息设置一个别名变量，并打印错误内存
  print('异常处理代码',err) # 异常处理代码 division by zero
finally:
  # 无论是否异常都要执行的代码
```
`params`的可选值：
> `Exception`:捕获所有错误    
> `NameError`名称异常   
> `ValueError`值异常    
> `KeyError`键异常    
> `AttributeError`属性异常    
> `ZeroDivisionError`零不能做除数   
> ...

## 12.5 函数、模块
### 12.5.1 基本结构

```py
def functionName(params,params,...):
  # 函数体
  return params
```
```py
def functionName(filename):
  file = open(filename,'r')
  str = file.read()
  file.close()
  return str

print(functionName('file.txt'))
```

### 12.5.2 参数

```py
def functionName(a,b,c):
    print(a,b,c)

functionName(1,2,3) # 1,2,3

functionName(c=1,b=2,a=3) # 3 2 1 关键字参数
```
* `*`可变长度参数
```py
def functionName(a,*b):
    print(a,b)

functionName(1,2,3,4) # 1 (2, 3, 4)
```

### 12.5.3 作用域

```py
a = 1;  
def test():
  a = 2  # 2 私有
  print(a)

test()  
print(a) # 1 全局
```
```py
a = 1;  
def test():
  global a # 修改全局作用域
  a = 2  # 2 私有
  print(a)

test()  
print(a) # 2 全局
```

### 12.5.4 迭代器
#### `iter`、`next`
```py
list = [1,2,3]
it = iter(list)
print(next(it)) # 1
print(next(it)) # 2
print(next(it)) # 3
```
#### `range`
> `params1`:起止(整数)   
> `params2`:结束(整数)  
> `params3`:步长(整数)  
```py
for i in range(10,30,2):
    print(i)
# 10
# 12
# 14
# .
# .
# .
# 28
```

### 12.5.5 生成器 
#### `yield`
```py
# 生成一个支持浮点数的range迭代器
def frange(start, stop, step):
  x = start
  while x < stop:
    yield x #记录当前值
    x += step

for i in frange(0,5,0.5):
    print(i)
# 0
# 0.5
# 1
# .
# .
# .
# 4.5
```

### 12.5.6 Lambda表达式

```py
def add(x,y):
     return x+y
    
add(3,2)

# Lambda表达式 [参数列表:表达式,实参]
add = lambda x,y : x+y

print(add(3,2))
``` 

### 12.5.7 内置函数
#### `filter`

* 参数：
> `function`:判断函数   
> `iterable`:可迭代对象
   
```py
a = [1,2,3,4,5,6,7]

print(list(filter(lambda x:x>2,a)))
# [3, 4, 5, 6, 7]
```
#### `map`

* 参数：
> `function`:判断函数   
> `iterable`: 一个或多个可迭代对象

```py
a = [1,2,3]
b = [4,5,6]

print(list(map(lambda x,y:x+y,a,b)))
# [5, 7, 9]
```
#### `reduce`

* 参数：
> `function`:判断函数   
> `iterable`: 可迭代对象
> `initializer`: 初始参数

```py
from functools import reduce

print(reduce(lambda x,y:x+y,[2,3,4],1))
# 10 ((1+2)+3)+4
```

#### `zip`

* 参数：
> `iterable`: 一个或多个可迭代对象

```py
# 矩阵转换
for i in zip((1,2,3),('a','b','c')):
    print(i)

# (1, 'a')
# (2, 'b')
# (3, 'c')
```

```py
# 字典 key/value 对调
dict = {"a":"1","b":"2","c":"3"}

print(list(zip(dict.values(),dict.keys())))

# [('1', 'a'), ('2', 'b'), ('3', 'c')]
``` 
### 12.5.8 闭包

```py
# aX+b=Y
def func(a,b):
    def k(X):
        return a*X+b
    return k

# a=3 b=5 x=10 y=?
line1 = func(3, 5)
# 35
print(line1(10))

# a=6 b=7 x=17 y=?
line2 = func(6, 7)
# 109
print(line2(17))

# lambda写法
def func(a,b):
    return lambda X:a*X+b
```

### 12.5.9 装饰器
```py
# 导入time库
import time

# 定义一个装饰器，用来计算函数的执行时间
def timmer(func):
    def wrapper():
        # 记录函数开始时间
        start_time = time.time()
        # 执行函数
        func()
        # 记录函数结束时间
        stop_time = time.time()
        # 打印函数执行时间
        print("运行时间是 %s 秒" % (stop_time - start_time))
    # 返回内部函数
    return wrapper

# 使用装饰器装饰函数i_can_sleep
@timmer
def i_can_sleep():
    # 暂停3秒
    time.sleep(3)

# 执行函数
i_can_sleep()
```
* 带参数的装饰器
```py
# 定义一个calculator函数，用于接收一个装饰器类型参数
def calculator(decorator_type):
    def decorator(func):
        # 定义一个函数，接收两个参数a和b
        def method(a,b):
            # 打印出a、b、装饰器类型和函数名
            print(a,b,decorator_type,func.__name__) # 1 -2 加法 add
            # 调用函数func，传入参数a和b
            func(abs(a),abs(b))
        # 返回函数method
        return method
    # 返回装饰器函数decorator
    return decorator

# 使用calculator装饰器装饰add函数，并传入参数'加法'
@calculator('加法')
def add(a, b):
    # 打印出a+b
    print(a + b)

# 调用add函数，传入参数1和-2
add(1,-2) # 3
```
### 12.5.10 上下文管理器
```py
with open("file.txt") as f:
    for line in f:
        line = line.strip()
        print(line)
```

### 12.5.11 模块
#### 几种导入方式
* import [模块名]
* import [模块名] as [别名]
* form [模块名] import [方法名]
```py
import time # 导入time库
time.sleep()

# 直接导入具体方法
from time import sleep
sleep()
```
#### 自定义模块
* 创建一个模块model
```py
# model.py
def print_name(name, age):
  print("My name is %s age is %s"%(name, age))

```
* 导入模块model
```py
# index.py
import model 
model.print_name('jaqi.L', 20)

# 直接导入具体方法
from model import print_name
print_name('jaqi.L', 20)
```
## 12.6 面对对象编程
概念：[什么是面向对象编程](/frontend/javascript/oop)
```py
class Player():
    def __init__(self, name, hp, role):
        self.name = name
        self.role = role

    def print_info(self):
        print(f'{self.name} is a {self.role},hp:{self.hp}')


user1 = Player('Bob', 100, '战士')
user2 = Player('Alice', 100, '法师')
```

* 类的方法和私有属性
```py
class Player():
    def __init__(self, name, hp, role):
        self.name = name
        self.hp = hp
        self._role = role  # 两个下划线开头的属性是私有的，不能在外部修改(规范)

    def print_info(self):
        print(f'{self.name} is a {self._role},hp:{self.hp}')

    def update_hp(self, type, hp): # hp属性的更新方法
        if type == '+':
            self.hp += hp
        elif type == '-':
            self.hp -= hp
        print(f'{self.name} now has {self.hp} hp')


user1 = Player('Bob', 100, '战士')
user2 = Player('Alice', 100, '法师')


user1.update_hp('+', 5)  # Bob now has 105 hp
user2.update_hp('-', 5)  # Alice now has 95 hp


user1.role = '刺客' # 通过 _role 仍能修改，只是不符合规范，应该使用类的方法更新数据
user1.print_info()  # Bob is a 战士,hp:105
```
* 类的继承
```py
# 父类
class Animal():
    def __init__(self):
        self.type = "猫科动物"
    class_name = "哺乳动物"

    def eat(self):
        print("吃鱼")

# 子类 继承父类Animal
class Cat(Animal):
    def __init__(self, name, color):
        super().__init__()  # 继承Animal的属性
        self.name = name
        self.color = color


cat1 = Cat("大毛", "黄色")
cat2 = Cat("二毛", "黑色")

print(cat1.type)  # 猫科动物
cat1.eat()  # 吃鱼 继承父类的方法
print(cat2.class_name)  # 哺乳动物
```
## 12.7 多线程编程

Python3 通过两个标准库 `_thread` 和 `threading` 提供对线程的支持。

`_thread` 提供了低级别的、原始的线程以及一个简单的锁，它相比于 `threading` 模块的功能还是比较有限的


### 12.7.1  `threading`
#### `threading.Thread`创建Thread类的实例   
* 参数：  
> `target`：线程将要执行的目标函数    
> `args`：目标函数的参数，以元组形式传递    
> `kwargs`：目标函数的关键字参数，以字典形式传递    
> `daemon`：指定线程是否为守护线程    

* 方法与属性：  
1. `__init__`：初始化Thread对象  
> `group`：线程组，暂时未使用，保留为将来的扩展   
> `target`：线程将要执行的目标函数    
> `name`：线程的名称    
> `args`：目标函数的参数，以元组形式传递    
> `kwargs`：目标函数的关键字参数，以字典形式传递    
> `daemon`：指定线程是否为守护线程    

1. `start()`：启动线程。将调用线程的run()方法    
2. `run(self)`：线程在此方法中定义要执行的代码    
3. `join(self, timeout=None)`：等待线程终止。默认情况下，join()会一直阻塞，直到被调用线程终止。如果指定了timeout参数，则最多等待timeout秒。
4. `is_alive(self)`：返回线程是否在运行。如果线程已经启动且尚未终止，则返回True，否则返回False    
5. `getName(self)`：返回线程的名称    
6. `setName(self, name)`：设置线程的名称    
7. `ident`属性：线程的唯一标识符    
8. `daemon`属性：线程的守护标志，用于指示是否是守护线程   
9.  `isDaemon()`方法：检查一个线程实例是否被标记为守护线程    

####  `threading.current_thread`: 返回当前的线程变量
####  `threading.enumerate`: 返回一个包含正在运行的线程的列表。正在运行指线程启动后、结束前，不包括启动前和终止后的线程
####  `threading.active_count`: 返回正在运行的线程数量，与 len(threading.enumerate()) 有相同的结果

* 直接实例化并调用方法：
```py
import threading
import time
 
def print_numbers():
    for i in range(5):
        time.sleep(1)
        print(i)

# 创建线程
thread = threading.Thread(target=print_numbers)
print ("%s: %s" % ( 'start',time.ctime(time.time()) ))
# 启动线程
thread.start()

# 进程状态 进程唯一标识
print ("%s: %s ,%s: %s" % ( 'is_alive',threading.Thread.is_alive(thread),'ident',threading.Thread.ident ))

# 是否是守护线程
print (threading.Thread.isDaemon(thread))
# 设置为守护线程
threading.Thread.daemon = True
print (threading.Thread.isDaemon(thread))

# 等待线程结束
thread.join()
print ("%s: %s" % ( 'stop',time.ctime(time.time()) ))
```

* 继承子类方法：
```py
import threading
import time

exitFlag = 0

class myThread (threading.Thread):
    def __init__(self, threadID, name, delay):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.delay = delay  
    def run(self):
         print ("开始线程：" + self.name)
         print ("%s: %s ,%s: %s" % ( 'is_alive',threading.Thread.is_alive(self),'ident',threading.Thread.ident ))
         print_time(self.name, self.delay, 5)
         print ("退出线程：" + self.name)       
def print_time(threadName, delay, counter):
    while counter:
        if exitFlag:
            threadName.exit()
        time.sleep(delay)
        print ("%s: %s" % (threadName, time.ctime(time.time())))
        counter -= 1

# 创建新线程
thread1 = myThread(1, "Thread-1", 1)
thread2 = myThread(2, "Thread-2", 2)

# 开启新线程
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print ("退出主线程")
```


### 12.7.2 线程同步

如果多个线程共同对某个数据修改，则可能出现不可预料的结果，为了保证数据的正确性，需要对多个线程进行同步。

`Thread`对象的 `Lock` 和 `Rlock` 可以实现简单的线程同步，这两个对象都有 `acquire` 方法和 `release` 方法，对于那些需要每次只允许一个线程操作的数据，可以将其操作放到 `acquire` 和 `release` 方法之间。

锁有两种状态——锁定和未锁定。每当一个线程比如"set"要访问共享数据时，必须先获得锁定；如果已经有别的线程比如"print"获得锁定了，那么就让线程"set"暂停，也就是同步阻塞；等到线程"print"访问完毕，释放锁以后，再让线程"set"继续。经过这样的处理，打印列表时要么全部输出0，要么全部输出1，不会再出现一半0一半1的尴尬场面。


```py
"""
一个列表里所有元素都是 0，线程 "set" 从后向前把所有元素改成 1，而线程 "print" 负责从前往后读取列表并打印。那么，可能线程"set"开始改的时候，线程"print"便来打印列表了，输出就成了一半0一半1，这就是数据的不同步。为了避免这种情况，引入了锁的概念。
"""
import threading

# 创建一个全局列表和一个互斥锁
shared_list = [0] * 10
lock = threading.Lock()

def set_values():
    """
    线程 "set" 从后向前将列表元素设置为1
    """
    global shared_list
    
    # 从后往前遍历列表
    for i in range(len(shared_list) - 1, -1, -1):
        # 获取锁
        lock.acquire()
        
        try:
            # 修改列表元素
            shared_list[i] = 1
            print(f"线程 'print' 输出：索引 {i} 的值是 {shared_list[i]}")
        finally:
            # 释放锁
            lock.release()

def print_values():
    """
    线程 "print" 从前往后打印列表元素
    """
    global shared_list
    
    # 从前向后遍历列表
    for i in range(len(shared_list)):
        # 获取锁
        lock.acquire()
        
        try:
            print(f"线程 'print' 输出：索引 {i} 的值是 {shared_list[i]}")
        finally:
            # 释放锁
            lock.release()

# 创建并启动线程
setter_thread = threading.Thread(target=set_values)
printer_thread = threading.Thread(target=print_values)

setter_thread.start()
printer_thread.start()

# 等待所有线程完成
setter_thread.join()
printer_thread.join()

# 在主线程中输出最终列表状态
print("\n最终列表内容：", shared_list)
```

### 12.7.3 线程优先级队列
Python 的 Queue 模块中提供了同步的、线程安全的队列类，包括FIFO（先入先出)队列Queue，LIFO（后入先出）队列LifoQueue，和优先级队列 PriorityQueue。
这些队列都实现了锁原语，能够在多线程中直接使用，可以使用队列来实现线程间的同步。

`Queue` 模块中的常用方法:

`Queue.qsize()`： 返回队列的大小
`Queue.empty()`： 如果队列为空，返回True,反之False
`Queue.full()`：如果队列满了，返回True,反之False
`Queue.full` 与 `maxsize`：大小对应
`Queue.get([block[, timeout]])`：获取队列，timeout等待时间
`Queue.get_nowait()`：相当`Queue.get(False)`
`Queue.put(item)`：写入队列，timeout等待时间
`Queue.put_nowait(item)`：相当`Queue.put(item, False)`
`Queue.task_done()`：在完成一项工作之后，`Queue.task_done()`函数向任务已经完成的队列发送一个信号
`Queue.join()`：实际上意味着等到队列为空，再执行别的操作

```py
import queue
# 创建一个队列
q = queue.Queue()

# 增加队列成员
q.put('a')
q.put('b')
q.put('c')

# 读取队列 a
print(q.get()) 

# 队列剩余长度 2
print(q.qsize())
```

```py
# 生产者与消费者模型
import queue
import threading
import time
import random
# 创建一个队列 长度为5
q = queue.Queue(5)

# 队列的生产者
class ProducerThread(threading.Thread):
    def run(self):
        name = threading.current_thread().getName()
        nums = range(100)
        global q
        while True:
            num = random.choice(nums)
            q.put(num)
            print('生产者线程%s生产了%d' % (name, num))
            t = random.randint(1, 3)
            time.sleep(t)
            print('生产者线程%s睡眠了%d' % (name, t))


# 队列的消费者
class ConsumerThread(threading.Thread):
    def run(self):
        name = threading.current_thread().getName()
        global q
        while True:
            num = q.get()
            q.task_done()
            print('消费者线程%s消费了%d' % (name, num))
            t = random.randint(1, 5)
            time.sleep(t)
            print('消费者线程%s睡眠了%d' % (name, t))

# 2个生产者 1个消费者
p1 = ProducerThread(name = 'p1')
p1.start()

p2 = ProducerThread(name = 'p2')
p2.start()

c1 = ConsumerThread(name = 'c1')
c1.start()
```


```py
import queue
import threading
import time

exitFlag = 0

class myThread (threading.Thread):
    """
    初始化线程对象。
    
    参数:
    - threadID: 线程ID，用于标识线程。
    - name: 线程名称，便于识别。
    - q: 用于线程间通信的队列。
    """
    def __init__(self, threadID, name, q):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.q = q
    def run(self):
        print ("开启线程：" + self.name)
        process_data(self.name, self.q)
        print ("退出线程：" + self.name)

def process_data(threadName, q):
    while not exitFlag:
        queueLock.acquire()
        if not workQueue.empty():
            data = q.get()
            queueLock.release()
            print ("%s processing %s" % (threadName, data))
        else:
            queueLock.release()
            time.sleep(1)

threadList = ["Thread-1", "Thread-2", "Thread-3"]
nameList = ["One", "Two", "Three", "Four", "Five"]
queueLock = threading.Lock()
# 创建队列
workQueue = queue.Queue(10)
threads = []
threadID = 1

# 创建新线程
for tName in threadList:
    thread = myThread(threadID, tName, workQueue)
    thread.start()
    threads.append(thread)
    threadID += 1

# 填充队列
queueLock.acquire()
for word in nameList:
    workQueue.put(word)
queueLock.release()

# 等待队列清空
while not workQueue.empty():
    pass

# 通知线程是时候退出
exitFlag = 1

# 等待所有线程完成
for t in threads:
    t.join()
print ("退出主线程")
```

### 12.7.4  `_thread`

函数式：调用 `_thread` 模块中的`start_new_thread()` 函数来产生新线程。
#### `start_new_thread`

* 参数：
> `function`:线程函数   
> `args`:传递给线程函数的参数(tuple类型)
> `kwargs`:可选参数

```py
#!/usr/bin/python3

import _thread
import time

# 为线程定义一个函数
# threadName: 线程名称
# delay: 延迟时间s
def print_time( threadName, delay):
  count = 0
  while count < 5:
    time.sleep(delay)
    count += 1
    print ("%s: %s" % ( threadName, time.ctime(time.time()) ))

# 创建两个线程
try:
  print ("%s: %s" % ( 'start',time.ctime(time.time()) ))
  _thread.start_new_thread( print_time, ("Thread-1", 2, ) )
  _thread.start_new_thread( print_time, ("Thread-2", 4, ) )
except:
  print ("Error: 无法启动线程")

while 1:
  pass

# start:    32:28
# Thread-1: 32:30
# Thread-2: 32:32
# Thread-1: 32:32
# Thread-1: 32:34
# Thread-2: 32:36
# Thread-1: 32:36
# Thread-1: 32:38
# Thread-2: 32:40
# Thread-2: 32:44
# Thread-2: 32:48

```

* 单线程 顺序执行
```py
def myThread(arg1,arg2):
  print('%s %s' % (arg1,arg2))

for i in range(1,6,1):
  t1 = myThread(i,i+1)
```
* 多线程 异步线程
```py
import threading
import time
from threading import current_thread

def myThread(arg1,arg2):
  print(current_thread().getName(),'start')
  print('%s %s' % (arg1,arg2))
  time.sleep(1)
  print(current_thread().getName(),'stop')

for i in range(1,6,1):
  t1 = threading.Thread(target=myThread,args=(i,i+1))
  t1.start()


print(current_thread().getName(),'end')

# Thread-1 start
# 1 2
# Thread-2 start
# 2 3
# Thread-3 start
# 3 4
# Thread-4 start
# 4 5
# Thread-5 start
# 5 6
# MainThread end
# Thread-1 stop
# Thread-2 stop
# Thread-5 stop
# Thread-3 stop
# Thread-4 stop

```
* 多线程 同步线程
```py
import threading
from threading import current_thread

class myThread(threading.Thread):    
    def run(self):
        print(current_thread().getName(),'start')
        print('run')
        print(current_thread().getName(),'stop')

t1 = myThread()
t1.start()
t1.join()
print(current_thread().getName(),'end')


# Thread-1 start
# run
# Thread-1 stop
# MainThread end
```
## 12.8 标准库
[标准库官方文档](https://docs.python.org/zh-cn/3/library/index.html)

### 12.8.1 正则表达式库`re`
```py
import re
```

`re`模块由两个对象组成：`RegexObject`(模式对象)和`MatchObject`(匹配对象，匹配结果)
      
#### 定义
1. `r`关键字创建:
```py
reg = r'\d'
```
2. `compile`方法创建:
```py
re.compile('\d')
```
* 使用变量拼接正则
```py
import re 
value = 'jaqi_l'

# re.Match object; span=(0, 14), match='www.jaqi_l.com'>
print(re.search( r'\w+\.'+ value + '\.\w+', 'www.jaqi_l.com'))

# re.Match object; span=(0, 14), match='www.jaqi_l.com'>
print(re.search(re.compile('\w+\.'+ value + '\.\w+'), 'www.jaqi_l.com'))
```


#### 正则的组成

1. 特殊的元字符     
* `\d` 0~9任意一个数字 `[0-9]`
* `\D` 非0~9之间的任意字符 `[^0-9]`
* `\w` 字母、数字或者下划线 `[A-Za-z0-9_]`
* `\W` 非字母、数字下划线 `[^A-Za-z0-9_]`
* `\s` 匹配任意一个空白字符，（包括空格、制表符、换页符等等）`[\f\n\r\t\v]`
* `\S` 匹配任意一个非空白字符，（包括空格、制表符、换页符等等）`[^\f\n\r\t\v]`
* `\b` 单词边界（匹配单词的开始或结束位置）
* `\B` 非单词边界（匹配不在单词开始或结束位置的位置）
* `.` 表示除了`\n`之外的任意字符（当`re.DOTALL`标记被指定时，则可以匹配包括换行符的任意字符）
* `^` 以某个字符开头（多行模式下，以每行的开始匹配）
* `\A` 以某个字符开头（不受多行模式下，仍以整个字符串的开始匹配）
* `$` 以某个字符结尾（多行模式下，以每行的结尾匹配）
* `\Z` 以某个字符结尾（不受多行模式下，仍以整个字符串的结尾匹配）
* `a|b` a或者b任意个(a,b,ab)
* `\n` 换行符
* `\t` 制表符
* `^$` 空行
* `.*?` 非贪婪模式

2. 量词元字符       
`*`	出现零到多次 `{0, }`        
`+`	出现一次到多次 `{1，}`      
`?`	出现零到一次 `{0, 1}`，非贪婪       
`{n}` 出现n次       
`{n,}` 出现至少n次      
`{n,m}`	出现n到m次      

3. 原子表`[]`       
* `[abc]` a或b或c任意个     
* `[^abc]` 除了a、b、c之外的        
* `[a-z]` a到z任意一个字母（`[0-9]` `\d`）      
* `[^a-z]` a到z之外的任意字符       

4. 原子组`()`       
`\n`原子组号：从左到右一个括号表示一组`\1`、`\2`、`\3`、`\4`，如果是嵌套的，先算里面的然后在继续算后面的

```py
import re
# 138****1234
print(re.sub(r'(\d{3})(\d{4})(\d{4})', r'\1****\2', '13812341234'))
```

<!-- 
\z	匹配字符串结束
\G	匹配最后匹配完成的位置。
`[...]`	用来表示一组字符,单独列出：[amk] 匹配 'a'，'m'或'k'
`[^...]`	不在[]中的字符：[^abc] 匹配除了a,b,c之外的字符。


`(?imx)`	正则表达式包含三种可选标志：i, m, 或 x 。只影响括号中的区域。
`(?-imx)`	正则表达式关闭 i, m, 或 x 可选标志。只影响括号中的区域。
`(?: re)`	类似 (...), 但是不表示一个组
`(?imx: re)`	在括号中使用i, m, 或 x 可选标志
`(?-imx: re)`	在括号中不使用i, m, 或 x 可选标志
`(?#...)`	注释.
`(?= re)	`前向肯定界定符。如果所含正则表达式，以 ... 表示，在当前位置成功匹配时成功，否则失败。但一旦所含表达式已经尝试，匹配引擎根本没有提高；模式的剩余部分还要尝试界定符的右边。
`(?! re)`	前向否定界定符。与肯定界定符相反；当所含表达式不能在字符串当前位置匹配时成功。
`(?> re)	`匹配的独立模式，省去回溯。


`\1`...`\9`	匹配第n个分组的内容。
`\10`	匹配第n个分组的内容，如果它经匹配。否则指的是八进制字符码的表达式。

-->

#### 修饰符
* `re.I`:忽略大小写
* `re.L`:根据本地设置而更改`\w`,`\W`,`\b`,`\B`,`\s`,`\S`的匹配内容
* `re.M`:多行匹配模式，影响 `^` 和 `$`
* `re.S`、`re.DOTALL`:使`.`元字符也能匹配换行符
* `re.U`:匹配Unicode字符
* `re.X`:忽略pattern中的空格,并且可以使用“#”

#### `RegexObject`(模式对象)

1. `match`
返回全部符合的元素对象`match(pattern, string, flags)`
* 参数：
> `pattern`:正则表达式      
> `string`:要匹配的字符串       
> `flags`:匹配方式，可选项如上`修饰符`      

2. `search`
返回全部符合的元素对象`search(pattern, string, flags)`
* 参数：
> `pattern`:正则表达式      
> `string`:要匹配的字符串       
> `flags`:匹配方式，可选项如上`修饰符`        

::: tip search 与 match 的区别
```py
import re
# match是完整匹配，从头开始匹配
print(re.match('jaqi', 'www.jaqi_l.com')) # None
# 相当于
print(re.search('^jaqi', 'www.jaqi_l.com'))  # None
 
print(re.search('jaqi', 'www.jaqi_l.com')) # <re.Match object; span=(4, 8), match='jaqi'>
```
:::

3. `sub`
返回替换后的字符串`sub(pattern, repl, string, count, flags)`
* 参数：
> `pattern`:正规表达式模式      
> `repl`:替换的字符串，也可为一个函数     
> `string`:要被查找替换的原始字符串     
> `count`:可选参数，最大替换次数，默认全部替换   
> `flags`:匹配方式，可选项如上`修饰符`       

```py
import re
# 1381234-5678 最多匹配数1，所以第二个"-"不会被替换
print (re.sub('-', "", "138-1234-5678",1))
# 138****1234
print(re.sub(r'(\d{3})(\d{4})(\d{4})', r'\1****\2', '13812341234'))
```   

4. `subn`
返回一个元组，元组包括替换后的字符串和一共替换的次数`sub(pattern, repl, string, count=0, flags)`
* 参数：
> `pattern`:正规表达式模式      
> `repl`:替换的字符串，也可为一个函数     
> `string`:要被查找替换的原始字符串     
> `count`:可选参数，最大替换次数  
> `flags`:匹配方式，可选项如上`修饰符`    

```py
import re
# ('13812345678', 2)
print (re.subn('-', "", "138-1234-5678",2)) 
```   

5. `findall`
返回一个列表，列表项为所有匹配的元素`pattern.findall(string, pos, endpos)`
* 参数：
> `pattern`:正则表达式      
> `string`:要匹配的字符串       
> `pos`:匹配的起始位置        
> `endpos`:匹配的结束位置,不包括结束位置的索引（左闭右开）         

```py
import re
pattern = re.compile('1234')

#  match 和 search 是返回最先匹配成功的元素
# <re.Match object; span=(3, 7), match='1234'>
print(re.search(pattern,'13812341234'))

# 返回全部的匹配项
# ['1234', '1234']
print(pattern.findall('13812341234'))
# ['1234']
print(pattern.findall('13812341234',7,11))
``` 

6. `finditer`
返回一个迭代器，每一项为所有匹配的元素详细信息`findall(pattern, string, flags)`
* 参数：
> `pattern`:正则表达式      
> `string`:要匹配的字符串        
> `flags`:匹配方式，可选项如上`修饰符`          

```py
import re
pattern = re.compile('1234')

# 返回全部的匹配项
list = pattern.finditer('13812341234')
for match in list: 
    print (match.group())
```

7. `split`
返回一个列表，列表项为所有匹配的元素`split(pattern, string, maxsplit, flags)`
* 参数：
> `pattern`:正则表达式      
> `string`:要匹配的字符串       
> `maxsplit`:分隔次数, 不填或0标识不限制次数        
> `flags`:匹配方式，可选项如上`修饰符`             

```py
import re
pattern = re.compile('\W+')
# ['abc', 'def', 'ghi']
print(pattern.split('abc,def,ghi'))

# ['abc', 'def,ghi']
print(split(pattern,'abc,def,ghi',1))
``` 
#### `MatchObject`(匹配对象，匹配结果)
使用 `search`、`match`等`RegexObject`方法时，返回的是`MatchObject`(匹配对象，匹配结果)
* `groups()`:返回一个包含所有原子组的元组，0表示全部，1,2,3...表示原子组序号   
* `group(n)`:返回原子组序号为n，所匹配的字符串，一次输入多个n，返回多组匹配的字符串 ，不填认为是整个字符串           
* `span(n)`: 返回一个元组包含匹配 (开始,结束) 的位置，不填认为是整个字符串     
* `start(n)`:返回匹配开始的位置，不填认为是整个字符串的开始位置       
* `end(n)`:返回匹配结束的位置，不填认为是整个字符串的结束位置  

```py
import re
# ('138', '1234', '5678')
print(re.match('(\d{3})(\d{4})(\d{4})', '13812345678').groups())
# 13812345678 0或者不填都返回整体
print(re.match('(\d{3})(\d{4})(\d{4})', '13812345678').group())
# 1234 
print(re.match('(\d{3})(\d{4})(\d{4})', '13812345678').group(2))
# (3, 7)组2的还是结束索引 
print(re.match('(\d{3})(\d{4})(\d{4})', '13812345678').span(2))
# 3 组3的开始位置‘1’的索引是3
print(re.match('(\d{3})(\d{4})(\d{4})', '13812345678').start(2))
# 7 组3的结束位置‘4’的索引是7
print(re.match('(\d{3})(\d{4})(\d{4})', '13812345678').end(2))
```
### 12.8.2 日期时间库


#### `time` 
```py
import time

# 时间戳 1710409191.9605918
print(time.time())

# 当前时间 time.struct_time(tm_year=2024, tm_mon=3, tm_mday=14, tm_hour=17, tm_min=39, tm_sec=51, tm_wday=3, tm_yday=74, tm_isdst=0)
print(time.localtime())

# 格式化当前时间 24-03-14 17:39:51
print(time.strftime('%y-%m-%d %H:%M:%S'))
```

* 内置函数
1. `altzone`：返回格林威治时间与当前地区的时间差(s)
2. `asctime(tupletime)`：接收时间元祖，返回一个格式化的时间字符串(Fri Mar 15 09:21:43 2024)
3. `clock`：返回当前时间的浮点秒数(Python 3.3以后不推荐试用，由`perf_counter`、`process_time`替代)
4. `ctime(secs)`：接收时间戳，返回格式化的时间字符串（作用相当于`asctime(localtime(secs))`，未给参数相当于`asctime()`）
5. `gmtime(secs)`：接收时间戳，返回格林威治时间元组
6. `localtime(secs)`：接收时间戳，返回当地时间元组
7. `mktime(tupletime)`：接受时间元组，返回时间戳
8. `sleep`：推迟调用线程的运行
9. `strftime(fmt,tupletime)`：接收以时间元组和格式字符串，并返回以可读字符
10. `strptime(str,fmt)`：接收可读字符和格式字符串，并返回时间元祖
11. `time`：返回当前时间的时间戳
12. `tzset`：设置时区
13. `perf_counter`：当前进程运行时的所有时间（包括任何等待 I/O 操作或其他非CPU工作的时间）
14. `process_time`：当前进程在CPU上的执行时间（不包括任何等待 I/O 操作或其他非CPU工作的时间）

* 属性
1. `timezone`：返回当前时区的时间差(s)
2. `tzname`：返回当前时区的名称
#### `datetime`
```py
import datetime

# 当前时间
print(datetime.datetime.now())

nowTime = datetime.datetime.now()
# 十分钟后的时间
print(datetime.timedelta(minutes=10)+nowTime)

# 十天后的时间
print(datetime.timedelta(days=10)+nowTime)
```

#### `calendar`

* 内置函数
1. `calendar(year, width, lines, columns)`：接收一个年份，返回该年的日历
2. `month(year,month,width,lines)`：接收一个年份、月份，返回该年该月的日历
3. `monthcalendar(year,month)`：接收一个年份、月份，返回该年该月的二维数组
4. `monthrange(year,month)`：接收一个年份、月份，返回该月的一号是星期几，该月有几天
5. `firstweekday`：获取每周的起始日期码，默认是0
6. `setfirstweekday(weekday)`：设置每周的起始日期码
7. `isleap(year)`：接收一个年份，返回该年份是否是闰年
8. `leapdays(year1,year2)`：接受开始和结束年份，返回闰年的总数
9.  `prcal(year, width, lines, columns)`：相当于`print (calendar.calendar(year, width, lines, columns))`
10. `prmonth(year,month,width,lines)`：相当于`month(year,month,width,lines)`
11. `timegm(tupletime)`：和`time.gmtime`相反：接受一个时间元组形式，返回该时刻的时间戳
12. `weekday(year,month,day)`：返回给定日期的日期码


```py
import calendar

# 获取某年某月的日历
cal = calendar.month(2006, 4)
```

#### 组成
* 时间元祖(`tupletime`)

| 字段 | 值范围 |
| -------- | -------- |
| tm_year（4位数年）| 0000-9999 |
| tm_mon（月）| 1 到 12 |
| tm_mday（日）| 1 到 31 |
| tm_hour（小时）| 0 到 23 |
| tm_min（分钟）| 0 到 59 |
| tm_sec（秒）| 0 到 61 (60或61 是闰秒) |
| tm_wday（一周的第几日）| 0 到 6 (0是周一) |
| tm_yday（一年的第几日）| 一年中的第几天，1 到 366 |
| tm_isdst（夏令时）| 是否为夏令时，值有：1(夏令时)、0(不是夏令时)、-1(未知)，默认 -1 |

* 格式化符号(`fmt`)

| 符号 | 意义 |
| -------- | -------- |
| `%y` | 两位数的年份表示（00-99） |
| `%Y` | 四位数的年份表示（000-9999） |
| `%m` | 月份（01-12） |
| `%d` | 月内中的一天（0-31） |
| `%H` | 24小时制小时数（0-23） |
| `%I` | 12小时制小时数（01-12） |
| `%M` | 分钟数（00=59） |
| `%S` | 秒（00-59） |
| `%a` | 本地简化星期名称 |
| `%A` | 本地完整星期名称 |
| `%b` | 本地简化的月份名称 |
| `%B` | 本地完整的月份名称 |
| `%c` | 本地相应的日期表示和时间表示 |
| `%j` | 年内的一天（001-366） |
| `%p` | 本地A.M.或P.M.的等价符 |
| `%U` | 一年中的星期数（00-53）星期天为星期的开始 |
| `%w` | 星期（0-6），星期天为星期的开始 |
| `%W` | 一年中的星期数（00-53）星期一为星期的开始 |
| `%x` | 本地相应的日期表示 |
| `%X` | 本地相应的时间表示 |
| `%Z` | 当前时区的名称 |
| `%%` | %号本身 |


* 参数说明
> `year`：年份      
> `month`：月份     
> `weekday`：星期几     
> `day`：几号       
> `width(w)`：指定每一行的宽度，用于控制输出的日历格式,默认为20     
> `lines(l)`：指定每列应有多少行周信息才换到下一列,默认为6  
> `columns(c)`：指定日历应该分成多少列展示,默认为3  
> `tupletime`：时间元祖 
> `secs`：时间戳    
> `fmt`：格式化符号 
> `str`：刻度的时间字符串   

### 12.8.3 数学

#### `math`
* 常量
1. `e`：返回自然常数e
2. `inf`：返回一个浮点数，表示正无穷大
3. `nan`：返回一个浮点值 NaN 
4. `pi`：返回圆周率π
5. `tau`：返回数学常数 τ = 6.283185...，等于 2π

* 方法
1. `math.acos(x)`：返回 x 的反余弦，结果范围在 0 到 pi 之间     
2. `math.acosh(x)`：返回 x 的反双曲余弦值       
3. `math.asin(x)`：返回 x 的反正弦值，结果范围在 -pi/2 到 pi/2 之间     
4. `math.asinh(x)`：返回 x 的反双曲正弦值       
5. `math.atan(x)`：返回 x 的反正切值，结果范围在 -pi/2 到 pi/2 之间     
6. `math.atan2(y, x)`：返回给定的 X 及 Y 坐标值的反正切值，结果是在 -pi 和 pi 之间      
7. `math.atanh(x)`：返回 x 的反双曲正切值       
8. `math.ceil(x)`：将 x 向上舍入到最接近的整数           
9.  `math.cos()`：返回 x 弧度的余弦值       
10. `math.cosh(x)`：返回 x 的双曲余弦值     
11. `math.degrees(x)`：将角度 x 从弧度转换为度数           
12. `math.erf(x)`：返回一个数的误差函数     
13. `math.erfc(x)`：返回 x 处的互补误差函数       
14. `math.fabs(x)`：返回 x 的绝对值     
15. `math.factorial(x)`：返回 x 的阶乘    
16. `math.floor()`：将数字向下舍入到最接近的整数        
17. `math.fmod(x, y)`：返回 x/y 的余数      
18. `math.fsum(iterable)`：返回可迭代对象 (元组, 数组, 列表, 等)中的元素总和，是浮点值      
19. `math.gcd()`：返回给定的整数参数的最大公约数         
20. `math.isclose(a,b)`：检查两个值是否彼此接近，若 a 和 b 的值比较接近则返回 True，否则返回 False
21. `math.isfinite(x)`：判断 x 是否有限，如果 x 既不是无穷大也不是 NaN，则返回 True ，否则返回 False        
22. `math.isinf(x)`：判断 x 是否是无穷大，如果 x 是正或负无穷大，则返回 True ，否则返回 False       
23. `math.isnan()`：判断数字是否为 NaN，如果 x 是 NaN（不是数字），则返回 True ，否则返回 False     
24. `math.isqrt()`：将平方根数向下舍入到最接近的整数        
25. `math.ldexp(x, i)`：返回 x * (2**i) 。 这基本上是函数 math.frexp() 的反函数     
26. `math.log(x[, base])`：使用一个参数，返回 x 的自然对数（底为 e ）       
27. `math.log10(x)`：返回 x 底为 10 的对数      
28. `math.log1p(x)`：返回 1+x 的自然对数（以 e 为底）       
29. `math.log2(x)`：返回 x 以 2 为底的对数      
30. `math.perm(n, k=None)`：返回不重复且有顺序地从 n 项中选择 k 项的方式总数        
31. `math.pow(x, y)`：将返回 x 的 y 次幂        
32. `math.prod(iterable)`：计算可迭代对象中所有元素的积        
33. `math.radians(x)`：将角度 x 从度数转换为弧度         
34. `math.sin(x)`：返回 x 弧度的正弦值        
35. `math.sinh(x)`：返回 x 的双曲正弦值        
36. `math.sqrt(x)`：返回 x 的平方根        
37. `math.tan(x)`：返回 x 弧度的正切值        
38. `math.tanh(x)`：返回 x 的双曲正切值        
39. `math.trunc(x)`：返回 x 截断整数的部分，即返回整数部分，删除小数部分        

#### `random`
```py
import random

# 0-24 整数
print(random.randint(0,24))

# 从枚举值中随机选取一个值
print(random.choice(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']))
```

* 方法
1. `randint(x,y)`：返回x到y之间随机整数     
2. `random()`：返回0.0到1.0之间随机浮点数      
3. `choice(list)`：返回list之中的一个随机整数       

### 12.8.4 文件夹操作

#### `access`

* 方法
1. `os.access(path, mode)`：检测是否有访问
> `path`：路径      
> `mode`：检测模式，可选值有`os.F_OK`是否存在、`os.R_OK`否可读、`os.W_OK`是否可写、`os.X_OK`否可执行            

#### `chdir`

* 方法
1. `os.chdir(path)`：改变当前工作目录
> `path`：路径

#### `chmod`

* 方法
1. `os.chmod(path, mode)`：改变当前工作目录
> `path`：路径      
> `mode`：权限

#### `chown`

* 方法
1. `os.chown(path, mode)`：更改文件所有者
> `path`：路径      
> `uid`：所属用户 ID        
> `gid`：所属用户组 ID

#### `path`

1. `os.path.abspath(path)`：返回绝对路径
2. `os.path.basename(path)`：返回文件名
3. `os.path.dirname(path)`：返回路径中的目录部分
4. `os.path.split(path)`：返回路径的目录和文件名
5. `os.path.exists(path)`：判断路径是否存在
6. `os.path.isdir(path)`：判断是否为目录
7. `os.path.isfile(path)`：判断是否为文件
8. `os.path.join(path1, path2)`：路径拼接
9. `os.path.samefile(path1, path2)`：判断两个路径是否指向同一个文件

```py
import os

# 当前路径的绝对路径
print(os.path.abspath('.'))
# 根目录下是否存在 Users
print(os.path.exists('/Users'))
 
# 是不是目录
print(os.path.isdir('/Users'))

# 是不是文件
print(os.path.isfile('/Users'))

# 路径拼接
print(os.path.join('a/b','c/d'))
```

#### `replace` 
`os.replace(src, dst)`：重命名文件或目录
> `src`：源文件或目录       
> `dst`：重命名后的文件或目录，如果已存在，会直接替换

#### `symlink`
`os.symlink(src, dst, target_is_directory)`创建软链接
> `src`：要创建软链接的目标文件或目录的路径     
> `dst`：软链接的路径和名称     
> `target_is_directory`：指定 src 是否是一个目录。如果为True，dst 将被创建为指向目录的软链接

#### `readlink`
`os.readlink(path)`返回软链接所指向的文件
> `path`：文件路径

#### `statvfs`
`os.statvfs(path)`文件的文件系统的信息
> `path`：文件路径

#### `rename`
`os.rename(old, new)`递归重命名目录或文件
> `old`：要修改的目录名     
> `new`：修改后的目录名

#### `renames`
`os.renames(old, new)`递归重命名目录或文件
> `old`：要重命名的目录     
> `new`：文件或目录的新名字，可以是包含在目录中的文件，或者完整的目录树

#### `rmdir`
`os.rmdir(path)`删除指定路径的非空目录      
> `path`：文件路径

#### `remove`
`os.remove(path)`删除指定路径的文件
> `path`：文件路径

#### `removedirs`
`os.removedirs(path)`递归删除非空目录       
> `path`要移除的目录路径

### 12.8.4 网络库`urllib`(http协议库)
```py
from urllib import request

url = 'https://www.baidu.com/'

res = request.urlopen(url,timeout=1)

print(res.read().decode('utf-8')) 
```
* `get` / `post`
```py
from urllib import request
from urllib import parse

data = bytes(parse.urlencode({'word': 'hello'}), encoding='utf-8')

response1 = request.urlopen('http://httpbin.org/post', data=data)
print(response1.read().decode('utf-8'))

response2 = request.urlopen('http://httpbin.org/get?word=hello',timeout=1)
print(response2.read().decode('utf-8'))
```
* 捕获错误
```py
from urllib import request

try:
    response = request.urlopen('http://httpbin.org/get', timeout=0.1)
    print(response.read().decode('utf-8'))
except Exception as e:
    print('time out')
```

* 设置请求头
```py
from urllib import request
from urllib import parse

data = bytes(parse.urlencode({'word': 'hello'}), encoding='utf-8')

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36'
}

req = request.Request('http://httpbin.org/post', data=data, headers=headers, method='POST')

res = request.urlopen(req)

print(res.read().decode('utf-8'))
```

## 12.9 第三方库

### 12.9.1 `Numpy`
用于高性能科学技术和数据分析（基于c语言开发）

* 安装
```zsh
pip install numpy
```

* 使用
```py
import numpy as np

arr1 = np.array([2, 3, 4])

print(arr1)
print(arr1.dtype)  # int64

arr2 = np.array([1.2, 3.5, 5.1])

print(arr2)
print(arr2.dtype)  # float64


print(arr1+arr2)
print(arr2*10)

# 矩阵相关
# 二维数组转矩阵
data = [[1,2,3],[4,5,6]]

arr3 = np.array(data)

print(arr3)

# 定义一个3*5的全0矩阵
print(np.zeros((2, 2)))

# 定义一个3*5的全1矩阵
print(np.ones((3, 3)))

# 定义一个3*5的空矩阵
print(np.empty((3, 3, 3)))

# 数组切片
arr4 = np.arange(10) # [0 1 2 3 4 5 6 7 8 9]

print(arr4[5]) # 5 
print(arr4[5:8])# [5 6 7]

arr4[5:8] = 10

print(arr4)# [ 0  1  2  3  4 10 10 10  8  9]

# 不改变原数组
arr_slice = arr4[5:8].copy()
arr_slice[:] = 15

print(arr_slice)
print(arr4)
```

### 12.9.2 `Pandas`
用于数据预处理和清洗
* 安装
```zsh
pip install pandas
```
* Series
一维数据
```py
import pandas as pd

# Series 一维数组
obj1 = pd.Series([4, 7, -5, 3])
print(obj1)
print(obj1.index)
print(obj1.values)

obj2 = pd.Series([4, 7, -5, 3],index=['d', 'b', 'a', 'c'])
print(obj2)
print('f' in obj2)

# reindex 重建索引
obj3 = pd.Series([4.5, 7.2, -5.3, 3.6], index=['d', 'b', 'a', 'c'])
obj4 = obj3.reindex(['a', 'b', 'c', 'd', 'e'],fill_value=0)
print(obj4)

# 缺失值填充 用前一个非缺失值填充ffill 用后一个非缺失值填bffill
obj5 = pd.Series(['blue', 'purple', 'yellow'], index=[0, 2, 4])
print(obj5)
print(obj5.reindex(range(6), method='ffill'))

# fillna 缺失值填充
obj5 = pd.Series(['blue', 'purple', 'yellow'], index=[0, 2, 4])
obj5.fillna(0,inplace=True)
print(obj5)

# 缺失值删除
obj6 = pd.Series([1,pd.NA,2])
print(obj6)
print(obj6.dropna(how='all'))
```

* Datefram
二维数据 按一定顺序排列的多列数据组成
```py
import pandas as pd
data = {
  'country': ['China', 'USA', 'Japan'], 
  'city': ['Beijing', 'New York', 'Tokyo'],
  'population': [1382, 328, 126]
}

frame1 = pd.DataFrame(data)
print(frame1)
 
# 设置根据那几列排序
frame2 = pd.DataFrame(data,columns=['city', 'country', 'population'])
print(frame2)
print(frame1['city'])

# # 添加新的列
frame1['year'] = [2019, 2019, 2019]
print(frame1)
```

* 层次化索引
```py
import pandas as pd
import numpy as np

data = pd.Series(np.random.randn(10),index=[['a','b','c','d','e','f','g','h','i','j'],[1,2,3,4,5,6,7,8,9,10]])
print(data)
```
### 12.9.3 `Matplotlib`
2D绘图库
* 安装
```zsh
pip install matplotlib
```

```py
import matplotlib.pyplot as plt

# 绘制折现图
plt.plot([1, 2, 5], [4, 8, 10])
plt.show()

# 绘制柱状图
plt.bar([1, 2, 3], [4, 8, 10])
plt.show()

# 绘制饼图
plt.pie([1, 2, 3], labels=['a', 'b', 'c'])
plt.show()

# 绘制散点图
plt.scatter([1, 2, 3], [4, 8, 10])
plt.show()
```

### 12.9.4 `seaborn`
基于 `Matplotlib` 的数据可视化库
### 12.9.5 `Tensorflow`
机器学习平台
* 安装
```zsh
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple tensorflow # 使用国内镜像
```
### 12.9.6 网络
#### `requests`(http协议库)
* 安装
```zsh
pip install requests
```
* 使用
```py
import requests

data = {'word': 'hello'}

# get
res1 = requests.get('http://httpbin.org/get',data)
print(res1.text)

#post
res2 = requests.post('http://httpbin.org/post',data)
print(res2.json())
```  

* 爬取图片
```py
import requests
import re
content = requests.get('https://bbs.fengniao.com/forum/forum_101.html',timeout=20).text
urls = re.findall('<img.*?src="(https://.*?\.jpg)"',content)
print(urls)
```

#### `BeautifulSoup`(xml格式处理库)
* 安装
```zsh
pip install bs4
```
* 使用
```py
from bs4 import BeautifulSoup
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

url = 'https://news.sina.com.cn/hotnews/'

res = requests.get(url, headers=headers)
res.encoding = "utf-8"

soup = BeautifulSoup(res.text, "html.parser")
for i in soup.find_all('a'):
    print('地址',i.get('href'),'标题',i.get_text())
```