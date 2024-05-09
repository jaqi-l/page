## 11.1 设计模式
设计模式：在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案

<!-- 详见：[JavaScript 设计模式与开发实践](/jaqi.note/JavaScript设计模式.pdf) -->

### 11.1.1 单列模式
单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点
```js
var namespace1 = { 
  a: function(){ 
    alert (1); 
  }, 
  b: function(){ 
    alert (2); 
  } 
};
```
### 11.1.2 策略模式
策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换

```js
var strategies = {
  "S": function( salary ){ 
    return salary * 4; 
  }, 
  "A": function( salary ){ 
    return salary * 3; 
  }, 
  "B": function( salary ){ 
  r eturn salary * 2;
  } 
}; 

var calculateBonus = function( level, salary ){ 
  return strategies[ level ]( salary ); 
}; 

console.log( calculateBonus( 'S', 20000 ) ); // 输出：80000 
console.log( calculateBonus( 'A', 10000 ) ); // 输出：30000
```
* 通过高阶函数实现：
```js
var S = function( salary ){ 
  return salary * 4; 
}; 
var A = function( salary ){ 
  return salary * 3; 
}; 
var B = function( salary ){ 
r eturn salary * 2; 
}; 

var calculateBonus = function( func, salary ){ 
  return func( salary ); 
};

console.log(calculateBonus( S, 20000 ) ); // 输出：80000 
console.log(calculateBonus( A, 10000 ) ); // 输出：30000
```
### 11.1.3 代理模式
代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问

1. 虚拟代理：通过虚拟代理实现图片预加载
```js
// 虚拟代理实现图片预加载 图片没加载之前通过本地的图片站位
var myImage = (function(){ 
  // 1. myImage函数自执行：创建dom元素
  var imgNode = document.createElement( 'img' ); 
  document.body.appendChild( imgNode ); 
  return { 
    setSrc: function( src ){ 
      // 5./7.将传来的src放入dom
      imgNode.src = src; 
    } 
  } 
})(); 

var proxyImage = (function(){ 
  // 2.proxyImage函数自执行：创建图片对象，绑定方法
  var img = new Image; 
  img.onload = function(){ 
    // 6.监听到图片加载完成，调用setSrc方法，将设置的图片传给myImage方法
    myImage.setSrc( this.src ); 
  } 
  return { 
    setSrc: function( src ){ 
      // 3.用户调用setSrc方法，将默认图片传给myImage方法
      myImage.setSrc( 'file://Users/svenzeng/Desktop/loading.gif' ); 
      // 4. img形成闭包，给img设置src
      img.src = src; 
    } 
  } 
})(); 

proxyImage.setSrc( 'http://imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );
```


2. 缓存代理：通过缓存代理合并http请求,将一段时间内的连续请求合并
```js
var synchronousFile = function( id ){ 
  console.log( '开始上传文件，id 为: ' + id ); 
}; 

var proxySynchronousFile = (function(){ 
  // 1.初始化
  var cache = [], // 保存一段时间内需要同步的 ID 
      timer; // 定时器
  return function( id ){ 
    // 3. 调用proxySynchronousFile的方法 将id插入待处理的集合
    cache.push( id ); 
    if ( timer ){ // 保证不会覆盖已经启动的定时器
      return; 
    } 
    timer = setTimeout(function(){ 
      synchronousFile( cache.join( ',' ) ); // 2 秒后向上传方法提交ID的合集
      clearTimeout( timer ); // 清空定时器
      timer = null; 
      cache.length = 0; // 清空 ID 集合
    }, 2000 ); 
  } 
})(); 

// 2.连续快速调用proxySynchronousFile方法
var checkbox = document.getElementsByTagName( 'input' ); 

for ( var i = 0, c; c = checkbox[ i++ ]; ){ 
  c.onclick = function(){ 
    if ( this.checked === true ){ 
     proxySynchronousFile( this.id ); 
    } 
  } 
};
```

3. 保护代理：用于对象应该有不同访问权限的情况
4. 防火墙代理理：控制网络资源的访问
5. 远程代理
6. 智能引用代理
7. 写时复制代理
### 11.1.4 迭代器模式
迭代器模式：是指定义一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示
（迭代器模式无非就是循环访问聚合对象中的各个元素）

