---
title: 编码与解码
layout: post
---

<br><br>

{% highlight python linenos %}
str >>> bytes : 编码
bytes >>> str : 解码

date = "ice冰"

编码1
b1 = bytes(date, "utf8")
print(b1)    # b'ice\xe5\x86\xb0'

编码2
b2 = date.encode("utf8")
print(b2)    # b'ice\xe5\x86\xb0'

解码
s = str(b1, "gbk")  # 报错，有时候是乱码，因为汉字在utf8中占3个字节，在gbk中占两个字节

解码1
s1 = str(b1, "utf8")
print(s1)    # ice冰

解码2
s2 = b2.decode("utf8")
print(s2)    # ice冰
{% endhighlight %}