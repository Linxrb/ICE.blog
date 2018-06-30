---
title: python操作mysql (pymysql)
layout: post
---

* TOC
{:toc}

pymsql是Python中操作MySQL的模块。  

下载安装  

{% highlight python linenos %}
pip install pymysql
{% endhighlight %}

###  使用操作

#### 执行sql

{% highlight python linenos %}
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import pymysql
  
# 创建连接
conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123', db='t1',charset='utf8')
# 创建游标
cursor = conn.cursor()
  
# 执行SQL，并返回收影响行数
effect_row = cursor.execute("update hosts set host = '1.1.1.2'")
  
# 执行SQL，并返回受影响行数
effect_row = cursor.execute("update hosts set host = '1.1.1.2' where nid > %s", (1,))
  
# 执行SQL，并返回受影响行数
effect_row = cursor.executemany("insert into hosts(host,color_id)values(%s,%s)", [("1.1.1.11",1),("1.1.1.11",2)])
  
  
# 提交，不然无法保存新建或者修改的数据
conn.commit()
  
# 关闭游标
cursor.close()
# 关闭连接
conn.close()
{% endhighlight %}

> 执行 sql 的时候一般用 execute ，禁止使用字符串拼接 sql 语句，因为有可能会照成 sql 注入。

#### 获取自增ID

{% highlight python linenos %}
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import pymysql
  
conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123', db='t1')
cursor = conn.cursor()
cursor.executemany("insert into hosts(host,color_id)values(%s,%s)", [("1.1.1.11",1),("1.1.1.11",2)])
conn.commit()
cursor.close()
conn.close()
  
# 获取最新自增ID，最后一个
new_id = cursor.lastrowid
{% endhighlight %}

#### 获取查询数据

{% highlight python linenos %}
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import pymysql
  
conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123', db='t1')
cursor = conn.cursor()
cursor.execute("select * from color")
  
# 获取第一行数据，获取到的数据是元组类型
row_1 = cursor.fetchone()       #(1, 'yellow')
  
# 获取前n行数据,会接着往下一个取
row_2 = cursor.fetchmany(3)     #((2, 'green'), (3, 'pink'), (4, 'red'))

# 获取所有数据
row_3 = cursor.fetchall()
  
conn.commit()
cursor.close()
conn.close()
{% endhighlight %}

注：在 fetch 数据时按照顺序进行，可以使用 cursor.scroll(num,mode)来移动游标位置，如：

- cursor.scroll(1,mode='relative')：相对当前位置移动
- cursor.scroll(-1,mode='relative')：相对当前位置移动
- cursor.scroll(2,mode='absolute')：相对绝对位置移动

#### fetch数据类型

关于默认获取的数据是元祖类型，如果想要或者字典类型的数据，即：

{% highlight python linenos %}
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import pymysql
  
conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123', db='t1')
  
# 游标设置为字典类型
cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
r = cursor.execute("call p1()")
  
result = cursor.fetchone()      #{'name': 'yellow', 'nid': 1}
result = cursor.fetchall()      #[{'name': 'green', 'nid': 2}, {'name': 'ppink', 'nid': 3}]

conn.commit()
cursor.close()
conn.close()
{% endhighlight %}