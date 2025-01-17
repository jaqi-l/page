# 3.4 HTTP/2协议
HRRP2(RFC7540,2015.5)
未改变HTTP/1.1的语义
基于TCP，仅修改应用层
在应用层上修改，基于并充分挖掘TCP协议性能
客户端向server发送request的基本模型不变

* 特性：
> 传输数据量大幅减少
>> 以二进制方式传输   
>> 表头压缩   

> 多路复用及相关功能
>> 消息优先级   

> 服务器消息推送    
>> 并行推送   

* 核心概念：
>> 连接Connection：一个TCP连接包含多个Stream    
>> 数据流(Stream)：一个双向通讯数据流，包含一条或多条Message    
>> 消息(Message)：对应THHP/1中的请求或响应，包含一条或多条Frame   
>> 数据帧(Frame)：最小单位，以二进制压缩格式存放HTTP/1中的内容    
::: tip 帧(Frame)、消息(Message)、流(Stream)的关系

::: 

