// window.onload = function() {
  let canvas=document.getElementById("canvas");
  let pic = document.getElementById('pic');
let txt = document.getElementById('txt');
let text = document.getElementById('text');
  let ctx=canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let scale = 250;
  let width = canvas.width;
  let height = canvas.height;
  let pixels=[];  //存储像素数据
  let dots = []; // 存储像素数据 
  let radius = 5;
  let duration = 3000; // 持续时间
  let now = new Date();
  let lastTime = null;
  let isGather = false;
  let animationFrame;
//   loadImage()
  function drawText(text){
      ctx.save();
      ctx.font = "15em Verdana";
      ctx.fillStyle = "#ccc";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text,width/2,height/2);
      ctx.restore();
  }

  function getPixels(){
      let pos=0;
      let imageData = ctx.getImageData(0,0,width,height)
      ctx.clearRect(0,0,width,height);
      dots =[];   
      let data=imageData.data;    //RGBA的一维数组数据
      //i列j行
      for(let i=0;i<=width;i+=radius*2){
          for(let j=0;j<=height;j+=radius*2){
              pos=[ j * width + i ] * 4; //取得像素位置
              if(data[pos+3]>0){  
                  let color = `rgba(${data[pos]},${data[pos+1]},${data[pos+2]},${data[pos+3]})`;
                  let pixel={
                      x:i, //重新设置每个像素的位置信息
                      y:j, //重新设置每个像素的位置信息
                      radius: radius,
                      fillStyle:color
                  }

                  dots.push(new Dot(i,j,radius,color))
              }

          }
      }
  } 




  const Dot = function(centerX,centerY,radius,color){

      this.dx = Math.random()*width;
      this.dy = Math.random()*height;
 
      this.x = centerX;
      this.y = centerY;
      this.radius = radius;
      this.color = color;
      this.a = 25; // 小球移动的速度
              
      let temp = Math.sqrt(Math.pow((this.x-this.dx),2)  +  Math.pow((this.y - this.dy),2))
      this.vx = (this.x - this.dx)/temp;
      this.vy = (this.y - this.dy)/temp;
      this.updateBallPos = () => {
         if(Math.abs(this.dx -this.x) > this.a){
            this.dx += this.vx*this.a;
            this.dy += this.vy*this.a;
         }else{
             this.dx = this.x;
             this.dy = this.y;
         }
         return {dx: this.dx,dy: this.dy}
      }

      this.drawCircle = function(x,y,radius,color){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI *2);
        ctx.closePath();
        ctx.fill();
    }
  }

 updateAllBalls = () => {
    animationFrame = window.requestAnimationFrame(updateAllBalls)
    ctx.clearRect(0,0,width,height);
    ctx.save();
    for(let i = 0;i < dots.length;i++){
        let  dot = dots[i];
        let pos = dot.updateBallPos();
        dot.drawCircle(pos.dx,pos.dy,dot.radius,dot.color)
    }
    let isCancel = cancelAnimation();
    isCancel && window.cancelAnimationFrame(animationFrame)  
    ctx.restore();     
 }
 cancelAnimation = () => {
    let flag = true; 
    for(let i = 0;i < dots.length;i++){
      if(dots[i].dx !== dots[i].x){
          flag = false;
          break;
      }  
    }
   return flag;
 }
// 图片粒子化
 function loadImage(){
    ctx.clearRect(0,0,width,height);
    animationFrame&&window.cancelAnimationFrame(animationFrame);  
    ctx.save();
    let image = new Image();
    image.src = "./test.jpg";
    image.onload=function(){
        ctx.drawImage(image,width/2 - 400,50,800,500);
        getPixels();    //获取所有像素
        updateAllBalls();
    };
    ctx.restore();
  }
  // 文字粒子化
 function particleText(text){
    animationFrame&&window.cancelAnimationFrame(animationFrame); 
    ctx.clearRect(0,0,width,height);
    ctx.save();
     drawText(text||'SELINAYU');
     getPixels();
    updateAllBalls();
    ctx.restore();
  }
  // 输入修改确定

  changeInputEnter = (e) => {
    let val = text.value;
    if(e.keyCode === 13){
        particleText(val)
    }
  }

pic.addEventListener('click',loadImage);
txt.addEventListener('click',particleText.bind(this,''))
text.addEventListener('keydown',changeInputEnter)