var answered = 0;
var prevProgress = 0;
var stepsTotal = 0;
var progress = 0;
var speed = 0;
var txt = '';

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

var questions = [
  {
    id: 1,
    questionText:
      "When is the last time that you purchased a product from a 'welgreens'' store or online?",
    totalSurveySteps: 2,
    surveyStep: 1,
    isFinalQuestion: false,
    answers: [
      {
        id: 1,
        letter: 'A',
        answerText: "Within the last week",
      },
      {
        id: 2,
        letter: 'B',
        answerText: "Within the last month",
      },
      {
        id: 3,
        letter: 'C',
        answerText: "within the last year",
      },
      {
        id: 4,
        letter: 'D',
        answerText: "Never",
      },
    ],
  },
  {
    id: 2,
    questionText:
      "What method of payment do you use for online shopping?",
    totalSurveySteps: 2,
    surveyStep: 2,
    isFinalQuestion: true,
    answers: [
      {
        id: 1,
        letter: 'A',
        answerText: "Debit card",
      },
      {
        id: 2,
        letter: 'B',
        answerText: "Credit card",
      },
      {
        id: 3,
        letter: 'C',
        answerText: "Other",
      },
      {
        id: 4,
        letter: 'D',
        answerText: "I don't make online purchases",
      },
    ],
  },
];

var cards = [
    {
      time: 'card1Time',
      btn: 'card1Btn',
    },
    {
      time: 'card2Time',
      btn: 'card2Btn',
    },
    {
      time: 'card3Time',
      btn: 'card3Btn',
    },
    {
      time: 'card4Time',
      btn: 'card4Btn',
    },
    {
      time: 'card5Time',
      btn: 'card5Btn',
    },
    {
      time: 'card6Time',
      btn: 'card6Btn',
    },
    {
      time: 'card7Time',
      btn: 'card7Btn',
    },
    {
      time: 'card8Time',
      btn: 'card8Btn',
    },
    {
      time: 'card9Time',
      btn: 'card9Btn',
    },
    {
      time: 'card10Time',
      btn: 'card10Btn',
    },
  ];

window.onload = function () {
      var fiveMinutes = 30 * 10;
      var display = document.querySelector('#timer');
      var display2 = document.querySelector('#timer2');
      startExpire(fiveMinutes, display);
      startExpire(fiveMinutes, display2);
  
      const date = new Date();
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();
    
      $('.date--today').text(`${months[month]} ${day}, ${year}`);
};

function startExpire(duration, display) {
    var timer = duration,
    minutes,
    seconds;
    var timeInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      clearInterval(timeInterval);
      startExpire(duration, display);  //timer loops again
    }
  }, 1000);
}

function startSurvey() {
    //screen #2
    $('#promo--img').hide();
    $('#hero--contents').hide();
    $('#expired').hide();
    $('#bounty').addClass('ques--card');

    const question = questions[0];
    const nextQuestion = question.id + 1;

    //progress count
    answered = question.surveyStep - 1;
    stepsTotal = question.totalSurveySteps;
    
    //get current progress bar
    progress = (answered / stepsTotal) * 100;
    speed = progress*20; //speed of the progress count

    if (question.isFinalQuestion != true) {
        $({ someValue: prevProgress }).animate(
          { someValue: progress },
          {
            duration: speed,
            easing: 'swing',
            step: function (someValue) {
              $('#bar').css({
                transform: "rotate("+ (45+(someValue*1.8)) +"deg)",
                // The trick is here, 100% = 180° so: ° = % * 1.8
                // 45 is to add the needed rotation to have the red borders at 0 percent
              });
              $('#percentCount').text(someValue|0);
            },
          }
        );
        $('#survey').show();
        $('#box--img').show();
        $('#progress--bar').show();
        $('#questionText').html(question.questionText);
        $('#questionBody').show();
  
        for (var i = 0; i < question.answers.length; i++) {
          $('#questionLive').html(question.surveyStep);
          $('#questionBody').append(
              `<button id="` + question.answers[i].id + `"class="mb-4 question--btn" value="` + question.answers[i].value + `"onClick="nextQuestion(` + nextQuestion + `)">` + `<span class="letter mr-3">` + question.answers[i].letter + `</span>` + question.answers[i].answerText + `</button>`
          );
        }
      }else {
        validateScreen();
      }
}

