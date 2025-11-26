# 3.15 面向对象编程
## 3.15.1 什么是面向对象编程

### 面向过程（Procedure Oriented简称PO）：
当解决一个问题的时候，面向过程会把事情拆分成：一个个函数和数据（用于方法的参数）。然后按照一定的顺序，执行完这些方法（每个方法看作一个过程），等方法执行完了，事情就搞定了。如`c`
* 优点：性能比面向对象高，因为类调用时需要实例化，开销比较大，比较消耗资源。
* 缺点：没有面向对象易维护、易复用、易扩展
### 面向对象（Object Oriented简称OO）：
当解决一个问题的时候，面向对象会把事物抽象成对象的概念，就是说这个问题里面有哪些对象，然后给对象赋一些属性和方法，然后让每个对象去执行自己的方法，问题得到解决。     
如`js`/`java`/`php`/`c#`/`python`/`c++`/`ruby`/...
* 优点：易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统 更加灵活、更加易于维护。
* 缺点：性能比面向过程低

#### 例子：五子棋
* 面向过程的设计思路：
> 1、开始游戏，2、黑子先走，3、绘制画面，4、判断输赢，5、轮到白子，6、绘制画面，7、判断输赢，8、返回步骤2，9、输出最后结果。把上面每个步骤用不同的方法来实现。
* 面向对象：
> 整个五子棋可以分为1、黑白双方，这两方的行为是一模一样的，2、棋盘系统，负责绘制画面，3、规则系统，负责判定诸如犯规、输赢等。第一类对象（玩家对象）负责接受用户输入，并告知第二类对象（棋盘对象）棋子布局的变化，棋盘对象接收到了棋子的变化就要负责在屏幕上面显示出这种变化，同时利用第三类对象（规则系统）来对棋局进行判定。

可以明显地看出，面向对象是以功能来划分问题，而不是步骤。同样是绘制棋局，这样的行为在面向过程的设计中分散在了多个步骤中，很可能出现不同的绘制版本，因为通常设计人员会考虑到实际情况进行各种各样的简化。而面向对象的设计中，绘图只可能在棋盘对象中出现，从而保证了绘图的统一。



### 面向对象的相关概念
* 对象：万物皆对象 
* 类：对象的具体细分（按功能特点进行分类 大类 小类）
* 实例：类中一个具体的事物

### 面向对象编程的特性
三大基本特性：封装，继承，多态

* 封装		

封装，就是把客观事物封装成抽象的类，并且类可以把自己的数据和方法只让可信的类或者对象操作，对不可信的进行信息隐藏。一个类就是一个封装了数据以及操作这些数据的代码的逻辑实体。在一个对象内部，某些代码或某些数据可以是私有的，不能被外界访问。通过这种方式，对象对内部数据提供了不同级别的保护，以防止程序中无关的部分意外的改变或错误的使用了对象的私有部分。

* 继承		

继承，指可以让某个类型的对象获得另一个类型的对象的属性的方法。它支持按级分类的概念。继承是指这样一种能力：它可以使用现有类的所有功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。 通过继承创建的新类称为“子类”或“派生类”，被继承的类称为“基类”、“父类”或“超类”。继承的过程，就是从一般到特殊的过程。要实现继承，可以通过 “继承”和“组合”来实现。继承概念的实现方式有二类：实现继承与接口继承。实现继承是指直接使用父类的属性和方法而无需额外编码的能力；接口继承是指仅使用属性和方法的名称、但是子类必须提供实现的能力。

* 多态			

多态，是指一个类实例的相同方法在不同情形有不同表现形式。多态机制使具有不同内部结构的对象可以共享相同的外部接口。这意味着，虽然针对不同对象的具体操作不同，但通过一个公共的类，它们（那些操作）可以通过相同的方式予以调用。

### 面向对象编程的五大基本原则

* 单一职责原则SRP(Single Responsibility Principle)    
> 是指一个类的功能要单一，不能包罗万象。如同一个人一样，分配的工作不能太多，否则一天到晚虽然忙忙碌碌的，但效率却高不起来。

