var currentQuestion = 0;
var grade = 0;


$(document).ready(function() {
    getJson();
    displayQuesiton();

    //点击下一题
    $(this).find(".nextButton").on("click", function() {

        judgeAnswer();

        if (currentQuestion < allQuestions.length) {

            displayQuesiton();
            if (allQuestions[currentQuestion].userAnswer > -1) {
                $("input[type='radio']")[allQuestions[currentQuestion].userAnswer].checked = true;
            }


        } else {
            displayresult();
            $(".backButton").css("display", "none");
            $(".nextButton").css("display", "none");
            $(".resetButton").css("display", "inline-block");
        }
    });
    //返回上一题
    $(this).find(".backButton").on("click", function() {
        currentQuestion--;
        displayQuesiton();
        if (allQuestions[currentQuestion].userAnswer == allQuestions[currentQuestion].correctAnswer) {
            grade -= 10;
        }
        $("input[type='radio']")[allQuestions[currentQuestion].userAnswer].checked = true;

    });


    //再来一次
    $(".resetButton").on("click", function() {
        currentQuestion = 0;
        grade = 0;
        $(".result").text(" ");
        displayQuesiton();
        $(".resetButton").css("display", "none");
        $(".nextButton").css("display", "inline-block");
        $(".nextButton").val("NEXT");
    });
});

var judgeAnswer = function() {
    var value = $("input[type='radio']:checked").val();
    if (value === undefined) {
        alert("请选择你的答案！");
    } else {
        if (value == allQuestions[currentQuestion].correctAnswer) {
            grade += 10;
        }
        allQuestions[currentQuestion].userAnswer = value;
        currentQuestion++;

    }

};


var displayQuesiton = function() {
    var question = allQuestions[currentQuestion].question;
    var questionHtml = $(document).find(".question")[0];
    var choiceList = $(document).find(".choiceList")[0];
    var len = allQuestions[currentQuestion].choices.length;

    $(choiceList).find("li").remove();

    $(questionHtml).text(currentQuestion + 1 + ". " + question);

    $(questionHtml).animate({
        width: '90%',
        fontSize: '2em'
    }, "slow");


    for (var i = 0; i < len; i++) {
        var choice = allQuestions[currentQuestion].choices[i];

        $(choiceList).append(' <li><input type="radio" value=' + i + ' name="dynamicRadio" id="' + i + '"/> <label for = "' + i + '">' + choice + '</label>' + '</li>');
        $(choiceList).hide().slideDown("slow");
    }

    if (currentQuestion === 0) {
        $(".nextButton").hide().show(3000);
        $(".backButton").css("display", "none");
    } else if (currentQuestion === allQuestions.length - 1) {
        $(".nextButton").val("SUBMIT");
        $(".nextButton").hide().show(2000);
        $(".backButton").hide().show(2000);

    } else {
        $(".nextButton").val("NEXT");
        $(".nextButton").hide().show(2000);
        $(".backButton").hide().show(2000);
    }

    $("#container").hide().fadeIn(1000);

};

var displayresult = function() {
    var result = $(".result").text("You scored: " + grade);
    for (var i = 0; i < allQuestions.length; i++)
        allQuestions[i].userAnswer = -1;
};


function getJson() {
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
    allQuestions = JSON.parse(jsontext);

}
