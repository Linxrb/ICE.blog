---
title: Python 全栈标准库之hashlib
layout: post
---


> This module implements a common interface to many different secure hash and message digest algorithms. Included are the FIPS secure hash algorithms SHA1, SHA224, SHA256, SHA384, and SHA512 (defined in FIPS 180-2) as well as RSA’s MD5 algorithm (defined in Internet RFC 1321). The terms “secure hash” and “message digest” are interchangeable. Older algorithms were called message digests. The modern term is secure hash.  

官方文档：[https://docs.python.org/3.5/library/hashlib.html](https://docs.python.org/3.5/library/hashlib.html)  
　　用于加密相关的操作，代替了md5模块和sha模块，主要提供 SHA1, SHA224, SHA256, SHA384, SHA512 ，MD5 算法  
<br>
**md5加密**

{% highlight python linenos %}
import hashlib
# hashlib后面是把数据加密成什么类型
hash = hashlib.md5()
# 在python3内，加密的字符串转换成字节指定字符编码
hash.update(bytes('Linrb', encoding='utf-8'))    # hash.update("Linrb".encoding('utf-8'))
# 获取加密后的md5值
hash.hexdigest()
'c68f15638a51482030a248f2c9e9f24e'
{% endhighlight %}

为防止别人对的md5值进行撞库，可以给md5加盐

{% highlight python linenos %}
import hashlib
# hashlib.md5括号内填写盐的内容
hash = hashlib.md5(bytes('me', encoding='utf-8'))
hash.hexdigest()
'5a11a293491401f1d22b3658d5d74ebd'
{% endhighlight %}

模块中还有 `sha1` `sha256` `sha384` `sha512` 使用方法都和上面例子一样  
