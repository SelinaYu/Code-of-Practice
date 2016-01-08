//用户注册
var submitform = document.getElementById("submit");
var storageArr = [];
submitform.onclick = function() {
    var userName = document.getElementById("username").value;
    var nickName = document.getElementById("nickname").value;
    var passWord = document.getElementById("password").value;
    var confirmPsw = document.getElementById("confirmpsw").value;

    function checknull() {
        var arr = [];
        if ((userName == null) || (userName == ""))
            arr.push("userName");
        if ((nickName == null) || (nickName == ""))
            arr.push("nickName");
        if ((passWord == null) || (passWord == ""))
            arr.push("passWord");
        if ((confirmPsw == null) || (confirmPsw == ""))
            arr.push("confirmPsw");
        return arr;
    }

    var arr = checknull();
    for (var i = 0; i <= arr.length; i++) {
        switch (arr[i]) {
            case "userName":
                document.getElementById("usertip").style.display = "inline-block";
                break;
            case "nickName":
                document.getElementById("nicknametip").style.display = "inline-block";
                break;

            case "passWord":
                document.getElementById("passwordtip").style.display = "inline-block";
                break;

            case "confirmPsw":
                document.getElementById("confirmpswtip").style.display = "inline-block";
                break;
            default:
                break;

        }
    }
    if (arr != "") {

        return false;
    } else {
        document.getElementById("usertip").style.display = "none";
        document.getElementById("nicknametip").style.display = "none";
        document.getElementById("passwordtip").style.display = "none";
        document.getElementById("confirmpswtip").style.display = "none";
    }

    if (passWord != confirmPsw) {
        alert("两次输入密码不一致");
        clear();
        return false;
    }
    var newUser = {
        user: userName,
        nickname: nickName,
        password: passWord,
        userid:"",
        gradeArr:[0,0,0,0]
    };


    if (localStorage.getItem("users")) {
        var usersString = localStorage.getItem("users");
        var usersObject = JSON.parse(usersString);
        storageArr = usersObject;
        var repeat = false;
        for (var i = 0; i < usersObject.length; i++) {
            if (usersObject[i].user == newUser.user) {
                repeat = true;
                break;
            }

        }
        if (repeat) {
            alert("该用户已存在, 重新注册");
            clear();
        } else { 
            storageArr.push(newUser);
            var usersString = JSON.stringify(storageArr);
            localStorage.setItem("users", usersString);

            alert("保存成功");
            clear();
        }
    } else {
        storageArr.push(newUser);
        var usersString = JSON.stringify(storageArr);
        localStorage.setItem("users", usersString);
        alert("保存成功"); 
        clear();

    }
};
//清理文字
function clear() {
    document.getElementById("username").value = "";
    document.getElementById("nickname").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmpsw").value = "";
}

//返回登录
var returnlog = document.getElementById("returnlog");
returnlog.onclick = function() {
    var register = document.getElementsByClassName("register")[0];
    var login = document.getElementsByClassName("login")[0];
    register.style.display = "none";
    login.style.display = "block";

};

var register = document.getElementById("register");
register.onclick = function() {
    document.getElementsByClassName("register")[0].style.display = "block";
    document.getElementsByClassName("login")[0].style.display = "none";
};
//删除用户
var deleteuser = document.getElementById("deleteuser");
deleteuser.onclick = function() {

    localStorage.clear();
    alert("删除所有用户成功！");
};
//cookieUtil对象
var cookieUtil = {
    get: function(name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;

        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    set: function(name, value, expires) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += ";expires=" + expires.toGMTString();
        }
        document.cookie = cookieText;
    },
    deletecookie: function(name) {
        this.set(name, "", new Date(0));
    }
};

window.onload = function() {
    //显示上次的登陆信息
    var userNameValue = cookieUtil.get("userName");
    document.getElementById("username1").value = userNameValue;

    var passwordValue = cookieUtil.get("password");
    document.getElementById("password1").value = passwordValue;
    if (userNameValue !== null) {
        alert("欢迎回来，" + userNameValue + "!");
        window.location.href = "quiz.html";
    }
    //用户登录
    var login = document.getElementById("login");
    login.onclick = function() {
        var userName1 = document.getElementById("username1").value;
        var passWord1 = document.getElementById("password1").value;
       var usersString = localStorage.getItem('users');
        localStorage.getItem("users");
        if (usersString) {
            var usersObject = JSON.parse(usersString);
            var ismatch = false;
            for (var i = 0; i < usersObject.length; i++) {
                if (usersObject[i].user === userName1 && usersObject[i].password === passWord1) {
                    ismatch = true;
                    usersObject[i].userid = i;
                    break;
                }
            }


            if (ismatch) {
                if (document.getElementById("saveCookie").checked) {
                    cookieUtil.set("userName", userName1, 10);
                    cookieUtil.set("password", passWord1, 10);
                }
                alert("登陆成功,欢迎你," + userName1 + "!");
                 sessionStorage.setItem("userid",usersObject[usersObject[i].userid].userid);
                
                window.location.href = "quiz.html";
                if (document.getElementById("forgetCookie").checked) {
                    cookieUtil.deletecookie("userName");
                    cookieUtil.deletecookie("password");

                }
            } else {
                alert("用户名或密码输入错误！");
            }
        } else {
            alert("还没有用户，去注册新用户吧");
        }
    };
};



//quiz.js