function nextQuestion(questionId) {
    const question = questions.find((val) => val.id === questionId);
    var nextQuestion = '';
    if (question && !question.isFinalQuestion) {
      nextQuestion = question.id + 1;
    }
  
    if (question && question.answers != null) {
      $('#questionText').html('');
      $('#questionBody').html('');
      $('#questionText').append(question.questionText);
  
      for (var i = 0; i < question.answers.length; i++) {
        $('#questionBody').append(
          `<button id="` + question.answers[i].id + `"class="mb-4 question--btn" value="` + question.answers[i].value + `"onClick="nextQuestion(` + nextQuestion + `)">` + `<span class="letter mr-3">` + question.answers[i].letter + `</span>` + question.answers[i].answerText + `</button>`
        );
      }
  
      //progress continued
      var answered = question.surveyStep - 1;
      var stepsTotal = question.totalSurveySteps;
      var prevProgress = $('#percentCount').text();
      var progress = (answered / stepsTotal) * 100;
      speed = progress*20;
      
      console.log(progress);
  
      $({ someValue: prevProgress }).animate(
        { someValue: progress },
        {
          duration: speed,
          easing: 'swing',
          step: function(someValue) {
            $('#bar').css({
              transform: "rotate("+ (45+(someValue*1.8)) +"deg)",
            });
            $('#percentCount').text(someValue|0);
          }
        });
    }else{
      let prevProgress = $('#percentCount').text();
      let progress = 100;
      speed = progress*30;
  
      $({ someValue: prevProgress }).animate(
        { someValue: progress },
        {
          duration: speed,
          easing: 'swing',
          step: function(someValue) {
            $('#bar').css({
              transform: "rotate("+ (45+(someValue*1.8)) +"deg)",
            });
            $('#percentCount').text(someValue|0);
          }
        });
      validateScreen();
    }
  }

  function validateScreen() {
    $('#question').hide();
    $('#choices').hide();

    var animItem = bodymovin.loadAnimation({
      wrapper: document.getElementById('svg'),
      animType: 'svg',
      path: './js/success.json',
      loop: false,
      autoplay: false,
    })
  
    setTimeout(function () {
      $('#validate').show();
      animItem.play();
    }, 0);
  
    setTimeout(function () {
      $('#ticked1').addClass('fade--gone');
    }, 1000);
  
    setTimeout(function () {
      $('#ticked2').addClass('fade--gone');
    }, 2000);
  
    setTimeout(function () {
      $('#ticked3').addClass('fade--gone');
    }, 3000);
  
    setTimeout(function () {
      $('#survey').hide();
      $('#offers').show();
      $('#comment').show();
      $(`#footer`).addClass('footer--bg');
    }, 4500);
  
    setTimeout(function () {
      $('#hero').hide();
      $('#products').show();
  
      cards.forEach((val, index) => {
        var timeDisplay = document.querySelector(`#${val.time}`);
        const randomTime = getRandom(5, 7) * 60;
        if (index + 1 === 3) {
          startTimer(30, timeDisplay, val.btn, 1);
        }else if(index + 1 === cards.length){
          startTimer(40, timeDisplay, val.btn, 1);
        } else {
          startTimer(randomTime, timeDisplay, val.btn, 0);
        }
      });
    }, 4500);
  
    setTimeout(function () {
      $('#coupon').addClass('fadeInUp');
    }, 5500);
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function startTimer(duration, display, btnId, flag) {
    var timer = duration,
    minutes,
    seconds;
    var timeInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? '' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
  
      display.textContent = minutes + ':' + seconds;
  
      if (flag === 1 && --timer < 0) {
        clearInterval(timeInterval);
        $(`#${btnId}`).text('EXPIRED');
        $(`#${btnId}`).addClass('btn--expired');
        $(`#${btnId}`).prop('onclick', null).off('click');
        $(`#${btnId}`).removeAttr('href');
        $(`#${btnId}`).parent().parent().addClass('grayed--out');
        $(`#${btnId}`).parent().css( "opacity", "1" );
      }
      if(flag === 0 && --timer < 0) {
          clearInterval(timeInterval);
          startTimer(duration, display, btnId, 0);
      }
    }, 1000);
  }