1. 内部迭代器
```js
var each = function( ary, callback ){ 
  for ( var i = 0, l = ary.length; i < l; i++ ){ 
    callback.call( ary[i], i, ary[ i ] ); // 把下标和元素当作参数传给 callback 函数
  } 
}; 
each( [ 1, 2, 3 ], function( i, n ){ 
  alert ( [ i, n ] ); 
});
```

2. 外部迭代器
```js
var Iterator = function( obj ){ 
  var current = 0; 

  var next = function(){ 
    current += 1; 
  }; 

  var isDone = function(){ 
    return current >= obj.length; 
  }; 

  var getCurrItem = function(){ 
    return obj[ current ]; 
  }; 

  return { 
    next: next, 
    isDone: isDone, 
    getCurrItem: getCurrItem 
  } 
};

var iterator1 = Iterator( [ 1, 2, 3 ] );

iterator1.next() // 迭代下一个元素
iterator1.getCurrItem() // 当前元素
iterator1.isDone() // 迭代是否结束

```
### 11.1.5 发布-订阅模式（观察者模式）
发布-订阅模式：定义一个对象，当这个对象的状态发生改变时，所有依赖于它的对象都将得到通知

发布-订阅模式是最常用的模式之一，无论是`MVC`还是`MVVM`，都少不了发布—订阅模式的参与，而且`JavaScript`本身也是一门基于事件驱动的语言

* 定义一个发布-订阅模式模型
```js
var event = { 
  clientList: [],  // 所有订阅的客户
  // 订阅
  listen: function( name,key, fn ){   // 登记订阅的客户姓名、通讯方式fn(回调函数)和所订阅信息key
    if ( !this.clientList[ key ] ){ 
      this.clientList[ key ] = []; 
    } 
    this.clientList[ key ].push( {name,fn} ); // 根据订阅的消息将客户分类
  }, 
  // 取消订阅
  remove: function( name,key, fn ){   // 取消用户订阅
    var list = this.clientList[ key ]; 
    if ( !fns ){ // 如果消息key没有被人订阅过 直接跳过
      return false; 
    } 

    if ( !name ){ // 如果没有告诉具体的人，则删除消息key下的所有订阅人
      list && ( list.length = 0 ); 
    }else{ 
      for ( var l = list.length - 1; l >=0; l-- ){ // 反向遍历订阅的回调函数列表
        if ( list[ l ].name === name ){ 
          list.splice( l, 1 ); // 删除订阅记录
          fn.apply( this, ['取消成功'] ); // 通过fn给客户发送取消订阅成功的消息
        } 
      } 
    }
  }, 
  // 发布消息
  trigger: function(){  // 为订阅的客户发送消息
    var [key,msg] = arguments
    
    list = this.clientList[ key ];  // 取出不同消息的订阅客户

    if ( !list || list.length === 0 ){ // 如果该消息没有客户订阅 则不发布
      return false; 
    } 

    for( var i = 0, item; item = list[ i++ ]; ){ 
      item.fn.apply( this, arguments ); // 通过fn给客户发送消息
    } 
  } 
};

// 为发布-订阅模式模型的使用者 安装注册相关方法
var installEvent = function( obj ){ 
 for ( var i in event ){ 
 obj[ i ] = event[ i ]; 
 } 
}; 

```

* 使用发布-订阅模式模型 订阅、取消订阅和发送消息
```js
// 定义一个使用者 新闻中心
var NewsCenter = {}; 
// 安装发布订阅模型
installEvent( NewsCenter );

// 客户在新闻中心订阅消息
NewsCenter.listen( '小明','科技新闻', function( msg ){ // 小明
 console.log( msg[0] + ':' + msg[1] ); // 科技新闻=十条
}); 


NewsCenter.listen('小王', '娱乐新闻', function( msg ){ // 小王
 console.log( msg[0] + ':' + msg[1] ); // 科技新闻=二十条
}); 


NewsCenter.listen('小张', '体育新闻', function( msg ){ // 小张
 console.log( msg[0] + ':' + msg[1] );// 没有该消息 不会发布
}); 

// 取消订阅
NewsCenter.remove('小王', '娱乐新闻', function( msg ){ // 小王取消订阅
 console.log(msg);  // 科技新闻=十条
});

// 新闻中心发布消息
NewsCenter.trigger( '科技新闻', '十条' ); 
NewsCenter.trigger( '娱乐新闻', '二十条' ); 

```

