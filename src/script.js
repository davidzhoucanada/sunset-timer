document.addEventListener('DOMContentLoaded', function () {
    var timeEnum = Object.freeze({
        "work": 25,
        "break5": 5,
        "break15": 15
    });
    var mode = timeEnum.work;
    var timeLeftMs = mode * 60 * 1000;
    var start;
    var stopped = true;
    var disabledButtons = false;

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
        start = Date.now();
        var timer = setInterval(function() {
            console.log('tick');
            if (stopped) {
                clearInterval(timer);
            }
            var delta = Date.now() - start; // milliseconds elapsed since start
            timeLeftMs -= delta;
            setTime(Math.round(timeLeftMs / 1000));
            console.log(delta); // in seconds
            // alternatively just show wall clock time:
            console.log(new Date().toUTCString());
            start = Date.now();
        }, 1000); // update about every second
    }

    function pauseTimer() {
        stopped = true;
    }

    function resetTimer() {
        stopped = true;
        timeLeftMs = mode * 60 * 1000;
        setTime(mode * 60);
    }

    function setTime(seconds) {
        time.innerHTML = Math.floor(seconds / 60) + ':' +
            (seconds % 60 <= 9 ? '0' + seconds % 60 : seconds % 60);
    }

    function toggleWorkBreak() {
        if (disabledButtons) {
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
