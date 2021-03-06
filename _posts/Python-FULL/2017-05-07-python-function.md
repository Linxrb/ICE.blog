---
title: Python 全栈系列之函数
layout: post
---

* TOC
{:toc}

### 函数介绍

函数 `(也叫 subroutine 子程序)` 是为了代码最大程度的重用和最小化代码冗余而提供的最基本的程序结构。
- 减少重复代码
- 方便修改，更易扩展
- 保持代码一致性

#### 创建语法

Python 定义函数使用 `def` 关键字，一般格式如下：

{% highlight python  linenos %}
def 函数名（参数）:
    函数体
{% endhighlight %}

- 简单实例

{% highlight python  linenos %}
# x为函数的参数
def num(x):
    print(x)

# 调用 123456等于x
num("123456")

# 结果
123456
{% endhighlight %}

#### 命名规则

命名规则和变量一样：
- 函数名必须以下划线或字母开头，可以包含任意字母、数字或下划线的组合。不能使用任何的标点符号
- 函数名是区分大小写的
- 函数名不能是保留字

#### 形参和实参

　　`形参` ：形式参数，不是实际存在，是虚拟变量。在定义函数时使用形参，目的是在函数调用时接收实参（实参个数，类型应与实参一一对应）。  

　　`实参` ：实际参数，调用函数时传给函数的参数，可以是常量，变量，表达式，函数。  

　　`区别` ：形参是虚拟的，不占用内存空间，形参变量只有在被调用时才分配内存单元，实参是一个变量，占用内存空间，数据传送单向，实参传给形参，不能形参传给实参。  

#### 函数的返回值

　　要想获取函数的执行结果，就可以用 `return` 语句把结果返回  
注意:
- 函数在执行过程中只要遇到 return 语句，就会停止执行并返回结果，so 也可以理解为 return 语句代表着函数的结束
- 如果未在函数中指定 return ,那这个函数的返回值为 None  
- return 多个对象，解释器会把这多个对象封装成一个元组作为一个整体结果输出。

### 函数的参数

- 位置参数
- 关键字参数
- 默认参数
- 动态参数

#### 位置参数

　　位置参数须以正确的顺序传入函数。<span style="border-bottom:1px dashed;">调用时的数量必须和声明时的一样。</span>

{% highlight python  linenos %}
def f(name,age):
    print('I am %s,I am %d'%(name,age))

f('ICE',18)
f('Linrb',16)
{% endhighlight %}

#### 关键字参数

　　关键字参数和函数调用关系紧密，函数调用使用关键字参数来确定传入的参数值。<span style="border-bottom:1px dashed ;">使用关键字参数允许函数调用时参数的顺序与声明时不一致</span>，因为 Python 解释器能够用参数名匹配参数值。

{% highlight python  linenos %}
def f(name,age):
    print('I am %s,I am %d'%(name,age))

# f(16,'Linrb') # 报错，%d 必须接受数字
f(age=16,name='Linrb')
{% endhighlight %}

#### 默认参数

　　调用函数时，默认参数的值如果没有传入，则被认为是默认值，使用默认值。下例会打印默认的age，如果age没有被传入

{% highlight python  linenos %}
def print_info(name,age,sex='male'):
    print('Name:%s'%name)
    print('age:%s'%age)
    print('Sex:%s'%sex)

print_info('ICE',18)
print_info('铁锤',40,'female')
{% endhighlight %}

#### 动态参数

- `第一种 *`：把接受到的所有参数组成一个元祖

{% highlight python  linenos %}
def ret(*args):
    print(args,type(args))
    
    # 取值
    # print(args[0]) # 11

ret(11,22,33)

# 结果
(11, 22, 33) <class 'tuple'>
{% endhighlight %}

- `第二种 **`：传参的时候是一个key对应一个value的，相当于一个字典的键值对，而且返回的类型就是字典类型

{% highlight python  linenos %}
def ret(**kwargs):
    print(kwargs,type(kwargs))
    
    # 取值
    print(kwargs['k3']) # ICE

ret(k1=123,k2=456,k3='ICE')

# 结果
{'k1': 123, 'k2': 456} <class 'dict'>
{% endhighlight %}

- `第三种 * 和 **`：可以接受任何参数

{% highlight python  linenos %}
def ret(*args,**kwargs):
    print(args,type(args))
    print(kwargs,type(kwargs))

ret(11,222,333,k1=111,k2=222)

# 结果
(11, 222, 333) <class 'tuple'>
{'k1': 111, 'k2': 222} <class 'dict'>
{% endhighlight %}

<span style="border-bottom:1px solid ;">注意：还可以这样传参</span>

{% highlight python  linenos %}
def f(*args):
    print(args)
 
