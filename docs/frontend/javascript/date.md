## 3.7.1基本概念
1. Date是JavaScript的内置对象，系统在Date对象中封装了与日期和时间相关的属性和方法。

2. Date使用UTC1970年1月1日0时开始经过的毫秒数来存储时间。

3. GMT 格林尼治时间

4. UTC 国际协调时间

## 3.7.2Date对象的创建：
```js
var date= new Date(); //无参数的情况下返回值为当前时间。
var date = new Date(milliseconds);
var date = new Date(dateString);
var date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
```
::: warning
不同浏览器显示的时间格式会有细微差异
:::
## 3.7.3Date对象的方法：
* `Date.now`返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数。
```js
var nowTime = Date.now();
```
* `Date.parse`返回自1970年1月1日 00:00:00 UTC到指定日期（字符串）的毫秒数。
支持的时间格式如下：`1/24/2016`/`January 24,2016`/`Sun Jan 24 2016 10:10:10 GMT+0800`
```js
var time = Date.parse("1/24/2016")
```
* `Date.UTC`返回自1970年1月1日 00:00:00 UTC到指定构造函数的毫秒数。
Date.UTC(year,month,date,hrs,min,sec,ms)        
> `year`1900 年后的某一年份。     
> `month`0 到 11 之间的一个整数，表示月份。       
> `date`1 到 31 之间的一个整数，表示某月当中的第几天。        
> `hrs`0 到 23 之间的一个整数，表示小时。     
> `min`0 到 59 之间的一个整数，表示分钟。     
> `sec`0 到 59 之间的一个整数，表示秒。       
> `ms`0 到 999 之间的一个整数，表示毫秒。
```js
var time = Date.UTC(2012,02,30)
```
* `getFullYear`从 Date 对象以四位数字返回年份。
* `getMonth`从 Date 对象返回月份 (0 ~ 11)。
* `getDate`从 Date 对象返回一个月中的某一天 (1 ~ 31)。
* `getDay`从 Date 对象返回一周中的某一天 (0 ~ 6)。
* `getHours`返回 Date 对象的小时 (0 ~ 23)。
* `getMinutes`返回 Date 对象的分钟 (0 ~ 59)。
* `getSeconds`返回 Date 对象的秒数 (0 ~ 59)。
* `getMilliseconds`返回 Date 对象的毫秒(0 ~ 999)。
* `getTime`返回 1970 年 1 月 1 日至今的毫秒数。 
* `getTimezoneOffset`返回本地时间与格林威治标准时间 (GMT) 的分钟差
* `getUTCDate`根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。 
* `getUTCDay`根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。
* `getUTCFullYear`根据世界时从 Date 对象返回四位数的年份。
* `getUTCHours`根据世界时返回 Date 对象的小时 (0 ~ 23)。
* `getUTCMilliseconds`根据世界时返回 Date 对象的毫秒(0 ~ 999)。
* `getUTCMinutes`根据世界时返回 Date 对象的分钟 (0 ~ 59)。
* `getUTCMonth`根据世界时从 Date 对象返回月份 (0 ~ 11)。
* `getUTCSeconds`根据世界时返回 Date 对象的秒钟 (0 ~ 59)。
* `setDate`设置 Date 对象中月的某一天 (1 ~ 31)。
* `setFullYear`设置 Date 对象中的年份（四位数字）。
* `setHours`设置 Date 对象中的小时 (0 ~ 23)。
* `setMilliseconds`设置 Date 对象中的毫秒 (0 ~ 999)。
* `setMinutes`设置 Date 对象中的分钟 (0 ~ 59)。
* `setMonth`设置 Date 对象中月份 (0 ~ 11)。
* `setSeconds`设置 Date 对象中的秒钟 (0 ~ 59)。
* `setTime`方法以毫秒设置 Date 对象。
* `setUTCDate`根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。
* `setUTCFullYear`根据世界时设置 Date 对象中的年份（四位数字）。
* `setUTCHours`根据世界时设置 Date 对象中的小时 (0 ~ 23)。
* `setUTCMilliseconds`根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。
* `setUTCMinutes`根据世界时设置 Date 对象中的分钟 (0 ~ 59)。
* `setUTCMonth`根据世界时设置 Date 对象中的月份 (0 ~ 11)。
* `setUTCSeconds`方法用于根据世界时 (UTC) 设置指定时间的秒字段。
* `toDateString`把 Date 对象的日期部分转换为字符串。
* `toISOString`使用 ISO 标准返回字符串的日期格式。
* `toJSON`以JSON 数据格式返回日期字符串。
* `toUTCString`根据世界时，把 Date 对象转换为字符串。

## 3.7.4Date对象的相关字符串方法：
* `toSting`把Date实例的字符串表示
* `toDateSting`把Date的日期部分字符串表示
* `toTimeSting`把Date的时间部分字符串表示
* `toLocaleString`根据本地时区把 Date 对象转换为字符串
* `toLocaleDateString`根据本地时区把，把 Date 对象的日期部分转换为字符串。
* `toLocaleTimeString`根据本地时区把，把 Date 对象的时间部分转换为字符串。
* `valueOf`转换为毫秒数

::: warning
* 格式不正确会返回NaN
* 注意UTC时间和时区的换算，如东八区和标准时间是八小时时差
::: 