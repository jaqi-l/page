# 12.8 标准库
[标准库官方文档](https://docs.python.org/zh-cn/3/library/index.html)

## 12.8.1 正则表达式库`re`
```py
import re
```

`re`模块由两个对象组成：`RegexObject`(模式对象)和`MatchObject`(匹配对象，匹配结果)
      
### 定义
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


### 正则的组成

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

### 修饰符
* `re.I`:忽略大小写
* `re.L`:根据本地设置而更改`\w`,`\W`,`\b`,`\B`,`\s`,`\S`的匹配内容
* `re.M`:多行匹配模式，影响 `^` 和 `$`
* `re.S`、`re.DOTALL`:使`.`元字符也能匹配换行符
* `re.U`:匹配Unicode字符
* `re.X`:忽略pattern中的空格,并且可以使用“#”

### `RegexObject`(模式对象)

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
### `MatchObject`(匹配对象，匹配结果)
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
## 12.8.2 日期时间库


### `time` 
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
### `datetime`
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

### `calendar`

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

### 组成
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

## 12.8.3 数学

### `math`
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

### `random`
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

## 12.8.4 文件夹操作

### `access`

* 方法
1. `os.access(path, mode)`：检测是否有访问
> `path`：路径      
> `mode`：检测模式，可选值有`os.F_OK`是否存在、`os.R_OK`否可读、`os.W_OK`是否可写、`os.X_OK`否可执行            

### `chdir`

* 方法
1. `os.chdir(path)`：改变当前工作目录
> `path`：路径

### `chmod`

* 方法
1. `os.chmod(path, mode)`：改变当前工作目录
> `path`：路径      
> `mode`：权限

### `chown`

* 方法
1. `os.chown(path, mode)`：更改文件所有者
> `path`：路径      
> `uid`：所属用户 ID        
> `gid`：所属用户组 ID

### `path`

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

### `replace` 
`os.replace(src, dst)`：重命名文件或目录
> `src`：源文件或目录       
> `dst`：重命名后的文件或目录，如果已存在，会直接替换

### `symlink`
`os.symlink(src, dst, target_is_directory)`创建软链接
> `src`：要创建软链接的目标文件或目录的路径     
> `dst`：软链接的路径和名称     
> `target_is_directory`：指定 src 是否是一个目录。如果为True，dst 将被创建为指向目录的软链接

### `readlink`
`os.readlink(path)`返回软链接所指向的文件
> `path`：文件路径

### `statvfs`
`os.statvfs(path)`文件的文件系统的信息
> `path`：文件路径

### `rename`
`os.rename(old, new)`递归重命名目录或文件
> `old`：要修改的目录名     
> `new`：修改后的目录名

### `renames`
`os.renames(old, new)`递归重命名目录或文件
> `old`：要重命名的目录     
> `new`：文件或目录的新名字，可以是包含在目录中的文件，或者完整的目录树

### `rmdir`
`os.rmdir(path)`删除指定路径的非空目录      
> `path`：文件路径

### `remove`
`os.remove(path)`删除指定路径的文件
> `path`：文件路径

### `removedirs`
`os.removedirs(path)`递归删除非空目录       
> `path`要移除的目录路径

## 12.8.4 网络库`urllib`(http协议库)
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