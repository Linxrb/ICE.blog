---
title: Python 全栈系列之异常处理
layout: post
---

* TOC
{:toc}

<br><br>

　　当程序出现错误的时候，进行捕捉，然后根据捕捉到的错误信息进行对应的处  
- 基本语法

{% highlight python linenos %}
try:
    正常执行
except ValueError as e:
    如果上面代码 ValueError 执行
except Exception as e:
    如果不是 ValueError，而是其他异常执行
else:
    如果没异常，执行
finally:
    不管有没有异常，最后都要执行
{% endhighlight %}

### 初识异常处理

如下面的例子：  
　　让用户进行输入，提示用户输入一个数字，如果输入的事一个数字那个就把输入的数字转换为int类型，然后输出用户输入的而数字，
如果用户输入的不是一个数字，那么类型转换就会出错，如果出错，就提示用户“输入类型错误，你因该输入的是一个数字。”

{% highlight python linenos %}
while True:
    try:
        n = int(input("请输出一个数字>>> "))
        print("你输入的数字是",n)

    # e是Exception的对象，Exception是一个类
    except Exception as e:
        print("输入类型错误，你因该输入的是一个数字。")
{% endhighlight %}

　　`Exception` 类似终极大boss... ，只要 `try` 中代码块有错误，所有的会被捕获，异常类型有很多种，看下面。




### 主动触发异常

　　为什么要主动触发异常，看下面例子：  

{% highlight python linenos %}
# 数据库处理函数
def db():
    return

def temp():
    try:
        r = input()
        int(r)
        
        result = db()
        if not result:
            # 如果数据库执行异常，就记录日志
            # open("log","a").write("数据库处理异常")
            
            # 主动触发异常,让下面记录就好
            raise Exception("数据库处理异常")
    except Exception as e:
        str_e = str(e)
        open("log","a").write(str_e)
{% endhighlight %}

### 断言

　　如果条件成立则继续执行，如果条件不成立则报错。

{% highlight python linenos %}
# assert关键字，后面的是条件
>>> assert 1 == 1
>>> assert 1 == 2
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AssertionError
{% endhighlight %}

### 自定义异常

　　用户自定义的异常通过类编写，且通常需要继承 `Exception` 内置的异常类，基于类的异常允许脚本建立异常类型、继承行为以及附加状态信息。  

{% highlight python linenos %}
class MyError(Exception):
    def __str__(self):
        return '出错啦.'
 
try:
    raise MyError()
except MyError as e:
    print(e)

出错啦.
{% endhighlight %}

### 异常分类

- 常用

{% highlight python linenos %}
AttributeError      # 试图访问一个对象没有的树形，比如foo.x，但是foo没有属性x
IOError             # 输入/输出异常；基本上是无法打开文件
ImportError         # 无法引入模块或包；基本上是路径问题或名称错误
IndentationError    # 语法错误（的子类） ；代码没有正确对齐
IndexError          # 下标索引超出序列边界，比如当x只有三个元素，却试图访问x[5]
KeyError            # 试图访问字典里不存在的键
KeyboardInterrupt   # Ctrl+C被按下
NameError           # 使用一个还未被赋予对象的变量
SyntaxError         # Python代码非法，代码不能编译(个人认为这是语法错误，写错了）
TypeError           # 传入对象类型与要求的不符合
UnboundLocalError   # 试图访问一个还未被设置的局部变量，基本上是由于另有一个同名的全局变量，导致你以为正在访问它
ValueError          # 传入一个调用者不期望的值，即使值的类型是正确的
{% endhighlight %}

对不同的异常进行不同的处理：

{% highlight python linenos %}
try:
    n = int(input("请输出一个数字>>> "))
except ValueError as e:
    print("ValueError错误")
except Exception as e:
    print("出现异常")
{% endhighlight %}

捕获多个错误

{% highlight python linenos %}
try:
    raise IndexError('出错了')
except (IndexError, NameError) as e:  # 捕获括号内的错误，并把错误信息赋值给e
    print(e)
{% endhighlight %}