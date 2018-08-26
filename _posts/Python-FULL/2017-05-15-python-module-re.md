---
title: Python 全栈系列之正则表达式 re
layout: post
---

* TOC
{:toc}

<br><br>

　　正则表达式并不是 Python 的一部分。正则表达式是用于处理字符串的强大工具，拥有自己独特的语法以及一个独立的处理引擎，效率上可能不如 str 自带的方法，但功能十分强大。得益于这一点，在提供了正则表达式的语言里，正则表达式的语法都是一样的，区别只在于不同的编程语言实现支持的语法数量不同；但不用担心，不被支持的语法通常是不常用的部分。  
<br>

### 正则表达式

**正则表达式概念**  
1. 使用单个字符串来描述匹配一系列符合某个句法规则的字符串  
2. 是对字符串操作的一种逻辑公式  
3. 应用场景：处理文本和数据  
4. 正则表示是过程：依次拿出表达式和文本中的字符比较，如果每一个字符都能匹配，则匹配成功；否则匹配失败  

#### 语法

{% highlight python linenos %}
import re

# 方式一：
re.findall(pattern, string, flags)

# 方式二：
# 生成Pattern对象实例,r表示匹配源字符串
ret = re.compile(r'nick')
print(type(ret))               # <class '_sre.SRE_Pattern'>
ret.findall(string)
{% endhighlight %}

#### 常用的正则表达式符号(元字符)

{% highlight python linenos %}
' . '      # 默认匹配除\n之外的任意一个字符，若指定flag DOTALL,则匹配任意字符，包括换行
' ^ '      # 匹配字符开头，若指定flags MULTILINE,这种也可以匹配上(r"^a","\nabc\neee",flags=re.MULTILINE)
' $ '      # 匹配字符结尾，或e.search("foo$","bfoo\nsdfsf",flags=re.MULTILINE).group()也可以
' * '      # 匹配*号前的字符0次或多次，re.findall("ab*","cabb3abcbbac")  结果为['abb', 'ab', 'a']
' + '      # 匹配前一个字符1次或多次，re.findall("ab+","ab+cd+abb+bba") 结果['ab', 'abb']
' ? '      # 匹配前一个字符1次或0次
'{m}'      # 匹配前一个字符m次
'{n,m}'    # 匹配前一个字符n到m次，re.findall("ab{1,3}","abb abc abbcbbb") 结果'abb', 'ab', 'abb']
' | '      # 匹配|左或|右的字符，re.search("abc|ABC","ABCBabcCD").group() 结果'ABC'
'(..)'     # 分组匹配，re.search("(abc){2}a(123|456)c", "abcabca456c").group() 结果 abcabca456c
 
 
' \A '     # 只从字符开头匹配，re.search("\Aabc","apexabc") 是匹配不到的
' \Z '     # 匹配字符结尾，同$
' \d '     # 匹配数字0-9
' \D '     # 匹配非数字
' \w '     # 匹配[A-Za-z0-9]
' \W '     # 匹配非[A-Za-z0-9]
' \s '     # 匹配空白字符、\t、\n、\r , re.search("\s+","ab\tc1\n3").group() 结果 '\t'
' \b '     # 匹配特殊字符边界

flags

're.I'     # 不区分大小写
're.M'     #
 
'(?P<name>...)' # 分组匹配 re.search("(?P<province>[0-9]{4})(?P<city>[0-9]{2})(?P<birthday>[0-9]{4})","371481199306143242").groupdict("city") 
                # 结果{'province': '3714', 'city': '81', 'birthday': '1993'}
{% endhighlight %}

**元字符之字符集［］：**

{% highlight python linenos %}
# ------------- 或的关系 -----------------------字符集[]
# 字符集里不需要用 ，分隔，，在里面也是匹配对象
ret = re.findall('ab[cd]e','abcde')
print(ret) # []   只能取 c 或 d

ret = re.findall('a[bc]d','acd')
print(ret) # ['acd']
 
ret = re.findall('[a-z]','acd')
print(ret) # ['a', 'c', 'd']
 
ret = re.findall('[.*+]','a.cd+')       # 元字符在字符集里没有特殊意义
print(ret) # ['.', '+']
 
# 在字符集里有功能的符号: - ^ \
 
ret = re.findall('[1-9]','45dha3')
print(ret) # ['4', '5', '3']
 
ret = re.findall('[^ab]','45bdha3')     # 这里 ^ 是取反，即：非
print(ret) # ['4', '5', 'd', 'h', '3']
 
ret = re.findall('[\d]','45bdha3')
print(ret) # ['4', '5', '3']
{% endhighlight %}

#### 常用的匹配语法

{% highlight python linenos %}
re.match        # 从头开始匹配，返回一个对象，通过 group() 取值，只匹配一次
re.search       # 匹配包含，返回一个对象，通过 group() 取值，只匹配一次
re.findall      # 把所有匹配到的字符放到以列表中的元素返回
re.finditer     # 返回一个迭代器
re.split        # 分隔，按规则分割成两个，再继续分割后面那一个，可指定次数
re.sub          # 匹配字符并替换
re.subn         # 和 sub 一样，它会返回替换了多少次

ret = re.finditer("(abc)(123)","abc123abc") # <callable_iterator object at 0x0146FEB0>
next(ret)                                   # <_sre.SRE_Match object; span=(0, 6), match='abc123'>
next(ret).group()                           # abc123
next(ret).groups()                          # ('abc', '123')