::: tip
* 推模型与拉模型：    
推模型：发布的状态和发布的内容同时告诉订阅者    
拉模型：只将发布的状态通知给订阅者。发布的内容需要订阅者使用其他方法再获取    
:::
### 11.1.6 命令模式
命令模式：命令是对命令的封装，每一个命令都是一个操作，请求方发出请求，接收方接收请求，并执行操作
```html
<body>
  <div id="ball" style="position:absolute;background:#000;width:50px;height:50px"></div>
  输入小球移动后的位置：<input id="pos"/>
  <button id="moveBtn">开始移动</button>
  <button id="cancelBtn">回到原点</button>
</body> 
```
```js
// 操作小球往复运动
var ball = document.getElementById( 'ball' );// 要运动的小球元素
var pos = document.getElementById( 'pos' ); // 滚动的距离
var moveBtn = document.getElementById( 'moveBtn' ); // 开始运动
var cancelBtn = document.getElementById( 'cancelBtn' ); // 回到原点

var MoveCommand = function( receiver, pos ){ 
  this.receiver = receiver; 
  this.pos = pos; 
  this.oldPos = null; 
}; 

MoveCommand.prototype.execute = function(){ 
  // 向左运动pos的长度
  this.receiver.start( 'left', this.pos, 1000, 'strongEaseOut' ); 
  // 记录小球开始移动前的位置
  this.oldPos = this.receiver.dom.getBoundingClientRect()[ this.receiver.propertyName ]; 
}; 
MoveCommand.prototype.undo = function(){ 
  // 回到小球移动前记录的位置
  this.receiver.start( 'left', this.oldPos, 1000, 'strongEaseOut' ); 
}; 

var moveCommand;

moveBtn.onclick = function(){ 
  var animate = new Animate( ball ); 
  moveCommand = new MoveCommand( animate, pos.value ); 
  moveCommand.execute(); 
}; 

cancelBtn.onclick = function(){ 
  moveCommand.undo(); // 撤销命令
};
```
### 11.1.7 组合模式
组合模式：将对象组合成树形结构以表示“部分-整体”的层次结构，组合模式使得用户对单个对象和组合对象的使用具有一致性
```js
// 扫描文件夹
/******************************* Folder ******************************/ 
var Folder = function( name ){ 
  this.name = name; 
  this.files = []; 
}; 
Folder.prototype.add = function( file ){ 
  this.files.push( file ); 
}; 
Folder.prototype.scan = function(){ 
  console.log( '开始扫描文件夹: ' + this.name ); 
  for ( var i = 0, file, files = this.files; file = files[ i++ ]; ){ 
    file.scan(); 
  } 
};

/******************************* File ******************************/ 
var File = function( name ){ 
 this.name = name; 
}; 
File.prototype.add = function(){ 
  throw new Error( '文件下面不能再添加文件' ); 
};
File.prototype.scan = function(){ 
  console.log( '开始扫描文件: ' + this.name ); 
};

var folder = new Folder( '学习资料' ); 
var folder1 = new Folder( 'JavaScript' ); 
var folder2 = new Folder ( 'jQuery' ); 

var file1 = new File( 'JavaScript 设计模式与开发实践' ); 
var file2 = new File( '精通 jQuery' ); 
var file3 = new File( '重构与模式' ) 

folder1.add( file1 ); 
folder2.add( file2 ); 

folder.add( folder1 ); 
folder.add( folder2 ); 
folder.add( file3 );
```
### 11.1.8 模板方法模式
模板方法模式：模板方法模式是一种只需使用继承就可以实现的非常简单的模式
```js
var Coffee = function(){};

Coffee.prototype.boilWater = function(){
  console.log( '把水煮沸' );
};

Coffee.prototype.brewCoffeeGriends = function(){
  console.log( '用沸水冲泡咖啡' );
};

Coffee.prototype.pourInCup = function(){
  console.log( '把咖啡倒进杯子' );
};

Coffee.prototype.addSugarAndMilk = function(){
  console.log( '加糖和牛奶' );
};

Coffee.prototype.init = function(){
  this.boilWater();
  this.brewCoffeeGriends();
  this.pourInCup();
  this.addSugarAndMilk();
};

var coffee = new Coffee();

coffee.init(); 
```
### 11.1.9 享元模式
享元模式：用于减少创建对象的数量，以减少内存占用和提高性能。这种类型的设计模式属于结构型模式，它提供了减少对象数量从而改善应用所需的对象结构的方式    

