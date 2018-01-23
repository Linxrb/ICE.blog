---
title: Python 全栈系列之装饰器
layout: post
---

* TOC
{:toc}

### 装饰器前戏之闭包

首先要知道，函数名是可以和变量一样当做函数的参数传进的，也可以赋值给其他变量：

{% highlight python linenos %}
def foo():
    print('foo')
bar = foo
bar()
foo()
print(id(foo),id(bar))  #4321123592 4321123592
{% endhighlight %}

> 注意：这里说的函数都是指函数名，比如 `foo`；而 `foo()` 已经执行函数了，foo() 是什么类型取决于 return 的内容是什么类型！！！

- 看一个小问题：

{% highlight python linenos %}
#想执行inner函数,两种方法
def outer():
     x = 1
     def inner():
         print (x) #1
     #inner()      #2
     return inner
 
#outer()             #返回inner
in_func = outer()      #
in_func()            #inner()
{% endhighlight %}

- 提问1：下面两种调用方式有什么不同？不都是在外面调用inner吗？

{% highlight python linenos %}
#1
in_func = outer()
in_func()       #in_func = inner

###########

#2
inner()         #(已经加载到内存啦) 可不可以直接调用呢？
{% endhighlight %}

往下看

{% highlight python linenos %}
def outer():
     x = 1
     def inner():
         print (x)
     return inner
     
#inner()           #1 直接调用报错原因:找不到这个引用变量  作用域，只能在outer函数内调用
in_func = outer()    #2 yes  这里其实就是一个变量赋值,将inner的引用对象赋值给in_func,类似于a=5,b=a一样
                   #3 直接赋值不行吗？: in_func=inner?  inner不还是找不到吗,对吧，参考1
in_func()
{% endhighlight %}

- 提问2：看下面代码：

{% highlight python linenos %}
def outer():
    x = 1    #函数outer执行完毕即被销毁
print(x)   #报错
{% endhighlight %}

既然这样，`inner()` 执行的时候 `outer` 函数已经执行完了，为什么 inner 还可以调用 outer 里的变量 `x` 呢？  

> 这就涉及到闭包了！闭包就是为了解释这一现象。  
> 因为：outer 里 return 的 inner 是一个闭包函数，有 x 这个环境变量。  
> 那么什么是闭包呢？  
> 闭包(closure)是函数式编程的重要的语法结构。  
> <span style="border-bottom:1px solid">定义：如果在一个内部函数里，对在外部作用域（但不是在全局作用域）的变量进行引用，那么内部函数就被认为是闭包(closure)。</span>  
> 如上实例，inner 就是内部函数，inner 里引用了外部作用域的变量 x（x在外部作用域outer里面，不是全局作用域），  
> 这个内部函数inner就是一个闭包。  
> <span style="border-bottom:1px solid">用途1：当闭包执行完后，仍然能够保持住当前的运行环境。</span>  
> <span style="border-bottom:1px solid">用途2：闭包可以根据外部作用域的局部变量来得到不同的结果，这有点像一种类似配置功能的作用。</span>  

### 装饰器

　　装饰器本质上是一个函数，该函数用来处理其他函数，它可以让其他函数在不需要修改代码的前提下增加额外的功能。装饰器的返回值也是一个函数对象。
它经常用于有切面需求的场景，比如：插入日志、性能测试、事务处理、缓存、权限校验等应用场景。
装饰器是解决这类问题的绝佳设计，有了装饰器，我们就可以抽离出大量与函数功能本身无关的雷同代码并继续重用。  
<span style="border-bottom:1px solid">概括的讲，装饰器的作用就是为已经存在的对象添加额外的功能。</span>

#### 举例

**现在，根据需求一步步往下看：**  

业务生产中大量调用的函数：

{% highlight python linenos %}
def foo():
    print('hello foo')
foo()
{% endhighlight %}

现在有一个新的需求，希望可以记录下函数的执行时间，于是在代码中添加日志代码：

{% highlight python linenos %}
import time
def foo():
    start_time = time.time()
    print('hello foo')    #<<< 这是要记录下执行时间的代码
    time.sleep(3)
    end_time = time.time()
    print('spend %s'%(end_time-start_time))

foo()
{% endhighlight %}

　　如果函数 bar()、bar2() 也有类似的需求，怎么做？再在bar函数里调用时间函数？  
这样就造成大量雷同的代码，为了减少重复写代码，可以这样做，重新定义一个函数：专门设定时间:

{% highlight python linenos %}
import time
def show_time(func):
    start_time = time.time()
    func()    #foo()    <<< 这是要记录下执行时间的代码
    end_time = time.time()
    print('spend %s'%(end_time-start_time))

def foo():
    print('hello foo')
    time.sleep(3)

show_time(foo)
{% endhighlight %}

> 逻辑上不难理解，而且运行正常。  
> 但是这样的话,基础平台的函数修改了名字，因为每次都要将一个函数作为参数传递给show_time函数。  
> 而且这种方式已经破坏了原有的代码逻辑结构，之前执行业务逻辑时，执行运行foo()，但是现在不得不改成show_time(foo)。  
> 那么有没有更好的方式的呢？当然有，答案就是装饰器。  

