---
title: 数据库操作
layout: post
---

* TOC
{:toc}

### 数据库操作

#### 显示数据库

{% highlight python linenos %}
SHOW DATABASES;
{% endhighlight %}

默认数据库：  
　　mysql - 用户权限相关数据  
　　test - 用于用户测试数据  
　　information_schema - MySQL本身架构相关数据  

#### 创建数据库

{% highlight python linenos %}
# utf-8
CREATE DATABASE 数据库名称 DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
 
# gbk
CREATE DATABASE 数据库名称 DEFAULT CHARACTER SET gbk COLLATE gbk_chinese_ci;
{% endhighlight %}

#### 使用数据库

{% highlight python linenos %}
USE db_name;
{% endhighlight %}

显示当前使用的数据库中所有表：SHOW TABLES;  

#### 用户管理

{% highlight python linenos %}
创建用户
    create user '用户名'@'IP地址' identified by '密码';
删除用户
    drop user '用户名'@'IP地址';
修改用户
    rename user '用户名'@'IP地址' to '新用户名'@'IP地址';;
修改密码
    set password for '用户名'@'IP地址' = Password('新密码')
{% endhighlight %}

PS：用户权限相关数据保存在 mysql 数据库的 user 表中，所以也可以直接对其进行操作（不建议）  

#### 授权管理

{% highlight python linenos %}
show grants for '用户'@'IP地址'                  -- 查看权限
grant  权限 on 数据库.表 to   '用户'@'IP地址'      -- 授权
revoke 权限 on 数据库.表 from '用户'@'IP地址'      -- 取消权限
{% endhighlight %}

{% highlight python linenos %}

对于权限
-------------------------------------------------------------
all privileges          除grant外的所有权限
select                  仅查权限
select,insert           查和插入权限
usage                   无访问权限
alter                   使用alter table
alter routine           使用alter procedure和drop procedure
create                  使用create table
create routine          使用create procedure
create temporary tables 使用create temporary tables
create user             使用create user、drop user、rename user和revoke  all privileges
create view             使用create view
delete                  使用delete
drop                    使用drop table
execute                 使用call和存储过程
file                    使用select into outfile 和 load data infile
grant option            使用grant 和 revoke
index                   使用index
insert                  使用insert
lock tables             使用lock table
process                 使用show full processlist
select                  使用select
show databases          使用show databases
show view               使用show view
update                  使用update
reload                  使用flush
shutdown                使用mysqladmin shutdown(关闭MySQL)
super                   􏱂􏰈使用change master、kill、logs、purge、master和set global。还允许mysqladmin􏵗􏵘􏲊􏲋调试登陆
replication client      服务器位置的访问
replication slave       由复制从属使用

对于数据库
-------------------------------------------------------------
数据库名.*            数据库中的所有表
数据库名.表           指定数据库中的某张表
数据库名.存储过程     指定数据库中的存储过程
*.*                   所有数据库

对于用户和IP
-------------------------------------------------------------
用户名@IP地址         用户只能在该IP下才能访问
用户名@192.168.1.%    用户只能在该IP段下才能访问(通配符%表示任意)
用户名@%              用户可以再任意IP下访问(默认IP地址为%)

示例
-------------------------------------------------------------
grant all privileges on db1.tb1 TO '用户名'@'IP'
grant select on db1.* TO '用户名'@'IP'
grant select,insert on *.* TO '用户名'@'IP'
revoke select on db1.tb1 from '用户名'@'IP'
{% endhighlight %}


















