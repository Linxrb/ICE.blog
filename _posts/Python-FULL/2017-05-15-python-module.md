---
title: Python 全栈标准库之模块介绍
layout: post
---

* TOC
{:toc}

　　Python 的模块其实就是封装了一个或者多个功能的代码集合，以便于重用，维护，模块可以是一个 `文件` 也可以是一个 `目录` ，目录的形式称作 `包` 。  
<br>
**模块一共三种：**
- python标准库
- 第三方模块
- 应用程序自定义模块

### 模块的导入方式

#### 导入模块

{% highlight python linenos %}
1
# 把一个模块当做成一个整体来进行导入
import sys
sys.path

2
# 从一个模块中导入特定的变量或者是方法
#from sys import *          #导入所有方法
from sys import path
# 直接调用
print(path)
# ['C:\\Users\\user\\PycharmProjects\\pyProjects\\module', 'C:\\Users\\user\\PycharmProjects\\pyProjects', 'C:\\Windows\\system32\\python34.zip', 'C:\\Python34\\DLLs', 'C:\\Python34\\lib', 'C:\\Python34', 'C:\\Python34\\lib\\site-packages']

3
# 给导入的模块或者方法起一个别名
from sys import path as path_alias
# 调用的时候使用别名path_alias
print(path_alias)
{% endhighlight %}

> 区别是 `import` 会将 sys 这个变量名加载到名字空间，而 `from..import..` 只会将 path 这个变量名加载进来。  

#### 导入包里的模块

{% highlight python linenos %}
# 目录
pro
├── modules
│   ├── __init__.py
│   ├── lib01.py
│   └── lib02.py
└── hello.py
{% endhighlight %}

{% highlight python linenos %}
# hello.py
# 导入 lib01

1
# import lib01    # 错   不能直接导入
import module.lib01
# 调用
module.lib01.add()

2
from module import lib01
lib01.add()

3
from module.lib01 import add
add()

4
import module
# 执行 init 
{% endhighlight %}

> 不管是 from 还是直接 import ，如果 init 文件里有代码，则会执行里面的代码且只会执行一次，关于包的导入继续往下看

### 通过字符串导入模块

{% highlight python linenos %}
import importlib

module = 'src.user_info'             # 模块名
func_name = 'add'                    # 函数名
m = importlib.import_module(module)  # 导入模块
func = gerattr(module,func_name)     # 通过反射获取函数

func()                               # 执行函数

{% endhighlight %}

### 关于包

如果说 `模块(文件)` 是用来组织方法，那么 `包(目录)` 就是来组织 模块(文件) 的。  
<br>
　　每一个包目录下面都会有一个 `__init__.py` 的文件，这个文件是必须存在的，否则，Python 就把这个目录当成普通目录(文件夹)，而不是一个包。
`__init__.py` 可以是空文件，也可以有 Python 代码，因为 `__init__.py` 本身就是一个 `模块` ，而它的 `模块名就是对应包的名字` 。  

**`调用包就是执行包下的__init__.py文件`**

{% highlight python linenos %}
# 目录
pro
├── modules
│   ├── __init__.py
│   ├── lib01.py
│   └── lib02.py
└── hello.py
{% endhighlight %}

#### Basedir

> 在 lib01 里 import hello 是找不到的，
> 而在 pycharm 中却可以，那是因为 pycharm 把 pro 这一层路径加入到了 sys.path 里面，所以 Python 会在这个目录下找到 hello 文件，
> 然而程序一旦在命令行运行，则报错。那怎么办？简单，自己把这个路径加进去就OK啦：  

{% highlight python linenos %}
import sys,os
# __file__会返回当前执行文件的路径
# abspath会返回执行文件的完整路径
# dirname会找到上一层module，再一次会找到上一层Pro
# 最后添加到 sys.path
BASE_DIR=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
import hello
hello.hello1()
{% endhighlight %}

### 其他

#### \__name__

{% highlight python linenos %}
# 目录
pro
├── modules
│   ├── __init__.py
│   ├── lib01.py
│   └── lib02.py
└── hello.py
{% endhighlight %}

{% highlight python linenos %}
# lib01.py

print(__name__)     # __main__
{% endhighlight %}

{% highlight python linenos %}
# hello.py

import lib01
# 执行会输出 modules.lib01
{% endhighlight %}

　　当 module 被其它 module 引入使用时，其 \__name__ 的值将发生变化，\__name__ 的值将会是 module 的名字。
可以理解为 `"if __name__ == "__main__""` : 这一句与 c 中的 main() 函数所表述的是一致的，即作为入口

#### import是如何工作的

模块在被导入的时候会执行以下三个步骤：

1. 通过环境变量找到模块文件；
2. 编译成字节码文件，如果有字节码文件则导入字节码文件；
3. 执行模块中的代码来创建所定义的对象；  

