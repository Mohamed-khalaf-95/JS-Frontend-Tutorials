// let quizInfo = document.querySelector(".quiz-info");
// let category = document.querySelector(".category span");
let totalQuestions = document.querySelector(".total-question span");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let nextBtn = document.querySelector(".next");
let bulletsContainer = document.querySelector(".bullets");
let dotsConatiner = document.querySelector(".spans-container");
let countDown = document.querySelector(".count-down");
let results = document.querySelector(".results .container");

//settings
let uniqueNumber = new Set();
let randomQuestions = [];
let currentIndex = 0;
let score = 0;
results.style.display = "none";
let countDownInterval;

//Get Data From JSON
function htmlQuestions() {
  let htmlData = new XMLHttpRequest();
  htmlData.open("get", "./JSON/HTML_Questions.json", true);
  htmlData.send();

  htmlData.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //get html data object
      let htmlObject = JSON.parse(this.responseText);
      //Get Random Questions
      getRandomQuestions(htmlObject, htmlObject);
      //append Questions Count And Bullets
      let htmlQCount = randomQuestions.length;
      createBullets(htmlQCount);

      //Append Questions
      appendData(randomQuestions[currentIndex], htmlQCount);
      //count down function
      countDownFun(30, htmlQCount);
      //Next Button
      nextBtn.addEventListener("click", () => {
        let rightAnswer = randomQuestions[currentIndex].answer;
        // console.log(rightAnswer)
        currentIndex++;
        //Check Answer
        checkAnswer(rightAnswer, htmlQCount);
        quizArea.innerHTML = "";
        answerArea.innerHTML = "";
        appendData(randomQuestions[currentIndex], htmlQCount);
        handelBullets();
        //count down function
        clearInterval(countDownInterval);
        countDownFun(30, htmlQCount);
        //result function
        showResults(htmlQCount);
      });
    }
  };
}
htmlQuestions();

//Apend Bullets And Numbers Of Questions in Page
function createBullets(num) {
  totalQuestions.innerHTML = num;
  //Append Total Questions and create bullets
  for (let i = 0; i < num; i++) {
    let bullet = document.createElement("span");
    if (i == 0) {
      bullet.className = "active";
    }
    dotsConatiner.appendChild(bullet);
  }
}
//Get Random Questions
function getRandomQuestions(arr, random) {
  let randomIndex;
  for (let i = 0; i < arr.length; i++) {
    randomIndex = Math.floor(Math.random() * random.length);
    if (uniqueNumber.size !== 10) {
      uniqueNumber.add(arr[randomIndex]);
      randomQuestions = Array.from(uniqueNumber);
    }
  }
}
//Append Questions And Answers In Page
function appendData(obj, count) {
  if (currentIndex < count) {
    //create h2 Question ?
    let question = document.createElement("h2");
    question.className = "question";
    let questionText = document.createTextNode(obj["question"]);
    question.appendChild(questionText);
    quizArea.appendChild(question);
    //create answers
    for (let i = 1; i <= 4; i++) {
      //create Main Div
      let answer = document.createElement("div");
      answer.className = "answer";
      //create radioInput
      let radioInput = document.createElement("Input");
      radioInput.type = "radio";
      radioInput.name = "answer";
      radioInput.id = `answer-${i}`;
      radioInput.dataset.answer = obj["options"][i - 1];
      // if (i == 1) {
      //   radioInput.checked = true;
      // }
      //create label
      let label = document.createElement("label");
      label.setAttribute("for", `answer-${i}`);
      let labelText = document.createTextNode(obj["options"][i - 1]);
      //Apend Data
      label.appendChild(labelText);
      answer.appendChild(radioInput);
      answer.appendChild(label);
      answerArea.appendChild(answer);
    }
  }
}

//check Right Answer
function checkAnswer(rAnswer, count) {
  let allAnswer = document.getElementsByName("answer");
  let answers = Array.from(allAnswer);
  let chossenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      chossenAnswer = answers[i].dataset.answer;
    }
  }
  if (chossenAnswer === rAnswer) {
    score++;
  }
}
// Handel Bullets
function handelBullets() {
  let dots = document.querySelectorAll(".spans-container span");
  dots.forEach((span, index) => {
    if (currentIndex == index) {
      span.classList.add("active");
    }
  });
}
// Show Final Result And Score
function showResults(count) {
  let perfect = document.createElement("div");
  let perfectTxt = document.createTextNode("perfect");
  perfect.appendChild(perfectTxt);
  let good = document.createElement("div");
  let goodTxt = document.createTextNode("good");
  good.appendChild(goodTxt);
  let bad = document.createElement("div");
  let badTxt = document.createTextNode("bad");
  bad.appendChild(badTxt);
  let scoreContainer = document.createElement("div");
  let scoreContainerHead = document.createElement("h1");
  let scoreContainerTxt = document.createTextNode("your score");
  let finalScore = document.createElement("div");
  finalScore.className = "final-score";
  let scoreValue = document.createElement("span");
  scoreValue.innerHTML = score;
  let totalValue = document.createElement("span");
  totalValue.innerHTML = `/${count}`;
  finalScore.appendChild(scoreValue);
  finalScore.appendChild(totalValue);
  scoreContainerHead.appendChild(scoreContainerTxt);
  scoreContainer.appendChild(scoreContainerHead);
  scoreContainer.appendChild(finalScore);
  perfect.className = "title";
  good.className = "title";
  bad.className = "title";
  scoreContainer.className = "score";
  scoreValue.className = "score-value";
  totalValue.className = "total-value";
  if (currentIndex === count) {
    document.querySelector(".quiz").remove();
    quizArea.remove();
    answerArea.remove();
    nextBtn.remove();
    bulletsContainer.remove();
    results.style.display = "block";
    //-----------------
    if (score > count / 2 && score < count) {
      results.appendChild(good);
      results.appendChild(scoreContainer);
    } else if (score === count) {
      results.appendChild(perfect);
      results.appendChild(scoreContainer);
    } else {
      results.appendChild(bad);
      results.appendChild(scoreContainer);
      results.style.background = "red";
      scoreValue.style.color = "#222";
    }
  }
}
//countdown timer
function countDownFun(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countDownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      countDown.innerHTML = `${minutes} : ${seconds}`;

      if (--duration < 0) {
        clearInterval(countDownInterval);
        nextBtn.click();
        console.log("time finsh");
      }
    }, 1000);
  }
}