* 优点：大大减少对象的创建，降低系统的内存，使效率提高    
* 缺点：提高了系统的复杂度，需要分离出外部状态和内部状态，而且外部状态具有固有化的性质，不应该随着内部状态的变化而变化，否则会造成系统的混乱    
* 使用场景：
> 1. 内部状态存储于对象内部    
> 2. 内部状态可以被一些对象共享    
> 3. 内部状态独立于具体的场景，通常不会改变    
> 4. 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享      
```js
// 有50种男式内衣和50种女士内衣，需要50个男模特50个女模特分别传上衣服牌子
var Model = function( sex, underwear){
  this.sex = sex;
  this.underwear= underwear;
};

Model.prototype.takePhoto = function(){
  console.log( 'sex= ' + this.sex + ' underwear=' + this.underwear);
};

for ( var i = 1; i <= 50; i++ ){
  var maleModel = new Model( 'male', 'underwear' + i );
  maleModel.takePhoto();
};

for ( var j = 1; j <= 50; j++ ){ 
  var femaleModel= new Model( 'female', 'underwear' + j );
  femaleModel.takePhoto();
}; 

/* 要得到一张照片，每次都需要传入sex和underwear参数，
如上所述，现在一共有50种男内衣和50种女内衣，所以一共会产生100个对象*/

```
* 通过享元模式简化
```js
var Model = function( sex ){
  this.sex = sex;
};

Model.prototype.takePhoto = function(){
  console.log( 'sex= ' + this.sex + ' underwear=' + this.underwear);
};

// 分别创建一个男模特对象和一个女模特对象：
var maleModel = new Model( 'male' ),
femaleModel = new Model( 'female' );

// 给男模特依次穿上所有的男装，并进行拍照：
for ( var i = 1; i <= 50; i++ ){
  maleModel.underwear = 'underwear' + i;
  maleModel.takePhoto();
};

// 同样，给女模特依次穿上所有的女装，并进行拍照：
for ( var j = 1; j <= 50; j++ ){
  femaleModel.underwear = 'underwear' + j;
  femaleModel.takePhoto();
};
/* 性别是内部状态，内衣是外部状态，通过区分这两种状态，大大减少了系统中的对象数量
可以看到，改进之后的代码，只需要两个对象便完成了同样的功能 */
``` 
### 11.1.10 职责链模式
职责链模式：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止，请求发送者只需要知道链中的第一个节点，从而弱化了发送者和一组接收者之间的强联系。 

