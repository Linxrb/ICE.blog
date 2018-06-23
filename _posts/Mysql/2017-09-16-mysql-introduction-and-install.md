---
title: Mysql介绍和安装
layout: post
---

* TOC
{:toc}

### 概述

`1、什么是数据库？`  
　答：数据的仓库，如：在之前的示例中创建了一个 db 目录，称其为数据库  

`2、什么是 MySQL、Oracle、SQLite、Access、MS SQL Server等？`  
　答：他们均是一个软件，都有两个主要的功能：  
- a. 将数据保存到文件或内存  
- b. 接收特定的命令，然后对文件进行相应的操作  

　　PS：如果有了以上软件，无须自己再去创建文件和文件夹，而是直接传递 命令 给上述软件，让其来进行文件操作，他们统称为数据库管理系统（DBMS，Database Management System）  

`3、什么是SQL ？`  
　答：上述提到MySQL等软件可以接受命令，并做出相应的操作，由于命令中可以包含删除文件、获取文件内容等众多操作，对于编写的命令就是是SQL语句。SQL，是结构化语言（Structured Query Language）的缩写，SQL 是一种专门用来与数据库通信的语言。  

### 下载安装

　　MySQL 是一个 `关系型数据库管理系统` ，由瑞典 MySQL AB 公司开发，目前属于 Oracle 旗下公司。MySQL 最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS (Relational Database Management System，关系数据库管理系统) 应用软件之一。  

想要使用MySQL来存储并操作数据，则需要做几件事情：  
- a. 安装MySQL服务端
- b. 安装MySQL客户端
- b. 【客户端】连接【服务端】
- c. 【客户端】发送命令给【服务端MySQL】服务的接受命令并执行相应操作(增删改查等)

#### Windows版本

##### `a、下载`  

{% highlight python linenos %}
MySQL Community Server 5.7.16
 
http://dev.mysql.com/downloads/mysql/
{% endhighlight %}

##### `b、解压`  

如果想要让 MySQL 安装在指定目录，那么就将解压后的文件夹移动到指定目录，如：C:\mysql-5.7.16-winx64  

##### `c、初始化`  

MySQL 解压后的 bin 目录下有一大堆的可执行文件，执行如下命令初始化数据：  

{% highlight python linenos %}
cd c:\mysql-5.7.16-winx64\bin
 
mysqld --initialize-insecure
{% endhighlight %}

##### `d、启动MySQL服务`  

执行命令从而启动 MySQL 服务  

{% highlight python linenos %}
# 进入可执行文件目录
cd c:\mysql-5.7.16-winx64\bin
 
# 启动MySQL服务
mysqld
{% endhighlight %}

##### `e、启动MySQL客户端并连接MySQL服务`  

由于初始化时使用的【mysqld --initialize-insecure】命令，其默认未给 root 账户设置密码  

{% highlight python linenos %}
# 进入可执行文件目录
cd c:\mysql-5.7.16-winx64\bin
 
# 连接MySQL服务器
mysql -u root -p
 
# 提示请输入密码，直接回车
{% endhighlight %}

　　到此为止，MySQL服务端已经安装成功并且客户端已经可以连接上，以后再操作 MySQL 时，只需要重复上述d、e步骤即可。
但是，在d、e步骤中重复的进入可执行文件目录比较繁琐，如想日后操作简便，可以做如下操作。  

- 1.添加环境变量

　　将MySQL可执行文件添加到环境变量中，从而执行执行命令即可  
如此一来，以后再启动服务并连接时，仅需：  

{% highlight python linenos %}
# 启动MySQL服务，在终端输入
mysqld
 
# 连接MySQL服务，在终端输入：
mysql -u root -p
{% endhighlight %}

- 2.将MySQL服务制作成 windows 服务  

　　上一步解决了一些问题，但不够彻底，因为在执行【mysqd】启动MySQL服务器时，当前终端会被hang住，那么做一下设置即可解决此问题：  

{% highlight python linenos %}
# 制作MySQL的Windows服务，在终端执行此命令：
"c:\mysql-5.7.16-winx64\bin\mysqld" --install
 
# 移除MySQL的Windows服务，在终端执行此命令：
"c:\mysql-5.7.16-winx64\bin\mysqld" --remove
{% endhighlight %}

注册成服务之后，以后再启动和关闭MySQL服务时，仅需执行如下命令：  

{% highlight python linenos %}
# 启动MySQL服务
net start mysql
 
# 关闭MySQL服务
net stop mysql
{% endhighlight %}















