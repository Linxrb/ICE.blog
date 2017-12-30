---
title: Python 全栈系列之字典数据类型
layout: post
---

<div id='toggle'></div>

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**[创建方式](#z1)**|第一种|第二种|
|**[字典生成](#z2)**|
|**[常用方法](#z3)**|增|删|改|查|
|**[其他操作](#z4)**|fromkeys|copy|sorted|字典遍历|嵌套|


字典(dict)在基本的数据类型中使用频率也是相当高的，而且它的访问方式是通过键来获取到对应的值 `(键唯一)` ，当然存储的方式也是键值对了，属于可变类型。  

<h3 id='z1'>一 创建字典的方式</h3>

#### 1、第一种

```python
>>> dic = {'k1':'v1','k2':'v2'}
>>> dic
>>> {'k1':'v1','k2':'v2'}
>>> type(dic)
<class 'dict'>
```

#### 2、第二种

```python
>>> dic = dict({"k1":"v1","k2":"v2"}) #参数不能是字符串
>>> dic
{'k1': 'v1', 'k2': 'v2'}
>>> type(dic)
>>> <class 'dict'>
```
```python
#在创建字典的时候，__init__初始化的时候还可以接受一个可迭代的变量作为值

>>> li = ["a","b","c"]
>>> dic = dict(enumerate(li))
>>> dic
{0: 'a', 1: 'b', 2: 'c'}
```

`与其变量不同的是，字典的键不仅仅支持字符串，而且还支持其他数据类型`，譬如：
```python
# 数字
>>> D = {1:3}
>>> D[1]
3
# 元组
>>> D = {(1,2,3):3}
>>> D[(1,2,3)]
3
```

<h3 id='z2'>二 字典生成</h3>

```python
>>> D = {x: x*2 for x in range(10)}
>>> D
{0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 12, 7: 14, 8: 16, 9: 18}
# 可以使用zip
>>> D = {k:v for (k, v) in zip(['a','b','c'],[1,2,3])}
>>> D
{'a': 1, 'c': 3, 'b': 2}
```

<h3 id='z3'>三 字典提供的常用方法</h3>

#### 1、增
```python
dic3 = {}
 
dic3['name'] = 'Linrb'
dic3['age'] = 99
print(dic3) #{'name': 'Linrb', 'age': 99}

# 如果字典中存在键，则不添加并返回值，如果键不存在则添加并返回值
a = dic3.setdefault('name','Linxrb')
b = dic3.setdefault('ages',90)
print(a,b)
# Linrb 90
print(dic3)
# {'name': 'Linrb', 'ages': 90, 'age': 99}
```

#### 2、删

```python
dic = {'name': 'Linrb', 'age': 18,'class':1}

dic.clear() : #清空字典，清空后变成一个空字典
dic.pop('name') #删除指定项，并返回值
dic.popitem() #随机删除某项并返回键和值
del dic['name'] #删除指定元素，也可以删除整个字典

```
#### 3、改

```python
dic3 = {'name': 'Linrb', 'age': 99}

dic3['name'] = 'alvin'

dic4 = {'sex': 'male', 'hobby': 'girl', 'age': 36}
dic3.update(dic4) #更新，存在覆盖，不存在添加
print(dic3) #{'name': 'Linxrb', 'age': 36, 'sex': 'male', 'hobby': 'girl'}

```

#### 4、查

```python
dic3 = {'name': 'Linrb', 'age': 99}

print(dic3['name'])
print(dic3['names']) #取不到报错

print(dic3.get('age',False)) #键存在就取值，不存在就使用默认值

print(dic3.items()) #dict_items([('name', 'Linrb'), ('age', 99)])
print(dic3.keys()) #dict_keys(['name', 'age'])
print(dic3.values()) #dict_values(['Linrb', 18])

print('name' in dic3)  # py2:  dic3.has_key('name') #True
print(list(dic3.values())) #['Linrb', 99]
```

<h3 id='z4'>四 其他操作和涉及到的方法</h3>

**`1、 dict.fromkys()`**
```python
d1 = dict.fromkeys(['host1', 'host2', 'host3'], 'Mac')
print(d1)  #{'host2': 'Mac', 'host3': 'Mac', 'host1': 'Mac'}

d1['host1'] = 'xiaomi'
print(d1)  #{'host2': 'Mac', 'host3': 'Mac', 'host1': 'xiaomi'}

d2 = dict.fromkeys(['host1', 'host2', 'host3'], ['Mac', 'huawei'])
print(d2)  #{'host2': ['Mac', 'huawei'], 'host3': ['Mac', 'huawei'], 'host1': ['Mac', 'huawei']}

d2['host1'][0] = 'xiaomi'
print(d2)  #{'host2': ['xiaomi', 'huawei'], 'host3': ['xiaomi', 'huawei'], 'host1': ['xiaomi', 'huawei']}
```

**`2、 d.copy()` 对字典 d 进行浅复制，返回一个和d有相同键值对的新字典**  

**`3、 sorted(dict)` 返回一个有序的包含字典所有key的列表**  
```python
dic = {5:'555',2:'222',4:'444'}
print(sorted(dic))
#[2, 4, 5]　
```

**`4、 字典遍历`**
```python
dic5 = {'name': 'Linrb', 'age': 99}
 
for i in dic5:
    print(i,dic5[i])
#name Linrb
#age 18

for items in dic5.items():
    print(items)
#('name', 'Linrb')
#('age', 18)

for keys,values in dic5.items():
    print(keys,values)
#name Linrb
#age 18
```

**`5、 字典嵌套`**
```python
dic = {'zhangsan':{'age':23,'sex':'male'},
     '李四':{'age':33,'sex':'male'},
     'wangwu':{'age':27,'sex':'women'}  
     }
#取值：dic[wangwu][sex]
```