```js
/* 
orderType：订单类型，1的时候是500元定金用户，2是200元定金用户，3是普通购买用户
pay：用户是否已经支付定金，定金用户如果一直没有支付定金，只能降级进入普通购买模式
stock：表示普通用户可购买的手机库存，定金的用户不受此限制
*/
var order = function( orderType, pay, stock ){
  if ( orderType === 1 ){ // 500 元定金购买模式
    if ( pay === true ){ // 已支付定金
      console.log( '500 元定金预购, 得到 100 优惠券' );
    }else{ // 未支付定金，降级到普通购买模式
      if ( stock > 0 ){ // 用于普通购买的手机还有库存
        console.log( '普通购买, 无优惠券' ); 
      }else{
        console.log( '手机库存不足' );
      }
    }
  }else if ( orderType === 2 ){ // 200 元定金购买模式
    if ( pay === true ){
      console.log( '200 元定金预购, 得到 50 优惠券' );
    }else{
      if ( stock > 0 ){
        console.log( '普通购买, 无优惠券' );
      }else{
        console.log( '手机库存不足' );
      }
    }
  }else if ( orderType === 3 ){
    if ( stock > 0 ){
      console.log( '普通购买, 无优惠券' );
    }else{
      console.log( '手机库存不足' );
    }
  }
};

order( 1 , true, 500); // 输出： 500 元定金预购, 得到 100 优惠券
```
* 通过职责链模式重构
```js
var order500 = function( orderType, pay, stock ){
  if ( orderType === 1 && pay === true ){
    console.log( '500 元定金预购，得到 100 优惠券' );
  }else{
    return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};
var order200 = function( orderType, pay, stock ){
  if ( orderType === 2 && pay === true ){
    console.log( '200 元定金预购，得到 50 优惠券' );
  }else{
    return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};
var orderNormal = function( orderType, pay, stock ){
  if ( stock > 0 ){
    console.log( '普通购买，无优惠券' );
  }else{
    console.log( '手机库存不足' );
  }
}; 

// 把函数包装进职责链节点
var Chain = function( fn ){
  this.fn = fn;
  this.successor = null;
};

// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
Chain.prototype.setNextSuccessor = function( successor ){
  return this.successor = successor;
};

// Chain.prototype.passRequest 传递请求给某个节点
Chain.prototype.passRequest = function(){ 
  var ret = this.fn.apply( this, arguments );
  if ( ret === 'nextSuccessor' ){
    return this.successor && this.successor.passRequest.apply( this.successor, arguments );
  }
  return ret;
}; 

// 把3个订单函数分别包装成职责链的节点
var chainOrder500 = new Chain( order500 );
var chainOrder200 = new Chain( order200 );
var chainOrderNormal = new Chain( orderNormal ); 

// 指定节点在职责链中的顺序
chainOrder500.setNextSuccessor( chainOrder200 );
chainOrder200.setNextSuccessor( chainOrderNormal ); 

// 把请求传递给第一个节点
chainOrder500.passRequest( 1, true, 500 ); // 输出：500 元定金预购，得到 100 优惠券
chainOrder500.passRequest( 2, true, 500 ); // 输出：200 元定金预购，得到 50 优惠券
chainOrder500.passRequest( 3, true, 500 ); // 输出：普通购买，无优惠券
chainOrder500.passRequest( 1, false, 0 ); // 输出：手机库存不足
```
### 11.1.11 中介者模式
中介者模式：就是解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的相关对象都通过中介者对象来通信，而不是互相引用，所以当一个对象发生改变时，只需要通知中介者对象即可。中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互。中介者模式使网状的多对多关系变成了相对简单的一对多关系（迪米特法则）
![Intermediary](/Intermediary.png)

