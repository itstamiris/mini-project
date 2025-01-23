"use strict";

const $ = document.querySelector.bind(document);

const quiz = $('.quiz');
const warning = $('.warning');
const timer = $('.timer');
const scoreDisplay = $('.score-display')
const btnNext = $('.quiz__next-btn');
let count = 0;
let userScore = 0;

if (typeof questions !== 'undefined' && questions.length > 0) {
    quiz.classList.remove('hidden');
    showQuestions(count);
} else {
    warning.classList.remove('hidden');
}

btnNext.addEventListener('click', nextQuestion);

function showQuestions(index) {
    const title = $(".quiz__title");
    const list = $(".quiz__list");
    const total = $(".quiz__total");
    let progress = $(".quiz__progress-inner");

    title.innerHTML = `${questions[index].question}`;
    list.innerHTML = '';
    questions[index].options.forEach(item => {
        const text = `<li class="quiz__option">${item}</li>`;
        list.insertAdjacentHTML('beforeend', text)

    const options = list.querySelectorAll(".quiz__option")
    options.forEach(item => item.setAttribute("onclick", "optionSelected(this)"));

    total.innerHTML = `${index + 1} out of ${questions.length}`;
    progress.style.width = `${Math.round(((index + 1) / questions.length) * 100)}%`;
    });
}

function optionSelected(answer) {
    const userAnswer = answer.textContent;
    const correctAnswer = questions[count].answer;
    const options = document.querySelectorAll(".quiz__option");
    const iconCorrect = "<span'>&#10004;</span>";
    const iconIncorrect = "<span'>&#9940;</span>";

    if (userAnswer == correctAnswer) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", iconCorrect);
        showConfetti();
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", iconIncorrect);
        showPie();
        options.forEach(item => {
            if (item.textContent == correctAnswer) {
                setTimeout(() => {
                    item.classList.add("correct");
                    item.insertAdjacentHTML("beforeend", iconCorrect);
                }, 100);
            }
        });
    }

options.forEach(item => item.classList.add("disabled"));

}

function nextQuestion() {
    const option = $(".quiz__option");
    const result = $(".result");
    const resultText = $(".result__text"); 

    if ((count + 1) == questions.length && option.classList.contains('disabled')) {
        let mins = min;
        let secs = sec;
        result.classList.remove('hidden');
        quiz.classList.add('hidden');
        timer.classList.add('hidden');
        document.getElementById('score-display').classList.add('hidden');
        resultText.innerHTML = `You answered ${userScore} out of ${questions.length} in ${mins} minutes and ${secs} seconds.`
        return;
    }

    if (option.classList.contains('disabled')) {
        count++;
        showQuestions(count);
    } else {
        alert('You need to choose an answer first;)');
    }

    updateScoreDisplay();
}
  
function showConfetti() {
    const confetti = document.getElementById('confetti');
    const sound = document.getElementById('confetti-sound');
    confetti.style.display = 'block';
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    setTimeout(() => confetti.style.display = 'none', 2000);
    return;
}
  
function showPie() {
    const pie = document.getElementById('pie');
    const sound = document.getElementById('pie-sound');
    pie.style.display = 'block';
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    setTimeout(() => pie.style.display = 'none', 2000);
    return;
}

let time = document.getElementById('timer-inner');
let min = 0
let sec = 0

function timerChange() {
    sec++;
    if (sec == 60) {
        sec = sec - 60;
        min++;
    }
    time.textContent = min + ' : ' + sec
    setTimeout(timerChange, 1000);
}

timerChange();


function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Score: ${userScore}`;
}
