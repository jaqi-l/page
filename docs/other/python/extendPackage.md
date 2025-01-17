# 12.9 第三方库
## 12.9.1 `Numpy`
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

## 12.9.2 `Pandas`
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
## 12.9.3 `Matplotlib`
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

## 12.9.4 `seaborn`
基于 `Matplotlib` 的数据可视化库
## 12.9.5 `Tensorflow`
机器学习平台
* 安装
```zsh
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple tensorflow # 使用国内镜像
```
## 12.9.6 网络
### `requests`(http协议库)
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

### `BeautifulSoup`(xml格式处理库)
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