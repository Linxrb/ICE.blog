---
title: Python 全栈系列之正则表达式 re
layout: post
---

<div id='toggle'></div>

|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|语法|元字符|常用语法|反斜杠|分组 别名|


正则表达式并不是 Python 的一部分。正则表达式是用于处理字符串的强大工具，拥有自己独特的语法以及一个独立的处理引擎，效率上可能不如 str 自带的方法，但功能十分强大。得益于这一点，在提供了正则表达式的语言里，正则表达式的语法都是一样的，区别只在于不同的编程语言实现支持的语法数量不同；但不用担心，不被支持的语法通常是不常用的部分。  
<br>
  
**正则表达式概念**  
1 使用单个字符串来描述匹配一系列符合某个句法规则的字符串  
2 是对字符串操作的一种逻辑公式  
3 应用场景：处理文本和数据  
4 正则表示是过程：依次拿出表达式和文本中的字符比较，如果每一个字符都能匹配，则匹配成功；否则匹配失败  

#### 1、语法

```python
import re

#方式一：
re.findall(pattern, string, flags)

#方式二：
#生成Pattern对象实例,r表示匹配源字符串
ret = re.compile(r'nick')
print(type(ret))               #<class '_sre.SRE_Pattern'>
ret.findall(string)
```

#### 2、常用的正则表达式符号(元字符)

```python
' . '      #默认匹配除\n之外的任意一个字符，若指定flag DOTALL,则匹配任意字符，包括换行
' ^ '      #匹配字符开头，若指定flags MULTILINE,这种也可以匹配上(r"^a","\nabc\neee",flags=re.MULTILINE)
' $ '      #匹配字符结尾，或e.search("foo$","bfoo\nsdfsf",flags=re.MULTILINE).group()也可以
' * '      #匹配*号前的字符0次或多次，re.findall("ab*","cabb3abcbbac")  结果为['abb', 'ab', 'a']
' + '      #匹配前一个字符1次或多次，re.findall("ab+","ab+cd+abb+bba") 结果['ab', 'abb']
' ? '      #匹配前一个字符1次或0次
'{m}'      #匹配前一个字符m次
'{n,m}'    #匹配前一个字符n到m次，re.findall("ab{1,3}","abb abc abbcbbb") 结果'abb', 'ab', 'abb']
' | '      #匹配|左或|右的字符，re.search("abc|ABC","ABCBabcCD").group() 结果'ABC'
'(..)'     #分组匹配，re.search("(abc){2}a(123|456)c", "abcabca456c").group() 结果 abcabca456c
 
 
' \A '     #只从字符开头匹配，re.search("\Aabc","apexabc") 是匹配不到的
' \Z '     #匹配字符结尾，同$
' \d '     #匹配数字0-9
' \D '     #匹配非数字
' \w '     #匹配[A-Za-z0-9]
' \W '     #匹配非[A-Za-z0-9]
' \s '     #匹配空白字符、\t、\n、\r , re.search("\s+","ab\tc1\n3").group() 结果 '\t'
' \b '     #匹配特殊字符边界

flags

're.I'     #不区分大小写
're.M'     #
 
'(?P<name>...)' #分组匹配 re.search("(?P<province>[0-9]{4})(?P<city>[0-9]{2})(?P<birthday>[0-9]{4})","371481199306143242").groupdict("city") 
                #结果{'province': '3714', 'city': '81', 'birthday': '1993'}

```

#### 3、常用的匹配语法

```python
re.match        #从头开始匹配，返回一个对象，通过 group() 取值，只匹配一次
re.search       #匹配包含，返回一个对象，通过 group() 取值，只匹配一次
re.findall      #把所有匹配到的字符放到以列表中的元素返回
re.split        #以匹配到的字符当做列表分隔符
re.sub          #匹配字符并替换

re.split("[\d,]","ab96c",)               #['ab', '', 'c'] 匹配到9时[ab, 6c]  然后再匹配到6['', c]
re.split("[\d,]","ab96c",1)              #分割次数  ['ab', '6c']

re.sub("abc","def","abc123abc")          #'def123def'
re.sub("abc","def","abc123abc",count=1)  #'def123abc'
```

#### 4、关于反斜杠
与大多数编程语言相同，正则表达式里使用 `\` 作为转义字符，这就可能造成反斜杠困扰。假如你需要匹配文本中的字符 `\` ，那么使用编程语言表示的正则表达式里将需要4个反斜杠 `\\\\` ：在Python 中，`\\\\` 会转义成 `\\` ，在正则表达式里也用 `\` 做转义，所以 re 拿到2个 `\\` 后会把它转义成1个 `\`。Python 里的原生字符串很好地解决了这个问题，这个例子中的正则表达式可以使用r"\\"表示。同样，匹配一个数字的"\\d"可以写成r"\d"。有了原生字符串，你再也不用担心是不是漏写了反斜杠，写出来的表达式也更直观。  

#### 5、分组匹配和分组别名

```python
re.findall("(abc(123))","abc123abc123")                         #[('abc123', '123'), ('abc123', '123')]

re.search("abc(123)","abc123abc123").group()                    #abc123
re.search("(abc)(123)","abc123abc123").groups()                 #('abc', '123')
re.search("(?P<zimu>abc)(?P<shuzi>123)","abc123").groupdict()   #{'zimu': 'abc', 'shuzi': '123'}
re.search("(?P<zimu>abc)(?P<shuzi>123)","abc123").group("zimu") #abc

#关于 match 和 search 一样
```