* 开放封闭原则OCP(Open－Close Principle)     
> 一个模块在扩展性方面应该是开放的而在更改性方面应该是封闭的。比如：一个网络模块，原来只服务端功能，而现在要加入客户端功能，那么应当在不用修改服务端功能代码的前提下，就能够增加客户端功能的实现代码，这要求在设计之初，就应当将服务端和客户端分开，公共部分抽象出来。

* 里式替换原则LSP(the Liskov Substitution Principle LSP)    
> 子类应当可以替换父类并出现在父类能够出现的任何地方。比如：公司搞年度晚会，所有员工可以参加抽奖，那么不管是老员工还是新员工，也不管是总部员工还是外派员工，都应当可以参加抽奖，否则这公司就不和谐了。

* 依赖倒置原则DIP(the Dependency Inversion Principle DIP)      
> 具体依赖抽象，上层依赖下层。假设B是较A低的模块，但B需要使用到A的功能，这个时候，B不应当直接使用A中的具体类： 而应当由B定义一个抽象接口，并由A来实现这个抽象接口，B只使用这个抽象接口：这样就达到了依赖倒置的目的，B也解除了对A的依赖，反过来是A依赖于B定义的抽象接口。通过上层模块难以避免依赖下层模块，假如B也直接依赖A的实现，那么就可能造成循环依赖。一个常见的问题就是编译A模块时需要直接包含到B模块的cpp文件，而编译B时同样要直接包含到A的cpp文件。

* 接口分离原则ISP(the Interface Segregation Principle ISP)     
> 模块间要通过抽象接口隔离开，而不是通过具体的类强耦合起来

## 3.15.2 JS面向对象编程概述

### JS内置类
* JS内置类`Object`的基类分为以下小类：                     
> `Number`、`String`、`Boolean`、`Null`、`Undefined`、`Array`、`Date`、`RegExp`、`Function`、 `HTMLCollection`、`EventTarget`、`自定义类`
* 侠义对象、广义对象、严格对象：
> 侠义对象：通过`{}`创建的对象
> 广义对象：`Array`、`Date`、`RegExp`、`Function`...
> 严格对象：`json`
### 构造函数（类）
#### 什么是构造函数：
> 通过`new`关键字执行的，一般首字母大写的函数。构造函数的`this`指向函数本身。
::: tip
构造函数模没有`return`,默认会返回`this`对象,如果写`return`只能返回引用类型。
:::

#### 构造函数的创建过程：
> 1. `new`关键字执行时，函数内部创建了一个空对象
> 2. `this`指向这个空对象
> 3. 执行函数内部的语句
> 4. 返回这个对象

#### 构造函数的作用：
> 创建对象时完成对对象属性的一些初始化等操作，为对象数据成员开辟内存空间，并给创建的对象建立一个统一标识符。

#### 原型对象`prototype`
> 每一个构造函数都有一个`prototype`对象，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。

#### 实例的`constructor`属性
>  每一个实例都有一个`constructor`属性，指向它的构造函数。

#### 原型对象的`constructor`属性
>  每一个原型对象（`prototype`）都有一个`constructor`属性，指向该原型对象对应的构造函数。

#### 构造函数的`__proto__`属性
> 每个通过构造函数创建的对象都有一个`__proto__`属性，该属性指向原型对象

#### 原型链
> ![prototype](/prototype.png)	

#### 原型链机制
> 通过构造函数创建的对象会先查找自己的属性，如果没有通过`__proto__`去原型上查找。如果还没有就去自己原型对象的原型对象去查找，一直查找到`object`基类。

> `Object.prototype`是所有对象的原型链的终点。

#### 系统内置构造函数：

* `Object`
```js
var obj = new Object() //obj是Object的实例
obj.name = '大毛'
obj.color = '黄色'
```

* `Function`
```js
var fn = new Function("a","b","console.log(a+b)") //fn是Function的实例
fn(1,4)
```

