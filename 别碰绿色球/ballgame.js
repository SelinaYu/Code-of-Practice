//定义键盘值
var KEY = {
    D: 68,
    W: 87,
    A: 65,
    S: 83,
    RIGHT: 39,
    UP: 38,
    LEFT: 37,
    DOWN: 40,
    QUICK: 17, //ctrl键
    ENTER: 13
};

//定义输入
var input = {
    up: false, //上
    down: false, //下
    left: false, //左
    right: false, //右
    quick: false, //加速
    enter: false
};
//红色小球
var redBall = {
    speed: 1,
    quickspeed: 2, //加速速度
    left: 0,
    top: 0,
    leftEdge: 0, //左边缘
    rightEdge: 0, //右边缘
    topEdge: 0, //上边缘
    bottomEdge: 0, //下边缘
    radius: 10,

    init: function() {
        this.leftEdge = this.radius;
        this.topEdge = this.radius;
        this.rightEdge = $("canvas").width - this.radius;
        this.bottomEdge = $("canvas").height - this.radius;
        this.left = $("canvas").width / 2;
        this.top = $("canvas").height / 2;
    },


    getSpeed: function() {
        return (input.quick ? this.quickspeed : this.speed);
    },

    update: function() {
        if (input.up) this.top -= this.getSpeed();
        if (input.down) this.top += this.getSpeed();
        if (input.left) this.left -= this.getSpeed();
        if (input.right) this.left += this.getSpeed();

        if (this.left > this.rightEdge) this.left = this.rightEdge;
        if (this.left < this.leftEdge) this.left = this.leftEdge;
        if (this.top > this.bottomEdge) this.top = this.bottomEdge;
        if (this.top < this.topEdge) this.top = this.topEdge;

        var canvas = $("canvas");
        var context = canvas.getContext("2d");
        context.fillStyle = "red";
        context.beginPath();
        context.arc(this.left, this.top, this.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
};
//绿色小球
var greenBall = function() {
        this.x = 0,
        this.y = 0,
        this.radius = 10,
        this.color = "green",
        this.incrementX = 0, //x的增量
        this.incrementY = 0, //y的增量
        this.angle = 0, //求增量时随机产生的角度
        this.speed = 2,
        this.isAddX = true,
        this.isAddY = true,

        this.init = function() {
            var location = ($("canvas").width + $("canvas").height) * 2;
            var randomlocation = Math.floor(Math.random() * (location + 1)); //Math.random()产生的随机数含0，不含1
            this.angle = Math.floor(Math.random() * 91);
            if (randomlocation < $("canvas").width) { //上
                this.x = randomlocation;
                this.y = 0;
            } else if (randomlocation < $("canvas").width + $("canvas").height) { //右
                this.x = $("canvas").width;
                this.y = randomlocation - $("canvas").width;
            } else if (randomlocation < $("canvas").width * 2 + $("canvas").height) { //下
                this.x = $("canvas").width - (randomlocation - $("canvas").width - $("canvas").height);
                this.y = $("canvas").height;
            } else if (randomlocation < ($("canvas").width + $("canvas").height) * 2) {
                this.x = 0;
                this.y = $("canvas").height - (randomlocation - $("canvas").width * 2 - $("canvas").height);
            }

            if (randomlocation < $("canvas").width / 2 || randomlocation > $("canvas").width * 2 + $("canvas").height + $("canvas").height / 2) { //左上
                this.isAddX = true;
                this.isAddY = true;
            } else if (randomlocation < $("canvas").width + $("canvas").height / 2) { //右上
                this.isAddX = false;
                this.isAddY = true;
            } else if (randomlocation < $("canvas").width + $("canvas").height + $("canvas").width / 2) { //右下
                this.isAddX = false;
                this.isAddY = false;
            } else { //左下
                this.isAddX = true;
                this.sAddY = false;
            }

            this.incrementX = Math.sin(Math.PI / 180 * this.angle) * this.speed;
            this.incrementX = this.isAddX ? this.incrementX : 0 - this.incrementX; //x的增量
            this.incrementY = Math.cos(Math.PI / 180 * this.angle) * this.speed;
            this.incrementY = this.isAddY ? this.incrementY : 0 - this.incrementY; //y的增量

        },

        this.update = function() {
            this.x += this.incrementX;
            this.y += this.incrementY;

            if ((this.isAddX && this.x > $("canvas").width) || (!this.isAddX && this.x < 0) || (this.isAddY && this.y > $("canvas").height) || (!this.isAddY && this.y < 0)) {
                this.init();
                return;
            }

            var canvas = $("canvas");
            var context = canvas.getContext("2d");
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        },

        this.iscollide = function() {
            var x = Math.abs(redBall.left - this.x);
            var y = Math.abs(redBall.top - this.y);
            var R = this.radius + redBall.radius;
            if (x * x + y * y > R * R) {
                return false;
            }
            return true;
        }
};
var press = function() {
    var code = event.keyCode || window.event;
    switch (code) {
        case KEY.RIGHT:
        case KEY.D:
            input.right = true;
            break;
        case KEY.UP:
        case KEY.W:
            input.up = true;
            break;
        case KEY.LEFT:
        case KEY.A:
            input.left = true;
            break;
        case KEY.DOWN:
        case KEY.S:
            input.down = true;
            break;
        case KEY.QUICK:
            input.quick = true;
            break;
        case KEY.ENTER:
        if($("againbtn")){
             window.location.reload();
        }
    }


};

var release = function() {
    var code = event.keyCode || window.event;
    switch (code) {
        case KEY.RIGHT:
        case KEY.D:
            input.right = false;
            break;

        case KEY.UP:
        case KEY.W:
            input.up = false;
            break;

        case KEY.LEFT:
        case KEY.A:
            input.left = false;
            break;

        case KEY.DOWN:
        case KEY.S:
            input.down = false;
            break;

        case KEY.QUICK:
            input.quick = false;
            break;

    }
};
var $ = function(id) {
    return document.getElementById(id);
};


var greenBalls = new Array();
var myInterval; //setInterval函数
var beginTime; //游戏开始时间
var time;
//加载事件
var load = function() {
    redBall.init();
    for (i = 0; i < 40; i++) {
        var gball = new greenBall();
        gball.init();
        greenBalls[i] = gball;
    }
    beginTime = new Date();
    myInterval = setInterval(function() {
        update();
    }, 20);
};

var $ = function(id) {
    return document.getElementById(id);
};

//更新
var update = function() {
    var canvas = $("canvas");
    canvas.width = canvas.width; // 清除画布  
    redBall.update();
    for (i = 0; i < greenBalls.length; i++) {
        greenBalls[i].update();
    }
    updatetime();
    isDead();
    isWin();
};
//更新时间
var updatetime = function() {
    var endTime = new Date();
     time = Math.round((endTime - beginTime) / 1000);
    greenBall.speed = Math.round(time / 10);
    $("time").innerHTML = "时间：" + time + "秒";
};
//判断是否死了
var isDead = function() {
    for (i = 0; i < greenBalls.length; i++) {
        var flag = greenBalls[i].iscollide();
        if (flag == true) {
            clearInterval(myInterval);
            showTip("Game Over");
            return;
        }
    }
};
var isWin = function(){
    if(time>=30){
         clearInterval(myInterval);
        showTip("恭喜，你赢了！！");
    }
};
window.onload = function() {
    load();
};
document.onkeydown = press;
document.onkeyup = release;

function showTip(content) {
    var sWidth = document.body.scrollWidth;
    var sHeight = document.body.scrollHeight;

    var wHeight = document.documentElement.clientHeight;

    var oMask = document.createElement("div");
    oMask.id = "mask";
    oMask.style.height = sHeight + "px";
    oMask.style.width = sWidth + "px";
    document.body.appendChild(oMask);
    var tipwindow = document.createElement("div");
    tipwindow.id = "tipwin";
    tipwindow.innerHTML = "<div class='tip'><div class='tipcontent'>" + content + "</div><div id='again'><button id='againbtn'>再来一次</button></div><div id='close'>关闭</div></div>";
    document.body.appendChild(tipwindow);


    var dHeight = tipwindow.offsetHeight;
    var dWidth = tipwindow.offsetWidth;

    tipwindow.style.left = sWidth / 2 - dWidth / 2 + "px";
    tipwindow.style.top = wHeight / 2 - dHeight / 2 + "px";

    var oClose = document.getElementById("close");

    oClose.onclick = oMask.onclick = function() {
        document.body.removeChild(tipwindow);
        document.body.removeChild(oMask);
    };
    $("againbtn").addEventListener("click", function() {
        window.location.reload();
    });

}