缺点：因为对象之间交互的复杂性，转移成了中介者对象的复杂性，使得中介者对象经常是巨大的。中介者对象自身往往就是一个难以维护的对象
```js
/* 
  模拟两个队伍的游戏对战，一方角色全部死亡则另一方胜利
*/
// 玩家的构造函数
function Player( name, teamColor ){
  this.name = name; // 角色名字
  this.teamColor = teamColor; // 队伍颜色
  this.state = 'alive'; // 玩家生存状态
};

// 队伍胜利方法
Player.prototype.win = function(){
  console.log( this.name + ' won ' );
};

// 队伍失败方法
Player.prototype.lose = function(){
  console.log( this.name +' lost' );
};

// 玩家死亡
Player.prototype.die = function(){
  this.state = 'dead';
  playerDirector.reciveMessage( 'playerDead', this ); // 给中介者发送消息，玩家死亡
};

// 玩家离开
Player.prototype.remove = function(){
  playerDirector.reciveMessage( 'removePlayer', this ); // 给中介者发送消息，移除一个玩家
}; 

// 玩家切换队伍
Player.prototype.changeTeam = function( color ){
  playerDirector.reciveMessage( 'changeTeam', this, color ); // 给中介者发送消息，玩家换队
}; 

// 创建玩家对象
var playerFactory = function( name, teamColor ){
  var newPlayer = new Player( name, teamColor ); // 创造一个新的玩家对象
  playerDirector.reciveMessage( 'addPlayer', newPlayer ); // 给中介者发送消息，新增玩家
  return newPlayer;
}; 

/*  中介对象
  在playerDirector中开放一些接收消息的接口，各player可以直接调用该接口来给playerDirector发送消息，
  player只需传递一个参数给playerDirector，这个参数的目的是使playerDirector可以识别发送者。
  同样，playerDirector接收到消息之后会将处理结果反馈给其他player
*/
var playerDirector= ( function(){
  var players = {}, // 保存所有玩家
  operations = {}; // 中介者可以执行的操作

  // 新增一个玩家
  operations.addPlayer = function( player ){
    var teamColor = player.teamColor; // 玩家的队伍颜色
    players[ teamColor ] = players[ teamColor ] || []; // 如果该颜色的玩家还没有成立队伍，则新成立一个队伍
    players[ teamColor ].push( player ); // 添加玩家进队伍
  };

  // 移除一个玩家
  operations.removePlayer = function( player ){
    var teamColor = player.teamColor, // 玩家的队伍颜色
    teamPlayers = players[ teamColor ] || []; // 该队伍所有成员
    for ( var i = teamPlayers.length - 1; i >= 0; i-- ){ // 遍历删除
      if ( teamPlayers[ i ] === player ){
        teamPlayers.splice( i, 1 );
      }
    }
    // 移除的玩家相当于死亡
    operations.playerDead(player)
  };

  // 玩家换队
  operations.changeTeam = function( player, newTeamColor ){ // 玩家换队
    operations.removePlayer( player ); // 从原队伍中删除
    player.teamColor = newTeamColor; // 改变队伍颜色
    operations.addPlayer( player ); // 增加到新队伍中
  };

  // 玩家死亡
  operations.playerDead = function( player ){
    var teamColor = player.teamColor,
    teamPlayers = players[ teamColor ]; // 玩家所在队伍
    var all_dead = true;
    for ( var i = 0, player; player = teamPlayers[ i++ ]; ){
      if ( player.state !== 'dead' ){
        all_dead = false;
        break;
      }
    }
    if ( all_dead === true ){ // 全部死亡
      for ( var i = 0, player; player = teamPlayers[ i++ ]; ){
        player.lose(); // 本队所有玩家 lose
      }
      for ( var color in players ){
        if ( color !== teamColor ){
          var teamPlayers = players[ color ]; // 其他队伍的玩家
          for ( var i = 0, player; player = teamPlayers[ i++ ]; ){
            player.win(); // 其他队伍所有玩家 win
          }
        }
      }
    }
  };

  var reciveMessage = function(){
    var message = Array.prototype.shift.call( arguments ); // arguments 的第一个参数为消息名称
    operations[ message ].apply( this, arguments );
  };

  return {
    reciveMessage: reciveMessage
  }
})(); 
// 测试结果
// 红队：
var player1 = playerFactory( '皮蛋', 'red' ),
    player2 = playerFactory( '小乖', 'red' ),
    player3 = playerFactory( '宝宝', 'red' ),
    player4 = playerFactory( '小强', 'red' );
// 蓝队：
var player5 = playerFactory( '黑妞', 'blue' ),
    player6 = playerFactory( '葱头', 'blue' ),
    player7 = playerFactory( '胖墩', 'blue' ),
    player8 = playerFactory( '海盗', 'blue' );
    
  player1.die();
  player2.die();
  player3.die();
  player4.changeTeam();
```

```js
/* 
  根据手机的颜色、内存和用户的购买数量判断是否可以购买
*/
var goods = { // 手机库存
  "red|32G": 3,
  "red|16G": 0,
  "blue|32G": 1,
  "blue|16G": 6
};
var mediator = (function(){
  var colorSelect = document.getElementById( 'colorSelect' ),
  memorySelect = document.getElementById( 'memorySelect' ),
  numberInput = document.getElementById( 'numberInput' ),
  colorInfo = document.getElementById( 'colorInfo' ),
  memoryInfo = document.getElementById( 'memoryInfo' ),
  numberInfo = document.getElementById( 'numberInfo' ),
  nextBtn = document.getElementById( 'nextBtn' );
  return {
    changed: function( obj ){
      var color = colorSelect.value, // 颜色
      memory = memorySelect.value,// 内存
      number = numberInput.value, // 数量
      stock = goods[ color + '|' + memory ]; // 颜色和内存对应的手机库存数量

      if ( obj === colorSelect ){ // 如果改变的是选择颜色下拉框
        colorInfo.innerHTML = color;
      }else if ( obj === memorySelect ){
        memoryInfo.innerHTML = memory;
      }else if ( obj === numberInput ){
        numberInfo.innerHTML = number;
      }
      if ( !color ){
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请选择手机颜色';
        return;
      }
      if ( !memory ){
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请选择内存大小';
        return;
      }
      if ( ( ( number - 0 ) | 0 ) !== number - 0 ){ // 输入购买数量是否为正整数
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请输入正确的购买数量';
        return;
      }

      nextBtn.disabled = false;
      nextBtn.innerHTML = '放入购物车';
    } 
  }
})();

// 修改颜色
colorSelect.onchange = function(){
  mediator.changed( this );
};
// 修改内存
memorySelect.onchange = function(){
  mediator.changed( this );
};
// 购买数量
numberInput.oninput = function(){
  mediator.changed( this );
}; 
```
### 11.1.12 修饰者模式
装饰者模式：装饰者模式可以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象（相当于式将一个对象嵌入另一个对象之中）

