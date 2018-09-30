var timeEnum = Object.freeze({
    'work': 25,
    'shortBreak': 5,
    'longBreak': 15
});
var modeColourMap = new Map([
    [timeEnum.work, '#FF7E30'],
    [timeEnum.shortBreak, '#F26592'],
    [timeEnum.longBreak, '#E2346B']
]);
var mode = timeEnum.work, paused = true;
var timeLeftS = mode * 60, leftoverMs = 0;
var start = Date.now();
var fullTimer = null, partTimer = null;

const buttons = document.querySelectorAll('button');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const pauseButton = document.querySelector('#pause');

pauseButton.addEventListener('click', handlePause);
document.querySelector('#reset').addEventListener('click', resetTimer);
document.querySelector('#work').addEventListener('click', () => {
    mode = timeEnum.work;
    setMode();
});
document.querySelector('#short-break').addEventListener('click', () => {
    mode = timeEnum.shortBreak;
    setMode();
});
document.querySelector('#long-break').addEventListener('click', () => {
    mode = timeEnum.longBreak;
    setMode();
});
buttons.forEach(button => {
    button.addEventListener('click', beginTransitionButton);
    button.addEventListener('transitionend', endTransitionButton);
});

function startTimer() {
    paused = false;
    if (leftoverMs !== 0) {
        start = Date.now();
        // runs a partial second
        partTimer = setTimeout(() => {
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
    fullTimer = setInterval(() => {
        timeLeftS--;
        setTime(timeLeftS);
        if (timeLeftS === 0) {
            timeOut();
        }
        start = Date.now();
    }, 1000);
}

function handlePause() {
    if (paused) {
        startTimer();
        setPauseButton(paused);
        return;
    }

    if (fullTimer !== null || partTimer !== null) {
        paused = true;
        setPauseButton(paused);
        if (partTimer !== null) {
            // calculates partial second of partial second (caused by unpausing and pausing again rapidly)
            leftoverMs = Math.max(0, leftoverMs - (Date.now() - start));
        } else {
            // calculates partial second when paused
            leftoverMs = Math.max(0, 1000 - (Date.now() - start));
        }
        clearTimers();
    }
}

function resetTimer() {
    if (fullTimer !== null || partTimer !== null || timeLeftS !== mode * 60 || leftoverMs !== 0) {
        clearTimers();
        leftoverMs = 0;
        timeLeftS = mode * 60;
        paused = false;
        setPauseButton();
        setTime(mode * 60);
        startTimer();
    }
}

function clearTimers() {
    clearInterval(fullTimer);
    clearTimeout(partTimer);
    fullTimer = null;
    partTimer = null;
}

function setTime(secondsLeft) {
    minutes.textContent = Math.floor(secondsLeft / 60) <= 9 ?
        '0' + Math.floor(secondsLeft / 60) : Math.floor(secondsLeft / 60);
    seconds.textContent = secondsLeft % 60 <= 9 ?
        '0' + (secondsLeft % 60) : (secondsLeft % 60);
}

function setPauseButton(paused) {
    pauseButton.textContent = paused ? 'unpause' : 'pause';
}

function setMode() {
    document.body.style.backgroundColor = modeColourMap.get(mode);
    resetTimer();
}

function timeOut() {
    clearInterval(fullTimer);
    fullTimer = null;
    leftoverMs = 0;
    // gives time for setTime to run
    setTimeout(() => {
        var audio = new Audio('../audio/shallow.mp3');
        audio.play();
    }, 1);
}

function beginTransitionButton() {
    this.classList.add('clicked');
}

function endTransitionButton() {
    this.classList.remove('clicked');
}

// sets time in HTML upon page load
setTime(mode * 60);
startTimer();
