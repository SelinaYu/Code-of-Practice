window.onload = function() {
  let canvas=document.getElementById("canvas");
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
  
  // 加载图片图片粒子化


  function loadImage(){
    let image = new Image();
    image.src = "./d.jpg";
    image.onload=function(){
        ctx.drawImage(image,0,0,width,height);
        getPixels();    //获取所有像素
        drawPic();  //绘制图像
    };
  }

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
                  var pixel={
                      x:i, //重新设置每个像素的位置信息
                      y:j, //重新设置每个像素的位置信息
                      radius: radius,
                      fillStyle:color
                  }
                  pixels.push(pixel);

                  dots.push(new Dot(i,j,radius,color))
              }

          }
      }
  } 
  // 图片粒子化
  function drawPic(){
      ctx.save();
      ctx.clearRect(0,0,width,height);
      for(let i=0;i<pixels.length;i++){
          let pixel =pixels[i];
          ctx.fillStyle=pixel.fillStyle;
        //   ctx.fillRect(pix.x,pix.y,1,1); 画矩形
        
          ctx.beginPath();
          ctx.arc(pixel.x,pixel.y,pixel.radius,0,Math.PI * 2)
          ctx.closePath();
          ctx.fill();
      }
      
  }



  var Dot = function(centerX,centerY,radius,color){
      // 原来的位置
      this.dx = centerX;
      this.dy = centerY;
      // 粒子散开的位置
      this.tx = width/2 - 400 + Math.floor(Math.random() * 800) ;   // 移动终点位置
      this.ty = height/2 - 400 +  Math.floor(Math.random() * 800);
      this.x = centerX;
      this.y = centerY;
      this.radius = radius;
      this.color = color;
      this.a = 5; // 小球移动的速度
      this.updateBallPos = function(x1,y1,x2,y2){
          this.x = x1;
          this.y = y1;
          this.tx = x2;
          this.ty = y2;
        if(Math.abs(this.x - this.tx) <= this.a * 2 ){
            this.x = this.tx;
        }
        console.log('222',this.x , this.tx)
       this.x > this.tx ? this.x -= this.a*2 : this.x += this.a*2 ;
        
        if(Math.abs(this.y - this.ty) <= this.a){
            this.y = this.ty;
        }
        this.y > this.ty ? this.y -= this.a : this.y += this.a;

        this.drawCircle(this.x,this.y,radius,this.color);
        
      }

      this.drawCircle = function(x,y,radius,color){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI *2);
        ctx.closePath();
        ctx.fill();
    }
  }
// 文字粒子化
 function particleText(){
   ctx.save();
//    ctx.clearRect(0,0,width,height);   
    drawText('SELINAYU');
    getPixels();
   for(let i = 0;i < dots.length;i++){
    let dot = dots[i];
   ctx.fillStyle = dot.color;   
    ctx.beginPath();
    ctx.arc(dot.x,dot.y,dot.radius,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
   }
   ctx.restore();
 }

// 文字粒子化
particleText();

 
}