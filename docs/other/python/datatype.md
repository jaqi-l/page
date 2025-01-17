# 12.2 数据类型
## 12.2.1 基本数据类型

* 整数`init`: 8
* 浮点数`float`: 8.8
* 字符串`str`: "8"
* 布尔值`bool`: True False

## 12.2.2 序列

指它的成员是有序排列，可以根据下标访问其成员    
### 序列包括:  

字符串: "abc"    
列表: [0,"abcd"]   
元组: ("abc","def")    

### 序列操作：

```py
str ="abcdefghijk"

print(str[5]) # f 访问 5

print(str[0:5]) # abcde 访问 0 到 5（左闭右开）

print(str[0:]) # abcdefghijk 访问 0 到最后一个

print(str[0:-1]) # abcdefghij 访问 0 到倒数第一个（左闭右开）

print('g' in str) # True g 是否在 str 中

print(str * 3) # abcdefghijkabcdefghijkabcdefghijk 序列重复
```

### 字符串的特殊操作

```py
str ="abcdefghijk"

print(str + 'lmnopqr') # abcdefghijklmnopqr 字符串连接
```

### 列表的特殊操作

```py
arr =['A','B','C','D','E','F','G','H','I','J','K']

arr.append('L') #  列表的连接

print(arr) #  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

arr.remove('L') #  列表的裁剪

print(arr) #  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
```

### 元组中两个数字的比较：

```py
print((1,20)>(2,19)) #  False 相当于 120 > 219
```

::: tip
列表与元组的区别：列表的内容可以变更，元组不可以
:::

## 12.2.3 字典、映射

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

### `keys`方法

```py
dict = {'a':1,'b':2,'c':3}

for key in dict.keys():
    print(key) # a b c 遍历key
```

### `values`方法

```py
dict = {'a':1,'b':2,'c':3}

for key in dict.values():
    print(key) # 1 2 3 遍历value
```
## 12.2.4 类型方法
### `type`
```py
var = '8.8'

print(type(var)) # <class 'float'>
```
