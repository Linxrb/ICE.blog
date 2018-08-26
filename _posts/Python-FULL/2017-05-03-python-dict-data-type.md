---
title: Python 全栈系列之字典数据类型
layout: post
---

* TOC
{:toc}


<br><br>
　　字典(dict)在基本的数据类型中使用频率也是相当高的，而且它的访问方式是通过键来获取到对应的值 `(键唯一)` ，当然存储的方式也是键值对了，属于可变类型。  

### 创建字典的方式

#### 第一种

{% highlight python linenos %}
>>> dic = {'k1':'v1','k2':'v2'}
>>> dic
>>> {'k1':'v1','k2':'v2'}
>>> type(dic)
<class 'dict'>
{% endhighlight %}

#### 第二种

{% highlight python linenos %}
>>> dic = dict({"k1":"v1","k2":"v2"})
>>> dic
{'k1': 'v1', 'k2': 'v2'}
>>> type(dic)
>>> <class 'dict'>
{% endhighlight %}

{% highlight python linenos %}
# 在创建字典的时候，__init__初始化的时候还可以接受一个可迭代的变量作为值

>>> li = ["a","b","c"]
>>> dic = dict(enumerate(li))
>>> dic
{0: 'a', 1: 'b', 2: 'c'}
{% endhighlight %}

`与其变量不同的是，字典的键不仅仅支持字符串，而且还支持其他数据类型`，譬如：

{% highlight python linenos %}
# 数字
>>> D = {1:3}
>>> D[1]
3
# 元组
>>> D = {(1,2,3):3}
>>> D[(1,2,3)]
3
{% endhighlight %}

### 字典生成

{% highlight python linenos %}
>>> D = {x: x*2 for x in range(10)}
>>> D
{0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 12, 7: 14, 8: 16, 9: 18}
# 可以使用zip
>>> D = {k:v for (k, v) in zip(['a','b','c'],[1,2,3])}
>>> D
{'a': 1, 'c': 3, 'b': 2}
{% endhighlight %}

### 字典提供的常用方法

#### 增

{% highlight python linenos %}
dic3 = {}
 
dic3['name'] = 'Linrb'
dic3['age'] = 99
print(dic3) # {'name': 'Linrb', 'age': 99}

# 如果字典中存在键，则不添加并返回值，如果键不存在则添加并返回值
a = dic3.setdefault('name','Linxrb')
b = dic3.setdefault('ages',90)
print(a,b)
# Linrb 90
print(dic3)
# {'name': 'Linrb', 'ages': 90, 'age': 99}
{% endhighlight %}

#### 删

{% highlight python linenos %}
dic = {'name': 'Linrb', 'age': 18,'class':1}

dic.clear() :   # 清空字典，清空后变成一个空字典
dic.pop('name') # 删除指定项，并返回值
dic.popitem()   # 随机删除某项并返回键和值
del dic['name'] # 删除指定元素，也可以删除整个字典
{% endhighlight %}

#### 改

{% highlight python linenos %}
dic3 = {'name': 'Linrb', 'age': 99}

dic3['name'] = 'alvin'

dic4 = {'sex': 'male', 'hobby': 'girl', 'age': 36}
dic3.update(dic4) # 更新，存在覆盖，不存在添加
print(dic3)       # {'name': 'Linxrb', 'age': 36, 'sex': 'male', 'hobby': 'girl'}
{% endhighlight %}

#### 查

{% highlight python linenos %}
dic3 = {'name': 'Linrb', 'age': 99}

print(dic3['name'])
print(dic3['names']) # 取不到报错

print(dic3.get('age',False)) # 键存在就取值，不存在就使用默认值

print(dic3.items())  # dict_items([('name', 'Linrb'), ('age', 99)])
print(dic3.keys())   # dict_keys(['name', 'age'])
print(dic3.values()) # dict_values(['Linrb', 18])

print('name' in dic3)      # py2:  dic3.has_key('name') #True
print(list(dic3.values())) # ['Linrb', 99]
{% endhighlight %}

### 其他操作和涉及到的方法

**`1、 dict.fromkys()`**

{% highlight python linenos %}
d1 = dict.fromkeys(['host1', 'host2', 'host3'], 'Mac')
print(d1)  # {'host2': 'Mac', 'host3': 'Mac', 'host1': 'Mac'}

d1['host1'] = 'xiaomi'
print(d1)  # {'host2': 'Mac', 'host3': 'Mac', 'host1': 'xiaomi'}

d2 = dict.fromkeys(['host1', 'host2', 'host3'], ['Mac', 'huawei'])
print(d2)  # {'host2': ['Mac', 'huawei'], 'host3': ['Mac', 'huawei'], 'host1': ['Mac', 'huawei']}

d2['host1'][0] = 'xiaomi'
print(d2)  # {'host2': ['xiaomi', 'huawei'], 'host3': ['xiaomi', 'huawei'], 'host1': ['xiaomi', 'huawei']}
{% endhighlight %}

`2、 d.copy()` 对字典 d 进行浅复制，返回一个和d有相同键值对的新字典  

`3、 sorted(dict)` 返回一个有序的包含字典所有key的列表  

{% highlight python linenos %}
dic = {5:'555',2:'222',4:'444'}
print(sorted(dic))
# [2, 4, 5]　
{% endhighlight %}

`4、 字典遍历`

{% highlight python linenos %}
dic5 = {'name': 'Linrb', 'age': 99}
 
for i in dic5:
    print(i,dic5[i])
# name Linrb
# age 18

for items in dic5.items():
    print(items)
# ('name', 'Linrb')
# ('age', 18)

for keys,values in dic5.items():
    print(keys,values)
# name Linrb
# age 18
{% endhighlight %}

`5、 字典嵌套`

{% highlight python linenos %}
dic = {'zhangsan':{'age':23,'sex':'male'},
     '李四':{'age':33,'sex':'male'},
     'wangwu':{'age':27,'sex':'women'}  
     }
# 取值：dic[wangwu][sex]
{% endhighlight %}