re.split("[\d,]","ab96c",)                  # ['ab', '', 'c'] 匹配到9时[ab, 6c]  然后再匹配到6['', c]
re.split("[\d,]","ab96c",1)                 # 分割次数  ['ab', '6c']

re.sub("abc","def","abc123abc")             # 'def123def'
re.sub("abc","def","abc123abc",count=1)     # 'def123abc'
{% endhighlight %}

#### 关于反斜杠
　　与大多数编程语言相同，正则表达式里使用 `\` 作为转义字符，反斜杠后边跟元字符去除特殊功能,比如 `\.`，这就可能造成反斜杠困扰。假如你需要匹配文本中的字符 `\` ，那么使用编程语言表示的正则表达式里将需要4个反斜杠 `\\\\` ：在Python 中，`\\\\` 会转义成 `\\` ，在正则表达式里也用 `\` 做转义，所以 re 拿到2个 `\\` 后会把它转义成1个 `\`。Python 里的原生字符串很好地解决了这个问题，这个例子中的正则表达式可以使用r"\\"表示。同样，匹配一个数字的"\\d"可以写成r"\d"。有了原生字符串，你再也不用担心是不是漏写了反斜杠，写出来的表达式也更直观。  

#### 分组匹配和分组别名

{% highlight python linenos %}
# findall 加分组只会取分组里的，先匹配到整体，再从整体里把分组组成元祖返回
re.findall("(abc(123))","abc123abc123")                         # [('abc123', '123'), ('abc123', '123')]
re.findall(r'(ad)+', 'adadadadadd')                             # ['ad']
re.findall("(abc)(123)","abc123abc")                            # [('abc', '123')]
re.findall("(?:abc)(?:123)","abc123abc")                        # ['abc123']   取消组的优先级
re.findall("(abc)(123)","abc123abc123")                         # [('abc', '123'), ('abc', '123')]

re.search("abc(123)","abc123abc123").group()                    # abc123  返回整体
re.search("(abc)(123)","abc123abc123").groups()                 # ('abc', '123')  只返回分组
re.search("(?P<zimu>abc)(?P<shuzi>123)","abc123").groupdict()   # {'zimu': 'abc', 'shuzi': '123'}  返回一个字典
re.search("(?P<zimu>abc)(?P<shuzi>123)","abc123").group("zimu") # abc  返回分组名对应的值

# 关于 match 和 search 一样
{% endhighlight %}

#### 贪婪匹配和惰性匹配

　　注意：前面的 `*` , `+` , `?` ,`{}` 等都是贪婪匹配，也就是尽可能多的匹配，后面加 `?` 号使其变成惰性匹配，即尽可能少的匹配

{% highlight python linenos %}
ret = re.findall('abc*?','abcccccc')
print(ret) # ['ab']

ret = re.findall('abc*','abcccccc')
print(ret) # ['abcccccc']
{% endhighlight %}


### 实例

{% highlight python linenos %}
>>> import re
 # 定义的字符串
 >>> source = '''I wish I may, I wish I migth
 ... Hava a dish of fish tonight.'''
 # 在字符串中检索wish
 >>> re.findall('wish',source)
 ['wish', 'wish']
 # 对源字符串任意位置查询wish或者fish
 >>> re.findall('wish|fish',source)
 ['wish', 'wish', 'fish']
 # 从字符串开头开始匹配wish
 >>> re.findall('^wish',source)    
 []
 # 从字符串开头匹配I wish
 >>> re.findall('^I wish',source)
 ['I wish']
 # 从字符串结尾匹配fish
 >>> re.findall('fish$',source)   
 []
 # 从字符串结尾匹配fish tonight.
 >>> re.findall('fish tonight.$',source)
 ['fish tonight.']
 # 查询以w或f开头,后面紧跟着ish的匹配
 >>> re.findall('[wf]ish',source)
 ['wish', 'wish', 'fish']
 # 查询以若干个w\s\h组合的匹配
 >>> re.findall('[wsh]+',source) 
 ['w', 'sh', 'w', 'sh', 'h', 'sh', 'sh', 'h']
 # 查询以ght开头，后面紧跟着一个非数字和字母的匹配
 >>> re.findall('ght\W',source)
 ['ght.']
 # 查询已以I开头，后面紧跟着wish的匹配
 >>> re.findall('I (?=wish)',source)
 ['I ', 'I ']
 # 最后查询以wish结尾,前面为I的匹配（I出现次数尽量少）
 >>> re.findall('(?<=I) wish',source)
 [' wish', ' wish']
 # 匹配时不区分大小写
 >>> re.match('a','Abc',re.I).group()
 'A'
 >>> import re
 >>> pa = re.compile(r'Linrb')
 >>> pa.match("Linrb.me")
 <_sre.SRE_Match object; span=(0, 7), match='Linrb'>
 >>> ma = pa.match("Linrb.me")
 >>> ma
 <_sre.SRE_Match object; span=(0, 7), match='Linrb'>
 # 匹配到的值存到group内
 >>> ma.group()
 'Linrb'
 # 返回字符串的所有位置
 >>> ma.span()
 (0, 7)
 # 匹配的字符串会被放到string中
 >>> ma.string
 'Linrb.me'
 # 实例放在re中
 >>> ma.re
 re.compile('Linrb')
{% endhighlight %}