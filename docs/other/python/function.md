# 12.5 函数、模块
## 12.5.1 基本结构

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

## 12.5.2 参数

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

## 12.5.3 作用域

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

## 12.5.4 迭代器
### `iter`、`next`
```py
list = [1,2,3]
it = iter(list)
print(next(it)) # 1
print(next(it)) # 2
print(next(it)) # 3
```
### `range`
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

## 12.5.5 生成器 
### `yield`
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

## 12.5.6 Lambda表达式

```py
def add(x,y):
     return x+y
    
add(3,2)

# Lambda表达式 [参数列表:表达式,实参]
add = lambda x,y : x+y

print(add(3,2))
``` 

## 12.5.7 内置函数
### `filter`

* 参数：
> `function`:判断函数   
> `iterable`:可迭代对象
   
```py
a = [1,2,3,4,5,6,7]

print(list(filter(lambda x:x>2,a)))
# [3, 4, 5, 6, 7]
```
### `map`

* 参数：
> `function`:判断函数   
> `iterable`: 一个或多个可迭代对象

```py
a = [1,2,3]
b = [4,5,6]

print(list(map(lambda x,y:x+y,a,b)))
# [5, 7, 9]
```
### `reduce`

* 参数：
> `function`:判断函数   
> `iterable`: 可迭代对象
> `initializer`: 初始参数

```py
from functools import reduce

print(reduce(lambda x,y:x+y,[2,3,4],1))
# 10 ((1+2)+3)+4
```

### `zip`

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
## 12.5.8 闭包

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

## 12.5.9 装饰器
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
## 12.5.10 上下文管理器
```py
with open("file.txt") as f:
    for line in f:
        line = line.strip()
        print(line)
```

## 12.5.11 模块
### 几种导入方式
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
### 自定义模块
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
