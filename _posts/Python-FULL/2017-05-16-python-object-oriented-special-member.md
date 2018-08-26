---
title: Python 面向对象类的特殊成员
layout: post
---

<br><br>

{% highlight Python linenos%}
__init__(self, *arg, **kwarg)     # 构造方法，创建对象时自动执行。
__del__(self)                     # 析构方法，对象被消毁的时候执行。
__call__(self)                    # 对象后面加括号自动执行，即：obj()  或  class()()。
__int__(self)                     # int(obj) 时自动执行。
__str__(self)                     # str(obj) 时自动执行。print(obj),会输出它的返回值
                                  # print(obj)，一般会返回对象名跟地址，加上 __str__ 方法可以返回一些清晰的信息，相当于pring(str(obj))。
__add__(self,other)               # 两个对象相加，会执行第一个对象的 __add__ 方法，并将第二个对象传入。
__dict__                          # obj/cla.__dict__：字典的形式返回对象中封装的所有内容。
__getitem__(self, item)           # obj[9]，自动执行，并将 9 传给 item。
__setitem__(self, key, value)     # obj[9] = 99，自动执行，并将 9 传给 key，99 传给 value。
__delitem__(self, key)            # del obj[9]， 自动执行，并将 9 传给 key。
# 如果上面三个中括号里传的是[3:5:9]类似切片的值，就会把它封装成一个slice对象
# 可以通过 item.start   key.stop   key.step  取值
__iter__(self)                    # 循环对象的时候自动执行对象的类中的__iter__方法，返回值是个迭代器 return iter(obj)
# 类中有这个方法，那么它就是可迭代对象，obj.__iter__()返回一个迭代器，for循环。。。
{% endhighlight %}