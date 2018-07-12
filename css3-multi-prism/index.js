
window.onload = function(){
    function $(str){
        return document.getElementById(str)
    }
    // 真正转换
    function transformShape(deg,translateZ,width,height){
        let imgArr = document.getElementsByClassName("img");
        let num = $('number').value;        
        for(let i = 1;i <= num;i++){
          imgArr[i-1].style.cssText = `transform: rotateY(${deg * i}deg) translateZ(${translateZ}px);width:${width}px;height:${height}px`; 
        }         
     }    

    // 生成正多柱体
    function transform3D (){
        let num = $('number').value;
        let width = $('width').value;
        let height = $('height').value;
        let imgWrap = $('imgWrap');
        let zT = $('zT');
        if(num < 3){
            alert('多柱体的侧边需要大于等于三！');
            return;
        }
        let deg1 = 360/num; // 一个边的角度
        let deg2 = deg1/2; // 用于计算偏移 
        // 弧度＝(角度/180) *PI
        let rad = deg2 * Math.PI / 180;
        let w  = width/2;
        let z;  // Z轴偏移量
        // Math.tan(rad) = w/h;
        z = w / Math.tan(rad);
        
        let str = '';
        for(let i = 1;i <= num;i++){
          let ele = `<div class="img img${i}"></div>`
          str += ele;
        }
        imgWrap.innerHTML = str;       
        zT.value =z;
        
        transformShape(deg1,z,width,height);
    }
    // 转换长宽Z轴
    function translateZWH (){
      let zT = $('zT').value;
      let width = $('width').value;
      let height = $('height').value;
      let num = $('number').value;
      let deg = 360/num;
      transformShape(deg,zT,width,height);
    }
    // 转换景深
    function transformPerspec(){
        let perspective = $('perspective');
        let stage = document.getElementsByClassName('stage')[0];
        let perValue = perspective.value;
        console.log(perValue)
        stage.style.perspective = perValue+'px';
    }

    // 控制进度条
    function onProgress(ele){
      let val = ele.value;
      let max = ele.max;
      let percent = val/max * 100;
      let id = ele.id;
      ele.style.backgroundSize = `${percent}% 100%`;
      let valEle = $(`${id}Val`);
      valEle.innerText = val;
    }
    let btn = $('btn');
    btn.onclick = transform3D;

    let ctrContainer = document.getElementsByClassName('ctrContainer')[0];
    ctrContainer.oninput = function(e){
        let perspective = $('perspective');
        let num = $('number');
        console.log(e.target)
        if(e.target === perspective){
            transformPerspec();
            // return;
        } 
        if(e.target === num){
            transform3D();
            onProgress($('zT'))            
            // return;
        }else{
            translateZWH();
        }
        onProgress(e.target)            
        
    }



}