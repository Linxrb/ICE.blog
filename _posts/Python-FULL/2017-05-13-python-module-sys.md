---
title: Python 全栈标准库之sys
layout: post
---

<br><br>

> sys模块用于提供对解释器相关的操作

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**方法名**|**说明**|
|sys.argv|传递到Python脚本的命令行参数列表，第一个元素是程序本身路径|
|sys.executable|返回Python解释器在当前系统中的绝对路径|
|sys.exit([arg])|程序中间的退出，arg=0为正常退出|
|sys.path|返回模块的搜索路径，初始化时使用PYTHONPATH环境变量的值|
|sys.platform|返回操作系统平台名称，Linux是linux2，Windows是win32|
|sys.stdout.write(str)|输出的时候把换行符\n去掉|
|val = sys.stdin.readline()[:-1]|拿到的值去掉\n换行符|
|sys.version|获取Python解释程序的版本信息|


{% highlight python linenos %}
# 位置参数
# 脚本 s.py，内容如下：
import sys
print(sys.argv[0])
print(sys.argv[1])
print(sys.argv[2])

# 执行
[root@Linrb ~] # python scripts.py canshu1 canshu2  
scripts.py
canshu1
canshu2
################################################

# 获取模块路径
# 在使用Python中用import、_import_导入模块的时候，那Python是怎么判断有没有这个模块的呢? 其实就是根据sys.path的路径来搜索你导入模块的名称。
for i in sys.path:
    print(i)


C:\Python35\lib\site-packages\pip-8.1.1-py3.5.egg
C:\Python35\python35.zip
C:\Python35\DLLs
C:\Python35\lib
C:\Python35
C:\Python35\lib\site-packages
{% endhighlight %}

**手写进度条**

{% highlight python linenos %}
import sys,time
for ii in range(101):
    sys.stdout.write('\r')  # 每一次清空原行。
    sys.stdout.write("%s%%  |%s|"%(int(int(ii)/100*100),int(int(ii)/100*100) * '#'))     # 一共次数除当前次数算进度
    sys.stdout.flush()      # 强制刷新到屏幕
    time.sleep(0.05)
{% endhighlight %}