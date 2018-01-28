---
title: Python 面向对象类成员（字段、方法）
layout: post
---

* TOC
{:toc}

### 类的成员

类的成员可以分为三大类：字段、方法、属性：  
<br>
![]({{site.baseurl}}/images/images/20180127-142634.png)  
<br>
<span style="border-bottom:1px solid">注：所有成员中，只有 `普通字段` 的内容保存对象中，即：根据此类创建了多少对象，在内存中就有多少个普通字段。而其他的成员，则都是保存在类中，即：无论对象的多少，在内存中只创建一份。</span>  

#### 字段

　　字段包括：普通字段和静态字段，他们在定义和使用中有所区别，而最本质的区别是内存中保存的位置不同，  

- `普通字段` 属于 `对象`  
- `静态字段` 属于 `类`  

{% highlight python linenos %}
class Province:
    静态字段
    country ＝ '中国'

    def __init__(self, name):
        普通字段
        self.name = name
        #访问静态字段
        #self.country
        #Province.country

# 直接访问普通字段
obj = Province('河北省')
print obj.name

# 类直接访问静态字段
Province.country
#对象访问静态字段
obj.country
#如果 obj.country = "世界"  则相当于obj对象自己创建了一个普通字段 country，不会修改到静态字段
{% endhighlight %}

由上可见：  
- 静态字段在内存中只保存一份  
- 普通字段在每个对象中都要保存一份  

<span style="border-bottom:1px solid">应用场景： 通过类创建对象时，如果每个对象都具有相同的字段，那么就使用静态字段。</span>


#### 方法

方法包括：普通方法、静态方法、类方法，三种方法在 `内存中都归属于类` ，区别在于调用方式不同。  

- 普通方法：由 `对象` 调用；至少一个 `self` 参数；执行普通方法时，自动将调用该方法的对象赋值给 self；
- 类方法：由 `类` 调用； 至少一个 `cls` 参数；执行类方法时，自动将调用该方法的类赋值给 cls；
- 静态方法：由 `类` 调用；无默认参数；  

{% highlight python linenos %}
class Foo:

    def __init__(self, name):
        self.name = name

    def ord_func(self):
        """ 定义普通方法，至少有一个self参数 """
        print '普通方法'

    @classmethod
    def class_func(cls):
        """ 定义类方法，至少有一个cls参数 """
        print '类方法'

    @staticmethod
    def static_func():
        """ 定义静态方法 ，无默认参数"""
        print '静态方法'


# 调用普通方法
f = Foo()
f.ord_func()

# 调用类方法
Foo.class_func()

# 调用静态方法
Foo.static_func()
{% endhighlight%}

> 相同点：对于所有的方法而言，均属于类（非对象）中，所以，在内存中也只保存一份。  
> 不同点：方法调用者不同、调用方法时自动传入的参数不同。  

#### 属性

　　Python中的属性其实是普通方法的变种，让方法的使用看起来和使用字段一样  

对于属性，有以下知识点：
- 属性的基本使用
- 属性的两种定义方式  

**1. 属性的基本使用**

{% highlight python linenos %}
# ############### 定义 ###############
class Foo:
    def func(self):
        pass

    # 定义属性
    @property
    def prop(self):
        pass
        
# ############### 调用 ###############
foo_obj = Foo()
foo_obj.func()
foo_obj.prop   #调用属性
{% endhighlight %}

由属性的定义和调用要注意一下几点：  
- 定义时，在普通方法的基础上添加 `@property` 装饰器；
- 定义时，属性仅有一个 `self` 参数
- 调用时，`无需括号`  

　　注意：属性存在意义是：访问属性时可以制造出和访问字段完全相同的假象。属性由方法变种而来，如果Python中没有属性，方法完全可以代替其功能。  
<br>
**2. 属性的两种定义方式**  

- 装饰器 即：在方法上应用装饰器
- 静态字段 即：在类中定义值为property对象的静态字段  
<br>

- @装饰器（三个）

{% highlight python linenos %}
# ############### 定义 ###############
class Goods(object):
    @property
    def price(self):
        print '@property'

    @price.setter
    def price(self, value):
        print '@price.setter'

    @price.deleter
    def price(self):
        print '@price.deleter'

# ############### 调用 ###############
obj = Goods()

obj.price          # 自动执行 @property 修饰的 price 方法，并获取方法的返回值
obj.price = 123    # 自动执行 @price.setter 修饰的 price 方法，并将  123 赋值给方法的参数
del obj.price      # 自动执行 @price.deleter 修饰的 price 方法
{% endhighlight %}

- 静态字段方式，创建值为 property 对象的静态字段

{% highlight python linenos %}
class Foo:
    def get_bar(self):
        return 'Linrb'

    BAR = property(get_bar)

obj = Foo()
reuslt = obj.BAR        # 自动调用 get_bar 方法，并获取方法的返回值
print reuslt
{% endhighlight %}

property的构造方法中有个四个参数  
- 第一个参数是 `方法名` ，调用 `对象.属性` 时自动触发执行方法
- 第二个参数是 `方法名` ，调用 `对象.属性 ＝ XXX` 时自动触发执行方法
- 第三个参数是 `方法名` ，调用 `del 对象.属性` 时自动触发执行方法
- 第四个参数是 `字符串` ，调用 `对象.属性.\__doc__` ，此参数是该属性的描述信息

{% highlight python linenos %}
class Foo：

    def get_bar(self):
        return 'Linrb'

    # *必须两个参数
    def set_bar(self, value): 
        return return 'set value' + value

    def del_bar(self):
        return 'Linrb'

    BAR ＝ property(get_bar, set_bar, del_bar, 'description...')

obj = Foo()

obj.BAR              # 自动调用第一个参数中定义的方法：get_bar
obj.BAR = "zhuoxin"     # 自动调用第二个参数中定义的方法：set_bar方法，并将“zhuoxin”当作参数传入
del Foo.BAR          # 自动调用第三个参数中定义的方法：del_bar方法
obj.BAE.__doc__      # 自动获取第四个参数中设置的值：description...
{% endhighlight %}

