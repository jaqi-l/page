# 12.7 多线程编程
Python3 通过两个标准库 `_thread` 和 `threading` 提供对线程的支持。

`_thread` 提供了低级别的、原始的线程以及一个简单的锁，它相比于 `threading` 模块的功能还是比较有限的


## 12.7.1  `threading`
### `threading.Thread`创建Thread类的实例   
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

###  `threading.current_thread`: 返回当前的线程变量
###  `threading.enumerate`: 返回一个包含正在运行的线程的列表。正在运行指线程启动后、结束前，不包括启动前和终止后的线程
###  `threading.active_count`: 返回正在运行的线程数量，与 len(threading.enumerate()) 有相同的结果

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


## 12.7.2 线程同步

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

## 12.7.3 线程优先级队列
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

## 12.7.4  `_thread`

函数式：调用 `_thread` 模块中的`start_new_thread()` 函数来产生新线程。
### `start_new_thread`

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
