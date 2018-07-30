var timeEnum = Object.freeze({
    "work": 25,
    "break5": 5,
    "break15": 15
});
var mode = timeEnum.work;
var timeLeftS = mode * 60, leftoverMs = 0;
var start = Date.now();
var stopped = true;
var fullTimer = null, partTimer = null;

const buttons = document.querySelectorAll('button');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');

document.querySelector('#start').addEventListener('click', startTimer);
document.querySelector('#pause').addEventListener('click', pauseTimer);
document.querySelector('#reset').addEventListener('click', resetTimer);
document.querySelector('#work').addEventListener('click', work);
document.querySelector('#shortBreak').addEventListener('click', shortBreak);
document.querySelector('#longBreak').addEventListener('click', longBreak);
buttons.forEach(button => {
    button.addEventListener('click', beginTransitionButton);
    button.addEventListener('transitionend', endTransitionButton);
});

function startTimer() {
    if (!stopped) {
        return;
    }
    stopped = false;
    if (leftoverMs !== 0) {
        start = Date.now();
        // runs a partial second
        partTimer = setTimeout(function () {
            timeLeftS--;
            setTime(timeLeftS);
            leftoverMs = 0;
            partTimer = null;
            if (timeLeftS === 0) {
                timeOut();
            }
            normalTick();
        }, leftoverMs);
    } else {
        normalTick();
    }
}

function normalTick() {
    start = Date.now();
    fullTimer = setInterval(function () {
        timeLeftS--;
        setTime(timeLeftS);
        if (timeLeftS === 0) {
            timeOut();
        }
        start = Date.now();
    }, 1000);
}

function pauseTimer() {
    stopped = true;
    if (fullTimer !== null || partTimer !== null) {
        clearInterval(fullTimer);
        clearTimeout(partTimer);
        if (partTimer !== null) {
            // calculates partial second of partial second (caused by unpausing and pausing again rapidly)
            leftoverMs = Math.max(0, leftoverMs - (Date.now() - start));
        } else {
            // calculates partial second when paused
            leftoverMs = Math.max(0, 1000 - (Date.now() - start));
        }
        fullTimer = null;
        partTimer = null;
    }
}

function resetTimer() {
    stopped = true;
    if (fullTimer !== null || partTimer !== null || timeLeftS !== mode * 60 || leftoverMs !== 0) {
        clearInterval(fullTimer);
        clearTimeout(partTimer);
        fullTimer = null;
        partTimer = null;
        timeLeftS = mode * 60;
        leftoverMs = 0;
        setTime(mode * 60);
    }
}

function setTime(secondsLeft) {
    minutes.innerHTML = Math.floor(secondsLeft / 60);
    seconds.innerHTML = secondsLeft % 60 <= 9 ? '0' + (secondsLeft % 60) : (secondsLeft % 60);
}

function timeOut() {
    clearInterval(fullTimer);
    fullTimer = null;
    leftoverMs = 0;
    // gives time for setTime to run
    setTimeout(function () {
        alert('time up!');
    }, 1);
}

function work() {
    if (!stopped) {
        return;
    }
    document.body.style.backgroundColor = '#FF7E30';
    mode = timeEnum.work;
    timeLeftS = mode * 60;
    setTime(mode * 60);
}

function shortBreak() {
    if (!stopped) {
        return;
    }
    document.body.style.backgroundColor = '#F26592';
    mode = timeEnum.break5;
    timeLeftS = mode * 60;
    setTime(mode * 60);
}

function longBreak() {
    if (!stopped) {
        return;
    }
    document.body.style.backgroundColor = '#E2346B';
    mode = timeEnum.break15;
    timeLeftS = mode * 60;
    setTime(mode * 60);
}

function beginTransitionButton() {
    this.classList.add('clicked');
}

function endTransitionButton() {
    this.classList.remove('clicked');
}

// sets time in HTML upon page load
setTime(mode * 60);
