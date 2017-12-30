---
title: Python 全栈系列之字符串数据类型
layout: post
---

<div id='toggle'></div>

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**[字符串类型](#z1)**|创建|对应操作|内置方法|


<h3 id='z1'>字符串类型（string）</h3>

字符串是以单引号 `'` 或双引号 `"` 括起来的任意文本，比如 'abc'，"123" 等等。

请注意，'' 或 "" 本身只是一种表示方式，不是字符串的一部分。  
因此，字符串 'abc' 只有 a，b，c 这3个字符。  
如果 `'` 本身也是一个字符，那就可以用 `""` 括起来，比如 "I'm OK" 包含的字符是 I，'，m，空格，O，K 这6个字符。

#### 1、创建字符串

```python
var1 = 'Hello World!'
var2 = "Python"
```

#### 2、对应操作

```python
# 1   * 重复输出字符串
print('hello'*2)
 
# 2 []   切片 ,[:] 通过索引获取字符串中字符,这里和列表的切片操作是相同的,具体内容见列表
print('helloworld'[2:])
 
# 3 in  成员运算符 - 如果字符串中包含给定的字符返回 True
print('el' in 'hello')
 
# 4 %   格式字符串
print('Linrb is a good boy')
print('%s is a good boy' % 'Linrb') #如果有多个，可以加上括号
 
# 5 +   字符串拼接
a = '123'
b = 'abc'
c = '789'
d1 = a+b+c
print(d1)
# +效率低,该用join
d2 = ''.join([a,b,c])
print(d2)
```

#### 3、字符串的内置方法

```python
string.capitalize()                                 首字母大写
string.casefold()                                   #首字母小写
string.center(width, fillchar=None)                 #内容居中，width：总长度；fillchar：空白处填充内容，默认无，可指定填充内容，填充字符必须是一个字符长。
string.count(str, beg=0, end=len(string))           #返回 str 在 string 里面出现的次数，如果 beg 或者 end 指定则返回指定范围内 str 出现的次数
string.decode(encoding='UTF-8', errors='strict')    #以 encoding 指定的编码格式解码 string，如果出错默认报一个 ValueError 的 异 常 ， 除 非 errors 指 定 的 是 'ignore' 或 者'replace'
string.encode(encoding='UTF-8', errors='strict')    #以 encoding 指定的编码格式编码 string，如果出错默认报一个ValueError 的异常，除非 errors 指定的是'ignore'或者'replace'
string.endswith(obj, beg=0, end=len(string))        #检查字符串是否以 obj 结束，可检查指定的范围内是否以 obj 结束，如果是，返回 True,否则返回 False
string.expandtabs(tabsize=8)                        #把字符串 string 中的 tab 符号转为空格，tab 符号默认的空格数是 8
string.find(str, beg=0, end=len(string))            #寻找子序列位置，如果找到返回开始的索引值，否则返回-1
string.index(str, beg=0, end=len(string))           #跟find()方法一样，如果找不到会报一个异常
string.isalnum()                                    #是否是字母和数字，是返回 True,否则返回 False
string.isalpha()                                    是否是字母
string.isdecimal()                                  #检查字符串是否只包含十进制字符。这种方法只存在于unicode对象
string.isdigit()                                    是否是数字
string.islower()                                    #是否小写，如果有包含大写返回False
string.isnumeric()                                  #检查是否只有数字字符组成的字符串
string.isspace()                                    #字符串是否只由空格组成
string.istitle()                                    #是否是标题化，即检测字符串中所有的单词拼写首字母是否为大写，且其他字母为小写
string.isupper()                                    #检测字符串中所有的字母是否都为大写
string.join(seq)                                    字符串拼接，连接两个字符串，以 string 作为分隔符，将 seq 中所有的元素(的字符串表示)合并为一个新的字符串
string.ljust(width,fillchar=None)                   #左对齐,默认使用空格填充至长度 width 的新字符串
string.lower()                                      #所有大写字符为小写
string.lstrip()                                     #截掉 string 左边的空格
max(str)                                            #返回字符串 str 中最大的字母
min(str)                                            #返回字符串 str 中最小的字母
string.partition(str)                               #根据指定的分隔符将字符串进行分割，分割，前，中，后三部分
string.replace(str1, str2,  num=string.count(str1)) 替换，把 string 中的 str1 替换成 str2, num 指定替换次数
string.rfind(str, beg=0,end=len(string) )           #类似于 find()函数，不过是从右边开始查找，即返回字符串最后一次出现的位置，如果没有匹配项则返回-1
string.rindex( str, beg=0,end=len(string))          #类似于 index()，不过是从右边开始，即返回子字符串 str 在字符串中最后出现的位置，如果没有匹配的字符串会报异常
string.rjust(width, fillchar=None)                  #返回一个原字符串右对齐,默认使用空格填充至长度 width 的新字符串
string.rpartition(str)                              #根据指定的分隔符将字符串进行分割，和partition类似
string.rstrip(chars=None)                           #删除 string 字符串末尾的指定字符（默认为空格）
string.split(str, num)                              切片，以 str 为分隔符切片，如果 num有指定值，则仅分隔 num 个子字符串
string.splitlines(num=string.count('\n'))           #按照行分隔，返回一个包含各行作为元素的列表，如果 num 指定则仅切片 num 个行.
string.startswith(obj, beg=0,end=len(string))       #检查字符串是否是以 obj 开头，是则返回 True，否则返回 False。如果beg 和 end 指定值，则在指定范围内检查.
string.strip(chars=None)                            删除空格，删除 string 字符串末尾的指定字符（默认为空格）
string.swapcase()                                   #翻转 string 中的大小写
string.title()                                      #返回"标题化"的 string,就是说所有单词都是以大写开始，其余字母均为小写(见 istitle())
string.translate(str, del="")                       #根据 str 给出的表(包含 256 个字符)转换 string 的字符,要过滤掉的字符放到 del 参数中
string.upper()                                      #转换 string 中的小写字母为大写
string.zfill(width)                                 #返回指定长度的字符串，原字符串右对齐，前面填充0
```