优点：使用继承的方式一方面会导致超类和子类之间存在强耦合性，其次在完成一些功能复用时，有可能创建出大量的子类，使子类的数量呈爆炸性增。跟继承相比，装饰者是一种更轻便灵活的做法，这是一种“即用即付”的方式

```js
// 通过保存原引用的方式改写某个函数
var a = function(){
  alert (1);
}

var _a = a;

a = function(){
  _a(); // 
  alert (2);
}

a(); 
```
* AOP装饰函数：基于原型(prototype)
```js
// 新增函数在原函数 前执行
Function.prototype.before = function (beforefn) {
  var __self = this; // 保存原函数的引用
  return function () { // 返回包含了原函数和新函数的"代理"函数
    beforefn.apply(this, arguments); // 执行新函数，且保证 this 不被劫持，新函数接受的参数
    // 也会被原封不动地传入原函数，新函数在原函数之前执行
    return __self.apply(this, arguments); // 执行原函数并返回原函数的执行结果
    // 并且保证 this 不被劫持
  }
}

// 新增函数在原函数 后执行
Function.prototype.after = function (afterfn) {
  var __self = this; // 保存原函数的引用
  return function () { // 返回包含了原函数和新函数的"代理"函数
    var ret = __self.apply(this, arguments); // 执行原函数并记录原函数的执行结果
    afterfn.apply(this, arguments); // 执行新函数，且保证 this 不被劫持，新函数接受的参数
    return ret; // 返回原函数的执行结果
  }
};

document.getElementById = document.getElementById.before(function () {
  console.log('before');
});

document.getElementById = document.getElementById.after(function () {
  console.log('after');
});

var button = document.getElementById('button');
console.log(button);
```

* AOP装饰函数：基于回调函数(callback)
```js
  var before = function (fn, beforefn) {
    return function () {
      beforefn.apply(this, arguments);
      return fn.apply(this, arguments);
    }
  }

  var after = function (fn, afterfn) {
    return function () {
      var ret = fn.apply(this, arguments);
      afterfn.apply(this, arguments);
      return ret
    }
  }
  // 原函数
  function a() {
    console.log('a')
  }
  a = before(a, function () { console.log('before') });
  a = after(a, function () { console.log('after') });
  a(); /// before a  after
```

::: tip AOP模式
AOP为Aspect Oriented Programming的缩写，意为：面向切面编程，是OOP（面向对象编程）的补充和完善。
简单说就是那些与业务无关，却为业务模块所共同调用的逻辑或责任封装起来，便于减少系统的重复代码，降低模块之间的耦合度，并有利于未来的可操作性和可维护性。
:::

::: tip 代理模式和装饰者模式的区别
代理模式是为其他对象提供一种代理以控制对这个对象的访问。装饰者模式是动态地给一个对象添加一些额外的职责。代理模式是行为的扩展,装饰者模式是对象的扩展。
:::
### 11.1.13 状态模式
状态模式：当一个对象的内在状态改变时允许改变其行为，这个对象看起来像是改变了其类
使用场景：
> 1. 一个对象的行为取决于它的状态，并且它必须在运行时根据状态来改变他的行为。
> 2. 代码中包含了大量与对象状态有关的条件语句时。

