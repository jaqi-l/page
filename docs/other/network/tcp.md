# 3.6 TCP协议
传输控制协议（TCP，Transmission Control Protocol）是一种面向连接的、可靠的、基于字节流的传输层通信协议

## 3.6.1 特点

* 基于链接的：传输数据之前需要建立链接
* 全双工：双向传输（请求响应）
* 字节流：不限制请求大小，打包成报文段，保证有序接受，重复报文自动丢弃
* 流量缓存：解决双方处理能力的不匹配
* 可靠的传输服务：保证可达，丢包时通过重发机制实现可靠
* 拥塞控制：防止网络出现恶性拥塞

## 3.6.2 报文格式
![tcp报文](/tcp报文.png)

1. 端口号：用来标识同一台计算机的不同的应用进程
> * 源端口：源端口和IP地址的作用是标识报文的返回地址

> * 目的端口：端口指明接收方计算机上的应用程序接口

2. 序号：是TCP可靠传输的关键部分。序号是本报文段发送的数据组的第一个字节的序号。在TCP传送的流中，每一个字节一个序号。如：（一个报文段的序号为300，此报文段数据部分共有100字节，则下一个报文段的序号为400。所以序号确保了TCP传输的有序性）

3. 确认号，即ACK，指明下一个期待收到的字节序号，表明该序号之前的所有数据已经正确无误的收到。确认号只有当ACK标志为1时才有效。如：（建立连接时，SYN报文的ACK标志位为0）

4. 数据偏移／首部长度：4bits。由于首部可能含有可选项内容，因此TCP报头的长度是不确定的，报头不包含任何任选字段则长度为20字节，4位首部长度字段所能表示的最大值为1111，转化为10进制为15，15*32/8 = 60，故报头最大长度为60字节。首部长度也叫数据偏移，是因为首部长度实际上指示了数据区在报文段中的起始偏移值

5. 保留：为将来定义新的用途保留，现在一般置0
6. 控制位：URG  ACK  PSH  RST  SYN  FIN，共6个，每一个标志位表示一个控制功能
> * URG：紧急指针标志，为1时表示紧急指针有效，为0则忽略紧急指针
> * ACK：确认序号标志，为1时表示确认号有效，为0表示报文中不含确认信息，忽略确认号字段
> * PSH：push标志，为1表示是带有push标志的数据，指示接收方在接收到该报文段以后，应尽快将这个报文段交给应用程序，而不是在缓冲区排队
> * RST：重置连接标志，用于重置由于主机崩溃或其他原因而出现错误的连接。或者用于拒绝非法的报文段和拒绝连接请求
> * SYN：同步序号，用于建立连接过程，在连接请求中，SYN=1和ACK=0表示该数据段没有使用捎带的确认域，而连接应答捎带一个确认，即SYN=1和ACK=1
> * FIN：finish标志，用于释放连接，为1时表示发送方已经没有数据发送了，即关闭本方数据流

7. 窗口：滑动窗口大小，用来告知发送端接受端的缓存大小，以此控制发送端发送数据的速率，从而达到流量控制。窗口大小时一个16bit字段，因而窗口大小最大为65535

8. 校验和：奇偶校验，此校验和是对整个的 TCP 报文段，包括 TCP 头部和 TCP 数据，以 16 位字进行计算所得。由发送端计算和存储，并由接收端进行验证

9. 紧急指针：只有当 URG 标志置 1 时紧急指针才有效。紧急指针是一个正的偏移量，和顺序号字段中的值相加表示紧急数据最后一个字节的序号。 TCP 的紧急方式是发送端向另一端发送紧急数据的一种方式

10. 选项和填充：最常见的可选字段是最长报文大小，又称为MSS（Maximum Segment Size），每个连接方通常都在通信的第一个报文段（为建立连接而设置SYN标志为1的那个段）中指明这个选项，它表示本端所能接受的最大报文段的长度。选项长度不一定是32位的整数倍，所以要加填充位，即在这个字段中加入额外的零，以保证TCP头是32的整数倍

11. 数据部分： TCP 报文段中的数据部分是可选的。在一个连接建立和一个连接终止时，双方交换的报文段仅有 TCP 首部。如果一方没有数据要发送，也使用没有任何数据的首部来确认收到的数据。在处理超时的许多情况中，也会发送不带任何数据的报文段

## 3.6.3 连接创建与断开的过程
![TCP三握四挥](/TCP三握四挥.png)

* 创建链接：
1. 第一次握手：客户端给服务端发一个`SYN`报文，并指明客户端的初始化序列号`ISN`。此时客户端处于`SYN_SENT`状态
> 首部的同步位SYN=1，初始序号seq=x，SYN=1的报文段不能携带数据，但要消耗掉一个序号

2. 第二次握手：服务器收到客户端的`SYN`报文之后，会以自己的`SYN`报文作为应答，并且也是指定了自己的初始化序列号`ISN(s)`。同时会把客户端的`ISN + 1`作为ACK的值，表示自己已经收到了客户端的`SYN`，此时服务器处于`SYN_RCVD`的状态。
> 在确认报文段中SYN=1，ACK=1，确认号ack=x+1，初始序号seq=y。

3. 第三次握手：客户端收到`SYN`报文之后，会发送一个`ACK`报文，当然，也是一样把服务器的`ISN + 1`作为`ACK`的值，表示已经收到了服务端的`SYN`报文，此时客户端处于`ESTABLISHED`状态。服务器收到`ACK`报文之后，也处于`ESTABLISHED`状态，此时，双方已建立起了连接。
> 确认报文段ACK=1，确认号ack=y+1，序号seq=x+1（初始为seq=x，第二个报文段所以要+1），ACK报文段可以携带数据，不携带数据则不消耗序号

