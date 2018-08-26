---
title: Python 面向对象基础和三大特性
layout: post
---

* TOC
{:toc}

<br><br>

　　面向对象编程是一种编程方式，此编程方式的落地需要使用 `类` 和 `对象` 来实现，所以，面向对象编程其实就是对 “类” 和 “对象” 的使用。
类就是一个模板，模板里可以包含多个函数，函数里实现一些功能。
对象则是根据模板创建的实例，通过实例对象可以执行类中的函数。

### 面向对象基础

#### 创建类和对象

- `class` 是关键字，表示类
- 创建对象，类名称后加括号即可

> ps：类中的函数第一个参数必须是self（详细见：类的三大特性之封装）类中定义的函数叫做 “方法”。

{% highlight python linenos %}
# 创建类
class Foo:
    def Bar(self):
        print 'Bar'
 
    def Hello(self, name):
        print 'i am %s' %name
 
# 根据类Foo创建对象obj
obj = Foo()
obj.Bar()            # 执行Bar方法
obj.Hello('Linrb')   # 执行Hello方法
{% endhighlight %}

　　场景的不同适合其的编程方式也不同。总结：函数式的应用场景 --> 各个函数之间是独立且无共用的数据。

### 面向对象三大特性

　　面向对象的三大特性是指：封装、继承和多态。

#### 封装

　　封装，顾名思义就是将内容封装到某个地方，以后再去调用被封装在某处的内容。
所以，在使用面向对象的封装特性时，需要：  
- 将内容封装到某处
- 从某处调用被封装的内容  
<br>
- 1、将内容封装到某处

{% highlight python linenos %}
# 创建类
class Foo:
    def __init__(self,name,age):
        self.name = name
        self.age = age
        
# 根据类Foo创建对象
# 创建时会自动执行Foo类中的 __init__ 方法”
obj1 = Foo("Linrb",90)      # 将 Linrb 和 90 分别封装到 obj1(self) 的 name 和 age 属性中

# 根据类Foo创建对象
# 创建时会自动执行Foo类中的 __init__ 方法”
obj2 = Foo("zhuoxin",90)    # 将 zhuoxin 和 90 分别封装到 obj2(self) 的 name 和 age 属性中
{% endhighlight %}

- 2、从某处调用被封装的内容  
调用被封装的内容时，有两种情况：  
    - 通过对象直接调用
    - 通过self间接调用

{% highlight python linenos %}
1、通过对象直接调用被封装的内容
class Foo:
    def __init__(self, name, age):
        self.name = name
        self.age = age
 
obj1 = Foo('Linrb', 90)
print obj1.name    # 直接调用obj1对象的name属性
print obj1.age     # 直接调用obj1对象的age属性
 
obj2 = Foo('zhuoxin', 90)
print obj2.name    # 直接调用obj2对象的name属性
print obj2.age     # 直接调用obj2对象的age属性


2、通过self间接调用被封装的内容
# 执行类中的方法时，需要通过self间接调用被封装的内容
class Foo:
    def __init__(self, name, age):
        self.name = name
        self.age = age
  
    def detail(self):
        print self.name
        print self.age
  
obj1 = Foo('Linrb', 90)
obj1.detail()  # Python 默认会将 obj1 传给 self 参数，即：obj1.detail(obj1)，所以，此时方法内部的 self ＝ obj1，即：self.name 是 Linrb ；self.age 是 90
  
obj2 = Foo('zhuoxin', 90)
obj2.detail()  # Python默认会将obj2传给self参数，即：obj1.detail(obj2)，所以，此时方法内部的 self ＝ obj2，即：self.name 是 zhuoxin ； self.age 是 90
{% endhighlight %}

#### 关于self

　　`self` 其实就是实例化时的对象，下面代码可以看 obj 和 self 是同一个东西。

{% highlight python linenos%}
# 创建一个类，类名是Class_basis
class Class_basis:
    # 在类里面创建了一个方法ret
    def ret(self,):
        # 输出self的内存地址
        print("self内存地址", id(self))

# 创建一个对象obj，类名后面加括号
obj = Class_basis()

# 输出对象obj的内存地址
print("obj内存地址", id(obj))
# 通过对象调用类中的ret方法
obj.ret()

执行结果
obj内存地址 2420760156536
self内存地址 2420760156536
{% endhighlight%}
　　<span style="border-bottom:1px solid">通过上面的测试可以很清楚的看到 obj 对象和类的方法中 self 内存地址是一样的，那么方法中的 self 就等于 obj。</span>  

　　<span style="color:red">综上所述，对于面向对象的封装来说，其实就是使用构造方法将内容封装到 对象 中，然后通过对象直接或者 self 间接获取被封装的内容。</span>

