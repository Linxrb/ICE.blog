---
title: Python 全栈标准库之logging
layout: post
---

<div id='toggle'></div>

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**[简单应用](#z1)**|简单实例|日志级别|配置|参数|
|**[logger对象](#z2)**|执行过程|深入|Filter|

> This module defines functions and classes which implement a flexible event logging system for applications and libraries.  

The key benefit of having the logging API provided by a standard library module is that all Python modules can participate in logging, so your application log can include your own messages integrated with messages from third-party modules.  
官方文档：[https://docs.python.org/3.5/library/logging.html](https://docs.python.org/3.5/library/logging.html)  

logging模块用于便捷记录日志且线程安全。  

<h3 id='z1'>一 简单应用</h3>

#### 1、简单实例

```python
import logging
logging.debug('debug message')
logging.info('info message')
logging.warning('warning message')
logging.error('error message')
logging.critical('critical message')
```
输出
```text
WARNING:root:warning message
ERROR:root:error message
CRITICAL:root:critical message
```
> 默认情况下 Python 的 logging 模块将日志打印到了标准输出中，且只显示了大于等于 WARNING 级别的日志，这说明默认的日志级别设置为 WARNING（日志级别等级CRITICAL > ERROR > WARNING > INFO > DEBUG > NOTSET），默认的日志格式为日志级别：Logger名称：用户输出消息。  

#### 2、日志级别

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**方法名**|**说明**|
|Level|Numeric value|
|CRITICAL|50|
|ERROR|40|
|WARNING|30|
|INFO|20|
|DEBUG|10|
|NOTSET|0|


#### 3、配置日志级别，日志格式，输出位置

```python
#!/usr/bin/env python
# _*_ coding:utf-8 _*_
#导入logging模块
import logging

#创建一个log.log日志文件
logging.basicConfig(
                    #日志要写入的文件
                    filename='log.log',
                    #日志的写入模式，默认a
                    filemode='a'
                    #日志格式，格式化的字符串
                    format='%(asctime)s - %(name)s - %(levelname)s - %(module)s: %(message)s',
                    #时间
                    datefmt='%Y-%m-%d %H:%M:%S %p',
                    #错误级别
                    level=logging.NOTSET
                    )

logging.critical('critical')
logging.error('error')
logging.warning('warning')
logging.info('info')
logging.debug('debug')
logging.log(logging.INFO, 'NOTSET')
```
执行结果
```python
Linrb@Linrb-me:~$ ls 
log.py
Linrb@Linrb-me:~$ python log.py 
Linrb@Linrb-me:~$ ls
log.log  log.py
Linrb@Linrb-me:~$ cat log.log 
2016-05-27 21:46:15 PM - root - CRITICAL - log: critical
2016-05-27 21:46:15 PM - root - ERROR - log: error
2016-05-27 21:46:15 PM - root - WARNING - log: warning
2016-05-27 21:46:15 PM - root - INFO - log: info
2016-05-27 21:46:15 PM - root - DEBUG - log: debug
2016-05-27 21:46:15 PM - root - INFO - log: NOTSET
```

`logging.basicConfig` 函数各个参数  
<br>

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**参数**|**说明**|
|filename|指定日志文件名|
|filemode|和file函数意义相同，指定日志文件的打开模式，’w’或’a’|
|format|指定输出的格式和内容，format可以输出很多有用信息，如下所示|
|datefmt|指定时间格式，同time.strftime()|
|level|设置日志级别，默认为logging.WARNING|

<br>
`format` 参数  
<br>

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|**参数**|**说明**|
|%(levelno)s|打印日志级别的数值|
|%(levelname)s|打印日志级别名称|
|%(pathname)s|打印当前执行程序的路径，其实就是sys.argv[0]|
|%(filename)s|打印当前执行程序名|
|%(funcName)s|打印日志的当前函数|
|%(lineno)d|打印日志的当前行号|
|%(asctime)s|打印日志的时间|
|%(name)s|Logger的名字|
|%(thread)d|打印线程ID|
|%(threadName)s|打印线程名称|
|%(process)d|打印进程ID|
|%(message)s|打印日志信息|

<h3 id='z2'>二 logger 对象</h3>

上述例子中了解到了logging.debug()、logging.info()、logging.warning()、logging.error()、logging.critical()（分别用以记录不同级别的日志信息），logging.basicConfig()（用默认日志格式（Formatter）为日志系统建立一个默认的流处理器（StreamHandler），设置基础配置（如日志级别等）并加到root logger（根Logger）中）这几个logging模块级别的函数，另外还有一个模块级别的函数是 `logging.getLogger([name])`（返回一个logger对象，如果没有指定名字将返回root logger）  

#### 1、最简单的过程
```python
import logging

logger = logging.getLogger()

# 创建一个处理对象，用于写入日志文件
fh = logging.FileHandler('test.log')

# 再创建一个处理对象，用于输出到控制台
ch = logging.StreamHandler()

#创建日志的记录格式
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

#给处理对象添加记录格式
fh.setFormatter(formatter)
ch.setFormatter(formatter)

#给日志对象添加处理对象
logger.addHandler(fh) #logger对象可以添加多个fh和ch对象
logger.addHandler(ch)

logger.debug('logger debug message')
logger.info('logger info message')
logger.warning('logger warning message')
logger.error('logger error message')
logger.critical('logger critical message')
```
**简单介绍：logging库提供了多个组件：`Logger` 、`Handler` 、`Filter` 、`Formatter` 。Logger对象提供应用程序可直接使用的接口，Handler 发送日志到适当的目的地，Filter 提供了过滤日志信息的方法，Formatter 指定日志显示格式。**  
>Logger 是一个树形层级结构，输出信息之前都要获得一个 Logger（如果没有显示的获取则自动创建并使用 root Logger，如第一个例子所示）。  
> logger = logging.getLogger()返回一个默认的 Logger 也即 root Logger，并应用默认的日志级别(warning)、Handler 和 Formatter 设置。  
> 当然也可以通过 `Logger.setLevel(lel)` 指定最低的日志级别，可用的日志级别有 logging.DEBUG、logging.INFO、logging.WARNING、logging.ERROR、logging.CRITICAL。  

#### 2、再创建两个logger对象
```python
logger1 = logging.getLogger('mylogger')
logger1.setLevel(logging.DEBUG)

logger2 = logging.getLogger('mylogger')
logger2.setLevel(logging.INFO)

logger1.addHandler(fh)
logger1.addHandler(ch)

logger2.addHandler(fh)
logger2.addHandler(ch)

logger1.debug('logger1 debug message')
logger1.info('logger1 info message')
logger1.warning('logger1 warning message')
logger1.error('logger1 error message')
logger1.critical('logger1 critical message')

logger2.debug('logger2 debug message')
logger2.info('logger2 info message')
logger2.warning('logger2 warning message')
logger2.error('logger2 error message')
logger2.critical('logger2 critical message')
```
结果：
```python
2016-01-08 11:22:20,559 - root - WARNING - logger warning message
2016-01-08 11:22:20,560 - root - ERROR - logger error message
2016-01-08 11:22:20,560 - root - CRITICAL - logger critical message
2016-01-08 11:22:20,561 - mylogger - INFO - logger1 info message
2016-01-08 11:22:20,561 - mylogger - INFO - logger1 info message
2016-01-08 11:22:20,561 - mylogger - WARNING - logger1 warning message
2016-01-08 11:22:20,561 - mylogger - WARNING - logger1 warning message
2016-01-08 11:22:20,561 - mylogger - ERROR - logger1 error message
2016-01-08 11:22:20,561 - mylogger - ERROR - logger1 error message
2016-01-08 11:22:20,562 - mylogger - CRITICAL - logger1 critical message
2016-01-08 11:22:20,562 - mylogger - CRITICAL - logger1 critical message
2016-01-08 11:22:20,562 - mylogger - INFO - logger2 info message
2016-01-08 11:22:20,562 - mylogger - INFO - logger2 info message
2016-01-08 11:22:20,564 - mylogger - WARNING - logger2 warning message
2016-01-08 11:22:20,564 - mylogger - WARNING - logger2 warning message
2016-01-08 11:22:20,565 - mylogger - ERROR - logger2 error message
2016-01-08 11:22:20,565 - mylogger - ERROR - logger2 error message
2016-01-08 11:22:20,565 - mylogger - CRITICAL - logger2 critical message
2016-01-08 11:22:20,565 - mylogger - CRITICAL - logger2 critical message
```

**提问1**  
> 明明通过 logger1.setLevel(logging.DEBUG) 将 logger1 的日志级别设置为了 DEBUG，为何显示的时候没有显示出 DEBUG 级别的日志信息，而是从 INFO 级别的日志开始显示呢？  

> 原来 logger1 和 logger2 对应的是同一个 Logger 实例，只要 logging.getLogger（name）中名称参数 name 相同则返回的 Logger 实例就是同一个，且仅有一个，也即 name 与 Logger 实例一一对应。在 logger2 实例中通过 logger2.setLevel(logging.INFO) 设置 mylogger 的日志级别为 logging.INFO，所以最后 logger1 的输出遵从了后来设置的日志级别。  

**提问2**  
> 为什么logger1、logger2对应的每个输出分别显示两次?  

> 这是因为我们通过 logger = logging.getLogger() 创建了 root Logger，而 logger1 = logging.getLogger('mylogger') 创建了 root Logger 的孩子(root.)mylogger,logger2 同样。而孩子,孙子，重孙…… 会将消息分发给他的 handler 进行处理 `也会传递给所有` 的祖先Logger处理。




#### 3、Filter

限制只有满足过滤规则的日志才会输出。  
比如我们定义了 filter = logging.Filter('a.b.c') ,并将这个 Filter 添加到了一个 Handler 上，则使用该 Handler 的 Logger 中只有名字带 a.b.c 前缀的 Logger 才能输出其日志。也可以给 logger 对象添加

实例
```python
#coding:utf-8
import logging

# 创建一个logger root
logger = logging.getLogger()

logger1 = logging.getLogger('mylogger')
logger1.setLevel(logging.DEBUG)

logger2 = logging.getLogger('mylogger')
logger2.setLevel(logging.INFO)

logger3 = logging.getLogger('mylogger.child1')
logger3.setLevel(logging.WARNING)

logger4 = logging.getLogger('mylogger.child1.child2')
logger4.setLevel(logging.DEBUG)

logger5 = logging.getLogger('mylogger.child1.child2.child3')
logger5.setLevel(logging.DEBUG)

#创建一个handler，用于写入日志文件
fh = logging.FileHandler('/tmp/test.log')

#再创建一个handler，用于输出到控制台
ch = logging.StreamHandler()

#定义handler的输出格式formatter    
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
fh.setFormatter(formatter)
ch.setFormatter(formatter)

#定义一个filter
#filter = logging.Filter('mylogger.child1.child2')      #只有 4,5 会写入文件
#fh.addFilter(filter)

#给logger添加handler
#logger.addFilter(filter)
logger.addHandler(fh)
logger.addHandler(ch)

#logger1.addFilter(filter)
logger1.addHandler(fh)
logger1.addHandler(ch)

logger2.addHandler(fh)
logger2.addHandler(ch)

#logger3.addFilter(filter)
logger3.addHandler(fh)
logger3.addHandler(ch)

#logger4.addFilter(filter)
logger4.addHandler(fh)
logger4.addHandler(ch)

logger5.addHandler(fh)
logger5.addHandler(ch)

#记录一条日志
logger.debug('logger debug message')
logger.info('logger info message')
logger.warning('logger warning message')
logger.error('logger error message')
logger.critical('logger critical message')

logger1.debug('logger1 debug message')
logger1.info('logger1 info message')
logger1.warning('logger1 warning message')
logger1.error('logger1 error message')
logger1.critical('logger1 critical message')

logger2.debug('logger2 debug message')
logger2.info('logger2 info message')
logger2.warning('logger2 warning message')
logger2.error('logger2 error message')
logger2.critical('logger2 critical message')

logger3.debug('logger3 debug message')
logger3.info('logger3 info message')
logger3.warning('logger3 warning message')
logger3.error('logger3 error message')
logger3.critical('logger3 critical message')

logger4.debug('logger4 debug message')
logger4.info('logger4 info message')
logger4.warning('logger4 warning message')
logger4.error('logger4 error message')
logger4.critical('logger4 critical message')

logger5.debug('logger5 debug message')
logger5.info('logger5 info message')
logger5.warning('logger5 warning message')
logger5.error('logger5 error message')
logger5.critical('logger5 critical message')
```