常规方法—文件上传
```js
    window.external.upload = function (state) {
      console.log(state); // 可能为 sign、uploading、done、error
    };
    
    var plugin = (function () {
      var plugin = document.createElement('embed');
      plugin.style.display = 'none';
      plugin.type = 'application/txftn-webkit';
      plugin.sign = function () {
        console.log('开始文件扫描');
      }
      plugin.pause = function () {
        console.log('暂停文件上传');
      };
      plugin.uploading = function () {
        console.log('开始文件上传');
      };
      plugin.del = function () {
        console.log('删除文件上传');
      }
      plugin.done = function () {
        console.log('文件上传完成');
      }
      document.body.appendChild(plugin);
      return plugin;
    })();

    var Upload = function (fileName) {
      this.plugin = plugin;
      this.fileName = fileName;
      this.button1 = null;
      this.button2 = null;
      this.state = 'sign'; // 设置初始状态为 waiting
    };

    Upload.prototype.init = function () {
      var that = this;
      this.dom = document.createElement('div');
      this.dom.innerHTML =
        '<span>文件名称:' + this.fileName + '</span>\
 <button data-action="button1">扫描中</button>\
 <button data-action="button2">删除</button>';
      document.body.appendChild(this.dom);
      this.button1 = this.dom.querySelector('[data-action="button1"]'); // 第一个按钮
      this.button2 = this.dom.querySelector('[data-action="button2"]'); // 第二个按钮
      this.bindEvent();
    };

    Upload.prototype.bindEvent = function () {
      var self = this;
      this.button1.onclick = function () {
        if (self.state === 'sign') { // 扫描状态下，任何操作无效
          console.log('扫描中，点击无效...');
        } else if (self.state === 'uploading') { // 上传中，点击切换到暂停
          self.changeState('pause');
        } else if (self.state === 'pause') { // 暂停中，点击切换到上传中
          self.changeState('uploading');
        } else if (self.state === 'done') {
          console.log('文件已完成上传, 点击无效');
        } else if (self.state === 'error') {
          console.log('文件上传失败, 点击无效');
        }
      };
      this.button2.onclick = function () {
        if (self.state === 'done' || self.state === 'error'
          || self.state === 'pause') {
          // 上传完成、上传失败和暂停状态下可以删除
          self.changeState('del');
        } else if (self.state === 'sign') {
          console.log('文件正在扫描中，不能删除');
        } else if (self.state === 'uploading') {
          console.log('文件正在上传中，不能删除');
        }
      };
    };

    Upload.prototype.changeState = function (state) {
      switch (state) {
        case 'sign':
          this.plugin.sign();
          this.button1.innerHTML = '扫描中，任何操作无效';
          break;
        case 'uploading':
          this.plugin.uploading();
          this.button1.innerHTML = '正在上传，点击暂停';
          break;
        case 'pause':
          this.plugin.pause();
          this.button1.innerHTML = '已暂停，点击继续上传';
          break;
        case 'done':
          this.plugin.done();
          this.button1.innerHTML = '上传完成';
          break;
        case 'error':
          this.button1.innerHTML = '上传失败';
          break;
        case 'del':
          this.plugin.del();
          this.dom.parentNode.removeChild(this.dom);
          console.log('删除完成');
          break;
      }
      this.state = state;
    };

    var uploadObj = new Upload('JavaScript 设计模式与开发实践');

    uploadObj.init();

    window.external.upload = function (state) { // 插件调用 JavaScript 的方法
      uploadObj.changeState(state);
    };

    window.external.upload('sign'); // 文件开始扫描

    setTimeout(function () {
      window.external.upload('uploading'); // 1 秒后开始上传
    }, 1000);

    setTimeout(function () {
      window.external.upload('done'); // 5 秒后上传完成
    }, 5000);
```

状态模式重构文件上传程序
```js
window.external.upload = function( state ){
 console.log( state ); // 可能为 sign、uploading、done、error
};
var plugin = (function(){
  var plugin = document.createElement( 'embed' );
  plugin.style.display = 'none';
  plugin.type = 'application/txftn-webkit';
  plugin.sign = function(){
    console.log( '开始文件扫描' );
  }
  plugin.pause = function(){
    console.log( '暂停文件上传' );
  };
  plugin.uploading = function(){
    console.log( '开始文件上传' );
  };
  plugin.del = function(){
    console.log( '删除文件上传' );
  }
  plugin.done = function(){
    console.log( '文件上传完成' );
  }
  document.body.appendChild( plugin );
  return plugin;
})(); 
```

### 11.1.14 适配器模式
适配器模式：就是使两个不兼容的接口通过适配器进行兼容。

```js
// 当我们向 googleMap 和 baiduMap 都发出“显示”请求时两者提供的方法不一致
var googleMap = {
  show: function(){
  console.log( '开始渲染谷歌地图' );
  }
};

var baiduMap = {
  display: function(){
  console.log( '开始渲染百度地图' );
  }
};

// 百度需要调用display方法，因此为百度增加一个适配器
var baiduMapAdapter = {
  show: function(){
  return baiduMap.display(); 
  }
 }; 

// 统一使用show方法使 googleMap 和 baiduMap兼容
var renderMap = function( map ){
  if ( map.show instanceof Function ){
    map.show();
  }
}; 
```

