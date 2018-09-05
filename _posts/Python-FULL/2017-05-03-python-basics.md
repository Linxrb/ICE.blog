---
title: Python 全栈系列之开篇基础
layout: post
---

* TOC
{:toc}

### Python 的诞生

　　Python是著名的 `龟叔` `Guido van Rossum(吉多·范罗苏姆)` 在1989年圣诞节期间，为了打发无聊的圣诞节而编写的一个编程语言。  

![]({{site.baseurl}}/images/images/1483014338667.jpg '龟叔')  

　　`Guido van Rossum` 著名的一句话就是 `Life is short` , `you need Python` ，译为：`人生苦短，我用Python` ，一直到现在，无论在任何介绍Python这门强大的语言时，都会有提到。  

<br>

我们还可以再解释下下通过 `import this` 查看Python语言的设计哲学：

{% highlight python linenos %}
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
{% endhighlight %}

#### Python 简单入门

一般情况下程序猿的第一个小程序都是简单的输出 `Hello Word` !  

- 创建以py结尾的文件其内容为  

{% highlight python linenos %}
#!/usr/vin/env python

print "Hello Word!"
{% endhighlight %}

- 执行  

{% highlight bash linenos %}
[root@python_code]# python hello.py
Hello Word!
{% endhighlight %}

#### 指定字符编码

python制定字符编码的方式有多种，而编码格式是要写在解释器的下面的，常用的如下：  

{% highlight python linenos %}
第一种
#!/usr/bin/env python
# _*_ coding:utf-8 _*_

第二种
#!/usr/bin/env python
# -*- coding:utf-8 -*-

第三种
#!/usr/bin/env python
# coding:utf-8
{% endhighlight %}

#### 代码注释

{% highlight python linenos %}
单行注释

# 单行注释只需要在代码前面加上#号

# 注释内容

多行注释

# 多行注释用三个单引号或者三个双引号躲起来
# 多行注释也可以用作多行输出

"""
注释内容
"""
{% endhighlight %}

#### 什么是表达式？

　　1+2 就是一个表达式，这里的加号叫做运算符，1、2叫做操作数。1+2 经过计算后得到的结果是3，就1+2 = 3。我们可以将计算结果保存在一个变量里，ret = 1+2 。<span style="border-bottom:1px dashed;">所以表达式就是由操作数和运算符组成的一句代码或语句，表达式可以求值，可以放在“=”的右边，用来给变量赋值。</span>

#### Linux/Unix 用户需要注意的内容

特殊的注释：  
　　在某些Python文件中我们会看到文件的第一行是  

{% highlight python linenos %}
#!/usr/bin/env python
{% endhighlight %}

　　这一行是一个特殊的注释，他有特殊的作用，被称为 `Shebang`，一般在 linux/Unix 中出现。
　　Shebang 是一个由 “#”  和 “!” 构成的字符串行（#!），她出现在文件的第一行。当文件中出现 Shebang 时，Linux/Unix 操作系统的的程序载入器会分析 Shebang 的内容，将之后的内容作为解释器命令，并调用该执行，将载有 Shebang 的文件路径作为解释器的参数。在这里 #! 先用于帮助内核找到 Python 解释器，但是在导入模块的时候将会被忽略，因此，只有在直接执行的文件才有必要加入#! 。  

#### 如何获取用户的输入

有些程序是需要用户输入才能继续向下执行。  
- Python中获取用户输入的语句——input()  

{% highlight python linenos %}
var = input()
print(var)  # var 是一个字符串

var = input("请输入：")
{% endhighlight %}

#### 查看帮助 help

{% highlight python linenos %}
help(str)   # 查看str使用方法
help(str.isdigit)   # 查看某个方法的使用

>>> help(str.isdigit)
Help on method_descriptor:

isdigit(...)
    S.isdigit() -> bool

    Return True if all characters in S are digits
    and there is at least one character in S, False otherwise.
{% endhighlight %}

#### id

{% highlight python linenos %}
# 查看变量的内存地址
>>> s = 'hello world'
>>> id(s)
34391448
{% endhighlight %}

### 变量

变量的命名规则:  
- 变量名只能包含数字、字母、下划线
- 不能以数字开头
- 变量名不能使python内部的关键字
- 区分大小写
    
Python内部已占用的关键字

{% highlight python linenos %}
['and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'not', 'or', 'pass', 'print', 'raise', 'return', 'try', 'while', 'with', 'yield']
{% endhighlight %}

在Python中变量是如何工作的？  
- 变量在他第一次赋值时创建；
- 变量在表达式中使用时将被替换它们所定义的值；
- 变量在表达式中使用时必须已经被赋值，否则会报 `name 'xxx' is not defined`;
- 变量像对象一样不需要在一开始进行声明；

#### 可变类型与不可变类型

Python中可变类型与不可变类型是什么鬼。  
<br>

`不可变类型(数字、字符串、元组、不可变集合)`  
　　不可变的类型是不支持修改原数据的，每次对不可变类型的数据进行修改时都是重新创建一个对象然后赋值给变量。  

{% highlight python linenos %}
>>> s = "lx"
>>> id(s)
4320431664
>>> s = s + ',lx'
>>> id(s)
4320623168
>>> s
'lx,lx'
{% endhighlight %}

`可变类型(列表、字典、可变集合)`  
　　而可变类型是支持修改源数据，而不用重新创建新的对象

{% highlight python linenos %}
>>> L = [1,2]
>>> id(L)
4320613768
>>> L[0] = 2
>>> id(L)
4320613768
>>> L
[2, 2]
{% endhighlight %}

#### 动态类型

　　如下如语句中我声明了一个变量age，值为99

{% highlight python linenos %}
>>> age = 99
>>> age
99
>>> type(99)
# 数字类型
<class 'int'>
{% endhighlight %}

　　上述代码中我给 age 赋值为99，但是并没有指定它的值为数字类型，那么 Python 怎么知道他是一个数字类型呢？其实，你会发现，Python 在运行的过程中已经决定了这个值是什么类型，而不用通过指定类型的方式。  

#### 变量的赋值

{% highlight python linenos %}
#!/usr/bin/env python
#-*- coding:utf-8 -*-
 
name1 = "Nick"
name2 = "Suo"
{% endhighlight %}

![]({{site.baseurl}}/images/images/932699-20160428214238361-1627027251.png)  

{% highlight python linenos %}
#!/usr/bin/env python
#-*- coding:utf-8 -*-
 
name1 = "Nick"
name2 = name1
{% endhighlight %}

![]({{site.baseurl}}/images/images/932699-20160428214355127-335369088.png)  
