document.addEventListener('DOMContentLoaded', function () {
    var timeEnum = Object.freeze({
        "work": 25,
        "break5": 5,
        "break15": 15
    });
    var mode = timeEnum.work;
    var disabledButtons = false;

    const buttons = document.querySelectorAll('button');
    const workBreakButton = document.querySelector('#toggleWorkBreakButton');
    const time = document.querySelector('#time');

    document.querySelector('#start').addEventListener('click', startTimer);
    document.querySelector('#stop').addEventListener('click', stopTimer);
    document.querySelector('#reset').addEventListener('click', resetTimer);
    workBreakButton.addEventListener('click', toggleWorkBreak);
    buttons.forEach(button => {
        button.addEventListener('click', beginTransitionButton);
        button.addEventListener('transitionend', endTransitionButton);
    });
    document.body.addEventListener('transitionend', endTransitionBackgroundColour);
    
    var start;
    setInterval(function () {
        var delta = Date.now() - start; // milliseconds elapsed since start
        //console.log(Math.round(delta / 1000)); // in seconds
        // alternatively just show wall clock time:
        //console.log(new Date().toUTCString());
    }, 1000); // update about every second

    function startTimer() {
        start = Date.now();
    }

    function stopTimer() {

    }

    function resetTimer() {
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
