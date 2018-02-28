---
title: socket 获取百度首页
layout: post
---

网络编程,向百度发送请求,获取百度首页代码，保存到本地
{% highlight python linenos %}
#coding=utf-8
#客户端建立socket套接字
#引入socket模块
import socket

#实例化一个套接字，2个参数分别是： IPV4、TCP 协议
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#建立连接，2个参数是： 网址、端口
s.connect(('www.baidu.com', 80))
#向服务器发送请求,传递的参数是：1.请求方式 2.地址 3.链接方式（open or close）
#注：‘GET / HTTP’这里的‘/’是跟目录的意思
s.send(b'GET / HTTP/1.1\r\nHost:www.baidu.com\r\nConnection: close\r\n\r\n')

#开始接受服务器传来的数据
buffer = []  #新建一个空列表，buffer即缓存的意思
while True:  #【降一级，防止出现不可控错误？】
    d = s.recv(1024)  # 每次最多接收1k字节
    if d:  # 如果能正常接收到d（即d不为空）
        buffer.append(d)
    else:
        break
data = b''.join(buffer)  #组合传来的（列表格式的）数据为字符串(b)格式

#关闭文件
s.close()

#开始处理数据
#分离网页头部与html,注：头部信息是网络传输时的标识信息，通常不需要展示出这部分
header, html = data.split(b'\r\n\r\n', 1)
#以utf-8解码为正常文本
print(header.decode('utf-8'))
#新建文件，将接收到的数据接入文件内
with open('baidu.html', 'wb')as f:
    f.write(html)
{% endhighlight %}