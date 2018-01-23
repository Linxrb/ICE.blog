---
title: Python 全栈标准库之time
layout: post
---


> 这个模块提供了处理时间值的各种函数。  

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**方法名**|**说明**|
|time.sleep(int)|等待时间，单位：秒|
|time.time()|时间戳，从1970年1月1号到现在用了多少秒|
|time.gmtime()|结构化时间（UTC），struct_time 结构|
|time.localtime()|以 struct_time 格式返回本地时间（电脑的时间）|
|time.strftime(‘%Y-%m-%d %H:%M:%S’,time.gmtime())|将 struct_time 格式转成指定的字符串格式|
|time.strptime(“2016-01-28”,”%Y-%m-%d”)|将字符串格式转换成 struct_time 格式|
|time.ctime()|返回当前时间|
|time.mktime(time.localtime())|将 struct_time 格式转回成时间戳格式|


时间的3种表示形式：
- 时间戳
- 结构化时间（struct_time）
- 格式化时间(自定制)

{% highlight python linenos %}
time.time()
#时间戳    1464154805.82723
#############################

time.gmtime()
#struct_time 结构时间，相差8小时
#time.struct_time(tm_year=2018, tm_mon=1, tm_mday=4, tm_hour=7, tm_min=46, tm_sec=23, tm_wday=3, tm_yday=4, tm_isdst=0) <class 'time.struct_time'>
#############################

time.localtime()
#本地的 struct_time 结构时间
#time.struct_time(tm_year=2018, tm_mon=1, tm_mday=4, tm_hour=16, tm_min=34, tm_sec=48, tm_wday=3, tm_yday=4, tm_isdst=0)
#############################

time.strftime('%Y-%m-%d %H:%M:%S',time.localtime())
#将 struct_time 格式转成指定的字符串格式    2018-01-04 16:37:20
#############################

time.strptime('2018-01-04 16:37:20','%Y-%m-%d %H:%M:%S')
#将字符串格式时间转换成 struct_time 结构时间
#转换后可以拿到里面的时间
t = time.strptime('2018-01-04 16:37:20','%Y-%m-%d %H:%M:%S')
print(t.tm_year)    #2018
#############################

time.ctime()
#'Wed May 25 13:42:51 2016'
# 今天的时间减去86640秒
time.ctime(time.time()-86640)      #它可以接收一个时间戳，返回什么格式的时间
'Tue May 24 13:39:58 2016'
#############################

time.mktime(time.localtime())
#接收一个 struct_time 结构时间，返回时间戳格式    1515056190.0
{% endhighlight %}