---
title: Python 面向对象类成员修饰符
layout: post
---

* TOC
{:toc}


### 成员修饰符

　　成员修饰符就是设置类的成员有些是公开的有些是私有的，公开的是在外部通过对象或者类可以调用，但是私有的只能通过类的内部才可以调用。  

#### 字段

- 静态字段

{% highlight Python linenos %}
class Foo:
    # 公有的静态字段
    ClassMembers = "公开的"
    # 私有的静态字段
    __ClassMembers = "私有的"

# 执行公有的静态字段
print(Foo.ClassMembers)

# 执行私有的静态字段
print(Foo.__ClassMembers)   # 报错，has no attribute

私有的是不能够直接调用的，需要在类中进行调用，如下：

class Foo:
    # 私有的静态字段
    __ClassMembers = "私有的"

    # 通过类中的方法调用私有的静态字段进行输出
    def Members(self):
        print(Foo.__ClassMembers)

# 创建一个对象
obj = Foo()

# 执行类中的Members方法
obj.Members()
{% endhighlight %}

- 普通字段

{% highlight Python linenos %}
class Foo:
    # 类的构造方法
    def __init__(self, url):

        # 普通字段
        self.url = url

        # 私有普通字段
        self.__Blog = url

# 创建一个对象，传入一个值
obj = Foo("zhuoxin.me")

# 普通字段
print(obj.url)

# 私有的普通字段
print(obj.__Blog)   # 报错，has no attribute

要输出私有的普通字段，需要在类中调用私有的普通字段进行输出

class Foo:
    # 类的构造方法
    def __init__(self, url):

        # 私有普通字段
        self.__Blog = url

        # 直接在构造方法内输出传入的URL，也可以在别的方法内
        print(self.__Blog)

# 创建一个对象，传入一个值
obj = Foo("zhuoxin.me")
{% endhighlight %}

　　方法、属性的访问于上述方式相似，即：<span style="color:red">私有成员只能在类内部使用</span>，即使是继承关系也不可以。  
ps：非要访问私有属性的话，可以通过 `对象._类__属性名`  

{% highlight python linenos %}
class Foo:

    # 父类的构造方法
    def __init__(self):

        # 私有普通字段
        self.__Blog = "http://zhuoxin.me"

# 创建一个对象
obj = Foo()

# 通过特殊的方法访问
print(obj._Foo__Blog)
# 一个下划线，一个类名，私有的变量名
{% endhighlight %}