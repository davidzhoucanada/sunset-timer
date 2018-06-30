document.addEventListener('DOMContentLoaded', function () {
    var timeEnum = Object.freeze({
        "work": 25,
        "break5": 5,
        "break15": 15
    });
    var mode = timeEnum.work;
    var timeLeftS = mode * 60, leftoverMs = 0;
    var start;
    var stopped = true, disabledButtons = false;
    var fullTimer;

    const buttons = document.querySelectorAll('button');
    const workBreakButton = document.querySelector('#toggleWorkBreakButton');
    const time = document.querySelector('#time');

    document.querySelector('#start').addEventListener('click', startTimer);
    document.querySelector('#pause').addEventListener('click', pauseTimer);
    document.querySelector('#reset').addEventListener('click', resetTimer);
    workBreakButton.addEventListener('click', toggleWorkBreak);
    buttons.forEach(button => {
        button.addEventListener('click', beginTransitionButton);
        button.addEventListener('transitionend', endTransitionButton);
    });
    document.body.addEventListener('transitionend', endTransitionBackgroundColour);

    function startTimer() {
        stopped = false;
        if (leftoverMs != 0) {
            var partTimer = setInterval(function () {
                console.log('fraction tick');
                timeLeftS--;
                setTime(timeLeftS);
                leftoverMs = 0;
                clearInterval(partTimer);
                normalTick();
            }, leftoverMs);
        } else {
            normalTick();
        }
    }

    function normalTick() {
        start = Date.now();
        fullTimer = setInterval(function () {
            //console.log('tick');
            //var delta = Date.now() - start;
            timeLeftS--;
            //console.log(delta);
            setTime(timeLeftS);
            start = Date.now();
        }, 1000);
    }

    function pauseTimer() {
        stopped = true;
        clearInterval(fullTimer);
        leftoverMs = Date.now() - start;
        //console.log('leftover ms: ' + leftoverMs);
    }

    function resetTimer() {
        stopped = true;
        clearInterval(fullTimer);
        timeLeftS = mode * 60;
        leftoverMs = 0;
        setTime(mode * 60);
    }

    function setTime(seconds) {
        //console.log('set time: ' + Math.floor(seconds / 60) + ':' +
        //    (seconds % 60 <= 9 ? '0' + seconds % 60 : seconds % 60));
        time.innerHTML = Math.floor(seconds / 60) + ':' +
            (seconds % 60 <= 9 ? '0' + seconds % 60 : seconds % 60);
    }

    function toggleWorkBreak() {
        if (disabledButtons || !stopped) {
            return;
        }
        disabledButtons = true;
        if (mode === timeEnum.work) {
            workBreakButton.innerHTML = 'work';
            document.body.style.backgroundColor = '#E2346B';
            mode = timeEnum.break5;
            setTime(mode * 60);
        } else {
            workBreakButton.innerHTML = 'break';
            document.body.style.backgroundColor = '#E2571C';
            mode = timeEnum.work;
            setTime(mode * 60);
        }
    }

    function beginTransitionButton() {
        if (disabledButtons) {
            return;
        }
        this.classList.add('clicked');
    }

    function endTransitionButton() {
        this.classList.remove('clicked');
    }

    function endTransitionBackgroundColour(e) {
        if (e.propertyName === 'background-color') {
            disabledButtons = false;
        }
    }
});


