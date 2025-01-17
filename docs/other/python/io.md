# 12.4 文件、输入输出、异常
## 12.4.1 文件的内建函数与方法
### `open`:打开文件

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

### `read`:读取

* 参数
> `size`:读取到文件内指针位置(init类型),`-1`表示读取整个文件(默认) 
```py
file = open('file.text','r')

print(file.read()) # Hello world!1  Hello world!2  Hello world!3 

file.close()
```

### `readline`:读取一行

* 参数
> `size`:读取当前行的字节数(init类型),`-1`表示读取整个行(默认)    
```py
file = open('file.text','r')

print(file.readline()) # Hello world!1 读取完一行后指针会移动到下一行

print(file.readline()) # Hello world!2

file.close()
```

### `readlines`:逐行读取

```py
file = open('file.text','r')

# ['Hello world!1\n', 'Hello world!2\n', 'Hello world!3'] 逐行读取 并返回列表
print(file.readlines()) 

file.seek(0)
            
for line in file.readlines(): # 配合 for 循环，逐行读取
    print(line)
file.close()
```

### `tell`:文件内指针位置
### `seek`:设置文件内指针位置

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

### `write`:写入

* 参数
> `params`:要写入的内容   

* 返回值
> 写入的字符长度    
```py
file = open('file.text', 'a') # ['Hello world!1\n', 'Hello world!2\n', 'Hello world!3\n']

file.write('\nHello world!4') # ['Hello world!1\n', 'Hello world!2\n', 'Hello world!3\n', 'Hello world!4']

file.close()
```

### `writelines`:写入一个序列的字符串

* 参数
> `params`:要写入的内容   
    
```py
file = open('file.text','w')
            
list = ["Hello world!1\n", "Hello world!2\n","Hello world!3\n"]

file.writelines( list )

file.close()
```

### `close`:关闭文件
### `flush`:刷新缓冲区
### `truncate`:截断

* 参数
> `size`:从指针位置开始（默认是文件开头），截取指定长度的内容(init类型)

### `with`处理文件关键字
用于简化资源管理，它提供了一种保证在代码块执行完毕后资源会被正确释放的方法。with 语句创建了一个上下文管理器，该管理器负责在进入和退出代码块时执行相关操作       

```py
with open('file.text', 'w') as file:
    file.write('hello world !')

# 等同于
file = open('file.text', 'w')
file.write('hello world !')
file.close()
```

## 12.4.2 文件的异常检测处理

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