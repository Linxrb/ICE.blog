---
title: Python 全栈系列之文件操作
layout: post
---

<div id='toggle'></div>

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**[操作流程](#z1)**|
|**[打开模式](#z2)**|基本模式|带+|带b|带b+|
|**[读取方式](#z3)**|read|readline|readlines|
|**[写入模式](#z4)**|write|writelines|
|**[其他操作](#z5)**|close|fileno|flush|isatty|readable|tell|seek|seekable|writable|
|**[with](#z6)**|


<h3 id='z1'>一 对文件操作流程</h3>

- 1.打开文件，得到文件句柄并赋值给一个变量
- 2.通过句柄对文件进行操作
- 3.关闭文件

**创建一个文件内容如下：**
> Hello Word!  
> 123  
> abc  
> 456  
> abc  
> 789  
> abc  

```python
f = open('hello.txt') #1 打开文件
data = f.read()       #2 获取文件内容
f.close()             #3 关闭文件
```
**注意
 if in the win  
 hello 文件是 utf8 保存的，打开文件时 open 函数是通过操作系统打开的文件  
 而 win 操作系统默认的是 gbk 编码  
 所以直接打开会乱码（或报错）  
 需要 f=open('hello',encoding='utf8')，hello 文件如果是 gbk 保存的，则直接打开即可。**  

<h3 id='z2'>二 文件打开模式</h3>

#### 1、基本模式

```python
======================================================

    Character Meaning
    -----------------------
    r    只读模式    文件必须存在
    w    只写模式    文件不存在则创建文件，文件存在则清空文件内容
    x    只写模式    文件不可读，文件不存在则创建，存在则报错 #创建一个新文件并打开它以便编写
    a    追加模式    文件不存在创建文件，文件存在则在文件末尾添加内容

=======================================================
```

#### 2、带 + 模式

```python
======================================================

    Character Meaning
    -----------------------
    r+    读写    #写是追加，不管 read 到哪个 tell ，都从最后面最加
    w+    写读    #读的时候 tell 在最后面，所以是空
    x+    写读    #同上
    a+    写读    #tell 默认在最后

=======================================================
```

#### 3、带 b 和带 b+

```python
======================================================

    Character Meaning
    -----------------------
    rb    二进制读模式
    wb    二进制写模式
    xb    二进制只写模式
    ab    二进制追加模式
    -----------------------
    rb+    二进制读写模式
    wb+    二进制读写模式
    xb+    二进制只写模式
    ab+    二进制读写模式
    
    # 提示：以b方式打开时，读取到的内容是字节类型，写入时也需要提供字节类型

=======================================================
```

<h3 id='z3'>三 文件的读取方式</h3>

```python
read([size])        读取文件全部内容，如果设置了size，那么就读取size字节
readline([size])    一行一行的读取，size同上
readlines()         读取所有内容组成一个列表，每一行内容作为列表中的一个元素
```

#### 1、read

```python
# 以只读的方式打开文件hello.txt
f = open("hello.txt","r")
# 读取文件内容赋值给变量c
c = f.read()
# 关闭文件
f.close()
# 输出c的值
print(c)

#输出结果：

Hello Word!
123
abc
456
abc
789
abc
```

#### 2、readline

```python
# 以只读模式打开文件hello.txt
f = open("hello.txt","r")
# 读取第一行
c1 = f.readline()
# 读取第二行
c2 = f.readline()
# 读取第三行
c3 = f.readline()
# 关闭文件
f.close()
# 输出读取文件第一行内容
print(c1)
# 输出读取文件第二行内容
print(c2)
# 输出读取文件第三行内容
print(c3)

#输出结果：

#每行后面还有一个 \n
Hello Word!

123

abc
```

#### 3、readlines

```python
# 以只读的方式打开文件hello.txt
f = open("hello.txt","r")
# 将文件所有内容赋值给c
#因为readlines 是一次性读取文件的所有内容，把每一行当成一个元素组成一个list
#所以如果文件过大会一次性加载到内存，所有一般用 for line in f：
#这里for 循环会把 f 处理成一个迭代器，所以它里面永远只有一行
c = f.readlines()
# 查看数据类型
print(type(c))
# 关闭文件
f.close()
# 遍历输出文件内容
for n in c:
    print(n)

#结果

# 输出的数据类型
<class 'list'>
Hello Word!

123

abc

456

abc

789

abc
```

<h3 id='z4'>四 文件的写入模式</h3>

```python
write(str)    将字符串写入文件
writelines(sequence or strings)    写多行到文件，参数可以是一个可迭代的对象，列表、元组等
```

#### 1、write

```python
# 以只读的模式打开文件write.txt，没有则创建，有则覆盖内容
file = open("write.txt","w")
# 在文件内容中写入字符串test write
file.write("test write")
# 关闭文件
file.close()

#write.txt文件内容为：

test write
```

#### 2、writelines

```python
# 以只读模式打开一个不存在的文件wr_lines.txt
f = open("wr_lines.txt","w",encoding="utf-8")
# 写入一个列表
f.writelines(["11","22","33"])
# 关闭文件
f.close()

#wr_lines.txt文件内容：

112233
```

<h3 id='z5'>五 文件操作所提供的其他操作</h3>

**`1、 close(self):` 关闭文件**
```python
#关闭已经打开的文件
f.close()
```

**`2、 fileno(self):` 文件描述符**
```python
f = open("hello.txt","r")
ret = f.fileno()
f.close()
print(ret)

#执行结果：

3
```

**`3、 flush(self):` 刷新缓冲区的内容到硬盘中**
```python
f.flush()
```

**`4、 isatty(self):` 判断文件是否是tty设备**
```python
f = open("hello.txt","r")
ret = f.isatty()
f.close()
print(ret)

#返回结果：

False
```

**`5、 readable(self):` 是否可读**
```python
f = open("hello.txt","r")
ret = f.readable()
f.close()
print(ret)

#返回结果：

True
```

**`6、 tell(self):` 获取指针位置**
```python
f = open("hello.txt","r")
print(f.tell())
f.close()

#返回结果:

0
```

**`7、 seek(self, offset, whence=io.SEEK_SET):` 指定文件中指针位置**
```python
f = open("hello.txt","r")
print(f.tell())
f.seek(3)
print(f.tell())
f.close()

#执行结果

0
3
```

**`8、 seekable(self):` 指针是否可操作**
```python
f = open("hello.txt","r")
print(f.seekable())
f.close()

#执行结果

True
```

**`9、 writable(self):` 是否可写**
```python
f = open("hello.txt","r")
print(f.writable())
f.close()

#执行结果

False
```

<h3 id='z6'>六 with 语句</h3>

为了避免打开文件后忘记关闭，可以通过管理上下文，即：
```python
with open('log','r') as f:
        pass
```

如此方式，当with代码块执行完毕时，内部会自动关闭并释放文件资源。  
在Python 2.7 后，with又支持同时对多个文件的上下文进行管理，即：  

```python
with open('log1') as obj1, open('log2') as obj2:
    pass
```