// window.onload = function(){
  let canvas = document.getElementById('canvas');
  let context=canvas.getContext("2d");
  let uniform= document.getElementById('uniform');
  let circle = document.getElementById('circle');
  let ellipse = document.getElementById('ellipse');
  let pulse = document.getElementById('pulse');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = 600;
  let radius = 10;
  let animationFrame = null; // 记录执行的动画，用于取消
 // 画实体圆
  function drawCircle(x,y,radius,color){
    context.save();
    context.fillStyle = color;
    context.globalAlpha=0.95
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI *2);
    context.closePath();
    context.fill();
    context.restore();
  }
  // 画空心圆
  function drawEmptyCircle(x,y,radius,color){
    context.save();
    context.strokeStyle = color;
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI * 2);
    context.closePath();
    context.stroke();
    context.restore();    
  }
  // 画直线
  function drawLine(x1,y1,x2,y2,color){
    context.save();
    context.strokeStyle = color;    
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.closePath();
    context.stroke();
    context.restore();
  }
  // 画椭圆,兼容不好 
  // function drawEllipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise,color){
  //   context.save();
  //   context.strokeStyle = color;
  //   context.beginPath();
  //   context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
  //   context.closePath();
  //   context.stroke();
  //   context.restore();
  // } 
  // drawEllipse(width/2,height/2,200,100,0,0,Math.PI * 2,true,'red');

  // 画椭圆，使用lineTo,把椭圆分割许多片段
  // 椭圆的三角函数表达式 x = a*cos(t), y = b * sin(t);
  function drawEllipse(color,x,y,a,b){
   //这样可以使得每次循环所绘制的路径（弧线）接近1像素
    let step = (a > b) ? 1 / a : 1 / b;
    context.save();
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x + a,y);
    for(let i = 0; i < Math.PI *2; i += step){
      context.lineTo(x + a * Math.cos(i),y + b * Math.sin(i))
    }
    context.closePath();
    context.stroke();
    context.restore();
  }

  

  // 匀速直线运动
  let uniformX = radius; // 匀速运动 x 初始位置 
  let uniformSpeed = 5;
uniform.onclick = uniformRun;
function uniformRun(){
    window.cancelAnimationFrame(animationFrame); // 多次点击的时候，应先取消之前的动画
    animationFrame = window.requestAnimationFrame(uniformRun);
    context.clearRect(0,0,width,height);
    drawLine(0,height/2,width,height/2,'red');
    drawCircle(uniformX,height/2,radius,'green');
    if(uniformX < width){
      uniformX += uniformSpeed;
    }else{
      uniformX = 0;
    }
}


// 圆周运动
let circleR = 150; // 圆周运动的半径
let circleX = circleR ; // 圆周运动 x 初始位置 
let circleY = 0; // 圆周运动 y 初始位置
let angle = 3; // 旋转角度
let rad = 0;
circle.onclick = circleRun;
  
function circleRun(){
  window.cancelAnimationFrame(animationFrame)  
  animationFrame = window.requestAnimationFrame(circleRun);
  context.clearRect(0,0,width,height);
  context.save();
  drawEmptyCircle(width/2,height/2,circleR,'red');
  context.translate(width/2,height/2);
  context.rotate(Math.PI / 180 * rad );  
  drawCircle(circleX,circleY,radius,'green');
  context.restore();
  if(rad < 360){
   rad += angle;    
  }else{
    rad = 0;
  }
}

// 椭圆运动
let ellipseA = 300; // 长轴 a
let ellipseB = 100; // 短轴 b
let ellipseTime = 0;
// let ellipseStep = (ellipseA > ellipseB) ? 1 / ellipseA : 1 / ellipseB;  //控制运动速度
let ellipseStep = 0.05;  //控制运动速度

ellipse.onclick = ellipseRun;
function ellipseRun(){
  window.cancelAnimationFrame(animationFrame);
  animationFrame = window.requestAnimationFrame(ellipseRun);
  context.clearRect(0,0,width,height);
  drawEllipse('red',width/2,height/2, ellipseA ,ellipseB );
  drawCircle(width/2 + ellipseA * Math.cos(ellipseTime),height/2 + ellipseB * Math.sin(ellipseTime),radius,'green');
  ellipseTime += ellipseStep;
} 

// 脉冲运动
let pulseSpeed  = 0.05; // 缩放大小的速度
let pulseAngle = 0;
let pulseRadius = 30;
let pulseAlpha = 1;
let pulseColor = 'green';
let pulseOpSpeed = 0.05; // 透明度渐变的速度
let pulseOpValue = 0; // 控制透明度的值
pulse.onclick = pulseRun;
function pulseRun(){
  window.cancelAnimationFrame(animationFrame);
  animationFrame = window.requestAnimationFrame(pulseRun);
  context.clearRect(0,0,width,height);
  context.save();
  pulseColor = `rgba(0,156,0,${ pulseAlpha})`;
  drawCircle(width/2,height/2,pulseRadius * Math.abs(Math.sin(pulseAngle)),pulseColor);
  pulseAngle += pulseSpeed;
  pulseOpValue += pulseOpSpeed;
  pulseAlpha = Math.abs(Math.sin(pulseOpValue))
  context.restore();
  
}