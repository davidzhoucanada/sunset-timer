const WORK = 'work';
const SHORT_BREAK = 'short-break';
const LONG_BREAK = 'long-break';
const CUSTOM = 'custom';
const timeMap = new Map([
    [WORK, 25],
    [SHORT_BREAK, 5],
    [LONG_BREAK, 15],
    [CUSTOM, -1]
]);
const modeColourMap = new Map([
    [WORK, '#FF7E30'],
    [SHORT_BREAK, '#F26592'],
    [LONG_BREAK, '#E2346B'],
    [CUSTOM, '#BE6BFF']
]);
var mode = WORK;
var paused;
var timeLeftS, leftoverMs;
var start;
var fullTimer = null, partTimer = null;

const buttons = document.querySelectorAll('button');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const modeButtons = document.querySelectorAll('#mode-buttons > button');
const workButton = document.querySelector(`#${WORK}`);
const shortBreakButton = document.querySelector(`#${SHORT_BREAK}`);
const longBreakButton = document.querySelector(`#${LONG_BREAK}`);

pauseButton.addEventListener('click', handlePause);
resetButton.addEventListener('click', resetTimer);
// listener order matters (mode must be set before corresponding time is set)
workButton.addEventListener('click', () => mode = WORK);
shortBreakButton.addEventListener('click', () => mode = SHORT_BREAK);
longBreakButton.addEventListener('click', () => mode = LONG_BREAK);
modeButtons.forEach(button => button.addEventListener('click', () => setMode()));
buttons.forEach(button => {
    button.addEventListener('click', addClickedClassButton);
    button.addEventListener('transitionend', removeClickedClassButton);
});

function addClickedClassButton() {
    this.classList.add('clicked');
}

function clearTimers() {
    clearInterval(fullTimer);
    clearTimeout(partTimer);
    fullTimer = null;
    partTimer = null;
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

function startCustom(time) {
    mode = CUSTOM;
    timeMap.set(CUSTOM, time);
    setMode();
}

function removeClickedClassButton() {
    this.classList.remove('clicked');
}

function resetTimer() {
    if (fullTimer !== null || partTimer !== null || timeLeftS !== timeMap.get(mode) * 60 || leftoverMs !== 0) {
        clearTimers();
        leftoverMs = 0;
        timeLeftS = timeMap.get(mode) * 60;
        paused = false;
        setPauseButton();
        setTime(timeMap.get(mode) * 60);
        startTimer();
    }
}

function setMode() {
    document.body.style.backgroundColor = modeColourMap.get(mode);
    resetTimer();
}

function setPauseButton(paused) {
    pauseButton.textContent = paused ? 'unpause' : 'pause';
}

function setTime(secondsLeft) {
    minutes.textContent = Math.floor(secondsLeft / 60) <= 9 ?
        '0' + Math.floor(secondsLeft / 60) : Math.floor(secondsLeft / 60);
    seconds.textContent = secondsLeft % 60 <= 9 ?
        '0' + (secondsLeft % 60) : (secondsLeft % 60);
}

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

// starts timer upon page load
setMode();
