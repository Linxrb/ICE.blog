---
title: Python 全栈标准库之configparser
layout: post
---

* TOC
{:toc}

<br><br>

> 用于生成和修改常见配置文档，当前模块的名称在 python 2.x 版本中变更为 Configparser。其本质上是利用open来操作文件。  

**常见文档格式如下**  

{% highlight python linenos %}
# 第一种注释方式
; 第二种注释方式

[DEFAULT]       # 节点
ServerAliveInterval = 45
Compression = yes
CompressionLevel = 9
ForwardX11 = yes
 
[bitbucket.org]
User = hg
 
[topsecret.server.com]
Port = 50022
ForwardX11 = no
{% endhighlight %}

### 实例

#### 用 Python 生成这样的文档

{% highlight python linenos %}
import configparser

# 创建对象
config = configparser.ConfigParser()

# 第一种方式
config["DEFAULT"] = {'ServerAliveInterval': '45',
                      'Compression': 'yes',
                     'CompressionLevel': '9'}

# 第二种方式
config['bitbucket.org'] = {}
config['bitbucket.org']['User'] = 'hg'
config['topsecret.server.com'] = {}

# 第三种方式
topsecret = config['topsecret.server.com']
topsecret['Host Port'] = '50022'     # mutates the parser
topsecret['ForwardX11'] = 'no'       # same here
# 再给DEFAULT添加一个
config['DEFAULT']['ForwardX11'] = 'yes'

# 写入文件
with open('example.ini', 'w') as configfile:
   config.write(configfile)
{% endhighlight %}

**写完了还可以再读出来**

{% highlight python linenos %}
import configparser
config = configparser.ConfigParser()
config.sections()           # []    空列表，得先读出来

config.read('example.ini')
config.sections()           # ['bitbucket.org', 'topsecret.server.com']      文件中有3个节点，为什么只拿到两个？

config.defaults()           # default 是一个特殊的节点，需要用 defaults() 去拿
# OrderedDict([('serveraliveinterval', '45'), ('compression', 'yes'), ('compressionlevel', '9'), ('forwardx11', 'yes')])

'bitbucket.org' in config   # True

'bytebong.com' in config    # False

config['bitbucket.org']['User']     # 'hg'

config['DEFAULT']['Compression']    # 'yes'

topsecret = config['topsecret.server.com']
topsecret['ForwardX11']     # 'no'
topsecret['Port']           # '50022'

for key in config['bitbucket.org']: print(key)      # default 节点下的键也会一起拿到
...
user
compressionlevel
serveraliveinterval
compression
forwardx11

config['bitbucket.org']['ForwardX11']       # 'yes'
{% endhighlight %}

#### configparser增删改查语法

{% highlight python linenos %}
import ConfigParser
  
config = ConfigParser.ConfigParser()
config.read('example.ini')

# ################## 读 ###################
secs = config.sections()
print(secs)             
options = config.options('topsecret.server.com')    # 获取节点下的每个键
print(options)          # ['host port', 'forwardx11', 'serveraliveinterval', 'compression', 'compressionlevel']

item_list = config.items('topsecret.server.com')    # 获取节点下的每一项
print(item_list)        # [('serveraliveinterval', '45'), ('compression', 'yes'), ('compressionlevel', '9'), ('forwardx11', 'no'), ('host port', '50022')]

val = config.get('topsecret.server.com','host port')        # 获取节点下某个键的值    50022
val = config.getint('topsecret.server.com','host port')     # 同上    50022   value 为 int
  
# ################## 改写 ###################
sec = config.remove_section('bitbucket.org')   # 删除节点
# del config['bitbucket.org']
config.write(open('i.cfg', "w"))               # 保存

sec = config.has_section('Linrb')              # 判断有没有节点
sec = config.add_section('Linrb')              # 添加节点
# config['Linrb'] = {}
config.write(open('i.cfg', "w"))               # 保存

config.set('Linrb','k1',11111)                 # 添加键 值
# config['Linrb']['k1'] = ‘11111’
config.write(open('i.cfg', "w"))

config.remove_option('Linrb','k1')             # 删除节点下的某一项
# del config['Linrb']['k1']
config.write(open('i.cfg', "w"))
{% endhighlight %}

### 小结

> 除了上面的一些方法外，其实可以把 config 对象当成一个字典来操作  
> 添加节点：config[sections] = {}  
> 删除节点：del config[sections]  
> 添加键值：config[sections][key] = value  
> 删除键 ：del config[sections][key]  
> 修改值 ：config[sections][key] = value
> 最后记得保存
