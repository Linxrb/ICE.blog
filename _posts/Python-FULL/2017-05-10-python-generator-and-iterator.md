---
title: Python 全栈系列之生成器与迭代器
layout: post
---

<div id='toggle'></div>

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**[概要](#z1)**|容器|可迭代对象|
|**[生成器](#z2)**|
|**[迭代器](#z3)**|
|**[小结](#z4)**|

<h3 id='z1'>一、概要</h3>

在了解Python的数据结构时，`容器(container)` 、`可迭代对象(iterable)` 、`迭代器(iterator)` 、`生成器(generator)` 、`列表/集合/字典推导式(list,set,dict comprehension)` 众多概念参杂在一起，
难免一头雾水，这篇文章将这些概念以及它们之间的关系捋清楚。

#### 容器(container)

**容器是一种把多个元素组织在一起的数据结构，容器中的元素可以逐个地迭代获取**，  
可以用 `in` , `not in` 关键字判断元素是否包含在容器中。通常这类数据结构把所有的元素存储在内存中。  
在 Python 中，插件的容器对象有：`list` `set` `dict` `tuple` `str`  
容器比较容易理解，因为你就可以把它看作是一个盒子、一栋房子、一个柜子，里面可以塞任何东西。  
从技术角度来说，当它可以用来询问某个元素是否包含在其中时，那么这个对象就可以认为是一个容器，比如 list，set，tuples都是容器对象：
```python
5 in [1,2,3,4,5]    #True
```
尽管绝大多数容器都提供了某种方式来获取其中的每一个元素，但这并不是容器本身提供的能力，  
**而是可迭代对象赋予了容器这种能力**，当然并不是所有的容器都是可迭代的。

#### 可迭代对象(iterable)

如果给定一个 list 或 tuple，我们可以通过 for 循环来遍历这个 list 或 tuple，这种遍历我们称为迭代（Iteration）。  
前面说过，很多容器都是可迭代对象，此外还有更多的对象同样也是可迭代对象，比如处于打开状态的 files，sockets 等等。  
**但凡是可以返回一个迭代器（实现了 `__iter__` 方法）的对象都可称之为可迭代对象。**  
看起来起来可能有点困惑，没关系，可迭代对象与迭代器有一个非常重要的区别。先看一个例子：  
```python
x = [1,2,3,4,5]
y = iter(x)
print(next(y))  #1
print(next(y))  #2
print(type(x))  #<class 'list'>
print(type(y))  #<class 'list_iterator'>
```
这里 x 是一个可迭代对象，可迭代对象和容器一样是一种通俗的叫法，并不是指某种具体的数据类型，  
list是可迭代对象，dict是可迭代对象，set也是可迭代对象。 y 是个独立的迭代器，  
迭代器内部持有一个状态，该状态用于记录当前迭代所在的位置，以方便下次迭代的时候获取正确的元素。  
迭代器有一种具体的迭代器类型，比如 list_iterator ， set_iterator 。可迭代对象实现了 `__iter__` .  
可以使用 `isinstance()` 判断一个对象是否是 `Iterable` 对象：
```python
from collections import Iterable

isinstance([], Iterable)        #True
isinstance({}, Iterable)        #True
isinstance('abc', Iterable)     #True
isinstance((x for x in range(10)), Iterable)        #True
isinstance(100, Iterable)       #False
```

<h3 id='z2'>二、生成器(generator)</h3>

普通函数用 return 返回一个值，然而在 Python 中还有一种函数，用关键字 `yield` 来返回值，这种函数叫做生成器函数。  
函数被调用时会返回一个生成器对象，**生成器本质上还是一个迭代器**，也是用在迭代操作，因此它有和迭代器一样的特性。  
唯一的区别在于实现的方式上不一样，这种更简洁优雅。  

Python 有两种不同的方式提供生成器：
- `生成器表达式`：类似于列表推导式，但是生成器返回按需生产结果的一个对象，而不是一次性构建一个结果列表。
- `生成器函数`：常规函数定义，但是，使用 `yield` 语句而不是 return 语句返回结果，yield 语句每次返回一个结果，每个结果中间，挂起函数的状态，以便下次从它离开的地方继续执行。  

**第一种方法很简单，只要把一个列表生成式的[]改成()，就创建了一个generator：**
```python
L = [x * x for x in range(10)]
L       #[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
g = (x * x for x in range(10))
g       #<generator object <genexpr> at 0x1022ef630>
```
创建 L 和 g 的区别仅在于最外层的 [] 和 ()，L 是一个 list，而 g 是一个 `generator` 。  
我们可以直接打印出 list 的每一个元素，但我们怎么打印出 generator 的每一个元素呢？  
如果要一个一个打印出来，可以通过 next() 函数获得 generator 的下一个返回值：  
```python
next(g)     #0
next(g)     #1
next(g)     #4
next(g)     #9
...
next(g)

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```
generator 保存的是算法，每次调用 next(g)，就计算出 g 的下一个元素的值，  
直到计算到最后一个元素，没有更多的元素时，抛出 StopIteration 的错误。  
当然，正确的方法是使用 for 循环，因为 generator 也是可迭代对象：
```python
g = (x * x for x in range(10))
for n in g:
    print(n)
```
所以，我们创建了一个 generator 后，基本上永远不会调用 next() ，而是通过 for 循环来迭代它，并且不需要关心 StopIteration 的错误。  
**第二种方式：如果推算的算法比较复杂，用类似列表生成式的 for 循环无法实现的时候，还可以用函数来实现。**  
最简单的生成器函数：
```python
def func(n):
    yield n*3
    
    yield n*5
    
print(func)     #<function func at 0x1022ef630>
g = func(5)
print(g)        #<generator object func at 0x102289790ef630>

```
func 就是一个`生成器函数`，调用该函数返回对象就是一个`生成器 g` ，  
这个生成器对象的行为和迭代器一样，可以用在 for 循环等场景中，  
注意 yield 对应的值在函数被调用时不会立即返回，而是调用 next() 方法时（本质上 for 循环也是调用 next() 方法）才返回。
```python
g = func(5)

g.__next__()       #15
next(g)            #25

g = func(5)
for i in g:
    pass
```
**用生成器来实现斐波那契数列的例子是**
```python
def fab(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1

for n in fab(5):
    pass
```
fib 就是一个普通的 python 函数，它特殊的地方在于函数体中没有 return 关键字，  
函数的返回值是一个生成器对象。当执行 f=fib(5) 返回的是一个生成器对象，  
此时函数体中的代码并不会执行，只有显示或隐示地调用next的时候才会真正执行里面的代码。  
`yield` 的作用就是把一个函数变成一个 `generator`，  
带有 yield 的函数不再是一个普通函数，Python 解释器会将其视为一个 generator，  
在 for 循环执行时，每次循环都会执行 fab 函数内部的代码，执行到 yield b 时，fab 函数就 `返回一个迭代值` ，  
下次迭代时，代码从 yield b 的下一条语句继续执行，直到再次遇到 yield。  
看起来就好像一个函数在正常执行的过程中被 yield 中断了数次，每次中断都会通过 yield 返回当前的迭代值。  
也可以手动调用 fab(5) 的 next() 方法（因为 fab(5) 是一个 generator 对象，  
该对象具有 next() 方法，这样我们就可以更清楚地看到 fab 的执行流程：
```python
f = fab(3)
f.__next__()        #1
f.__next__()        #1
f.__next__()        #2
f.__next__()
 
Traceback (most recent call last):
  File "<pyshell#62>", line 1, in <module>
    f.next()
StopIteration
```

`关于 return`  
在一个生成器中，如果没有 return，则默认执行到函数完毕。  
如果遇到 return ,如果在执行过程中 return，则直接抛出 StopIteration 终止迭代。  
如果想要拿到返回值，必须捕获 StopIteration 错误，返回值包含在 StopIteration 的 value 中：
```python
>>> g = fib(6)
>>> while True:
...     try:
...         x = next(g)
...         print('g:', x)
...     except StopIteration as e:
...         print('Generator return value:', e.value)
...         break
...
g: 1
g: 1
g: 2
g: 3
g: 5
g: 8
Generator return value: done
```
`send 的工作方式`
```python
def f():
    print("ok")
    s=yield 7
    print(s)
    yield 8

f=f()
print(f.send(None))
print(next(f))

#print(f.send(None))等同于print(next(f)),
#执行流程:打印ok,yield7,当再next进来时:将None赋值给s,然后返回8,可以通过断点来观察   
```

<h3 id='z3'>三、迭代器</h3>
> 顾名思义，迭代器就是用于迭代操作（for循环）的对象，它像列表一样，可以迭代获取其中的每一个元素。  
> 任何实现了 `__next__` 方法（Python2 是 next）的对象都称为迭代器。  
> 它是一个带状态的对象，它能在你调用 `next()` 方法的时候返回容器中的下一个值。  
> 它与列表的区别在于，构建迭代器的时候，不像列表把所有元素一次性加载到内存，而是以一种延迟计算的方式返回元素（所谓延迟操作，是指需要的时候才产生结果，而不是立即产生结果）。  
> 比如列表中含有一千万个元素，需要占用400M内存，而迭代器只需要几十个字节的空间。  
> 因为它并没有把所有元素装载到内存中，而是等到调用 `next()` 方法时才返回该元素。（本质上 for 循环就是不断的调用迭代器的 next 方法）。  

我们已经知道，可以直接作用于 for 循环的数据类型有以下几种：
- 一类是集合数据类型，如 list、tuple、dict、set、str 等；
- 一类是generator，包括生成器和带 yield 的 generator function 。

这些可以直接作用于for循环的对象统称为可迭代对象：`Iterable` 。  
而生成器不但可以作用于 for 循环，还可以被 next() 函数不断调用并返回下一个值，直到最后抛出 `StopIteration` 错误表示无法继续返回下一个值了。  
**可以被 `next()` 函数调用并不断返回下一个值的对象称为迭代器：`Iterator` 。**  
可以使用 `isinstance()` 判断一个对象是否是 `Iterator` 对象：
```python
from collections import Iterator

isinstance((x for x in range(10)), Iterator)    #True
isinstance([], Iterator)                        #False
isinstance({}, Iterator)                        #False
isinstance('abc', Iterator)                     #False
```
生成器都是 Iterator 对象，但 list、dict、str 虽然是 Iterable ，却不是 Iterator。  
把 list、dict、str 等 Iterable 变成 Iterator 可以使用 `iter()` 函数：
```python
isinstance(iter([]), Iterator)      #True
isinstance(iter('abc'), Iterator)   #True
```
> 为什么 list、dict、str 等数据类型不是 Iterator ？  
> 这是因为 Python 的 Iterator 对象表示的是一个数据流，  
> Iterator 对象可以被 next() 函数调用并不断返回下一个数据，直到没有数据时抛出 StopIteration 错误。  
> 可以把这个数据流看做是一个有序序列，但我们却不能提前知道序列的长度，  
> 只能不断通过 next() 函数实现按需计算下一个数据，所以 Iterator 的计算是惰性的，  
> 只有在需要返回下一个数据时它才会计算。  
> Iterator 甚至可以表示一个无限大的数据流，例如全体自然数。而使用 list 是永远不可能存储全体自然数的。

<h3 id='z4'>小结</h3>

凡是可作用于 for 循环的对象都是 Iterable 类型；  
凡是可作用于 next() 函数的对象都是 Iterator 类型，它们表示一个惰性计算的序列；
集合数据类型如 list、dict、str 等是 Iterabe 但不是 Iterator ，不过可以通过 iter() 函数获得一个 Iterator 对象。
Python 的for 循环本质上就是通过不断调用 next() 函数实现的，例如：
```python
for x in [1, 2, 3, 4, 5]:
    pass

实际上完全等价于：

#首先获得Iterator对象:
it = iter([1, 2, 3, 4, 5])
#循环:
while True:
    try:
        # 获得下一个值:
        x = next(it)
    except StopIteration:
        # 遇到StopIteration就退出循环
        break
```

**迭代器为什么要有 __next__ 和 __iter__？**  
这是个和多态有关的问题，Python中关于迭代有两个概念，第一个是 Iterable，第二个是 Iterator，  
`协议规定 Iterable 的__iter_ 方法会返回一个 Iterator` ,  
Iterator 的__next__方法（Python 2里是next）会返回下一个迭代对象，如果迭代结束则抛出 StopIteration 异常。  
`同时，Iterator 自己也是一种 Iterable，所以也需要实现 Iterable 的接口，也就是__iter__ `，  
这样在 for 当中两者都可以使用。Iterator 的__iter__只需要返回自己就行了。  
**那么为什么不只保留Iterator的接口而还需要设计Iterable呢？**  
许多对象比如 list、dict，是可以重复遍历的，甚至可以同时并发地进行遍历，  
通过__iter__每次返回一个独立的迭代器，就可以保证不同的迭代过程不会互相影响。  
而生成器表达式之类的结果往往是一次性的，不可以重复遍历，所以直接返回一个 Iterator 就好。  
让 Iterator 也实现 Iterable 的兼容就可以很灵活地选择返回哪一种。  
总结：Iterator 实现的__iter__是为了兼容 Iterable 的接口，从而让 Iterator 成为 Iterable 的一种实现。

