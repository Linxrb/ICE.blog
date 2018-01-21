---
title: Python 全栈系列之流程控制
layout: post
---

* TOC
{:toc}

#### 判断语句：if ... elif ... else</h4>

```python
if <条件一>:
    <条件一代码块>
    
elif <条件二>:
    <条件二代码块>
    
else:
    <上面两个或者多个条件都不满足则只需这里的代码块>
```

#### 三元运算

　　如果条件成立，那么就把 `值1` 赋值给 `var`，如果条件不成立，就把 `值2` 赋值给 `var`  
```python
var = 值1 if 条件 else 值2

#例子
>>> var = "True" if 1==1 else "False"
>>> var
'True'
```

#### for 循环

　　`for` 语句是 python 中的循环控制语句，可用来遍历某一对象，还具有一个附带的可选的 `else` 块，用于程序正常退出循环后执行（即：循环没有被 break 中断）  
```python
>>> li = [1,2,3]
>>> for n in li):
...  print(n)
...
1
2
3
```

#### enumrate

　　`enumerate` 函数用于遍历序列中的元素以及它们的下标  

```python
li = [1,2,3]

for i in enumerate(li ,1):
    print(i)

# 结果

(1, 1)   #结果是一个元祖
(2, 2)
(3, 3)

# enumerate 可以传两个参数，第二个参数用来指定起始值，默认从0开始
```

#### range 和 xrange

　　range() 函数返回在特定区间的数字序列。  
　　range() 函数的用法类似切片：`range(start, stop, setup)`。  
　　`start` 的默认值为0，即从0开始，`stop` 的参数是必须输入的，输出的最后一个数值是stop的前一个，`steup` 的默认值是1，`setup` 是步长  
```python
for n in range(3):
    print(n)
    
0
1
2

#反向输出

for n in range(5,-1,-1):
    print(n)
    
5
4
3
2
1
0
```

#### while 循环

　　while 循环不同于 for 循环，`while` 循环是只要条件满足，那么就会一直运行代码块，否则就运行 `else` 代码块（前提是程序没有被中断，即被 break），语法如下：  
```python
while <条件>:
    <代码块>
else:
    <如果条件不成立执行这里的代码块>
```

#### break 和 continue

　　`break` ：用于结束循环  
　　`continue` ：用于结束当前循环，进入下一次循环  
