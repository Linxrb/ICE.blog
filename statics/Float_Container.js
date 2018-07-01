var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
var flag = false;
for (var v = 0; v < Agents.length; v++) {
    if (navigator.userAgent.indexOf(Agents[v]) > 0) {
        flag = true;
            break;
        }
}


//图片的过程中，横坐标的轨迹是以一点为中心的正弦曲线
//利用了setTimeout函数完成了动画的功能
//pc端雪花个数
var no = 6;
if (flag){no = 5;}    //设备端
 
//声明变量，xp表示横坐标，yp表示纵坐标>
var dx, xp, yp;
//声明变量，am表示左右摆动的幅度，stx表示横坐标的偏移步长，sty表示纵坐标的步长>
var am, stx, sty;  
{
  //获取当前窗口的宽度
  clientWidth =  document.body.clientWidth;
  //获取当前窗口的高度
  clientHeight = document.body.clientHeight;
}

var dx = new Array();
var xp = new Array();
var yp = new Array();
var am = new Array();
var stx = new Array();
var sty = new Array();
var snowFlakes = new Array();
for (i = 0; i < no; ++ i) {  
  //图片
  var imagesSrc=['0.gif','1.gif','2.gif','3.gif'];//img数据
  var t=Math.random()*12%3; //返回一个0-3的数(随机数)
  t=parseInt(t);//返回整数
  //设置img路径  
  var snowsrc= '/images/' + imagesSrc[t];
  dx[i] = 0;                        
  xp[i] = Math.random()*(clientWidth-50);  //第i个图片的横坐标初始值
  yp[i] = Math.random()*clientHeight;//第i个图片的纵坐标初始值
  am[i] = Math.random()*5;         //第i个图片的左右摆动的幅度
  stx[i] = 0.02 + Math.random()/10; //第i个图片x方向的步长
  sty[i] = 0.7 + Math.random();     //第i个图片y方向的步长
  //生成一个容纳雪花图片的div，并设置其绝对坐标
  var snowFlakeDiv = document.createElement('div');
  snowFlakeDiv.setAttribute('id', 'dot'+ i);
  snowFlakeDiv.style.position = 'fixed';
  snowFlakeDiv.style.top = 15+ 'px';
  snowFlakeDiv.style.left = 15 +'px';
  //生成一个雪花图片对象，设置宽高，并加入div
  var snowFlakeImg = document.createElement('img');
  snowFlakeImg.setAttribute('src', snowsrc);
  //snowFlakeImg.style.width = 30;
  //snowFlakeImg.style.height = 30;
  //将雪花div加入到document中，并通过数组保存
  snowFlakeDiv.appendChild(snowFlakeImg);
  document.body.appendChild(snowFlakeDiv);
  snowFlakes[i] = snowFlakeDiv;
}
function snow() {  

  for (i = 0; i < no; ++ i) {  
    //第i个图片的纵坐标加上步长
    yp[i] = yp[i] + sty[i];
    //如果新坐标超过了屏幕下沿，重置该图片的信息，包括横坐标、纵坐标以及x方向的步长和y方向的步长
    if (yp[i] > clientHeight-50) {
      //重新赋值图片的横坐标
      xp[i] = Math.random()*(clientWidth-am[i]-30);
      //重新赋值图片的纵坐标
      yp[i] = 0;
    }
    clientWidth =  document.body.clientWidth;
    clientHeight = document.body.clientHeight;
    if (xp[i] > clientWidth-50) {
      //重新赋值图片的横坐标
      xp[i] = Math.random()*(clientWidth-am[i]-30);
      //重新赋值图片的纵坐标
      yp[i] = 0;
    }
    dx[i] = dx[i] + stx[i];//dx变量加上一个步长
    //直接操作数组中对应的雪花div
    var snowFlakeDiv = snowFlakes[i];
    //更新图片的纵坐标
    snowFlakeDiv.style.top = yp[i] +'px';
    //更新图片的横坐标
    snowFlakeDiv.style.left = xp[i] + am[i] * Math.sin(dx[i]) + 'px';
  }
  //设定动画刷新的时间周期
  setTimeout("snow()", 100);
}
//调用snowIE()函数 
snow();

