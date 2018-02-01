---
title: Python 全栈系列之反射
layout: post
---

* TOC
{:toc}

反射的定义：以字符串的形式操作对象中的成员
- `getattr(obj, name, [default])`：根据字符串的形式去一个对象中获取成员
- `setattr(obj, name, value )`：根据字符串的形式去一个对象中设置成员
- `hasattr(obj, name)`：根据字符串的形式判断对象成员是否存在
- `delattr(obj, name)`：根据字符串的形式去一个对象中删除成员  


{% highlight python linenos %}
commons.py
Blog_Url = "http://zhuoxin.me"

def f1():
    return "F1"

def f2():
    return "F2"

##########################################
getattr(object, name[, default])

获取方法
>>> import commons
>>> getattr(commons, "f1")
<function f1 at 0x7fbce5774598>

找不到报错
>>> getattr(commons, "f1f1f1")  
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: module 'commons' has no attribute 'f1f1f1'

执行获取到的方法
>>> target_func = getattr(commons, "f1")
>>> target_func
<function f1 at 0x7fbce5774598>
>>> target_func() 
'F1'

设置一个默认值为None避免获取不到方法时报错
>>> target_func = getattr(commons, "f1f1f1", None)

##########################################
setattr(object, name, value)

设置一个全局变量
# 获取commons内的Name变量
>>> getattr(commons, "Name", None)
# 在commons模块中设置一个全局变量Name，值为Linrb
>>> setattr(commons, "Name", "Linrb")
# 获取commons内的Name变量
>>> getattr(commons, "Name", None)
'Linrb'

结合lambda表达式设置一个函数
>>> setattr(commons, "zx", lambda : print("zx"))
>>> getattr(commons, "zx")
<function <lambda> at 0x000001FD3E51FD90>
>>> aa = getattr(commons, "zx")
>>> aa()
zx

##########################################
delattr(object, name)

>>> getattr(commons, "Name")
'Linrb'
>>> delattr(commons, "Name")
# 获取不到就报错
>>> getattr(commons, "Name")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: module 'commons' has no attribute 'Name'

##########################################
hasattr(object, name)

根据字符串的形式去一个对象中判断成员是否存在
# 如果不存在就返回False
>>> hasattr(commons, "Name")
False
>>> setattr(commons, "Name", "Linrb")
# 如果存在就返回True
>>> hasattr(commons, "Name")
True
{% endhighlight %}