::: tip 
1. 为什么需要三次握手，两次不行吗？
> 如果是用两次握手,会出现因为请求滞留导致，客户端与服务端状态不一致。

2. 什么是半连接队列？

> 服务器第一次收到客户端的`SYN`之后，就会处于`SYN_RCVD`状态，此时双方还没有完全建立其连接，服务器会把此种状态下请求连接放在一个队列里，我们把这种队列称之为半连接队列

3. ISN(Initial Sequence Number)是固定的吗?
> 当一端为建立连接而发送它的`SYN`时，它为连接选择一个初始序号。`ISN`随时间而变化，因此每个连接都将具有不同的`ISN`。`ISN`可以看作是一个32比特的计数器，每4ms加1。这样选择序号的目的在于防止在网络中被延迟的分组在以后又被传送，而导致某个连接的一方对它做错误的解释

4. 三次握手过程中可以携带数据吗？
> 第三次握手的时候，是可以携带数据的。但是，第一次、第二次握手不可以携带数据

5. SYN攻击是什么？
> 服务器端的资源分配是在二次握手时分配的，而客户端的资源是在完成三次握手时分配的，所以服务器容易受到SYN洪泛攻击。`SYN`攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送`SYN`包，Server则回复确认包，并等待Client确认，由于源地址不存在，因此Server需要不断重发直至超时，这些伪造的`SYN`包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络拥塞甚至系统瘫痪。`SYN`攻击是一种典型的DoS/DDoS 攻击
:::

* 关闭链接：
1. 第一次挥手：客户端发送一个`FIN`报文，报文中会指定一个序列号。此时客户端处于`FIN_WAIT1`状态
> 即发出连接释放报文段（FIN=1，序号seq=u），并停止再发送数据，主动关闭TCP连接，进入FIN_WAIT1（终止等待1）状态，等待服务端的确认

2. 第二次挥手：服务端收到`FIN`之后，会发送`ACK`报文，且把客户端的序列号值`u + 1`作为`ACK`报文的序列号值，表明已经收到客户端的报文了，此时服务端处于`CLOSE_WAIT`状态
> 即服务端收到连接释放报文段后即发出确认报文段（ACK=1，确认号ack=u+1，序号seq=v），服务端进入CLOSE_WAIT（关闭等待）状态，此时的TCP处于半关闭状态，客户端到服务端的连接释放。客户端收到服务端的确认后，进入FIN_WAIT2（终止等待2）状态，等待服务端发出的连接释放报文段

3. 第三次挥手：如果服务端也想断开连接了，和客户端的第一次挥手一样，发给`FIN`报文，且指定一个序列号。此时服务端处于`LAST_ACK`的状态

> 即服务端没有要向客户端发出的数据，服务端发出连接释放报文段（FIN=1，ACK=1，序号seq=w，确认号ack=u+1），服务端进入LAST_ACK（最后确认）状态，等待客户端的确认

4. 第四次挥手：客户端收到`FIN`之后，一样发送一个`ACK`报文作为应答，且把服务端的序列号值`u + 1`作为自己`ACK`报文的序列号值，此时客户端处于`TIME_WAIT`状态。需要过一阵子以确保服务端收到自己的`ACK`报文之后才会进入`CLOSED`状态，服务端收到`ACK`报文之后，就处于关闭连接了，处于`CLOSED`状态。
> 即客户端收到服务端的连接释放报文段后，对此发出确认报文段（ACK=1，seq=u+1，ack=w+1），客户端进入TIME_WAIT（时间等待）状态。此时TCP未释放掉，需要经过时间等待计时器设置的时间2MSL后，客户端才进入CLOSED状态

::: tip 
1. 挥手为什么需要四次？
> 当服务端收到`FIN`报文时，很可能还有数据未发完，所以不能立即关闭连接，只能先回复一个报文，告诉客户端,我收到了`FIN`

2. MSL、等待2MSL的意义？
> 报文段最大生存时间MSL（Maximum Segment Lifetime）
> 保证客户端发送的最后一个ACK报文段能够到达服务端、防止“已失效的连接请求报文段”出现在本连接中

3. ISN(Initial Sequence Number)是固定的吗?
> 当一端为建立连接而发送它的SYN时，它为连接选择一个初始序号。ISN随时间而变化，因此每个连接都将具有不同的ISN。ISN可以看作是一个32比特的计数器，每4ms加1 。这样选择序号的目的在于防止在网络中被延迟的分组在以后又被传送，而导致某个连接的一方对它做错误的解释

4. 三次握手过程中可以携带数据吗？
> 第三次握手的时候，是可以携带数据的。但是，第一次、第二次握手不可以携带数据

5. SYN攻击是什么？
> 服务器端的资源分配是在二次握手时分配的，而客户端的资源是在完成三次握手时分配的，所以服务器容易受到SYN洪泛攻击。SYN攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送SYN包，Server则回复确认包，并等待Client确认，由于源地址不存在，因此Server需要不断重发直至超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络拥塞甚至系统瘫痪。SYN 攻击是一种典型的 DoS/DDoS 攻击

5. SYN攻击是什么？
> 服务器端的资源分配是在二次握手时分配的，而客户端的资源是在完成三次握手时分配的，所以服务器容易受到SYN洪泛攻击。SYN攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送SYN包，Server则回复确认包，并等待Client确认，由于源地址不存在，因此Server需要不断重发直至超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络拥塞甚至系统瘫痪。SYN 攻击是一种典型的 DoS/DDoS 攻击
:::
