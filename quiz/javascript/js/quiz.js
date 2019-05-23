var nextbutton = document.getElementsByClassName("nextButton")[0];
var backbutton = document.getElementsByClassName("backButton")[0];
var resetbutton = document.getElementsByClassName("resetButton")[0];
var record = document.getElementsByClassName("record")[0];
var currentQuestion = 0;
var grade = 0;
var radionum = document.getElementsByName("dynamicRadio");
var result = document.getElementsByClassName("result")[0];
var jsonid = "";

//点击下一题
nextbutton.onclick = function() {
    doNext();
    if (currentQuestion < allQuestions.length) {
        displayQuesiton();
        if (allQuestions[currentQuestion].userAnswer > -1) {
            radionum[allQuestions[currentQuestion].userAnswer].checked = true;
        }
    } else {
        displayresult();
         record.style.display = "block";
        backbutton.style.display = "none";
        nextbutton.style.display = "none";
        resetbutton.style.display = "inline-block";

    }
};

//返回上一题
backbutton.onclick = function() {
    currentQuestion--;
    displayQuesiton();
        grade -= allQuestions[currentQuestion].correctAnswer[allQuestions[currentQuestion].userAnswer];

    radionum[allQuestions[currentQuestion].userAnswer].checked = true;
};
//判断是否被选中
var checkRadio = function() {
    var i = 0;
    while (i < radionum.length) {

        if (radionum[i].checked) {
           
                grade += allQuestions[currentQuestion].correctAnswer[i];
                
            allQuestions[currentQuestion].userAnswer = i;
            return true;

        } else {
            i++;
        }
    }
    return false;
};

//下一步
var doNext = function() {

    if (checkRadio()) {
        currentQuestion++;
    } else {
        alert("请选择你的答案！");

    }
};

//展示问题
var displayQuesiton = function() {
    var question = allQuestions[currentQuestion].question;
    var questionHtml = document.getElementsByClassName("question")[0];
    var choiceList = document.getElementsByClassName("choiceList")[0];
    var li = document.getElementsByTagName("li");
    var len = allQuestions[currentQuestion].choices.length;
    var liHtml = " ";

    questionHtml.innerHTML = currentQuestion + 1 + ". " + question;

    //把上一个问题删除
    if (choiceList.hasChildNodes()) {
        choiceList.removeChild(choiceList.firstChild);

    }
    //添加新的问题
    for (var j = 0; j < len; j++) {
        var choice = allQuestions[currentQuestion].choices[j];
        if(choice.indexOf("../images/") > -1){
            liHtml += ' <li style="display:inline-block;"><input type="radio" value=' + j + ' name="dynamicRadio" id="' + j + '"/> <label for = "' + j + '"><img src = "'+choice+'" alt = "'+j+'"class="inImg"></label></li>';
        }else{
                   liHtml += ' <li><input type="radio" value=' + j + ' name="dynamicRadio" id="' + j + '"/> <label for = "' + j + '">' + choice + '</label>' + '</li>';
 
        }
    }
    choiceList.innerHTML = liHtml;

    if (currentQuestion === 0) {
        backbutton.style.display = "none";
    } else if (currentQuestion === allQuestions.length - 1) {
        nextbutton.value = "SUBMIT";
    } else {
        nextbutton.value = "NEXT";
        backbutton.style.display = "inline-block";
    }


};
//展示结果
var displayresult = function() {
    var userid = sessionStorage.getItem("userid");
   var usersString = localStorage.getItem("users");
     var usersObject = JSON.parse(usersString);
     usersObject[userid].gradeArr[jsonid] = grade;
   usersString = JSON.stringify(usersObject);
     localStorage.setItem("users", usersString);
    result.innerHTML = "You scored: " + grade;
 
};

//重来一遍
resetbutton.onclick = function() {
    currentQuestion = 0;
    grade = 0;
    result.innerHTML = " ";
    displayQuesiton();
    resetbutton.style.display = "none";
    nextbutton.style.display = "inline-block";
    nextbutton.value = "NEXT";
    for (var i = 0; i < allQuestions.length; i++)
        allQuestions[i].userAnswer = -1;
};

//返回登录
var login = document.getElementsByClassName("signout")[0];
login.onclick = function() {
     //  cookieUtil.deletecookie("userName");
     // cookieUtil.deletecookie("password");
    window.location.href = "index.html";

};

var answerbtn = document.getElementsByClassName("answerbtn");
var content = document.getElementById("myTabContent");
        content.onclick = function(event){
            var event = event? event: window.event;
            var ele =  event.srcElement ? event.srcElement:event.target;
            for(var i = 0;i<answerbtn.length;i++){
                if(ele == answerbtn[i]){
                document.getElementById("type-container").style.display = "none";
                document.getElementById("container").style.display = "block";
                jsonid = i;
                getJson(jsonid);
               displayQuesiton();

                break;
            }}
        };
function getJson(jsonid) {
    function createXHR() {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                    i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(version[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {

                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("No XHR object available.");
        }
    }
    var xhr = createXHR();
    xhr.open('get', 'js/quiz.json', false);
    xhr.send(null);
    if (xhr.status >= 200 && xhr.status <= 304) {
        jsontext = xhr.responseText;

    } else {
        alert("Request was unsucessful" + xhr.status);
    }
    allQuestions = JSON.parse(jsontext)[jsonid];
}



var cookieUtil = {
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

//record js
  function sortGrade(gradenum){
var usersString = localStorage.getItem("users");
         usersObject = JSON.parse(usersString);
        for(var i = 0; i<usersObject.length;i++){
            for(var j = i; j< usersObject.length;j++){

                if(usersObject[i].gradeArr[gradenum] < usersObject[j].gradeArr[gradenum]){
                    var temp = usersObject[i];
                    usersObject[i] = usersObject[j];
                    usersObject[j]  = temp;
                }
            }
        }
    }
    function showonegrade(gradenum){
        sortGrade(gradenum);
         var trhtml = "";
          for(var i = 1; i<usersObject.length+1;i++){

            trhtml += '<tr><td>'+usersObject[i-1].user+'</td><td>'+usersObject[i-1].gradeArr[gradenum]+'</td><td>'+ i +'</td></tr>';
        }
          var trcontent = document.getElementsByClassName("trcontent");
       
        trcontent[gradenum].innerHTML = trhtml;
    }
function showRecord(){
    for(var i =0;i<JSON.parse(jsontext).length;i++){
        showonegrade(i);
    }
      

    }
var record = document.getElementsByClassName("record")[0];
record.onclick = function(){
    var recordcontainer = document.getElementsByClassName("record-container");
    for(var i =0;i<JSON.parse(jsontext).length;i++){
    recordcontainer[i].style.display = "inline-block";
    }
    document.getElementById("container").style.display = "none";
    record.style.display = "none";
    showRecord();
};

 