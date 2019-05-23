window.onload = function(){
    let canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        x = canvas.width / 2,
        y = canvas.height / 2,
        rad = Math.PI * 2 /100,
        speed = 0.1;
        radius = 100; //半径
        lineWidth = 20; 　 // 圆环宽度
    function totalCircle(){
      context.save();
      context.strokeStyle = "#ccc";
      context.lineWidth= lineWidth;
      context.beginPath();
      context.arc(x,y,radius,0,Math.PI *2,true);
      context.stroke();
      context.closePath();
      context.restore();
    }
    // totalCircle();
    function progressCircle(n){
      context.save();
      let lineColor = createLinearGradient(x - radius, y - radius, x + 2 * radius, y + radius)
      context.strokeStyle = lineColor;
      context.lineWidth = lineWidth;
      context.beginPath();
      context.arc(x,y, radius,- Math.PI / 2, -Math.PI/2 + rad * n,false)
      context.stroke();
      context.closePath();
      context.restore();
    }
    function drawText(n){
      context.save();
      context.fillStyle = createLinearGradient(x - radius, y - radius, x + 2 * radius, y + radius);
      context.font = "40px Verdana";
      context.fillText(n.toFixed(0)+'%',x - 40, y + 20);
      context.restore();
    }
    // 创建渐变色
    function createLinearGradient(x1,y1,x2,y2){ 
        let lineColor = context.createLinearGradient(x1,y1,x2,y2);
        lineColor.addColorStop(0,'#ef7954');
        lineColor.addColorStop(0.2,'#efeb54');
        lineColor.addColorStop(0.4,'#65a0ea');
        lineColor.addColorStop(0.5,'#ea65e5');
        lineColor.addColorStop(0.6,'#ea6576');
        return lineColor;
    }
    (function drawCirclePercent(){
        window.requestAnimationFrame(drawCirclePercent);
        context.clearRect(0, 0, canvas.width, canvas.height);
        totalCircle();
        drawText(speed);
        progressCircle(speed);
        if(speed > 100) speed = 0;
        speed += 0.1;
    }());
}