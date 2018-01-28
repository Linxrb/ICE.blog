---
title: Python 面向对象类的特殊成员
layout: post
---

* TOC
{:toc}

{% highlight Python linenos%}
__init__(self, *arg, **kwarg)     #构造方法，创建对象时自动执行
__del__(self)                     #析构方法，对象被消毁的时候执行。
__call__(self)                    #对象后面加括号自动执行，即：obj()  或  class()()
__int__(self)                     #int(obj) 时自动执行
__str__(self)                     #str(obj) 时自动执行
                                  #print(obj)，一般会返回对象名跟地址，加上 __str__ 方法可以返回一些清晰的信息，相当于pring(str(obj))
__add__(self,other)               #两个对象相加，会执行第一个对象的 __add__ 方法，并将第二个对象传入。
__dict__                          #obj/cla.__dict__：字典的形式返回对象中封装的所有内容
{% endhighlight %}