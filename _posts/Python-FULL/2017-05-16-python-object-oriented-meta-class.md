---
title: Python 面向对象类之元类
layout: post
---

* TOC
{:toc}

<br><br>

阅读以下代码：

{% highlight python linenos%}
class Foo(object):
    def __init__(self):
        pass

obj = Foo()   # obj是通过Foo类实例化的对象
{% endhighlight %}

　　上述代码中，obj 是通过 Foo 类实例化的对象，其实，不仅 obj 是一个对象，Foo类本身也是一个对象，<span style="color:red">因为在Python中一切事物都是对象</span>。
如果按照一切事物都是对象的理论：创建 obj 对象会执行 Foo 类的`构造方法`，那么 Foo 类对象应该也是通过执行某个类的构造方法创建。

{% highlight python linenos%}
print type(obj)  # 输出：<class '__main__.Foo'>     表示，obj 对象由Foo类创建
print type(Foo)  # 输出：<type 'type'>              表示，Foo类对象由 type 类创建
{% endhighlight %}

　　所以，<span style="color:red">obj对象是Foo类的一个实例，Foo类对象是 type 类的一个实例</span>，即：Foo类对象 是通过type类的构造方法创建。  

那么，创建 `类` 就可以有两种方式：

- a). 普通方式

{% highlight python linenos%}
class Foo(object):
    def func(self):
        print 'hello wupeiqi'
{% endhighlight %}

- b).特殊方式（type类的构造函数）

{% highlight python linenos%}
def function(self):
    print 'hello wupeiqi'
 
Foo = type('Foo',(object,), {'func': function})
# type第一个参数：类名
# type第二个参数：当前类的基类
# type第三个参数：类的成员
{% endhighlight %}

`类 是由 type 类实例化产生`  

>那么问题来了，类默认是由 type 类实例化产生，类是如何创建对象？type类中又是如何创建类的？  
>答：类中有一个属性 `__metaclass__` ，其用来表示该类由谁来实例化创建，所以，我们可以为 `__metaclass__` 设置一个 type 类的派生类，从而查看类创建的过程。  

{% highlight python linenos%}
class MyType(type):

    def __init__(self, what, bases=None, dict=None):
        super(MyType, self).__init__(what, bases, dict)

    def __call__(self, *args, **kwargs):
        obj = self.__new__(self, *args, **kwargs)

        self.__init__(obj)

# python3 class foo(object,metaclass = MyType)
class Foo(object):

    __metaclass__ = MyType

    def __init__(self, name):
        self.name = name

    def __new__(cls, *args, **kwargs):
        return object.__new__(cls, *args, **kwargs)

# 第一阶段：解释器从上到下执行代码创建Foo类
# 第二阶段：通过Foo类创建obj对象
obj = Foo()
对象后面加 () 会执行类中的 call 方法
{% endhighlight %}