#### 继承

　　<span style="border-bottom:1px solid">继承，面向对象中的继承和现实生活中的继承相同，即：子可以继承父的内容。</span>  

实例：  
　　创建一个人信息相关的类，比如说人拥有四肢、头发、眼、耳朵等信息，在创建一个中国人和外国人的类，中国人的语言是中文，皮肤是黄色，外国人的语言是英文，皮肤是黑色。  

{% highlight python linenos %}
class People:
    def __init__(self):
        print("你的通用特征有：四肢、头发、眼、耳朵")

class China(People):
    def info(self):
        print("你是中国人，你的语言是中文，皮肤是黄色")

class Us(People):
    def info(self):
        print("你是美国人，你的语言是英文，皮肤是黑色")

c = China()     # 你的通用特征有：四肢、头发、眼、耳朵
c.info()        # 你是中国人，你的语言是中文，皮肤是黄色

m = Us()        # 你的通用特征有：四肢、头发、眼、耳朵
m.info()        # 你是美国人，你的语言是英文，皮肤是黑色
{% endhighlight%}

`People` –> `父类` or `基类`  
`China` and `Us` –> `子类` or `派生类`  
- 派生类可以集成基类中所有的功能
- 派生类和基类同时存在，优先找派生类
- Python类可以同时继承多个类  

　　<span style="color:red">所以，对于面向对象的继承来说，其实就是将多个类共有的方法提取到父类中，子类仅需继承父类而不必一一实现每个方法。</span>  

#### 多继承（新式类）

　　多继承就是在`class My(China,Us)`:括号内放入多个父类名。  
　　Python的类如果继承了多个类，那么需要怎么寻找？  

- 顶层两个类没有父类的情况  

![]({{site.baseurl}}/images/images/20180127-100354.png)

- 顶层两个类有父类的情况  

![]({{site.baseurl}}/images/images/20180127-101050.png)

<br>
注意：在上述查找过程中，一旦找到，则寻找过程立即中断，便不会再继续找了

#### 继承实例

{% highlight python linenos %}
class A:
    def bar(self):
        print("BAR")
        self.f1()

class B(A):
    def f1(self):
        print("B")

class C:
    def f1(self):
        print("C")

class D(C, B):
    pass

obj = D()
obj.bar()
{% endhighlight %}

{% highlight python linenos %}
结果
BAR
C
{% endhighlight %}

**流程**  

1. 创建了类 A、B、C、D；
2. `D` 继承了 `C` 和 `B` ，`B` 继承了 `A` ，`D` 内什么都不做，`pass` ；
3. 创建一个对象 `obj` ，类是 `D` ，当执行D的bar方法的时候会先从 `C` 里面寻找有没有 `bar` 方法；
4. C 内没有 bar 方法，然后继续从 `B` 里面查找，B 里面也没有，B 的父类是 `A` ，A 里面有 bar 方法，所以就执行了 `A` 的 `bar` 方法；
5. A 的 bar 方法首先输出了 `BAR` ；
6. 然后又执行了 `self.f1()` ，`self=obj` ，相当于执行了 `obj.f1()` ；
7. 执行 obj.f1() 的时候先从 `C` 里面查找有没有 `f1` 这个方法，C 里面有 f1 这个方法；
8. 最后就执行 C 里面的 f1 方法了，输出了 C。


#### 执行基类中的构造方法 \__init__

- 第一种方式：`super(cla,self)`

{% highlight python linenos %}
class Annimal:
    def __init__(self):
        print("Annimal的构造方法")
        self.ty = "动物"
class Cat(Annimal):
    def __init__(self):
        print("Cat的构造方法")
        self.n = "猫"
        # 寻找Cat类的父类，然后执行父类的构造方法
        super(Cat, self).__init__()
mao = Cat()
print(mao.__dict__)
{% endhighlight %}

{% highlight python linenos %}
Cat的构造方法
Annimal的构造方法
{'ty': '动物', 'n': '猫'}
{% endhighlight %}

　　先执行了Cat的构造方法，然后又执行了Annimal的构造方法。

- 第二种方式：

{% highlight python linenos %}
Annimal.__init__(self)
{% endhighlight %}

<span style="color:red">总结：子类如果继承多个基类，只要 super 一下就好了，如果没有这个需求，使用 Annimal.\__init__（self）更直观一些</span>
<br>

#### 总结

- 面向对象是一种编程方式，此编程方式的实现是基于对 类 和 对象 的使用  
- 类 是一个模板，模板中包装了多个“函数”供使用  
- 对象，根据模板创建的实例（即：对象），实例用于调用被包装在类中的函数  
- 面向对象三大特性：封装、继承和多态  