```js
function Cat(name,color){
	this.name=name;
	this.color=color;
}
Cat.prototype.type = "猫科动物"; // 通过原型设置公共属性
var cat1 = new Cat("大毛","黄色");
var cat2 = new Cat("二毛","黑色");

alert(cat1.name); // 大毛
alert(cat1.color); // 黄色
alert(cat1.type); // 猫科动物
```

### 相关方法
详见：[7、Prototype模式的验证方法](/frontend/javascript/oop#_7、prototype模式的验证方法)

## 3.15.3 对象封装方法
封装的六种方法
### 1、生成实例对象的原始模式

```js
var Cat = {
   name : '',
   color : ''
}
```

```js
var cat1 = {}; // 创建一个空对象
　　cat1.name = "大毛"; // 按照原型对象的属性赋值
　　cat1.color = "黄色";
var cat2 = {};
　　cat2.name = "二毛";
　　cat2.color = "黑色";
```
这样的写法有两个缺点，一是如果多生成几个实例，写起来就非常麻烦；二是实例与原型之间，没有任何办法，可以看出有什么联系。

### 2、原始模式的改进
我们可以写一个函数，解决代码重复的问题。
```js
function Cat(name,color) {
　　return {
　　　　name:name,
　　　　color:color
　　}
}
```
然后生成实例对象，就等于是在调用函数：
```js
　　var cat1 = Cat("大毛","黄色");
　　var cat2 = Cat("二毛","黑色");
```
这种方法的问题依然是，cat1和cat2之间没有内在的联系，不能反映出它们是同一个原型对象的实例。

### 3、构造函数模式

为了解决从原型对象生成实例的问题，Javascript提供了一个构造函数（`Constructor`）模式。

所谓"构造函数"，其实就是一个普通函数，但是内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。

```js
function Cat(name,color){
　　this.name=name;
　　this.color=color;
}
```
```js
　　var cat1 = new Cat("大毛","黄色");
　　var cat2 = new Cat("二毛","黑色");
　　alert(cat1.name); // 大毛
　　alert(cat1.color); // 黄色
```
这时cat1和cat2会自动含有一个`constructor`属性，指向它们的构造函数。
```js
　　alert(cat1.constructor == Cat); //true
　　alert(cat2.constructor == Cat); //true
```
使用`instanceof`运算符，验证原型对象与实例对象之间的关系。
```js
　　alert(cat1 instanceof Cat); //true
　　alert(cat2 instanceof Cat); //true
```
### 4、构造函数模式的问题

构造函数方法很好用，但是存在一个浪费内存的问题。

我们现在为Cat对象添加一个不变的属性type（种类），再添加一个方法eat（吃）。那么，原型对象Cat就变成了下面这样：
```js
function Cat(name,color){
　　this.name = name;
　　this.color = color;
　　this.type = "猫科动物";
　　this.eat = function(){alert("吃老鼠");};
}
```
还是采用同样的方法，生成实例：
```js
　　var cat1 = new Cat("大毛","黄色");
　　var cat2 = new Cat ("二毛","黑色");
　　alert(cat1.type); // 猫科动物
　　cat1.eat(); // 吃老鼠
```
type属性和eat()方法都是一模一样的内容，每一次生成一个实例，都必须为重复的内容，多占用一些内存。
```js
　　alert(cat1.eat == cat2.eat); //false
```

### 5、`Prototype`模式

Javascript规定，每一个构造函数都有一个`prototype`对象，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。
这意味着，我们可以把那些不变的属性和方法，直接定义在prototype对象上。

```js
　　function Cat(name,color){
　　　　this.name = name;
　　　　this.color = color;
　　}
	Cat.prototype = {
		type:"猫科动物"，
		eat:function(){alert("吃老鼠")};
	}
```
然后，生成实例。
```js
　　var cat1 = new Cat("大毛","黄色");
　　var cat2 = new Cat("二毛","黑色");
　　alert(cat1.type); // 猫科动物
　　cat1.eat(); // 吃老鼠
```
这时所有实例的type属性和eat()方法，其实都是同一个内存地址，指向prototype对象，因此就提高了运行效率。
```js
　　alert(cat1.eat == cat2.eat); //true
```

### 6、`Prototype`模式的ES6语法`class`
```js
class Cat {
	constructor(name,color) {
		this.name = name;
		this.color = color;
	}
	type = "猫科动物";
	eat = function(){alert("吃老鼠")};
}
var cat1 = new Cat("大毛","黄色");
var cat2 = new Cat("二毛","黑色");
alert(cat1.type); // 猫科动物
cat1.eat(); // 吃老鼠
```
`class`详见[3.16.19](/frontend/javascript/ECMAScript#_3-16-19-class)
### 7、`Prototype`模式的验证方法

为了配合prototype属性，Javascript定义了一些辅助方法，帮助我们使用它。，

1. `isPrototypeOf()`

这个方法用来判断，某个proptotype对象和某个实例之间的关系。
```js
　　alert(Cat.prototype.isPrototypeOf(cat1)); //true
　　alert(Cat.prototype.isPrototypeOf(cat2)); //true
```
2. `hasOwnProperty()`

每个实例对象都有一个`hasOwnProperty()`方法，用来判断某一个属性到底是本地属性，还是继承自`prototype`对象的属性。
```js
　　alert(cat1.hasOwnProperty("name")); // true
　　alert(cat1.hasOwnProperty("type")); // false
```
3. `in`运算符

`in`运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。
```js
　　alert("name" in cat1); // true
　　alert("type" in cat1); // true
```
`in`运算符还可以用来遍历某个对象的所有属性。
```js
　　for(var prop in cat1) { alert("cat1["+prop+"]="+cat1[prop]); }
```


## 3.15.4 构造函数继承方法
构造函数继承的五种方法
```js
　function Animal(){
　　　this.species = "动物";
　}
　function Cat(name,color){
　　　this.name = name;
　　　this.color = color;
　}
``` 
怎样才能使"猫"继承"动物"呢？

### 1、构造函数绑定

第一种方法也是最简单的方法，使用`call`或`apply`方法，将父对象的构造函数绑定在子对象上。
``` js
function Cat(name,color){
　　Animal.apply(this, arguments);
　　this.name = name;
　　this.color = color;
}
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
### 2、prototype模式

如果"猫"的prototype对象，指向一个Animal的实例，那么所有"猫"的实例，就能继承Animal了。
```js
　　Cat.prototype = new Animal(); //Cat的prototype对象指向一个Animal的实例。
　　Cat.prototype.constructor = Cat;
　　var cat1 = new Cat("大毛","黄色");
　　alert(cat1.species); // 动物
　　alert(cat1.constructor == Cat.prototype.constructor); // true 实例的constructor属性，默认同prototype对象constructor属性
　　alert(cat1.constructor == Animal); // true
```
::: tip
`Cat.prototype = new Animal();`它相当于完全删除了prototype对象原先的值，然后赋予一个新值。但是，第二行又是什么意思呢？
`Cat.prototype.constructor = Cat;`任何一个prototype对象都有一个constructor属性，指向它的构造函数。如果没有"Cat.prototype = new Animal();"这一行，Cat.prototype.constructor是指向Cat的；加了这一行以后，Cat.prototype.constructor指向Animal。因此在替换prototype对象后需要将prototype的上constructor属性指回原来的构造函数。
:::


### 3、直接继承prototype

第三种方法是对第二种方法的改进。由于Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过Animal()，直接继承Animal.prototype

```js
　　function Animal(){ }
　　Animal.prototype.species = "动物";
　　Cat.prototype = Animal.prototype; // 将Cat的prototype对象直接指向Animal的prototype对象，这样就完成了继承。
　　Cat.prototype.constructor = Cat;
　　var cat1 = new Cat("大毛","黄色");
　　alert(cat1.species); // 动物
```
与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。
所以，上面这一段代码其实是有问题的。请看第二行
```js
Cat.prototype.constructor = Cat; // 这一句实际上把Animal.prototype对象的constructor属性也改掉了！
alert(Animal.prototype.constructor); // Cat
```

### 4、利用空对象作为中介

由于"直接继承prototype"存在上述的缺点，所以就有第四种方法，利用一个空对象作为中介。
```js
　　function extend(Child, Parent) {
　　　　var F = function(){};
　　　　F.prototype = Parent.prototype;
　　　　Child.prototype = new F();
　　　　Child.prototype.constructor = Child;
　　　　Child.uber = Parent.prototype;
　　}
//使用
　　extend(Cat,Animal);
　　var cat1 = new Cat("大毛","黄色");
　　alert(cat1.species); // 动物
```
:::tip
1. `F`是空对象，所以几乎不占内存。这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象。
2. `Child.uber = Parent.prototype;`意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性。
:::

### 5、拷贝继承

上面是采用prototype对象，实现继承。我们也可以换一种思路，纯粹采用"拷贝"方法实现继承。简单说，如果把父对象的所有属性和方法，拷贝进子对象，不也能够实现继承吗？这样我们就有了第五种方法。

首先，还是把Animal的所有不变属性，都放到它的prototype对象上。
```js
function Animal(){...}
Animal.prototype.species = "动物";

// 属性拷贝
function extend2(Child, Parent) {
　　var p = Parent.prototype;
　　var c = Child.prototype;
　　for (var i in p) {
　　　　c[i] = p[i];
　　　　}
　　c.uber = p;
}

// 使用
　　extend2(Cat, Animal);
　　var cat1 = new Cat("大毛","黄色");
　　alert(cat1.species); // 动物
```

## 3.15.5 非构造函数的继承方法
构造函数继承的三种方法

比如，现在有一个对象，叫做"中国人"。
```js
var Chinese = {
　　nation:'中国'
};
// 还有一个对象，叫做"医生"。
var Doctor ={
　　career:'医生'
}
```
请问怎样才能让"医生"去继承"中国人"，也就是说，我怎样才能生成一个"中国医生"的对象？
这里要注意，这两个对象都是普通对象，不是构造函数，无法使用构造函数方法实现"继承"。

### 1、`object()`方法

json格式的发明人Douglas Crockford，提出了一个`object()`函数，可以做到这一点。
```js
function object(o) {
　　function F() {}
　　F.prototype = o;
　　return new F();
}
```
`object()`函数，其实只做一件事，就是把子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起。
```js
// 使用的时候，第一步先在父对象的基础上，生成子对象：
　　var Doctor = object(Chinese);
// 然后，再加上子对象本身的属性：
　　Doctor.career = '医生';
// 这时，子对象已经继承了父对象的属性了。
　　alert(Doctor.nation); //中国
```
### 2、浅拷贝

除了使用原型链(prototype)以外，还有另一种思路：把父对象的属性，全部拷贝给子对象，也能实现继承。

下面这个函数，就是在做拷贝：
```js
function extendCopy(p) {
　　var c = {};
　　for (var i in p) {
　　　　c[i] = p[i];
　　}
　　c.uber = p;
　　return c;
}
// 使用
var Doctor = extendCopy(Chinese);
Doctor.career = '医生';
alert(Doctor.nation); // 中国
```
这样的拷贝有一个问题。那就是，如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址"浅拷贝"，而不是真正拷贝，因此存在父对象被篡改的可能。

### 3、深拷贝

所谓"深拷贝"，就是能够实现真正意义上的数组和对象的拷贝。它的实现并不难，只要递归调用"浅拷贝"就行了。
```js
function deepCopy(p, c) {
　　var c = c || {};
　　for (var i in p) {
　　　　if (typeof p[i] === 'object') {
　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　deepCopy(p[i], c[i]);
　　　　} else {
　　　　　　　c[i] = p[i];
　　　　}
　　}
　　return c;
}
// 使用的时候这样写：
var Doctor = deepCopy(Chinese);
// 给父对象加一个属性，值为数组。然后，在子对象上修改这个属性：
Chinese.birthPlaces = ['北京','上海','香港'];
Doctor.birthPlaces.push('厦门');
// 这时，父对象就不会受到影响了。
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港
```
目前，jQuery库使用的就是这种继承方法。


参考:[2分钟让你明白什么是面向对象编程](https://zhuanlan.zhihu.com/p/75265007)、
[Javascript 面向对象编程](https://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)