f(*[1,2,5]) # 传入一个列表

# 结果
(1, 2, 5)

def f(**kargs):
    print(kargs)
 
f(**{'name':'ICE'}) # 传入一个字典

# 结果
{'name': 'ICE'}
{% endhighlight %}

<br>
> **优先级：`function(arg, kwarg, *args, **kwargs)`**  
> **位置参数 > 默认参数 > 不定长参数 > 关键字参数**  

### 作用域

#### 作用域介绍

python中的作用域分4种情况：
- L：`local`，局部作用域，即函数中定义的变量；
- E：`enclosing`，嵌套的父级函数的局部作用域，即包含此函数的上级函数的局部作用域，但不是全局的；
- G：`global`，全局变量，就是模块级别定义的变量；
- B：`built-in`，系统固定模块里面的变量，比如int, bytearray等。

<span style="border-bottom:2px solid ;">搜索变量的优先级：作用域局部L > 外层作用域E > 当前模块中的全局G > python内置作用域B，也就是LEGB。</span>

{% highlight python  linenos %}
x = int(2.9)             # int built-in
 
g_count = 0              # global
def outer():
    o_count = 1          # enclosing
    def inner():
        i_count = 2      # local
        print(o_count)
    # print(i_count) 找不到
    inner() 
outer()
 
# print(o_count) # 找不到
{% endhighlight %}
　　当然，local 和 enclosing 是相对的，enclosing 变量相对上层来说也是 local。

#### 作用域的产生

　　在 Python 中，只有 `模块(module)`，`类(class)` 以及 `函数(def、lambda)` 才会引入新的作用域，其它的代码块（如if、try、for等）是不会引入新的作用域的

{% highlight python  linenos %}
if 2 > 1:
    x = 1
print(x)  # 1
# 这个是没有问题的，if并没有引入一个新的作用域，x仍处在当前作用域中，后面代码可以使用。

def test():
    x = 2
print(x) # NameError: name 'x2' is not defined
# def、class、lambda是可以引入新作用域的。
{% endhighlight %}

#### 变量的修改

{% highlight python  linenos %}
#################
x = 6
def f2():
    print(x)
    x = 5
f2()    # 报错

# 报 local variable 'x' referenced before assignment.
# 看了就不能改
# 错误的原因在于print(x)时,解释器会在局部作用域找,会找到x=5(函数已经加载到内存),但x在声明前使用了,所以报错
# 如何证明找到了x=5呢? 简单:注释掉x=5,x=6
# 报错为:name 'x' is not defined

# 同理
x = 6
def f2():
    # x = x + 1
    x + = 1 # local variable 'x' referenced before assignment.
f2()
{% endhighlight %}

#### global 关键字

`enclosing` 中修改 `global(全局变量)`  
　　当修改的变量是在全局作用域（global作用域）上的，就要使用 global 先声明一下，代码如下：

{% highlight python  linenos %}
count = 10
def outer():
    global count
    print(count)   # 10
    count = 100
    print(count)   # 100
outer()
{% endhighlight %}

#### nonlocal 关键字

`local` 中修改 `enclosing`  
　　global 关键字声明的变量必须在全局作用域上，不能嵌套作用域上，当要修改嵌套作用域（enclosing作用域，外层非全局作用域）中的变量怎么办呢  
这时就需要 nonlocal 关键字了

{% highlight python  linenos %}
def outer():
    count = 10
    def inner():
        nonlocal count
        count = 20
        print(count)    # 20
    inner()
    print(count)    # 20
outer()
{% endhighlight %}


#### 匿名函数 lambda

　　关键字 `lambda` 表示匿名函数，冒号前面的 `x` 表示函数参数。  
　　匿名函数有个限制，就是只能有一个表达式，不用写return，返回值就是该表达式的结果。  
　　用匿名函数有个好处，因为函数没有名字，不必担心函数名冲突。此外，匿名函数也是一个函数对象，也可以把匿名函数赋值给一个变量，再利用变量来调用该函数：  

{% highlight python  linenos %}
f = lambda x: x * x
# f
<function <lambda> at 0x10453d7d0>
f(5)
# 25
{% endhighlight %}

### 小结

>（1）变量查找顺序：LEGB，作用域局部 > 外层作用域 > 当前模块中的全局 > python内置作用域；  
>（2）只有模块、类、及函数才能引入新作用域；  
>（3）对于一个变量，内部作用域先声明就会覆盖外部变量，不声明直接使用，就会使用外部作用域的变量；  
>（4）内部作用域要修改外部作用域变量的值时，全局变量要使用global关键字，嵌套作用域变量要使用nonlocal关键字。nonlocal是python3新增的关键字，有了这个 关键字，就能完美的实现闭包了。
