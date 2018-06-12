---
title: Python 全栈标准库之datetime
layout: post
---


> Fast implementation of the datetime type.

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**方法名**|**说明**|
|datetime.date.today()|打印输出当前的系统日期|
|datetime.date.fromtimestamp(time.time())|将时间戳转成日期格式|
|datetime.datetime.now()|打印当前的系统时间|
|current_time.replace(2016,5,12)|返回当前时间,但指定的值将被替换|
|datetime.datetime.strptime(“21/11/06 16:30”, “%d/%m/%y %H:%M”)|将字符串转换成日期格式|


{% highlight python linenos %}
print(datetime.date.today())        # 当前系统时间
2016-05-25
######################################

time.time()
# 时间戳格式
1464156222.1887317
print(datetime.date.fromtimestamp(time.time()))
# 日期格式
2016-05-25
######################################

current_time = datetime.datetime.now()
print(current_time)                 # 2016-05-25 14:05:26.706667
# 将日期格式转换为struct_time格式。返回 struct_time 格式
print(current_time.timetuple())
time.struct_time(tm_year=2016, tm_mon=5, tm_mday=25, tm_hour=14, tm_min=5, tm_sec=26, tm_wday=2, tm_yday=146, tm_isdst=-1)
######################################

# 替换当前系统时间
print(current_time.replace(2016,5,12))
2016-05-12 14:05:26.706667
######################################

# 将字符串转换成日期格式
str_to_date = datetime.datetime.strptime("21/11/06 16:30", "%d/%m/%y %H:%M")
print(str_to_date)
2006-11-21 16:30:00
######################################

时间相加减

# 比现在加10天
new_date = datetime.datetime.now() + datetime.timedelta(days=10)
print(new_date)
2016-06-04 14:10:36.119523

# 比现在减10天
new_date = datetime.datetime.now() + datetime.timedelta(days=-10)
print(new_date)
2016-05-15 14:11:06.739814

# 比现在减10小时
new_date = datetime.datetime.now() + datetime.timedelta(hours=-10)
print(new_date)
2016-05-25 04:11:44.095624

# 比现在+120s
new_date = datetime.datetime.now() + datetime.timedelta(seconds=120)
print(new_date)
2016-05-25 14:14:02.090219
{% endhighlight %}