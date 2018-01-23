---
title: Python 全栈系列之赋值与运算符
layout: post
---

* TOC
{:toc}

### 运算符

定义两个变量，分别是a和b，a的值是10，b的值是20。

#### 算术运算符

{% highlight python linenos %}
+   加      两个对象相加    a+b=30
-   减      两个对象相减,可能会得到负数    a-b=-10
*   乘      两数相称或是返回一个被重复若干次的字符串  a*b=200
/   除      两个对象相除    b/a=2
%   取余    返回除法的余数    b%a=0
**  幂      返回a的b次幂   a**b=100000000000000000000L
//  整除余  返回商的整数部分    a//b=0
{% endhighlight %}

#### 比较运算符

{% highlight python linenos %}
==    等于    比较两个对象是否相等    a==b 返回 False
!=    不等于   比较两个对象是否不相等    a!=b 返回 True
<>    不等于   比较两个对象是否不相等    a<>b 返回 True
>     大于     比较a是否大于b    a>b 返回 False
<     小于     比较a是否小于b    a<b 返回 True
>=    大于等于    比较a是否大于等于b    a>=b 返回 False
<=    小于等于    比较a是否小于等于b    a<=b 返回 True
{% endhighlight %}

#### 赋值运算符

{% highlight python linenos %}
=     赋值运算符     c=a+b,将a+b的运算结果赋值给c
+=    加法复制运算符   c+=a 等效于 c=c+a
-=    减法复制运算符   c-=a 等效于 c=c-a
*=    乘法复制运算符   c*=a 等效于 c=c*a
/=    除法复制运算符   c/=a 等效于 c=c/a
%=    取模赋值运算符   c%=a 等效于 c=c%a
**=   幂赋值运算符    c**=a 等效于 c=c**a
//=   取整除赋值运算符      c//=a 等效于 c=c//a
{% endhighlight %}

#### 逻辑运算符

{% highlight python linenos %}
and    “与”  a and b返回true
or     “或”   a or b返回true
not    “非”  not(a and b)返回false
{% endhighlight %}

#### 成员运算符

{% highlight python linenos %}
in    如果在指定的序列中找到值返回True，否则返回False
not in    如果在指定的序列中没有找到值返回True，否则返回false

li = [1,2,3]
print(3 in li)    #Ture
print(3 not in li)    #False
{% endhighlight %}

### 变量赋值实例

{% highlight python linenos %}
序列运算

>>> nudge = 1
>>> wink = 2
>>> A, B = nudge, wink
>>> A,B
(1, 2)
# 嵌套的方式
>>> ((a, b), c) = ('SP', 'AM')
>>> a, b, c
('S', 'P', 'AM')

扩展

一个列表赋给了带星号的名称，该列表收集了序列中没有赋值给其他名称的所有项。

先定义一个 seq 序列用于测试:

>>> seq = [1, 2, 3, 4]
#a匹配序列中的第一项，b匹配剩下的内容
>>> a, *b = seq
>>> a, b
(1, [2, 3, 4])

#b匹配序列中的最后一项，a匹配序列中最后一项之前的所有内容
>>> *a, b = seq
>>> a,b
([1, 2, 3], 4)

#第一项个最后一项分别赋值给了a和c，而b获取了二者之间的所有内容。
>>> *a, b, c = seq
>>> a,b,c
([1, 2], 3, 4)

#带星号的名称可能只匹配单个的项，但是，总会向其复制一个列表，如果没有剩下的内容可以匹配那么会返回一个空列表：
>>> a,b,c,*d = seq
>>> print(a,b,c,d)
1 2 3 [4]
>>> a,b,c,d,*e = seq
>>> print(a,b,c,d,e)
1 2 3 4 []

#多目标赋值语句就是直接把所有提供的变量名都赋值给右侧的对象
>>> a = b = c = 'As'
>>> a,b,c
('As', 'As', 'As')

#所引用的值也都是同一个
>>> id(a),id(b),id(c)
(4331109208, 4331109208, 4331109208)
{% endhighlight %}