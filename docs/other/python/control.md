# 12.3 条件和循环
## 12.3.1 `if`选择语句   

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

## 12.3.2 `for`循环语句

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

## 12.3.3 `while`循环语句

```py
i = 0
while i < 10:
    print(i) # 0 ~ 9
    i+=1
```

## 12.3.4 推导式

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

## 12.3.5 跳出

`break`用来终止循环，让循环不再往下继续，可以用在循环或`switch`中,不能用在`for/each`中    

`continue`用来跳过当前循环，继续往下循环，只能用在循环中    

`return`跳出当前函数，只能用在函数体内    