#### 简单装饰器

`if  foo() == show_time(foo)`：问题解决!  
　　所以，我们需要 show_time(foo) 返回一个函数对象。而这个函数对象内则是核心业务函数:执行 func() 与装饰函数时间计算，修改如下：

{% highlight python linenos %}
import time

def show_time(func):
    def wrapper():
        start_time = time.time()
        func()
        end_time = time.time()
        print('spend %s'%(end_time-start_time))
 
    return wrapper


def foo():
    print('hello foo')
    time.sleep(3)

foo = show_time(foo)    #返回wrapper
foo()
{% endhighlight %}

　　函数 `show_time` 就是装饰器，它把真正的业务方法 `func` 包裹在函数里面，看起来像 foo 被上下时间函数装饰了。在这个例子中，函数进入和退出时 ，被称为一个横切面(Aspect)，这种编程方式被称为 `面向切面的编程(Aspect-Oriented Programming)`。　  
<br>
<span style="border-bottom:1px solid">`@` 符号是装饰器的语法糖，在定义函数的时候使用，避免再一次赋值操作</span>

{% highlight python linenos %}
import time

def show_time(func):
    def wrapper():
        start_time = time.time()
        func()
        end_time = time.time()
        print('spend %s'%(end_time-start_time))

    return wrapper

#它会把下面的函数名 foo 当做参数赋给 show_time 的参数
@show_time   #foo = show_time(foo)
def foo():
    print('hello foo')
    time.sleep(3)

#同上
@show_time  #bar = show_time(bar)
def bar():
    print('in the bar')
    time.sleep(2)

foo()
print('***********')
bar()
{% endhighlight %}

> 如上所示，这样我们就可以省去 bar = show_time(bar)这一句了。  
> 直接调用 bar() 即可得到想要的结果。如果我们有其他的类似函数，我们可以继续调用装饰器来修饰函数，而不用重复修改函数或者增加新的封装。  
> 这样，我们就提高了程序的可重复利用性，并增加了程序的可读性。  
> 这里需要注意的问题：foo=show_time(foo) 其实是把 wrapper 引用的对象引用给了foo
而 wrapper 里的变量 func 之所以可以用，就是因为 `wrapper` 是一个 `闭包函数` 。  

![]({{site.baseurl}}/images/images/877318-20160902104406636-1527359205.png)  
`@show_time` 帮我们做的事情就是当我们执行业务逻辑 `foo()` 时，<span style="border-bottom:1px solid">执行的代码由粉框部分转到蓝框部分</span>，仅此而已！

#### 带参数的被装饰函数

{% highlight python linenos %}
import time

def show_time(func):

    def wrapper(a,b):    #如果被装饰的函数是不定长参数，这里也可以是 *args **kwargs
        start_time = time.time()
        func(a,b)
        end_time = time.time()
        print('spend %s'%(end_time-start_time))

    return wrapper

@show_time   #add = show_time(add)
def add(a,b):

    time.sleep(1)
    print(a+b)

add(9,99)
{% endhighlight %}

#### 带参数的装饰器

装饰器还有更大的灵活性，例如带参数的装饰器：  
　　在上面的装饰器调用中，比如 @show_time，该装饰器唯一的参数就是执行业务的函数。装饰器的语法允许我们在调用时，提供其它参数，比如 @decorator(a)。这样，就为装饰器的编写和使用提供了更大的灵活性。

{% highlight python linenos %}
import time
 
def time_logger(flag = 0):
 
    def show_time(func):
 
            def wrapper(*args,**kwargs):
                start_time = time.time()
                func(*args,**kwargs)
                end_time = time.time()
                print('spend %s'%(end_time-start_time))
 
                if flag:
                    print('将这个操作的时间记录到日志中')
 
            return wrapper
 
    return show_time
 
 
@time_logger(3)
def add(*args,**kwargs):
    time.sleep(1)
    sum = 0
    for i in args:
        sum += i
    print(sum)
 
add(2,7,5)
{% endhighlight %}

> `@time_logger(3)` 做了两件事：  
> （1）time_logger(3)：得到闭包函数show_time，里面保存环境变量flag。  
> （2）@show_time   ：add＝show_time(add)。  
> 上面的 time_logger 是允许带参数的装饰器。  
> 它实际上是对原有装饰器的一个函数封装，**并返回一个装饰器**(一个含有参数的闭包函数)。  
> 当我们使用 @time_logger(3) 调用的时候，Python能够发现这一层的封装，并把参数传递到装饰器的环境中。  

#### 多层装饰器

执行步骤：

{% highlight python linenos %}
def makebold(fn):
    def wrapper2():
        return "<b>" + fn() + "</b>"
    return wrapper
 
def makeitalic(fn):
    def wrapper1():
        return "<i>" + fn() + "</i>"
    return wrapper
 
@makebold           #步骤二：hello = makebold(hello)     此时 hello = wrapper1     return wrapper2
@makeitalic         #步骤一：hello = makeitalic(hello)   return wrapper1
def hello():
    return "hello Linrb"
 
hello()     #<b><i>hello Linrb</i></b>
{% endhighlight %}