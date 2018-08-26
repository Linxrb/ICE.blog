---
title: Python 全栈标准库之random
layout: post
---

<br><br>

> 这个模块提供了处理时间值的各种函数。  

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**方法名**|**说明**|
|random.random()|返回0 ~ 1的随机数|
|random.randint(start,end)|返回开始到结束的随机数，包括start和end|
|random.randrange(start,end)|返回开始到结束的随机数，包括start不包括end|
|random.choice(seq)|随机返回序列里的一个元素|
|random.sample(seq,int)|随机返回序列里的int个元素|


{% highlight python linenos %}
# 生成0-1的小数
random.random()
0.06511225392331632
###############################

# 输出a和b范围内的数，包括a和b
random.randint(5,9)
###############################

# 输出start到stop-1之间的数，可设置步长
random.randrange(5,9,3)
{% endhighlight %}

**随机验证码实例**

{% highlight python linenos %}
#!/usr/bin/env python
import random
checkcode = ''
# for循环四次
for i in range(4):
    # current=0-3的数字
    current = random.randrange(0,4)
    # 如果current的值不等于i
    if current != i:
    	# 通过chr把数字转换为一个字母赋值给temp
        temp = chr(random.randint(65,90))
    else:
    	# 否则temp=0-9之间的数字
        temp = random.randint(0,9)
    # checkcode = checkcode + str(temp)
    checkcode += str(temp)
# 输出字符
print(checkcode)
{% endhighlight %}

**随机数另外一种写法**

{% highlight python linenos %}
import random

checkcode = ""
# for循环四次
for i in range(4):
    # 随机取一个数字或字母
    temp = random.choice([random.randrange(10),chr(random.randrange(65,90))])
    checkcode += str(temp)
{% endhighlight %}