　　以上的三个步骤只有在程序运行时，模块被第一次导入时才会进行。如果已经导入了这个模块然后再次导入的时候会跳过上面的三个步骤，它会直接提取内存中已经加载的模块对象。Python 已经导入的模块会保存在 `sys.modules` 字典中。

#### 模块导入顺序

- 先在当前脚本目录寻找有没有与导入模块名称相同的文件，如果有就把这个文件当作模块导入（这里有坑，测试 re 模块没有问题，但是测试 sys 模块就有问题了）
- 查找模块路径下面有没有对应的模块名
- 如果没有找到模块名就报错

#### 关于重新导入

可以使用 `imp` 模块中的 `reload` 方法重新载入某个模块的方法，例如下面的实例：

{% highlight python linenos %}
# simple.py 

print('Hello, World!')
spam = 1
{% endhighlight %}

{% highlight python linenos %}
>>> import simple
Hello, World!
>>> simple.spam
1
>>> simple.spam += 1
>>> import simple
>>> simple.spam
2
>>> import imp
>>> imp.reload(simple)
Hello, World!
<module 'simple' from '/Users/Linrb/simple.py'>
>>> simple.spam
1
{% endhighlight %}

#### \_X 与 \__all__

在模块中的所有变量以 `_` 开头的都不会被 from * 所导入

{% highlight python linenos %}
# simple.py 

_spam1 = 1
spam2 = 1
{% endhighlight %}

{% highlight python linenos %}
>>> from simple import *
>>> dir()
# _spam1没有被导入
['__builtins__', '__doc__', '__name__', '__package__', 'spam2']
{% endhighlight %}

相反的 `__all__` 列表里面的变量则会被 from * 所导入，没有在 \__all__ 列表里面的变量则不会被导入

{% highlight python linenos %}
# simple.py

__all__ = ['spam2']

spam1 = 1
spam2 = 1
{% endhighlight %}

{% highlight python linenos %}
>>> from simple import *
>>> dir()
# spam1没有被导入
['__builtins__', '__doc__', '__name__', '__package__', 'spam2']
{% endhighlight %}

### 安装Python第三方模块

Python官方为我们提供了第三方库，那么如何安装这些库呢？  
<br>
安装第三方库有两种方式：

1. 第一种就是使用python自带的仓库pip进安装
2. 第二种就是使用源码进行安装  

#### PIP 方式安装

首先用 yum 安装 python-pip 软件包

{% highlight bash linenos %}
[root@Linrb ~]# yum  install python-pip
{% endhighlight %}

安装完成之后可以使用 pip -V 查看安装版本

{% highlight bash linenos %}
[root@Linrb ~]# pip -V
pip 7.1.0 from /usr/lib/python2.6/site-packages (python 2.6)
{% endhighlight %}

以 requests 模块为例，先查看当前系统有没有安装 requests 模块

{% highlight bash linenos %}
[root@Linrb ~]# python
Python 2.6.6 (r266:84292, Jul 23 2015, 15:22:56) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-11)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
# 如果没有安装在导入的时候就会报错
>>> import requests
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ImportError: No module named requests
>>> exit()
{% endhighlight %}

用 pip 的方式安装 requests 模块

{% highlight bash linenos %}
[root@Linrb ~]# pip install requests
{% endhighlight %}

安装完成之后进入 python 解释器导入 requests 模块，看看能不能导入成功

{% highlight bash linenos %}
[root@Linrb ~]# python
Python 2.6.6 (r266:84292, Jul 23 2015, 15:22:56) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-11)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import requests
{% endhighlight %}

安装成功。
<br>
卸载执行 pip uninstall 加模块名

{% highlight bash linenos %}
[root@Linrb ~]# pip uninstall requests
{% endhighlight %}

#### 2、源码包方式安装

下载模块 requests 的源码包

{% highlight bash linenos %}
[root@Linrb ~]# git clone git://github.com/kennethreitz/requests.git
Initialized empty Git repository in /root/requests/.git/
remote: Counting objects: 17546, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 17546 (delta 0), reused 0 (delta 0), pack-reused 17544
Receiving objects: 100% (17546/17546), 5.04 MiB | 46 KiB/s, done.
Resolving deltas: 100% (11232/11232), done.
{% endhighlight %}

查看下载下来的文件

{% highlight bash linenos %}
[root@Linrb ~]# cd requests/
[root@Linrb requests]# ls
AUTHORS.rst      docs  HISTORY.rst  Makefile     NOTICE      requests                    requirements.txt  tests
CONTRIBUTING.md  ext   LICENSE      MANIFEST.in  README.rst  requirements-to-freeze.txt  setup.py
{% endhighlight %}

执行 python setup.py install 进行编译安装

{% highlight bash linenos %}
[root@Linrb requests]# python setup.py install
{% endhighlight %}

验证是否安装成功

{% highlight bash linenos %}
[root@Linrb requests]# python
Python 2.6.6 (r266:84292, Jul 23 2015, 15:22:56) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-11)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import requests
{% endhighlight %}
安装成功，以上就是 Python 第三方模块的两种安装方式。