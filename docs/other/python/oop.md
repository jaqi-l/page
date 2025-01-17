# 12.6 面对对象编程
## 12.6.1 概念
[什么是面向对象编程](/frontend/javascript/oop)
```py
class Player():
    def __init__(self, name, hp, role):
        self.name = name
        self.role = role

    def print_info(self):
        print(f'{self.name} is a {self.role},hp:{self.hp}')


user1 = Player('Bob', 100, '战士')
user2 = Player('Alice', 100, '法师')
```

## 12.6.2 类的方法和私有属性
```py
class Player():
    def __init__(self, name, hp, role):
        self.name = name
        self.hp = hp
        self._role = role  # 两个下划线开头的属性是私有的，不能在外部修改(规范)

    def print_info(self):
        print(f'{self.name} is a {self._role},hp:{self.hp}')

    def update_hp(self, type, hp): # hp属性的更新方法
        if type == '+':
            self.hp += hp
        elif type == '-':
            self.hp -= hp
        print(f'{self.name} now has {self.hp} hp')


user1 = Player('Bob', 100, '战士')
user2 = Player('Alice', 100, '法师')


user1.update_hp('+', 5)  # Bob now has 105 hp
user2.update_hp('-', 5)  # Alice now has 95 hp


user1.role = '刺客' # 通过 _role 仍能修改，只是不符合规范，应该使用类的方法更新数据
user1.print_info()  # Bob is a 战士,hp:105
```
## 12.6.3 类的继承
```py
# 父类
class Animal():
    def __init__(self):
        self.type = "猫科动物"
    class_name = "哺乳动物"

    def eat(self):
        print("吃鱼")

# 子类 继承父类Animal
class Cat(Animal):
    def __init__(self, name, color):
        super().__init__()  # 继承Animal的属性
        self.name = name
        self.color = color


cat1 = Cat("大毛", "黄色")
cat2 = Cat("二毛", "黑色")

print(cat1.type)  # 猫科动物
cat1.eat()  # 吃鱼 继承父类的方法
print(cat2.class_name)  # 哺乳动物
```