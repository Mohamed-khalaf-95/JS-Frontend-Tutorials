const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArr = Array.from(letters);
//letters container
let lettersContainer = document.querySelector(".letters");
let msg = document.createElement("h5");
let finishGame = document.querySelector(".finish-game");
let finishGameBtn = document.getElementById("play-btn");
let yourWord = document.createElement("div");
// genrate letters
lettersArr.forEach((letter) => {
  let letterEl = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  letterEl.className = "letter-box";
  letterEl.appendChild(theLetter);
  lettersContainer.appendChild(letterEl);
});
//object of words
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
let allKeys = Object.keys(words);
// random key
let randomPropNum = Math.floor(Math.random() * allKeys.length);
let randomPropname = allKeys[randomPropNum];
let randomPropValue = words[randomPropname];
//random value
let randomvalNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValWord = randomPropValue[randomvalNumber];
//set category Info
document.querySelector(".game-info .category span").innerHTML = randomPropname;
// select letter guess element
let letterGuessContainer = document.querySelector(".letters-guess");
for (let i = 0; i < randomValWord.length; i++) {
  let emptySpan = document.createElement("span");
  letterGuessContainer.appendChild(emptySpan);
  if (randomValWord[i] === " ") {
    emptySpan.className = "with-space";
  }
}
let randomValWordArr = Array.from(randomValWord.toLowerCase());
let allGuessSpans = document.querySelectorAll(".letters-guess span");
let answerWord = [];
for (let i = 0; i < randomValWordArr.length; i++) {
  answerWord.push("");
}
let allLettersSpans = document.querySelectorAll(".letters span");
let joinWord = randomValWordArr.filter((e) => e !== " ").join("");
//Set Wron Attemps
let wrongAttemps = 10;
document.querySelector(".lifes span").innerHTML = `${wrongAttemps}`;
//Select Hangman Draw
let myDraw = document.querySelector(".row .hangman-draw .the-draw");

document.addEventListener("click", (e) => {
  //set status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let clickedLetter = e.target.innerHTML.toLowerCase();
    randomValWordArr.forEach((wordLetter, wordIndex) => {
      if (clickedLetter === wordLetter) {
        theStatus = true;
        allGuessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
        //------------------------------------
        answerWord.forEach((myWord, myIndex) => {
          if (wordIndex === myIndex) {
            myWord = wordLetter;
            answerWord[myIndex] = myWord;
          }
        });
      }
      // end word loop
    });

    if (joinWord === answerWord.join("")) {
      document.querySelector(".letters").classList.add("finished");
      endGame();
      msg.innerHTML = "Bravo";
      msg.style.fontSize = "60px";
      finishGameBtn.style.margin = "0";
    }

    if (theStatus !== true) {
      wrongAttemps--;
      document.getElementById("fail").play();
      document.querySelector(".lifes span").innerHTML = `${wrongAttemps}`;
      if (wrongAttemps < 8) {
        myDraw.classList.add(`wrong-${wrongAttemps}`);
      }
      if (wrongAttemps === 0) {
        document.querySelector(".letters").classList.add("finished");
        document.getElementById("play-btn").innerText = "Try Again";
        endGame();
        msg.innerHTML = "Try Hard Next Time";
        yourWord.innerHTML = `The Word Is: ${randomValWord}`;
      }
    } else {
      document.getElementById("success").play();
    }
  }
});

function endGame() {
  // append msg after finished game
  finishGameBtn.before(msg);
  finishGameBtn.before(yourWord);
  //show message
  finishGame.style.display = "flex";
  finishGame.style.opacity = "1";
  //reload
  finishGameBtn.onclick = function () {
    window.location.reload();
  };
}
